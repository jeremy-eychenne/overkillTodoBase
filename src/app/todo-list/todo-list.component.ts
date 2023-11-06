import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Todo} from '../models/todo';
import {Store} from '@ngrx/store';
import {selectClosedTodos, selectOpenTodos, selectTodos} from '../store/selectors';
import {loadTodos, updateTodo} from '../store/actions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todos$: Observable<ReadonlyArray<Todo>>;
  closedTodos$: Observable<ReadonlyArray<Todo>>;
  openTodos$: Observable<ReadonlyArray<Todo>>;

  constructor(private store: Store) {
    this.todos$ = this.store.select(selectTodos);
    this.closedTodos$ = this.store.select(selectClosedTodos);
    this.openTodos$ = this.store.select(selectOpenTodos);
  }

  ngOnInit(): void {
     this.store.dispatch(loadTodos());
  }

  toggleTodo(todo: Todo): void {
    this.store.dispatch(updateTodo({ todo: {...todo} }));
  }
}
