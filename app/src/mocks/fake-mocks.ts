import { Extra, ReservationShort, Reservation, RoomSize, PaymentType } from "src/app/reservation/models/reservation";
import { APIResponse } from "src/app/reservation/services/reservation.service";

export const fakeReservationShort: ReservationShort = {
    stay: { arrivalDate: new Date('11/4/2022'), departureDate: new Date('11/4/2022') },
    extras: [Extra.BREAKFAST]
}

export const fakeReservation: Reservation = {
    stay: { arrivalDate: new Date('11/4/2022'), departureDate: new Date('11/4/2022') },
    extras: [Extra.BREAKFAST],
    room: { roomQuantity: 1, roomSize: RoomSize.STANDARD},
    firstName: "Fake",
    lastName: "Test",
    email: "fake@test.com",
    phone: "+12345678900",
    addressStreet: { streetName: 'Fake Street', streetNumber: 0 },
    addressLocation: { zipCode: 'L1L1L1', state: 'Ontario', city: 'Burlington'},
    payment: PaymentType.NONE,
    note: "this is a fake note",
    tags: ["fake", "test"],
    reminder: false,
    newsletter: false,
    confirm: false
}

export const fakeReservationId = "00000000"
export const fakeAPIResponseMessage = "operation successfully completed"
export const fakeAPIResponse:APIResponse<ReservationShort[]> = {
    message: fakeAPIResponseMessage,
    data: []
} 
export const fakeAPIResponseReservationShortList:APIResponse<ReservationShort[]> = {
    message: fakeAPIResponseMessage,
    data: [fakeReservationShort]
} 