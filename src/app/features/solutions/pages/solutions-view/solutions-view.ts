import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// 🔥 IMPORTAMOS EL BOTÓN DE WHATSAPP 🔥
import { WhatsappButton } from '../../../home/components/whatsapp-button/whatsapp-button';

@Component({
  selector: 'app-solutions-view',
  standalone: true,
  imports: [CommonModule, WhatsappButton], // Lo declaramos en los imports
  templateUrl: './solutions-view.html',
  styleUrls: ['./solutions-view.scss']
})
export class SolutionsView implements OnInit {

  // Esta función se ejecuta automáticamente cuando el componente carga
  ngOnInit() {
    // Clava el scroll en la coordenada 0,0 de forma instantánea
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' /* Esto mata cualquier efecto de "scroll suave" del CSS */
    });
  }

  // Función para volver al Home y forzar la pantalla de carga inicial
  goBackHome() {
    window.location.href = '/'; 
  }

  // 🔥 NUEVA FUNCIÓN PARA VOLVER ARRIBA 🔥
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}