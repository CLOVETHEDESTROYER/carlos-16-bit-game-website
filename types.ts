export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export enum Page {
  HOME = 'HOME',
  ABOUT = 'ABOUT',
  PROJECTS = 'PROJECTS',
  GUESTBOOK = 'GUESTBOOK', // The AI Chat
  LINKS = 'LINKS'
}

export interface Project {
  id: number;
  title: string;
  description: string;
  year: string;
}