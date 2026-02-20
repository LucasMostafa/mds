import { Component, AfterViewInit, ElementRef, QueryList, ViewChildren, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-bento-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bento-grid.html',
  styleUrl: './bento-grid.scss',
})
export class BentoGrid implements AfterViewInit {

  // 🔥 Capturamos los elementos que van a animarse
  @ViewChildren('revealEl') revealElements!: QueryList<ElementRef>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

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
        rootMargin: '0px 0px 25px 0px' // 🔥 Ajustado para que aparezca antes
      });

      this.revealElements.forEach(el => {
        observer.observe(el.nativeElement);
      });
    }
  }

  // Función para reproducir el video al entrar
  playVideo(videoElement: HTMLVideoElement) {
    videoElement.currentTime = 0;
    videoElement.muted = true; 
    
    const playPromise = videoElement.play();
    
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.log('Interrupted play:', error);
      });
    }
  }

  // Función para detener el video al salir
  stopVideo(videoElement: HTMLVideoElement) {
    videoElement.pause();
    videoElement.currentTime = 0; 
  }
}