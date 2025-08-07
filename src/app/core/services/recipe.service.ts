import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';

const STORAGE_KEY = 'cookbook_recipes';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [];

  constructor() {
    this.loadFromStorage();
  }

private loadFromStorage(): void {
  if (typeof window !== 'undefined' && localStorage) {
    const data = localStorage.getItem(STORAGE_KEY);
    this.recipes = data ? JSON.parse(data) : [];
  } else {
    this.recipes = [];
  }
}

private saveToStorage(): void {
  if (typeof window !== 'undefined' && localStorage) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.recipes));
  }
}


  getRecipes(): Recipe[] {
    return this.recipes;
  }

  getRecipeById(id: number): Recipe | undefined {
    return this.recipes.find(r => r.id === id);
  }

  addRecipe(recipe: Recipe): void {
    recipe.id = Date.now(); 
    recipe.createdAt = new Date();
    this.recipes.push(recipe);
    this.saveToStorage();
  }

  updateRecipe(updatedRecipe: Recipe): void {
    const index = this.recipes.findIndex(r => r.id === updatedRecipe.id);
    if (index !== -1) {
      this.recipes[index] = updatedRecipe;
      this.saveToStorage();
    }
  }

  deleteRecipe(id: number): void {
    this.recipes = this.recipes.filter(r => r.id !== id);
    this.saveToStorage();
  }
}
