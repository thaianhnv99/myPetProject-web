import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-pet-form-adopt',
  templateUrl: './pet-form-adopt.component.html',
  styleUrls: ['./pet-form-adopt.component.css']
})
export class PetFormAdoptComponent implements OnInit {

  constructor(
    public activeModal: NgbActiveModal
  ) {
  }

  ngOnInit(): void {
  }

}
