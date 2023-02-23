import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { ListTodosComponent } from './components/list-todos/list-todos.component';
import { SingleTodoComponent } from './components/single-todo/single-todo.component';
import { NewTodoComponent } from './components/new-todo/new-todo.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {HttpClientModule} from "@angular/common/http";
import {MatListModule} from "@angular/material/list";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatRadioModule} from "@angular/material/radio";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListTodosComponent,
    SingleTodoComponent,
    NewTodoComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatToolbarModule,
        MatCardModule,
        MatListModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        FormsModule,
        MatRadioModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
