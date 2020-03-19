import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, ValidatorFn, AbstractControl} from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { IRoleReportingTo } from '../models/RoleReportingTo';
import { SellerService } from './seller.service';
import { StatesService} from '../shared/services/states.service'
import * as Xlsx from 'xlsx';
import * as moment from 'moment';
import {StateDto } from '../ReProServices-api';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss'],
  animations: fuseAnimations
})
export class SellerComponent implements OnInit, OnDestroy {
  form: FormGroup;
  sellers: any[] = [];
  states: any[] = [];
  rowData: any[] = [];
  columnDef: any[] = [];

  isRadioButtonTouched: boolean = true;

  constructor(private _formBuilder: FormBuilder, private sellerService: SellerService, private statesService: StatesService) {

  }

  ngOnInit(): void {
    // Reactive Form
    this.form = this._formBuilder.group({
      sellerID:[''],
      sellerName: ['', Validators.required],
      addressPremises: ['', Validators.required],
      adressLine1: ['', Validators.required],
      addressLine2: [''],
      city: ['', Validators.required],
      stateID: ['', Validators.required],
      pinCode: ['', Validators.required],
      status: ['resident', Validators.required],     
      pan: ['', [Validators.required,this.panValidator()]],
      emailID: [''],
      mobileNo: ['']
     
    });
    
    this.columnDef = [{ 'header': 'Name', 'field': 'sellerName', 'type': 'label' },
      { 'header': 'Premises', 'field': 'addressPremises', 'type': 'label' },
      { 'header': 'Email', 'field': 'emailID', 'type': 'label' },    
    { 'header': 'Pan', 'field': 'pan', 'type': 'label' },
      { 'header': 'Mobile', 'field': 'mobileNo', 'type': 'label' }
    ];

    this.getAllStates();
  }
  
  save() {

    if (this.form.valid) {
      let model = this.form.value;
      this.sellerService.saveSeller(model).subscribe((response) => {
        this.clear();
      });
    }
  }

  clear() {
    this.form.reset();
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

  download() {
    const ws: Xlsx.WorkSheet = Xlsx.utils.json_to_sheet(this.rowData);
    const wb: Xlsx.WorkBook = Xlsx.utils.book_new();
    Xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
    Xlsx.writeFile(wb, '.xls');
  }

  showSeller(model:any) {
    this.form.patchValue(model);
  }

  getAllSellers() {
    this.sellerService.getSellers().subscribe((response) => {
      this.rowData = response;
    });
  }

  getAllStates() {
    this.statesService.getStates().subscribe((response) => {
      this.states = response;
    });
  }

  addCoSeller() {
    var selle: any = [];
    this.sellerService.getSellerEntry("1").subscribe((response) => {
      selle = response;
    });

    if (this.form.valid) {
      this.sellers = [this.form.value, ...this.sellers];
    
      this.form.reset();

    }
    else {
      if (this.form.get("status").value)
        this.isRadioButtonTouched = true;
      else
        this.isRadioButtonTouched = false;

      Object.keys(this.form.controls).forEach(field => { 
        const control = this.form.get(field);          
        control.markAsTouched({ onlySelf: true });
      });
      //this.form.markAsTouched({ onlySelf: true });
     // this.form.markAllAsTouched();
    }
  }

  panValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      // if input field is empty return as valid else test
      const ret = (control.value !== '') ? new RegExp('^[A-Za-z]{5}[0-9]{4}[A-Za-z]$').test(control.value) : true;
      return !ret ? { 'invalidNumber': { value: control.value } } : null;
    };
  }


  tabChanged(eve: MatTabChangeEvent) {
    //console.log('tabChangeEvent => ', eve);
    //console.log('index => ', eve.index);
    if (eve.index == 1) {
      this.getAllSellers();
    }
  }
}
