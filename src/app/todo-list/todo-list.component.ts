import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Todo } from '../models/todo';
import { loadTodos, updateTodo } from '../store/actions';
import { selectClosedTodos, selectOpenTodos, selectTodos } from '../store/selectors';

@Component({
  selector: 'oap-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
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

  updateTodo(todo: Todo): void {
    this.store.dispatch(updateTodo({ todo: { ...todo } }));
  }

  closeTodo(todo: Todo): void {
    this.store.dispatch(updateTodo({ todo: { ...todo } }));
  }

  openTodo(todo: Todo): void {
    this.store.dispatch(updateTodo({ todo: { ...todo } }));
  }
}
