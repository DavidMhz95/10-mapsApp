import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';


interface MarkerColor {
  color: string;
  marker: Marker;
}

interface PlainMarker{
  color:string;
  lnglat: number[];
}

@Component({
  selector: 'app-markers-page',
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent implements AfterViewInit {

  public markers: MarkerColor[] = []
  public map?: Map
  public currentCenter: LngLat = new LngLat(-3.721088782099514, 40.34365578753386)

  @ViewChild('map') divMap?: ElementRef;

  ngAfterViewInit(): void {
    if (!this.divMap) throw new Error('Map not found');

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentCenter, // starting position [lng, lat]
      zoom: 10, // starting zoom
    });

    this.readFromLocalStorage()



    // const marketHtml = document.createElement('div')
    // marketHtml.innerHTML = 'Hola Mundo'

    // const market = new Marker({
    //   color: 'red',
    //   // element: marketHtml
    // }).setLngLat(this.currentCenter).addTo(this.map)

  }


  createMarker() {
    const color = '#xxxxxx'.replace(/x/g, y => (Math.random() * 16 | 0).toString(16));
    const lngLat = this.map?.getCenter() as LngLat
    this.addMarker(lngLat, color)
  }

  addMarker(lnglat: LngLat, color: string) {
    if (!this.map) throw new Error('Map not found')

    const marker = new Marker({
      color: color,
      draggable: true
    }).setLngLat(lnglat).addTo(this.map)

    this.markers.push({
      color,
      marker
    })

    this.saveToLocalStorage()

    marker.on('dragend', () => {
      this.saveToLocalStorage()
     })

  }

  removeMarker(index: number) {
    this.markers[index].marker?.remove()
    this.markers.splice(index, 1)
  }


  flyTo(market: Marker) {
    this.map?.flyTo({
      zoom: 14,
      center: market.getLngLat()

    })

  }


  saveToLocalStorage(){
    const plainMarkers: PlainMarker[] = this.markers.map(({color,marker}) => {
      return{
        color,
        lnglat: marker.getLngLat().toArray()
      }
    })

    localStorage.setItem('cleanMarkets', JSON.stringify(plainMarkers))
  }

  readFromLocalStorage(){
    const plainMarkersString = localStorage.getItem('cleanMarkets') ?? '[]'
    const plainMarkers = JSON.parse(plainMarkersString) as PlainMarker[]
    console.log(plainMarkers)

    plainMarkers.forEach(({color, lnglat}) => {
      const [lng, lat] = lnglat
      const coors = new LngLat(lng, lat)

      this.addMarker(coors, color)
    })
  }



}
