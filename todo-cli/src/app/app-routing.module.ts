import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListTodosComponent} from "./components/list-todos/list-todos.component";
import {NewTodoComponent} from "./components/new-todo/new-todo.component";
import {SingleTodoComponent} from "./components/single-todo/single-todo.component";

const routes: Routes = [
  {path: '', redirectTo: 'todos', pathMatch: 'full'},
  {path: 'todos', component: ListTodosComponent},
  {path: 'new-todo', component: NewTodoComponent},
  {path: 'todos/:id', component: SingleTodoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
