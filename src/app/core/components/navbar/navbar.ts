import { Component } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common'; // <--- IMPORTANTE

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  isMenuOpen = false;

  // Inyectamos el "conductor" (scroller)
  constructor(private scroller: ViewportScroller) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Función para viajar a la sección
  scrollTo(elementId: string) {
    this.isMenuOpen = false; // Cerramos el menú mobile si estaba abierto
    this.scroller.scrollToAnchor(elementId); // Viajamos
  }
}