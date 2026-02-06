
export interface Manifestation {
  id: string;
  desire: string;
  createdAt: number;
  status: 'active' | 'fulfilled';
  details: string;
}

export interface RevisionEntry {
  id: string;
  date: string;
  originalEvent: string;
  revisedEvent: string;
}

export interface MentalConversation {
  id: string;
  oldThought: string;
  newThought: string;
  timestamp: number;
}

export interface JournalEntry {
  id: string;
  date: string;
  content: string;
  feeling: string;
}

export type View = 'dashboard' | 'sats' | 'revision' | 'diet' | 'journal';
