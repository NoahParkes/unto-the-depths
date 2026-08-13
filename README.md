# Unto the Depths

Unto the Depths is a web app for building point-crawl dungeons for use with the TTRPG 'Trespasser: Dark Fantasy Tactics'. Rooms are discrete locations (not necessarily literal rooms) within the dungeon, connected by passageways, and are represented as 'room cards' which are consistently formatted summaries of a room's features.

The app provides a functional editor interface for manually creating and editing room cards, alongside a synced reader view that renders the same data in the room card's normal display format.

## Core Concepts

### Room
A room has a title, description, an `isDark` flag, and an ordered list of features. Title tags (`D`, `E`, `T`) are computed from `isDark` and the presence of an Encounter / Room Trap among the room's features.

### Features
Features are the primary content of a room and are modeled as a **discriminated union** (`type: 'encounter' | 'roomTrap' | 'detail'`) so each type can carry its own mandatory/optional fields while sharing a common base shape (`id`, `detailName`, `subDetails`).

Every feature has a **display name**, derived from its type and its `detailName`:

| Type | Display format | Notes |
|---|---|---|
| Encounter | `Encounter: {tokens}.` | Max **one** per room; adds `E` tag |
| Room Trap | `Room Trap: {detailName}.` | Max **one** per room; adds `T` tag |
| Detail | `{detailName}.` | Generic, catch-all; default state |
| Detail (trapped) | `Detail Trap: {detailName}.` | Detail with `trapped` toggled on; does **not** add `T` tag |

Features are always listed in the order **Encounter → Room Trap → Detail**. Signs are out of scope for now.

#### Encounter
- One or more `tokens` (`{count, name}`, e.g. "3 Rats")
- `description`

#### Room Trap
Field order: `name` → `hidden` (1–5) → `description` → `disarm` (optional) → `trigger` (mandatory) → `effect`.

#### Detail
- `description` is the only mandatory field
- Optional `trapped` toggle unlocks `trigger` / `disarm` / `effect` — same shapes as Room Trap, capped at **one of each**

#### Shared sub-structures
- **Test**: `{attributeName (Might/Agility/Intellect/Spirit), skill, difficulty}` — used inside `Trigger`, `Disarm`, and `Check`
- **Sub-details** (attachable to any feature, not further nestable):
  - `Check` — a `test` plus optional description
  - `Note` — optional `name` plus `description`

## Architecture

- **Shared data layer** (`types/`, `config/featureRegistry.ts`, `config/subDetailRegistry.ts`, `utils/roomLogic.ts`) holds the data model, per-feature-type metadata (labels, blank-state factories, display-name logic, singleton rules), and pure derivation functions (room tags, composite titles). Both editor and reader call into this layer rather than reimplementing logic.
- **Editor and Reader are separate component trees** (`components/editor/`, `components/reader/`), not a unified card component — but both read/write the same underlying `Room` state via shared context (`state/RoomContext.tsx`), so they stay in sync automatically with no manual serialization step.
- **Persistence is isolated** in `state/usePersistedRoom.ts` and `services/storage.ts`, which sit above `RoomProvider` and own autosave/load/export, keeping the context layer agnostic of `localStorage`.
- **Styling stays in CSS files**, not inline or in component logic — each component has a co-located `styling/*.css` file.

## Editor UX
- Blank room: empty title/description fields, `isDark` tickbox, and a `+` button to add the first feature.
- Adding a feature prompts a dropdown (Encounter / Room Trap / Detail); Encounter and Room Trap disable themselves from the dropdown once one exists in the room, and re-enable if removed.
- Each feature is a tile indented beneath the description, numbered (A., B., ...), with a red delete button.
- Sub-details are added via a `+` button on each feature, offering only sub-details valid for that feature.
- A preview toggle swaps the card view to the reader's rendered style in real time, without needing to save first.

## Persistence & Export
- Room state auto-persists as the user types, via a storage layer isolated from both component trees.
- A manual save button supplements autosave.
- A JSON export function saves the current room data to a downloadable `.json` file.

## Tech Stack
- **React** (Vite) — component-based UI, `useState`/`useRef`/Context hooks
- **TypeScript** — strict typing for room/feature data structures
- **CSS** (custom) — all styling kept in `.css` files, not component code

## Running the Project
Requires **[Node.js](https://nodejs.org/en/download/)** (v18.x+) and **[npm](https://docs.npmjs.com/)**

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`
4. Open the local host URL provided in the terminal
