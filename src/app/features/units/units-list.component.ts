import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Unit } from '../../core/models/unit.model';
import { UnitService } from '../../core/services/unit.service';


@Component({
  selector: 'app-units-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './units-list.component.html',
  styleUrls: ['./units-list.component.scss']
})
export class UnitsListComponent {
  units: Unit[] = [];
  newUnit = '';

  constructor(private unitService: UnitService) {
    this.units = this.unitService.getUnits();
  }

  addUnit(): void {
    const trimmed = this.newUnit.trim();
    if (trimmed && !this.units.some(u => u.name === trimmed)) {
      this.unitService.addUnit(trimmed);
      this.units = this.unitService.getUnits(); // обновляем список
      this.newUnit = '';
    }
  }
}
