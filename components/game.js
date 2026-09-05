import { state, servers } from "./state.js";

export const Game = {
  init() {
    this.updateUI();
    this.startNewPuzzle();

    document.querySelector("#hack-form")
      .addEventListener("submit", e => this.handleHackSubmit(e));

    document.querySelector("#btn-buy-bot")
      .addEventListener("click", () => this.buyAutoBot());

    document.querySelector("#btn-buy-time")
      .addEventListener("click", () => this.buyTimeUpgrade());

    document.querySelector("#btn-buy-level")
      .addEventListener("click", () => this.buyLevelUpgrade());

    setInterval(() => {
      if (state.autoBots > 0) {
        state.coins += state.autoBots;
        this.updateUI();
      }
    }, 1000);
  },

  addLog(message, type = "") {
    const log = document.querySelector("#console-log");
    const line = document.createElement("div");
    line.className = `log-line ${type}`;
    line.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
    log.appendChild(line);
    log.scrollTop = log.scrollHeight;
  },

  updateUI() {
    document.querySelector("#stat-coins").textContent = state.coins;
    document.querySelector("#stat-level").textContent = state.secLevel;
    document.querySelector("#stat-bots").textContent = state.autoBots;
    document.querySelector("#bot-cost").textContent = state.botCost;
    document.querySelector("#time-cost").textContent = state.timeCost;
    document.querySelector("#level-cost").textContent = state.levelCost;
    document.querySelector("#time-bonus").textContent = state.timeBonus;
  },

  startNewPuzzle() {
    clearInterval(this.timerInterval);
    this.timerInterval = null;

    const server = servers[Math.floor(Math.random() * servers.length)];
    this.currentServer = server;
    this.currentCode = Array.from(
      { length: 4 },
      () => "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 36)]
    ).join("");

    this.maxTime = 15 + state.timeBonus;
    this.timeLeft = this.maxTime;

    document.querySelector("#target-name").textContent = server.name;
    document.querySelector("#target-code").textContent = this.currentCode;
    document.querySelector("#hack-input").value = "";
    document.querySelector("#hack-input").focus();

    this.addLog(`TARGET ACQUIRED: ${server.name}`, "info");

    this.timerInterval = setInterval(() => {
      this.timeLeft -= 0.1;
      document.querySelector("#timer-bar").style.width =
        `${Math.max(0, this.timeLeft / this.maxTime * 100)}%`;

      if (this.timeLeft <= 0) {
        clearInterval(this.timerInterval);
        this.addLog("TIMEOUT // CONNECTION LOST", "error");
        setTimeout(() => this.startNewPuzzle(), 800);
      }
    }, 100);
  },

  handleHackSubmit(e) {
    e.preventDefault();

    const input = document.querySelector("#hack-input");
    const value = input.value.trim().toUpperCase();

    if (value === this.currentCode) {
      clearInterval(this.timerInterval);
      state.coins += this.currentServer.reward;
      this.addLog(`BREACH SUCCESS // +${this.currentServer.reward} COINS`, "success");
      this.updateUI();
      setTimeout(() => this.startNewPuzzle(), 800);
    } else {
      state.coins = Math.max(0, state.coins - 10);
      this.addLog("BREACH FAILED // -10 COINS", "error");
      this.updateUI();
      input.select();
    }
  },

  buyAutoBot() {
    if (state.coins < state.botCost) return this.addLog("INSUFFICIENT FUNDS", "error");
    state.coins -= state.botCost;
    state.autoBots++;
    state.botCost = Math.ceil(state.botCost * 1.5);
    this.addLog(`AUTO-BOT PURCHASED // ${state.autoBots}대`, "success");
    this.updateUI();
  },

  buyTimeUpgrade() {
    if (state.coins < state.timeCost) return this.addLog("INSUFFICIENT FUNDS", "error");
    state.coins -= state.timeCost;
    state.timeBonus += 3;
    state.timeCost = Math.ceil(state.timeCost * 1.7);
    this.addLog(`TIME BOOST +3s // TOTAL +${state.timeBonus}s`, "success");
    this.updateUI();
  },

  buyLevelUpgrade() {
    if (state.coins < state.levelCost) return this.addLog("INSUFFICIENT FUNDS", "error");
    state.coins -= state.levelCost;
    state.secLevel++;
    state.levelCost = Math.ceil(state.levelCost * 2);
    this.addLog(`SECURITY LEVEL INCREASED // LV.${state.secLevel}`, "success");
    this.updateUI();
  }
};
