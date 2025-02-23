import { FormControl } from '@angular/forms';

export interface ProfileFormGroup {
  email: FormControl<string|null>,
  name: FormControl<string|null>,
  phone: FormControl<string|null>,
  address: FormControl<string|null>,
  website?: FormControl<string|null>,
  description?: FormControl<string|null>,
}
