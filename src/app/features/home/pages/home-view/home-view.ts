import { Component, OnInit, AfterViewInit, ViewChildren, QueryList, ElementRef, Inject, PLATFORM_ID, NgZone } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common'; 
import { BentoGrid } from '../../components/bento-grid/bento-grid';
import { Navbar } from '../../../../core/components/navbar/navbar';
import { WhatWeDo } from '../../components/what-we-do/what-we-do';
import { Studio } from '../../components/studio/studio';
import { Contact } from '../../components/contact/contact';
import { Integrations } from '../../components/integrations/integrations';
import { WhatsappButton } from '../../components/whatsapp-button/whatsapp-button';
import { Process } from '../../components/process/process';

@Component({
  selector: 'app-home-view',
  standalone: true,
  imports: [CommonModule, BentoGrid, Navbar, WhatWeDo, Studio, Contact, Integrations, WhatsappButton, Process],
  templateUrl: './home-view.html',
  styleUrl: './home-view.scss',
})
export class HomeView implements OnInit, AfterViewInit {
  
  // --- VARIABLES TYPEWRITER ---
  phrases: string[] = [
    'Construimos plataformas escalables.',
    'Diseñamos interfaces pixel-perfect.',
    'Impulsamos tu negocio digital.',
    'Code & Design from Mar del Plata.'
  ];
  currentText: string = '';
  phraseIndex: number = 0;
  charIndex: number = 0;
  isDeleting: boolean = false;

  // --- VARIABLES FÍSICAS ---
  @ViewChildren('draggableTag') tagsElements!: QueryList<ElementRef>;
  tagsPhysicsData: any[] = [];

