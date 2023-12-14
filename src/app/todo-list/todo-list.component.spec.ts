import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatList, MatListItem } from '@angular/material/list';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MockComponents, MockDirectives, ngMocks } from 'ng-mocks';

import { TodoListComponent } from './todo-list.component';
import { updateTodo } from '../store/actions';
import { TodosState } from '../store/reducer';
import { todoSelectors } from '../store/selectors';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let mockStore: MockStore<TodosState>;

  const selectTodosMock = [
    { title: 'todo 1', isClosed: true },
    { title: 'todo 2', isClosed: false },
  ];

  const selectClosedTodosMock = [{ title: 'todo 1', isClosed: true }];
  const selectOpenTodosMock = [{ title: 'todo 2', isClosed: false }];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TodoListComponent,
        MatCheckbox,
        MockComponents(MatListItem, MatList, MatCard),
        MockDirectives(MatCardContent, MatCardTitle),
      ],
      imports: [MatRippleModule, FormsModule],
      providers: [
        provideMockStore({
          selectors: [
            { selector: todoSelectors.selectTodos, value: selectTodosMock },
            { selector: todoSelectors.selectClosedTodos, value: selectClosedTodosMock },
            { selector: todoSelectors.selectOpenTodos, value: selectOpenTodosMock },
          ],
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;

    mockStore.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a title', () => {
    expect(fixture.debugElement.query(By.css('mat-card-title')).nativeElement.innerText).toEqual('Todos');
  });

  it('should display todos', () => {
    fixture.detectChanges();
    const todoElements = fixture.debugElement.queryAll(By.css('mat-list mat-list-item'));
    expect(todoElements.length).toEqual(2);
  });

  it('should display closed todo in del tag', () => {
    const doneElements = getDoneTODOs();
    expect(doneElements.length).toBe(1);
    expect(doneElements[0].nativeElement.innerText).toContain('todo 1');
  });

  it('should send action when checkbox change event', () => {
    ngMocks.click('mat-checkbox');
    fixture.detectChanges();
    expect(mockStore.dispatch).toHaveBeenCalledWith({ type: updateTodo.type });
  });

  function getDoneTODOs(): DebugElement[] {
    return fixture.debugElement.queryAll(By.css('del'));
  }
});
