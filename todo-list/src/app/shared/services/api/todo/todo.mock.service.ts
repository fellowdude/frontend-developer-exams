import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IItem } from 'src/app/shared/interfaces/item.interface';
import { ITodoService } from 'src/app/shared/interfaces/todo-service.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService implements ITodoService {

  private mockTodos: IItem[] = [
    {
      id: 0,
      title: 'Do homework',
      description: '',
      completed: false
    }
  ];

  getTodos(search: any = null): Observable<IItem[]> {
    if(search)
      return of(this.mockTodos.filter((todo: IItem) => {
        return todo.completed === search.completed;
      }));
    return of(this.mockTodos);
  }

  addTodo(newTodo: IItem): Observable<number> {
    const id = this.mockTodos.length + 1;
    this.mockTodos.push({
      ...newTodo,
      id,
    });
    return of(id);
  }

  updateTodo(todoToUpdate: IItem): Observable<string> {
    this.mockTodos = this.mockTodos.filter((todo: IItem) => {
      return todo.id !== todoToUpdate.id;
    });

    this.mockTodos.push(todoToUpdate);

    return of('Updated');
  }

  deleteTodo(todoId: number): Observable<string> {

    this.mockTodos = this.mockTodos.filter((todo: IItem) => {
      return todo.id !== todoId;
    });

    return of('Deleted');
  }

}
