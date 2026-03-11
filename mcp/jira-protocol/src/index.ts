#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod/v4";
import { JIRA_PROTOCOL } from "./protocol.js";

const server = new McpServer({
  name: "wand-jira-protocol",
  version: "1.0.0",
});

// ── Resource: JIRA 프로토콜 전문 ──
server.resource("jira-protocol", "jira-protocol://rules", async (uri) => ({
  contents: [
    {
      uri: uri.href,
      mimeType: "text/markdown",
      text: JIRA_PROTOCOL,
    },
  ],
}));

// ── Prompt 1: JIRA 이슈 작성 도우미 ──
server.prompt(
  "create-jira-issue",
  "JIRA 이슈를 프로토콜에 맞게 작성합니다",
  {
    task_description: z.string().describe("어떤 작업을 할 예정인지 간단히 설명해주세요"),
    issue_type: z.string().optional().describe("이슈 유형 (Story, Task, Bug)"),
    related_kr: z.string().optional().describe("연결할 KR(핵심 결과)이 있으면 입력해주세요"),
  },
  async ({ task_description, issue_type, related_kr }) => ({
    messages: [
      {
        role: "user" as const,
        content: {
          type: "text" as const,
          text: `아래 JIRA 프로토콜을 참고하여 이슈를 작성해주세요.

═══ JIRA 프로토콜 ═══
${JIRA_PROTOCOL}
═══ 프로토콜 끝 ═══

─── 작업 정보 ───
- 작업 설명: ${task_description}
- 이슈 유형: ${issue_type || "자동 판단"}
- 연결 KR: ${related_kr || "없음 (적합한 KR을 제안해주세요)"}

위 프로토콜의 규칙에 따라 다음을 작성해주세요:

1. **이슈 제목** - \`[prefix] 대상 - 작업 목표\` 형식
2. **이슈 유형** - Story / Task / Bug 중 적합한 것
3. **우선순위** - Highest ~ Lowest 중 적합한 것
4. **스토리 포인트** - 피보나치 스케일 (1, 2, 3, 5, 8, 13)
5. **라벨** - 표준 라벨 중 적합한 것
6. **설명** - 배경(Why) → 작업 내용(What) → 기술적 접근(How, 해당 시) → 완료 조건 구조
7. **OKR 연결 근거** - 이 작업이 KR에 어떻게 기여하는지

마지막으로 프로토콜의 체크리스트(섹션 9)를 기준으로 자가 점검 결과를 보여주세요.`,
        },
      },
    ],
  })
);

// ── Prompt 2: JIRA 이슈 검토 ──
server.prompt(
  "review-jira-issue",
  "작성된 JIRA 이슈가 프로토콜을 준수하는지 검토합니다",
  {
    issue_title: z.string().describe("이슈 제목"),
    issue_description: z.string().describe("이슈 설명 (본문)"),
    story_points: z.string().optional().describe("스토리 포인트"),
    connected_kr: z.string().optional().describe("연결된 KR"),
  },
  async ({ issue_title, issue_description, story_points, connected_kr }) => ({
    messages: [
      {
        role: "user" as const,
        content: {
          type: "text" as const,
          text: `아래 JIRA 프로토콜을 기준으로 이슈를 검토해주세요.

═══ JIRA 프로토콜 ═══
${JIRA_PROTOCOL}
═══ 프로토콜 끝 ═══

─── 검토 대상 이슈 ───
- 제목: ${issue_title}
- 설명:
${issue_description}
- 스토리 포인트: ${story_points || "미설정"}
- 연결된 KR: ${connected_kr || "미연결"}

다음 관점에서 검토해주세요:

1. **제목 검토**: [prefix] 형식, 구체성, 대상 명시 여부
2. **설명 검토**: 배경(Why), 작업 내용(What), 완료 조건 포함 여부
3. **메타데이터 검토**: 스토리 포인트, 라벨, 우선순위 적절성
4. **OKR 연결 검토**: KR과의 연관성, 연결 근거 명시 여부
5. **안티 패턴 검사**: 섹션 11의 안티 패턴에 해당하는 항목
6. **AI 평가 예상 영향**: 현재 이슈가 AI 평가에서 어떤 점수를 받을지 예상

검토 결과를 **통과/개선필요/미흡** 등급과 함께, 구체적인 개선 제안을 포함해주세요.`,
        },
      },
    ],
  })
);

// ── Prompt 3: 이슈 완료 코멘트 작성 ──
server.prompt(
  "complete-jira-issue",
  "이슈 완료 시 작업 결과 코멘트를 작성합니다",
  {
    issue_title: z.string().describe("이슈 제목"),
    work_result: z.string().describe("실제 작업 결과를 간단히 설명해주세요"),
    changed_files_or_scope: z.string().optional().describe("변경된 파일 수 또는 작업 범위"),
  },
  async ({ issue_title, work_result, changed_files_or_scope }) => ({
    messages: [
      {
        role: "user" as const,
        content: {
          type: "text" as const,
          text: `JIRA 이슈 완료 코멘트를 작성해주세요.

═══ 참고: 프로토콜 섹션 10 (이슈 완료 시 처리) ═══
이슈를 Done으로 전환하기 전에:
1. 완료 조건 체크: Description의 체크리스트를 모두 완료 상태로 업데이트
2. 결과 기록: 실제 작업 결과를 코멘트로 남기기
3. 예상과 다른 점 기록: 처음 계획과 달라진 부분이 있으면 명시
═══ 참고 끝 ═══

─── 이슈 정보 ───
- 제목: ${issue_title}
- 작업 결과: ${work_result}
- 변경 범위: ${changed_files_or_scope || "미입력"}

다음 형식으로 완료 코멘트를 작성해주세요:

## 작업 결과
- (측정 가능한 before/after 수치 포함)
- (변경 파일 수 또는 작업 범위)
- (관련 PR 번호)

## 예상과 달라진 점 (있는 경우)
- (계획 대비 변경 사항)

동료 투표 시 정확한 평가가 가능하도록 구체적이고 측정 가능한 결과를 포함해주세요.`,
        },
      },
    ],
  })
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
