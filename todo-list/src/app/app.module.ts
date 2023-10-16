import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { TodoService } from './shared/services/api/todo/todo.service';
import { TodoService as MockTodoService } from './shared/services/api/todo/todo.mock.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [
    { provide: TodoService, useClass: MockTodoService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
