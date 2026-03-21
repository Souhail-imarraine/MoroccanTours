import { TourResponse } from './tour.model';
import { UserResponse } from './user.model';

export interface BookingResponse {
  id: number;
  bookingDate: string;
  totalPrice: number;
  numberOfParticipants: number;
  status: string;
  tourist: UserResponse;
  tour: TourResponse;
}

export interface BookingRequest {
  tourId: number;
  numberOfParticipants: number;
}
