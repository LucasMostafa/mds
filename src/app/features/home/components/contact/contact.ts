import { Component, ElementRef, AfterViewInit, ViewChildren, QueryList, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact implements AfterViewInit {

  // --- LÓGICA TARJETA EMAIL ---
  isEmailFormOpen = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  openEmailForm() {
    this.isEmailFormOpen = true;
  }

  closeEmailForm() {
    this.isEmailFormOpen = false;
  }

  sendEmail(event: Event) {
    event.preventDefault();
    console.log('Enviando formulario...');
    alert('¡Gracias! Tu mensaje ha sido enviado. Te responderemos pronto.');
    this.closeEmailForm();
  }

  // --- ANIMACIÓN DE ENTRADA AL SCROLLEAR ---
  // Capturamos todos los elementos con #revealEl (tanto los de la izquierda como los de la derecha)
  @ViewChildren('revealEl') revealElements!: QueryList<ElementRef>;

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Dispara el CSS asignándole la clase visible
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px 25px 0px' // 🔥 Dispara la animación antes
      });

      this.revealElements.forEach(el => {
        observer.observe(el.nativeElement);
      });
    }
  }
}