import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, delay, map, Observable, switchMap, take, tap} from "rxjs";
import {Todo} from "../models/todo";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  private _loading$ = new BehaviorSubject<boolean>(false);
  get loading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }

  private _todos$ = new BehaviorSubject<Todo[]>([]);
  get todos$(): Observable<Todo[]> {
    return this._todos$.asObservable();
  }
  private lastTodosLoad = 0;
  private setLoadingStatus(loading: boolean) {
    this._loading$.next(loading);
  }

  getAllTodosFromServer() {
    if (Date.now() - this.lastTodosLoad <= 300000) {
      return;
    }
    this.setLoadingStatus(true);
    this.http.get<Todo[]>(`${environment.apiUrl}/todos`).pipe(
      delay(1000),
      tap(todos => {
        this._todos$.next(todos);
        this.setLoadingStatus(false);
      })
    ).subscribe();
  }

  getTodoById(id: number): Observable<Todo> {
    if (!this.lastTodosLoad) {
      this.getAllTodosFromServer();
    }
    return this.todos$.pipe(
      map(todos => todos.filter(todo => todo.id === id)[0])
    );
  }

  saveTodo(formValue: { title: string, state: string, description: string }): Observable<Todo> {
    return this.todos$.pipe(
      map(todos => [...todos].sort((a, b) => a.id - b.id)),
      map(sortedTodos => sortedTodos[sortedTodos.length - 1]),
      map(previousTodo => ({
        ...formValue,
        id: previousTodo.id + 1
      })),
      switchMap(newTodo => this.http.post<Todo>(
        `${environment.apiUrl}/todos`, newTodo)
      )
    );
  }

  validTodo(id: number): void {
    this.todos$.pipe(
      take(1),
      map(todos => todos
        .map(todo => todo.id === id ?
          {...todo, state: 'VALIDATE', id: todo.id} :
          todo,
        )
      ),
      tap(updatedTodos => this._todos$.next(updatedTodos)),
      switchMap(updatedTodos =>
        this.http.put(`${environment.apiUrl}/todos/${id}`,
          updatedTodos.find(todo => todo.id === id))
      )
    ).subscribe();
  }
  updateTodo(id: number): void {
    this.todos$.pipe(
      take(1),
      map(todos => todos
        .map(todo => todo.id === id ?
          {...todo, state: todo.state, id: todo.id} :
          todo,
        )
      ),
      tap(updatedTodos => this._todos$.next(updatedTodos)),
      switchMap(updatedTodos =>
        this.http.put(`${environment.apiUrl}/todos/${id}`,
          updatedTodos.find(todo => todo.id === id))
      )
    ).subscribe();
  }
}
