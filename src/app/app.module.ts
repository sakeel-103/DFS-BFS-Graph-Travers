import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component'; // Import your Contact Us component
import { RouterModule, Routes } from '@angular/router';

// Define your routes
const routes: Routes = [
  { path: '', redirectTo: '/contact', pathMatch: 'full' }, // Redirect to Contact Us by default
  { path: 'contact', component: ContactUsComponent }, // Route for Contact Us
  // Add other routes here
];

@NgModule({
  declarations: [
    AppComponent,          // Your main app component
    ContactUsComponent     // Declare your Contact Us component
  ],
  imports: [
    BrowserModule,         // Browser module for web applications
    RouterModule.forRoot(routes) // Enable routing
  ],
  providers: [],
  bootstrap: [AppComponent] // Bootstrap your main app component
})
export class AppModule { }

