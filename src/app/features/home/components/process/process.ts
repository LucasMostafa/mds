import { Component, ElementRef, AfterViewInit, ViewChildren, QueryList, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-process',
  standalone: true,
  templateUrl: './process.html',
  styleUrl: './process.scss'
})
export class Process implements AfterViewInit {

  @ViewChildren('revealEl') revealElements!: QueryList<ElementRef>;
  @ViewChildren('scrollItem') scrollItems!: QueryList<ElementRef>; // 🔥 Los elementos a vigilar

  private scrollObserver: IntersectionObserver | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      
      // 1. VIGILANTE DE ANIMACIÓN DE ENTRADA (Mismo de siempre)
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      this.revealElements.forEach(el => {
        revealObserver.observe(el.nativeElement);
      });

      // 2. ACTIVAR EL VIGILANTE DE SCROLL PARA MOBILE
      this.setupMobileScrollObserver();
    }
  }

  // Vuelve a calcular si agrandás o achicás la pantalla
  @HostListener('window:resize')
  onResize() {
    this.setupMobileScrollObserver();
  }

  private setupMobileScrollObserver() {
    if (!isPlatformBrowser(this.platformId)) return;

    // Si ya existe un vigilante, lo matamos para no duplicar
    if (this.scrollObserver) {
      this.scrollObserver.disconnect();
    }

    // Solo lo activamos en pantallas chicas (mobile)
    if (window.innerWidth <= 900) {
      this.scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active-mobile');
          } else {
            entry.target.classList.remove('active-mobile');
          }
        });
      }, {
        // 🔥 MAGIA: Solo se activa si la tarjeta pasa por el medio 40% de la pantalla
        rootMargin: '-30% 0px -30% 0px',
        threshold: 0
      });

      // Le decimos que vigile cada paso y tarjeta
      this.scrollItems.forEach(el => {
        this.scrollObserver!.observe(el.nativeElement);
      });
    } else {
      // Si la pantalla es grande, limpiamos las clases por las dudas
      this.scrollItems?.forEach(el => {
        el.nativeElement.classList.remove('active-mobile');
      });
    }
  }
}