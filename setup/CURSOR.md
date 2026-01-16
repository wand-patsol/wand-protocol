# Cursor AI 설정 가이드

Cursor IDE에서 Wand 컨벤션을 적용하는 방법입니다.

---

## 1. .cursorrules 파일 생성

각 프로젝트 루트에 `.cursorrules` 파일을 생성합니다.

### Backend 프로젝트

```
# Wand Backend Convention

## Language
- 모든 GitHub 활동(커밋, PR)은 한국어로 작성

## Branch Naming
- Feature: f-PS-{이슈번호}/{기능명}
- Hotfix: h-PS-{이슈번호}/{수정명}
- 예: f-PS-123/user-authentication

## Commit Message
Format: [prefix]: 제목

Prefixes:
- [feat]: 새로운 기능
- [fix]: 버그 수정
- [refactor]: 리팩토링
- [test]: 테스트
- [docs]: 문서
- [format]: 포맷팅

## Code Style (Python)
- Type hints required
- Functions/variables: snake_case
- Classes: PascalCase
- No debug code (print statements)

## Tech Stack
- Python 3.9+
- FastAPI
- SQLAlchemy
- Pydantic
```

### Frontend 프로젝트

```
# Wand Frontend Convention

## Language
- 모든 GitHub 활동(커밋, PR)은 한국어로 작성

## Branch Naming
- Feature: f-PS-{이슈번호}/{기능명}
- Hotfix: h-PS-{이슈번호}/{수정명}

## Commit Message
Format: [prefix]: 제목

Prefixes:
- [feat]: 새로운 기능
- [fix]: 버그 수정
- [refactor]: 리팩토링
- [test]: 테스트
- [docs]: 문서
- [design]: UI/스타일
- [format]: 포맷팅

## Code Style (TypeScript/React)
- Strict TypeScript
- Components: PascalCase
- Functions/variables: camelCase
- No debug code (console.log)

## Tech Stack
- React 18
- TypeScript
- Vite
- TailwindCSS (if applicable)
```

---

## 2. Cursor Settings

### Rules for AI

Cursor Settings → Rules for AI에 추가:

```
당신은 Wand 팀의 개발 규칙을 따르는 코딩 어시스턴트입니다.

1. 커밋 메시지는 [prefix]: 제목 형식으로 한국어로 작성
2. 브랜치는 f-PS-XXX/기능명 또는 h-PS-XXX/수정명 형식
3. 디버깅 코드(print, console.log)는 커밋 전 제거
4. 타입 힌트/타입스크립트 strict 모드 준수
```

---

## 3. 심볼릭 링크 (선택)

wand-protocol의 규칙 파일을 직접 참조하려면:

```bash
# 프로젝트 루트에서
ln -s /path/to/wand-protocol/rules/CONVENTIONS.md .cursorrules
```

---

## 4. 작업 예시

Cursor Chat에서:

```
사용자: PS-123 이슈에 대한 로그인 기능 만들어줘

AI: 브랜치 f-PS-123/login-feature를 생성하고
    로그인 기능을 구현하겠습니다.

    커밋 메시지: [feat]: 사용자 로그인 기능 구현
```
