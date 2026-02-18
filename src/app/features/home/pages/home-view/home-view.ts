import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { BentoGrid } from '../../components/bento-grid/bento-grid';
import { Navbar } from '../../../../core/components/navbar/navbar';
import { WhatWeDo } from '../../components/what-we-do/what-we-do';
import { Studio } from '../../components/studio/studio';
import { Contact } from '../../components/contact/contact';

@Component({
  selector: 'app-home-view',
  standalone: true,
  imports: [CommonModule, BentoGrid, Navbar, WhatWeDo, Studio, Contact],
  templateUrl: './home-view.html',
  styleUrl: './home-view.scss',
})
export class HomeView {
  isSpotlightActive: boolean = true;
  
  mouseX: number = 0;
  mouseY: number = 0;

  toggleSpotlight() {
    this.isSpotlightActive = !this.isSpotlightActive;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    // Si el foco está apagado, no gastamos recursos calculando
    if (!this.isSpotlightActive) return;

    // 1. Obtenemos el elemento Hero
    const heroElement = document.getElementById('hero');

    if (heroElement) {
      // 2. Obtenemos su posición y dimensiones en tiempo real (considera el scroll)
      const rect = heroElement.getBoundingClientRect();

      // 3. Verificamos si el mouse está DENTRO del área del Hero
      // (Opcional: si querés que la luz se apague apenas salís, podés agregar un if aquí)
      // Pero como el hero tiene overflow: hidden, la luz se cortará sola visualmente.

      // 4. Calculamos la posición RELATIVA (Matemática clave para que no se desfase)
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    }
  }
}