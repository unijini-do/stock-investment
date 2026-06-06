---
name: build-swing-briefing
description: Build a current Korean-language top-down swing trading briefing for a one-week to three-month horizon, covering macro risks, leading industries and core technologies, event scenarios, contrarian candidates, stock cards, entry/target/stop levels, and risk management. Use for daily or weekly stock briefings, swing setups, macro-to-stock analysis, market news synthesis, and watchlist planning.
---

# Build Swing Briefing

Create a source-backed six-board HTML briefing that moves from macro conditions to industries, events, and individual stocks.

## Workflow

1. Read `references/complete-instructions.md`.
2. Read `references/macro_calendar.md` for event mapping and `references/design_system.md` for the six-board layout.
3. Apply the project common preferences, storage rules, and output contract.
4. Use the user-provided start date. If absent, use the prior business day through the latest seven-day window and state the exact dates.
5. Browse only authoritative market, official, and major financial-media sources for current claims.
6. Rank three macro risks by timing, breadth, surprise, and market pricing.
7. Identify leading industries or technologies and prove direct company exposure with revenue, orders, share, or value-chain evidence.
8. Build best/worst event scenarios and three contrarian candidates only when fundamentals remain intact.
9. Give every stock both Proof and Refutation, plus explicit entry, target, and stop ranges when data supports them.
10. Never present the briefing as guaranteed advice.

## Output

Save under `outputs/YYYY-MM-DD/04-swing-briefing/`:

- `report.md`
- `dashboard.html` using `assets/dashboard.html` and the fixed six-board order
- `data.json` matching the swing-briefing contract

Keep all price levels and source dates synchronized across formats.

