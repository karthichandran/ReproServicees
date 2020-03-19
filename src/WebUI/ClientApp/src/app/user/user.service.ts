/** Angular Imports */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SellerDto } from '../ReProServices-api';
/** rxjs Imports */
import { Observable } from 'rxjs';

/**
 * Accounting service.
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {

  /**
   * @param {HttpClient} http Http Client to send requests.
   */
  constructor(private http: HttpClient) { }


  /**
   * @param {string} provisioningEntryId Provisioning entry ID of provisioning entry.
   * @returns {Observable<any>} Provisioning entry.
   */
  getUserEntry(sellerId: string): Observable<any> {
    return this.http.get(`/api/user/${sellerId}`);
  }

  /**
   * @returns {Observable<any>} Loan products data.
   */
  getUsers(): Observable<any> {
    return this.http.get('/api/user');
  }

  saveSeller(seller: SellerDto): Observable<any> {

    if (seller.sellerID > 0)
      return this.http.put('/api/Seller/' + seller.sellerID, { 'sellerDto': seller });
    else
      return this.http.post('/api/Seller', { 'sellerDto': seller });
  }


}
