import { Component } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

const bootstrap = [NgbCarouselModule];

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [...bootstrap],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {

  /*

  public randomCarouselImagesIds = Array.from({ length: 10 }, 
    () => Math.floor(Math.random() * 100) + 1);  
  public carouselImages = this.randomCarouselImagesIds
         .map(id => `https://placedog.net/1920/540?id=${id}`); 

  */

  public carouselImages: string[] = [
    '/assets/images/header/alvan-nee-lvFlpqEvuRM-unsplash.jpg',
    '/assets/images/header/angel-luciano-LATYeZyw88c-unsplash.jpg',
    '/assets/images/header/anna-dudkova-urs_y9NwFcc-unsplash.jpg',
    '/assets/images/header/erik-jan-leusink-IbPxGLgJiMI-unsplash.jpg',
    '/assets/images/header/michael-sum-LEpfefQf4rU-unsplash.jpg',
    '/assets/images/header/okeykat-w6elADh_jww-unsplash.jpg',
    '/assets/images/header/thapanee-srisawat-byV33HkMneM-unsplash.jpg',
  ];

}
