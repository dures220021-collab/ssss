# CYBER-TERMINAL

HTML을 **템플릿(template)**으로 사용하고, JavaScript가 컴포넌트를 로드/렌더링하는 구조입니다.

## 구조

src/
├── main.js                 # 컴포넌트 로더 / 앱 진입점
├── game.js                 # 게임 동작 및 이벤트
├── state.js                # 게임 상태
├── styles/
│   └── main.css            # 전체 스타일
└── components/
    ├── header/
    │   └── header.html     # Header 템플릿
    ├── terminal/
    │   └── terminal.html   # Terminal 템플릿
    └── sidebar/
        └── sidebar.html    # Sidebar 템플릿

## 핵심 방식

index.html은 컴포넌트의 실제 마크업을 직접 갖지 않습니다.

JavaScript의 `COMPONENTS` 목록이 HTML 템플릿을 가져오고,
`renderComponent()`가 해당 HTML을 DOM에 삽입합니다.

그 후 `import("./game.js")`를 실행하기 때문에
게임 JS는 컴포넌트가 모두 렌더링된 이후 DOM을 안전하게 사용할 수 있습니다.

## 실행

반드시 Live Server 같은 HTTP 서버에서 실행하세요.
`file://`로 직접 열면 `fetch()`로 HTML 템플릿을 읽을 수 없어 브라우저 보안 정책에 의해 동작하지 않을 수 있습니다.
