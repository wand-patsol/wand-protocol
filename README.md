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

---

## 기여

컨벤션 수정이 필요하면 `rules/CONVENTIONS.md` 파일을 수정하고 팀원들과 논의하세요.
