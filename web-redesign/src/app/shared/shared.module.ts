import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BannerComponent } from './layout/banner/banner.component';
import { fakeBackendProvider } from './services/interceptors/fake-backend.interceptor';
import { ToastMessageComponent } from './layout/toast-message/toast-message.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    ToastMessageComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    NgbToastModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    ToastMessageComponent
  ],
  providers: [
    fakeBackendProvider
  ]
})
export class SharedModule { }
