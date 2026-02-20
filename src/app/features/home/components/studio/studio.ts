import { Component, ElementRef, QueryList, ViewChildren, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-studio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './studio.html',
  styleUrl: './studio.scss',
})
export class Studio implements AfterViewInit {

  // 🔥 Capturamos TODOS los elementos que tengan #revealEl (Textos e Imagen)
  @ViewChildren('revealEl') revealElements!: QueryList<ElementRef>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Agregamos la clase .visible para disparar el CSS (ya sea animate-up o el translateX)
            entry.target.classList.add('visible');
            // Dejamos de observar para que no se anime de nuevo al subir
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1, // Se dispara cuando se ve al menos el 10% del elemento
        rootMargin: '0px 0px 25px 0px'
      });

      // Observamos cada uno de los elementos capturados
      this.revealElements.forEach(el => {
        observer.observe(el.nativeElement);
      });
    }
  }
}