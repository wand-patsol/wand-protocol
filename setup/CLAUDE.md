# Claude Code 설정 가이드

Claude Code (CLI)에서 Wand 컨벤션을 적용하는 방법입니다.

---

## 1. CLAUDE.md 파일 생성

각 프로젝트 루트에 `CLAUDE.md` 파일을 생성합니다. Claude Code는 이 파일을 자동으로 읽어 컨텍스트로 사용합니다.

### Backend 프로젝트 (PatSol-Back, PatSol_Dj_Back, Attend-Back)

```markdown
# Project Context

## 프로젝트 정보
- Repository: wand-patsol/{repo-name}
- Stack: Python, FastAPI, SQLAlchemy
- 언어: 모든 GitHub 활동(커밋, PR, 이슈)은 한국어로 작성

## 브랜치 규칙
- main: 운영 (직접 푸시 금지)
- develop: 개발 통합
- f-PS-{이슈번호}/{기능명}: 기능 개발
- h-PS-{이슈번호}/{수정명}: 긴급 수정

## 커밋 메시지
형식: `[prefix]: 제목`
- [feat]: 새로운 기능
- [fix]: 버그 수정
- [refactor]: 리팩토링
- [test]: 테스트 코드
- [docs]: 문서 수정
- [format]: 코드 포맷팅

## 코드 스타일
- 타입 힌트 필수
- 함수/변수: snake_case
- 클래스: PascalCase
- 디버깅 코드(print) 커밋 금지

## PR 규칙
- 제목: `[prefix]: 설명` (한국어)
- 본문: Description, 주요 변경사항, 테스트 체크리스트 포함
```

### Frontend 프로젝트 (PatSol-Front, Attend-Front)

```markdown
# Project Context

## 프로젝트 정보
- Repository: wand-patsol/{repo-name}
- Stack: React, TypeScript, Vite
- 언어: 모든 GitHub 활동(커밋, PR, 이슈)은 한국어로 작성

## 브랜치 규칙
- main: 운영 (직접 푸시 금지)
- develop: 개발 통합
- f-PS-{이슈번호}/{기능명}: 기능 개발
- h-PS-{이슈번호}/{수정명}: 긴급 수정

## 커밋 메시지
형식: `[prefix]: 제목`
- [feat]: 새로운 기능
- [fix]: 버그 수정
- [refactor]: 리팩토링
- [test]: 테스트 코드
- [docs]: 문서 수정
- [design]: UI/스타일 변경
- [format]: 코드 포맷팅

## 코드 스타일
- TypeScript strict mode
- 컴포넌트: PascalCase
- 함수/변수: camelCase
- 디버깅 코드(console.log) 커밋 금지

## PR 규칙
- 제목: `[prefix]: 설명` (한국어)
- 본문: Description, 주요 변경사항, 테스트 체크리스트 포함
```

---

## 2. 설정 확인

```bash
# 프로젝트 디렉토리에서 Claude Code 실행
cd /path/to/project
claude

# Claude가 CLAUDE.md를 읽었는지 확인
# "이 프로젝트의 커밋 규칙이 뭐야?" 라고 질문해보세요
```

---

## 3. MCP 연동 (선택)

GitHub MCP를 연동하면 PR 생성, 이슈 관리가 가능합니다.

### ~/.claude/settings.json

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_your_token_here"
      }
    }
  }
}
```

---

## 4. 작업 예시

```bash
# Claude Code에서
> f-PS-123/user-auth 브랜치 만들고 로그인 기능 구현해줘

# Claude가 자동으로:
# 1. 브랜치 생성 (f-PS-123/user-auth)
# 2. 코드 구현
# 3. 커밋 ([feat]: 사용자 로그인 기능 구현)
# 4. 리모트 푸시
```
