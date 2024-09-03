import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor() {}

  sendEmail(formData: any): Promise<EmailJSResponseStatus> {
    const serviceID = 'service_9j64gfk';
    const templateID = 'template_b3n597e';
    const publicKey = 'NzVlOWQy4WWhHEFns';

    return emailjs.send(serviceID, templateID, formData, publicKey);
  }
}
