import { Component, AfterViewInit, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { CommonModule, ViewportScroller, isPlatformBrowser } from '@angular/common';

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
    private scroller: ViewportScroller,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  scrollTo(elementId: string) {
    this.isMenuOpen = false;
    this.scroller.scrollToAnchor(elementId);
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
          // --- LA SOLUCIÓN ESTÁ ACÁ ---
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