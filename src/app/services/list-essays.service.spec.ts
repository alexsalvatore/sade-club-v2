import { TestBed } from '@angular/core/testing';

import { ListEssaysService } from './list-essays.service';

describe('ListEssaysService', () => {
  let service: ListEssaysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListEssaysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
