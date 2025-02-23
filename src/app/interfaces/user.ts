import { Review } from './review';
import { PetAgency } from './pet-agency';
import { PetAdopter } from './pet-adopter';

export interface User {
  id: number,
  is_administrator: number,
  is_pet_agency: number,
  is_pet_adopter: number,
  email: string,
  email_verified_at: number|null,
  created_at: string,
  updated_at: string,
  reviews_given: Review[],
  reviews_received: Review[],
  pet_agency?: PetAgency|null,
  pet_adopter?: PetAdopter|null,
}