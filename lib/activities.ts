import { Activity } from "./types";

export const activities: Activity[] = [
    {
        id: "ACT-001",
        user: "agent_01",
        type: "lead_analysis",
        status: "success",
        createdAt: "2026-03-08T09:15:00Z",
        description:
            "Analysed 42 new leads from CRM pipeline and scored them by engagement probability.",
    },
    {
        id: "ACT-002",
        user: "agent_02",
        type: "message_reply",
        status: "success",
        createdAt: "2026-03-08T08:45:00Z",
        description:
            "Auto-generated and sent follow-up replies to 18 pending customer enquiries.",
    },
    {
        id: "ACT-003",
        user: "agent_03",
        type: "document_parse",
        status: "failed",
        createdAt: "2026-03-07T17:30:00Z",
        description:
            "Failed to parse uploaded contract PDF — unsupported encoding detected.",
    },
    {
        id: "ACT-004",
        user: "agent_01",
        type: "meeting_summary",
        status: "success",
        createdAt: "2026-03-07T15:00:00Z",
        description:
            "Generated meeting summary for Q1 planning call with action items extracted.",
    },
    {
        id: "ACT-005",
        user: "agent_04",
        type: "crm_sync",
        status: "processing",
        createdAt: "2026-03-08T10:05:00Z",
        description:
            "Syncing updated contact records from HubSpot to internal database.",
    },
    {
        id: "ACT-006",
        user: "agent_02",
        type: "lead_analysis",
        status: "failed",
        createdAt: "2026-03-06T14:20:00Z",
        description:
            "Lead scoring timed out due to rate limit on third-party enrichment API.",
    },
    {
        id: "ACT-007",
        user: "agent_05",
        type: "document_parse",
        status: "success",
        createdAt: "2026-03-08T07:50:00Z",
        description:
            "Parsed and indexed 12 onboarding documents for the new client workspace.",
    },
    {
        id: "ACT-008",
        user: "agent_03",
        type: "message_reply",
        status: "processing",
        createdAt: "2026-03-08T10:30:00Z",
        description:
            "Drafting AI-assisted replies to 7 high-priority support tickets.",
    },
    {
        id: "ACT-009",
        user: "agent_04",
        type: "meeting_summary",
        status: "success",
        createdAt: "2026-03-06T11:00:00Z",
        description:
            "Summarised design review call and linked referenced Figma files.",
    },
    {
        id: "ACT-010",
        user: "agent_05",
        type: "crm_sync",
        status: "success",
        createdAt: "2026-03-07T09:15:00Z",
        description:
            "Completed bi-directional sync of 230 deal records with Salesforce.",
    },
];
