import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IItem } from 'src/app/shared/interfaces/item.interface';
import { ITodoService } from 'src/app/shared/interfaces/todo-service.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService implements ITodoService {

  constructor(private httpClient: HttpClient) { }

  getTodos(search: any): Observable<IItem[]> {
    return this.httpClient.get<IItem[]>('/api/todo');
  }

  addTodo(newTodo: IItem): Observable<number> {
    return this.httpClient.post<number>('/api/todo', newTodo);
  }

  updateTodo(todoToUpdate: IItem): Observable<string> {
    return this.httpClient.put<string>('/api/todo', todoToUpdate);
  }

  deleteTodo(todoId: number): Observable<string> {
    return this.httpClient.delete<string>('/api/todo/' + todoId);
  }

}
