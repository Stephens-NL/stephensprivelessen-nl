export interface TeamMember {
  firstName: string;
  programme: string;
  subjects: string[];
  photo: string;
  /** Written consent to publish. Nothing renders until at least one entry has it. */
  publishConsent: boolean;
}

export const team: TeamMember[] = [];
