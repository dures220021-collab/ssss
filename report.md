# SSSS-MAIN Vite 최소 전환 진행 상태 보고서

## 1. 현재 프로젝트 목표

기존 SSSS-MAIN 프로젝트를 Vite 기반으로 최소 전환하고, 이후 Vercel 배포 테스트까지 진행하는 것을 목표로 한다.

- Supabase key 등록 완료
- Supabase ID 등록 완료
- Vercel 환경변수 등록 완료
- Vite 기반 최소 전환 진행 중
- 현재 실제 Vite 실행 및 Vercel 배포 테스트는 아직 진행하지 않음

## 2. 현재 프로젝트 구조

```text
ssss-main/
├── package.json
├── index.html
└── src/
    ├── main.js
    ├── game.js
    ├── state.js
    ├── styles/
    │   └── main.css
    └── components/
        ├── header/
        │   └── header.html
        ├── terminal/
        │   └── terminal.html
        └── sidebar/
            └── sidebar.html
```

## 3. 완료된 작업

- `package.json` 생성
- Vite 실행/빌드 스크립트 설정
- `index.html`을 Vite 기준 경로로 수정
- `src/main.js` 확인 및 오류 처리 보강
- 컴포넌트 HTML을 `public/components`로 이동하는 단계까지 진행

## 4. package.json 설정

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "vite": "^7.1.5"
  }
}
```

## 5. index.html 변경 사항

기존 화면 구조는 유지하고 Vite 기준 경로로 변경했다.

```html
<link rel="stylesheet" href="/src/styles/main.css">
```

```html
<script type="module" src="/src/main.js"></script>
```

Google Fonts 설정과 기존 HTML 구조는 유지했다.

## 6. src/main.js 상태

현재 `main.js`는 다음 구조로 동작한다.

1. header, terminal, sidebar 컴포넌트 경로를 정의
2. `fetch()`로 HTML 템플릿을 불러옴
3. 각 대상 DOM에 HTML 삽입
4. 모든 컴포넌트 렌더링 완료 후 `game.js`를 동적으로 import
5. 대상 DOM이 없거나 템플릿 로드에 실패하면 콘솔에 오류 출력

현재 코드의 핵심 구조:

```js
const COMPONENTS = {
    header: "./src/components/header/header.html",
    terminal: "./src/components/terminal/terminal.html",
    sidebar: "./src/components/sidebar/sidebar.html",
};
```

## 7. 다음 작업

현재 진행해야 할 작업은 컴포넌트 HTML 파일 이동이다.

기존:

```text
src/components/
├── header/header.html
├── terminal/terminal.html
└── sidebar/sidebar.html
```

변경 목표:

```text
public/
└── components/
    ├── header/
    │   └── header.html
    ├── terminal/
    │   └── terminal.html
    └── sidebar/
        └── sidebar.html
```

HTML 파일은 내용 변경 없이 그대로 이동한다.

이후 `src/main.js`의 컴포넌트 경로를 다음과 같이 수정할 예정이다.

```js
const COMPONENTS = {
    header: "/components/header/header.html",
    terminal: "/components/terminal/terminal.html",
    sidebar: "/components/sidebar/sidebar.html",
};
```

## 8. 이후 배포 테스트 순서

1. 컴포넌트 HTML 이동
2. `main.js` 경로 수정
3. Vite build 테스트
4. build 오류 수정
5. Vercel 배포
6. 배포 사이트 접속 확인
7. 컴포넌트 404 오류 확인
8. 브라우저 콘솔 오류 확인
9. Supabase 연결 확인
10. 게임 동작 확인

## 9. 현재 상태 요약

Vite 최소 전환은 `package.json`, `index.html`, `main.js`까지 진행되었다.

현재는 **컴포넌트 HTML을 `public/components`로 이동하는 단계**이다.

아직 다음 단계인 실제 Vite build 및 Vercel 배포 테스트는 진행하지 않았다.
