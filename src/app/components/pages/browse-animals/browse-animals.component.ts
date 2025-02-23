import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormsModule, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, debounceTime } from 'rxjs';

// Interfaces

import { Age } from './../../../interfaces/age';
import { Filter } from './../../../interfaces/filter';
import { Animal } from './../../../interfaces/animal';
import { Status } from './../../../interfaces/status';

// Services

import { DataService } from './../../../services/data.service';
import { HelperService } from './../../../services/helper.service';

// Components

import { CardAnimalComponent } from './../../card-animal/card-animal.component';

// Material and Bootstrap

import { MatSliderModule } from '@angular/material/slider';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

// Imports

const components = [CardAnimalComponent];
const materialAndBootstrap = [MatSliderModule, NgbPaginationModule];

@Component({
  selector: 'app-browse-animals-component',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule, FormsModule, ...materialAndBootstrap, ...components],
  templateUrl: './browse-animals.component.html',
  styleUrl: './browse-animals.component.css'
})
export class BrowseAnimalsComponent {

  // Services

  private dataService: DataService = inject(DataService);
  public helperService: HelperService = inject(HelperService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  // Animal

  public animals: Animal[] = [] as Animal[];
  public animalsBK: Animal[] = [] as Animal[];
  public animalCoatColors: any[] = [];
  public animalBreeds: any[] = [];

  // Status

  public statuses: any[] = [];

  // Animal Type

  private type: string = this.activatedRoute.snapshot.params['type'];

  // Filtering

  public filter = new BehaviorSubject<Filter>({} as Filter);

  // Filtering: Age Slider

  public minAge: number = 0;
  public maxAge: number = 0;

  public step: number = 30; // 1 Month

  public minAgeSlider = new FormControl(0); // 1 Month
  public maxAgeSlider = new FormControl((30 * 12) * 2); // 2 Years

  // Pagination

  public currentPage: number = 1;
  public pageSize: number = 10;

  // OnInit

  async ngOnInit() {

    // get animal data from resolver
    const responseAnimals = await this.activatedRoute.snapshot.data['animals'];
    if (responseAnimals.ok) {
      const data = await responseAnimals.json();
      this.animalsBK = data;
      this.animals = data;
    }

    // get statuses
    const responseStatuses = await this.activatedRoute.snapshot.data['statuses'];
    if (responseStatuses.ok) this.statuses = await responseStatuses.json();

    // get animal breeds
    const responseBreeds = await this.activatedRoute.snapshot.data['animalBreeds'];
    if (responseBreeds.ok) this.animalBreeds = await responseBreeds.json();

    // get animal coat colors from resolver
    const responseAnimalCoatColors = await this.activatedRoute.snapshot.data['animalCoatColors'];
    if (responseAnimalCoatColors.ok) this.animalCoatColors = await responseAnimalCoatColors.json();

    // get new animal data from service if type has changed
    this.activatedRoute.paramMap.subscribe(async (params) => {

      const newType: string = params.get('type') ?? '';

      if (newType !== this.type) {
        this.type = newType;

        const _responseBreeds = await this.activatedRoute.snapshot.data['animalBreeds'];
        if (_responseBreeds.ok) this.animalBreeds = await _responseBreeds.json();

        const _responseAnimals = await this.dataService.getAnimalsByType(newType);
        if (_responseAnimals.ok) {
          const data = await _responseAnimals.json();
          this.animalsBK = data;
          this.animals = data;
        }

        // get min and max age again
        // set min and max sliders again

        this.getMinMaxAge();
        this.setMinMaxSliders();

      }

    });

    // get min and max age
    // set min and max sliders

    this.getMinMaxAge();
    this.setMinMaxSliders();

    // subscribe to filter

    this.filter.subscribe((filter) => {

      // set animals equal to the filtered backup

      this.animals = this.animalsBK.filter((animal): boolean => {

        // filter animals

        return this.matchesFilter(filter.sex, animal.sex) &&
               this.matchesFilter(filter.coat_length, animal.coat_length) &&
               this.matchesFilter(filter.animal_coat_color_id, animal.animal_coat_color_id) &&
               this.matchesFilter(filter.animal_breed_id, animal.animal_breed_id) &&
               this.isValueGreaterThan(filter.min_age, animal.birthdate) &&
               this.isValueLesserThan(filter.max_age, animal.birthdate);

      });

    });

  }

  getMinAge() {
    const ages = this.animalsBK.map(animal => this.helperService.getAgeFromBirthdate(animal.birthdate));
    const agesInDays = ages.map(age => this.helperService.getAgeFromObjectInDays(age));
    return Math.min(...agesInDays);
  }

  getMaxAge() {
    const ages = this.animalsBK.map(animal => this.helperService.getAgeFromBirthdate(animal.birthdate));
    const agesInDays = ages.map(age => this.helperService.getAgeFromObjectInDays(age));
    return Math.max(...agesInDays);
  }

  getMinMaxAge() {
    this.minAge = this.getMinAge();
    this.maxAge = this.getMaxAge();
  }

  setMinMaxSliders() {
    this.minAgeSlider.setValue(this.minAge);
    this.maxAgeSlider.setValue(this.maxAge);
  }

  getValue(value: number) {
    return this.helperService.getAgeLabelFromDays(value);
  }

  /* Min and Max Slider Values */

  onMinSliderChange() {
    const min = this.minAgeSlider.value ?? 0;
    const max = this.maxAgeSlider.value ?? 0;
    if (min > max) this.maxAgeSlider.setValue(min);
  }

  onMaxSliderChange() {
    const min = this.minAgeSlider.value ?? 0;
    const max = this.maxAgeSlider.value ?? 0;
    if (max < min) this.minAgeSlider.setValue(max);
  }

  // Status

  getAnimalStatus(status_id: number): Status {
    return this.statuses.find((status: any) => status.id == status_id);
  }

  // Filtering

  setShowStatus(status_id: number|null = null): void {
    this.setFilter('status_id', status_id);
  }

  setSex(sex: number|null = null): void {
    this.setFilter('sex', sex);
  }

  setCoatLength(coatLength: number|null = null): void {
    this.setFilter('coat_length', coatLength);
  }

  setCoatColor(id: number|null = null): void {
    this.setFilter('animal_coat_color_id', id);
  }

  setBreed(id: number|null = null): void {
    this.setFilter('animal_breed_id', id);
  }

  setAgeFilter(status: boolean = false): void {

    // get filter values

    const min = status ? this.minAgeSlider.value : null;
    const max = status ? this.maxAgeSlider.value : null;

    // set values

    this.setFilter('min_age', min);
    this.setFilter('max_age', max);

    // reset form controls if values are null

    if (!min) this.minAgeSlider.setValue(this.minAge);
    if (!max) this.maxAgeSlider.setValue(this.maxAge);

  }

  resetFilters(): void {
    this.filter.next({} as Filter);
  }

  // Filtering: Helpers

  private setFilter(key: keyof Filter, value: any = null): void {
    let tmp = this.filter.getValue();
    tmp[key] = value;
    this.filter.next(tmp);
  }

  private matchesFilter(filterValue: any, animalValue: any): boolean {
    return filterValue === null || filterValue === undefined || filterValue === animalValue;
  }

  private isValueGreaterThan(filterValue: any, animalValue: any): boolean {
    const age = this.helperService.getAgeFromBirthdate(animalValue);
    const ageInDays = this.helperService.getAgeFromObjectInDays(age);
    return filterValue === null || filterValue === undefined || ageInDays >= filterValue;
  }

  private isValueLesserThan(filterValue: any, animalValue: any): boolean {
    const age = this.helperService.getAgeFromBirthdate(animalValue);
    const ageInDays = this.helperService.getAgeFromObjectInDays(age);
    return filterValue === null || filterValue === undefined || ageInDays <= filterValue;
  }

}
