import { TestBed } from '@angular/core/testing';

import { JsonPostsService } from './json-posts.service';

describe('JsonPostsService', () => {
  let service: JsonPostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonPostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
