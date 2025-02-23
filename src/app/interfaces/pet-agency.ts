import { User } from './user';
import { Animal } from './animal';
import { Application } from './application';

export interface PetAgency {
  id: number,
  name: string|null,
  phone: string|null,
  website: string|null,
  address: string|null,
  picture: string|null,
  description: string|null,
  user_id: number,
  created_at: string,
  updated_at: string,
  user: User,
  animals?: Animal[],
  received_applications?: Application[],
}