import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

// Interfaces

import { User } from './../../interfaces/user';
import { Review } from './../../interfaces/review';

// Services

import { DataService } from './../../services/data.service';
import { BridgeApiService } from './../../services/api/bridge-api.service';

// Components


import { CardReviewComponent } from './../card-review/card-review.component';

const components = [CardReviewComponent];

// Bootstrap

import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

const bootstrap = [NgbNavModule, NgbRatingModule];

@Component({
  selector: 'app-card-user',
  standalone: true,
  imports: [RouterLink, ...components, ...bootstrap],
  templateUrl: './card-user.component.html',
  styleUrl: './card-user.component.css'
})
export class CardUserComponent {

  @Input() profile: any = null;
  @Input() singlePage: boolean = false;
  @Input() imageHeight: string = '100%';
  @Input() showRating: boolean = false;
  @Input() showReviews: boolean = true;
  @Input() showRedirectBtn: boolean = false;

  // Services

  private dataService: DataService = inject(DataService);
  private bridgeApiService: BridgeApiService = inject(BridgeApiService);

  public storageURL: string = this.bridgeApiService.chosenAPI.storageURL;
  public averageRatingReceivedReviews: number = 0;
  public averageRatingGivenReviews: number = 0;

  public users: User[] = [];

  // Tabs

  activeTab: number = 1;

  async ngOnInit() {

    // get users for reviews

    const response = await this.dataService.getUsers();
    if (response.ok) this.users = await response.json();

    this.averageRatingReceivedReviews = this.getAverageRating(this.profile.user.reviews_received);
    this.averageRatingGivenReviews = this.getAverageRating(this.profile.user.reviews_given);

  }

  getAverageRating(reviews: Review[]): number {
    return reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0;
  }

}
