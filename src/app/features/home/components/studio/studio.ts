import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-studio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './studio.html',
  styleUrl: './studio.scss',
})
export class Studio implements AfterViewInit {

  // Referencia al elemento de la imagen
  @ViewChild('animateImage') imageColumn!: ElementRef;

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Agregamos la clase .visible para disparar el CSS
          entry.target.classList.add('visible');
          // Dejamos de observar para que no se anime de nuevo
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2 // Se dispara cuando se ve el 20% de la imagen
    });

    if (this.imageColumn) {
      observer.observe(this.imageColumn.nativeElement);
    }
  }
}