import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { fakeAPIResponseMessage, fakeReservation, fakeReservationId } from 'src/mocks/fake-mocks';
import { Reservation } from '../models/reservation';
import { ReservationService } from './reservation.service';

describe('ReservationService', () => {
  let service: ReservationService;
  const httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
  let reservation: Reservation;
  const id = fakeReservationId
  const message = fakeAPIResponseMessage

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpClientSpy }]
    });
    service = TestBed.inject(ReservationService);
    reservation = {...fakeReservation }
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get ghost reservation', () => {
    expect(reservation).toBeTruthy();
    expect(reservation.firstName).toEqual('Fake')
  });

  it('should post CREATE operation without id', () => {
    httpClientSpy.post.and.returnValue(of({data: {...reservation, id: id}, message: message}));
    service.saveReservation(reservation).subscribe(response => {
      console.log("Response: ", response.message);
      expect(response).toBeTruthy()
      expect(response.message).toEqual(message)
      expect(response.data).toBeTruthy()
      expect(response.data.id).toEqual(id)
    })
  });

  it('should post READ operation with id', () => {
    reservation.id = id
    httpClientSpy.post.and.returnValue(of({data: reservation, message: message}));
    service.getReservation(id).subscribe(response => {
      expect(response).toBeTruthy()
      expect(response.message).toEqual(message)
      expect(response.data).toBeTruthy()
      expect(response.data).toEqual(reservation)
    })
  });

  it('should post UPDATE operation with id', () => {
    reservation.id = id
    httpClientSpy.post.and.returnValue(of({data: reservation, message: message}));
    service.saveReservation(reservation).subscribe(response => {
      expect(response).toBeTruthy()
      expect(response.message).toEqual(message)
      expect(response.data).toBeTruthy()
      expect(response.data).toEqual(reservation)
    })
  });

  it('should post DELETE operation with id', () => {
    httpClientSpy.post.and.returnValue(of({data: true, message: message}));
    service.deleteReservation(id).subscribe(response => {
      expect(response).toBeTruthy()
      expect(response.message).toEqual(message)
      expect(response.data).toBeTruthy()
      expect(response.data).toEqual(true)
    })
  });
});
