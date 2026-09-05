# CYBER-TERMINAL — JS Component Architecture

이번 버전은 HTML 파일을 fetch해서 조립하는 방식이 아닙니다.

각 `.js` 파일이 **컴포넌트 자체**입니다.

- `header.js` → Header 컴포넌트 + HTML template
- `terminal.js` → Terminal 컴포넌트 + HTML template
- `sidebar.js` → Sidebar 컴포넌트 + HTML template
- `game.js` → 게임 상태/이벤트/로직
- `app.js` → 컴포넌트 조립
- `state.js` → 공통 상태
- `app.js.css` → 스타일

따라서 `components/*.html`을 fetch하지 않아 404가 발생하지 않습니다.

## 실행
Live Server 등 HTTP 서버로 `index.html`을 실행하세요.
`file://`로 직접 열기보다 HTTP 서버 사용을 권장합니다.
