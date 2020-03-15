/** Angular Imports */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

/** rxjs Imports */
import { Observable } from 'rxjs';

/**
 * Accounting service.
 */
@Injectable({
  providedIn: 'root'
})
export class SellerService {

  /**
   * @param {HttpClient} http Http Client to send requests.
   */
  constructor(private http: HttpClient) { }

  
  /**
   * @param {string} provisioningEntryId Provisioning entry ID of provisioning entry.
   * @returns {Observable<any>} Provisioning entry.
   */
  getSellerEntry(sellerId: string): Observable<any> {
    return this.http.get(`/api/Seller/${sellerId}`);
  }
 
  /**
   * @returns {Observable<any>} Loan products data.
   */
  getSellers(): Observable<any> {
    return this.http.get('/seller');
  }



}
