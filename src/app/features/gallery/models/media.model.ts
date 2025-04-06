export interface IMedia {
  id: string;
  tags: string[];
  index: number;
  type: 'image' | 'gif' | 'video';
  url: string;
}
