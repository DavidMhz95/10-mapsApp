import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
(mapboxgl as any).accessToken = 'pk.eyJ1IjoiZGF2aWRtaHo5NSIsImEiOiJjbTJjNmk0dzQwdG5zMmpzZjZ2OTNya214In0.ULfVA8AAv_0MfDmiwenbpg';

import { MapsRoutingModule } from './maps-routing.module';
import { MiniMapComponent } from './components/mini-map/mini-map.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';
import { FullScreenPageComponent } from './pages/full-screen-page/full-screen-page.component';
import { MarkersPageComponent } from './pages/markers-page/markers-page.component';
import { PropertiesPageComponent } from './pages/properties-page/properties-page.component';
import { ZoomPageComponent } from './pages/zoom-page/zoom-page.component';
import { CounterAloneComponent } from "../alone/components/counter-alone/counter-alone.component";


@NgModule({
  declarations: [
    MiniMapComponent,
    MapsLayoutComponent,
    FullScreenPageComponent,
    MarkersPageComponent,
    PropertiesPageComponent,
    ZoomPageComponent
  ],
  imports: [
    CommonModule,
    MapsRoutingModule,
    CounterAloneComponent,
    SideMenuComponent
]
})
export class MapsModule { }
