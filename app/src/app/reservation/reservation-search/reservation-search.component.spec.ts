import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { ReservationSearchComponent } from './reservation-search.component';

describe('ReservationSearchComponent', () => {
  let component: ReservationSearchComponent;
  let fixture: ComponentFixture<ReservationSearchComponent>;
  let dialogSpy: jasmine.Spy;
  const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of({action: 'canceled'}), close: null });
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatNativeDateModule, 
        MatDialogModule, 
        MatCardModule, 
        MatSelectModule, 
        MatDatepickerModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [ ReservationSearchComponent ],
      providers: [MatDatepickerModule, MatDialogModule]
    })
      .overrideComponent(ReservationSearchComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();

    dialogSpy = spyOn(TestBed.inject(MatDialog), 'open').and.returnValue(dialogRefSpyObj);
    fixture = TestBed.createComponent(ReservationSearchComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.reservation.extras).toEqual([])
    expect(component.reservation.stay).toEqual({arrivalDate: undefined, departureDate: undefined})
  });

  it('should create form elements', () => {
    fixture.detectChanges();
    const extrasLabel = fixture.debugElement
      .query(By.css('#extras-form-field'))
      .query(By.css('mat-label'))
      .nativeElement
    expect(extrasLabel.textContent).toContain('Extras')

    const dateFormElement = fixture.debugElement
      .query(By.css('#date-form-field'))
    const dateLabel = dateFormElement
      .query(By.css('mat-label'))
      .nativeElement
    expect(dateLabel.textContent).toContain('Enter a date range')
    const dateHint = dateFormElement
      .query(By.css('mat-hint'))
      .nativeElement
    expect(dateHint.textContent).toContain('MM/DD/YYYY – MM/DD/YYYY')
  })

  it('should call book reservation', () => {
    spyOn(component, 'bookReservation');
    const bookButton = fixture.debugElement.query(By.css('#book-button'))
    bookButton.triggerEventHandler('click');
    expect(component.bookReservation).toHaveBeenCalled()
  });

  it('should emit on search', () => {
    spyOn(component.search, 'emit');
    const searchButton = fixture.debugElement.query(By.css('#search-button'))
    searchButton.triggerEventHandler('click');
    expect(component.search.emit).toHaveBeenCalledWith(component.reservation);
  });

  it('should open reservation detail ', () => {
    component.bookReservation()
    expect(dialogSpy).toHaveBeenCalled()
  });
});
