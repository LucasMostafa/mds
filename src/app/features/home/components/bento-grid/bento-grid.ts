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

  // 🔥 Estado para el efecto Acordeón ('ampas', 'gnc', 'kdonna' o null)
  expandedCard: string | null = null;

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
    if (isPlatformBrowser(this.platformId) && window.innerWidth <= 900) {
      return; 
    }

    videoElement.pause();
    videoElement.currentTime = 0; 
  }

  // 🔥 Lógica del botón interactivo
  toggleExpand(cardId: string, event: Event) {
    // Evita que el clic abra la URL del proyecto en otra pestaña
    event.preventDefault();
    event.stopPropagation();

    // Si ya está abierta, la cerramos (null). Si no, la abrimos (cerrando cualquier otra).
    if (this.expandedCard === cardId) {
      this.expandedCard = null;
    } else {
      this.expandedCard = cardId;
    }
  }
}