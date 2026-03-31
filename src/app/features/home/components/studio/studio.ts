import { Component, ElementRef, QueryList, ViewChildren, ViewChild, AfterViewInit, Inject, PLATFORM_ID, HostListener } from '@angular/core';
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

  // 🔥 ESCRITORIO (Intacto)
  private baseTechStackDesktop = [
    { name: 'Angular', icon: '/assets/logos/angular.webp', top: '5%', left: '25%', delay: '0s', size: '85px' },
    { name: 'Google APIs', icon: '/assets/logos/google-apis.webp', top: '15%', left: '75%', delay: '1.2s', size: '65px' },
    { name: 'TypeScript', icon: '/assets/logos/ts.webp', top: '30%', left: '10%', delay: '0.5s', size: '70px' },
    { name: 'React', icon: '/assets/logos/react.webp', top: '40%', left: '85%', delay: '2.1s', size: '75px' },
    { name: 'Node.js', icon: '/assets/logos/nodejs.webp', top: '75%', left: '15%', delay: '1.8s', size: '80px' },
    { name: 'SQL', icon: '/assets/logos/sql.webp', top: '65%', left: '45%', delay: '0.8s', size: '65px' },
    { name: 'MySQL', icon: '/assets/logos/mysql.webp', top: '85%', left: '75%', delay: '2.5s', size: '70px' },
    { name: 'HTML5', icon: '/assets/logos/html.webp', top: '25%', left: '50%', delay: '0.3s', size: '60px' },
    { name: 'CSS3', icon: '/assets/logos/css.webp', top: '45%', left: '35%', delay: '1.5s', size: '60px' },
    { name: 'SCSS', icon: '/assets/logos/scss.webp', top: '55%', left: '60%', delay: '0.7s', size: '65px' },
    { name: 'C#', icon: '/assets/logos/csharp.webp', top: '80%', left: '40%', delay: '2.2s', size: '70px' },
    { name: 'JavaScript', icon: '/assets/logos/js.webp', top: '20%', left: '90%', delay: '0.4s', size: '65px' },
    { name: 'Figma', icon: '/assets/logos/figma.webp', top: '90%', left: '5%', delay: '2.8s', size: '70px' },
    { name: 'Cloudflare', icon: '/assets/logos/cloudflare.webp', top: '0%', left: '55%', delay: '1.7s', size: '75px' },
    { name: 'Git', icon: '/assets/logos/git.webp', top: '55%', left: '5%', delay: '1.1s', size: '55px' },
    { name: 'WordPress', icon: '/assets/integrations/wordpress.webp', top: '28%', left: '65%', delay: '3.1s', size: '70px' }
  ];

  // 🔥 MÓVILES (Matriz Comprimida)
  // Tamaños sutilmente reducidos (35-45px) y posiciones exactas para entrar perfectos en 380px de alto.
  private baseTechStackMobile = [
    { name: 'Cloudflare', icon: '/assets/logos/cloudflare.webp', top: '0%', left: '50%', delay: '1.7s', size: '45px' },
    { name: 'Angular', icon: '/assets/logos/angular.webp', top: '13%', left: '20%', delay: '0s', size: '40px' },
    { name: 'Google APIs', icon: '/assets/logos/google-apis.webp', top: '13%', left: '80%', delay: '1.2s', size: '40px' },
    { name: 'TypeScript', icon: '/assets/logos/ts.webp', top: '26%', left: '38%', delay: '0.5s', size: '40px' },
    { name: 'HTML5', icon: '/assets/logos/html.webp', top: '26%', left: '62%', delay: '0.3s', size: '35px' },
    { name: 'JavaScript', icon: '/assets/logos/js.webp', top: '39%', left: '15%', delay: '0.4s', size: '40px' },
    { name: 'React', icon: '/assets/logos/react.webp', top: '39%', left: '85%', delay: '2.1s', size: '45px' },
    { name: 'WordPress', icon: '/assets/integrations/wordpress.webp', top: '52%', left: '35%', delay: '3.1s', size: '40px' },
    { name: 'Figma', icon: '/assets/logos/figma.webp', top: '52%', left: '65%', delay: '2.8s', size: '40px' },
    { name: 'Git', icon: '/assets/logos/git.webp', top: '65%', left: '20%', delay: '1.1s', size: '35px' },
    { name: 'SCSS', icon: '/assets/logos/scss.webp', top: '65%', left: '80%', delay: '0.7s', size: '35px' },
    { name: 'CSS3', icon: '/assets/logos/css.webp', top: '78%', left: '42%', delay: '1.5s', size: '35px' },
    { name: 'SQL', icon: '/assets/logos/sql.webp', top: '78%', left: '58%', delay: '0.8s', size: '35px' },
    { name: 'Node.js', icon: '/assets/logos/nodejs.webp', top: '90%', left: '15%', delay: '1.8s', size: '45px' },
    { name: 'C#', icon: '/assets/logos/csharp.webp', top: '90%', left: '50%', delay: '2.2s', size: '45px' },
    { name: 'MySQL', icon: '/assets/logos/mysql.webp', top: '90%', left: '85%', delay: '2.5s', size: '40px' }
  ];

  techStack: any[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.calculatePositions();
  }

  @HostListener('window:resize')
  onResize() {
    this.calculatePositions();
  }

  private calculatePositions() {
    if (isPlatformBrowser(this.platformId)) {
      const isMobile = window.innerWidth <= 900;
      this.techStack = isMobile ? this.baseTechStackMobile : this.baseTechStackDesktop;
    } else {
      this.techStack = [...this.baseTechStackDesktop];
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      
      if (this.bgVideo) {
        const videoElement = this.bgVideo.nativeElement;
        videoElement.muted = true;
        
        const playPromise = videoElement.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.warn('El autoplay prevenido:', error);
            setTimeout(() => { videoElement.play(); }, 500);
          });
        }
      }

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