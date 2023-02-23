import {Component, OnInit} from '@angular/core';
import {tap} from "rxjs";
import {TodoService} from "../../services/todo.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  constructor(private todoService: TodoService, private router: Router) {
  }
  ngOnInit(): void {
  }



}
