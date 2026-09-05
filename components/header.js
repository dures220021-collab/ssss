export const Header = {
  template() {
    return `
      <header class="status-bar">
        <div class="system-title">>> CYBER_TERMINAL_v1.0.4</div>
        <div class="status-group">
          <span>COINS: <b id="stat-coins">0</b></span>
          <span>LEVEL: <b id="stat-level">1</b></span>
          <span>BOTS: <b id="stat-bots">0</b></span>
        </div>
      </header>
    `;
  },
  mount(root) { root.innerHTML = this.template(); }
};
