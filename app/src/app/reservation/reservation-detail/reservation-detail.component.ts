import { Component, Inject, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Reservation, Extra, PaymentType, RoomSize } from '../models/reservation';
import { MatChipInputEvent } from '@angular/material/chips';
import { ReservationService } from '../services/reservation.service';
import { ThemePalette } from '@angular/material/core';

export interface Loader {
  color: ThemePalette;
  mode: ProgressSpinnerMode;
  value: number
}

@Component({
  selector: 'app-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.sass']
})
export class ReservationDetailComponent implements OnInit {

  MIN_ROOM_QUANTITY = 1;
  MAX_ROOM_QUANTITY = 5;
  MAX_FIRST_NAME = 25;
  MAX_LAST_NAME = 50;

  ERROR_MESSAGE_UNABLE_TO_BOOK = 'cannot able to book your reservation right now.'
  ERROR_MESSAGE_UNABLE_TO_DELETE = 'cannot able to delete your reservation right now.'
  ERROR_MESSAGE_UNABLE_TO_UPDATE = 'cannot able to update your reservation right now.'
  ERROR_MESSAGE_TRY_AGAIN_LATER = ' Please try again later.'

  Extra = Extra

  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  addOnBlur = true

  deleting = false;
  saving = false;
  saveLoader: Loader = {
    color: 'primary',
    mode: 'indeterminate',
    value: 50 
  }
  loading = false;
  loader: Loader = {
    color: 'accent',
    mode: 'indeterminate',
    value: 50 
  }
  modify = false;
  disabled = true;
  reservation: Reservation;
  extras: { checked: boolean, value: string }[] = []
  PaymentType = PaymentType
  tags: string[] = []
  RoomSize = RoomSize
  reservationId: string | undefined = undefined
  
  constructor(
    public reservationService: ReservationService,
    public dialogRef: MatDialogRef<ReservationDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { reservationId: string, disabled: boolean, action: string, loading: boolean }
  ) { 
    this.loading = data.loading;
    this.disabled = data.disabled
    this.modify = data.action == 'modify';
    
    this.reservation = this.reservationService.getGhostReservation();
    if (data && data.reservationId) {
      this.reservationId = data.reservationId
    }
  }

  ngOnInit(): void {
    if (this.reservationId) {
      this.reservationService.getReservation(this.reservationId).subscribe(response => this.show(response.data));
    }
  }

  show = (reservation: Reservation) => {
    this.reservation = reservation;
    this.tags = reservation.tags;
    if (this.disabled) {
      this.extras = Object.values(Extra)
        .map(extra => {
          return {
            checked: reservation.extras.includes(extra),
            value: extra.replace('extra', '')
          }
        })
    }
    this.loading = false;
  }

  closeDialog = (action: string) => {
    this.dialogRef.close({action: action, reservation: this.reservation});
  }

  addTag = (event: MatChipInputEvent) => {
    const value = (event.value || '').trim();
    if (value !== '') this.tags.push(value)
    // Clear the input value
    event.chipInput!.clear();
  }

  removeTag = (tag: string) => {
    this.tags = this.tags.filter(t => t !== tag)
  }

  deleteReservation = () => {
    if (this.reservation && this.reservation.id) {
      this.deleting = true;
      this.disabled = true;
      this.reservationService.deleteReservation(this.reservation.id).subscribe(success => {
        this.deleting = false;
        this.disabled = false;
        if (success)  {
          this.closeDialog('deleted');
        } else {
          this.showErrorMessage(this.ERROR_MESSAGE_UNABLE_TO_DELETE)
        }
      });
    }
  }

  saveReservation = () => {
    if (this.reservation) {
      this.saving = true;
      this.disabled = true;
      this.reservationService.saveReservation(this.reservation).subscribe(reservation => {
        this.saving = false;
        this.disabled = false;
        if (reservation) {
          this.closeDialog('saved');
        } else {
          this.showErrorMessage(this.ERROR_MESSAGE_UNABLE_TO_BOOK)
        }
      });
    }
  }

  cancelReservation = () => {
    this.closeDialog('canceled');
  }

  checkRoomQuantity = (event: Event) => {
    const input = <HTMLInputElement>event.target
    if (input) {
      let value = input.value ?? "1";
      if (value > input.max) value = input.max;
      if (value < input.min) value = input.min;
      input.value = Math.ceil(+value).toString();
    }
  }

  showErrorMessage = (msg: string) => {
    //TODO handle errors
    alert(msg + this.ERROR_MESSAGE_TRY_AGAIN_LATER);
  }

  getExtraText = (extra: string) => extra.replace('extra', '')

  get readonly():string | null { return this.disabled ? 'disabled' : null }
}
