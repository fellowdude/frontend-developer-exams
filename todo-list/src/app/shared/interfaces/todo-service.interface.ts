import { Observable } from "rxjs";
import { IItem } from "./item.interface";

export interface ITodoService {
  getTodos(search: any): Observable<IItem[]>;

  addTodo(newTodo: IItem): Observable<number>;

  updateTodo(todoToUpdate: IItem): Observable<string>;

  deleteTodo(todoId: number): Observable<string>;
}
