import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  //Default location: Obelisco de Buenos Aires
  private userLocationSubject: BehaviorSubject<any> = new BehaviorSubject<any>({ lat: -34.603773, lng: -58.381594 });
  public userLocation$: Observable<any> = this.userLocationSubject.asObservable();

  constructor() {
    this.watchUserLocation();
  }

  private watchUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          if (position) {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            const location = { lat, lng };
            this.userLocationSubject.next(location);
          }
        },
        (error) => console.log(error)
      );
    }
  }
}