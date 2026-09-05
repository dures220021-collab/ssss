const COMPONENTS = {
    header: "./src/components/header/header.html",
    terminal: "./src/components/terminal/terminal.html",
    sidebar: "./src/components/sidebar/sidebar.html",
};

async function loadTemplate(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Template load failed: ${url}`);
    }

    return response.text();
}

async function renderComponent(targetId, templateUrl) {
    const target = document.getElementById(targetId);
    target.innerHTML = await loadTemplate(templateUrl);

    return target;
}

async function mountComponents() {
    await Promise.all(
        Object.entries(COMPONENTS).map(([targetId, templateUrl]) =>
            renderComponent(targetId, templateUrl)
        )
    );

    // DOM이 모두 만들어진 뒤 게임 JS를 실행한다.
    await import("./game.js");
}

mountComponents().catch((error) => {
    console.error("[APP] Component mount error:", error);
});
