export const agents = [
  { id: "00-orchestrator", title: "오케스트레이터", vault: "00-Inbox" },
  { id: "01-macro-regime", title: "거시 국면", vault: "02-Market-Research/Macro" },
  { id: "02-etf-leader", title: "ETF 주도 종목", vault: "02-Market-Research/ETF" },
  { id: "03-community-sentiment", title: "커뮤니티 감정", vault: "02-Market-Research/Sentiment" },
  { id: "04-swing-briefing", title: "스윙 브리핑", vault: "02-Market-Research/Swing" },
  { id: "05-fundamental", title: "펀더멘털", vault: "03-Company-Research" },
  { id: "06a-masters-advisor", title: "투자 거장", vault: "04-Strategies/Masters" },
  { id: "06b-pine-builder", title: "Pine 전략", vault: "04-Strategies/Pine" },
  { id: "07-trade-journal", title: "매매일지", vault: "05-Trading-Journal" },
  { id: "08-portfolio-manager", title: "포트폴리오", vault: "06-Portfolio" }
];

export function assertDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || "")) {
    throw new Error("날짜는 YYYY-MM-DD 형식이어야 합니다.");
  }
  return value;
}

