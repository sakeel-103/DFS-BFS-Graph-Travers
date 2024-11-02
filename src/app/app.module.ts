import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import for animations
import { RouterModule, Routes } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component'; // Import Contact Us component

// Define routes
const routes: Routes = [
  { path: '', redirectTo: '/contact', pathMatch: 'full' }, // Default route to Contact Us
  { path: 'contact', component: ContactUsComponent }, // Route for Contact Us
  // Add other routes here as needed
];

@NgModule({
  declarations: [
    AppComponent,          // Main app component
    ContactUsComponent     // Contact Us component
  ],
  imports: [
    BrowserModule,             // For web applications
    BrowserAnimationsModule,    // Required for animations (Toastr)
    RouterModule.forRoot(routes), // Enable routing with routes
    ToastrModule.forRoot()      // Initialize Toastr globally
  ],
  providers: [provideAnimations()],
  bootstrap: [AppComponent]     // Bootstrap main app component
})
export class AppModule { }
