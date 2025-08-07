import { Injectable } from '@angular/core';
import { Unit } from '../models/unit.model';

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  private units: Unit[] = [
    { id: 1, name: 'г' },
    { id: 2, name: 'кг' },
    { id: 3, name: 'мл' },
    { id: 4, name: 'л' },
    { id: 5, name: 'шт' },
    { id: 6, name: 'ч.л' },
    { id: 7, name: 'ст.л' },
  ];

  getUnits(): Unit[] {
    return this.units;
  }

  addUnit(name: string): void {
    const trimmed = name.trim();
    if (!trimmed) return;

    const exists = this.units.some(u => u.name === trimmed);
    if (!exists) {
      const newUnit: Unit = {
        id: this.units.length ? Math.max(...this.units.map(u => u.id)) + 1 : 1,
        name: trimmed
      };
      this.units.push(newUnit);
    }
  }
}
