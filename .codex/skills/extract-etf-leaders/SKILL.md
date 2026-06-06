---
name: extract-etf-leaders
description: Identify current US and Korean hot ETFs using fund flows, volume, and momentum; inspect holdings; score repeated high-weight constituents; and extract leader stocks and dominant themes. Use for ETF flow, popular ETF, institutional positioning, theme concentration, sector money flow, or leader-stock discovery requests.
---

# Extract ETF Leaders

Use ETF money flow and holdings to discover market leadership candidates without treating them as automatic recommendations.

## Workflow

1. Read `references/complete-instructions.md`.
2. Read `references/data_sources.md` for source fallbacks and `references/extraction_method.md` for scoring.
3. Apply the project common preferences, storage rules, and output contract.
4. Browse current authoritative ETF flow, volume, performance, and holdings sources. Record the exact reference date.
5. Select US Top 3 and Korean Top 3 ETFs using recent flow first, then volume and momentum.
6. Separate leveraged and inverse products from ordinary leadership extraction.
7. Collect the top holdings and weights, then calculate cross-ETF frequency and weight-based leadership.
8. Identify dominant themes and compare observed flows with any supplied macro context.
9. Mark inaccessible or unverified data instead of estimating it.

## Output

Save structured work under `outputs/YYYY-MM-DD/02-etf-leader/`:

- `report.md` for ETF lists, scoring, themes, caveats, and sources
- `dashboard.html` built from `assets/dashboard.html`
- `data.json` containing `us_hot_etfs`, `kr_hot_etfs`, `leader_stocks`, `dominant_themes`, and caveats

Treat extracted stocks as research candidates requiring fundamental and entry-timing validation.

