# Unto the Depths
Unto the Depths is a web app for generating point-crawl dungeons for use with the TTRPG 'Trespasser: Dark Fantasy Tactics'. Unto the Depths generates random 'room cards' - consistently formatted summaries of features present in rooms. These rooms can then be strung together with connecting passageways to serve as dungeons for use with a point-crawl system.

## Current Development Stage
This stage focuses on establishing the core data architecture, component structure, and the initial randomization logic. The application now successfully renders a styled room card that dynamically calculates room attributes (Dark, Encounter, Trap) based on the selected features. Random generation is functional, pulling from a curated pool of pre-defined JSON data.

## Tech Stack
- React (with Vite)
    - Component-based UI architecture
    - State management with `useState` and `useRef` hooks
- TypeScript
    - Strict typing for room data structures and feature attributes
- CSS (Custom)
    - Flexbox and Grid layouts for card centering and list formatting
    - Custom typography readability
- Data Storage
    - JSON files for room names, descriptions, and feature pools
    - TypeScript interfaces for type safety

## MVP Feature Plan (Completed)
- [x] Room card component with dynamic composite title (Room Number + Name + Attributes)
- [x] Structured data model separating room attributes from feature lists
- [x] JSON-based data storage for room components (names, descriptions, features)
- [x] Basic randomization logic selecting features from a static pool
- [x] Feature sorting logic (Encounters > Traps > General Features)
- [x] Dynamic list numbering (A, B, C) aligned with sorted feature order
- [x] Styling for centering the card and bolding specific text elements

## Roadmap (Next Phases)
- [ ] **Attribute Generation:** Generating attributes from descriptors for greater randomisation (e.g., generating names from nouns and adjectives)
- [ ] **Thematic Generation:** Implement logic to filter feature pools based on room name themes (e.g., "Crypt" rooms favor undead features)
- [ ] **Dungeon Linking:** Add `connections` attributes to rooms to define cardinal directions between rooms, and the nature of their connection (e.g. Room 1 has north-east tunnel connecting to Room 2)
- [ ] **Node Map UI:** Build a visual graph view to display the generated dungeon layout, with numbered nodes connected by lines representing rooms and their connections
- [ ] **Filtering & Tags:** Add UI controls to filter generation by difficulty, theme, or room size
- [ ] **Editing:** Add the ability to edit the text and value of room attributes, as well as moving, adding or deleting rooms
- [ ] **Persistence:** Implement local storage or file export to save generated dungeons
- [ ] **Manual Creation Tools:** Ability to create dungeons and rooms manually from scratch, by starting with one empty room and manually adding connections

### Further Ideas (Undecided Features)
- **Verticality** - Dungeons can have multiple floors or layers, with connections between nodes on different layers
- **Integration of Community Tools** - Integrate other Trespasser/RPG community tools:
    - Overlord by metamageia metamageia.github.io/overlord/ for custom statblocks
- **Tools for Running Dungeons** - Integrate Trespasser-specific tools for running dungeons e.g.:
    - Alarm/Round tracking
    - Combat tracking
    - Custom clocks - *Trespasser Rulebook pg.25*

## Architecture Overview
### Data Structure
The application uses a hierarchical JSON structure to define rooms.
- **Room Object:** Contains `roomId`, `name`, `isDark`, `description`, and an array of `features`.
- **Feature Object:** Contains `type` (encounter, trap, feature, sign), `subtype`, `name`, `hidden` value, `details`, and `tags`.
- **Pools:** Separate JSON files serve as the source for names, descriptions, and features

### Component Hierarchy
- `App`: Manages the generation loop and room state.
- `RoomCard`: The primary display component. It calculates the composite title and renders the feature list.
- `RoomFeature`: A sub-component responsible for formatting individual list items (A. Type: Name: Details).

### Generator Logic
The `generateRandomRoom` function operates in three main steps:
1.  **Main Attribute Selection:** Randomly picks a name, description and randomly determines `isDark` value
2.  **Feature Selection:** Selects as set number of features from the feature pool at random without duplicates.
3.  **Sorting:** Sorts the selected features by priority (Encounter, Trap, Feature) and hidden value before rendering.

## Running the Project
Requires **[Node.js](https://nodejs.org/en/download/)** (Version 18.x or higher) and **[npm](https://docs.npmjs.com/)**

1.  Clone the repository.
2.  Install dependencies: `npm install`
3.  Start the development server: `npm run dev`
4.  Open the local host URL provided in the terminal.
