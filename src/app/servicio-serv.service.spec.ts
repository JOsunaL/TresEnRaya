import { TestBed, inject } from '@angular/core/testing';

import { ServicioServService } from './servicio-serv.service';

describe('ServicioServService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServicioServService]
    });
  });

  it('should be created', inject([ServicioServService], (service: ServicioServService) => {
    expect(service).toBeTruthy();
  }));
});
