import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { IRoleReportingTo } from '../models/RoleReportingTo';
import * as Xlsx from 'xlsx';

import * as _ from 'lodash';

@Component({
  selector: 'app-seller',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss'],
  animations: fuseAnimations
})
export class PropertyComponent implements OnInit, OnDestroy {
  form: FormGroup;
  sellers: any[] = [];
  states: any[] = [{ 'id': 1, 'description': 'karnataka' }];
  sellerList: any[] = [{ 'id': 1, 'description': 'seller 1' }, { 'id': 2, 'description': 'seller 2' }, { 'id': 3, 'description': 'seller 3' }];
  rowData: any[] = [];
  columnDef: any[] = [];

  isRadioButtonTouched: boolean = true;

  constructor(private _formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    // Reactive Form
    this.form = this._formBuilder.group({
     
      propertyType: ['', Validators.required],
      promises: [''],
      flat: [''],
      road: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pinCode: ['', Validators.required],
      gstRate: ['', Validators.required],
      tdsRate: ['', Validators.required],
      tdsInterestRate: ['', Validators.required],
      lateFee: ['', Validators.required],     
      share: ['']
    });

    this.columnDef = [{ 'header': 'Name', 'field': 'name', 'type': 'selection', 'options': this.sellerList },
      { 'header': 'Share %', 'field': 'share', 'type': 'textbox' }    
    ];

    this.rowData = [
      //{
      //  'id': '1',
      //  'name': 1,
      // 'share':'10'
      //}
     

    ];
  }

  clear() {
    this.form.reset();
  }

  save() {

    if (this.form.valid) {
      let model = this.form.value;
      let startDate = new Date(this.form.value);
    }
  }

  /**
     * On destroy
     */
  ngOnDestroy(): void {
  }

  selectedRows(eve) {
    eve.selected[0]['gender'] = 1;
    eve.selected[0]['birthDate'] = new Date();
    eve.selected[0]['startDate'] = new Date();
    eve.selected[0]['toDate'] = new Date();
    this.form.patchValue(eve.selected[0]);

    var ele = document.getElementsByClassName('mat-tab-label') as HTMLCollectionOf<HTMLElement>;
    ele[0].click();

  }  

 
  addNewSeller() {
  }

  addCoSeller() {
    this.rowData = [{ 'name': '', 'share': '' }, ...this.rowData];

    //if (this.form.valid) {
    //  this.sellers = [this.form.value, ...this.sellers];

    //  this.form.reset();

    //}
    //else {
    //  if (this.form.get("status").value)
    //    this.isRadioButtonTouched = true;
    //  else
    //    this.isRadioButtonTouched = false;

    //  Object.keys(this.form.controls).forEach(field => {
    //    const control = this.form.get(field);
    //    control.markAsTouched({ onlySelf: true });
    //  });
    //  //this.form.markAsTouched({ onlySelf: true });
    //  // this.form.markAllAsTouched();
    //}
  }


}
