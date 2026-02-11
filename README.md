# wand-protocol

Wand 팀의 개발 컨벤션과 AI 코딩 도구 설정 가이드입니다.

---

## 구조

```
wand-protocol/
├── README.md              # 이 파일
├── rules/
│   ├── CONVENTIONS.md     # 메인 개발 규칙
│   └── JIRA.md            # JIRA 이슈 작성 프로토콜
├── mcp/
│   └── jira-protocol/     # JIRA 프로토콜 MCP 서버
└── setup/
    ├── CLAUDE.md          # Claude Code 설정
    ├── CURSOR.md          # Cursor AI 설정
    └── GENERAL.md         # 기타 AI 도구 설정
```

---

## 빠른 시작

### 1. 컨벤션 확인

[rules/CONVENTIONS.md](./rules/CONVENTIONS.md) 파일에서 다음 내용을 확인하세요:

- 브랜치 전략 (main → develop → feature/hotfix)
- 커밋 메시지 형식 (`[prefix]: 제목`)
- PR 규칙 및 리뷰 프로세스
- 코드 스타일 (Backend/Frontend)

### 2. JIRA 이슈 작성

[rules/JIRA.md](./rules/JIRA.md) 파일에서 다음 내용을 확인하세요:

- 이슈 제목/설명 작성 규칙
- 이슈 유형, 우선순위, 스토리 포인트 기준
- OKR 연결 가이드
- AI 성과 평가와의 연계

### 3. AI 도구 설정

사용하는 AI 도구에 맞는 설정 가이드를 따르세요:

| AI 도구 | 설정 가이드 |
|---------|------------|
| Claude Code | [setup/CLAUDE.md](./setup/CLAUDE.md) |
| Cursor AI | [setup/CURSOR.md](./setup/CURSOR.md) |
| ChatGPT, Gemini, Copilot 등 | [setup/GENERAL.md](./setup/GENERAL.md) |

---

## 핵심 규칙 요약

### 브랜치 네이밍

```bash
# Feature
f-PS-123/feature-name

# Hotfix
h-PS-456/hotfix-name
```

### 커밋 메시지

```bash
[feat]: 사용자 인증 기능 구현
[fix]: 로그인 오류 수정
[refactor]: API 구조 개선
```

### PR 리뷰

```
AI 자동 검증 (타입/린트/import) → 1인 리뷰어 (로직/플로우) → Merge
```

### JIRA 이슈 제목

```bash
[feat] 유사도 분석 - 청구항 기반 비교 알고리즘 추가
[fix] 명세서 생성 - PDF 내보내기 시 한글 깨짐 수정
[perf] 대시보드 - 초기 로딩 3초→1초 이내로 개선
```

---

## 대상 리포지토리

### Backend
- `wand-patsol/PatSol-Back`
- `wand-patsol/PatSol_Dj_Back`
- `wand-patsol/Attend-Back`

### Frontend
- `wand-patsol/PatSol-Front`
- `wand-patsol/Attend-Front`

---

## 프로젝트에 적용하기

### 방법 1: 파일 복사

각 프로젝트에 필요한 설정 파일을 복사:

```bash
# Claude Code용
cp wand-protocol/setup/CLAUDE.md your-project/CLAUDE.md

# Cursor용
cp wand-protocol/setup/CURSOR.md your-project/.cursorrules
```

### 방법 2: 심볼릭 링크

```bash
# 컨벤션 파일 링크
ln -s /path/to/wand-protocol/rules/CONVENTIONS.md your-project/CONVENTIONS.md
```

### 방법 3: MCP 서버 (JIRA 프로토콜)

AI 도구가 JIRA 프로토콜을 자동으로 참조하도록 MCP 서버를 연결할 수 있습니다.

#### 초기 설정 (각 직원이 한 번만 실행)

```bash
git clone <wand-protocol repo url>
cd wand-protocol/mcp/jira-protocol
npm install && npm run build
```

#### Claude Code에서 사용

프로젝트의 `.mcp.json`에 추가:

```json
{
  "mcpServers": {
    "jira-protocol": {
      "command": "node",
      "args": ["<자기 경로>/wand-protocol/mcp/jira-protocol/dist/index.js"]
    }
  }
}
```

#### Cursor에서 사용

`.cursor/mcp.json`에 추가:

```json
{
  "mcpServers": {
    "jira-protocol": {
      "command": "node",
      "args": ["<자기 경로>/wand-protocol/mcp/jira-protocol/dist/index.js"]
    }
  }
}
```

#### 제공되는 기능

| 타입 | 이름 | 설명 | 사용 시점 |
|------|------|------|-----------|
| Resource | `jira-protocol` | JIRA 프로토콜 전문 | AI가 자동 참조 |
| Prompt | `create-jira-issue` | 이슈 작성 도우미 | 새 이슈 만들 때 |
| Prompt | `review-jira-issue` | 이슈 검토 | 이슈 제출 전 점검 |
| Prompt | `complete-jira-issue` | 완료 코멘트 작성 | 이슈 Done 전환 시 |

#### 사용 예시

**Claude Code (터미널):**
```
# 방법 1: 자연어로 요청
> "검색 API 응답 시간 개선 작업을 JIRA 이슈로 만들어줘"

# 방법 2: 프롬프트 직접 호출
> /mcp 에서 create-jira-issue 선택 → 작업 설명 입력
```

**Cursor (에디터):**
```
# Composer(Cmd+I)에서 자연어로 요청
"유사도 분석 결과 캐싱 기능을 JIRA 이슈로 작성해줘"

# 또는 @MCP 멘션으로 프롬프트 선택
@jira-protocol create-jira-issue 작업 설명...
```

MCP 서버가 연결되어 있으면, AI가 JIRA 관련 요청 시 프로토콜을 자동으로 참조합니다.

---

## 기여

컨벤션 수정이 필요하면 `rules/CONVENTIONS.md` 파일을 수정하고 팀원들과 논의하세요.
