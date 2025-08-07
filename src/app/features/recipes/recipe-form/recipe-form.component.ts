import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../../core/services/recipe.service';
import { Recipe } from '../../../core/models/recipe.model';
import { CommonModule } from '@angular/common';
import { UnitService } from '../../../core/services/unit.service';
import { Unit } from '../../../core/models/unit.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})

export class RecipeFormComponent {
  units: Unit[] = [];
  
  recipe: Recipe = {
    id: 0,
    title: '',
    description: '',
    ingredients: [],
    createdAt: new Date()
  };

  isEditMode = false;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private unitService: UnitService
  ) {
    this.units = this.unitService.getUnits(); 
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      const existing = this.recipeService.getRecipeById(+idParam);
      if (existing) this.recipe = { ...existing };
    }
  }

  save(): void {
    if (this.isEditMode) {
      this.recipeService.updateRecipe(this.recipe);
    } else {
      this.recipe.id = Date.now();
      this.recipe.createdAt = new Date();
      this.recipeService.addRecipe(this.recipe);
    }

    this.router.navigate(['/']);
  }

  addIngredient(): void {
    this.recipe.ingredients.push({ name: '', amount: 0, unit: '' });
  }

  removeIngredient(index: number): void {
    this.recipe.ingredients.splice(index, 1);
  }
  imagePreview: string | null = null;

onImageSelected(event: Event): void {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      this.recipe.imageUrl = this.imagePreview;
    };
    reader.readAsDataURL(file);
  }
}

}
