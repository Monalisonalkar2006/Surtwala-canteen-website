import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from '../constants/api-endpoints';

export interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  min_threshold: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  last_updated?: string;
}

@Injectable({ providedIn: 'root' })
export class InventoryService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(API.ADMIN.INVENTORY);
  }

  update(id: number, data: Partial<InventoryItem>): Observable<InventoryItem> {
    return this.http.patch<InventoryItem>(`${API.ADMIN.INVENTORY}${id}/`, data);
  }
}
