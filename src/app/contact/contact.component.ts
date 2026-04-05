import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

declare const AOS: any;
declare const emailjs: any;

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent implements OnInit {

  form = {
    senderName: '',
    senderEmail: '',
    inquiryType: '',
    position: '',
    budget: '',
    message: '',
  };

  submitted = false;
  isSending = false;
  successMessage = '';
  errorMessage = '';

  // EmailJS credentials 
  private SERVICE_ID  = 'service_sntvp0o';
  private TEMPLATE_ID = 'template_19njit9';
  private PUBLIC_KEY  = 'kXie1IhljJA_ep7_z';
  

  ngOnInit() {
    if (typeof AOS !== 'undefined') {
      AOS.init({ offset: 0 });
    }
  }

  sendEmail() {
    this.submitted = true;
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.form.senderName || !this.form.senderEmail || !this.form.inquiryType || !this.form.message) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    this.isSending = true;

    const templateParams = {
      sender_name:   this.form.senderName,
      sender_email:  this.form.senderEmail,
      inquiry_type:  this.form.inquiryType,
      position:      this.form.position  || 'N/A',
      budget:        this.form.budget    || 'N/A',
      message:       this.form.message,
    };

    emailjs.send(this.SERVICE_ID, this.TEMPLATE_ID, templateParams, this.PUBLIC_KEY)
      .then(() => {
        this.isSending = false;
        this.successMessage = 'Your inquiry has been sent! I will get back to you soon.';
        this.form = { senderName: '', senderEmail: '', inquiryType: '', position: '', budget: '', message: '' };
        this.submitted = false;
      })
      .catch(() => {
        this.isSending = false;
        this.errorMessage = 'Something went wrong. Please try again or email me directly.';
      });
  }
}