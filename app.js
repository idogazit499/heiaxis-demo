import { defaultContent } from './content.js';

const STORAGE_KEY = 'heiaxis-content-v1';
const VISITED_KEY = 'heiaxis-visited-v1';
const AUDIENCE_KEY = 'heiaxis-audience-v1';
const STATUS_OPTIONS = ['success', 'info', 'warning', 'critical'];
const AUDIENCE_IDS = ['president', 'provost', 'student_affairs', 'student_success', 'enrollment'];

let content = loadContent();
let visited = new Set(loadJSON(VISITED_KEY, []));
let selectedAudienceId = normalizeAudience(localStorage.getItem(AUDIENCE_KEY));
let pendingAudienceId = selectedAudienceId;
let audienceSetupOpen = !selectedAudienceId;
let audienceSetupFirstRun = !selectedAudienceId;
let editorOpen = false;
let editorSection = sectionForRoute(getRoute());
let editorDraft = null;
let audienceEditorId = selectedAudienceId || 'president';
let audienceEditorDepartment = 'academic';

const app = document.querySelector('#app');
const toast = document.querySelector('#toast');

function clone(value) { return JSON.parse(JSON.stringify(value)); }
function loadJSON(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
}
function loadContent() {
  const saved = loadJSON(STORAGE_KEY, null);
  if (!saved) return clone(defaultContent);
  const migrated = ensureCurrentAssets(ensureStableEvidenceIds(mergeDefaults(defaultContent, saved)));
  migrated.meta.version = defaultContent.meta.version;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
  return migrated;
}
function mergeDefaults(defaults, saved) {
  if (Array.isArray(defaults)) return Array.isArray(saved) ? clone(saved) : clone(defaults);
  if (!defaults || typeof defaults !== 'object') return saved === undefined ? defaults : saved;
  const result = {};
  for (const key of new Set([...Object.keys(defaults), ...Object.keys(saved || {})])) {
    result[key] = key in (saved || {}) ? mergeDefaults(defaults[key], saved[key]) : clone(defaults[key]);
  }
  return result;
}
function ensureStableEvidenceIds(data) {
  const listKeys = ['departmentView', 'heiaxisView', 'timeline'];
  for (const department of data.departments || []) {
    const defaults = defaultContent.departments.find(item => item.id === department.id);
    if (!defaults) continue;
    for (const key of listKeys) {
      if (!Array.isArray(department[key]) || !Array.isArray(defaults[key])) continue;
      department[key].forEach((item, index) => {
        if (item.evidenceId) return;
        const matchingDefault = defaults[key].find(candidate => candidate.text === item.text) || defaults[key][index];
        if (matchingDefault?.evidenceId) item.evidenceId = matchingDefault.evidenceId;
      });
    }
  }
  for (const key of ['failures', 'events']) {
    if (!Array.isArray(data.journey?.[key])) continue;
    data.journey[key].forEach((item, index) => {
      if (item.evidenceId) return;
      const matchingDefault = defaultContent.journey[key].find(candidate => candidate.text === item.text) || defaultContent.journey[key][index];
      if (matchingDefault?.evidenceId) item.evidenceId = matchingDefault.evidenceId;
    });
  }
  return data;
}
function ensureCurrentAssets(data) {
  if (data.brand?.logoImage === './assets/heiaxis-logo.svg') data.brand.logoImage = defaultContent.brand.logoImage;
  if (data.student?.image === './assets/student-placeholder.svg') data.student.image = defaultContent.student.image;
  return data;
}
function normalizeAudience(id) { return AUDIENCE_IDS.includes(id) && content.audienceLenses?.[id] ? id : null; }
function currentLens() { return content.audienceLenses[selectedAudienceId] || content.audienceLenses.president; }
function lensFrame(departmentId) { return currentLens().departments?.[departmentId] || {}; }
function saveContent() { localStorage.setItem(STORAGE_KEY, JSON.stringify(content)); }
function saveVisited() { localStorage.setItem(VISITED_KEY, JSON.stringify([...visited])); }
function esc(value = '') {
  return String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}
function safeColor(value, fallback = '#0a45ff') { return /^#[0-9a-f]{6}$/i.test(value || '') ? value : fallback; }
function labelize(key) { return String(key).replace(/([a-z])([A-Z])/g, '$1 $2').replace(/[-_]/g, ' '); }
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2200);
}

function icon(name, stroke = 'currentColor') {
  const common = `fill="none" stroke="${stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"`;
  const paths = {
    home: '<path d="m3 11 9-8 9 8v9a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1z"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    back: '<path d="M19 12H5m6 6-6-6 6-6"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><path d="m12 12 8-8m-3 0h3v3"/>',
    cap: '<path d="m2 10 10-5 10 5-10 5z"/><path d="M6 12.5V17c3 2 9 2 12 0v-4.5M22 10v6"/>',
    coins: '<ellipse cx="8" cy="7" rx="5" ry="2.5"/><path d="M3 7v4c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5V7M3 11v4c0 1.4 2.2 2.5 5 2.5 1.1 0 2-.2 2.8-.5"/><ellipse cx="16" cy="14" rx="5" ry="2.5"/><path d="M11 14v4c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5v-4"/>',
    people: '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20v-2a6 6 0 0 1 12 0v2M14 15a5 5 0 0 1 7 4v1"/>',
    heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8z"/>',
    chart: '<path d="M4 20V10h4v10M10 20V4h4v16M16 20v-8h4v8M2 20h20"/>',
    sparkle: '<path d="m12 3 1.4 4.1L17.5 8.5l-4.1 1.4L12 14l-1.4-4.1-4.1-1.4 4.1-1.4zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>',
    upload: '<path d="M12 16V4m-5 5 5-5 5 5M4 20h16"/>',
    download: '<path d="M12 4v12m-5-5 5 5 5-5M4 20h16"/>'
  };
  return `<svg viewBox="0 0 24 24" aria-hidden="true" ${common}>${paths[name] || paths.sparkle}</svg>`;
}

