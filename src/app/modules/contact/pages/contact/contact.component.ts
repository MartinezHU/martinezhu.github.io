import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from 'src/app/shared/services/email.service';
declare var bootstrap: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  contactForm!: FormGroup;
  isSubmitting = false; // Bandera para controlar el estado del botón

  constructor(private fb: FormBuilder, private emailService: EmailService) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.isSubmitting) {
      return;
    }

    this.isSubmitting = true; // Deshabilitar el botón

    if (this.contactForm.valid) {
      this.emailService
        .sendEmail(this.contactForm.value)
        .then((response) => {
          const toastElement = document.getElementById('liveToast');
          const toast = new bootstrap.Toast(toastElement); // Crear una instancia del toast

          if (response.status == 200) {
            this.contactForm.reset();
            toast.show(); // Mostrar el toast
            this.isSubmitting = false;
          }
        })
        .catch((error) => {
          console.error('Error al enviar correo', error);
        });
    }
  }
}
