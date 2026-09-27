import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../models/review.model';
import { API } from '../constants/api-endpoints';

@Injectable({ providedIn: 'root' })
export class ReviewService {
  constructor(private http: HttpClient) {}

  getFoodReviews(foodId: number): Observable<Review[]> {
    return this.http.get<Review[]>(API.REVIEWS.FOOD_REVIEWS(foodId));
  }

  create(data: Partial<Review>): Observable<Review> {
    return this.http.post<Review>(API.REVIEWS.CREATE, data);
  }

  getAll(): Observable<Review[]> {
    return this.http.get<Review[]>(API.REVIEWS.LIST);
  }

  approve(id: number): Observable<Review> {
    return this.http.patch<Review>(API.REVIEWS.DETAIL(id), { is_approved: true });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(API.REVIEWS.DETAIL(id));
  }
}
