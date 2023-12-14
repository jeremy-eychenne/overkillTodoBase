import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { first } from 'rxjs/operators';

import { TodoService } from './todo.service';
import { environment } from '../../environments/environment';
import { Todo } from '../models/todo';

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should list todos', (done: DoneFn) => {
    const mockedTodoList: Todo[] = [{ title: 'todoTitle', isClosed: true }];

    service
      .list()
      .pipe(first())
      .subscribe((res: Todo[]) => {
        expect(res).toEqual(mockedTodoList);
        done();
      }, done.fail);

    const req = httpMock.expectOne((r) => r.url === `${environment.baseUrl}/api/todos`);
    expect(req.request.method).toEqual('GET');

    req.flush(mockedTodoList);
  });
});
