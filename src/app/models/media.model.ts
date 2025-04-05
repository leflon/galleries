export interface IMedia {
  id: string;
  tags: string[];
  position: number;
  type: 'image' | 'gif' | 'video';
  url: string;
}
