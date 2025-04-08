export interface IMediaAdderItem {
  type: 'url' | 'file';
  url?: string;
  file?: File;
}
