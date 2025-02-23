import { Animal } from './animal';

export interface Application {
  id: number,
  name: string,
  email: string,
  phone: string,
  message: string,
  animal_id: number,
  pet_adopter_id: number,
  created_at: string,
  updated_at: string,
  animal: Animal,
  application_status_id: number,
}