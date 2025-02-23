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

  public randomCarouselImagesIds = Array.from({ length: 10 }, 
    () => Math.floor(Math.random() * 100) + 1);  
  public carouselImages = this.randomCarouselImagesIds
         .map(id => `https://placedog.net/1920/540?id=${id}`); 

}
