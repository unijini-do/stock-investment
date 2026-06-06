# Pine Script 흔한 오류 & 해결법

작성한 코드에서 에러가 의심되거나 사용자가 에러 메시지를 보고할 때 대조한다.

## "end of line without line continuation"
**원인**: 삼항 연산자나 표현식을 잘못 줄바꿈, 또는 연속 줄 들여쓰기 부족.
**해결**: 삼항은 한 줄로. 연속 줄은 시작 줄보다 깊게 들여쓰기. (pine_v6_rules.md 참조)

## "Cannot use 'plot' in local scope"
**원인**: `plot()`을 if/for/함수 내부에서 호출.
**해결**: plot은 전역으로 빼고, 값/색을 조건으로 제어.
```pinescript
// 색을 조건으로
col = signal ? color.green : color.gray
plot(value, color=col)
```

## "Undeclared identifier"
**원인**: 변수를 선언 전에 사용, 또는 오타.
**해결**: 선언 순서 확인. 계산은 사용보다 위에.

## Repainting (값이 과거에서 바뀜)
**원인**: `request.security()`에서 현재 미확정 바 참조, 또는 미래 데이터 누수.
**해결**:
```pinescript
// 확정된 직전 바 + lookahead off
htf = request.security(syminfo.tickerid, "60", close[1],
     lookahead=barmerge.lookahead_off)
```
실시간 신호는 `barstate.isconfirmed`로 가드.

## "na" 관련 오작동 (초기 바)
**원인**: 초기 바에서 인디케이터가 아직 계산 안 됨 → na.
**해결**: `nz(value, 기본값)`으로 감싸거나 `not na(value)` 가드.

## "Mismatched input" / "Syntax error"
**원인**: 괄호 짝 안 맞음, 콤마 누락, 잘못된 함수 시그니처.
**해결**: 함수 인자 개수/순서 확인. 다중 반환 함수는 `[a, b] = ta.macd(...)` 형식.

## strategy 백테스트가 거래를 안 함
**원인**: 진입 조건이 한 번도 true가 안 됨, 또는 `strategy.entry`/`strategy.close` 누락.
**해결**: 조건을 `plotshape`로 시각화해 신호 발생 여부 먼저 확인. 진입과 청산이 모두 있는지 점검.

## 디버깅 도구 추가
값 추적이 필요하면 라벨로 출력:
```pinescript
if barstate.islast
    label.new(bar_index, high,
         str.format("RSI: {0,number,#.##}\nEMA: {1,number,#.##}", rsi_val, ema_val),
         style=label.style_label_down)
```
또는 데이터 윈도우용 디버그 plot:
```pinescript
plotchar(rsi_val, "RSI debug", "", location.top)
```
