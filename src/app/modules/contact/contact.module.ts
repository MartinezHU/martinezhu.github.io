import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './pages/contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ContactComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ContactComponent, CommonModule],
})
export class ContactModule {}
