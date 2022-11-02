import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReservationShort } from '../models/reservation';
import {MatDialog} from '@angular/material/dialog';
import { ReservationDetailComponent } from '../reservation-detail/reservation-detail.component';

@Component({
  selector: 'app-reservation-card',
  templateUrl: './reservation-card.component.html',
  styleUrls: ['./reservation-card.component.sass']
})
export class ReservationCardComponent implements OnInit {

  @Output() update = new EventEmitter()
  @Input() reservation!: ReservationShort;

  extras: string[] = [];
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.extras = this.reservation.extras.map(extra => extra.replace('extra', ''));
  }

  openDialog(modify: boolean): void {
    const dialogRef = this.dialog.open(ReservationDetailComponent, {
      data: {reservationId: this.reservation.id, disabled: !modify, action: modify ? 'modify' : 'view', loading: true },
      panelClass: ''
    });

    dialogRef.afterClosed().subscribe(result => {
      this.update.emit(result.action)
    });
  }

}
