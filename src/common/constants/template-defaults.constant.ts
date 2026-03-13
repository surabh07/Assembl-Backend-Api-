export interface TemplateDefaultFields {
  departments: string[];
  pocResponsibilities: string[];
  taskCategories: string[];
  scheduleSlotSuggestions: string[];
}

export const TEMPLATE_DEFAULTS: Record<string, TemplateDefaultFields> = {
  HACKATHON: {
    departments: [
      'Tech & Infrastructure',
      'Mentorship',
      'Judging',
      'Participant Support',
      'Food & Logistics',
    ],
    pocResponsibilities: [
      'Registration Desk',
      'Wi-Fi & Power Lead',
      'Mentor Coordinator',
      'Judging Panel Lead',
      'Submission Portal Lead',
      'Food Station Lead',
    ],
    taskCategories: [
      'Venue & Network Setup',
      'Team Registration',
      'Mentor Scheduling',
      'Judging Rubric Prep',
      'Prize Coordination',
    ],
    scheduleSlotSuggestions: [
      'Registration & Check-in',
      'Kickoff Ceremony',
      'Hacking Begins',
      'Mentor Sessions',
      'Submission Deadline',
      'Judging',
      'Awards Ceremony',
    ],
  },
  CONFERENCE: {
    departments: [
      'Speaker & Content',
      'AV & Tech',
      'Registration & Hospitality',
      'Sponsorship',
      'Volunteer Coordination',
    ],
    pocResponsibilities: [
      'Speaker Green Room Lead',
      'AV Control',
      'Main Stage MC',
      'Registration Desk',
      'Sponsor Booth Lead',
      'Session Room Monitors',
    ],
    taskCategories: [
      'Speaker Confirmation',
      'AV Setup & Testing',
      'Sponsorship Deliverables',
      'Attendee Communication',
      'Badge Printing',
    ],
    scheduleSlotSuggestions: [
      'Early Registration',
      'Keynote',
      'Morning Breakouts',
      'Lunch & Networking',
      'Afternoon Breakouts',
      'Closing Keynote',
    ],
  },
  CONCERT: {
    departments: [
      'Stage & Artist',
      'Front of House',
      'Security & Crowd',
      'Ticketing & Entry',
      'Sponsorship & Branding',
    ],
    pocResponsibilities: [
      'Stage Manager',
      'Sound Engineer',
      'Artist Liaison',
      'Entry Gate Lead',
      'Crowd Safety Lead',
      'Merchandise Desk',
    ],
    taskCategories: [
      'Venue Setup',
      'Sound & Lighting Check',
      'Artist Coordination',
      'Entry Management',
      'Post-show Breakdown',
    ],
    scheduleSlotSuggestions: [
      'Load-in',
      'Soundcheck',
      'Doors Open',
      'Opening Act',
      'Main Act',
      'Venue Clear',
    ],
  },
  WORKSHOP: {
    departments: ['Instruction & Content', 'Participant Experience', 'Tech Setup', 'Admin'],
    pocResponsibilities: [
      'Lead Instructor',
      'Lab Monitor',
      'Materials Distribution Lead',
      'Tech Helpdesk',
      'Attendance Tracker',
    ],
    taskCategories: [
      'Curriculum Prep',
      'Environment Setup',
      'Pre-event Communication',
      'Attendance Tracking',
      'Feedback Collection',
    ],
    scheduleSlotSuggestions: [
      'Setup & Check-in',
      'Introduction',
      'Module 1',
      'Break',
      'Module 2',
      'Lunch',
      'Module 3',
      'Q&A & Wrap-up',
    ],
  },
  MEETUP: {
    departments: ['Hosting', 'AV & Talks', 'Community', 'Sponsorship'],
    pocResponsibilities: [
      'Host / Emcee',
      'AV Lead',
      'Welcome Desk',
      'Food & Drinks Lead',
      'Sponsor Table Lead',
    ],
    taskCategories: [
      'Venue Booking',
      'Speaker Invites',
      'Social Media Promotion',
      'RSVPs',
      'Day-of Setup',
    ],
    scheduleSlotSuggestions: [
      'Doors Open & Networking',
      'Welcome Remarks',
      'Lightning Talks',
      'Open Networking',
      'Closing',
    ],
  },
  SEMINAR: {
    departments: [
      'Academic Program',
      'Logistics',
      'AV & Documentation',
      'Guest & Speaker Relations',
    ],
    pocResponsibilities: [
      'Program Chair',
      'Session Moderators',
      'AV & Recording Lead',
      'Guest Registration',
      'Certificate Desk',
    ],
    taskCategories: [
      'Abstract Review',
      'Speaker Briefing',
      'AV & Recording Setup',
      'Attendance & Certificates',
    ],
    scheduleSlotSuggestions: [
      'Registration',
      'Inaugural Session',
      'Keynote',
      'Paper Presentations',
      'Panel Discussion',
      'Certificate Distribution',
    ],
  },
};
