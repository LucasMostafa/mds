import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-solutions-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './solutions-view.html',
  styleUrls: ['./solutions-view.scss']
})
export class SolutionsView {

  // Función para volver al Home y forzar la pantalla de carga inicial
  goBackHome() {
    window.location.href = '/'; 
  }
}