function getRoute() { return location.hash.replace(/^#\/?/, '') || 'home'; }
function go(route) {
  if (getRoute() === route) render();
  else location.hash = route;
}
function routeStage(route) {
  if (route === 'home') return 0;
  if (route.startsWith('department-')) return 1;
  if (route === 'journey' || route === 'leadership') return route === 'journey' ? 2 : 3;
  if (route === 'cohort') return 3;
  return 4;
}

function renderAudienceSetup(firstRun = false) {
  const lenses = AUDIENCE_IDS.map(id => content.audienceLenses[id]).filter(Boolean);
  const selected = pendingAudienceId ? content.audienceLenses[pendingAudienceId] : null;
  const panel = `<section class="audience-setup-card card" role="dialog" aria-modal="${firstRun ? 'false' : 'true'}" aria-labelledby="audience-title">
    ${logoAsset('audience-logo')}
    <div class="eyebrow">${esc(content.ui.audienceKicker)}</div>
    <h1 id="audience-title">${esc(content.ui.audiencePrompt)}</h1>
    <p class="audience-help">${esc(content.ui.audienceHelp)}</p>
    <div class="audience-options">${lenses.map(lens => `<button class="audience-option ${lens.id === pendingAudienceId ? 'selected' : ''}" data-audience-option="${esc(lens.id)}" aria-pressed="${lens.id === pendingAudienceId}"><span class="audience-option-mark">${lens.id === pendingAudienceId ? '✓' : ''}</span><span>${esc(lens.label)}</span></button>`).join('')}</div>
    <div class="audience-question ${selected ? 'visible' : ''}"><span>${esc(content.ui.audienceKicker)}</span><strong>${esc(selected?.coreQuestion || '')}</strong></div>
    <div class="audience-actions">${!firstRun ? `<button class="btn secondary" id="audience-cancel">${esc(content.ui.cancel)}</button>` : ''}<button class="btn" id="audience-start" ${pendingAudienceId ? '' : 'disabled'}>${esc(content.ui.startDemo)} ${icon('arrow')}</button></div>
  </section>`;
  return firstRun ? `<main class="audience-setup-page">${panel}</main>` : `<div class="audience-backdrop" id="audience-backdrop"></div><div class="audience-modal">${panel}</div>`;
}

function shell(body, route, viewClass = '') {
  const stage = routeStage(route);
  const progressRoutes = ['home', 'department-academic', 'journey', 'cohort', 'baseline'];
  const progress = content.ui.progress.map((label, index) => `
    <button class="progress-item ${index === stage ? 'active' : index < stage ? 'done' : ''}" data-route="${progressRoutes[index]}">
      <span class="progress-dot"></span>${esc(label)}
    </button>`).join('');
  return `<div class="app">
    <header class="topbar">
      <button class="brand" data-route="home" aria-label="${esc(content.ui.hallway)}">${logoAsset()}</button>
      <button class="audience-chip" id="audience-change" aria-label="${esc(content.ui.changeAudience)}"><span>${esc(content.ui.presentingFor)}</span><strong>${esc(currentLens().label)}</strong></button>
      <nav class="top-progress" aria-label="Story progress">${progress}</nav>
      <div class="top-actions">
        ${route !== 'home' ? `<button class="icon-button" data-route="home" aria-label="${esc(content.ui.hallway)}">${icon('home')}</button>` : ''}
        <button class="icon-button" id="edit-open" aria-label="${esc(content.ui.edit)}" title="${esc(content.ui.edit)}">${icon('settings')}</button>
      </div>
    </header>
    <main class="view ${viewClass}">${body}</main>
    ${audienceSetupOpen ? renderAudienceSetup(false) : ''}
    ${editorOpen ? renderEditor() : ''}
  </div>`;
}

function studentCard(compact = false) {
  const s = content.student;
  if (compact) return `<div class="mini-student">${studentAvatar()}<div><strong>${esc(s.name)}</strong><p>${esc(s.descriptor)} · “${esc(s.profileText)}”</p></div></div>`;
  return `<aside class="student-card card" aria-label="Student profile">
    <div class="student-card-top">${studentAvatar()}<div><div class="student-name">${esc(s.name)}</div><div class="student-role">${esc(s.descriptor)}</div></div></div>
    <p class="student-quote">“${esc(s.profileText)}”</p>
    <div class="tags">${s.tags.map(tag => `<span class="tag">${esc(tag)}</span>`).join('')}</div>
  </aside>`;
}

function logoAsset(extraClass = '') {
  return `<span class="logo-asset ${esc(extraClass)}" role="img" aria-label="${esc(content.brand.name)}" style="background-image:url('${esc(content.brand.logoImage)}')"></span>`;
}
function studentAvatar() {
  const zoom = Math.max(100, Math.min(300, Number(content.student.imageZoom) || 100));
  return `<span class="student-avatar" role="img" aria-label="${esc(content.student.name)}" style="background-image:url('${esc(content.student.image)}');--student-zoom:${zoom}%;background-position:${esc(content.student.imagePosition || 'center')}"></span>`;
}

function homeView() {
  const doors = [...content.departments, content.leadershipDoor].map(d => {
    const isLead = d.id === 'leadership';
    const route = isLead ? 'journey' : `department-${d.id}`;
    return `<button class="door-button ${isLead ? 'leadership' : ''}" data-door-route="${route}" data-door-id="${d.id}" style="--door-color:${safeColor(d.color)}" aria-label="Open ${esc(d.title)}">
      <div class="door-frame">
        ${visited.has(d.id) ? `<span class="visited-mark">✓ ${esc(content.ui.visited)}</span>` : ''}
        <div class="door-panel">
          <span class="door-icon">${icon(d.icon)}</span>
          <span class="door-title">${esc(d.title)}</span>
          <span class="door-description">${esc(d.shortDescription)}</span>
          <span class="door-arrow">${icon('arrow')}</span>
        </div>
      </div>
    </button>`;
  }).join('');
  const nudge = visited.size >= 3 ? `<div class="reveal-nudge"><span>${esc(content.ui.revealReady)}</span><button class="btn" data-route="journey">${esc(content.ui.revealButton)} ${icon('arrow')}</button></div>` : '';
  const body = `<div class="content-wrap">
    <section class="hallway-head">
      <div class="eyebrow">${esc(content.home.eyebrow)}</div>
      <h1 class="display">${esc(content.home.headline)}<br><span class="gradient-text">${esc(content.home.headlineAccent)}</span></h1>
      <p class="subtitle">${esc(content.home.subtitle)}</p>
      ${nudge}
    </section>
    <div class="hallway-layout">${studentCard()}<div class="doors">${doors}</div></div>
    <div class="instruction card">${esc(content.home.instruction)} <strong>${esc(content.home.instructionAccent)}</strong></div>
  </div>`;
  return shell(body, 'home', 'hallway-view');
}

function stateSymbol(status) { return status === 'success' ? '✓' : status === 'critical' ? '!' : status === 'warning' ? '!' : '•'; }
function evidenceFor(frame = {}) {
  return (frame.evidenceFocus || []).map(id => ({ id, ...content.evidenceCatalog[id] })).filter(item => item.label);
}
function roleEvidencePanel(frame = {}, context = 'department') {
  const mode = currentLens().presentationMode || 'strategic';
  const evidence = evidenceFor(frame).slice(0, context === 'leadership' ? 5 : 4);
  if (!evidence.length) return '';
  return `<section class="role-evidence-panel ${esc(mode)} ${esc(context)}" aria-label="${esc(content.ui.roleEvidence)}">
    <div class="role-evidence-head"><span>${esc(content.ui.roleEvidence)}</span><strong>${esc(mode)} · ${esc(content.ui.sameEvidence)}</strong></div>
    <div class="role-evidence-grid">${evidence.map((item, index) => `<article class="role-evidence-card ${index === 0 ? 'lead' : ''}"><span class="evidence-order">${String(index + 1).padStart(2,'0')}</span><div><div class="role-evidence-label">${esc(item.label)}</div><div class="role-evidence-value">${esc(item.value)}</div><div class="role-evidence-detail">${esc(item.detail)}</div></div></article>`).join('')}</div>
  </section>`;
}
function rows(items, axis = false, focusIds = []) {
  const focus = new Set(focusIds);
  const ordered = [...items].sort((a,b) => Number(focus.has(b.evidenceId)) - Number(focus.has(a.evidenceId)));
  return `<div class="item-list">${ordered.map(item => `<div class="info-row ${esc(item.status || 'info')} ${focus.size ? (focus.has(item.evidenceId) ? 'role-primary' : 'role-secondary') : ''}" data-evidence-id="${esc(item.evidenceId || '')}">
    <span class="state-icon">${stateSymbol(item.status)}</span>
    <div><div class="row-title">${esc(item.text)}</div>${item.detail ? `<div class="row-detail">${esc(item.detail)}</div>` : ''}</div>
    ${item.value || item.date ? `<div class="row-value">${esc(item.value || item.date)}</div>` : '<span></span>'}
  </div>`).join('')}</div>`;
}
function perspective(dept, axis = false, frame = {}) {
  const focus = frame.evidenceFocus || [];
  const evidenceRows = rows(axis ? dept.heiaxisView : dept.departmentView, axis, focus);
  const detail = axis && currentLens().presentationMode === 'executive'
    ? `<details class="full-evidence"><summary>${esc(content.ui.viewFullEvidence)}</summary>${evidenceRows}</details>`
    : evidenceRows;
  return `<section class="perspective card ${axis ? 'axis' : ''}">
    <div class="perspective-head"><span class="perspective-icon">${icon(axis ? 'chart' : dept.icon)}</span><div><h2>${esc(axis ? dept.heiaxisTitle : dept.departmentTitle)}</h2><div class="perspective-sub">${esc(axis ? (frame.reveal || dept.heiaxisSubtitle) : dept.departmentSubtitle)}</div></div></div>
    ${axis ? '' : `<div class="mini-student">${studentAvatar()}<div><strong>${esc(content.student.name)}, ${esc(content.student.descriptor)}</strong><p>“${esc(dept.studentQuote)}”</p></div></div>`}
    ${axis ? roleEvidencePanel(frame) : ''}
    ${detail}
  </section>`;
}
function timeline(dept, frame = {}) {
  if (!dept.timeline) return '';
  const focus = new Set(frame.evidenceFocus || []);
  const mode = currentLens().presentationMode || 'strategic';
  return `<section class="timeline card mode-${esc(mode)}"><div class="timeline-track">${dept.timeline.map(e => `<div class="timeline-event ${esc(e.status)} ${focus.has(e.evidenceId) ? 'role-primary' : 'role-secondary'}">${e.flag ? `<span class="timeline-flag">${esc(e.flag)}</span>` : '<span style="display:block;height:24px"></span>'}<div class="timeline-dot"></div><div class="timeline-date">${esc(e.date)}</div><div class="timeline-text">${esc(e.text)}</div></div>`).join('')}</div></section>`;
}
function departmentView(id) {
  const dept = content.departments.find(d => d.id === id) || content.departments[0];
  const frame = lensFrame(dept.id);
  visited.add(dept.id); saveVisited();
  const index = content.departments.findIndex(d => d.id === dept.id);
  const nextRoute = index === content.departments.length - 1 ? 'journey' : `department-${content.departments[index + 1].id}`;
  const nextLabel = index === content.departments.length - 1 ? content.ui.revealButton : content.ui.continueJourney;
  const body = `<div class="content-wrap" style="--dept-color:${safeColor(dept.color)}">
    <header class="dept-header"><span class="dept-emblem">${icon(dept.icon)}</span><div><p class="dept-label">Door ${esc(dept.number)} — ${esc(dept.title)} · ${esc(currentLens().label)}</p><h1 class="question">${esc(frame.question || dept.question)}</h1></div></header>
    ${timeline(dept, frame)}
    <div class="comparison">${perspective(dept, false, frame)}${perspective(dept, true, frame)}</div>
    <div class="insight-bar"><div class="insight-copy">${icon('target')}<span>${esc(frame.takeaway || dept.insight)}</span></div><div class="insight-side">${esc(dept.secondaryInsight)}</div><div class="dept-actions"><button class="btn secondary" data-route="home">${icon('back')} ${esc(content.ui.hallway)}</button><button class="btn" data-route="${nextRoute}">${esc(nextLabel)} ${icon('arrow')}</button></div></div>
  </div>`;
  return shell(body, `department-${id}`, `department-view mode-${currentLens().presentationMode || 'strategic'}`);
}

function journeyView() {
  const nodes = [...content.departments, content.leadershipDoor];
  const frame = lensFrame('leadership');
  const focus = new Set(frame.evidenceFocus || []);
  const mode = currentLens().presentationMode || 'strategic';
  let map = '';
  nodes.forEach((node, i) => {
    map += `<div class="journey-node" style="--node-color:${safeColor(node.color)}"><span class="door-icon" style="--door-color:${safeColor(node.color)}">${icon(node.icon)}</span><div class="journey-node-title">${esc(node.title)}</div></div>`;
    if (i < nodes.length - 1) {
      const failure = content.journey.failures[i] || {};
      map += `<div class="journey-gap ${focus.has(failure.evidenceId) ? 'role-primary' : 'role-secondary'}"><div class="failure ${esc(failure.status || '')}">${esc(failure.text || '')}</div></div>`;
    }
  });
  const events = content.journey.events.map(e => `<div class="event-card ${esc(e.status)} ${focus.has(e.evidenceId) ? 'role-primary' : 'role-secondary'}"><div class="event-date">${esc(e.date)}</div><div class="event-copy">${esc(e.text)}</div><div class="event-dept">${esc(e.department)}</div></div>`).join('');
  const j = content.journey;
  const body = `<div class="content-wrap">
    <header class="journey-head"><div class="eyebrow">${esc(j.headline)} · ${esc(currentLens().label)}</div><h1 class="display small">${esc(currentLens().coreQuestion)}</h1><p class="subtitle">${esc(j.subtitle)} · ${esc(mode)} lens</p><p class="journey-description">${esc(j.description)}</p></header>
    ${roleEvidencePanel(frame, 'journey')}
    <div class="journey-map">${map}</div>
    <div class="events-rail">${events}</div>
    <div class="journey-bottom"><strong>${esc(frame.takeaway || j.insight)}</strong><div class="dept-actions"><button class="btn secondary" data-route="home">${icon('back')} ${esc(content.ui.hallway)}</button><button class="btn" data-route="leadership">${esc(content.ui.openLeadership)} ${icon('arrow')}</button></div></div>
  </div>`;
  return shell(body, 'journey', `journey-view mode-${mode}`);
}

function leadershipView() {
  const nodes = content.departments;
  const l = content.leadership;
  const frame = lensFrame('leadership');
  const focus = new Set(frame.evidenceFocus || []);
  const mode = currentLens().presentationMode || 'strategic';
  const path = nodes.map((node, i) => {
    const failure = content.journey.failures[i] || {};
    return `<div class="path-stop" style="--stop-color:${safeColor(node.color)}"><div class="path-circle">${icon(node.icon)}</div><div class="path-name">${esc(node.title)}</div>${i < nodes.length - 1 ? `<div class="path-break ${focus.has(failure.evidenceId) ? 'role-primary' : 'role-secondary'}">${esc(failure.text)}</div>` : ''}</div>`;
  }).join('');
  const body = `<div class="content-wrap">
    <header class="lead-head"><div class="eyebrow">${esc(currentLens().label)} · ${esc(l.eyebrow)}</div><h1 class="display small">${esc(frame.question || l.headline)}</h1><p class="subtitle">${esc(frame.reveal || l.subtitle)}</p></header>
    <div class="lead-layout">
      <section class="integrated-card card"><span class="status-badge">${icon('sparkle')} ${esc(content.ui.demo)}</span>${roleEvidencePanel(frame, 'leadership')}<div class="integrated-path">${path}</div><p class="lead-insight">${esc(frame.takeaway || l.insight)}</p></section>
      <aside class="visibility-panel card"><h2>${esc(l.panelTitle)}</h2><div class="visibility-list">${l.panelItems.map(item => `<div class="visibility-item"><span class="visibility-check">✓</span>${esc(item)}</div>`).join('')}</div></aside>
    </div>
    <div class="lead-cta"><button class="btn" data-route="cohort">${esc(content.ui.explorePattern)} ${icon('arrow')}</button></div>
  </div>`;
  return shell(body, 'leadership', `leadership-view mode-${mode}`);
}

function heatColor(value) {
  return ['#edf2ff','#bfd1ff','#8aaafa','#f7b0af','#ff7770','#ee3737'][Math.max(0, Math.min(5, Number(value)))];
}
function cohortView() {
  const c = content.cohort;
  const metrics = c.metrics.map(m => `<div class="metric card" style="--metric-color:${safeColor(m.color, '#e5262a')}"><div class="metric-label">${esc(m.label)}</div><div class="metric-value">${esc(m.value)}</div><div class="metric-detail">${esc(m.detail)}</div></div>`).join('');
  let heat = '<div></div>' + c.heatmapColumns.map(x => `<div class="heat-label col">${esc(x)}</div>`).join('');
  c.heatmapRows.forEach((row, r) => { heat += `<div class="heat-label">${esc(row)}</div>` + c.heatmapValues[r].map(value => `<div class="heat-cell" style="--heat:${heatColor(value)}" title="Friction level ${esc(value)}"></div>`).join(''); });
  const body = `<div class="content-wrap">
    <header class="cohort-head"><div><div class="eyebrow">${esc(c.eyebrow)}</div><h1 class="display small">${esc(c.headline)}</h1><p class="subtitle">${esc(c.subtitle)}</p></div><span class="demo-label">${esc(content.meta.demoLabel)}</span></header>
    <div class="metric-grid">${metrics}</div>
    <div class="dashboard">
      <section class="heatmap-card card"><h2>${esc(c.heatmapTitle)}</h2><p>${esc(c.heatmapSubtitle)}</p><div class="heatmap">${heat}</div><div class="heat-line"></div><div class="heat-legend"><span>Stronger continuity</span><span>Greater friction</span></div></section>
      <aside class="baseline-preview card"><h2>${esc(content.baseline.title)}</h2><div class="mini-list">${content.baseline.items.slice(0,4).map(item => `<div class="mini-list-item"><span>→</span><span>${esc(item)}</span></div>`).join('')}</div><button class="btn" data-route="baseline">${esc(content.baseline.cta)} ${icon('arrow')}</button></aside>
    </div>
  </div>`;
  return shell(body, 'cohort', 'cohort-view');
}

function baselineView() {
  const b = content.baseline;
  const body = `<div class="baseline-wrap">
    <header class="baseline-title"><div class="eyebrow">${esc(b.eyebrow)}</div><h1 class="display small">${esc(b.headline)}<br><span class="gradient-text">${esc(b.headlineAccent)}</span></h1></header>
    <div class="baseline-body"><section class="baseline-pitch card"><h2>${esc(b.title)}</h2><p>${esc(b.description)}</p><button class="btn" id="baseline-cta">${esc(b.cta)} ${icon('arrow')}</button></section><section class="baseline-list card"><h3>${esc(content.brand.name)} reveals:</h3>${b.items.map((item, i) => `<div class="baseline-item"><span class="baseline-num">${i+1}</span><span>${esc(item)}</span></div>`).join('')}</section></div>
    <div class="baseline-foot">${esc(b.footnote)}</div>
  </div>`;
  return shell(body, 'baseline', 'baseline-view');
}

function sectionOptions() {
  return [
    { key: 'home', label: 'Hallway, student & brand' },
    { key: 'audiences', label: 'Audience Lens framing' },
    { key: 'evidence', label: 'Shared Maya evidence catalog' },
    ...content.departments.map(d => ({ key: `dept:${d.id}`, label: `Door ${d.number} — ${d.title}` })),
    { key: 'journey', label: 'Full-path reveal' },
    { key: 'leadership', label: 'Leadership view' },
    { key: 'cohort', label: 'Institution dashboard' },
    { key: 'baseline', label: '21-Day Baseline' }
  ];
}
function sectionForRoute(route) {
  if (route.startsWith('department-')) return `dept:${route.replace('department-', '')}`;
  return ['journey','leadership','cohort','baseline'].includes(route) ? route : 'home';
}
function getSectionData(key) {
  if (key === 'home') return { home: clone(content.home), student: clone(content.student), brand: clone(content.brand) };
  if (key === 'audiences') return clone(content.audienceLenses);
  if (key === 'evidence') return clone(content.evidenceCatalog);
  if (key.startsWith('dept:')) return clone(content.departments.find(d => d.id === key.split(':')[1]));
  return clone(content[key]);
}
function setSectionData(key, value) {
  if (key === 'home') { content.home = value.home; content.student = value.student; content.brand = value.brand; }
  else if (key === 'audiences') content.audienceLenses = value;
  else if (key === 'evidence') content.evidenceCatalog = value;
  else if (key.startsWith('dept:')) {
    const index = content.departments.findIndex(d => d.id === key.split(':')[1]);
    if (index >= 0) content.departments[index] = value;
  } else content[key] = value;
}

function renderAudienceEditor() {
  const lens = editorDraft[audienceEditorId] || editorDraft.president;
  const frame = lens.departments[audienceEditorDepartment] || {};
  const audiencePath = key => encodeURIComponent(JSON.stringify([audienceEditorId, key]));
  const framePath = key => encodeURIComponent(JSON.stringify([audienceEditorId, 'departments', audienceEditorDepartment, key]));
  const departments = [...content.departments.map(d => ({ id: d.id, label: d.title })), { id: 'leadership', label: content.leadershipDoor.title }];
  const modes = ['executive', 'strategic', 'operational', 'timing', 'lifecycle'];
  const selectedEvidence = new Set(frame.evidenceFocus || []);
  return `<div class="lens-editor-intro"><span class="status-badge">${icon('sparkle')} Same journey · different executive question</span><p>Audience framing interprets the shared evidence. It does not change Maya’s events, dates, statuses, or metrics.</p></div>
    <div class="field-group lens-editor-selectors">
      <div class="field"><label>Audience</label><select id="audience-editor-lens">${AUDIENCE_IDS.map(id => `<option value="${id}" ${id === audienceEditorId ? 'selected' : ''}>${esc(editorDraft[id].label)}</option>`).join('')}</select></div>
      <div class="field"><label>Department</label><select id="audience-editor-department">${departments.map(d => `<option value="${d.id}" ${d.id === audienceEditorDepartment ? 'selected' : ''}>${esc(d.label)}</option>`).join('')}</select></div>
      <div class="field"><label>${esc(content.ui.presentationMode)}</label><select data-edit-path="${audiencePath('presentationMode')}">${modes.map(mode => `<option value="${mode}" ${mode === lens.presentationMode ? 'selected' : ''}>${mode}</option>`).join('')}</select></div>
    </div>
    <div class="field-group">
      <div class="field"><label>Audience label</label><input type="text" value="${esc(lens.label)}" data-edit-path="${audiencePath('label')}"></div>
      <div class="field"><label>Core question</label><textarea data-edit-path="${audiencePath('coreQuestion')}">${esc(lens.coreQuestion)}</textarea></div>
    </div>
    <div class="field-group audience-frame-fields">
      <div class="field-group-title">${esc(departments.find(d => d.id === audienceEditorDepartment)?.label)} framing</div>
      <div class="field"><label>Question</label><textarea data-edit-path="${framePath('question')}">${esc(frame.question || '')}</textarea></div>
      <div class="field"><label>HEIAXIS reveal</label><textarea data-edit-path="${framePath('reveal')}">${esc(frame.reveal || '')}</textarea></div>
      <div class="field"><label>Takeaway</label><textarea data-edit-path="${framePath('takeaway')}">${esc(frame.takeaway || '')}</textarea></div>
    </div>
    <div class="field-group evidence-picker"><div class="field-group-title"><span>Evidence to foreground</span><span>${selectedEvidence.size} selected</span></div><p>Select shared Maya evidence by label. Internal evidence IDs remain stable and do not need to be typed.</p><div class="evidence-options">${Object.entries(content.evidenceCatalog).map(([id,item]) => `<label class="evidence-option"><input type="checkbox" data-evidence-toggle="${esc(id)}" ${selectedEvidence.has(id) ? 'checked' : ''}><span><strong>${esc(item.label)}</strong><small>${esc(item.value)}</small></span></label>`).join('')}</div></div>`;
}

function fieldInput(value, path, key) {
  const encoded = encodeURIComponent(JSON.stringify(path));
  if (key === 'status') return `<select data-edit-path="${encoded}">${STATUS_OPTIONS.map(x => `<option ${x === value ? 'selected' : ''}>${x}</option>`).join('')}</select>`;
  if (key.toLowerCase().includes('color') && typeof value === 'string') return `<input type="color" value="${safeColor(value)}" data-edit-path="${encoded}">`;
  if (typeof value === 'number') return `<input type="number" value="${esc(value)}" data-edit-path="${encoded}">`;
  const text = String(value ?? '');
  return text.length > 68 || /description|question|insight|subtitle|text|quote|headline/i.test(key) ? `<textarea data-edit-path="${encoded}">${esc(text)}</textarea>` : `<input type="text" value="${esc(text)}" data-edit-path="${encoded}">`;
}
function renderFields(value, path = [], depth = 0) {
  if (Array.isArray(value)) {
    return `<div class="field-group"><div class="field-group-title"><span>${esc(labelize(path.at(-1) || 'items'))}</span><span>${value.length} items</span></div>${value.map((item, index) => {
      const itemPath = [...path, index];
      const encoded = encodeURIComponent(JSON.stringify(itemPath));
      return `<div class="array-item"><div class="array-controls"><button class="mini-btn" data-array-action="up" data-array-path="${encoded}" title="Move up">↑</button><button class="mini-btn" data-array-action="down" data-array-path="${encoded}" title="Move down">↓</button><button class="mini-btn remove" data-array-action="remove" data-array-path="${encoded}" title="Remove">×</button></div>${typeof item === 'object' ? renderFields(item, itemPath, depth + 1) : `<div class="field">${fieldInput(item, itemPath, String(index))}</div>`}</div>`;
    }).join('')}<button class="add-btn" data-add-path="${encodeURIComponent(JSON.stringify(path))}">+ ${esc(content.ui.addItem)}</button></div>`;
  }
  if (value && typeof value === 'object') {
    const fields = Object.entries(value).map(([key, child]) => {
      if (key === 'id' || key === 'evidenceId') return '';
      if (Array.isArray(child) || (child && typeof child === 'object')) return renderFields(child, [...path, key], depth + 1);
      return `<div class="field"><label>${esc(labelize(key))}</label>${fieldInput(child, [...path, key], key)}</div>`;
    }).join('');
    return depth === 0 ? fields : `<div class="field-group"><div class="field-group-title">${esc(labelize(path.at(-1) || 'section'))}</div>${fields}</div>`;
  }
  return '';
}
function renderEditor() {
  if (!editorDraft) editorDraft = getSectionData(editorSection);
  return `<div class="editor-backdrop" id="editor-backdrop"></div><aside class="editor" aria-label="${esc(content.ui.contentStudio)}">
    <div class="editor-head"><div class="editor-head-top"><div><h2>${esc(content.ui.contentStudio)}</h2><div class="row-detail">${esc(content.ui.contentStudioHelp)}</div></div><button class="icon-button" id="edit-close" aria-label="${esc(content.ui.cancel)}">${icon('close')}</button></div>
      <div class="editor-tools"><button class="btn secondary" id="export-content">${icon('download')} ${esc(content.ui.export)}</button><button class="btn secondary" id="import-content">${icon('upload')} ${esc(content.ui.import)}</button><button class="btn danger" id="reset-content">${esc(content.ui.reset)}</button><input type="file" id="import-file" accept="application/json" hidden></div>
      <select class="editor-select" id="editor-section" aria-label="Screen to edit">${sectionOptions().map(o => `<option value="${esc(o.key)}" ${o.key === editorSection ? 'selected' : ''}>${esc(o.label)}</option>`).join('')}</select>
    </div>
    <div class="editor-body">${editorSection === 'audiences' ? renderAudienceEditor() : renderFields(editorDraft)}</div>
    <div class="editor-footer"><button class="btn secondary" id="edit-cancel">${esc(content.ui.cancel)}</button><button class="btn" id="edit-save">${esc(content.ui.save)}</button></div>
  </aside>`;
}

function pathGet(root, path) { return path.reduce((value, key) => value?.[key], root); }
function pathSet(root, path, value) {
  const parent = path.slice(0, -1).reduce((obj, key) => obj[key], root);
  parent[path.at(-1)] = value;
}
function blankLike(value) {
  if (typeof value === 'number') return 0;
  if (typeof value === 'string') return '';
  if (Array.isArray(value)) return [];
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k,v]) => [k, k === 'status' ? 'info' : blankLike(v)]));
  return '';
}

