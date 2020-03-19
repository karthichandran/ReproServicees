/** Angular Imports */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CustomerDto } from './CustomerDto';
import { CustomerPropertyDto } from './CustomerPropertyDto';
/** rxjs Imports */
import { Observable } from 'rxjs';

/**
 * Accounting service.
 */
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  /**
   * @param {HttpClient} http Http Client to send requests.
   */
  constructor(private http: HttpClient) { }


  /**
   * @param {string} provisioningEntryId Provisioning entry ID of provisioning entry.
   * @returns {Observable<any>} Provisioning entry.
   */
  getClientEntry(sellerId: string): Observable<any> {
    return this.http.get(`/Client/${sellerId}`);
  }

  /**
   * @returns {Observable<any>} Loan products data.
   */
  getSellers(): Observable<any> {
    return this.http.get('/Client');
  }



}
