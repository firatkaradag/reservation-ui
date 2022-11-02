import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Extra, PaymentType, Reservation, ReservationShort, RoomSize } from '../models/reservation';
import { environment } from 'src/environments/environment';

export enum OperationType {
  NONE=0, SEARCH=1, CREATE=2, READ=3, UPDATE=4, DELETE=5
}

export interface APIResponse<T> {
  message: string;
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private httpClient: HttpClient;
  private API_URL = environment.API_URL;
  constructor(http: HttpClient) { 
    this.httpClient = http;
  }

  /**
   * This method will return an empty data in order to show blured ghost loading 
   * @returns Reservation
   */
  getGhostReservation = (): Reservation => {
    return {
      stay: { arrivalDate: new Date('11/4/2022'), departureDate: new Date('11/8/2022') },
      room: { roomQuantity: 1, roomSize: RoomSize.STANDARD },
      firstName: 'Firat',
      lastName: 'Karadag',
      email: 'firatkaradaq@gmail.com',
      phone: "+12896801117",
	    addressStreet: {
		    streetName: "Locke Street",
		    streetNumber: 101,
	    },
	    addressLocation: {
		    zipCode: "L8P4A6",
		    state: "Ontario",
		    city: "Hamilton"
      },
      extras: [Extra.TV, Extra.WIFI],
      payment: PaymentType.BITCOIN,
      note: "This is all about reservation",
      tags: ["IDEMIA", "ANGULAR", "MATERIAL-UI"],
      reminder: false,
      newsletter: true,
      confirm: true
    } as Reservation
  }

  getReservations = (data: any) : Observable<APIResponse<ReservationShort[]>> => {
    return this.post(data, OperationType.SEARCH)
  }

  getReservation = (id: string) : Observable<APIResponse<Reservation>> => {
    return this.post({ id: id}, OperationType.READ)
  }

  deleteReservation = (id: string) : Observable<APIResponse<boolean>> => {
    return this.post({ id: id}, OperationType.DELETE)
  }

  saveReservation = (reservation: Reservation) : Observable<APIResponse<Reservation>> => {
    if (reservation && reservation.id) {
      return this.post(reservation, OperationType.UPDATE)
    } 
    return this.post(reservation, OperationType.CREATE)
  }

  private post = (data: any, operationType: OperationType) : Observable<any> => {
    return this.httpClient.post<Reservation>(this.API_URL, {
      "operationType": operationType,
      "data": data
    }, { responseType: 'json' });
  }
}
