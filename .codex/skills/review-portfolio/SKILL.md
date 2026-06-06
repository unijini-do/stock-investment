---
name: review-portfolio
description: Review a stock portfolio from holdings text or screenshots using total exposure, macro ceiling, single-name and sector concentration, diversification, fundamentals, sentiment, stop risk, cash, and an 8+4 quantitative/qualitative checklist; then propose current-to-target weights with reasons and opposing scenarios. Use for portfolio review, allocation, concentration, cash weight, rebalance, holdings risk, or position-sizing requests.
---

# Review Portfolio

Provide a risk-aware target allocation proposal without executing any rebalance.

## Workflow

1. Read `references/complete-instructions.md`.
2. Apply the project common preferences, storage rules, and output contract.
3. Parse holdings, weights, average prices, P/L, markets, stops, and cash from text or screenshot. Label estimates.
4. Load available macro, ETF, sentiment, fundamental, and trade-decision JSON from the current day.
5. If structural context is missing, browse current authoritative data or explicitly downgrade the review to concentration and risk only.
6. Run all eight layers: total exposure, name concentration, diversification, sector/theme concentration, fundamentals/valuation, sentiment/momentum, stop and loss risk, and cash.
7. Run the separate 8+4 checklist. If any red violation exists, recommend pausing new allocation increases until resolved.
8. Propose current-to-target weights, action, reason, funding source, cash target, and both reduce/hold scenarios.
9. Verify target weights plus cash equal 100%.
10. Highlight leveraged, inverse, correlated, or unprotected positions.

## Output

Save under `outputs/YYYY-MM-DD/08-portfolio-manager/`:

- `report.md`
- `dashboard.html` built from `assets/dashboard.html`
- `data.json` matching the portfolio contract

Make every allocation a proposal behind a user decision gate.

