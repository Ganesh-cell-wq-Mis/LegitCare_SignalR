import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ChatHistoryComponent } from './components/chat-history/chat-history.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  { path: 'Home', component: HomeComponent },
  { path: 'History', component: ChatHistoryComponent },
//   { path: 'Register', component: RegisterComponent },
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
