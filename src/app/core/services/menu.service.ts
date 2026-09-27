import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Food } from '../models/food.model';
import { API } from '../constants/api-endpoints';

@Injectable({ providedIn: 'root' })
export class MenuService {
  constructor(private http: HttpClient) {}

  getAll(params?: { category?: number; search?: string; page?: number }): Observable<{ results: Food[]; count: number }> {
    let p = new HttpParams();
    if (params?.category) p = p.set('category', params.category);
    if (params?.search) p = p.set('search', params.search);
    if (params?.page) p = p.set('page', params.page);
    return this.http.get<{ results: Food[]; count: number }>(API.MENU.LIST, { params: p });
  }

  getById(id: number): Observable<Food> {
    return this.http.get<Food>(API.MENU.DETAIL(id));
  }

  getFeatured(): Observable<Food[]> {
    return this.http.get<Food[]>(API.MENU.FEATURED);
  }

  search(query: string): Observable<Food[]> {
    return this.http.get<Food[]>(API.MENU.SEARCH, { params: { q: query } });
  }

  create(data: FormData): Observable<Food> {
    return this.http.post<Food>(API.MENU.LIST, data);
  }

  update(id: number, data: FormData): Observable<Food> {
    return this.http.patch<Food>(API.MENU.DETAIL(id), data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(API.MENU.DETAIL(id));
  }
}
