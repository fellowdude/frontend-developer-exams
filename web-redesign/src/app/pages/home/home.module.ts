import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AboutUsComponent } from './about-us/about-us.component';
import { ApplicationComponent } from './application/application.component';
import { EventsComponent } from './events/events.component';
import { CommunityComponent } from './community/community.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { SubscriptionComponent } from './subscription/subscription.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
];

@NgModule({
  declarations: [
    HomeComponent,
    AboutUsComponent,
    ApplicationComponent,
    EventsComponent,
    CommunityComponent,
    TestimonialsComponent,
    SubscriptionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class HomeModule { }
