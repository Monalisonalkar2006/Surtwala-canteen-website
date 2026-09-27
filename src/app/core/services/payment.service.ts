import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment } from '../models/payment.model';
import { API } from '../constants/api-endpoints';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  constructor(private http: HttpClient) {}

  initiate(data: { order_id: number; method: string; amount: number }): Observable<Payment> {
    return this.http.post<Payment>(API.PAYMENT.INITIATE, data);
  }

  verify(data: { transaction_id: string; order_id: number }): Observable<Payment> {
    return this.http.post<Payment>(API.PAYMENT.VERIFY, data);
  }
}