  // --- VARIABLES SCROLL DIRECTO ---
  isAutoScrolling: boolean = false;
  touchStartY: number = 0;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone 
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.typeEffect();
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initPhysics();
      this.initAutoScroll(); // Iniciamos el listener manual del scroll
    }
  }

  // --- NUEVO MOTOR DE SCROLL DIRECTO Y FORZADO ---
  initAutoScroll() {
    this.ngZone.runOutsideAngular(() => {
      
      // 1. PARA COMPUTADORA (Rueda del Mouse)
      window.addEventListener('wheel', (e: WheelEvent) => {
        if (window.innerWidth <= 900) return;

        if (window.scrollY <= 50 && e.deltaY > 0 && !this.isAutoScrolling) {
          e.preventDefault(); 
          this.triggerAutoScroll();
        }
      }, { passive: false }); 

      // 2. PARA CELULARES (Touch)
      window.addEventListener('touchstart', (e: TouchEvent) => {
        if (window.innerWidth <= 900) return;
        this.touchStartY = e.touches[0].clientY;
      }, { passive: true });

      window.addEventListener('touchmove', (e: TouchEvent) => {
        if (window.innerWidth <= 900) return;

        if (window.scrollY <= 50 && !this.isAutoScrolling) {
          const touchEndY = e.touches[0].clientY;
          if (this.touchStartY > touchEndY + 30) {
            this.triggerAutoScroll();
          }
        }
      }, { passive: false });
      
    });
  }

  triggerAutoScroll() {
    this.isAutoScrolling = true;
    const nextSection = document.getElementById('servicios');
    
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    setTimeout(() => {
      this.isAutoScrolling = false;
    }, 1200);
  }

  // --- LÓGICA TYPEWRITER ---
  typeEffect() {
    const currentPhrase = this.phrases[this.phraseIndex];
    if (this.isDeleting) {
      this.currentText = currentPhrase.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.currentText = currentPhrase.substring(0, this.charIndex + 1);
      this.charIndex++;
    }

    let typeSpeed = this.isDeleting ? 40 : 80;

    if (!this.isDeleting && this.currentText === currentPhrase) {
      typeSpeed = 2000; 
      this.isDeleting = true;
    } else if (this.isDeleting && this.currentText === '') {
      this.isDeleting = false;
      this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length; 
      typeSpeed = 500; 
    }
    setTimeout(() => this.typeEffect(), typeSpeed);
  }

  // --- MOTOR DE FÍSICAS EXACTO (CORREGIDO PARA ENJAULAR EN EL HERO) ---
  initPhysics() {
    this.ngZone.runOutsideAngular(() => {
      const elements = this.tagsElements.toArray().map(el => el.nativeElement);
      const heroElement = document.getElementById('hero');

      elements.forEach((el) => {
        const data = {
          el,
          x: 0, y: 0,
          vx: 0, vy: 0,
          isDragging: false,
          lastMouseX: 0, lastMouseY: 0,
          hasInteracted: false 
        };
        this.tagsPhysicsData.push(data);

        el.addEventListener('pointerdown', (e: PointerEvent) => {
          data.isDragging = true;
          data.hasInteracted = true;
          el.classList.add('is-dragging');
          el.classList.remove('floating-tag-anim'); 
          
          data.lastMouseX = e.clientX;
          data.lastMouseY = e.clientY;
          data.vx = 0; data.vy = 0; 
          
          el.setPointerCapture(e.pointerId);
        });
      });

      // Lógica mientras arrastramos la etiqueta
      window.addEventListener('pointermove', (e: PointerEvent) => {
        this.tagsPhysicsData.forEach(data => {
          if (data.isDragging) {
            const deltaX = e.clientX - data.lastMouseX;
            const deltaY = e.clientY - data.lastMouseY;

            data.x += deltaX;
            data.y += deltaY;

            data.vx = deltaX * 0.7; 
            data.vy = deltaY * 0.7;

            data.lastMouseX = e.clientX;
            data.lastMouseY = e.clientY;

            // La movemos temporalmente para calcular su posición real
            data.el.style.transform = `translate(${data.x}px, ${data.y}px) rotate(${data.vx * 0.5}deg)`;

            // 🔥 CANDADO DURANTE EL ARRASTRE: Evitamos que la saquen de la sección hero
            if (heroElement) {
              const rect = data.el.getBoundingClientRect();
              const heroRect = heroElement.getBoundingClientRect();

              // Si intenta salir, la empujamos hacia adentro matemáticamente
              if (rect.left < heroRect.left) data.x += (heroRect.left - rect.left);
              if (rect.right > heroRect.right) data.x -= (rect.right - heroRect.right);
              if (rect.top < heroRect.top) data.y += (heroRect.top - rect.top);
              if (rect.bottom > heroRect.bottom) data.y -= (rect.bottom - heroRect.bottom);

              // Re-aplicamos la transformación ya corregida
              data.el.style.transform = `translate(${data.x}px, ${data.y}px) rotate(${data.vx * 0.5}deg)`;
            }
          }
        });
      });

      window.addEventListener('pointerup', (e: PointerEvent) => {
        this.tagsPhysicsData.forEach(data => {
          if (data.isDragging) {
            data.isDragging = false;
            data.el.classList.remove('is-dragging');
            data.el.releasePointerCapture(e.pointerId);
          }
        });
      });

      // Animación de rebote (cuando la soltamos)
      const animate = () => {
        this.tagsPhysicsData.forEach(data => {
          if (!data.isDragging && data.hasInteracted) {
            
            if (Math.abs(data.vx) > 0.1 || Math.abs(data.vy) > 0.1) {
              data.x += data.vx;
              data.y += data.vy;

              // Fricción
              data.vx *= 0.94;
              data.vy *= 0.94;

              // --- COLISIONES MILIMÉTRICAS EXCLUSIVAS DEL HERO ---
              if (heroElement) {
                const rect = data.el.getBoundingClientRect();
                const heroRect = heroElement.getBoundingClientRect(); // Acá está la clave, calculamos el div, no la ventana

                // Choque Izquierda
                if (rect.left <= heroRect.left) {
                  data.x += (heroRect.left - rect.left); 
                  data.vx = Math.abs(data.vx) * 0.8; 
                } 
                // Choque Derecha
                else if (rect.right >= heroRect.right) {
                  data.x -= (rect.right - heroRect.right); 
                  data.vx = -Math.abs(data.vx) * 0.8; 
                }

                // Choque Arriba
                if (rect.top <= heroRect.top) {
                  data.y += (heroRect.top - rect.top);
                  data.vy = Math.abs(data.vy) * 0.8; 
                } 
                // Choque Abajo
                else if (rect.bottom >= heroRect.bottom) {
                  data.y -= (rect.bottom - heroRect.bottom);
                  data.vy = -Math.abs(data.vy) * 0.8; 
                }
              }

              data.el.style.transform = `translate(${data.x}px, ${data.y}px) rotate(${data.vx * 0.5}deg)`;
            }
          }
        });
        requestAnimationFrame(animate);
      };
      animate(); 
    });
  }
}