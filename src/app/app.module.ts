import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { OrdenesComponent } from './components/ordenes/ordenes.component';
import { OrdenComponent } from './components/orden/orden.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    OrdenesComponent,
    OrdenComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    LoggerModule.forRoot({
      level: NgxLoggerLevel.DEBUG,
      serverLoggingUrl: 'http://localhost:3000/api/logs',
      serverLogLevel: NgxLoggerLevel.OFF,
      enableSourceMaps: true
    })
  ],
  providers: [],
  entryComponents: [OrdenComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
