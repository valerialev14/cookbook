export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

export interface Recipe {
  id: number;
  title: string;
  description: string;
  ingredients: Ingredient[];
  imageUrl?: string;    
  createdAt: Date;
}
