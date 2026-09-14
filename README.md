# HEIAXIS interactive pathway demo

A dependency-free, presentation-ready interactive story based on the supplied HEIAXIS visual references. It reconstructs the experience as editable HTML, CSS, and JavaScript rather than displaying the mockups.

## Run locally

1. Open a terminal in this folder.
2. Run `npm run dev`.
3. Open `http://localhost:4173`.

On Windows PowerShell systems that block `npm.ps1`, run `npm.cmd run dev` instead.

## Present the story

- On the first visit, choose one of the five Audience Lenses and select **Start Demo**.
- The lens changes executive questions and interpretation while Maya's events, dates, and illustrative metrics remain shared.
- Use the understated **Presenting for** control in the header to change the lens later without resetting explored doors.
- Start in the hallway and open any department door.
- The department buttons continue Maya's journey in sequence.
- After three departments have been explored, the hallway surfaces the full-path reveal.
- Leadership opens the connected pathway, then zooms out to an illustrative cohort and the 21-Day Baseline.
- The top progress rail and home button allow non-linear navigation.

## Edit without code

Select the gear in the top-right to open **Content studio**. Choose a screen, edit its fields or lists, reorder events with the arrow controls, and select **Save changes**. Saved changes persist in the browser's `localStorage`.

The editor also supports:

- **Export content** to download `heiaxis-content.json`.
- **Import content** to restore or share an exported content file.
- **Reset to default** to clear browser edits after confirmation.

Choose **Audience Lens framing** in Content Studio to edit an audience label, its core question, and the question, HEIAXIS reveal, and takeaway for each department and Leadership.

Each Audience Lens also includes:

- A presentation mode: `executive`, `strategic`, `operational`, `timing`, or `lifecycle`.
- An evidence foregrounding list selected through labeled checkboxes—internal IDs never need to be typed.

The shared facts live in `evidenceCatalog`. Role configurations reference those facts by stable ID, so changing the audience changes evidence order, emphasis, abstraction, and interpretation without creating another Maya journey. Supporting evidence remains available with reduced visual emphasis; executive mode places detailed workflow records behind an expandable disclosure.

The active Audience Lens is stored separately under `heiaxis-audience-v1`. Existing content stored under `heiaxis-content-v1` is merged into the current schema automatically, preserving prior edits while adding the evidence catalog, stable event IDs, presentation modes, and default role focus lists.

## Content and assets

- Default copy, Audience Lens framing, and data: `content.js`
- Runtime behavior and reusable render components: `app.js`
- Visual design and responsive behavior: `styles.css`
- HEIAXIS logo: `assets/heiaxis-logo.jpeg`
- Student image: `assets/maya.webp`

To replace the logo or student portrait, add the new image under `assets/` and update `brand.logoImage` or `student.image` in `content.js`. The student crop can be tuned with `student.imageZoom` and `student.imagePosition`. You can also change these values from Content Studio under **Hallway, student & brand**.

All institutional metrics in the demo are illustrative and are labeled that way in the interface.
