export interface ICSEvent {
  uid: string;
  title: string;
  description?: string;
  location?: string;
  startDate: Date;
  endDate: Date;
  organizerName?: string;
  organizerEmail?: string;
  url?: string;
}

function formatICSDate(date: Date): string {
  return date
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '');
}

function escapeICSText(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

export function generateICS(event: ICSEvent): string {
  const now = formatICSDate(new Date());
  const start = formatICSDate(event.startDate);
  const end = formatICSDate(event.endDate);

  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Assembl//Assembl Event Platform//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${event.uid}@assembl.app`,
    `DTSTAMP:${now}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${escapeICSText(event.title)}`,
  ];

  if (event.description) {
    lines.push(`DESCRIPTION:${escapeICSText(event.description)}`);
  }

  if (event.location) {
    lines.push(`LOCATION:${escapeICSText(event.location)}`);
  }

  if (event.url) {
    lines.push(`URL:${event.url}`);
  }

  if (event.organizerEmail) {
    const organizer = event.organizerName
      ? `CN=${event.organizerName}:MAILTO:${event.organizerEmail}`
      : `MAILTO:${event.organizerEmail}`;
    lines.push(`ORGANIZER;${organizer}`);
  }

  lines.push('END:VEVENT', 'END:VCALENDAR');

  return lines.join('\r\n');
}
