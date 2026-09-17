export interface EventItem {
  id: string;
  title: string;
  category: string;
  dateTime: string;
  venue: string;
  isJoined: boolean;
  description: string;
}

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: '1',
    title: 'Hackathon 2026',
    category: 'Academic',
    dateTime: 'Oct 15, 2026',
    venue: 'Auditorium',
    isJoined: false,
    description: 'Campus hackathon event.',
  },
];