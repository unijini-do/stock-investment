# 백테스트 성과 측정 패턴 (강화판)

`strategy()` 스크립트에 풍부한 성과 지표를 시각화하는 표준 패턴. 사용자가 트레이딩뷰에서 직접 백테스트하므로, 차트에서 핵심 지표를 한눈에 보도록 성과 테이블을 충실히 넣는다.

## 확장 성과 테이블 (화면 우상단, 12행)
```pinescript
// ====================== BACKTEST METRICS ======================
showStats = input.bool(true, "성과 테이블 표시", group="백테스트")

// 최대 연속 손실 추적 (커스텀)
var int maxConsecLoss = 0
var int curConsecLoss = 0
if strategy.closedtrades > strategy.closedtrades[1]
    tradeProfit = strategy.closedtrades.profit(strategy.closedtrades - 1)
    if tradeProfit < 0
        curConsecLoss := curConsecLoss + 1
        maxConsecLoss := math.max(maxConsecLoss, curConsecLoss)
    else
        curConsecLoss := 0

if showStats and barstate.islast
    var table perf = table.new(position.top_right, 2, 12,
         border_width=1, frame_color=color.gray, frame_width=1, bgcolor=color.white)

    // strategy 내장 변수
    netProfit    = strategy.netprofit
    netProfitPct = strategy.netprofit / strategy.initial_capital * 100
    totalTrades  = strategy.closedtrades
    winTrades    = strategy.wintrades
    winRate      = totalTrades > 0 ? winTrades / totalTrades * 100 : 0.0
    profitFactor = strategy.grossloss != 0 ? strategy.grossprofit / strategy.grossloss : 0.0
    maxDD        = strategy.max_drawdown
    maxDDPct     = strategy.max_drawdown / strategy.initial_capital * 100
    avgWin       = winTrades > 0 ? strategy.grossprofit / winTrades : 0.0
    avgLoss      = strategy.losstrades > 0 ? strategy.grossloss / strategy.losstrades : 0.0
    riskReward   = avgLoss != 0 ? avgWin / avgLoss : 0.0
    avgTrade     = strategy.netprofit / math.max(totalTrades, 1)

    c_head = color.new(color.navy, 0)
    f(title, val, row) =>
        table.cell(perf, 0, row, title, text_size=size.small, text_color=color.black)
        table.cell(perf, 1, row, val, text_size=size.small, text_color=color.black)

    table.cell(perf, 0, 0, "지표", bgcolor=c_head, text_color=color.white, text_size=size.small)
    table.cell(perf, 1, 0, "값",   bgcolor=c_head, text_color=color.white, text_size=size.small)
    f("순손익",        str.format("{0,number,#.##}", netProfit), 1)
    f("순손익 %",      str.format("{0,number,#.##}%", netProfitPct), 2)
    f("총 거래수",      str.tostring(totalTrades), 3)
    f("승률 %",        str.format("{0,number,#.##}%", winRate), 4)
    f("Profit Factor", str.format("{0,number,#.##}", profitFactor), 5)
    f("최대 낙폭",      str.format("{0,number,#.##}", maxDD), 6)
    f("최대 낙폭 %",    str.format("{0,number,#.##}%", maxDDPct), 7)
    f("평균 손익비",    str.format("{0,number,#.##}", riskReward), 8)
    f("평균 거래손익",  str.format("{0,number,#.##}", avgTrade), 9)
    f("최대 연속손실",  str.tostring(maxConsecLoss), 10)
    f("승/패",         str.tostring(winTrades) + "/" + str.tostring(strategy.losstrades), 11)
```

> 트레이딩뷰 기본 Strategy Tester 탭에도 동일 지표가 나오지만, 차트 위 테이블로 핵심을 즉시 보면 여러 종목·기간 비교가 빠르다.

## strategy() 헤더 권장 설정 (현실적 백테스트)
```pinescript
strategy("전략명", overlay=true,
     initial_capital=10000,
     default_qty_type=strategy.percent_of_equity, default_qty_value=100,
     commission_type=strategy.commission.percent, commission_value=0.1,
     slippage=2,
     pyramiding=0,
     calc_on_every_tick=false)
```
- commission/slippage 반드시 설정 → 비현실적 낙관 방지.
- 백테스트 기간을 input.time으로 노출하면 구간별 검증 쉬움(`backtestStart = input.time(...)`).

## 주요 strategy 내장 변수
- `strategy.netprofit`, `strategy.initial_capital`, `strategy.equity`
- `strategy.closedtrades` / `strategy.wintrades` / `strategy.losstrades`
- `strategy.grossprofit` / `strategy.grossloss`, `strategy.max_drawdown`
- `strategy.closedtrades.profit(N)` — N번째 청산거래 손익(연속손실 계산용)
- `strategy.position_size`, `strategy.position_avg_price`

## 진입/청산 시각 마커
```pinescript
plotshape(longCondition, "Long", shape.triangleup, location.belowbar, color.new(color.green,0), size=size.small)
plotshape(exitCondition, "Exit", shape.xcross, location.abovebar, color.new(color.red,0), size=size.tiny)
```

## 백테스트 기간 필터 (선택)
```pinescript
useDateFilter = input.bool(false, "기간 필터 사용", group="백테스트")
startDate = input.time(timestamp("2023-01-01"), "시작일", group="백테스트")
endDate   = input.time(timestamp("2026-01-01"), "종료일", group="백테스트")
inDateRange = not useDateFilter or (time >= startDate and time <= endDate)
// 진입 조건에 and inDateRange 추가
```

## 결과 해석 시 사용자 안내사항
- **과최적화 경고**: 파라미터를 과거에 과하게 맞추면 실전 저하. 인접 파라미터 민감도 점검.
- **표본 크기**: 거래 < 30이면 통계적 신뢰도 낮음.
- **거래 비용**: commission/slippage 반영 확인.
- **최대 연속손실**: 심리적으로 견딜 수 있는지 — 자금관리와 직결.
- 이 결과는 리서치·검증용이며 투자 수익을 보장하지 않음.
