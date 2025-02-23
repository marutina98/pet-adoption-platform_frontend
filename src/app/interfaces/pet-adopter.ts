import { User } from './user';
import { Application } from './application';

export interface PetAdopter {
  id: number,
  name: string|null,
  phone: string|null,
  address: string|null,
  picture: string|null,
  user_id: number,
  created_at: string,
  updated_at: string,
  user: User,
  sent_applications?: Application[],
}