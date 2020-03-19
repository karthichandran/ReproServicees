import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { MatTabChangeEvent} from '@angular/material/tabs';
import { fuseAnimations } from '@fuse/animations';
import { IRoleReportingTo } from '../models/RoleReportingTo';
import * as Xlsx from 'xlsx';
import { PropertyService } from '../property/property.service';
import { StatesService } from '../shared/services/states.service';
import { StateDto } from '../ReProServices-api';
import {SellerService } from '../seller/seller.service';

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
  states: any[] = [];
  sellerList: any[] = [];
  rowData: any[] = [];
  columnDef: any[] = [];
  sellerData: any[] = [];
  sellerColumnDef: any[] = [];
  gstCode: any[] = [{ 'id': 1, 'description': '15%' }];
  tdsCode: any[] = [{ 'id': 1, 'description': '15%' }];
  typeOfProperty: any[] = [{ 'id': 1, 'description': 'Land' }, { 'id': 2, 'description': 'Building' }];

  isRadioButtonTouched: boolean = true;

  constructor(private _formBuilder: FormBuilder, private propertyService: PropertyService, private statesService: StatesService,private sellerService:SellerService) {

  }

  ngOnInit(): void {
    // Reactive Form
    this.form = this._formBuilder.group({
      propertyID: [''],
      propertyType: ['', Validators.required],
      addressPremises: [''],
      addressLine1: [''],
      addressLine2: [''],
      city: ['', Validators.required],
      stateID: ['', Validators.required],
      pinCode: ['', Validators.required],
      gstTaxCode: ['', Validators.required],
      tdsTaxCode: ['', Validators.required],
      tdsInterestRate: ['', Validators.required],
      lateFeeDay: ['', Validators.required],     
      share: ['']
    });

    this.columnDef = [{ 'header': 'Name', 'field': 'addressPremises', 'type': 'label' },
      { 'header': 'Premises', 'field': 'addressPremises', 'type': 'label' },
      { 'header': 'GST Rate', 'field': 'gstTaxCode', 'type': 'label' },
      { 'header': 'TDS Rate', 'field': 'tdsTaxCode', 'type': 'label' }
    
    ];

    this.sellerColumnDef = [{ 'header': 'Name', 'field': 'sellerName', 'type': 'selection','options':this.sellerList },
    { 'header': 'Share %', 'field': 'share', 'type': 'textbox' }  

    ];
    this.getAllStates();
    this.getAllSellers();       
  }

  clear() {
    this.form.reset();
  }

  save(): void {
    this.validateSharePercentage();
    if (this.form.valid) {
      let model = this.form.value;
      this.propertyService.saveProperty(model).subscribe((response) => {
        this.clear();
      });
    }
  }

  validateSharePercentage() {
    let share: number=0;
    _.forEach(this.sellerData, function (item) {
      share += parseInt(item.share);
    });

  }
  /**
     * On destroy
     */
  ngOnDestroy(): void {
  }

  selectedRows(eve) {   
    this.form.patchValue(eve.selected[0]);
    var ele = document.getElementsByClassName('mat-tab-label') as HTMLCollectionOf<HTMLElement>;
    ele[0].click();
  }  
   
  addNewSeller() {
  }

  getAllSellers() {
    this.sellerService.getSellers().subscribe((response) => {
      this.sellerList = _.map(response, function (item) {
        return{ 'id': item.sellerID, 'description': item.sellerName };
      })

      this.sellerColumnDef[0].options = this.sellerList;
    });
  }

  getAllProperties() {
    this.propertyService.getProperties().subscribe((response) => {
      this.rowData = response;
    });
  }

  getAllStates() {
    this.statesService.getStates().subscribe((response) => {
      this.states = response;
    });
  }

  addCoSeller() {
    this.sellerData = [{ 'sellerName': '', 'share': '' }, ...this.sellerData];

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

  tabChanged(eve: MatTabChangeEvent) {
    //console.log('tabChangeEvent => ', eve);
    //console.log('index => ', eve.index);
    if (eve.index == 1) {
      this.getAllProperties();
    }
  }
}
