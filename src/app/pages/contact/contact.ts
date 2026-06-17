import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private readonly emailJsEndpoint = 'https://api.emailjs.com/api/v1.0/email/send';
  private readonly emailJsServiceId = 'service_9j64gfk';
  private readonly emailJsTemplateId = 'template_b3n597e';
  private readonly emailJsPublicKey = 'NzVlOWQy4WWhHEFns';

  isSending = false;
  submitStatus: 'idle' | 'success' | 'error' = 'idle';

  contactForm;

  constructor(private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.nonNullable.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(4)]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  get name() {
    return this.contactForm.controls.name;
  }

  get email() {
    return this.contactForm.controls.email;
  }

  get subject() {
    return this.contactForm.controls.subject;
  }

  get message() {
    return this.contactForm.controls.message;
  }

  async sendMessage(): Promise<void> {
    this.submitStatus = 'idle';

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSending = true;

    const { name, email, subject, message } = this.contactForm.getRawValue();

    try {
      const response = await fetch(this.emailJsEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: this.emailJsServiceId,
          template_id: this.emailJsTemplateId,
          user_id: this.emailJsPublicKey,
          template_params: {
            name,
            from_name: name,
            email,
            from_email: email,
            reply_to: email,
            to_name: 'Héctor',
            to_email: 'hu.martinezcornejo@gmail.com',
            subject,
            message,
          },
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`EmailJS request failed with status ${response.status}: ${errorMessage}`);
      }

      this.submitStatus = 'success';
      this.contactForm.reset();
    } catch (error) {
      console.error('Error sending contact email:', error);
      this.submitStatus = 'error';
    } finally {
      this.isSending = false;
    }
  }
}
