import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

// Interfaces

import { Type } from './../../interfaces/type';
import { Breed } from './../../interfaces/breed';
import { Animal } from './../../interfaces/animal';
import { Status } from './../../interfaces/status';
import { CoatColor } from './../../interfaces/coat-color';
import { PetAdopter } from './../../interfaces/pet-adopter';

// Services

import { DataService } from './../../services/data.service';
import { BridgeApiService } from './../../services/api/bridge-api.service';

@Component({
  selector: 'app-dashboard-animal-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './dashboard-animal-create.component.html',
  styleUrl: './dashboard-animal-create.component.css'
})
export class DashboardAnimalCreateComponent {

  // Services

  private router: Router = inject(Router);
  private dataService: DataService = inject(DataService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private bridgeApiService: BridgeApiService = inject(BridgeApiService);

  // Data

  public allBreeds: Breed[] = [];

  public breeds: Breed[] = [];
  public coatColors: CoatColor[] = [];

  public sexes: String[] = ['Male', 'Female'];
  public types: Type[] = [];
  public coatLengths: String[] = ['Short', 'Medium', 'Long'];

  // Form

  public form = new FormGroup({
    animal_breed_id: new FormControl(0),
    animal_coat_color_id: new FormControl(0),
    animal_type_id: new FormControl(1),
    birthdate: new FormControl(),
    coat_length: new FormControl(0),
    description: new FormControl('Description'),
    name: new FormControl('Name'),
    sex: new FormControl(0),
    pictures: new FormControl(''),
  });

  private pictureFiles: File[] = [];

  // Init

  async ngOnInit() {

    // Get Types

    const responseTypes = await this.activatedRoute.snapshot.data['types'];
    if (responseTypes.ok) this.types = await responseTypes.json();

    // Get Animal Breeds

    const responseAnimalBreeds = await this.activatedRoute.snapshot.data['animalBreeds'];
    if (responseAnimalBreeds.ok) this.allBreeds = await responseAnimalBreeds.json();

    // Get Animal Coat Colors

    const responseCoatColors = await this.activatedRoute.snapshot.data['animalCoatColors'];
    if (responseCoatColors.ok) this.coatColors = await responseCoatColors.json();

    // Get Type

    const type = this.form.get('animal_type_id');

    // Init First Breeds

    this.filterBreeds(Number(type?.value));

    // Init Form

    this.form.patchValue({
      animal_breed_id: this.breeds[0].id,
      animal_coat_color_id: this.coatColors[0].id,
    });


    // Filter breeds when the animal type changes

    if (type) type.valueChanges.subscribe((t) => {
      if (t) this.filterBreeds(Number(t));
      this.form.patchValue({ animal_breed_id: this.breeds[0].id });
    });

  }

  // Birthdate

  getDateInCorrectFormat(date: Date = new Date()) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  // Breeds

  filterBreeds(typeId: number) {
    this.breeds = this.allBreeds.filter((breed) => breed.animal_type_id == typeId);
  }

  // Pictures

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) this.pictureFiles = [...Array.from(input.files)];
  }

  // Create

  async createAnimal() {

    const formData = new FormData();

    // Append all Form Fields except 'pictures'

    Object.keys(this.form.controls).forEach((key) => {
      if (key !== 'pictures') formData.append(key, this.form.get(key)?.value);
    });

    // Append Pictures

    this.pictureFiles.forEach((file: File) => {
      formData.append('pictures[]', file);
    });

    // Create Animal

    const response = await this.dataService.createAnimal(formData);
    const animal = (await response.json()).object;

    console.log('CREATE');
    console.log(animal);

    // Move to the new animal's page

    this.router.navigate(['browse/view/animal', animal.id]);

  }

}
