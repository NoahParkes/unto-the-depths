# Unto the Depths
Unto the Depths is a web app for generating point-crawl dungeons for use with the TTRPG 'Trespasser: Dark Fantasy Tactics'. Unto the Depths generates random 'room cards' - consistently formatted summaries of features present in rooms. These rooms can then be strung together with connecting passageways to serve as dungeons for use with a point-crawl system. 

## Planned stack
- React (with Vite)
    - to handle frontend UI components
    - state management with useStat/useReducer react hooks
- Tailwind CSS
    - css framework
- Deployment to github pages

## MVP Feature Plan
- room card as basic plain-text box with room details in rows, no formatting or style
- random room card is drawn from a deck using a button click
    - room details are always same on each card

#### Basic Generator Logic