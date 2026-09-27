import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { API } from '../constants/api-endpoints';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(API.CATEGORIES.LIST);
  }

  getById(id: number): Observable<Category> {
    return this.http.get<Category>(API.CATEGORIES.DETAIL(id));
  }

  create(data: Partial<Category>): Observable<Category> {
    return this.http.post<Category>(API.CATEGORIES.LIST, data);
  }

  update(id: number, data: Partial<Category>): Observable<Category> {
    return this.http.patch<Category>(API.CATEGORIES.DETAIL(id), data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(API.CATEGORIES.DETAIL(id));
  }
}
