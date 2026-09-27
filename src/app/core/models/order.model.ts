export type OrderStatus = 'new' | 'preparing' | 'ready' | 'completed' | 'cancelled';

export interface OrderItem {
  id: number;
  food_id: number;
  food_name: string;
  food_image?: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Order {
  id: number;
  order_number: string;
  customer_id: number;
  customer_name?: string;
  customer_phone?: string;
  items: OrderItem[];
  status: OrderStatus;
  payment_method: string;
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  sub_total: number;
  delivery_charges: number;
  discount: number;
  total_amount: number;
  delivery_address?: string;
  special_instructions?: string;
  created_at: string;
  updated_at?: string;
  estimated_time?: number;
}
