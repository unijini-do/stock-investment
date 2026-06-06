# TradingView 인디케이터 → Pine v6 함수 매핑

아이디어에 나온 인디케이터를 ta.* 내장 함수로 매핑한다. 어떤 인디케이터든 조합 가능.

## 추세 (Trend)
| 인디케이터 | 함수 | 예시 |
|---|---|---|
| SMA 단순이평 | `ta.sma(src, len)` | `ta.sma(close, 20)` |
| EMA 지수이평 | `ta.ema(src, len)` | `ta.ema(close, 50)` |
| WMA 가중이평 | `ta.wma(src, len)` | |
| VWAP | `ta.vwap` | `ta.vwap(hlc3)` |
| 슈퍼트렌드 | `ta.supertrend(factor, atrPeriod)` | 반환: [supertrend, direction] |
| 일목균형표 | `ta.sma` 조합 또는 수동 계산 | |

## 모멘텀 (Momentum)
| 인디케이터 | 함수 | 비고 |
|---|---|---|
| RSI | `ta.rsi(src, len)` | 0~100, 30/70 임계값 |
| MACD | `ta.macd(src, fast, slow, signal)` | 반환: [macd, signal, hist] |
| 스토캐스틱 | `ta.stoch(close, high, low, len)` | %K; %D는 sma로 |
| CCI | `ta.cci(src, len)` | |
| Momentum | `ta.mom(src, len)` | |
| ROC | `ta.roc(src, len)` | |

## 변동성 (Volatility)
| 인디케이터 | 함수 | 비고 |
|---|---|---|
| 볼린저밴드 | `ta.bb(src, len, mult)` | 반환: [middle, upper, lower] |
| ATR | `ta.atr(len)` | 손절 거리 계산에 활용 |
| 켈트너 채널 | `ta.kc(src, len, mult)` | |
| 표준편차 | `ta.stdev(src, len)` | |

## 거래량 (Volume)
| 인디케이터 | 함수 |
|---|---|
| OBV | `ta.obv` |
| MFI | `ta.mfi(src, len)` |
| 거래량 이평 | `ta.sma(volume, len)` |
| 누적 분포선 | `ta.accdist` |

## 신호 감지 (Crossover/Pattern)
| 패턴 | 함수 |
|---|---|
| 상향 돌파 | `ta.crossover(a, b)` |
| 하향 돌파 | `ta.crossunder(a, b)` |
| 교차(양방향) | `ta.cross(a, b)` |
| 최고/최저 | `ta.highest(src, len)` / `ta.lowest(src, len)` |
| 피봇 | `ta.pivothigh(len, len)` / `ta.pivotlow(len, len)` |

## 조합 예시
```pinescript
// EMA 크로스 + RSI 필터 + 거래량 확인
ema_fast = ta.ema(close, 9)
ema_slow = ta.ema(close, 21)
rsi_val  = ta.rsi(close, 14)
vol_ma   = ta.sma(volume, 20)

longSignal = ta.crossover(ema_fast, ema_slow) and rsi_val < 70 and volume > vol_ma
```

인디케이터 명이 위에 없으면 TradingView Pine Reference에서 `ta.` 네임스페이스를 검색하거나, 수식이 명확하면 직접 계산식으로 구현한다.
