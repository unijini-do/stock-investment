---
name: analyze-community-sentiment
description: Analyze current US and Korean investor-community sentiment as a noisy temperature gauge, detect fear/greed extremes, trending tickers, position-post density, cross-market temperature gaps, and contrarian risk signals. Use for community mood, retail sentiment, FOMO, panic, overheat, StockTwits, Reddit, Korean stock communities, or contrarian-signal requests.
---

# Analyze Community Sentiment

Measure community emotion without accepting community claims as facts.

## Workflow

1. Read `references/complete-instructions.md`.
2. Read `references/sentiment_cycle.md` for classification and `references/sources.md` for monitoring patterns.
3. Apply the project common preferences, storage rules, and output contract.
4. Determine whether the request concerns one ticker or the overall market.
5. Browse current US and Korean sources separately for mention frequency, tone, position-certification density, and reactions to macro events.
6. Flag source access failures and possible bots, promotions, or coordinated pumping.
7. Classify each market, compare the temperature gap, and assign cycle position, contrarian signal, and risk level.
8. List every factual claim that still needs verification from price, filings, news, or fundamentals.
9. Never convert sentiment alone into a trade trigger.

## Output

Save under `outputs/YYYY-MM-DD/03-community-sentiment/`:

- `report.md` with US/Korea evidence, cycle classification, and verification list
- `dashboard.html` built from `assets/dashboard.html`
- `data.json` matching the sentiment contract

Include both the prevailing interpretation and the opposing scenario.

