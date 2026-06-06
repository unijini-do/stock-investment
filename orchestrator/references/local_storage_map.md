|분류|저장 폴더|기록 에이전트|핵심 내용|
|---|---|---|---|
|전략 라이브러리|`outputs/YYYY-MM-DD/06b-pine-builder/`|pine-strategy-builder|전략명, 출처, 아키타입, 검증상태, 승률/PF/MDD|
|매매일지|`outputs/YYYY-MM-DD/07-trade-journal/`|trade-journal|종목, 상태, 진입/손절/목표/청산가, 손익률, 복기교훈|
|거시경제 국면|`outputs/YYYY-MM-DD/01-macro-regime/`|macro-regime|미/한 국면, 노출도, 주도섹터, 스타일|
|ETF 주도 종목|`outputs/YYYY-MM-DD/02-etf-leader/`|etf-leader-extractor|시장, 쏠림테마, 주도종목, 출처|
|커뮤니티 감정|`outputs/YYYY-MM-DD/03-community-sentiment/`|community-sentiment|사이클, 온도차, 역발상 신호|
|스윙 브리핑|`outputs/YYYY-MM-DD/04-swing-briefing/`|daily-swing-briefing|리스크, 산업, 종목 카드, 가격 레벨|
|포트폴리오 점검|`outputs/YYYY-MM-DD/08-portfolio-manager/`|portfolio-manager|총노출, 현/목표 비중, 액션, 리스크 플래그|

### 누적 시점

- 1단계 스캔 직후: 거시·ETF·감정·브리핑 → 각 에이전트 폴더
- 3단계 전략 생성: → Pine 전략 폴더
- 5단계 결정: → 매매일지 폴더(상태=계획/진입)
- 6단계 포트폴리오 점검: → 포트폴리오 폴더(스냅샷)
- 매매 종료: → 기존 매매일지 Markdown과 JSON 갱신
- 하루 종료: → `node scripts/archive-day.mjs YYYY-MM-DD`로 Obsidian Vault 정리
