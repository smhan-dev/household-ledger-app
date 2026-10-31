# DayPocket 작업 인계 문서

새 세션에서 이어서 작업할 때 이 문서부터 읽으세요. 마지막 갱신: 2026-10-31.

## 한 줄 요약
DayPocket(가계부 앱)의 **클릭 가능한 웹 프로토타입**을 만들었고, 색 조합 시안 단계까지 왔습니다. 다음 할 일은 **색 1개 확정 → Flutter 앱으로 옮기기 위한 Spec 작성**입니다.

## 프로젝트 개요
- **무엇**: "오늘 쓸 수 있는 돈"을 중심에 둔 가계부 앱. 안드로이드 먼저, iOS는 나중에.
- **핵심 화면**: 처음 세팅(온보딩) → 오늘(지출 입력) → 기록 → 계획.
- **핵심 계산**: 하루 예산 = (잔액 + 월급날 전 들어올 돈 − 월급날 전 고정비 − 빚 상환 − 저축) ÷ 월급날까지 남은 일수, 100원 단위 내림. 하루 예산은 매일 초기화, 남거나 초과한 금액은 주간 잔액(월~일)에만 반영.
- **언어**: 한국어 / English 둘 다. 기본은 기기 언어.
- **데이터**: 브라우저 localStorage에만 저장, 외부 전송은 CSP로 차단(프로토타입 기준).

## 확정된 결정 (사용자가 정한 것)
- 플랫폼: 안드로이드 먼저, iOS 확장 가능성 있음 → 실제 앱은 **Flutter** 예정(전역 학습에도 있음).
- 언어: 한/영 동시 지원.
- 예산: 하루 예산 매일 초기화, 주간 잔액에 이월분 표시. 주는 **월요일 시작**.
- 개인정보: "데이터는 기기 밖으로 안 나간다"를 유머러스하게 안내하되, 실제 동작(CSV 내보내기만 예외)과 문구를 일치시킴.
- 타이포그래피/정렬 원칙: 전역 학습으로 저장됨(사용자 환경설정 → 코딩 스타일). 이미 괜찮은 곳은 억지로 바꾸지 않기.

## 열려 있는 결정 (사용자 답 대기)
1. **색 조합 최종 선택** ← 지금 여기. 아래 "색 시안" 참고.
2. 월급날이 지난 뒤 월급을 잔액에 자동으로 더할지 (현재는 "다시 계산" 배너로 수동).
3. 수익 모델(무료/광고/구독)은 아직 안 정함.

## 저장소 / 접근
- GitHub: `smhan-dev/household-ledger-app` (공개)
- 작업 브랜치: `prototype/daypocket-web`, PR #1 (base `main`, 열림): https://github.com/smhan-dev/household-ledger-app/pull/1
- **브랜치 정책**: `main`에 직접 커밋 금지. 이 세션에서 선택된 현재 브랜치(`prototype/daypocket-web`)에 커밋하고 push, PR은 그 브랜치에서 `main`으로.
- 라이브 프리뷰(GitHub Pages): https://smhan-dev.github.io/household-ledger-app/prototype/
  - 색 시안은 주소 끝에 `?theme=이름` 추가. push 후 Pages 재빌드는 `gh api repos/smhan-dev/household-ledger-app/pages/builds/latest`로 상태 확인(보통 1~2분).
- 샌드박스 제약: 이 환경에서는 `github.io` / `chatgpt.site` 주소로 직접 접속이 막혀 있음. 프리뷰 검증은 Playwright로 로컬 파일을 `https://daypocket.local/`에 매핑해서 함(아래 "테스트 방법" 참고).

## 파일 구조 (`prototype/`)
- `index.html` — 진입점. CSP로 외부 요청 차단, Pretendard preload, `theme.js`+`styles.css` 로드.
- `styles.css` — 모든 스타일. 맨 위 `:root`에 디자인 토큰(색/글자/간격/모서리/모션). **값은 반드시 토큰으로**.
- `i18n.js` — 한/영 문구 전체 + 고정비·빚·수입 프리셋. 키 135개, 한/영 양쪽에 다 있어야 함.
- `app.js` — 렌더링, 예산 계산(`calc`), 이벤트. 프레임워크 없는 바닐라 JS.
- `fonts/` — Pretendard woff2(자체 호스팅) + OFL 라이선스.
- `theme.js` + `themes/*.css` — 색 시안 미리보기. **확정 후 삭제 예정**(아래).
- `palettes/` — 시안 비교 보드와 화면 캡처(문서용).
- `DESIGN.md` — 디자인 문법(색/글자/간격/모션/문구/컴포넌트 규칙). 화면 만들 때 이 값만 사용.
- `SECURITY.md` — 데이터 흐름, 보안 시험 결과, Flutter 앱에서 다시 확인할 것.
- `PALETTES.md` — 색 시안 비교(최종 후보 5개 + 이전 시안).
- `README.md` — 프로토타입 소개.

