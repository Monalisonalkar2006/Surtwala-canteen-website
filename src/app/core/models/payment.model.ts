export interface Payment {
  id: number;
  order_id: number;
  amount: number;
  method: 'cash' | 'upi' | 'card' | 'wallet';
  status: 'pending' | 'success' | 'failed' | 'refunded';
  transaction_id?: string;
  created_at: string;
}
