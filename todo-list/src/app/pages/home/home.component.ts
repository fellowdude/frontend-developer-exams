import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
  tempItem: IItem | null = null;
  requestDone: boolean = false;
  editingItem: boolean = false;
  deletedItem: boolean = false;
  itemList: Array<IItem> = [];
  itemForm!: FormGroup;
  actions: typeof EAction = EAction;
  filterType: typeof EFilterType = EFilterType;
  currentFilterType: EFilterType = this.filterType.all;
  searchObj: any = null;

  constructor(private todoService: TodoService){}

  ngOnInit(): void {
    this.itemForm = new FormGroup({
      title: new FormControl(null, [Validators.required, this.validateDuplication().bind(this), this.validateOnlySpacesEmpty(), Validators.pattern(/^[A-Za-z\s]*$/)]),
      description: new FormControl(null),
      completed: new FormControl(false),
    })
    this.listItems();
  }

  listItems(): void {
    this.todoService.getTodos(this.searchObj).subscribe({
      next: (response) => {
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
    if(this.itemForm.valid){
      if(this.editingItem){
        this.updateItem(this.itemForm.value);
      } else {
        this.todoService.addTodo(this.itemForm.value).subscribe({
          next: (response) => {
            this.itemForm.reset();
            this.itemForm.get('completed')?.setValue(false);
            this.listItems();
            this.showTimedMessage();
          }
        })
      }
    }
  }

  updateItem(item: IItem): void {
    this.todoService.updateTodo(item).subscribe({
      next: (response) => {
        this.itemForm.removeControl('id');
        this.itemForm.reset();
        this.itemForm.get('completed')?.setValue(false);
        this.listItems();
        if(this.editingItem)
          this.showTimedMessage();
      }
    })
  }

  deleteItem(itemId: number): void {

    this.todoService.deleteTodo(itemId).subscribe({
      next: (response) => {
        this.listItems();
        this.deletedItem = true;
        this.showTimedMessage();
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
        this.tempItem = {... event.item};
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

  cancel(): void {
    this.editingItem = false;
    this.tempItem = null;
    this.itemForm.reset();
    this.itemForm.removeControl('id');
  }

  validateDuplication(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let findItem = this.itemList.find((elem)=>{
        if(this.editingItem){
          return elem?.title?.toLowerCase().trim() === control?.value?.toLowerCase().trim() && this.tempItem?.title.toLowerCase().trim() !==  control?.value?.toLowerCase().trim();
        }
        else {
          return elem?.title?.toLowerCase().trim() === control?.value?.toLowerCase().trim();
        }
      })
      return (findItem? {'titleDuplicated': true}: null)
    }
  }

  validateOnlySpacesEmpty(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      console.log(control?.value?.trim() === '')
      return (control?.value?.trim() === ''? {'onlySpaces': true}: null)
    }
  }

  showTimedMessage(): void {
    this.requestDone = true;
    setTimeout(()=>{
      this.requestDone = false;
      this.deletedItem = false;
      this.editingItem = false;
    }, 2000)
  }
}
