import { Tag } from './tag';

export type Note = {
  tag: Tag;
  title: string;
  created_at: Date;
  updated_at: Date;
};
