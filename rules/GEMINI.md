[System Config: GitHub MCP Scope Update]

현재 연결된 GitHub MCP 토큰의 권한과 접근 가능한 리포지토리 범위입니다. 
이 정보를 바탕으로 작업을 수행하세요.

1. **Target Organization**: `wand-patsol`

2. **Accessible Repositories (작업 대상)**:
   - `wand-patsol/PatSol-Back` (Main 서비스 API 서버)
   - `wand-patsol/PatSol_Dj_Back` (Local DB 서버)
   - `wand-patsol/Attend-Back` (출퇴근 서비스 API 서버)

3. **Your Permissions (사용 가능 기능)**:
   - ✅ **Code**: Read & Write (코드 분석, 수정, 커밋, 푸시 가능)
   - ✅ **Issues/PRs**: Read & Write (이슈 생성, PR 리뷰 및 코멘트 가능)
   - 🚫 **Org Admin**: None (조직 설정 변경 불가)

# General GitHub Rules

- **Language**: All GitHub-related activities, including commit messages, Pull Request titles and descriptions, and comments, must be written in **Korean**.

- 

---

# Branch Rules

- **Structure**:
  - **`main`** (Production)
    - 언제든 배포 가능한 상용 상태.
    - **Rule**: 직접 푸시 금지 (Protected Branch).
  - **`staging`** (Pre-production)
    - `main` 배포 전, 최종 QA 및 테스트 대기 브랜치.
    - **Rule**: 기능 추가 금지, 오직 버그 수정만 가능.
  - **`dev`** (Integration)
    - 개발 통합용 브랜치 (모든 `feature`가 이곳으로 모임).
  - **`feature/*`**
    - 개별 기능 개발 브랜치.
    - **Naming**: `feature/기능명` (예: `feature/login-api`)
  - **`hotfix/*`**
    - 운영(Main) 이슈 발생 시 긴급 수정 브랜치.

- **Remote Push**: 브랜치를 생성하면 작업 전 항상 리모트(Remote)에 먼저 푸시하여 추적 가능하게 만들어야 합니다.

---

# Commit Rules

- **Debugging Code**: `print`, `console.log` 등 디버깅을 위한 코드는 커밋에 포함되지 않도록 제거해야 합니다.

# Commit Message Rules

- **Format**: `[Prefix]: Subject` (Prefix는 대괄호로 감싸고, 콜론을 사용합니다.)
- **Prefix List**: All commit messages must start with one of the following prefixes:
  - `[feat]`: 새로운 기능 추가 (New feature)
  - `[fix]`: 버그 수정 (Bug fix)
  - `[refactor]`: 코드 리팩토링 (Code change that neither fixes a bug nor adds a feature)
  - `[test]`: 테스트 코드 추가 및 수정 (Adding missing tests or correcting existing tests)
  - `[docs]`: 문서 수정 (Documentation changes)
  - `[design]`: UI / Style / CSS 등 디자인 관련 변경 (UI/UX changes)
  - `[format]`: 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우 (Code style, formatting; formerly 'art')

- **Granularity**: Commits should be as granular as possible. Each commit should represent a single logical change.

---

# Pull Request (PR) Rules

When creating a Pull Request, please adhere to the following guidelines to ensure clarity and a smooth review process.

## 1. PR Title

The PR title should be clear and concise, following the same prefix rules as commit messages, and must be in **Korean**.

- **Example**: `[feat]: 사용자 인증 기능 추가`

## 2. PR Description (Template)

Use the following template in your PR description. The description must be in **Korean**.

```markdown
## 📝 Description

변경 사항에 대한 요약과 해결된 이슈 번호를 포함해주세요. 관련된 동기나 컨텍스트도 함께 제공해주세요.

- Closes #(이슈_번호)

## ✨ 주요 변경 사항

- 변경점 1
- 변경점 2
- 변경점 3

## ✅ 체크리스트2

- [ ] 제 코드는 이 프로젝트의 스타일 가이드라인을 따릅니다.
- [ ] 제 코드에 대한 자체 검토를 수행했습니다.
- [ ] 이해하기 어려운 부분에 주석을 추가했습니다.
- [ ] 문서에 관련된 변경 사항을 만들었습니다.
- [ ] 제 변경 사항으로 인해 새로운 경고가 발생하지 않습니다.
- [ ] 제 수정 사항이 효과적이거나 기능이 작동함을 증명하는 테스트를 추가했습니다.
- [ ] 새로운 테스트와 기존 테스트 모두 제 변경 사항으로 로컬에서 통과합니다.