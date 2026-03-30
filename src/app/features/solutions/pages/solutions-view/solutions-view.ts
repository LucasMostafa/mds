import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// 🔥 IMPORTAMOS EL BOTÓN DE WHATSAPP 🔥
import { WhatsappButton } from '../../../home/components/whatsapp-button/whatsapp-button';

@Component({
  selector: 'app-solutions-view',
  standalone: true,
  imports: [CommonModule, WhatsappButton], 
  templateUrl: './solutions-view.html',
  styleUrls: ['./solutions-view.scss']
})
export class SolutionsView implements OnInit {

  // Variable que controla la pantalla de carga nueva
  showModuleLoader = true; 

  ngOnInit() {
    // 1. Clava el scroll en la coordenada 0,0 de forma instantánea
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' 
    });

    // 2. Simulamos la carga de la plataforma "Modular" (2.8 segundos)
    setTimeout(() => {
      this.showModuleLoader = false;
    }, 2800);
  }

  // Función para volver al Home y forzar la pantalla de carga inicial
  goBackHome() {
    window.location.href = '/'; 
  }

  // Función para volver arriba suavemente
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}