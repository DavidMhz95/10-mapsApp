import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';
@Component({
  selector: 'app-zoom-page',
  templateUrl: './zoom-page.component.html',
  styleUrl: './zoom-page.component.css'
})


export class ZoomPageComponent implements AfterViewInit, OnDestroy {

  public zoom: number = 10;
  public map?: Map

  public currentCenter :LngLat = new LngLat(-3.721088782099514, 40.34365578753386)

  @ViewChild('map') divMap?: ElementRef;

  ngAfterViewInit(): void {
    if (!this.divMap) throw new Error('Map not found');

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentCenter, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.mapListeners()
  }

  ngOnDestroy(): void {
    //Con esto se borran tambien los listeners
    this.map?.remove()
  }



  mapListeners() {
    if (!this.map) throw new Error('Map not found');

    this.map.on('zoom', (event) => {
      this.zoom = this.map!.getZoom();
    })

    this.map.on('zoomend', (event) => {

      if(this.map!.getZoom() < 18)  return

      if(this.map!.getZoom() > 18) {
        this.map!.setZoom(18)
        return
      }
    })

    this.map.on('move', (event) => {
      this.currentCenter = this.map!.getCenter();
    })

  }

  zoomIn() {
    this.map!.zoomIn();
  }


  zoomOut() {
    this.map!.zoomOut();
  }

  zoomChange(value: string) {
    this.map!.setZoom(+value);
  }
}
