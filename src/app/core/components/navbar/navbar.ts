import { Component, AfterViewInit, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar implements AfterViewInit {
  isMenuOpen = false;
  isDarkTheme = false;

  constructor(
    // Ya no necesitamos el ViewportScroller de Angular
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // 🔥 LÓGICA DE SCROLL CORREGIDA
  scrollTo(elementId: string) {
    this.isMenuOpen = false; // Cierra el menú en móvil

    if (isPlatformBrowser(this.platformId)) {
      const element = document.getElementById(elementId);
      
      if (element) {
        // scrollIntoView SI respeta el scroll-margin-top que pusimos en el SCSS
        element.scrollIntoView({ 
          behavior: 'smooth', // Animación fluida
          block: 'start'      // Alinea el elemento en la parte superior de la pantalla (pero frenando por el scroll-margin)
        });
      }
    }
  }

  // --- DETECTAR CAMBIO DE TAMAÑO DE PANTALLA ---
  @HostListener('window:resize', [])
  onResize() {
    // Si agrandan la pantalla a modo escritorio (> 768px) y el menú está abierto, se cierra solo.
    if (isPlatformBrowser(this.platformId)) {
      if (window.innerWidth > 768 && this.isMenuOpen) {
        this.isMenuOpen = false;
      }
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const contactSection = document.getElementById('contacto');

      if (contactSection) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            this.isDarkTheme = entry.isIntersecting;
          });
        }, {
          // top: '-70px' -> Restamos la altura del navbar aprox.
          // bottom: '-90%' -> ¡CLAVE! Ignoramos el 90% de abajo de la pantalla.
          // Así solo se activa cuando la sección llega bien arriba.
          rootMargin: '-70px 0px -90% 0px' 
        });

        observer.observe(contactSection);
      }
    }
  }
}