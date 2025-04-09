export interface IMedia {
  id: string;
  tags: string[];
  type: 'image' | 'gif' | 'video';
  url: string;
  previous: string | null;
  next: string | null;
  firebaseFile: string | null;
}
