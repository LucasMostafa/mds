// 🔥 IMPORTAMOS ElementRef, ViewChild, AfterViewInit y OnDestroy 🔥
import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

// 🔥 IMPORTAMOS EL BOTÓN DE WHATSAPP 🔥
import { WhatsappButton } from '../../../home/components/whatsapp-button/whatsapp-button';

@Component({
  selector: 'app-solutions-view',
  standalone: true,
  imports: [CommonModule, WhatsappButton], 
  templateUrl: './solutions-view.html',
  styleUrls: ['./solutions-view.scss']
})
export class SolutionsView implements OnInit, AfterViewInit, OnDestroy { // Agregamos las interfaces

  // Variable que controla la pantalla de carga nueva
  showModuleLoader = true; 

  // 🔥 1. Atrapamos el video desde el HTML 🔥
  @ViewChild('demoVideo') demoVideo!: ElementRef<HTMLVideoElement>;
  
  // 🔥 Variable para guardar nuestro observador del scroll 🔥
  private observer!: IntersectionObserver;

  ngOnInit() {
    // 1. Clava el scroll en la coordenada 0,0 de forma instantánea
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' 
    });

    // 2. Simulamos la carga de la plataforma "Modular" (2.8 segundos)
    setTimeout(() => {
      this.showModuleLoader = false;
    }, 2800);
  }

  // 🔥 2. Arranca el vigilante cuando la vista se termina de cargar 🔥
  ngAfterViewInit() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Si el 30% del video entró en pantalla, le damos Play
          this.demoVideo.nativeElement.play().catch(e => console.log('Autoplay bloqueado', e));
        } else {
          // Si salió de la pantalla, lo pausamos para ahorrar batería y CPU
          this.demoVideo.nativeElement.pause();
        }
      });
    }, { 
      threshold: 0.3 // Se activa cuando el 30% del video ya es visible
    });

    // Le decimos al observador que mire nuestro video
    if (this.demoVideo) {
      this.observer.observe(this.demoVideo.nativeElement);
    }
  }

  // 🔥 3. Limpiamos la memoria si el usuario cambia de página 🔥
  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  // Función para volver al Home y forzar la pantalla de carga inicial
  goBackHome() {
    window.location.href = '/'; 
  }

  // Función para volver arriba suavemente
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}