import { Component, ElementRef, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // NECESARIO para el formulario

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

  // --- ANIMACIÓN DE ENTRADA (Tu código original) ---
  @ViewChildren('animateCard') cards!: QueryList<ElementRef>;

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    this.cards.forEach(card => {
      observer.observe(card.nativeElement);
    });
  }
}