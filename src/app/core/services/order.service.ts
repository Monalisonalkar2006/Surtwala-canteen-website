import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order, OrderStatus } from '../models/order.model';
import { API } from '../constants/api-endpoints';

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private http: HttpClient) {}

  getMyOrders(page = 1): Observable<{ results: Order[]; count: number }> {
    return this.http.get<{ results: Order[]; count: number }>(API.ORDERS.LIST, { params: { page } });
  }

  getAll(params?: { status?: string; page?: number }): Observable<{ results: Order[]; count: number }> {
    let p = new HttpParams();
    if (params?.status) p = p.set('status', params.status);
    if (params?.page) p = p.set('page', params.page);
    return this.http.get<{ results: Order[]; count: number }>(API.ORDERS.LIST, { params: p });
  }

  getById(id: number): Observable<Order> {
    return this.http.get<Order>(API.ORDERS.DETAIL(id));
  }

  create(data: any): Observable<Order> {
    return this.http.post<Order>(API.ORDERS.CREATE, data);
  }

  updateStatus(id: number, status: OrderStatus): Observable<Order> {
    return this.http.patch<Order>(API.ORDERS.UPDATE_STATUS(id), { status });
  }

  cancel(id: number): Observable<Order> {
    return this.http.post<Order>(API.ORDERS.CANCEL(id), {});
  }
}
