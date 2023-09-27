import { Tag } from './tag';

export type Note = {
  guid?: string;
  tag?: Tag;
  title?: string;
  created_at?: Date;
  updated_at?: Date;
};
