
import { Injectable, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

// Services

import { MockApiHelpersService } from './mock-api-helpers.service';

// Interfaces

import { LoginRequestBody } from './../../interfaces/api/login-request-body';
import { ApplicationRequestBody } from './../../interfaces/api/application-request-body';
import { RegistrationRequestBody } from './../../interfaces/api/registration-request-body';
import { ReviewRequestBody } from './../../interfaces/review-request-body';

@Injectable({
  providedIn: 'root'
})
export class MockApiService {

  private cookieService = inject(CookieService);
  private helpers = inject(MockApiHelpersService);

  public storageURL: string = 'http://localhost:4200/assets/';

  /* working */

  authenticate(body: LoginRequestBody) {

    return new Promise((resolve, reject) => {

      try {
      
        const user = this.helpers.getUserByEmail(body.email);

        if (!user || user.password !== body.password) {

          reject({
            ok: false,
            status: 401,
            json: () => Promise.reject({
              message: 'Authentication: Invalid Credentials.',
            })
          });

        } else {

          resolve({
            ok: true,
            status: 200,
            json: () => Promise.resolve({              
              message: 'Authentication: Success!',
              token: '1|token',
              user: user,
            })
          });

        }

      } catch (error) {
        reject(this.helpers.getErrorMessage(error));
      }

    });

  }

  registratePetAdopter(body: RegistrationRequestBody) {

    return new Promise((resolve, reject) => {

      try {

        const isUniqueEmail = this.helpers.checkIfEmailIsUnique(body.email);

        if (!isUniqueEmail) {
          reject({
            ok: false,
            status: 401,
            json: () => Promise.resolve({
              message: 'Registration: Error! Email is not unique.',
            })
          });
        } 

        let user = this.helpers.createUser({
          email: body.email,
          password: body.password,
          is_pet_adopter: 1,
          is_pet_agency: 0,
          is_administrator: 0,
        });

        const adopter = this.helpers.createAdopter(user.id);

        user = this.helpers.getUserByEmail(user.email);

        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve({
            message: 'Registration: Success!',
            token: '1|token',
            user: user,
          })
        });

      } catch (error) {
        reject(this.helpers.getErrorMessage(error));
      }

    });

  }

  registratePetAgency(body: RegistrationRequestBody) {

    return new Promise((resolve, reject) => {

      try {

        const isUniqueEmail = this.helpers.checkIfEmailIsUnique(body.email);

        if (!isUniqueEmail) {
          reject({
            ok: false,
            status: 401,
            json: () => Promise.reject({
              message: 'Registration: Error! Email is not unique.',
            })
          });
        } 

        let user = this.helpers.createUser({
          email: body.email,
          password: body.password,
          is_pet_adopter: 0,
          is_pet_agency: 1,
          is_administrator: 0,
        });

        const agency = this.helpers.createAgency(user.id);

        user = this.helpers.getUserByEmail(user.email);

        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve({
            message: 'Registration: Success!',
            token: '1|token',
            user: user,
          })
        });

      } catch (error) {
        reject(this.helpers.getErrorMessage(error));
      }

    });

  }

  logout() {
    return new Promise((resolve, reject) => {
      try {
        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve({
            message: 'Logout: Success!',
          })
        });

      } catch (error) {
        reject(this.helpers.getErrorMessage(error));
      }

    })
  }

  getUsers() {
    return new Promise((resolve, reject) => {
      try {
        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(this.helpers.users),
        });
      } catch (error) {
        reject(this.helpers.getErrorMessage(error));
      }
    });
  }

  getAnimals() {
    return new Promise((resolve, reject) => {
      try {
        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(this.helpers.animals),
        });
      } catch (error) {
        reject(this.helpers.getErrorMessage(error));
      }
    });
  }

  getPetAgencies() {
    return new Promise((resolve, reject) => {
      try {
        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(this.helpers.agencies),
        });
      } catch (error) {
        reject(this.helpers.getErrorMessage(error));
      }
    });
  }

  getPetAdopters() {
    return new Promise((resolve, reject) => {
      try {
        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(this.helpers.adopters),
        });
      } catch (error) {
        reject(this.helpers.getErrorMessage(error));
      }
    });
  }

  getTypes() {
    return new Promise((resolve, reject) => {
      try {
        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(this.helpers.types),
        });
      } catch (error) {
        reject(this.helpers.getErrorMessage(error));
      }
    });
  }

  getStatuses() {
    return new Promise((resolve, reject) => {
      try {
        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(this.helpers.statuses),
        });
      } catch (error) {
        reject(this.helpers.getErrorMessage(error));
      }
    });
  }

  getAnimalCoatColors() {
    return new Promise((resolve, reject) => {
      try {
        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(this.helpers.coatColors),
        });
      } catch (error) {
        reject(this.helpers.getErrorMessage(error));
      }
    });
  }

  getAnimalBreeds() {
    return new Promise((resolve, reject) => {
      try {
        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(this.helpers.breeds),
        });
      } catch (error) {
        reject(this.helpers.getErrorMessage(error));
      }
    });
  }

  addApplication(animalId: number, body: ApplicationRequestBody) {
    return new Promise((resolve, reject) => {
      const application = this.helpers.addApplication(animalId, body);
      try {
        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(application),
        })
      } catch(error) {
        reject(this.helpers.getErrorMessage(error));
      }
    });
  }

  storePetAgencyProfile(profile: any) {
    return new Promise((resolve, reject) => {
      const _profile = this.helpers.storePetAgencyProfile(profile);
      
      try {
        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(_profile),
        });
      } catch(error) {
        reject(this.helpers.getErrorMessage(error));
      }
    });
  }

  storePetAdopterProfile(profile: any) {
    return new Promise((resolve, reject) => {
      const _profile = this.helpers.storePetAdopterProfile(profile);

      try {
        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(_profile),
        });
      } catch(error) {
        reject(this.helpers.getErrorMessage(error));
      }
    });
  } 

  getAnimalsByType(typeName: string) {
    return new Promise((resolve, reject) => {
      try {
        const type = this.helpers.getTypeByName(typeName);
        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(this.helpers.animals.filter((animal: any) => animal.animal_type_id === type.id)),
        });
      } catch (error) {
        reject(this.helpers.getErrorMessage(error));
      }
    });
  }

  getAnimal(id: number) {
    return new Promise((resolve, reject) => {
      try {
        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(this.helpers.getAnimalById(id)),
        });
      } catch (error) {
        reject(this.helpers.getErrorMessage(error));
      }
    });
  }

  getAnimalPicturesByAnimalId(id: number) {
    return new Promise((resolve, reject) => {
      try {
        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(this.helpers.getPicturesByAnimalId(id)),
        });
      } catch (error) {
        reject(this.helpers.getErrorMessage(error));
      }
    });
  }

  getPetAgencyById(id: number) {
    return new Promise((resolve, reject) => {
      try {
        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(this.helpers.getPetAgencyById(id)),
        });
      } catch (error) {
        reject(this.helpers.getErrorMessage(error));
      }
    });
  }

  getAuthenticatedUser() {
    return new Promise((resolve, reject) => {
      const user = this.helpers.getAuthenticatedUser();
      try {
        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(user),
        });
      } catch (error) {
        reject(this.helpers.getErrorMessage(error));
      }
    });
  }

  createAnimal(formData: FormData) {
    return new Promise((resolve, reject) => {
      try {
        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(this.helpers.createAnimal(formData)),
        });
      } catch (error) {
        reject(this.helpers.getErrorMessage(error));
      }
    });
  }

  updateAnimal(id: number, body: any) {
    return new Promise((resolve, reject) => {
      try {
        const updatedAnimal = this.helpers.updateAnimal(id, body);

        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(updatedAnimal),
        });
      } catch (error) {
        reject(this.helpers.getErrorMessage(error));
      }
    });
  }

  deleteAnimal(id: number) {
    return new Promise((resolve, reject) => {
      try {
        const deleteResponse = this.helpers.deleteAnimal(id);
        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(deleteResponse),
        });
      } catch (error) {
        reject(this.helpers.getErrorMessage(error));
      }
    });
  }

  acceptApplication(id: number) {
    return new Promise((resolve, reject) => {
      try {
        const accepted = this.helpers.acceptApplication(id);

        console.log(accepted);

        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(accepted),
        });
      } catch (error) {
        reject(this.helpers.getErrorMessage(error));
      }
    })
  }

  refuseApplication(id: number) {
    return new Promise((resolve, reject) => {
      try {
        const refused = this.helpers.refuseApplication(id);

        console.log(refused);

        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(refused),
        });
      } catch (error) {
        reject(this.helpers.getErrorMessage(error));
      }
    })
  }

  getPetAdopterById(id: number) {
    return new Promise((resolve, reject) => {
      try {
        const adopter = this.helpers.getPetAdopterById(id);
        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(adopter),
        });
      } catch (error) {
        reject(this.helpers.getErrorMessage(error));
      }
    });
  }

  getTypeById(id: number) {
    return new Promise((resolve, reject) => {
      try {
        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(this.helpers.types.find((type: any) => type.id == id)),
        });
      } catch (error) {
        reject(this.helpers.getErrorMessage(error));
      }
    });
  }

  getStatusById(id: number) {
    return new Promise((resolve, reject) => {
      try {
        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(this.helpers.statuses.find((status: any) => status.id == id)),
        });
      } catch (error) {
        reject(this.helpers.getErrorMessage(error));
      }
    });
  }

  adminCreateUser(body: any) {
    return new Promise((resolve, reject) => {
      const user = this.helpers.adminCreateUser(body);
      
      try {
        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(user),
        });
      } catch (error) {
        reject(this.helpers.getErrorMessage(error));
      }
    });
  }

  adminUpdateUser(id: number, body: any) {
    return new Promise((resolve, reject) => {
      try {
        const updated = this.helpers.adminUpdateUser(id, body);
        
        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(updated),
        });
      } catch (error) {
        reject(this.helpers.getErrorMessage(error));
      }
    });
  }

  adminUpdateAgency(id: number, formData: FormData) {
    return new Promise((resolve, reject) => {
      try {
        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(this.helpers.adminUpdateAgency(id, formData)),
        });
      } catch (error) {
        reject(this.helpers.getErrorMessage(error));
      }
    })
  }

  adminUpdateAdopter(id: number, formData: FormData) {
    return new Promise((resolve, reject) => {
      try {
        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(this.helpers.adminUpdateAdopter(id, formData)),
        });
      } catch (error) {
        reject(this.helpers.getErrorMessage(error));
      }
    })
  }
  
  adminUpdateAnimal(id: number, body: any) {
    return new Promise((resolve, reject) => {
      try {
        const updated = this.helpers.adminUpdateAnimal(id, body);

        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(updated),
        });
      } catch (error) {
        reject(this.helpers.getErrorMessage(error));
      }
    });
  }

  adminDeleteAnimal(id: number) {
    return new Promise((resolve, reject) => {
      const animal = this.helpers.adminDeleteAnimal(id);

      try {
        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(animal),
        });
      } catch (error) {
        reject(this.helpers.getErrorMessage(error));
      }
    });
  }

  adminDeleteUser(id: number) {
    return new Promise((resolve, reject) => {
      const user = this.helpers.adminDeleteUser(id);

      try {
        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(user),
        });
      } catch (error) {
        reject(this.helpers.getErrorMessage(error));
      }
    });
  }

  adminDeletePicture(id: number) {
    return new Promise((resolve, reject) => {
      try {
        const deleted = this.helpers.adminDeletePicture(id);
        
        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(deleted),
        });
      } catch (error) {
        reject(this.helpers.getErrorMessage(error));
      }
    });
  }

  adminCreateCoatColor(data: any) {
    return new Promise((resolve, reject) => {
      try {
        const created = this.helpers.adminCreateCoatColor(data);
        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(created),
        });
      } catch (error) {
        reject(this.helpers.getErrorMessage(error));
      }
    });
  }

  adminDeleteCoatColor(id: number) {
    return new Promise((resolve, reject) => {
      try {
        const deleted = this.helpers.adminDeleteCoatColor(id);
        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(deleted),
        })
      } catch (error) {
        reject(this.helpers.getErrorMessage(error));
      }
    });
  }

  adminUpdateCoatColor(id: number, data: any) {
    return new Promise((resolve, reject) => {
      try {
        const updated = this.helpers.adminUpdateCoatColor(id, data);
        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(updated),
        });

      } catch (error) {
        reject(this.helpers.getErrorMessage(error));
      }
    });
  }

  adminCreateStatus(data: any) {
    return new Promise((resolve, reject) => {
      try {
        const created = this.helpers.adminCreateStatus(data);
        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(created),
        });
      } catch (error) {
        reject(this.helpers.getErrorMessage(error));
      }
    });
  }

  adminUpdateStatus(id: number, data: any) {
    return new Promise((resolve, reject) => {
      try {
        const updated = this.helpers.adminUpdateStatus(id, data);
        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(updated),
        });
      } catch (error) {
        reject(this.helpers.getErrorMessage(error));
      }
    });
  }

  adminDeleteStatus(id: number) {
    return new Promise((resolve, reject) => {
      try {
        const deleted = this.helpers.adminDeleteStatus(id);
        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(deleted),
        });
      } catch (error) {
        reject(this.helpers.getErrorMessage(error));
      }
    });
  }

  adminCreateType(data: any) {
    return new Promise((resolve, reject) => {
      try {
        const created = this.helpers.adminCreateType(data);
        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(created),
        });
      } catch (error) {
        reject(this.helpers.getErrorMessage(error));
      }
    });
  }

  adminUpdateType(id: number, data: any) {
    return new Promise((resolve, reject) => {
      try {
        const updated = this.helpers.adminUpdateType(id, data);
        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(updated),
        });
      } catch (error) {
        reject(this.helpers.getErrorMessage(error));
      }
    });
  }

  adminDeleteType(id: number) {
    return new Promise((resolve, reject) => {
      try {
        const deleted = this.helpers.adminDeleteType(id);
        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(deleted),
        });
      } catch (error) {
        reject(this.helpers.getErrorMessage(error));
      }
    });
  }

  adminCreateBreed(data: any) {
    return new Promise((resolve, reject) => {
      try {
        const created = this.helpers.adminCreateBreed(data);
        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(created),
        });
      } catch (error) {
        reject(this.helpers.getErrorMessage(error));
      }
    });
  }

  adminUpdateBreed(id: number, data: any) {
    return new Promise((resolve, reject) => {
      try {
        const updated = this.helpers.adminUpdateBreed(id, data);
        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(updated),
        });
      } catch (error) {
        reject(this.helpers.getErrorMessage(error));
      }
    });
  }

  adminDeleteBreed(id: number) {
    return new Promise((resolve, reject) => {
      try {
        const deleted = this.helpers.adminDeleteBreed(id);
        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(deleted),
        })
      } catch (error) {
        reject(this.helpers.getErrorMessage(error));
      }
    });
  }

  getAnimalBreedsByType(typeName: string) {
    return new Promise((resolve, reject) => {
      try {
        const type = this.helpers.getTypeByName(typeName);
        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(this.helpers.breeds.filter((breed: any) => breed.animal_type_id === type.id)),
        });
      } catch (error) {
        reject(this.helpers.getErrorMessage(error));
      }
    });
  }

  getAnimalsByPetAgency(id: number) {
    return new Promise((resolve, reject) => {
      try {
        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(this.helpers.getAnimalsByPetAgencyId(id)),
        });
      } catch (error) {
        reject(this.helpers.getErrorMessage(error));
      }
    });
  }

  deleteAnimalPicture(id: number) {
    return new Promise((resolve, reject) => {
      try {
        const deleteResponse = this.helpers.deleteAnimalPicture(id);
        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(deleteResponse),
        });
      } catch (error) {
        reject(this.helpers.getErrorMessage(error));
      }
    });
  }
  
  getPendingReviews() {
    
    return new Promise((resolve, reject) => {

      try {

        // get authenticated user and its pending reviews

        const authenticatedUser = this.helpers.getAuthenticatedUser();
        const reviews = this.helpers.getPendingReviews(authenticatedUser.id);

        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(reviews),
        });

      } catch (error) {

        reject(this.helpers.getErrorMessage(error));

      }

    });

  }

  leaveReview(body: any) {
    return new Promise((resolve, reject) => {
      try {
        const review = this.helpers.leaveReview(body);

        console.log('new review', review);

        resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(review),
        });
      } catch (error) {
        reject(this.helpers.getErrorMessage(error));
      }
    })
  }

}
