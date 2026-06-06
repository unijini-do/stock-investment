---
name: manage-trade-journal
description: Record planned, open, adjusted, closed, or stopped trades in local Markdown/HTML/JSON; preserve original decision context; perform outcome-versus-process postmortems; and analyze recurring trading patterns across the archive. Use for trade journal, entry record, status update, exit review, loss review, rule adherence, trading mistakes, or journal pattern analysis requests.
---

# Manage Trade Journal

Preserve what was known at decision time and separate process quality from profit or loss.

## Workflow

1. Read `references/complete-instructions.md`.
2. Apply the project common preferences, storage rules, and output contract.
3. Determine the action: create entry, update holding, close and review, archive research, or analyze patterns.
4. Use only user-provided or verified prices and outcomes.
5. Preserve previous reasoning as timestamped history; do not rewrite the past after the result is known.
6. For closed trades, classify the result/process quadrant: skill, luck, acceptable loss, or mistake.
7. Extract one concrete improvement, preferably with a measured cost of the error.
8. For pattern analysis, search `outputs/*/07-trade-journal/` and `obsidian-vault/05-Trading-Journal/`.
9. Never infer an order fill or position status without user confirmation.

## Output

Save under `outputs/YYYY-MM-DD/07-trade-journal/`:

- `journal-TICKER.md`
- `dashboard-TICKER.html` built from `assets/dashboard.html`
- `data-TICKER.json`
- `pattern-analysis.md` when requested

Update Markdown, HTML, and JSON together when status, prices, or lessons change.

