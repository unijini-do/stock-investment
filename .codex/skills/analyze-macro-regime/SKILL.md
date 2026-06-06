---
name: analyze-macro-regime
description: Analyze current US and Korean macroeconomic regimes, classify recovery/expansion/slowdown/recession, and translate rates, inflation, employment, yield curves, PMI, credit spreads, FX, and policy events into equity exposure and sector positioning. Use for requests about macro conditions, interest rates, recession risk, market regime, US-Korea transmission, exposure ceilings, sector rotation, or upcoming macro events.
---

# Analyze Macro Regime

Produce a Korean macro regime report that turns current economic data into actionable but non-automatic equity positioning guidance.

## Workflow

1. Read `references/complete-instructions.md`.
2. Read `references/indicators.md` for thresholds and `references/regime_playbook.md` for positioning.
3. Locate the project root containing `AGENTS.md`; apply `shared/PREFERENCES.md`, `shared/STORAGE.md`, and `shared/OUTPUT_CONTRACT.md`.
4. Browse current primary or authoritative sources for every time-sensitive value. Never rely on stale memory for rates, inflation, yields, FX, PMI, employment, spreads, or event dates.
5. Classify US and Korea separately as recovery, expansion, slowdown, recession, or an explicit transition.
6. Explain the US-to-Korea transmission path through rate differentials, USD/KRW, foreign flows, and sector effects.
7. Translate the regime into an exposure ceiling, leading sectors, avoid sectors, style tilt, upcoming event scenarios, and a counter-scenario.
8. State uncertainty and missing data. Do not invent values.

## Output

For a structured analysis:

- Run `node scripts/scaffold-day.mjs YYYY-MM-DD` from the project root if the daily folder is missing.
- Save `outputs/YYYY-MM-DD/01-macro-regime/report.md`.
- Create `dashboard.html` from `assets/dashboard.html`.
- Save the contract data as `data.json`.
- Keep conclusions, numbers, timestamps, and sources identical across all three files.

Return a concise result summary and clickable paths to the saved files. Never execute trades.

