# Pine Script v6 핵심 문법 규칙

## 줄바꿈(Line Continuation) 규칙
Pine Script는 명시적 연속 문자가 없다. 대신 들여쓰기로 줄 연속을 판단한다.

1. **연속 줄은 시작 줄보다 더 깊게 들여쓰기** 해야 한다.
2. 연산자나 콤마 **뒤에서** 분리한다 (앞에서 X).

```pinescript
// ✅ 올바름 — 연속 줄이 더 들여써짐
longCondition = ta.crossover(ema50, ema200) and
     rsi < 30 and
     volume > ta.sma(volume, 20)

// ✅ 함수 인자
plot(series,
     title="My Plot",
     color=color.blue,
     linewidth=2)

// ❌ 틀림 — 같은 들여쓰기 → "end of line without line continuation"
longCondition = ta.crossover(ema50, ema200) and
rsi < 30 and
volume > ta.sma(volume, 20)
```

## 삼항 연산자 (가장 흔한 에러)
삼항(`? :`)은 **반드시 한 줄**에. 길면 중간 변수로 분리.

```pinescript
// ❌ 틀림
text = condition ?
    "true value" :
    "false value"

// ✅ 올바름 — 한 줄
text = condition ? "true value" : "false value"

// ✅ 긴 경우 — 중간 변수
trueText = str.format("Long value {0}", param)
falseText = str.format("Other {0}", other)
text = condition ? trueText : falseText
```

## plot() 스코프 제한
`plot()`, `plotshape()`, `plotchar()`, `hline()`은 **전역 스코프에서만** 호출. if/for/함수 안에서 호출하면 "Cannot use 'plot' in local scope" 에러.

```pinescript
// ❌ 틀림
if condition
    plot(close, color=color.red)

// ✅ 올바름 — 색을 조건으로, plot은 전역에
plotColor = condition ? color.red : na
plot(close, color=plotColor)
```

## 타입 시스템
- `series` vs `simple` vs `const` vs `input` 구분
- `var`: 첫 바에서만 초기화되고 값 유지 (누적 카운터 등)
- `varip`: 실시간 틱마다 업데이트, 바 확정 시에도 리셋 안 됨
- 초기 바는 `na`일 수 있음 → `nz(value, 0)`로 안전 처리

## request.security() & Repainting 방지
```pinescript
// repainting 방지: 확정된 바만 사용
htfClose = request.security(syminfo.tickerid, "D", close[1],
     lookahead=barmerge.lookahead_off)
```

## 플랫폼 제약
- 과거 데이터 참조: 최대 500바 (`close[500]`까지)
- plot 출력: 최대 64개
- 박스/라인/라벨 등 drawing: 기본 50개 (max_*_count로 확장 가능)
- 실시간 바는 미확정 → `barstate.isconfirmed`로 확정 여부 확인
