import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  images2 = [
    {
      id: '1',
      path: '/assets/img/product-img/p1.jpg',
    },
    {
      id: '2',
      path: '/assets/img/product-img/p1.jpg',
    },
    {
      id: '3',
      path: '/assets/img/product-img/p1.jpg',
    },
    {
      id: '4',
      path: '/assets/img/product-img/p1.jpg',
    },
    {
      id: '5',
      path: '/assets/img/product-img/p1.jpg',
    }
  ];

  constructor(
    private route: Router
  ) {
  }

  ngOnInit(): void {
  }

  selectChange(ev: any) {
    console.log(ev);
    this.route.navigate(['/pages/pets-detail']);
  }

  adopt() {
    this.route.navigate(['/pages/pets-detail']);
  }

}
