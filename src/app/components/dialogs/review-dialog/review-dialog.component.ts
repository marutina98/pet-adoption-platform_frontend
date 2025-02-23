import { Component, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

// Services

import { DataService } from './../../../services/data.service';

// Bootstrap

import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

const bootstrap = [NgbRatingModule];

@Component({
  selector: 'app-review-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, ...bootstrap],
  templateUrl: './review-dialog.component.html',
  styleUrl: './review-dialog.component.css',
})
export class ReviewDialogComponent {

  // services

  private dataService: DataService = inject(DataService);

  // dialog

  private data = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<ReviewDialogComponent>);

  // reviewee

  public reviewee_id: number = 0;

  // form

  public form = new FormGroup({
    rating: new FormControl(0, [Validators.required]),
    comment: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.reviewee_id = this.data.reviewee_id;
  }

  async submit() {

    const body = {
      rating: this.form.get('rating')?.value ?? 0,
      comment: this.form.get('comment')?.value ?? '',
      reviewee_id: this.reviewee_id,
    }

    console.log('body', body);

    const response = await this.dataService.leaveReview(body);
    const data = await response.json();

    console.log('data', data);

    this.dialogRef.close();

  }

}
