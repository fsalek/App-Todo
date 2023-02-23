import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Todo} from "../../models/todo";
import {map, Observable, startWith, switchMap, take, tap} from "rxjs";
import {TodoService} from "../../services/todo.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-single-todo',
  templateUrl: './single-todo.component.html',
  styleUrls: ['./single-todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleTodoComponent implements OnInit {
  todo$!: Observable<Todo>;
  loading$!: Observable<boolean>;
  stateFormCtr!: FormControl;
  stateVueCtr!: FormControl;
  showStateCtrl$!: Observable<boolean>;

  constructor(private todoService: TodoService, private route: ActivatedRoute,
              private router: Router, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.initObservables();
    this.initDataForm();
    this.initFormObservables();
  }

  private initObservables() {
    this.loading$ = this.todoService.loading$;
    this.todo$ = this.route.params.pipe(
      switchMap(params => this.todoService.getTodoById(+params['id']))
    );
  }
  initDataForm() {
    this.stateFormCtr = this.formBuilder.control('');
    this.stateVueCtr = this.formBuilder.control('', [Validators.required]);
  }
  private initFormObservables() {
    this.showStateCtrl$ = this.stateFormCtr.valueChanges.pipe(
      startWith(false),
      map(state => state === 'updateState'),
      //tap(showEmailCtrl => this.setEmailValidators(showEmailCtrl))
    );
  }

  onValid() {
    this.todo$.pipe(
      take(1),
      tap(todo => {
        this.todoService.validTodo(todo.id);
        this.onGoBack();
      })
    ).subscribe();
  }


  onEditState() {
    this.todo$.pipe(
      take(1),
      tap(todo => {
        this.todoService.updateTodo(todo.id);
        this.onGoBack();
      })
    ).subscribe();
  }

  onEditStateTodo(id: number, todo:Todo) {
    this.todo$ = this.route.params.pipe(
      switchMap(params => this.todoService.getTodoById(+params['id']))
    );
    this.todoService.getTodoById(id).subscribe();
    this.router.navigateByUrl('/edit-state/:id');
  }

  onRefuse() {
    this.onGoBack()
  }
  onGoBack() {
    this.router.navigateByUrl('/todos');
  }
}
