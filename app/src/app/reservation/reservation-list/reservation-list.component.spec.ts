import { ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';

import { ReservationService } from '../services/reservation.service';
import { ReservationListComponent } from './reservation-list.component';
import { of } from 'rxjs';
import { fakeAPIResponseReservationShortList } from 'src/mocks/fake-mocks';
import { ReservationModule } from '../reservation.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Extra, SearchCriteria } from '../models/reservation';
import { By } from '@angular/platform-browser';

describe('ReservationListComponent', () => {
  let component: ReservationListComponent;
  let fixture: ComponentFixture<ReservationListComponent>;
  let reservationServiceSpy = jasmine.createSpyObj('ReservationService', ['getReservations']);
  let fakeAPIResponse = jasmine.createSpyObj('APIResponse', fakeAPIResponseReservationShortList)
  let searchCriteria: SearchCriteria = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationListComponent],
      imports: [ReservationModule, BrowserAnimationsModule],
      providers: [
        {provider: ReservationService, useValue: reservationServiceSpy },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationListComponent);
    component = fixture.componentInstance;

    searchCriteria = {}
    reservationServiceSpy.getReservations.and.returnValue(fakeAPIResponse)
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should show reservation short definition on init with no criteria', () => {
    const searchSpy = jasmine.createSpyObj('ReservationListComponent', ['search']);
    fakeAsync(inject([ReservationListComponent], (component: ReservationListComponent) => {
      component.ngOnInit()
      tick();
      expect(searchSpy.search).toHaveBeenCalledWith(searchCriteria)
      expect(searchSpy.show).toHaveBeenCalledWith(fakeAPIResponseReservationShortList.data)
    }))
  });

  it('should display reservation short definition', () => {
    fakeAsync(inject([ReservationListComponent], (component: ReservationListComponent) => {
      component.ngOnInit()
      tick();
      fixture.detectChanges()
      const container = fixture.debugElement.query(By.css('app-reservation-search'))
      expect(container).toBeTruthy()

      const spinner = fixture.debugElement.query(By.css('mat-spinner'))
      expect(spinner).toBeTruthy()

      const cards = fixture.debugElement.query(By.css('app-reservation-card'))
      expect(cards).toBeTruthy()
    }))
  });

  fit('should show reservation short definition on init with criteria', () => {
    // reservationServiceSpy.getReservations.and.returnValue(fakeAPIResponse)
    searchCriteria = { 
      stay: { arrivalDate: new Date(), departureDate: new Date()}, 
      extras: [Extra.BREAKFAST]
    }
    component.search(searchCriteria)
    fixture.detectChanges()
    const cards = fixture.debugElement.query(By.css('app-reservation-card'))
    console.log("cards: ", fixture.debugElement);
    expect(cards).toBeTruthy()
  });
});
