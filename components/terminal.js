export const Terminal = {
  template() {
    return `
      <section class="panel terminal-panel">
        <div class="panel-header">
          <span>TERMINAL // BREACH CONSOLE</span>
          <span class="online">● ONLINE</span>
        </div>
        <div id="console-log" class="console-log">
          <div class="log-line">SYSTEM READY...</div>
        </div>
        <div class="puzzle">
          <div class="puzzle-meta">
            <div>TARGET SERVER<strong id="target-name">---</strong></div>
            <div>ACCESS CODE<strong id="target-code">----</strong></div>
          </div>
          <div class="timer"><div id="timer-bar"></div></div>
          <form id="hack-form" class="hack-form">
            <input id="hack-input" autocomplete="off" maxlength="4" placeholder="ENTER CODE">
            <button type="submit">BREACH</button>
          </form>
        </div>
      </section>
    `;
  },
  mount(root) {
    root.innerHTML = this.template();
  }
};
