# 로컬 저장 및 Obsidian 규칙

## 날짜별 작업 폴더

모든 산출물은 실행일 기준으로 아래 위치에 저장한다.

```text
outputs/YYYY-MM-DD/
├── 00-orchestrator/
├── 01-macro-regime/
├── 02-etf-leader/
├── 03-community-sentiment/
├── 04-swing-briefing/
├── 05-fundamental/
├── 06a-masters-advisor/
├── 06b-pine-builder/
├── 07-trade-journal/
└── 08-portfolio-manager/
```

## 파일 세트

구조화된 분석은 원칙적으로 아래 세 파일을 만든다.

- `report.md`: 사람이 읽고 Obsidian에서 검색할 원본
- `dashboard.html`: 디자인 시스템을 적용한 단일 HTML 대시보드
- `data.json`: 오케스트레이터와 다음 에이전트가 소비할 구조화 데이터

오케스트레이터 최종본은 다음 이름을 사용한다.

- `daily-summary.md`
- `dashboard.html`
- `decision.json`

종목별 문서가 여러 개면 `report-NVDA.md`, `dashboard-NVDA.html`, `data-NVDA.json`처럼 티커를 붙인다.

## Markdown frontmatter

모든 Markdown 산출물 맨 위에 다음 속성을 둔다.

```yaml
---
date: YYYY-MM-DD
agent: macro-regime
type: market-research
market: [US, KR]
tickers: []
status: draft
tags: [투자리서치]
sources_checked_at: YYYY-MM-DDTHH:mm:ssZ
---
```

`status`는 `draft`, `reviewed`, `decision`, `closed` 중 하나를 쓴다.

## 링크 규칙

- 다른 단계 결과는 상대경로 Markdown 링크로 연결한다.
- 데이터 출처는 문서 하단 `## 출처`에 제목, 기관, 날짜, URL을 기록한다.
- 오케스트레이터 요약은 당일 생성된 모든 보고서 링크를 포함한다.

## Obsidian 정리

`node scripts/archive-day.mjs YYYY-MM-DD`를 실행하면:

1. Markdown을 주제별 Vault 폴더로 복사한다.
2. HTML을 `90-HTML/YYYY-MM-DD/`에 보관한다.
3. JSON을 `00-Inbox/_data/YYYY-MM-DD/`에 보관한다.
4. `01-Daily/YYYY-MM-DD.md`에 당일 문서 링크를 자동 생성한다.

기본 대상은 저장소의 `obsidian-vault/`다. 실제 Vault는 `--vault "/절대경로"` 또는 `OBSIDIAN_VAULT` 환경 변수로 지정한다.

