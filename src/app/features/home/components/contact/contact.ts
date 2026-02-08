import { Component, ElementRef, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true, // Si usas standalone components
  imports: [CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact implements AfterViewInit {

  // Buscamos todos los elementos con #animateCard
  @ViewChildren('animateCard') cards!: QueryList<ElementRef>;

  ngAfterViewInit() {
    // Configuramos el observador
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Agregamos la clase que dispara el CSS
          entry.target.classList.add('visible');
          // Dejamos de observar para que no se repita
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1 // Se activa apenas se ve un 10% del elemento
    });

    // Empezamos a observar
    this.cards.forEach(card => {
      observer.observe(card.nativeElement);
    });
  }
}