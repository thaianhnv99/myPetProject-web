import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PetFormAdoptComponent} from "../pet-form-adopt/pet-form-adopt.component";
import {PetsService} from "../../theme/service/pets.service";

@Component({
  selector: 'app-pet-detail',
  templateUrl: './pet-detail.component.html',
  styleUrls: ['./pet-detail.component.css']
})
export class PetDetailComponent implements OnInit {
  petItem: any = null;

  constructor(
    private route: Router,
    private modal: NgbModal,
    private petsService: PetsService
  ) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    let itemPet = this.petsService.getItemPet();
    if (itemPet) {
      this.petItem = itemPet;
    } else {
      this.goBackHome();
    }
    console.log(this.petItem);
  }

  goBackHome() {
    this.route.navigate(['/home']);
  }

  adopt() {
    const modalRef = this.modal.open(PetFormAdoptComponent, {size: 'lg'});
    modalRef.componentInstance.petItem = this.petItem;
    modalRef.result.then(result => {
    });
  }

}
