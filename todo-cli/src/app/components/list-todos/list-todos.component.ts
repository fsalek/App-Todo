import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable, switchMap} from "rxjs";
import {Todo} from "../../models/todo";
import {ActivatedRoute, Router} from "@angular/router";
import {TodoService} from "../../services/todo.service";

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListTodosComponent implements OnInit{
  constructor(private router: Router, private todoService: TodoService,
              private route: ActivatedRoute) {
  }
  loading$!: Observable<boolean>;
  todos$!: Observable<Todo[]>;
  todo!: Todo;
  todo$!: Observable<Todo>;

  ngOnInit(): void {
    this.initObservables();
    this.todoService.getAllTodosFromServer();
  }
  private initObservables() {
    this.loading$ = this.todoService.loading$;
    this.todos$ = this.todoService.todos$;
  }

}
