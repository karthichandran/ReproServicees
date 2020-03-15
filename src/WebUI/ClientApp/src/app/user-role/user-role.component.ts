import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { IRoleReportingTo} from '../models/RoleReportingTo';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss'],
  animations: fuseAnimations
})
export class UserRoleComponent implements OnInit, OnDestroy {
  form: FormGroup;
  reportingToDDL: IRoleReportingTo[] = [{ id: 1, description: 'Admin' }, { id: 2, description: 'MD' }, { id: 3, description: 'Manager' }, { id: 4, description: 'Ceo' }];
  rowData: any[] = [];
  columnDef: any[] = [];

  constructor(private _formBuilder: FormBuilder) {
    
  }

  ngOnInit(): void {
    // Reactive Form
    this.form = this._formBuilder.group({   
     
      reportingTo: ['', Validators.required],
      role: ['', Validators.required]
    });
    this.columnDef = [{ 'header': 'Name', 'field': 'name', 'type': 'textbox' },
      { 'header': 'Last Name', 'field': 'lastName', 'type': 'label' },
      { 'header': 'Note', 'field': 'notes', 'type': 'checkbox','checkall':true },
      { 'header': 'Seletions', 'field': 'id', 'type': 'selection', 'options': this.reportingToDDL }];

    this.rowData = [
      {
        'id': '1',
        'name': 'Abbott',
        'lastName': 'Keitch',
        'avatar': 'assets/images/avatars/Abbott.jpg',
        'nickname': 'Royalguard',
        'company': 'Saois',
        'jobTitle': 'Digital Archivist',
        'email': 'abbott@withinpixels.com',
        'phone': '+1-202-555-0175',
        'address': '933 8th Street Stamford, CT 06902',
        'birthday': '',
        'notes': true
      },
      {
        'id': '2',
        'name': 'Arnold',
        'lastName': 'Matlock',
        'avatar': 'assets/images/avatars/Arnold.jpg',
        'nickname': 'Wanderer',
        'company': 'Laotcone',
        'jobTitle': 'Graphic Artist',
        'email': 'arnold@withinpixels.com',
        'phone': '+1-202-555-0141',
        'address': '906 Valley Road Michigan City, IN 46360',
        'birthday': '',
        'notes': false
      }    
     
    ];
  }

  clear() {
    this.form.reset();
  }

  save() {
   
    if (this.form.valid) {
      let model = this.form.value;
    }
  }

  /**
     * On destroy
     */
  ngOnDestroy(): void {
  }
}
