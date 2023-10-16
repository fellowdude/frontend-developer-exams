import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EAction } from 'src/app/shared/enums/action.enum';
import { EFilterType } from 'src/app/shared/enums/filter-type.enum';
import { IItem } from 'src/app/shared/interfaces/item.interface';
import { TodoService } from 'src/app/shared/services/api/todo/todo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  editingItem: boolean = false;
  itemList: Array<IItem> = [];
  itemForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    description: new FormControl(null),
    completed: new FormControl(false),
  })
  actions: typeof EAction = EAction;
  filterType: typeof EFilterType = EFilterType;
  currentFilterType: EFilterType = this.filterType.all;
  searchObj: any = null;

  constructor(private todoService: TodoService){}

  ngOnInit(): void {
    this.listItems();
  }

  listItems(): void {
    this.todoService.getTodos(this.searchObj).subscribe({
      next: (response) => {
        console.log(response);
        this.itemList = response;
      }
    })
  }

  changeFilter(filter: EFilterType): void {
    this.currentFilterType = filter;
    switch(filter){
      case this.filterType.active: {
        this.searchObj = { completed: false }
        break;
      }
      case this.filterType.completed: {
        this.searchObj = { completed: true }
        break;
      }
      default: {
        this.searchObj = null;
      }
    }

    this.listItems();
  }

  sendForm(): void {
    if(this.editingItem){
      this.updateItem(this.itemForm.value);
    } else {
      console.log(this.itemForm.value);
      this.todoService.addTodo(this.itemForm.value).subscribe({
        next: (response) => {
          this.itemForm.reset();
          this.itemForm.get('completed')?.setValue(false);
          this.listItems();
        }
      })
    }
  }

  updateItem(item: IItem): void {
    console.log(item);
    this.todoService.updateTodo(item).subscribe({
      next: (response) => {
        this.itemForm.removeControl('id');
        this.itemForm.reset();
        this.itemForm.get('completed')?.setValue(false);
        this.listItems();
      }
    })
  }

  deleteItem(itemId: number): void {
    this.todoService.deleteTodo(itemId).subscribe({
      next: (response) => {
        this.listItems();
      }
    })
  }

  itemChange(event: any): void {
    switch(event.type){
      case this.actions.state: {
        this.updateItem(event.item);
        break;
      }
      case this.actions.edit: {
        this.editingItem = true;
        this.itemForm.addControl('id', new FormControl(null, [Validators.required]));
        this.itemForm.patchValue(event.item);
        break;
      }
      case this.actions.delete: {
        this.deleteItem(event.item.id);
        break;
      }
    }
  }

  cancelEdit(): void {
    this.editingItem = false;
    this.itemForm.reset();
  }
}
