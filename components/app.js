import { Header } from "./header.js";
import { Terminal } from "./terminal.js";
import { Sidebar } from "./sidebar.js";
import { Game } from "./game.js";

const app = document.querySelector("#app");

app.innerHTML = `
  <div id="header"></div>
  <main class="main-layout">
    <div id="terminal"></div>
    <div id="sidebar"></div>
  </main>
`;

Header.mount(document.querySelector("#header"));
Terminal.mount(document.querySelector("#terminal"));
Sidebar.mount(document.querySelector("#sidebar"));
Game.init();
