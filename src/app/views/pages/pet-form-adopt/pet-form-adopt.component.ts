import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, Validators} from "@angular/forms";
import {USER_PROFILE} from "../../../core/utils/constant";
import {OrdersService} from "../../theme/service/orders.service";
import {finalize} from "rxjs/operators";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-pet-form-adopt',
  templateUrl: './pet-form-adopt.component.html',
  styleUrls: ['./pet-form-adopt.component.css']
})
export class PetFormAdoptComponent implements OnInit {
  petItem: any = null;
  inputForm = this.fb.group({
    reason: ['', Validators.required],
    conditions: ['', Validators.required],
    sentDate: ['', Validators.required],
  })

  constructor(
    public activeModal: NgbActiveModal,
    private toastrService: ToastrService,
    private fb: FormBuilder,
    private ordersService: OrdersService,
    private spinnerService: NgxSpinnerService,
  ) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.inputForm.get('sentDate').setValue(new Date());
  }

  sentAdopt() {
    let data = this.convertToSave();
    this.spinnerService.show();
    this.ordersService.insertOrder(data).pipe(finalize(() => {
      this.spinnerService.hide();
    })).subscribe(res => {
      if (res.body.key === 'SUCCESS') {
        this.toastrService.success('Gửi đơn thành công');
        this.closed();
      }
    })
  }

  convertToSave() {
    let userInfo: any = JSON.parse(localStorage.getItem(USER_PROFILE));
    let data = {
      petId: this.petItem.petId,
      reason: this.inputForm.get('reason').value,
      conditions: this.inputForm.get('reason').value,
      status: 0,
      sentDate: this.inputForm.get('sentDate').value,
      userId: userInfo.id
    }
    return data;
  }

  closed() {
    this.activeModal.close();
  }

}
