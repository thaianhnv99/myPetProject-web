import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PetFormAdoptComponent} from "../pet-form-adopt/pet-form-adopt.component";

@Component({
  selector: 'app-pet-detail',
  templateUrl: './pet-detail.component.html',
  styleUrls: ['./pet-detail.component.css']
})
export class PetDetailComponent implements OnInit {

  constructor(
    private route: Router,
    private modal: NgbModal
  ) {
  }

  ngOnInit(): void {
    this.route.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
  }

  adopt() {
    const modalRef = this.modal.open(PetFormAdoptComponent, {size: 'lg'});
    // modalRef.componentInstance.items = body;
    modalRef.result.then(result => {
    });
  }

}
