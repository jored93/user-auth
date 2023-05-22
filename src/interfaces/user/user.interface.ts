import { User } from '@entities/user.entity';

export interface IEditUserInput {
  id: string;
  user: User;
}
