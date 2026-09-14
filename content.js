export const defaultContent = {
  meta: { version: 4, demoLabel: "Illustrative demo data" },
  brand: {
    name: "HEIAXIS",
    logoImage: "./assets/heiaxis-logo.jpeg",
    tagline: "The pre-risk continuity layer for higher education",
    words: ["People", "Insights", "Connections", "Greater possibilities"]
  },
  ui: {
    edit: "Edit content",
    hallway: "Return to hallway",
    continueJourney: "Continue Maya’s journey",
    openLeadership: "Open Leadership view",
    explorePattern: "Is Maya an exception — or a pattern?",
    export: "Export content",
    import: "Import content",
    reset: "Reset to default",
    save: "Save changes",
    cancel: "Close",
    visited: "Explored",
    demo: "Live pathway demo",
    progress: ["Hallway", "Department lens", "Full path", "Institution", "Baseline"],
    revealReady: "The separate views are beginning to connect. The full pathway is ready.",
    revealButton: "See the full pathway",
    contentStudio: "Content studio",
    contentStudioHelp: "Edit the story without changing code. Changes are saved in this browser.",
    addItem: "Add item",
    audienceKicker: "Audience Lens",
    audiencePrompt: "Who are you presenting to?",
    audienceHelp: "Choose the senior-leader perspective for this conversation. Maya’s journey and the underlying evidence stay the same.",
    presentingFor: "Presenting for",
    changeAudience: "Change Audience Lens",
    startDemo: "Start Demo",
    roleEvidence: "Evidence foregrounded for this lens",
    viewFullEvidence: "View full shared department evidence",
    sameEvidence: "Same Maya evidence",
    presentationMode: "Presentation mode"
  },
  student: {
    name: "Maya",
    descriptor: "First-year student",
    profileText: "I’m excited for university, but not sure where to go when I need help.",
    journeyText: "I just want to finish. I know I can do this.",
    image: "./assets/maya.webp",
    imageZoom: 180,
    imagePosition: "center 12%",
    tags: ["Curious", "Determined", "Needs guidance"]
  },
  home: {
    eyebrow: "A connected path for every student",
    headline: "One student. Many departments.",
    headlineAccent: "One hidden pathway.",
    subtitle: "A university sees services separately. A student experiences one journey.",
    instruction: "Open each door to reveal a question.",
    instructionAccent: "Open Leadership to see the full path."
  },
  evidenceCatalog: {
    services_involved: { label: "Services involved", value: "4", detail: "Academic, Financial, Student Success, and Wellbeing" },
    continuity_failures: { label: "Major continuity failures", value: "4", detail: "Delay, missing ownership, extended silence, and an open loop" },
    pathway_unresolved: { label: "End-to-end pathway", value: "Unresolved", detail: "No documented completion across the full journey" },
    enrollment_active: { label: "Enrollment status", value: "First-year student", detail: "Successfully enrolled; continued progress now depends on support continuity" },
    academic_concern: { label: "Academic concern identified", value: "Sept 5", detail: "Advisor documented that Maya was struggling to keep up" },
    referral_created: { label: "Referral created", value: "Sept 5", detail: "Academic Support referred Maya to Financial Support" },
    referral_acknowledged: { label: "Referral acknowledged", value: "Sept 11", detail: "The receiving unit recorded the handoff" },
    handoff_delay: { label: "Handoff delay", value: "6 days", detail: "Elapsed time between referral and receiving-unit acknowledgment" },
    missing_owner: { label: "Documented owner", value: "None", detail: "No owner was recorded during the transition" },
    missing_documentation: { label: "Missing documentation", value: "Sept 14", detail: "Required financial-aid documents remained incomplete" },
    no_response: { label: "Student response", value: "Not recorded", detail: "No documents were received within the support window" },
    no_followup: { label: "Follow-up attempt", value: "Not recorded", detail: "No subsequent outreach attempt appears in the shared record" },
    no_reconnection: { label: "Reconnection to advisor", value: "None", detail: "The unresolved need did not return to the referring office" },
    open_loop: { label: "Pathway status", value: "Open loop", detail: "The support sequence has no documented closure" },
    institutional_silence: { label: "Without a documented next step", value: "19 days", detail: "Sept 15–Oct 2 institutional silence" },
    risk_alert: { label: "Formal risk visibility", value: "Oct 3", detail: "Student Success risk alert appears after the earlier pathway breaks" },
    wellbeing_completed: { label: "Wellbeing support", value: "Completed", detail: "A support episode was delivered successfully" },
    academic_unresolved: { label: "Academic issue", value: "Still open", detail: "Academic difficulty remained unresolved after the support episode" },
    financial_unresolved: { label: "Financial issue", value: "Still open", detail: "The financial-aid pathway remained incomplete" },
    fragmented_pathway: { label: "End-to-end status", value: "Fragmented", detail: "Strong individual services did not reconnect the broader journey" }
  },
  audienceLenses: {
    president: {
      id: "president",
      label: "President / Chancellor",
      presentationMode: "executive",
      coreQuestion: "Are we actually delivering the connected student experience we believe we are delivering?",
      departments: {
        academic: {
          evidenceFocus: ["services_involved", "continuity_failures", "institutional_silence", "pathway_unresolved"],
          question: "When we invest in advising and academic support, do students actually reach the support we intended them to receive?",
          reveal: "HEIAXIS connects the advising action to what happened afterwards: whether the referral was received, how long the transition took, whether the pathway continued, and whether the intended next step was completed.",
          takeaway: "A successful advising interaction does not necessarily mean the institutional pathway succeeded."
        },
        financial: {
          evidenceFocus: ["continuity_failures", "institutional_silence", "open_loop", "pathway_unresolved"],
          question: "Where are financial barriers remaining unresolved long enough to threaten students’ continued progress?",
          reveal: "HEIAXIS shows incomplete support pathways, delayed responses, missing follow-up, periods without clear ownership, and whether the financial issue ever reaches documented resolution.",
          takeaway: "A functioning Financial Aid office can still sit inside an unsuccessful student journey."
        },
        success: {
          evidenceFocus: ["institutional_silence", "risk_alert", "continuity_failures", "pathway_unresolved"],
          question: "How much institutional breakdown becomes visible only after a student is already classified as at risk?",
          reveal: "HEIAXIS reconstructs earlier open loops, delayed handoffs, missing ownership, and extended gaps that occurred before the later risk signal.",
          takeaway: "The risk flag may be late evidence of a process that began breaking much earlier."
        },
        wellbeing: {
          evidenceFocus: ["wellbeing_completed", "academic_unresolved", "financial_unresolved", "fragmented_pathway"],
          question: "Are our wellbeing investments connected to the rest of the student journey, or do they operate as successful but isolated interventions?",
          reveal: "HEIAXIS shows whether the intervention reconnects to unresolved academic, financial, or support needs and whether the student’s broader pathway continues afterwards.",
          takeaway: "Excellent individual services do not automatically produce an excellent institutional experience."
        },
        leadership: {
          evidenceFocus: ["services_involved", "continuity_failures", "institutional_silence", "pathway_unresolved", "handoff_delay", "missing_owner", "open_loop"],
          question: "Where is the institution systematically failing to deliver the connected experience its policies, people, and systems are designed to provide?",
          reveal: "HEIAXIS surfaces recurring handoff failures, open loops, prolonged gaps, policy-to-execution differences, and repeated pathway patterns across the institution.",
          takeaway: "The problem is no longer one student case. It is an institutional operating pattern."
        }
      }
    },
    provost: {
      id: "provost",
      label: "Provost / Academic Affairs",
      presentationMode: "strategic",
      coreQuestion: "Is the institutional system surrounding the academic journey actually supporting student progression as intended?",
      departments: {
        academic: {
          evidenceFocus: ["academic_concern", "referral_created", "handoff_delay", "no_reconnection"],
          question: "When a student is identified as needing academic support, do they actually reach and complete the support pathway we intended?",
          reveal: "HEIAXIS shows whether the referral was received, how long the handoff took, whether another unit assumed ownership, whether the intended next step occurred, and whether there was documented resolution.",
          takeaway: "Referral activity is not the same as a completed academic-support pathway."
        },
        financial: {
          evidenceFocus: ["academic_concern", "financial_unresolved", "no_reconnection", "open_loop"],
          question: "When academic difficulty and financial friction appear in the same student journey, can we see whether the institution actually reconnects those two problems?",
          reveal: "HEIAXIS shows whether the financial pathway progresses after referral, whether delays or open loops occur, whether unresolved financial issues reconnect to advising or Student Success, and how long the student remains between owners.",
          takeaway: "Academic Affairs may see the academic problem while the institutional barrier sits elsewhere."
        },
        success: {
          evidenceFocus: ["academic_concern", "institutional_silence", "risk_alert", "fragmented_pathway"],
          question: "How early does institutional support begin to fragment before academic risk becomes formally visible?",
          reveal: "HEIAXIS surfaces earlier handoff delays, missing ownership, open loops, and periods of institutional silence that occur before a later risk event.",
          takeaway: "The formal risk signal may be the first visible symptom, not the beginning of the institutional breakdown."
        },
        wellbeing: {
          evidenceFocus: ["wellbeing_completed", "academic_unresolved", "no_reconnection", "fragmented_pathway"],
          question: "After a student receives wellbeing support, do unresolved academic needs reconnect to the appropriate academic pathway?",
          reveal: "HEIAXIS shows whether the wellbeing episode is completed, what adjacent academic or support needs remain unresolved, and whether there is an explicit downstream handoff or owner.",
          takeaway: "A successful support episode does not necessarily restore the student’s broader academic-support journey."
        },
        leadership: {
          evidenceFocus: ["academic_concern", "handoff_delay", "missing_owner", "institutional_silence", "no_reconnection"],
          question: "Where are cross-unit handoffs weakening the academic-support journey we intend students to experience?",
          reveal: "HEIAXIS reconstructs the full pathway across services and identifies handoff delays, missing ownership, open loops, extended gaps, and policy-to-execution differences.",
          takeaway: "Academic progression depends partly on whether the institution surrounding the academic experience functions as a connected system."
        }
      }
    },
    student_affairs: {
      id: "student_affairs",
      label: "Student Affairs",
      presentationMode: "operational",
      coreQuestion: "Are students actually moving through our support ecosystem with clear ownership, timely follow-through, and closed loops?",
      departments: {
        academic: {
          evidenceFocus: ["referral_created", "referral_acknowledged", "handoff_delay", "missing_owner"],
          question: "When an advisor identifies a student need and refers them elsewhere, who owns the student until the next service actually engages?",
          reveal: "HEIAXIS shows when the referral was created, when the receiving unit acknowledged it, the elapsed handoff time, whether an owner was recorded during the transition, and whether the student reached the intended next step.",
          takeaway: "A referral is not a handoff unless responsibility actually transfers."
        },
        financial: {
          evidenceFocus: ["missing_documentation", "no_response", "no_followup", "no_reconnection", "open_loop"],
          question: "When a student stops progressing through a financial-support process, do we know who follows up and whether the underlying need is ever resolved?",
          reveal: "HEIAXIS connects missing documentation, outreach attempts, follow-up, escalation, reconnection to the referring office, and final disposition.",
          takeaway: "Incomplete may describe the case, but it does not tell us whether the student was supported."
        },
        success: {
          evidenceFocus: ["open_loop", "missing_owner", "institutional_silence", "risk_alert"],
          question: "How long can a student remain between services before anyone recognizes that the support pathway has stalled?",
          reveal: "HEIAXIS surfaces extended gaps, missing ownership, unresolved referrals, unsuccessful contacts, and when the next institutional intervention actually begins.",
          takeaway: "Institutional silence is itself part of the student experience."
        },
        wellbeing: {
          evidenceFocus: ["wellbeing_completed", "academic_unresolved", "financial_unresolved", "no_reconnection"],
          question: "After we successfully support a student in one area, do we make sure their other unresolved needs continue moving?",
          reveal: "HEIAXIS shows whether the wellbeing episode closed successfully, what other needs remained unresolved, whether another service received a handoff, and whether the student reconnected to the broader pathway.",
          takeaway: "A successful intervention can still leave the overall student journey unresolved."
        },
        leadership: {
          evidenceFocus: ["handoff_delay", "missing_owner", "open_loop", "institutional_silence", "pathway_unresolved"],
          question: "Where are students repeatedly falling between our support services, and where is ownership most likely to disappear?",
          reveal: "HEIAXIS reconstructs the cross-service pathway and surfaces handoff delays, open loops, unowned periods, extended silence, recurring failure points, and policy-to-execution gaps.",
          takeaway: "Student Affairs can manage services individually; HEIAXIS shows whether they function as one support system."
        }
      }
    },
    student_success: {
      id: "student_success",
      label: "Student Success / Retention",
      presentationMode: "timing",
      coreQuestion: "What begins to break in a student’s institutional journey before our existing risk systems tell us they are in trouble?",
      departments: {
        academic: {
          evidenceFocus: ["academic_concern", "referral_created", "handoff_delay", "institutional_silence"],
          question: "Before a student becomes formally at risk, can we see where their academic-support pathway first stopped moving?",
          reveal: "HEIAXIS reconstructs the sequence from concern identification through referral, acknowledgment, next action, and closure, surfacing delays or unresolved steps that appear before a later risk event.",
          takeaway: "The first meaningful warning may be a stalled support pathway, not the eventual risk flag."
        },
        financial: {
          evidenceFocus: ["financial_unresolved", "open_loop", "institutional_silence", "risk_alert"],
          question: "Which unresolved financial-support pathways are appearing in the journeys of students who later disengage or stop out?",
          reveal: "HEIAXIS connects financial friction, incomplete processes, failed contacts, long gaps, and missing reconnection with the later student journey and persistence outcome.",
          takeaway: "Financial friction becomes more useful when we see where it sits in the larger student journey."
        },
        success: {
          evidenceFocus: ["missing_documentation", "institutional_silence", "risk_alert", "open_loop"],
          question: "How long does a support pathway remain stalled before Student Success becomes aware of the student?",
          reveal: "HEIAXIS measures the time between the last meaningful institutional action and the eventual alert or intervention, while exposing unresolved handoffs and missing ownership during that period.",
          takeaway: "The intervention clock may start much earlier than the alert clock."
        },
        wellbeing: {
          evidenceFocus: ["wellbeing_completed", "fragmented_pathway", "institutional_silence", "risk_alert"],
          question: "When a student receives wellbeing support, does their broader success pathway begin moving again?",
          reveal: "HEIAXIS shows whether wellbeing support is followed by renewed contact, completed handoffs, restored cadence, or continued unresolved needs elsewhere in the institution.",
          takeaway: "An intervention matters not only because it happened, but because of what happened next."
        },
        leadership: {
          evidenceFocus: ["handoff_delay", "open_loop", "institutional_silence", "risk_alert", "fragmented_pathway"],
          question: "Which continuity failures recur in the journeys of students who later fail to persist, and where could earlier intervention change the pathway?",
          reveal: "HEIAXIS identifies repeated patterns of handoff delays, open loops, extended silence, missing ownership, and unresolved transitions and allows those patterns to be compared retrospectively with persistence outcomes. This is an illustrative retrospective question for the Baseline to test, not proof of causation or predictive performance.",
          takeaway: "Recurring institutional pathways may become visible before the eventual persistence outcome."
        }
      }
    },
    enrollment: {
      id: "enrollment",
      label: "Enrollment Management",
      presentationMode: "lifecycle",
      coreQuestion: "Where does institutional friction turn successful enrollment into preventable attrition or non-persistence?",
      departments: {
        academic: {
          evidenceFocus: ["academic_concern", "enrollment_active", "handoff_delay", "academic_unresolved"],
          question: "Once a student enrolls, where does academic friction begin threatening their ability to remain on track?",
          reveal: "HEIAXIS reconstructs whether an academic concern led to support, whether the referral progressed, how long handoffs took, which steps remained unresolved, and whether the student reconnected to the intended pathway.",
          takeaway: "Enrollment success is not durable if students cannot move through the support pathways that sustain it."
        },
        financial: {
          evidenceFocus: ["financial_unresolved", "missing_documentation", "open_loop", "enrollment_active"],
          question: "Which financial-support barriers remain unresolved long enough to put continued enrollment at risk?",
          reveal: "HEIAXIS surfaces incomplete financial-support processes, missing documentation, delayed acknowledgment, failed follow-up, unresolved barriers, and whether the student ultimately reconnects to support.",
          takeaway: "A student can be successfully enrolled and still be lost through unresolved financial friction."
        },
        success: {
          evidenceFocus: ["institutional_silence", "risk_alert", "pathway_unresolved", "enrollment_active"],
          question: "Where does an enrolled student begin drifting off the path before they become a retention problem?",
          reveal: "HEIAXIS connects unresolved needs, support gaps, open loops, and institutional silence that precede a later intervention or persistence outcome.",
          takeaway: "The point at which enrollment is lost may occur well before the student actually stops out."
        },
        wellbeing: {
          evidenceFocus: ["wellbeing_completed", "financial_unresolved", "fragmented_pathway", "enrollment_active"],
          question: "When a personal or wellbeing barrier threatens continued enrollment, does support reconnect the student to the rest of the pathway they need to persist?",
          reveal: "HEIAXIS shows whether support occurred, which adjacent needs remained unresolved, whether follow-up happened, and whether the broader institutional pathway resumed.",
          takeaway: "Removing one barrier matters most when the student can continue moving through the institution afterwards."
        },
        leadership: {
          evidenceFocus: ["enrollment_active", "financial_unresolved", "handoff_delay", "open_loop", "pathway_unresolved"],
          question: "Where are we losing students after successful enrollment because the institutional journey fails to carry them forward?",
          reveal: "HEIAXIS identifies repeated pathways involving financial friction, delayed handoffs, unresolved requirements, open loops, and extended gaps and allows those patterns to be compared with persistence and re-enrollment outcomes.",
          takeaway: "Enrollment Management should be able to see not only who leaves, but where the institutional pathway began losing them."
        }
      }
    }
  },
  departments: [
    {
      id: "academic",
      number: "01",
      title: "Academic Support",
      shortDescription: "Referrals, advising, academic friction",
      color: "#0a45ff",
      icon: "cap",
      question: "Of the students your advisors refer, how many actually reach the intended next step?",
      departmentTitle: "What the academic team sees",
      departmentSubtitle: "A student in need. A responsible advisor. Next steps set.",
      studentQuote: "I’m struggling to keep up because I have increased work hours.",
      departmentView: [
        { evidenceId: "academic_concern", text: "Advising meeting completed", date: "", status: "success" },
        { evidenceId: "academic_concern", text: "Concern documented", date: "", status: "success" },
        { evidenceId: "referral_created", text: "Referral to Financial Aid submitted", date: "", status: "success" },
        { evidenceId: "referral_created", text: "Next steps shared with student", date: "", status: "success" }
      ],
      heiaxisTitle: "How HEIAXIS answers that question",
      heiaxisSubtitle: "We connect the dots across systems to show the full story.",
      heiaxisView: [
        { evidenceId: "referral_created", text: "Referral created", detail: "", value: "Sept 5", status: "info" },
        { evidenceId: "referral_acknowledged", text: "Receiving unit acknowledgement", detail: "", value: "Sept 11", status: "info" },
        { evidenceId: "handoff_delay", text: "Handoff delay", detail: "Time between owners", value: "6 days", status: "warning" },
        { evidenceId: "pathway_unresolved", text: "Final disposition", detail: "", value: "No documented closure", status: "critical" }
      ],
      insight: "The advisor did their job. The pathway still failed.",
      secondaryInsight: "Visibility creates accountability. Accountability creates opportunity."
    },
    {
      id: "financial",
      number: "02",
      title: "Financial Support",
      shortDescription: "Aid requests, missing documents, delays",
      color: "#164fe8",
      icon: "coins",
      question: "When a student does not complete the financial-aid process, what happens next?",
      departmentTitle: "What Financial Support sees",
      departmentSubtitle: "A student in need. A process that stalls.",
      studentQuote: "I started my financial-aid application, but I couldn’t complete the process.",
      departmentView: [
        { evidenceId: "referral_acknowledged", text: "Referral received", date: "", status: "success" },
        { evidenceId: "missing_documentation", text: "Documentation requested", date: "", status: "success" },
        { evidenceId: "financial_unresolved", text: "Case marked incomplete", date: "", status: "warning" },
        { evidenceId: "open_loop", text: "Process stalled", date: "", status: "critical" }
      ],
      heiaxisTitle: "How HEIAXIS answers that question",
      heiaxisSubtitle: "Connecting the dots to show what happens after the handoff.",
      heiaxisView: [
        { evidenceId: "missing_documentation", text: "Documentation request sent", detail: "FAFSA and verification documents requested.", value: "", status: "info" },
        { evidenceId: "no_response", text: "No student response", detail: "No documents received within 21 days.", value: "", status: "warning" },
        { evidenceId: "no_followup", text: "No recorded follow-up", detail: "No outreach attempt logged.", value: "", status: "critical" },
        { evidenceId: "no_reconnection", text: "No reconnection to advisor", detail: "Case not reassigned or escalated.", value: "", status: "critical" },
        { evidenceId: "open_loop", text: "Pathway status", detail: "Student remains unconnected across systems.", value: "OPEN LOOP", status: "critical" }
      ],
      insight: "A closed case is not always a completed pathway.",
      secondaryInsight: "Critical context is missing across systems, teams, and time."
    },
    {
      id: "success",
      number: "03",
      title: "Student Success",
      shortDescription: "Cases, outreach, risk visibility",
      color: "#5720c7",
      icon: "people",
      question: "How early can we see support beginning to break before a formal risk alert appears?",
      departmentTitle: "What Student Success usually sees",
      departmentSubtitle: "Information appears late, often only after formal alerts are triggered.",
      studentQuote: "By the time someone reached out, I had already been trying to solve this for weeks.",
      departmentView: [
        { evidenceId: "risk_alert", text: "Formal risk alert on Oct 3", date: "", status: "warning" },
        { evidenceId: "institutional_silence", text: "Limited visibility into earlier signals", date: "", status: "warning" },
        { evidenceId: "risk_alert", text: "Reactive response", date: "", status: "critical" }
      ],
      heiaxisTitle: "What HEIAXIS makes visible earlier",
      heiaxisSubtitle: "Connects signals across systems to reveal the unfolding story.",
      heiaxisView: [
        { evidenceId: "academic_concern", text: "Early pattern recognition", detail: "Coordinated signals across advising and financial aid.", value: "", status: "success" },
        { evidenceId: "institutional_silence", text: "Proactive outreach", detail: "Engage before a formal risk alert.", value: "", status: "success" },
        { evidenceId: "risk_alert", text: "More effective personalized support", detail: "Act while there is still time to help.", value: "", status: "success" }
      ],
      timeline: [
        { evidenceId: "academic_concern", date: "Sept 5", text: "Advisor identifies issue", status: "info" },
        { evidenceId: "handoff_delay", date: "Sept 11", text: "Financial Aid delay", status: "warning" },
        { evidenceId: "missing_documentation", date: "Sept 14", text: "Missing documentation", status: "warning" },
        { evidenceId: "institutional_silence", date: "Sept 15 – Oct 2", text: "19-day institutional silence", status: "critical" },
        { evidenceId: "risk_alert", date: "Oct 3", text: "Student Success risk alert", status: "critical", flag: "RISK BECOMES VISIBLE HERE" }
      ],
      insight: "The risk signal became visible late. The breakdown began earlier.",
      secondaryInsight: "HEIAXIS makes the pre-risk pathway visible."
    },
    {
      id: "wellbeing",
      number: "04",
      title: "Wellbeing",
      shortDescription: "Care episodes, access, follow-through",
      color: "#6f2bd1",
      icon: "heart",
      question: "After a support episode, does the student reconnect to the broader support pathway?",
      departmentTitle: "What Wellbeing sees",
      departmentSubtitle: "A student in need. A timely response. Care delivered.",
      studentQuote: "Wellbeing really helped me through a difficult week.",
      departmentView: [
        { evidenceId: "wellbeing_completed", text: "Support requested", date: "Sept 8", status: "info" },
        { evidenceId: "wellbeing_completed", text: "Appointment scheduled", date: "Sept 10", status: "success" },
        { evidenceId: "wellbeing_completed", text: "Support episode completed", date: "Sept 10", status: "success" }
      ],
      heiaxisTitle: "How HEIAXIS answers that question",
      heiaxisSubtitle: "Care quality and pathway continuity are different questions.",
      heiaxisView: [
        { evidenceId: "wellbeing_completed", text: "Support delivered", detail: "Wellbeing session completed", value: "Sept 10", status: "success" },
        { evidenceId: "academic_unresolved", text: "Academic issue still unresolved", detail: "Ongoing course difficulties", value: "Still open", status: "critical" },
        { evidenceId: "financial_unresolved", text: "Financial issue still unresolved", detail: "Aid application incomplete", value: "Still open", status: "critical" },
        { evidenceId: "no_reconnection", text: "No cross-service follow-up recorded", detail: "No referral or outreach found", value: "None", status: "critical" },
        { evidenceId: "fragmented_pathway", text: "Pathway status", detail: "Student not reconnected", value: "FRAGMENTED", status: "critical" }
      ],
      insight: "Good care inside one office does not guarantee continuity across the institution.",
      secondaryInsight: "Strong services can still sit inside a broken institutional pathway."
    }
  ],
  leadershipDoor: {
    id: "leadership",
    number: "05",
    title: "Leadership",
    shortDescription: "Patterns, bottlenecks, continuity across the institution",
    color: "#ff4b12",
    icon: "chart"
  },
  journey: {
    eyebrow: "The connected view",
    headline: "Now see the full pathway.",
    subtitle: "Separate answers. One student journey.",
    description: "Each department saw part of the story. HEIAXIS reconstructs the path between them.",
    failures: [
      { evidenceId: "handoff_delay", text: "6-day handoff delay", status: "warning" },
      { evidenceId: "missing_owner", text: "No owner recorded", status: "critical" },
      { evidenceId: "institutional_silence", text: "19-day silence", status: "critical" },
      { evidenceId: "open_loop", text: "Open loop", status: "warning" }
    ],
    events: [
      { evidenceId: "referral_created", date: "Sept 5", text: "Referral sent", department: "Academic Support", status: "info" },
      { evidenceId: "referral_acknowledged", date: "Sept 11", text: "Aid application started", department: "Financial Support", status: "warning" },
      { evidenceId: "missing_documentation", date: "Sept 14", text: "Case created", department: "Student Success", status: "warning" },
      { evidenceId: "institutional_silence", date: "Oct 2", text: "No response across systems", department: "Between services", status: "critical" },
      { evidenceId: "wellbeing_completed", date: "Oct 8", text: "Care outreach", department: "Wellbeing", status: "info" },
      { evidenceId: "no_reconnection", date: "Oct 21", text: "Follow-up needed", department: "Between services", status: "critical" }
    ],
    insight: "This was never five separate issues. It was one broken pathway."
  },
  leadership: {
    eyebrow: "Leadership view",
    headline: "Where are students getting lost between services?",
    subtitle: "Leadership isn’t just another department — it reveals what happens between them.",
    panelTitle: "What HEIAXIS makes visible",
    panelItems: [
      "Handoff delays",
      "Missing ownership",
      "Open loops",
      "Extended silence",
      "Policy-to-execution gaps",
      "Hidden pre-risk patterns"
    ],
    insight: "The integrated pathway makes invisible institutional friction visible — while there is still time to act."
  },
  cohort: {
    eyebrow: "From Maya to the institution",
    headline: "One journey becomes a pattern at scale.",
    subtitle: "Zoom out to see where continuity breaks repeatedly across an illustrative student cohort.",
    metrics: [
      { label: "Recurring pathway bottlenecks", value: "7", detail: "High-impact bottlenecks across student journeys", color: "#e5262a" },
      { label: "Open-loop rate", value: "18%", detail: "of handoffs have no recorded completion", color: "#ff4b12" },
      { label: "Average handoff delay", value: "6 days", detail: "average time students remain between owners", color: "#e78b18" },
      { label: "Policy-to-execution gaps", value: "12", detail: "misalignments between policy and practice", color: "#5b22c7" },
      { label: "Repeat failure pathways", value: "24%", detail: "of at-risk students follow a repeat pattern", color: "#e5262a" }
    ],
    heatmapTitle: "Student journey heatmap",
    heatmapSubtitle: "Where students experience friction across the institution.",
    heatmapColumns: ["Enrollment", "Academic", "Financial", "Wellbeing", "Degree progress", "Completion"],
    heatmapRows: ["All students", "First-year", "Transfer", "Pell-eligible", "Part-time", "Underrepresented"],
    heatmapValues: [
      [1,2,1,1,2,1], [1,4,3,1,3,1], [2,3,5,2,5,2], [3,2,4,3,2,4], [1,1,2,5,2,2], [2,2,2,4,1,1]
    ]
  },
  baseline: {
    eyebrow: "The next step",
    headline: "The demo raises the questions.",
    headlineAccent: "The HEIAXIS Baseline answers them with your institution’s data.",
    title: "Start with a 21-Day Baseline.",
    description: "Using historical institutional data, HEIAXIS reveals the continuity gaps already present inside your existing stack — without waiting for another semester to pass.",
    items: [
      "Where support pathways break",
      "How often they break",
      "How long students remain between owners",
      "Which failures repeat",
      "Where policy differs from recorded execution",
      "Which improvements can be made within the existing institutional stack"
    ],
    cta: "Explore the 21-Day Baseline",
    footnote: "Same data. A clearer pathway. Better outcomes."
  }
};
