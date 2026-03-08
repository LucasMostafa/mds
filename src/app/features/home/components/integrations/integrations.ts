import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, Inject, PLATFORM_ID, NgZone } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-integrations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './integrations.html',
  styleUrl: './integrations.scss'
})
export class Integrations implements AfterViewInit, OnDestroy {
  
  @ViewChild('slideTrack') slideTrack!: ElementRef;
  
  integrationsList = [
    // --- PASARELAS DE PAGO ---
    { name: 'Mercado Pago', icon: '/assets/integrations/mercadopago.png' },
    { name: 'Stripe', icon: '/assets/integrations/stripe.png' },
    { name: 'PayPal', icon: '/assets/integrations/paypal.png' },
    { name: 'MODO', icon: '/assets/integrations/modo.png' },
    { name: 'Ualá Bis', icon: '/assets/integrations/ualabis.png' },
    
    // --- LOGÍSTICA Y ENVÍOS ---
    { name: 'Andreani', icon: '/assets/integrations/andreani.png' },
    { name: 'OCA', icon: '/assets/integrations/oca.png' },
    { name: 'Correo Argentino', icon: '/assets/integrations/correoargentino.png' },
    
    // --- COMUNICACIÓN Y ANALÍTICA ---
    { name: 'WhatsApp', icon: '/assets/integrations/whatsapp1.png' },
    { name: 'Google Analytics', icon: '/assets/integrations/analytics.png' },
    { name: 'Google Maps', icon: '/assets/integrations/maps.png' },
    { name: 'WordPress', icon: '/assets/integrations/wordpress.png' }
  ];

  private animationId: number = 0;
  private isDragging = false;
  private startX = 0;
  private currentScrollLeft = 0;
  private speed = 1.2; // Velocidad del movimiento automático (podés subirla o bajarla)
  private isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone 
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      // Le damos un respiro a Angular para que pinte el HTML y calcule los anchos antes de arrancar
      setTimeout(() => {
        this.startAutoScroll();
        this.setupDrag();
      }, 100);
    }
  }

  ngOnDestroy() {
    if (this.isBrowser) {
      cancelAnimationFrame(this.animationId);
    }
  }

  // --- 🔥 MOTOR DE SCROLL INFINITO CORREGIDO 🔥 ---
  startAutoScroll() {
    this.ngZone.runOutsideAngular(() => {
      const track = this.slideTrack.nativeElement;

      const step = () => {
        if (!this.isDragging && track) {
          track.scrollLeft += this.speed;
          
          // Magia del Loop: Cuando llega a la mitad exacta (fin de la primera lista), vuelve 100% invisible a 0
          if (track.scrollLeft >= track.scrollWidth / 2) {
            track.scrollLeft -= track.scrollWidth / 2;
          }
        }
        this.animationId = requestAnimationFrame(step);
      };
      
      this.animationId = requestAnimationFrame(step);
    });
  }

  // --- 🔥 MOTOR DE ARRASTRE (DRAG EXACTO) 🔥 ---
  setupDrag() {
    this.ngZone.runOutsideAngular(() => {
      const track = this.slideTrack.nativeElement;

      const onPointerDown = (e: PointerEvent) => {
        this.isDragging = true;
        track.classList.add('dragging');
        this.startX = e.pageX;
        this.currentScrollLeft = track.scrollLeft;
        track.setPointerCapture(e.pointerId);
      };

      const onPointerMove = (e: PointerEvent) => {
        if (!this.isDragging) return;
        
        const x = e.pageX;
        const walk = (this.startX - x) * 1.5; // Multiplicador para que el arrastre se sienta fluido
        track.scrollLeft = this.currentScrollLeft + walk;

        // Loop infinito manual por si arrastramos muy fuerte
        if (track.scrollLeft >= track.scrollWidth / 2) {
           track.scrollLeft -= track.scrollWidth / 2;
           this.startX = e.pageX; 
           this.currentScrollLeft = track.scrollLeft;
        } else if (track.scrollLeft <= 0) {
           track.scrollLeft += track.scrollWidth / 2;
           this.startX = e.pageX;
           this.currentScrollLeft = track.scrollLeft;
        }
      };

      const stopDrag = (e: PointerEvent) => {
        if (this.isDragging) {
          this.isDragging = false;
          track.classList.remove('dragging');
          track.releasePointerCapture(e.pointerId);
        }
      };

      // Escuchadores de eventos universales (Sirven para Mouse y Pantalla táctil)
      track.addEventListener('pointerdown', onPointerDown);
      track.addEventListener('pointermove', onPointerMove);
      track.addEventListener('pointerup', stopDrag);
      track.addEventListener('pointercancel', stopDrag);
    });
  }
}