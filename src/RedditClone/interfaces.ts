import { Message } from '../shared/interfaces/Chat';

export interface Post extends Message{
  replys: Post[]
}