function bindEvents() {
  document.querySelectorAll('[data-route]').forEach(el => el.addEventListener('click', () => go(el.dataset.route)));
  document.querySelector('#audience-change')?.addEventListener('click', () => {
    pendingAudienceId = selectedAudienceId;
    audienceSetupFirstRun = false;
    audienceSetupOpen = true;
    render();
  });
  document.querySelectorAll('[data-audience-option]').forEach(el => el.addEventListener('click', () => {
    pendingAudienceId = el.dataset.audienceOption;
    render();
  }));
  document.querySelector('#audience-start')?.addEventListener('click', () => {
    if (!normalizeAudience(pendingAudienceId)) return;
    const wasFirstRun = audienceSetupFirstRun;
    selectedAudienceId = pendingAudienceId;
    localStorage.setItem(AUDIENCE_KEY, selectedAudienceId);
    audienceSetupOpen = false;
    audienceSetupFirstRun = false;
    showToast(`Audience Lens: ${currentLens().label}`);
    if (wasFirstRun) go('home'); else render();
  });
  document.querySelector('#audience-cancel')?.addEventListener('click', () => { audienceSetupOpen = false; pendingAudienceId = selectedAudienceId; render(); });
  document.querySelector('#audience-backdrop')?.addEventListener('click', () => { audienceSetupOpen = false; pendingAudienceId = selectedAudienceId; render(); });
  document.querySelectorAll('[data-door-route]').forEach(el => el.addEventListener('click', () => {
    el.classList.add('opening');
    if (el.dataset.doorId !== 'leadership') { visited.add(el.dataset.doorId); saveVisited(); }
    setTimeout(() => go(el.dataset.doorRoute), 470);
  }));
  document.querySelector('#edit-open')?.addEventListener('click', () => { editorSection = sectionForRoute(getRoute()); editorDraft = getSectionData(editorSection); editorOpen = true; render(); });
  document.querySelector('#edit-close')?.addEventListener('click', closeEditor);
  document.querySelector('#edit-cancel')?.addEventListener('click', closeEditor);
  document.querySelector('#editor-backdrop')?.addEventListener('click', closeEditor);
  document.querySelector('#editor-section')?.addEventListener('change', event => {
    editorSection = event.target.value;
    editorDraft = getSectionData(editorSection);
    if (editorSection === 'audiences') audienceEditorId = selectedAudienceId || 'president';
    render();
  });
  document.querySelector('#audience-editor-lens')?.addEventListener('change', event => { audienceEditorId = event.target.value; render(); });
  document.querySelector('#audience-editor-department')?.addEventListener('change', event => { audienceEditorDepartment = event.target.value; render(); });
  document.querySelectorAll('[data-edit-path]').forEach(el => el.addEventListener('input', event => {
    const path = JSON.parse(decodeURIComponent(event.target.dataset.editPath));
    const old = pathGet(editorDraft, path);
    pathSet(editorDraft, path, typeof old === 'number' ? Number(event.target.value) : event.target.value);
  }));
  document.querySelectorAll('[data-evidence-toggle]').forEach(el => el.addEventListener('change', event => {
    const frame = editorDraft[audienceEditorId].departments[audienceEditorDepartment];
    const selected = new Set(frame.evidenceFocus || []);
    if (event.target.checked) selected.add(event.target.dataset.evidenceToggle);
    else selected.delete(event.target.dataset.evidenceToggle);
    frame.evidenceFocus = [...selected];
    render();
  }));
  document.querySelectorAll('[data-array-action]').forEach(el => el.addEventListener('click', () => {
    const path = JSON.parse(decodeURIComponent(el.dataset.arrayPath));
    const index = path.at(-1); const array = pathGet(editorDraft, path.slice(0,-1));
    if (el.dataset.arrayAction === 'remove') array.splice(index, 1);
    if (el.dataset.arrayAction === 'up' && index > 0) [array[index-1], array[index]] = [array[index], array[index-1]];
    if (el.dataset.arrayAction === 'down' && index < array.length-1) [array[index+1], array[index]] = [array[index], array[index+1]];
    render();
  }));
  document.querySelectorAll('[data-add-path]').forEach(el => el.addEventListener('click', () => {
    const path = JSON.parse(decodeURIComponent(el.dataset.addPath)); const array = pathGet(editorDraft, path);
    array.push(blankLike(array[0] ?? '')); render();
  }));
  document.querySelector('#edit-save')?.addEventListener('click', () => { setSectionData(editorSection, clone(editorDraft)); saveContent(); showToast('Changes saved'); render(); });
  document.querySelector('#export-content')?.addEventListener('click', exportContent);
  document.querySelector('#import-content')?.addEventListener('click', () => document.querySelector('#import-file').click());
  document.querySelector('#import-file')?.addEventListener('change', importContent);
  document.querySelector('#reset-content')?.addEventListener('click', resetContent);
  document.querySelector('#baseline-cta')?.addEventListener('click', () => showToast('Baseline conversation ready to begin'));
  document.onkeydown = handleEscape;
}
function handleEscape(event) { if (event.key === 'Escape' && editorOpen) closeEditor(); }
function closeEditor() { editorOpen = false; editorDraft = null; document.onkeydown = null; render(); }
function exportContent() {
  const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob); const link = document.createElement('a');
  link.href = url; link.download = 'heiaxis-content.json'; link.click(); URL.revokeObjectURL(url); showToast('Content exported');
}
function importContent(event) {
  const file = event.target.files?.[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const incoming = JSON.parse(reader.result);
      if (!incoming.home || !Array.isArray(incoming.departments) || !incoming.baseline) throw new Error('Invalid structure');
      content = ensureCurrentAssets(ensureStableEvidenceIds(mergeDefaults(defaultContent, incoming)));
      content.meta.version = defaultContent.meta.version;
      saveContent(); editorSection = 'home'; editorDraft = getSectionData(editorSection); showToast('Content imported'); render();
    } catch { showToast('That file is not valid HEIAXIS content'); }
  };
  reader.readAsText(file);
}
function resetContent() {
  if (!confirm('Reset all edits to the original HEIAXIS demo content? This cannot be undone.')) return;
  content = clone(defaultContent); visited = new Set(); selectedAudienceId = null; pendingAudienceId = null; audienceSetupOpen = true; audienceSetupFirstRun = true; editorOpen = false; localStorage.removeItem(STORAGE_KEY); localStorage.removeItem(VISITED_KEY); localStorage.removeItem(AUDIENCE_KEY); editorSection = 'home'; editorDraft = null; showToast('Defaults restored'); render();
}

function render() {
  if (!selectedAudienceId) {
    app.innerHTML = `<div class="app">${renderAudienceSetup(true)}</div>`;
    bindEvents();
    return;
  }
  const route = getRoute();
  let markup;
  if (route === 'home') markup = homeView();
  else if (route.startsWith('department-')) markup = departmentView(route.replace('department-', ''));
  else if (route === 'journey') markup = journeyView();
  else if (route === 'leadership') markup = leadershipView();
  else if (route === 'cohort') markup = cohortView();
  else if (route === 'baseline') markup = baselineView();
  else { go('home'); return; }
  app.innerHTML = markup;
  bindEvents();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('hashchange', render);
render();
