export interface Food {
  id: number;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  category_id: number;
  category_name?: string;
  image: string;
  is_available: boolean;
  is_veg: boolean;
  is_bestseller?: boolean;
  is_featured?: boolean;
  rating?: number;
  review_count?: number;
  prep_time?: number;
  calories?: number;
  tags?: string[];
  created_at?: string;
}
