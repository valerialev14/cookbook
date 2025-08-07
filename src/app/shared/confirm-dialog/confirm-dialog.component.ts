import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  @Input() message: string = 'Вы уверены?';
  @Output() confirm = new EventEmitter<boolean>();

  yes() {
    this.confirm.emit(true);
  }

  no() {
    this.confirm.emit(false);
  }
}
