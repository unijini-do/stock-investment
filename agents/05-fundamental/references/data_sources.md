# 데이터 수집 전략

재무·밸류에이션 데이터는 최신 웹 검색으로 최신값을 확인한다. 기억에 의존하지 않는다.

## 검색 우선순위 (신뢰도 순)
1. **기업 IR / SEC 공시** (10-K, 10-Q, 8-K) — 가장 신뢰. `<회사명> 10-K`, `<티커> investor relations`
2. **재무 데이터 사이트** — `<티커> financials`, `<티커> P/E EV/EBITDA`, `<티커> free cash flow`
3. **최신 실적** — `<티커> latest earnings`, `<티커> Q earnings <올해>` (최신성 중요, 분기 실적 반영)
4. **섹터 비교** — `<섹터> average P/E`, `<티커> peers valuation`

## 항목별 검색 쿼리 패턴
| 분석 항목 | 검색 쿼리 |
|---|---|
| 매출 구성 | `<티커> revenue by segment` |
| 5년 마진 추이 | `<티커> gross operating net margin 5 year` |
| 재무 건전성 | `<티커> debt to equity current ratio cash` |
| FCF | `<티커> free cash flow yield growth` |
| 밸류에이션 | `<티커> PE PS EV/EBITDA vs 5 year average` |
| 내부자 지분 | `<티커> insider ownership` |
| 최신 실적 | `<티커> earnings <현재연도> guidance` |

## 최신성 주의
- 주가·시가총액·밸류에이션 배수는 빠르게 변한다 → 반드시 최신 검색.
- 분기 실적 발표 직후면 가장 최근 분기를 반영했는지 확인.
- 현재 연도를 쿼리에 넣을 때 실제 현재 연도를 사용 (예: "2026 earnings").

## 데이터 신뢰 원칙
- 출처가 엇갈리면 1차 출처(공시) 우선. 차이를 노트에 명시.
- 확인 불가 항목은 추정하지 말고 "데이터 미확인"으로 표기.
- 애널리스트 컨센서스 목표가는 참고로만, 본 분석의 독립적 결론과 구분해 제시.
