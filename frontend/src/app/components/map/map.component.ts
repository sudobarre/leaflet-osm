import { Component, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';
import { take } from 'rxjs';
import { LeafletService } from 'src/app/services/location/leaflet.service';
import { LocationService } from 'src/app/services/location/location.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  title = 'OpenStreetMap with Angular and Leaflet';
  center: any = Leaflet.latLng(-34.603773, -58.381594);
  userAccuracy: number = 100;

  options: Leaflet.MapOptions = {
    layers: this.leafletService.getLayers(),
    zoom: 18,
    // Default location: Obelisco de Buenos Aires, will be overridden once/if current location is obtained
    center: Leaflet.latLng(-34.603773, -58.381594),
  };

  constructor(
    public locationService: LocationService,
    private leafletService: LeafletService
  ) {}

  ngOnInit() {
    this.locateUser();
  }

  locateUser() {
    // Center the map on the user's current location
    this.locationService.userLocation$.pipe(take(1)).subscribe((location: any) => {
      this.center = Leaflet.latLng(location.lat, location.lng);
    // Remove any existing circles on the map (if needed)
    this.leafletService.clearCircles();
    // Draw a circle on the map with the radius based on accuracy
    this.leafletService.addCircle(location.lat, location.lng);
    });
  }
}