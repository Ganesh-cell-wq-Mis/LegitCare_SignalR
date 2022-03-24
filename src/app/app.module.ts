import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatPaginatorModule} from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { ChatComponent } from './components/chat/chat.component';
import { LoginComponent } from './components/login/login.component';
import { Serviceendpoint } from './services/data.service.spec';
import { HeaderComponent } from './components/header/header.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { HomeComponent } from './components/home/home.component';
import { ChatHistoryComponent } from './components/chat-history/chat-history.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { RegisterComponent } from './components/register/register.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ChatComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    ChatHistoryComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    DragDropModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatTableModule,
    ToastrModule.forRoot(
      
    )
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [Serviceendpoint],
  bootstrap: [AppComponent]
})
export class AppModule { }
