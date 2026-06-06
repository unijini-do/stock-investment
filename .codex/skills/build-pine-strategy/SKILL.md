---
name: build-pine-strategy
description: Turn a chart screenshot, YouTube strategy, existing Pine code, or text trading idea into a working TradingView Pine Script strategy with entries, exits, stops, position sizing, realistic costs, visual markers, backtest period controls, performance table, debugging, and one-change-at-a-time improvement. Use for Pine Script, TradingView strategy, indicator conversion, compile errors, repainting, backtest diagnosis, or strategy optimization requests.
---

# Build Pine Strategy

Deliver executable Pine code with built-in validation rather than pseudocode.

## Workflow

1. Read `references/complete-instructions.md`.
2. Load only the needed references:
   - syntax and repainting: `references/pine_v6_rules.md`
   - compile/runtime issues: `references/common_errors.md`
   - indicator functions: `references/indicator_map.md`
   - mandatory metrics: `references/backtest_table.md`
   - diagnosis and upgrades: `references/improvement_loop.md`
   - strategy classification: `references/strategy_archetypes.md`
3. Apply the project common preferences, storage rules, and output contract.
4. Classify input as chart screenshot, video/URL, text idea, existing code, or backtest result.
5. Confirm genuinely ambiguous entry, exit, stop, timeframe, or sizing rules before coding.
6. Default to Pine v5 unless the user explicitly asks for v6.
7. Include realistic commission and slippage, non-repainting guards, risk sizing, stop logic, plot markers, optional date filter, and the required performance table.
8. Check line continuation, ternaries, plot scope, types, `na`, security lookahead, and trade-producing conditions.
9. When improving results, change one variable per cycle and warn about overfitting.

## Output

Save under `outputs/YYYY-MM-DD/06b-pine-builder/`:

- `strategy-NAME.pine`
- `report-NAME.md`
- `dashboard-NAME.html` built from `assets/dashboard.html`
- `data-NAME.json`

Provide TradingView application steps and never claim unrun backtest results.

