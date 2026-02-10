import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-what-we-do',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './what-we-do.html',
  styleUrl: './what-we-do.scss'
})
export class WhatWeDo {
  // Estado de las cartas
  isFlipped1 = false;
  isFlipped2 = false;
  isFlipped3 = false;

  flipCard(cardNumber: number) {
    if (cardNumber === 1) this.isFlipped1 = !this.isFlipped1;
    if (cardNumber === 2) this.isFlipped2 = !this.isFlipped2;
    if (cardNumber === 3) this.isFlipped3 = !this.isFlipped3;
  }

  // --- REPRODUCIR VIDEO (Hover) ---
  playVideo(videoElement: HTMLVideoElement) {
    // Si la tarjeta está girada, no reproducimos
    // (Opcional: podés sacar este if si querés que suene igual)
    
    videoElement.currentTime = 0; // Reinicia el video
    videoElement.muted = true;    // Asegura mute para autoplay
    
    const playPromise = videoElement.play();
    
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        // Autoplay bloqueado o interrupción rápida (normal en browsers)
        console.log('Video play prevented:', error);
      });
    }
  }

  // --- PAUSAR VIDEO (Leave) ---
  stopVideo(videoElement: HTMLVideoElement) {
    videoElement.pause();
    // Opcional: Volver a 0 para que la próxima vez arranque de inicio
    // videoElement.currentTime = 0; 
  }
}