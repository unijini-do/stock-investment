# 백테스트 진단 & 개선 루프

5~6단계에서 사용. 백테스트 결과를 약점으로 번역하고, 약점을 코드 처방으로 번역한다.

## 진단 기준 (증상 → 원인 → 처방)

| 증상 | 원인 가설 | 코드 처방 |
|---|---|---|
| 거래 수 < 30 | 진입 조건이 너무 엄격 | 임계값 완화, 조건 AND→OR 일부 전환, 기간 연장 |
| 승률 높은데 순손익 낮음 | 손익비 역전 (작은 익절, 큰 손절) | TP/SL 비율 재설계, 트레일링 스탑 도입 |
| Profit Factor < 1.3 | 진입 정밀도 부족 | 추세/변동성 필터 추가, 다중 시간프레임 확인 |
| Max Drawdown > 25% | 리스크 관리 부재 | ATR 손절, 포지션 사이징(자본 % 고정), 최대 동시 포지션 제한 |
| 횡보장에서 연속 손실 (whipsaw) | 추세 필터 없음 | ADX > 25 또는 EMA 기울기 필터로 추세장만 진입 |
| 특정 파라미터에서만 성과 급등 | 과최적화 | 인접 파라미터로 민감도 테스트, 더 단순한 규칙으로 후퇴 |
| 실시간과 백테스트 결과 불일치 | repainting | request.security lookahead_off, close[1] 사용, barstate.isconfirmed 가드 |
| 비용 반영 후 성과 붕괴 | 비현실적 가정 | commission/slippage 추가, 저유동성 종목 제외 |

## 약점별 대표 업그레이드 스니펫

### 추세 필터 (휩쏘 방지)
```pinescript
adxLen = input.int(14, "ADX 기간")
adxThreshold = input.float(25, "ADX 임계값")
[diPlus, diMinus, adx] = ta.dmi(adxLen, adxLen)
trendOK = adx > adxThreshold
// 기존 진입 조건에 and trendOK 추가
```

### ATR 기반 손절·익절 (드로다운 제어)
```pinescript
atrVal = ta.atr(14)
slMult = input.float(2.0, "손절 ATR 배수")
tpMult = input.float(3.0, "익절 ATR 배수")
if longCondition
    strategy.entry("Long", strategy.long)
    strategy.exit("Exit", "Long",
         stop = close - atrVal * slMult,
         limit = close + atrVal * tpMult)
```

### 트레일링 스탑 (이익 보존)
```pinescript
trailPts = input.float(2.0, "트레일 ATR 배수") * ta.atr(14)
if strategy.position_size > 0
    strategy.exit("Trail", "Long", trail_points = trailPts, trail_offset = trailPts)
```

### 다중 시간프레임 확인 (정밀도)
```pinescript
htfTrend = request.security(syminfo.tickerid, "D",
     ta.ema(close, 50) > ta.ema(close, 200) ? 1 : 0,
     lookahead = barmerge.lookahead_off)
// 진입 조건에 and htfTrend == 1 추가
```

### 포지션 사이징 (리스크 고정)
```pinescript
riskPct = input.float(1.0, "거래당 리스크 %") / 100
stopDist = ta.atr(14) * 2.0
qty = (strategy.equity * riskPct) / stopDist
if longCondition
    strategy.entry("Long", strategy.long, qty = qty)
```

## "한 번에 하나" 원칙
- 한 사이클에 변수 하나만 바꾼다. 추세 필터와 손절을 동시에 추가하면 어느 쪽이 효과를 냈는지 분리할 수 없다.
- 각 변경 후 재백테스트 → 지표 비교 → 다음 변경. 이 분리가 과최적화와 진짜 개선을 구분한다.

## 멈춰야 할 때 (과최적화 경고)
다음 신호가 보이면 개선을 멈추라고 권고한다:
- 파라미터를 조금만 바꿔도 성과가 크게 흔들린다 (불안정)
- 규칙이 점점 많아지고 복잡해진다 (커브 피팅)
- in-sample 성과는 좋은데 out-of-sample(다른 기간/종목)에서 무너진다
- 거래당 평균 이익이 거래 비용에 근접한다

개선 루프의 목적은 "백테스트 숫자 극대화"가 아니라 "강건한(robust) 규칙 발견"이다.