## 색 시안 현황 (현재 집중 지점)
`PALETTES.md`에 최종 후보 5개 정리됨. 사용자가 **H(코코아&로즈)와 I(블랙&라벤더)를 마음에 들어했고**, 여기에 J(처음 네이비&라임 다듬음) + 새로 만든 K, L을 더해 5개로 맞춘 상태.

| 코드 | theme= | 메인 / 키 | 컨셉 |
|---|---|---|---|
| J | navylime | 네이비 `#1A2B85` / 라임 `#CFF56B` | 에너지, 스포티 |
| H | cocoa | 코코아 `#4E2F24` / 로즈 `#F6A8BF` | 따뜻함, 디저트 |
| I | monolav | 검정 `#111111` / 라벤더 `#C4B5FD` | 미니멀, 모던 |
| K | merlot | 와인 `#561B3A` / 아이스블루 `#BFE0FF` | 시크, 럭셔리 |
| L | olive | 올리브 `#38431F` / 망고 `#FFB547` | 내추럴, 대담 |

- 모든 시안 글자 대비 4.5:1 이상 확인함. 초과 카드 빨강은 전 시안 공통(`#C93E31`→`#B53124`)으로 통일됨.
- `themes/`에는 걸러낸 이전 시안(midnight/teal/plum/clear/pine/mono/plumlime)도 아직 남아 있음.

## 다음 할 일
1. **사용자가 색 1개(또는 조합) 확정하면**:
   - 고른 `themes/<name>.css` 값을 `styles.css`의 `:root`와 `DESIGN.md` 2장에 반영.
   - `theme.js`, `themes/` 폴더, `palettes/`(원하면), `index.html`의 `<script src="theme.js">` 제거.
   - (선택) 여러 개를 앱 내 테마 선택 기능으로 남길 수도 있음 — 그 경우엔 지우지 말 것.
2. **Flutter 전환 Spec 작성**: 요구사항 → 설계 → 작업 목록. `SECURITY.md` 5장(안드로이드 자동 백업, 백업·복원 시험, 로그, 권한)을 요구사항에 포함.
3. 열린 결정(월급 자동 반영, 수익 모델) 확정되면 반영.

## 테스트 방법 (중요)
Playwright로 검증함. `github.io` 직접 접속이 막혀서 **로컬 파일을 가짜 도메인에 매핑**하는 방식 사용:
```js
// playwright browser_run_code_unsafe 안에서
await page.route('https://daypocket.local/**', async r => {
  let p = r.request().url().replace('https://daypocket.local','').split('?')[0];
  if (p === '/') p = '/index.html';
  await r.fulfill({ path: '/projects/sandbox/household-ledger-app/prototype' + p });
});
await page.goto('https://daypocket.local/?theme=merlot');
```
- 뷰포트 412×900(모바일). 캡처는 `palettes/`나 `.kiro/artifacts/screenshots/`에 저장.
- 코드 수정 후엔 `node --check app.js`, `node --check theme.js`로 문법 확인.
- i18n 키 누락 검사: `app.js`의 `t('...')` 키가 한/영 양쪽에 다 있는지 확인(이전 세션에서 스크립트로 135개 검증함).
- 보안 회귀 검사 항목: 외부 요청 0건(CSP), 메모 XSS 비실행, CSV 수식 주입 방어, 저장 버튼 중복 탭 1건만, 미래 날짜 거부, 손상된 localStorage에도 안 깨짐, 전체 삭제 동작.

## 코딩 규칙 (이 프로젝트)
- `styles.css`는 토큰만 사용. 새 값이 필요하면 `:root`와 `DESIGN.md`에 먼저 추가.
- 한글 줄바꿈 `word-break: keep-all` + `overflow-wrap: anywhere` 유지. 숫자는 `tabular-nums`.
- 사용자에게 보고할 때: 명령 출력/파일 내용을 사용자가 직접 못 보므로 결과를 글로 요약하고, 리뷰는 PR 링크나 Pages 링크로 안내.
- 커밋은 현재 브랜치에만. 특정 파일만 add(`git add prototype`), `main` 직접 커밋 금지.
