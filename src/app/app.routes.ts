import { Routes } from '@angular/router';
import { RecipesListComponent } from './features/recipes/recipes-list/recipes-list.component';
import { RecipeFormComponent } from './features/recipes/recipe-form/recipe-form.component';

export const routes: Routes = [
  { path: '', component: RecipesListComponent },
  { path: 'create', component: RecipeFormComponent },
  { path: 'edit/:id', component: RecipeFormComponent }
];
