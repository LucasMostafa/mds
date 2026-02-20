import { Component, AfterViewInit, ElementRef, QueryList, ViewChildren, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-what-we-do',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './what-we-do.html',
  styleUrl: './what-we-do.scss'
})
export class WhatWeDo implements AfterViewInit {
  // Estado de las cartas
  isFlipped1 = false;
  isFlipped2 = false;
  isFlipped3 = false;

  // 🔥 Capturamos todos los elementos que tienen la referencia #revealEl en el HTML
  @ViewChildren('revealEl') revealElements!: QueryList<ElementRef>;

  // Inyectamos PLATFORM_ID para asegurarnos de que el IntersectionObserver solo corra en el navegador (evita errores con SSR)
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  flipCard(cardNumber: number) {
    if (cardNumber === 1) this.isFlipped1 = !this.isFlipped1;
    if (cardNumber === 2) this.isFlipped2 = !this.isFlipped2;
    if (cardNumber === 3) this.isFlipped3 = !this.isFlipped3;
  }

  // --- REPRODUCIR VIDEO (Hover) ---
  playVideo(videoElement: HTMLVideoElement) {
    videoElement.currentTime = 0; // Reinicia el video
    videoElement.muted = true;    // Asegura mute para autoplay
    
    const playPromise = videoElement.play();
    
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        // Autoplay bloqueado o interrupción rápida (normal en browsers)
        console.log('Video play prevented:', error);
      });
    }
  }

  // --- PAUSAR VIDEO (Leave) ---
  stopVideo(videoElement: HTMLVideoElement) {
    videoElement.pause();
    // Opcional: Volver a 0 para que la próxima vez arranque de inicio
    // videoElement.currentTime = 0; 
  }

  // --- LÓGICA DE ANIMACIÓN AL SCROLLEAR ---
  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Le agrega la clase .visible al elemento cuando entra en pantalla
            entry.target.classList.add('visible');
            
            // Dejamos de observarlo para que la animación ocurra solo la primera vez
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1, // Se activa cuando al menos el 10% del elemento es visible
        rootMargin: '0px 0px 25px 0px' // Margen sutil para que anime justo antes de aparecer del todo
      });

      // Le aplicamos el observador a cada elemento capturado
      this.revealElements.forEach(el => {
        observer.observe(el.nativeElement);
      });
    }
  }
}