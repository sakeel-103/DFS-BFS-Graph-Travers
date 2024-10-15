import { Component, Inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
  imports: [RouterModule, ReactiveFormsModule, CommonModule], // Add CommonModule here
})
export class ContactUsComponent {
  contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    @Inject(AuthService) private contactService: AuthService,
    private router: Router
  ) {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      question: ['', Validators.required],
      feedback: [''],
      suggestion: ['']
    });
  }

  onSubmit() {
    const contactData = this.contactForm.value;

    if (this.contactForm.valid) {
      this.contactService.submitContactForm(contactData).subscribe(
        (response: any) => {
          console.log('Form submitted successfully!', response);
          this.toastr.success('Thank you for your feedback!', 'Success');
          this.resetForm();
        },
        (error: any) => {
          console.error('Error submitting form:', error);
          this.toastr.error('There was an error submitting your form. Please try again later.', 'Error');
        }
      );
    } else {
      this.toastr.error('Please fill out the form correctly.', 'Error');
    }
  }

  resetForm() {
    this.contactForm.reset();
  }
}
