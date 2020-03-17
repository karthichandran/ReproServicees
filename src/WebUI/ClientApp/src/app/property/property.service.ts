/** Angular Imports */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PropertyDto } from '../ReProServices-api';

/** rxjs Imports */
import { Observable } from 'rxjs';

/**
 * Accounting service.
 */
@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  /**
   * @param {HttpClient} http Http Client to send requests.
   */
  constructor(private http: HttpClient) { }


  /**
   * @param {string} provisioningEntryId Provisioning entry ID of provisioning entry.
   * @returns {Observable<any>} Provisioning entry.
   */
  getPropertyEntry(propertyId: string): Observable<any> {
    return this.http.get(`/api/Property/${propertyId}`);
  }

  /**
   * @returns {Observable<any>} Loan products data.
   */
  getProperties(): Observable<any> {
    return this.http.get('/api/Property');
  }

  saveProperty(property: PropertyDto): Observable<any> {


    //var test = {
    //  "propertyType": 2,
    //  "addressPremises": "arora",
    //  "addressLine1": "75b",
    //  "addressLine2": "kavery",
    //  "city": "hebbal",
    //  "stateID": 2,
    //  "pinCode": "560024",
    //  "gstTaxCode": 1,
    //  "tdsTaxCode": 1,
    //  "tdsInterestRate": 23,
    //  "lateFeeDay": new Date(),
    //  "propertyID": 0
    //};
    //return this.http.post('/api/Property', { 'propertyDto': test });

    if (property.propertyID > 0)
      return this.http.put('/api/Property/' + property.propertyID, { 'propertyDto': property });
    else {
      property.lateFeeDay = new Date();
      property.propertyID = 0;
      return this.http.post('/api/Property', { 'propertyDto': property });
    }
  }


}
