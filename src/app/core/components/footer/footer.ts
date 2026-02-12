import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
  
  currentYear = new Date().getFullYear();

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    
    if (element) {
      // OFFSET AGRESIVO: 150px
      // Esto fuerza al scroll a detenerse mucho antes de llegar al título
      // para compensar tu Navbar flotante grande.
      const offset = 0; 
      
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
      console.warn('No se encontró la sección:', sectionId);
    }
  }
}