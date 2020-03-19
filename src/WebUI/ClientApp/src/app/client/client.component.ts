import { Component, OnDestroy, OnInit, ViewChildren, QueryList, ElementRef ,ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective,ValidatorFn,AbstractControl, FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { IRoleReportingTo } from '../models/RoleReportingTo';
import * as Xlsx from 'xlsx';
import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { CustomerDto, CustomerShareList} from './CustomerDto';
import { CustomerPropertyDto } from './CustomerPropertyDto';
import { PropertyService } from '../property/property.service';
import { StatesService } from '../shared/services/states.service';
import * as _ from 'lodash';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  animations: fuseAnimations
})
export class ClientComponent implements OnInit, OnDestroy {
  customerform: FormGroup;  
  propertyForm: FormGroup;
  shareForm: FormGroup;

  clients: any[] = [];
  sellers: any[] = [];
  states: any[] = [];
  form16Options: any[] = [{ 'id': 1, 'description': 'Yes' }, { 'id': 2, 'description': 'No' }];
  rowData: any[] = [];
  customerData: any = [];
  customerColumnDef: any[] = [];
  declaration=new FormControl();
  isRadioButtonTouched: boolean = true;
  showAddressClearBtn: boolean = false;
  propertyList: any[] = [];

  @ViewChildren(FusePerfectScrollbarDirective)
  fuseScrollbarDirectives: QueryList<FusePerfectScrollbarDirective>;


  constructor(private _formBuilder: FormBuilder , private propertyService: PropertyService, private statesService: StatesService) {

  }
 
  ngOnInit(): void {
    // Reactive Form
    this.customerform = this._formBuilder.group({
      customerID:[''],     
      name: ['', Validators.required],
      addressPremises: ['', Validators.required],
      adressLine1: ['', Validators.required],
      addressLine2: [''],
      city: ['', Validators.required],
      stateID_FK: ['', Validators.required],
      pinCode: ['', Validators.required],
      pan: ['',[ Validators.required, this.panValidator()]],
      emailID: ['',Validators.email],
      mobileNo: [''],
      dateOfBirth: ['', Validators.required],
      isTracesRegistered: [''],
      traceLogin: [''],
      tracesPassword: [''],
      share: [''],
      form16b:['']
    });
    // Vertical Stepper form stepper
    this.propertyForm = this._formBuilder.group({
      propertyID:[''],
      promises: ['', Validators.required],
      address1: ['', Validators.required],
      address2: [''],
      city: ['', Validators.required],
      stateID: ['', Validators.required],
      pinCode: ['', Validators.required],
      unitNo: ['', Validators.required],
      paymentMethodID: ['', Validators.required],
      gSTRate: ['', Validators.required],
      tDSRate: ['', Validators.required],
      totalUnitCost: ['', Validators.required],
      agreementDate: ['', Validators.required],
      tdsCollected: ['', Validators.required]
    });

    this.shareForm = this._formBuilder.group({
      declarationDate: [''],
      address: ['', Validators.required]
    });

    this.customerColumnDef = [{ 'header': 'Name', 'field': 'name', 'type': 'label' },
      { 'header': 'Share %', 'field': 'share', 'type': 'textbox' },
     { 'header': 'I/We want seller to download From 16B', 'field': 'form16b', 'type': 'selection','options':this.form16Options }

    ];
    

    this.getAllProperties();
    this.getAllStates();
  }

  clear() {
    this.customerform.reset();
  }

  
  /**
     * On destroy
     */
  ngOnDestroy(): void {
  }

  //selectedRows(eve) {
  //   this.customerform.patchValue(eve.selected[0]);
  //}

  download() {
    const ws: Xlsx.WorkSheet = Xlsx.utils.json_to_sheet(this.rowData);
    const wb: Xlsx.WorkBook = Xlsx.utils.book_new();
    Xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
    Xlsx.writeFile(wb, '.xls');
  }

  showClient(model: any) {
    this.customerform.patchValue(model);
  }
  addCoClient() {
        
    var invalidList = _.filter(this.customerform.controls, function ( item) {
      return item.validator != null && item.value=="";
    })

    if (this.customerform.valid && invalidList.length==0) {
      this.showAddressClearBtn = true;
      this.clients.push( _.clone(this.customerform.value));
     // this.customerData = [{ 'name': 'test', 'share': '10', 'form16b': 1 }, { 'name': 'test', 'share': '10', 'form16b': 1 }];
      this.fillCustomerShareGrid(this.customerform.value);

     let client = this.customerform.value;
      client.name = '';
      client.addressPremises = '';
      client.mobileNo = '';
      client.emailID = '';
      client.pan = '';
      client.dateOfBirth = '';
     this.customerform.patchValue(client);

      //To Reset control validators
      var formcontrl = this.customerform;
      _.forEach(['name', 'addressPremises', 'mobileNo', 'emailID', 'pan', 'dateOfBirth'], function (item) {
        let control = formcontrl.get(item);
        control.setErrors(null);
      });      
  
    }
    else {
      let client = this.customerform.value;
      this.customerform.reset();
      this.customerform.patchValue(client);
      //this.customerform.markAllAsTouched();
      //Object.keys(this.customerform.controls).forEach(field => {
      //  const control = this.customerform.get(field);
      //  control.markAsTouched({ onlySelf: true });
      //});
      //this.form.markAsTouched({ onlySelf: true });
      // this.form.markAllAsTouched();
    }
  }

  finishVerticalStepper(): void {
    alert('You have finished the vertical stepper!');
  }

   panValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    // if input field is empty return as valid else test
    const ret = (control.value !== '') ? new RegExp('^[A-Za-z]{5}[0-9]{4}[A-Za-z]$').test(control.value) : true;
    return !ret ? { 'invalidNumber': { value: control.value } } : null;
  };
   }

  saveCustomer(): void {
    if (this.customerform.valid) {
      let model = this.customerform.value;
      let startDate = new Date(this.customerform.value);
    }
  }

  saveProperty(): void {
  }

  submitCustomer():void {
    let vatest = "";
  }

  clearAddress(): void {
    this.showAddressClearBtn = false;
    let client = this.customerform.value;
    this.customerform.reset();
    client.adressLine1 = '';
    client.addressLine2 = '';
    client.city = '';
    client.stateID_FK = '';
    client.pinCode = '';   
    this.customerform.patchValue(client);
    Object.keys(this.customerform.controls).forEach(field => {
      const control = this.customerform.get(field);
      control.setErrors(null);
    });

  }

  getAllProperties() {
    this.propertyService.getProperties().subscribe((response) => {
      this.propertyList = response;
    });
  }

  getAllStates() {
    this.statesService.getStates().subscribe((response) => {
      this.states = response;
    });
  }

  fillCustomerShareGrid(cust: any) {
    let newCustomer = {
      name : cust.name,
      customerID : cust.name,
      share :cust.share,
      form16b : cust.form16b,
    }

    this.customerData.push(newCustomer);
    this.customerData = [...this.customerData];
  }
}
