import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { State } from '../store/reducer';
import { selectTodos } from '../store/selectors';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatList, MatListItem } from '@angular/material/list';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MockComponents, MockDirectives, MockedComponent, ngMocks } from 'ng-mocks';
import { By } from '@angular/platform-browser';
import { loadTodos, toggleTodo } from '../store/actions';
import { MemoizedSelector } from '@ngrx/store';
import { Todo } from '../models/todo';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let store: MockStore<State>;
  let mockTodosSelector: MemoizedSelector<State, Todo[]>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TodoListComponent,
        MockComponents(
          MatCheckbox,
          MatListItem,
          MatList,
          MatCard
        ),
        MockDirectives(
          MatCardContent,
          MatCardTitle
        )
      ],
      imports: [MatRippleModule, FormsModule],
      providers: [provideMockStore()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    spyOn(store, 'dispatch');

    mockTodosSelector = store.overrideSelector(selectTodos, [
      { id: 1, title: 'todo 1', isClosed: false, toggleTime: 0 },
      { id: 2, title: 'todo 2', isClosed: true, toggleTime: 1000 },
    ]);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(store.dispatch).toHaveBeenCalledOnceWith(loadTodos());
  });

  it('should display a title', () => {
    expect(fixture.debugElement.query(By.css('mat-card-title')).nativeElement.innerText).toEqual(
      'Todos'
    );
  });

  it('should display todos', () => {
    const todoElements = ngMocks.findAll('mat-list mat-list-item');
    expect(todoElements.length).toEqual(2);
    expect(todoElements[0].query(By.css('h4')).nativeElement.innerText).toContain('todo 1');
    expect(todoElements[1].query(By.css('h4')).nativeElement.innerText).toContain('todo 2');

    const todoCheckboxes: MockedComponent<MatCheckbox>[] =
      todoElements.map(item => item.query(By.css('mat-checkbox'))).map(item => item.componentInstance);
    expect(todoCheckboxes[0].checked).toBeFalse();
    expect(todoCheckboxes[1].checked).toBeTrue();

  });

  it('should check todo on click on checkbox', () => {
    (store.dispatch as jasmine.Spy).calls.reset();
    const checkboxes = fixture.debugElement.queryAll(By.css('mat-checkbox'));
    checkboxes[1].triggerEventHandler('change');
    expect(store.dispatch).toHaveBeenCalledOnceWith(toggleTodo({ todo: { id: 2, title: 'todo 2', isClosed: true, toggleTime: 1000 } }));
  });

  it('should append class checked on todo element when closed', () => {
    expect(ngMocks.findAll('mat-list mat-list-item h4').map((e) => e.classes['checked'] ?? false)).toEqual([false, true]);
  });

});
