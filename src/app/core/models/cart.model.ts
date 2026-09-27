import { Food } from './food.model';

export interface CartItem {
  id: number;
  food: Food;
  quantity: number;
  special_instructions?: string;
  item_total: number;
}

export interface Cart {
  items: CartItem[];
  sub_total: number;
  delivery_charges: number;
  discount: number;
  total_amount: number;
  coupon_code?: string;
  item_count: number;
}
