# Taley Team Dashboard — Product Requirements Document

## Document control

- Product: Taley Team Dashboard
- Repository: `adamalio/taley-team-dashboard`
- Status: living PRD
- Last updated: 2026-04-27

## 1. Purpose

A Taley team collaboration dashboard for internal task, project, team, and communication workflows.

## 2. Target users

- Taley team members
- Adam as product/operations lead
- Sky/OpenClaw as execution support

## 3. Goals and success metrics

| Goal | Metric |
| --- | --- |
| Track team work | Tasks/projects are visible and updateable |
| Improve coordination | Communication and team sections reduce scattered updates |
| Stay deployable | Build/test commands pass

## 4. Current scope

- Internal dashboard UI
- Team/task/project views as implemented in the repo
- Deployment-ready docs and scripts from the existing README

## 5. Out of scope

- Public customer dashboard
- Financial payroll or HR system
- Sensitive production data without auth/privacy review

## 6. Requirements

1. Users can see team/project/task state.
2. Navigation must make core sections reachable.
3. Any backend credentials must use environment variables.
4. README and PRD must stay linked.
5. Build/test gates should be documented.

## 7. Tech baseline

Use the repository README and package scripts as the implementation source of truth. Update this section when the active stack changes.

## 8. Verification

```bash
npm install
npm run build
```

## 9. Roadmap

- Confirm relationship to `taley-dashboard`.
- Add smoke tests for core routes.
- Decide whether to merge, archive, or keep separate.
