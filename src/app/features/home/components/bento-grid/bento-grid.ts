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
        rootMargin: '0px 0px 25px 0px' 
      });

      this.revealElements.forEach(el => {
        observer.observe(el.nativeElement);
      });
    }
  }

  playVideo(videoElement: HTMLVideoElement) {
    // 🔥 BLOQUEO PARA MOBILE: Solo reproduce en escritorio
    if (isPlatformBrowser(this.platformId) && window.innerWidth <= 900) {
      return; 
    }

    videoElement.currentTime = 0;
    videoElement.muted = true; 
    
    const playPromise = videoElement.play();
    
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.log('Interrupted play:', error);
      });
    }
  }

  stopVideo(videoElement: HTMLVideoElement) {
    // 🔥 BLOQUEO PARA MOBILE
    if (isPlatformBrowser(this.platformId) && window.innerWidth <= 900) {
      return; 
    }

    videoElement.pause();
    videoElement.currentTime = 0; 
  }
}