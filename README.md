# Chat App

Real-time chat built with Socket.IO (Node.js server) and a static HTML/JS client.

## Prerequisites

- Node.js 18+
- A static file server for the client (for example, the Live Server extension in VS Code on port 5500)

## Run locally

1. Install server dependencies:

   ```bash
   cd nodeServer
   npm install
   ```

2. Start the chat server (port `8001`):

   ```bash
   npm start
   ```

3. Serve the project root (where `index.html` lives) with your static server, then open the page in the browser.

4. Enter a display name when prompted to join the room.

## Project layout

- `index.html`, `client.js`, `style.css` — browser client
- `nodeServer/index.js` — Socket.IO server
