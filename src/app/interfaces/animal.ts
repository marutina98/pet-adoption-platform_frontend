import { AnimalPicture } from './animal-picture';

export interface Animal {
  id: number,
  name: string,
  description: string,
  sex: number,
  coat_length: number,
  birthdate: string,
  pet_agency_id: number,
  pet_adopter_id: number|null,
  animal_type_id: number,
  animal_breed_id: number,
  animal_coat_color_id: number,
  status_id: number,
  created_at: string,
  updated_at: string,
  animal_pictures: AnimalPicture[],
}