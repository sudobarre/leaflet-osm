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
  center: any = Leaflet.latLng(-34.603773, -58.381594);

  options: Leaflet.MapOptions = {
    layers: this.leafletService.getLayers(),
    zoom: 18,
    // Default location: Obelisco de Buenos Aires, will be overridden once/if current location is obtained
    center: Leaflet.latLng(-34.603773, -58.381594),
  };

  layersControl = {
    baseLayers: {
      'Open Street Map': Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
//      'Open Cycle Map': Leaflet.tileLayer('https://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    },
    overlays: {
      'Big Circle': Leaflet.circle([ 46.95, -122 ], { radius: 5000 }),
//      'Big Square': Leaflet.polygon([[ 46.8, -121.55 ], [ 46.9, -121.55 ], [ 46.9, -121.7 ], [ 46.8, -121.7 ]])
    }
  }
  layers = [];

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
      if(location){
        this.options.center = Leaflet.latLng(location.lat, location.lng);
        this.center = Leaflet.latLng(location.lat, location.lng);
        // Remove any existing circles on the map (if needed)
        this.leafletService.clearCircles();
        // Draw a circle on the map with the radius based on accuracy
        //this.leafletService.addCircle(location.lat, location.lng);
        this.layers[0] = Leaflet.circle([location.lat, location.lng], { radius: 100 });
      }   
    });
  }

  onMapReady(map: Leaflet.Map) {
    // Do stuff with map
    console.log('Map ready', map);
  }
}