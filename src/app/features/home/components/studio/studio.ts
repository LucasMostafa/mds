import { Component, ElementRef, QueryList, ViewChildren, ViewChild, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-studio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './studio.html',
  styleUrl: './studio.scss',
})
export class Studio implements AfterViewInit {

  @ViewChildren('revealEl') revealElements!: QueryList<ElementRef>;
  @ViewChild('bgVideo') bgVideo!: ElementRef<HTMLVideoElement>;

  // 🔥 CONSTELACIÓN DE TECNOLOGÍAS 🔥
  // Ajusta los nombres de los archivos en 'icon' exactamente como los subas a tu carpeta assets
  techStack = [
    { name: 'Angular', icon: '/assets/logos/angular.png', top: '5%', left: '25%', delay: '0s', size: '85px' },
    { name: 'Google APIs', icon: '/assets/logos/google-apis.png', top: '15%', left: '75%', delay: '1.2s', size: '65px' },
    { name: 'TypeScript', icon: '/assets/logos/ts.png', top: '30%', left: '10%', delay: '0.5s', size: '70px' },
    { name: 'React', icon: '/assets/logos/react.png', top: '40%', left: '85%', delay: '2.1s', size: '75px' },
    { name: 'Node.js', icon: '/assets/logos/nodejs.png', top: '75%', left: '15%', delay: '1.8s', size: '80px' },
    { name: 'SQL', icon: '/assets/logos/sql.png', top: '65%', left: '45%', delay: '0.8s', size: '65px' },
    { name: 'MySQL', icon: '/assets/logos/mysql.png', top: '85%', left: '75%', delay: '2.5s', size: '70px' },
    { name: 'HTML5', icon: '/assets/logos/html.png', top: '25%', left: '50%', delay: '0.3s', size: '60px' },
    { name: 'CSS3', icon: '/assets/logos/css.png', top: '45%', left: '35%', delay: '1.5s', size: '60px' },
    { name: 'SCSS', icon: '/assets/logos/scss.png', top: '55%', left: '60%', delay: '0.7s', size: '65px' },
    { name: 'C#', icon: '/assets/logos/csharp.png', top: '80%', left: '40%', delay: '2.2s', size: '70px' },
    { name: 'JavaScript', icon: '/assets/logos/js.png', top: '20%', left: '90%', delay: '0.4s', size: '65px' },
    { name: 'Figma', icon: '/assets/logos/figma.png', top: '90%', left: '5%', delay: '2.8s', size: '70px' },
    { name: 'Cloudflare', icon: '/assets/logos/cloudflare.png', top: '0%', left: '55%', delay: '1.7s', size: '75px' },
    { name: 'Git', icon: '/assets/logos/git.png', top: '55%', left: '5%', delay: '1.1s', size: '55px' },
    { name: 'WordPress', icon: '/assets/integrations/wordpress.png', top: '28%', left: '65%', delay: '3.1s', size: '70px' }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      
      // --- 1. LÓGICA DE REPRODUCCIÓN DEL VIDEO ---
      if (this.bgVideo) {
        const videoElement = this.bgVideo.nativeElement;
        
        videoElement.muted = true;
        
        const playPromise = videoElement.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.warn('El autoplay fue prevenido por el navegador, intentando de nuevo...', error);
            setTimeout(() => {
              videoElement.play();
            }, 500);
          });
        }
      }

      // --- 2. LÓGICA DE ANIMACIÓN AL SCROLLEAR ---
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