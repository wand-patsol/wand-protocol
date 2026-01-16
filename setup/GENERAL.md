# AI 코딩 도구 일반 설정 가이드

ChatGPT, Gemini, Copilot 등 다른 AI 도구에서 Wand 컨벤션을 적용하는 방법입니다.

---

## 1. 시스템 프롬프트 / Custom Instructions

다음 내용을 AI 도구의 시스템 프롬프트나 Custom Instructions에 추가하세요.

### 기본 프롬프트

```
당신은 Wand 팀의 개발 컨벤션을 따르는 코딩 어시스턴트입니다.

## 기본 규칙
- 모든 GitHub 관련 텍스트(커밋, PR, 이슈)는 한국어로 작성
- 디버깅 코드(print, console.log)는 최종 코드에 포함하지 않음

## 브랜치 네이밍
- Feature: f-PS-{JIRA번호}/{기능명} (예: f-PS-123/user-auth)
- Hotfix: h-PS-{JIRA번호}/{수정명} (예: h-PS-456/fix-login)

## 커밋 메시지 형식
[prefix]: 제목

Prefix 종류:
- [feat]: 새로운 기능 추가
- [fix]: 버그 수정
- [refactor]: 코드 리팩토링
- [test]: 테스트 코드
- [docs]: 문서 수정
- [design]: UI/스타일 변경
- [format]: 코드 포맷팅

## 코드 스타일
Backend (Python):
- 타입 힌트 필수
- snake_case (함수/변수), PascalCase (클래스)

Frontend (TypeScript):
- strict mode
- camelCase (함수/변수), PascalCase (컴포넌트/타입)
```

---

## 2. ChatGPT 설정

### Custom Instructions → "How would you like ChatGPT to respond?"

위의 기본 프롬프트를 붙여넣기

### GPTs 생성 (팀용)

1. GPT Builder에서 새 GPT 생성
2. Instructions에 기본 프롬프트 입력
3. Knowledge에 `CONVENTIONS.md` 파일 업로드
4. 팀원들과 GPT 공유

---

## 3. Gemini 설정

### Gemini Advanced → Gems

1. 새 Gem 생성
2. Instructions에 기본 프롬프트 입력
3. 팀 작업용으로 사용

### Google AI Studio

System Instructions에 프롬프트 설정

---

## 4. GitHub Copilot 설정

### .github/copilot-instructions.md

프로젝트 루트에 생성:

```markdown
# Copilot Instructions

이 프로젝트는 Wand 팀 컨벤션을 따릅니다.

- 커밋: [prefix]: 한국어 제목
- 브랜치: f-PS-XXX/기능명 또는 h-PS-XXX/수정명
- Python: 타입 힌트 필수, snake_case
- TypeScript: strict mode, camelCase
- 디버깅 코드 제거 후 커밋
```

---

## 5. 프로젝트별 설정 파일 요약

| 프로젝트 위치 | 파일명 | 용도 |
|--------------|--------|------|
| 프로젝트 루트 | `CLAUDE.md` | Claude Code |
| 프로젝트 루트 | `.cursorrules` | Cursor AI |
| `.github/` | `copilot-instructions.md` | GitHub Copilot |

---

## 6. 컨벤션 파일 동기화

모든 프로젝트에서 동일한 규칙을 사용하려면:

```bash
# 각 프로젝트에서 wand-protocol 참조
# 예: 심볼릭 링크
ln -s /path/to/wand-protocol/rules/CONVENTIONS.md ./CONVENTIONS.md
```

또는 각 프로젝트의 README나 CONTRIBUTING.md에서 wand-protocol 링크 참조
