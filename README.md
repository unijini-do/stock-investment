# 주식 투자 오케스트레이터

Claude에서 사용하던 투자 리서치 지침을 로컬 파일 중심의 프로젝트로 옮긴 저장소입니다.

## 구조

- `orchestrator/`: 전체 투자 파이프라인과 라우팅 지침
- `agents/`: 전문 서브 에이전트별 지침
- `shared/`: 공통 원칙, 저장 규칙, 출력 계약
- `templates/`: Markdown 및 HTML 대시보드 템플릿
- `outputs/YYYY-MM-DD/`: 날짜별 실제 분석 산출물
- `obsidian-vault/`: 바로 열어볼 수 있는 기본 Obsidian Vault
- `scripts/`: 일일 폴더 생성 및 Obsidian 정리 도구

## 기본 사용법

1. 프로젝트 루트에서 분석을 요청합니다.
2. 오케스트레이터가 요청에 맞는 `agents/*/INSTRUCTIONS.md`를 적용합니다.
3. 분석 결과는 같은 내용의 Markdown, HTML 대시보드, 구조화 JSON으로 `outputs/YYYY-MM-DD/`에 저장합니다.
4. 하루 작업이 끝나면 아래 명령으로 Obsidian Vault에 정리합니다.

```bash
npm run archive -- 2026-06-06
```

외부 Obsidian Vault로 바로 보낼 수도 있습니다.

```bash
npm run archive -- 2026-06-06 --vault "/절대경로/내 Obsidian Vault"
```

## 핵심 원칙

- 변동 가능한 시장 데이터는 실행 시점의 최신 출처로 확인합니다.
- 구조화된 분석은 Markdown과 단일 HTML 대시보드를 함께 남깁니다.
- 자동 매매와 자동 리밸런싱은 하지 않습니다.
- 진입, 청산, 비중 변경은 항상 사용자가 최종 결정합니다.
