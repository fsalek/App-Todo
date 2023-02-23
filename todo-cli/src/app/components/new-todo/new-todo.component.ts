import {Component, OnInit} from '@angular/core';
import {tap} from "rxjs";
import {TodoService} from "../../services/todo.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.scss']
})
export class NewTodoComponent implements OnInit{
  loading = false;
  mainForm!: FormGroup;
  dataForm!: FormGroup;
  personalInfoForm!: FormGroup;

  constructor(private todoService: TodoService, private router: Router,
              private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.initDataForm();
  }
  initDataForm() {
    this.dataForm = this.formBuilder.group({
      id: null,
      title: ['', [Validators.required]],
      state: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }
  onSubmitForm() {
    this.loading = true;
    this.todoService.saveTodo(this.dataForm.value).pipe(
      tap(saved => {
        this.loading = false;
        if (saved) {
          this.resetForm();
        } else {
          console.error('Echec de l\'enregistrement');
        }
      })
    ).subscribe();
  }
  private resetForm() {
    this.mainForm.reset();
  }
  /*updateData()
  {
    this.todoService.updateTodo(this.dataForm.value.id, this.dataForm.value).
    subscribe( data => {
      this.toastr.success( 'Modification Faite avec Success');

      this.router.navigate(['/clients']);
    });
  }*/

  onGoBack() {
    this.router.navigateByUrl('/todos');
  }
}
