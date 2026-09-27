export interface Category {
  id: number;
  name: string;
  description?: string;
  image: string;
  icon?: string;
  item_count?: number;
  is_active: boolean;
  sort_order?: number;
}
