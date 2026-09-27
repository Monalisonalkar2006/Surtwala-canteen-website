export interface Review {
  id: number;
  food_id: number;
  food_name?: string;
  user_id: number;
  user_name: string;
  user_avatar?: string;
  rating: number;
  comment: string;
  is_approved: boolean;
  created_at: string;
}
