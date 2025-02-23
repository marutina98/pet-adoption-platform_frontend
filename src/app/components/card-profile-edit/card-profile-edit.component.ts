import { Component, Input, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

// Interfaces

import { User } from './../../interfaces/user';
import { Profile } from './../../interfaces/profile';
import { FormEntry } from './../../interfaces/form-entry';

// Services

import { AuthService } from './../../services/auth.service';
import { DataService } from './../../services/data.service';

@Component({
  selector: 'app-card-profile-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './card-profile-edit.component.html',
  styleUrl: './card-profile-edit.component.css'
})
export class CardProfileEditComponent {

  @Input() authenticatedUser: User|null = null;
  @Input() profile: Profile|null = null;

  // Services

  private authService: AuthService = inject(AuthService);
  private dataService: DataService = inject(DataService);

  // Form

  public form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    phone: new FormControl(''),
    address: new FormControl(''),
    picture: new FormControl(''),
  });

  private pictureFile: File|null = null;

  ngOnInit() {

    // initialize form

    if (this.authenticatedUser?.is_pet_agency) {

      const regex = '/(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi';
      const website = new FormControl(this.profile?.website, [Validators.pattern(regex)]);
      const description = new FormControl(this.profile?.description);

      this.form.addControl('website', website);
      this.form.addControl('description', description);

    }

    // set default values

    this.form.patchValue({
      email: this.profile?.email,
      name: this.profile?.name,
      phone: this.profile?.phone,
      address: this.profile?.address,
    });

  }

  async updateProfile() {
    
    // create formdata

    const formData: FormData = new FormData();

    // append form values to formData

    formData.append('name', this.form.value.name);
    formData.append('email', this.form.value.email);
    formData.append('phone', this.form.value.phone);
    formData.append('address', this.form.value.address);

    if (this.pictureFile) formData.append('picture', this.pictureFile);

    if (this.authenticatedUser?.is_pet_agency) {
      formData.append('website', this.form.value.website);
      formData.append('description', this.form.value.description);
    }

    // view formdata content

    const formEntries: FormEntry[] = [];

    formData.forEach((value, key) => {
      formEntries.push({ key, value: value.toString() });
    });

    // send formdata

    let data;

    if (this.authenticatedUser?.is_pet_agency) {
      const response = await this.dataService.storePetAgencyProfile(formData);
      data = await response.json();
    }

    if (this.authenticatedUser?.is_pet_adopter) {
      const response = await this.dataService.storePetAdopterProfile(formData);
      data = await response.json();
    }

  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) this.pictureFile = input.files[0];
  }

}
