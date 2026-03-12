import { Component, ElementRef, AfterViewInit, ViewChildren, QueryList, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact implements AfterViewInit {

  isEmailFormOpen = false;
  
  // 🔥 Nuevo estado para controlar la animación del botón
  buttonState: 'idle' | 'sending' | 'sent' = 'idle';

  contactData = {
    name: '',
    email: '',
    message: ''
  };

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  openEmailForm() {
    this.isEmailFormOpen = true;
  }

  closeEmailForm() {
    this.isEmailFormOpen = false;
    // Si se cierra manualmente, reseteamos el botón
    setTimeout(() => this.buttonState = 'idle', 500); 
  }

  sendEmail(form: NgForm) {
    if (form.invalid) {
      Object.keys(form.controls).forEach(field => {
        const control = form.control.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      return; 
    }

    event?.preventDefault();
    
    // 1. Cambiamos el estado a "sending" (esto dispara la barra de progreso en CSS)
    this.buttonState = 'sending';

    // 2. Simulamos el tiempo que tarda en mandarse el mail al servidor (2 segundos)
    setTimeout(() => {
      
      // Acá iría el HTTP POST a tu backend
      console.log('Datos listos para enviar al backend:', this.contactData);
      
      // 3. Cambiamos a estado "sent" (¡Mensaje enviado!)
      this.buttonState = 'sent';
      
      // 4. Esperamos 2.5 segundos para que el usuario lea que se envió bien, y luego cerramos todo.
      setTimeout(() => {
        form.resetForm();
        this.closeEmailForm();
      }, 2500);

    }, 2000); // 2000 ms = 2 segundos de "carga"
  }

  @ViewChildren('revealEl') revealElements!: QueryList<ElementRef>;

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px 25px 0px' 
      });

      this.revealElements.forEach(el => {
        observer.observe(el.nativeElement);
      });
    }
  }
}