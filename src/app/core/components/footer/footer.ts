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
  
  // Estado del texto del botón de email
  emailText = 'Email'; 

  // --- Lógica de Scroll Manual ---
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    
    if (element) {
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

  // --- Lógica de Copiar Email ---
  copyEmail(event: Event) {
    event.preventDefault(); // Evita saltos de página
    
    const email = 'mostafadevsstudio@gmail.com';

    // Usamos la API del portapapeles del navegador
    navigator.clipboard.writeText(email).then(() => {
      
      // 1. Feedback visual inmediato
      this.emailText = '¡Copiado!';

      // 2. Volver al texto original después de 2 segundos
      setTimeout(() => {
        this.emailText = 'Email';
      }, 2000);

    }).catch(err => {
      console.error('Error al copiar el email:', err);
    });
  }
}