import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TodosState } from '../store/reducer';
import {selectClosedTodos, selectTodos} from '../store/selectors';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatList, MatListItem } from '@angular/material/list';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import {MockComponents, MockDirectives, MockedComponent, ngMocks} from 'ng-mocks';
import { By } from '@angular/platform-browser';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let store: MockStore<TodosState>;
  let mockTodosSelector;

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
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;

    mockTodosSelector = store.overrideSelector(selectTodos, [
      { title: 'todo 1', isClosed: false },
      { title: 'todo 2', isClosed: true },
    ]);

    store.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a title', () => {
    expect(fixture.debugElement.query(By.css('mat-card-title')).nativeElement.innerText).toEqual(
      'Todos'
    );
  });

  it('should display todos', () => {
    const todoElements = fixture.debugElement.queryAll(By.css('mat-list mat-list-item'));
    expect(todoElements.length).toEqual(2);


    expect(todoElements[0].query(By.css('h4')).nativeElement.innerText).toContain('todo 1');
    expect(todoElements[1].query(By.css('h4')).nativeElement.innerText).toContain('todo 2');

    const todoCheckboxes: MockedComponent<MatCheckbox>[] =
      todoElements.map(item => item.query(By.css('mat-checkbox'))).map(item => item.componentInstance);
    // console.log(todoCheckboxes);
  });

  it('should display closed todo in del tag', () => {
    mockTodosSelector = store.overrideSelector(selectClosedTodos, [
      { title: 'todo 1', isClosed: true },
      { title: 'todo 2', isClosed: true },
    ]);
    // store.setState({todos: [{title: 'Closed item', isClosed: true}]});
    fixture.detectChanges();

    const doneElement = fixture.debugElement.queryAll(By.css('del'));

    expect(doneElement.length).toBe(1);
  });

});
