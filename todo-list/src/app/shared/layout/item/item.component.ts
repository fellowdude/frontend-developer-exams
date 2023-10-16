import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IItem } from '../../interfaces/item.interface';
import { EAction } from '../../enums/action.enum';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {
  actions: typeof EAction = EAction;
  showDescription: boolean = false;
  @Input() item!: IItem;
  @Output() change: EventEmitter<{type: EAction, item: IItem}> = new EventEmitter<any>();

  changeItem(event: any, action: EAction): void {
    console.log(this.item);
    this.change.emit({
      type: action,
      item: this.item
    });
  }

  toggleDescription(event: any): void {
    this.showDescription = !this.showDescription
    event.preventDefault();
  }
}
