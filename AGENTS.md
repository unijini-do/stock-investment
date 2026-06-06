# Investment Orchestrator Project

이 저장소에서는 모든 투자 리서치 작업을 파일 기반으로 수행한다.

## 시작 순서

1. 모든 작업에서 `shared/PREFERENCES.md`, `shared/STORAGE.md`, `shared/OUTPUT_CONTRACT.md`를 먼저 읽는다.
2. 복합 요청은 `orchestrator/INSTRUCTIONS.md`를 적용한다.
3. 단일 전문 요청은 아래 라우팅 표에 해당하는 지침을 추가로 읽는다.
4. 당일 산출물 디렉터리가 없으면 `node scripts/scaffold-day.mjs YYYY-MM-DD`로 만든다.

## 라우팅

| 요청 | 지침 |
|---|---|
| 거시, 금리, 경기 국면 | `agents/01-macro-regime/INSTRUCTIONS.md` |
| ETF 자금 흐름, 주도 종목 | `agents/02-etf-leader/INSTRUCTIONS.md` |
| 커뮤니티 심리, 과열, 공포 | `agents/03-community-sentiment/INSTRUCTIONS.md` |
| 일일 스윙 브리핑 | `agents/04-swing-briefing/INSTRUCTIONS.md` |
| 기업 재무, 밸류에이션 | `agents/05-fundamental/INSTRUCTIONS.md` |
| 투자 거장 학습, 알파 아이디어 | `agents/06a-masters-advisor/INSTRUCTIONS.md` |
| Pine Script, 백테스트 | `agents/06b-pine-builder/INSTRUCTIONS.md` |
| 매매일지, 복기, 기록 | `agents/07-trade-journal/INSTRUCTIONS.md` |
| 포트폴리오 점검, 비중 | `agents/08-portfolio-manager/INSTRUCTIONS.md` |

## 산출물 규칙

- 짧은 질의응답을 제외한 분석은 반드시 Markdown과 HTML 두 형식으로 저장한다.
- 서브 에이전트 간 전달 데이터는 같은 폴더의 `data.json`에 저장한다.
- 오케스트레이터의 최종 종합은 `outputs/YYYY-MM-DD/00-orchestrator/`에 저장한다.
- HTML은 `templates/dashboard.html`의 디자인 토큰을 유지한다.
- 출처 URL과 확인 시각을 Markdown과 HTML에 모두 남긴다.
- 외부 데이터베이스 저장을 전제로 하지 않는다.
- 하루 종료 시 `node scripts/archive-day.mjs YYYY-MM-DD`로 Obsidian용 일일 노트와 분류별 문서를 만든다.

## 안전 경계

- 분석, 검증, 기록, 의사결정 보조만 수행한다.
- 자동 주문, 자동 매매, 자동 리밸런싱은 금지한다.
- 가격과 최신 지표는 반드시 최신 출처에서 확인하며 미확인 값은 만들지 않는다.
- 모든 결정에는 반대 시나리오와 무효화 조건을 포함한다.
