export const Sidebar = {
  template() {
    return `
      <section class="panel sidebar-panel">
        <div class="panel-header">BLACK MARKET</div>
        <div class="shop-item">
          <div><strong>AUTO-BOT</strong><small>Passive coin generator</small></div>
          <button id="btn-buy-bot">BUY <span id="bot-cost">50</span></button>
        </div>
        <div class="shop-item">
          <div><strong>TIME BOOST</strong><small>+3 seconds per breach</small></div>
          <button id="btn-buy-time">BUY <span id="time-cost">100</span></button>
        </div>
        <div class="shop-item">
          <div><strong>SECURITY LVL</strong><small>Increase security level</small></div>
          <button id="btn-buy-level">BUY <span id="level-cost">200</span></button>
        </div>
        <div class="upgrade-info">TIME BONUS: <b id="time-bonus">0</b>s</div>
      </section>
    `;
  },
  mount(root) {
    root.innerHTML = this.template();
  }
};
