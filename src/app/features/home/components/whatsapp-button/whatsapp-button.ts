import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-whatsapp-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './whatsapp-button.html',
  styleUrl: './whatsapp-button.scss'
})
export class WhatsappButton {
  
  isVisible = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      // Obtenemos la altura de la pantalla del usuario (el 100vh de tu Hero)
      const heroHeight = window.innerHeight;
      const currentScroll = window.scrollY || document.documentElement.scrollTop;

      // Si scrolleó hacia abajo más de la mitad del Hero, mostramos el botón
      if (currentScroll > heroHeight * 0.5) {
        this.isVisible = true;
      } else {
        this.isVisible = false;
      }
    }
  }
}