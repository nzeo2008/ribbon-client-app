import { IComment } from './comment.interface';

export interface IPost {
  id?: number;
  title: string;
  caption: string;
  location: string;
  image?: File;
  likes?: number;
  userLiked?: string[];
  comments?: IComment[];
  username?: string;
}
