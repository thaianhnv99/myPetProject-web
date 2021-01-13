import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PetsService} from "../service/pets.service";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  listPets: any[] = [];

  constructor(
    private route: Router,
    private petsService: PetsService
  ) {
  }

  ngOnInit(): void {
    this.petsList();
  }

  petsList() {
    let body = {
      page: 1,
      pageSize: 10
    }
    this.petsService.getAllPet(body).subscribe(res => {
      console.log(res);
      if (res.body.data.length) {
        res.body.data.forEach(item => {
          item['path'] = item.picture;
        })
        this.listPets = res.body.data;
        console.log(this.listPets);
      }
    });
  }

  selectChange(ev: any) {
    console.log(ev);
    this.petsService.setItemPet(ev);
    this.route.navigate(['/pages/pets-detail']);
  }

  adopt() {
    this.route.navigate(['/pages/pets-detail']);
  }

}
