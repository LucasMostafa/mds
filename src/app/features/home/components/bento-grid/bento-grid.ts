import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bento-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bento-grid.html',
  styleUrl: './bento-grid.scss',
})
export class BentoGrid {

  // Función para reproducir el video al entrar
  playVideo(videoElement: HTMLVideoElement) {
    // IMPORTANTE: Reseteamos a 0 para asegurar que arranque
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
    // Reseteamos al principio para que cuando vuelva la imagen, el video esté listo
    videoElement.currentTime = 0; 
  }
}