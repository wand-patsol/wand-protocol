# Wand Development Conventions

Wand 팀의 개발 규칙입니다. 모든 AI 코딩 도구(Claude, Gemini, ChatGPT, Cursor 등)와 개발자가 이 규칙을 따릅니다.

---

## 1. Target Repositories

### Backend
| Repository | 설명 |
|------------|------|
| `wand-patsol/PatSol-Back` | Main 서비스 API 서버 |
| `wand-patsol/PatSol_Dj_Back` | Local DB 서버 |
| `wand-patsol/Attend-Back` | 출퇴근 서비스 API 서버 |

### Frontend
| Repository | 설명 |
|------------|------|
| `wand-patsol/PatSol-Front` | Main 서비스 웹 클라이언트 |
| `wand-patsol/Attend-Front` | 출퇴근 서비스 웹 클라이언트 |

---

## 2. Language Rules

- **GitHub 활동은 한국어로 작성**
  - 커밋 메시지
  - PR 제목 및 본문
  - 이슈 및 코멘트

---

## 3. Branch Strategy

### 브랜치 구조

```
main (Production)
  └── develop (Integration)
        ├── f-PS-123/feature-name (Feature)
        └── h-PS-456/hotfix-name (Hotfix)
```

### 브랜치 규칙

| 브랜치 | 용도 | 규칙 |
|--------|------|------|
| `main` | 운영 배포 | 직접 푸시 금지 (Protected) |
| `develop` | 개발 통합 | 모든 feature/hotfix가 병합되는 곳 |
| `f-{JIRA}/name` | 기능 개발 | develop에서 분기 → develop으로 PR |
| `h-{JIRA}/name` | 긴급 수정 | main에서 분기 → main + develop으로 PR |

### 브랜치 네이밍

**형식**: `{type}-{JIRA이슈번호}/{기능명}`

```bash
# Feature 브랜치
f-PS-123/user-authentication
f-PS-456/payment-integration

# Hotfix 브랜치
h-PS-789/fix-login-error
h-PS-101/security-patch
```

### 브랜치 생성 후

```bash
# 브랜치 생성 즉시 리모트에 푸시하여 추적 가능하게
git push -u origin f-PS-123/feature-name
```

---

## 4. Commit Rules

### 커밋 메시지 형식

```
[prefix]: 제목

본문 (선택)
```

### Prefix 목록

| Prefix | 용도 | 예시 |
|--------|------|------|
| `[feat]` | 새로운 기능 추가 | `[feat]: 로그인 API 구현` |
| `[fix]` | 버그 수정 | `[fix]: 토큰 만료 오류 수정` |
| `[refactor]` | 코드 리팩토링 | `[refactor]: 인증 모듈 구조 개선` |
| `[test]` | 테스트 코드 | `[test]: 결제 API 단위 테스트 추가` |
| `[docs]` | 문서 수정 | `[docs]: README 업데이트` |
| `[design]` | UI/스타일 변경 | `[design]: 버튼 스타일 수정` |
| `[format]` | 코드 포맷팅 | `[format]: ESLint 적용` |

### 커밋 원칙

- **Atomic Commit**: 하나의 커밋 = 하나의 논리적 변경
- **No Debug Code**: `print`, `console.log` 등 디버깅 코드 제거 후 커밋

---

## 5. Pull Request Rules

### PR 제목

커밋 메시지와 동일한 형식 사용

```
[feat]: 사용자 인증 기능 구현
[fix]: 결제 오류 수정
```

### PR 본문 템플릿

```markdown
## 📝 Description

변경 사항 요약 및 관련 컨텍스트

- Closes PS-123

## ✨ 주요 변경 사항

- 변경점 1
- 변경점 2

## 🧪 테스트

- [ ] 로컬 테스트 완료
- [ ] 타입 체크 통과
- [ ] 린트 통과

## 📸 스크린샷 (UI 변경시)

(해당시 첨부)
```

### PR 리뷰 프로세스

```
PR 생성
    ↓
[AI 자동 검증]
  - 타입 체크 (TypeScript/MyPy)
  - 모듈 import 검증
  - 린트 규칙 검사
    ↓
[1인 리뷰어]
  - 비즈니스 로직 검토
  - 아키텍처 적합성
  - 전체 플로우 확인
    ↓
Approve → Merge
```

---

## 6. Code Style

### Backend (Python/FastAPI)

```python
# 타입 힌트 필수
def get_user(user_id: int) -> User:
    ...

# 함수/변수: snake_case
def calculate_total_price():
    total_amount = 0

# 클래스: PascalCase
class UserRepository:
    pass
```

### Frontend (TypeScript/React)

```typescript
// 컴포넌트: PascalCase
const UserProfile: React.FC<Props> = () => { ... }

// 함수/변수: camelCase
const getUserData = () => { ... }
const isLoading = false;

// 타입/인터페이스: PascalCase
interface UserProps { ... }
type ButtonVariant = 'primary' | 'secondary';
```

---

## 7. AI 코딩 도구 사용 가이드

AI 도구를 사용할 때 이 컨벤션 파일을 참조하도록 설정하세요.

### 설정 방법

각 AI 도구별 설정은 `../setup/` 디렉토리를 참조하세요:

- `setup/CLAUDE.md` - Claude Code 설정
- `setup/CURSOR.md` - Cursor AI 설정
- `setup/GENERAL.md` - 기타 AI 도구 설정

### AI 도구의 역할

| 영역 | AI 담당 | 사람 담당 |
|------|---------|-----------|
| 코드 작성 | 구현 보조 | 아키텍처 결정 |
| PR 리뷰 | 타입/린트/import 검증 | 로직/플로우 검토 |
| 문서화 | 주석/README 초안 | 최종 검토 및 승인 |
| 테스트 | 테스트 코드 생성 | 테스트 시나리오 정의 |
