import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './core/components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  
  showLoader = true;

  // --- FUNCIONES PARA BLOQUEAR LOS EVENTOS FÍSICOS DE SCROLL ---
  private preventDefault = (e: Event) => {
    e.preventDefault();
  };

  private preventDefaultForScrollKeys = (e: KeyboardEvent) => {
    // Teclas que hacen scroll: Espacio, RePág, AvPág, Fin, Inicio, Flechas
    const keys = ['Space', 'PageUp', 'PageDown', 'End', 'Home', 'ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'];
    if (keys.includes(e.code)) {
      e.preventDefault();
    }
  };

  disableScroll() {
    // Apagamos la rueda del mouse, el deslizamiento táctil y las teclas
    window.addEventListener('wheel', this.preventDefault, { passive: false });
    window.addEventListener('touchmove', this.preventDefault, { passive: false });
    window.addEventListener('keydown', this.preventDefaultForScrollKeys, { passive: false });
  }

  enableScroll() {
    // Volvemos a prender todo
    window.removeEventListener('wheel', this.preventDefault);
    window.removeEventListener('touchmove', this.preventDefault);
    window.removeEventListener('keydown', this.preventDefaultForScrollKeys);
  }
  // --------------------------------------------------------------

  ngOnInit() {
    this.startIntroSequence();
  }

  startIntroSequence() {
    // 1. Bloqueamos físicamente la acción de scrollear apenas arranca
    this.disableScroll();

    const introDuration = 2500; // 2.5 segundos de carga

    setTimeout(() => {
      // 2. Nos aseguramos de que arranque bien arriba por las dudas
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      
      // 3. Ocultamos la pantalla de carga
      this.showLoader = false;
      
      // 4. Liberamos el scroll para que el usuario pueda navegar
      this.enableScroll();
      
    }, introDuration);
  }
}