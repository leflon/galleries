export interface IGallery {
  id: string;
  name: string;
  isPublic: boolean;
  customUrl: string | null;
  ownerId: string;
}
