import { Component, OnInit } from '@angular/core';
import { ReservationShort, SearchCriteria } from '../models/reservation';
import { ReservationService } from '../services/reservation.service';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

export interface Loader {
  color: ThemePalette;
  mode: ProgressSpinnerMode;
  value: number
}

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.sass']
})
export class ReservationListComponent implements OnInit {

  loading = true;
  loader: Loader = {
    color: 'primary',
    mode: 'indeterminate',
    value: 50 
  }
  searchCriteria: SearchCriteria = {};
  reservations: ReservationShort[] = []
  constructor(public reservationService: ReservationService) { 
    this.search(this.searchCriteria);
  }

  ngOnInit(): void { }
  update = (status: string) => {
    if (status !== 'canceled') {
      this.search(this.searchCriteria)
    }
  }
  
  search = (reservation: ReservationShort | SearchCriteria) => {
    this.loading = true;
    this.reservations = []
    this.searchCriteria = {
      extras: reservation.extras,
      stay: reservation.stay
    }
    this.reservationService.getReservations(this.searchCriteria).subscribe(response => this.show(response.data));
  }

  show = (reservations: ReservationShort[]) => {
    this.reservations = reservations.sort((first: ReservationShort, second: ReservationShort) => {
      if (first.stay.arrivalDate && second.stay.arrivalDate) {
        // stay dates needs to be converted to Date back because it behaves as string although it's type is Date
        const f = new Date(first.stay.arrivalDate.toString());
        const s = new Date(second.stay.arrivalDate.toString());
        return s.getTime() - f.getTime()
      }
      return 0;
    })
    this.loading = false;
  }
}
