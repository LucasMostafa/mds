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
  
  // 🔥 NUEVO: Rastrea la sección actual
  activeSection: string = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  scrollTo(elementId: string) {
    this.isMenuOpen = false; 

    if (isPlatformBrowser(this.platformId)) {
      const element = document.getElementById(elementId);
      
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start'      
        });
      }
    }
  }

  @HostListener('window:resize', [])
  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      if (window.innerWidth > 768 && this.isMenuOpen) {
        this.isMenuOpen = false;
      }
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      
      // --- 1. OBSERVER PARA EL TEMA OSCURO (El que ya tenías blindado para iOS) ---
      const contactSection = document.getElementById('contacto');
      if (contactSection) {
        const darkThemeObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && entry.boundingClientRect.top < 150) {
              this.isDarkTheme = true;
            } else {
              this.isDarkTheme = false;
            }
          });
        }, {
          rootMargin: '-70px 0px -90% 0px' 
        });
        darkThemeObserver.observe(contactSection);
      }

      // --- 2. 🔥 NUEVO OBSERVER PARA EL SUBRAYADO ACTIVO 🔥 ---
      // Lista de todos los IDs de tus componentes
      const sectionIds = ['hero', 'servicios', 'proceso', 'estudio', 'proyectos', 'contacto'];
      
      const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Actualiza la variable con el ID del componente que está en pantalla
            this.activeSection = entry.target.id;
          }
        });
      }, {
        // Crea una línea imaginaria un poco más arriba del medio de la pantalla
        // La sección que cruce esa línea se considera la "activa"
        rootMargin: '-100px 0px -80% 0px' 
      });

      sectionIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
          scrollObserver.observe(element);
        }
      });
    }
  }
}