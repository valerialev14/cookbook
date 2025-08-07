import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { RecipeService } from '../../../core/services/recipe.service';
import { Recipe } from '../../../core/models/recipe.model';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  imports: [CommonModule, DatePipe, ConfirmDialogComponent],
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent {
  recipes: Recipe[] = [];
  recipeIdToDelete: number | null = null;
  showConfirm = false;

  constructor(private recipeService: RecipeService, private router: Router) {}

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }

  onEdit(id: number): void {
    this.router.navigate(['/edit', id]);
  }

  onCreate(): void {
    this.router.navigate(['/create']);
  }

  confirmDelete(id: number): void {
    this.recipeIdToDelete = id;
    this.showConfirm = true;
  }

  handleConfirm(result: boolean): void {
    if (result && this.recipeIdToDelete !== null) {
      this.recipeService.deleteRecipe(this.recipeIdToDelete);
      this.recipes = this.recipeService.getRecipes();
    }
    this.showConfirm = false;
    this.recipeIdToDelete = null;
  }
}
