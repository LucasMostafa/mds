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

  @ViewChildren('revealEl') revealElements!: QueryList<ElementRef>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // Agregamos Event como parámetro para detener la propagación del click
  flipCard(cardNumber: number, event?: Event) {
    if (event) {
      event.stopPropagation(); // Evita que el click pase a la tarjeta y reproduzca el video en móvil
    }
    
    if (cardNumber === 1) this.isFlipped1 = !this.isFlipped1;
    if (cardNumber === 2) this.isFlipped2 = !this.isFlipped2;
    if (cardNumber === 3) this.isFlipped3 = !this.isFlipped3;
  }

  // --- LÓGICA DE VIDEO PARA DESKTOP ---
  playVideoDesktop(videoElement: HTMLVideoElement) {
    if (window.innerWidth > 768) {
      this.playVideo(videoElement);
    }
  }

  stopVideoDesktop(videoElement: HTMLVideoElement) {
    if (window.innerWidth > 768) {
      this.stopVideo(videoElement);
    }
  }

  // --- LÓGICA DE VIDEO PARA MOBILE (Tap to toggle) ---
  toggleVideoMobile(videoElement: HTMLVideoElement) {
    if (window.innerWidth <= 768) {
      if (videoElement.paused) {
        this.playVideo(videoElement);
      } else {
        this.stopVideo(videoElement);
      }
    }
  }

  // Funciones core de reproducción pura
  private playVideo(videoElement: HTMLVideoElement) {
    videoElement.muted = true;    
    const playPromise = videoElement.play();
    
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.log('Video play prevented:', error);
      });
    }
  }

  private stopVideo(videoElement: HTMLVideoElement) {
    videoElement.pause();
  }

  // --- LÓGICA DE ANIMACIÓN AL SCROLLEAR ---
  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1, 
        rootMargin: '0px 0px 25px 0px' 
      });

      this.revealElements.forEach(el => {
        observer.observe(el.nativeElement);
      });
    }
  }
}