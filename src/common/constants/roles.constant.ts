import { Role } from '../../../prisma/generated/prisma/client/index.js';

export const INTERNAL_ROLES: Role[] = [
  Role.SUPER_ADMIN,
  Role.EVENT_MANAGEMENT_LEAD,
  Role.POC_OUTREACH,
  Role.POC_SPONSORSHIP,
  Role.POC_TECH_AV,
  Role.POC_MARKETING,
  Role.POC_VOLUNTEER,
  Role.POC_OPERATIONS,
  Role.TEAM_LEAD,
  Role.TEAM_MEMBER,
  Role.REGISTRATION_DESK,
];

export const POC_ROLES: Role[] = [
  Role.POC_OUTREACH,
  Role.POC_SPONSORSHIP,
  Role.POC_TECH_AV,
  Role.POC_MARKETING,
  Role.POC_VOLUNTEER,
  Role.POC_OPERATIONS,
];

export const MANAGEMENT_ROLES: Role[] = [Role.SUPER_ADMIN, Role.EVENT_MANAGEMENT_LEAD];

export const TEAM_ROLES: Role[] = [Role.TEAM_LEAD, Role.TEAM_MEMBER];
