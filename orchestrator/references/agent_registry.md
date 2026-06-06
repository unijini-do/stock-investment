상위 투자 에이전트가 여러 서브에이전트(= 스킬/프로젝트)를 조율해 “시장 진단 → 종목 발굴 → 전략 개발 → 검증 → 결정 → **포트폴리오 점검**”의 전체 흐름을 수행한다.

### 서브에이전트 레지스트리

|서브에이전트 ID                                     |역할                                                            |입력                                                       |출력                                                                             |상태  |
|----------------------------------------------|--------------------------------------------------------------|---------------------------------------------------------|-------------------------------------------------------------------------------|----|
|`strategy-developer` (= pine-strategy-builder)|대가 전략 학습/내 아이디어 → Pine Script → 백테스트 → 개선 → 전략 라이브러리 누적|idea/strategy_name, mode, existing_code, backtest_metrics|code, weaknesses, upgrades, archetype, library_entry                           |✅ 완성|
|`community-sentiment`                         |한·미 커뮤니티 감정 온도계 + 역발상 신호                                      |scope, ticker, macro_context                             |us/kr_sentiment, cycle_position, contrarian_signal, risk_flag, trending_tickers|✅ 완성|
|`goldman-fundamental`                         |골드만삭스식 기본적 분석 (10개 항목, 한글 리서치 노트)                             |ticker, concerns                                         |rating, conviction, target_price_bull/bear, moat_scores, financial_health      |✅ 완성|
|`daily-swing-briefing`                        |하향식 스윙 브리핑 (거시→산업→이벤트→종목, HTML 대시보드)                          |start_date, focus_assets                                 |overall_signal, top_risks, contrarian_buys, stock_cards, leading_tech_picks    |✅ 완성|
|`etf-leader-extractor`                        |인기 ETF Top3 → 주도 종목 추출 (미·한)                                  |market(us/kr/both), theme_filter                         |us/kr_hot_etfs, leader_stocks, dominant_themes                                 |✅ 완성|
|`macro-regime`                                |거시 국면 판정 (4국면) + 포지셔닝 번역                                      |focus(us/kr/both)                                        |us/kr_regime, exposure_ceiling, leading_sectors, transmission_note             |✅ 완성|
|`portfolio-manager`                           |보유 포트폴리오 점검 → 7레이어 진단 → 비중 조정 제안 (6단계)                        |holdings, cash_weight, macro_context, etf_leaders, sentiment, fundamental_ratings, trade_decisions|total_equity_exposure, rebalance_actions(현→목표·액션·근거), cash_recommendation, concentration_warnings, risk_flags|✅ 완성|
|`trade-journal`                               |매매일지 기록·복기 + 1단계 스캔 로컬 아카이빙                                  |action, decision, outcome, scan result                   |Markdown/HTML/JSON 생성·갱신, 패턴 분석                                                   |✅ 완성|
|`stock-screener`                              |조건 기반 종목 스크리닝                                                 |criteria(밸류/모멘텀/배당 등)                                    |ranked_tickers[]                                                               |🔧 예정|
|`backtest-fetcher`                            |실데이터로 백테스트 지표 계산                                              |ticker, strategy_code                                    |backtest_metrics                                                               |🔧 예정|

### portfolio-manager 입출력 계약 (6단계)

```yaml
입력:
  holdings: [{ ticker, weight, avg_price, pnl_pct, market }]   # 스크린샷이면 OCR 추출
  cash_weight: float
  macro_context: {}        # 1단계 — exposure_ceiling, regime, leading_sectors
  etf_leaders: {}          # 1단계 — dominant_themes
  sentiment: {}            # 1단계 — cycle_position
  fundamental_ratings: {}  # 2단계 — ticker별 rating/target/financial_health
  trade_decisions: {}      # 5단계 — 신규 진입·청산 후보 + 손절/목표
출력:
  total_equity_exposure: float
  exposure_vs_ceiling: string
  rebalance_actions: [{ ticker, current, target, action(추가/축소/유지/청산), reason }]
  cash_recommendation: string
  concentration_warnings: []
  risk_flags: []
  checklist_result: { quant_pass/8, qual_pass/4, violations[] }  # 서적 기반 8+4 체크리스트
역할 경계:
  하는 것: 보유 진단·비중 제안·집중도/리스크 플래그·현금 가이드·로컬 기록
  안 하는 것: 자동 리밸런싱, 신규 종목 발굴(→etf-leader), 펀더멘털 원분석(→goldman-fundamental), 전략 코드(→pine)
```
