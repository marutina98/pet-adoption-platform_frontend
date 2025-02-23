export interface BridgeAPI {

  // Configuration

  storageURL: string,

  // Authenticate

  authenticate(...args: any[]): any,
  registratePetAdopter(...args: any[]): any,
  registratePetAgency(...args: any[]): any,
  logout(...args: any[]): any,

  // Data

  getUsers(...args: any[]): any,
  getAuthenticatedUser(...args: any[]): any,

  storePetAgencyProfile(...args: any[]): any,
  storePetAdopterProfile(...args: any[]): any,

  getPetAgencies(...args: any[]): any,
  getPetAdopters(...args: any[]): any,

  getPetAgencyById(...args: any[]): any,
  getPetAdopterById(...args: any[]): any,

  getAnimal(...args: any[]): any,
  getAnimals(...args: any[]): any,
  getAnimalsByType(...args: any[]): any,

  getAnimalsByPetAgency(...args: any[]): any,

  getAnimalCoatColors(...args: any[]): any,
  getAnimalBreeds(...args: any[]): any,
  getAnimalBreedsByType(...args: any[]): any,

  getTypes(...args: any[]): any,
  getTypeById(...args: any[]): any,

  getStatusById(...args: any[]): any,
  getStatuses(...args: any[]): any,

  createAnimal(...args: any[]): any,
  updateAnimal(...args: any[]): any,
  deleteAnimal(...args: any[]): any,

  getAnimalPicturesByAnimalId(...args: any[]): any,

  deleteAnimalPicture(...args: any[]): any,

  // Application

  addApplication(...args: any[]): any,
  acceptApplication(...args: any[]): any,
  refuseApplication(...args: any[]): any,

  // Review

  leaveReview(...args: any[]): any,
  getPendingReviews(...args: any[]): any,

  // ADMINISTRATOR

  adminCreateUser(...args: any[]): any,
  adminUpdateUser(...args: any[]): any,
  adminDeleteUser(...args: any[]): any,

  adminUpdateAgency(...args: any[]): any,
  adminUpdateAdopter(...args: any[]): any,

  adminCreateStatus(...args: any[]): any,
  adminUpdateStatus(...args: any[]): any,
  adminDeleteStatus(...args: any[]): any,

  adminCreateType(...args: any[]): any,
  adminUpdateType(...args: any[]): any,
  adminDeleteType(...args: any[]): any,

  adminCreateBreed(...args: any[]): any,
  adminUpdateBreed(...args: any[]): any,
  adminDeleteBreed(...args: any[]): any,

  adminCreateCoatColor(...args: any[]): any,
  adminUpdateCoatColor(...args: any[]): any,
  adminDeleteCoatColor(...args: any[]): any,

  adminUpdateAnimal(...args: any[]): any,
  adminDeleteAnimal(...args: any[]): any,

  adminDeletePicture(...args: any[]): any,

}
