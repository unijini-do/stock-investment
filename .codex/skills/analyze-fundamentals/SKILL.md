---
name: analyze-fundamentals
description: Produce an institutional-style Korean fundamental research note for a public company, covering business model, revenue mix, five-year profitability, balance-sheet health, free cash flow, moat, management, valuation, seven key financial indicators, bull/bear targets, rating, and conviction. Use for ticker analysis, company valuation, financial health, earnings quality, moat, target price, or buy/hold/avoid research requests.
---

# Analyze Fundamentals

Evaluate company quality and valuation with current source-backed data and balanced scenarios.

## Workflow

1. Read `references/complete-instructions.md`.
2. Read `references/analysis_framework.md` for scoring and `references/data_sources.md` for source priority.
3. Apply the project common preferences, storage rules, and output contract.
4. If no company is specified, ask for the ticker or company name and optional concerns.
5. Browse current filings, investor relations, latest earnings, and reliable financial sources. Prefer primary filings when sources conflict.
6. Complete all ten analysis sections and the seven key indicators: PER, PBR, ROE, ROIC, operating margin, debt ratio, and dividend yield.
7. Compare trends against company history, sector peers, and capital structure rather than applying universal thresholds blindly.
8. Separate independent valuation assumptions from analyst consensus.
9. Provide bull and bear targets, key assumptions, rating, conviction, financial health, and invalidation conditions.
10. Mark unavailable data explicitly.

## Output

Save ticker-specific files under `outputs/YYYY-MM-DD/05-fundamental/`:

- `report-TICKER.md`
- `dashboard-TICKER.html` built from `assets/dashboard.html`
- `data-TICKER.json`

State that the work is research, not an order or personalized investment recommendation.

