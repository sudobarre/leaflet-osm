import { Injectable } from '@angular/core';
import * as Leaflet from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class LeafletService {
  private circles: Leaflet.Circle[] = [];

  constructor() { }

  //TODO: Fetch from API


  public getMarkers = (): Leaflet.Marker[] => {
    return [
      new Leaflet.Marker(new Leaflet.LatLng(-34.469435, -58.520527), {
        icon: new Leaflet.Icon({
          iconSize: [50, 41],
          iconAnchor: [13, 41],
          iconUrl: 'assets/blue-marker.svg',
        }),
        title: 'Fede'
      } as Leaflet.MarkerOptions),
      new Leaflet.Marker(new Leaflet.LatLng(-34.590636, -58.384598), {
        icon: new Leaflet.Icon({
          iconSize: [50, 41],
          iconAnchor: [13, 41],
          iconUrl: 'assets/red-marker.svg',
        }),
        title: 'A'
      } as Leaflet.MarkerOptions),
      new Leaflet.Marker(new Leaflet.LatLng(38.03035557903951, 46.36413997942148), {
        icon: new Leaflet.Icon({
          iconSize: [50, 41],
          iconAnchor: [13, 41],
          iconUrl: 'assets/red-marker.svg',
        }),
        title: 'Aysan'
      } as Leaflet.MarkerOptions),
    ] as Leaflet.Marker[];
  };
  

  public getRoutes = (): Leaflet.Polyline[] => {
    return [
      new Leaflet.Polyline([
        new Leaflet.LatLng(43.5121264, 16.4700729),
        new Leaflet.LatLng(43.5074826, 16.4390046),
      ] as Leaflet.LatLng[], {
        color: '#0d9148'
      } as Leaflet.PolylineOptions)
    ] as Leaflet.Polyline[];
  };
  
  public getLayers = (): Leaflet.Layer[] => {
    return [
      // Basic style
      new Leaflet.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      } as Leaflet.TileLayerOptions),
      // Pastel style, remove if you want basic style. Uncomment if you want pastel style.
  
      // new Leaflet.TileLayer('https://api.maptiler.com/maps/pastel/{z}/{x}/{y}.png?key={your_key}', {
      //   attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>',
      // } as Leaflet.TileLayerOptions),
      ...this.getMarkers(),
      ...this.getRoutes(),
      ...this.getPolygons(),
      ...this.circles
    ] as Leaflet.Layer[];
  };
  
  public getPolygons = (): Leaflet.Polygon[] => {
    return [
      new Leaflet.Polygon([
        new Leaflet.LatLng(43.5181349, 16.4537963),
        new Leaflet.LatLng(43.517890, 16.439939),
        new Leaflet.LatLng(43.515599, 16.446556),
        new Leaflet.LatLng(43.518025, 16.463492)
      ] as Leaflet.LatLng[],
        {
          fillColor: '#eb530d',
          color: '#eb780d'
        } as Leaflet.PolylineOptions)
    ] as Leaflet.Polygon[];
  };

  addCircle(lat: number, lng: number) {
    const circle = Leaflet.circle([lat, lng], {
      radius: 50,
      fillColor: 'blue',
      fillOpacity: 0.2,
      color: 'blue',
    });

    this.circles.push(circle);
  }

  // Method to clear all circles from the map
  clearCircles() {
    this.circles.forEach((circle) => {
      circle.remove();
    });
    this.circles = [];
  }
  
}

