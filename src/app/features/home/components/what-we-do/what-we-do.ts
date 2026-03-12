import { Component, AfterViewInit, ElementRef, QueryList, ViewChildren, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
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

  // 🔥 Estado del Banner en Mobile
  isBannerActive = false;

  @ViewChildren('revealEl') revealElements!: QueryList<ElementRef>;
  @ViewChildren('videoEl') videoElements!: QueryList<ElementRef<HTMLVideoElement>>;
  
  // 🔥 Capturamos el Banner
  @ViewChild('supportBanner') supportBanner!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  flipCard(cardNumber: number, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    
    if (cardNumber === 1) this.isFlipped1 = !this.isFlipped1;
    if (cardNumber === 2) this.isFlipped2 = !this.isFlipped2;
    if (cardNumber === 3) this.isFlipped3 = !this.isFlipped3;
  }

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

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      
      // 1. Observer para las animaciones de entrada
      const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            animationObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1, 
        rootMargin: '0px 0px 25px 0px' 
      });

      this.revealElements.forEach(el => {
        animationObserver.observe(el.nativeElement);
      });

      // 2. Observer: Autoplay para Videos en Mobile
      const videoObserver = new IntersectionObserver((entries) => {
        if (window.innerWidth <= 768) {
          entries.forEach(entry => {
            const video = entry.target as HTMLVideoElement;
            if (entry.isIntersecting) {
              this.playVideo(video);
            } else {
              this.stopVideo(video);
            }
          });
        }
      }, {
        threshold: 0.6 
      });

      this.videoElements.forEach(video => {
        videoObserver.observe(video.nativeElement);
      });

      // 🔥 3. NUEVO OBSERVER: Interacción del Banner en Mobile
      if (this.supportBanner) {
        const bannerObserver = new IntersectionObserver((entries) => {
          if (window.innerWidth <= 768) {
            entries.forEach(entry => {
              // Si el banner entra un 60% en la pantalla, lo iluminamos
              this.isBannerActive = entry.isIntersecting;
            });
          }
        }, {
          threshold: 0.6 // Mismo umbral que los videos para que se sienta parejo
        });

        bannerObserver.observe(this.supportBanner.nativeElement);
      }
    }
  }
}