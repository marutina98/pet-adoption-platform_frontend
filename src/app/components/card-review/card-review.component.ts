
import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

// Services

import { BridgeApiService } from './../../services/api/bridge-api.service';

// Interfaces

import { User } from './../../interfaces/user';
import { Review } from './../../interfaces/review';

// Bootstrap

import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

const bootstrap = [NgbRatingModule];

@Component({
  selector: 'app-card-review',
  standalone: true,
  imports: [RouterLink, ...bootstrap],
  templateUrl: './card-review.component.html',
  styleUrl: './card-review.component.css'
})
export class CardReviewComponent {

  @Input() users: User[] = [];
  @Input() reviews: Review[] = [];
  @Input() reviewType: string = 'received';

  // Services

  private bridgeApiService: BridgeApiService = inject(BridgeApiService);

  // Data

  public storageURL: string = this.bridgeApiService.chosenAPI.storageURL;

  getIdType() {
    return (this.reviewType === 'received') ? 'reviewer_id' :
           (this.reviewType === 'given') ? 'reviewee_id' : '';
  }

  getUser(id: number) {
    return this.users.find((user: User) => user.id === id);
  }

  getUserPicture(review: Review) {
    const id = review[this.getIdType() as keyof typeof review] as number;
    const user = this.getUser(id);
    const picture = user ? (user.is_pet_adopter ? user.pet_adopter?.picture : user.pet_agency?.picture) : '';
    return picture;
  }

  getUserRouterLink(review: Review) {
    const userId = review[this.getIdType() as keyof typeof review] as number;
    const user = this.getUser(userId);
    const profileId = user ? (user.is_pet_adopter ? user.pet_adopter?.id : user.pet_agency?.id) : 0;
    const route = ['/browse/view/', user ? (user.is_pet_adopter ? 'adopter' : 'agency') : '', profileId];
    return route;
  }

}
