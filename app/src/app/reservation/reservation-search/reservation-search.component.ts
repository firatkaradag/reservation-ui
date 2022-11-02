import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Extra, ReservationShort } from '../models/reservation';
import { ReservationDetailComponent } from '../reservation-detail/reservation-detail.component';

@Component({
  selector: 'app-reservation-search',
  templateUrl: './reservation-search.component.html',
  styleUrls: ['./reservation-search.component.sass']
})
export class ReservationSearchComponent {

  @Output() search = new EventEmitter()

  Extra = Extra
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  reservation: ReservationShort = {
    stay: {},
    extras: []
  };

  constructor(public dialog: MatDialog) {}

  bookReservation = () => {
    const dialogRef = this.dialog.open(ReservationDetailComponent, {
      data: { disabled: false, laoding: false }, panelClass: ''
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.action !== 'canceled') this.search.emit(this.reservation)
    });
  }

  searchHandler = () => {
    this.search.emit(this.reservation)
  }

}
