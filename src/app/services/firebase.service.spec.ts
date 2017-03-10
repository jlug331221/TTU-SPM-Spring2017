/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FirebaseServiceService } from './firebase-service.service';

describe('FirebaseServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirebaseServiceService]
    });
  });

  it('should ...', inject([FirebaseServiceService], (service: FirebaseServiceService) => {
    expect(service).toBeTruthy();
  }));
});
