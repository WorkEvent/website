export interface WorkEvent {
  id: number;
  name: string;
  description: string;
  company: number;
  thumbnail: string;
  location: string;
  status: 'pending' | 'to-vote' | 'voted';
}
