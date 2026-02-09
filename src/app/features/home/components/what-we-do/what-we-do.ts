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
  // Variables para controlar el estado de cada carta
  isFlipped1 = false;
  isFlipped2 = false;
  isFlipped3 = false;

  flipCard(cardNumber: number) {
    if (cardNumber === 1) this.isFlipped1 = !this.isFlipped1;
    if (cardNumber === 2) this.isFlipped2 = !this.isFlipped2;
    if (cardNumber === 3) this.isFlipped3 = !this.isFlipped3;
  }

  // Función para reproducir el video al entrar
  /*playVideo(videoElement: HTMLVideoElement) {
    videoElement.currentTime = 0;
    // Forzar el mute ayuda a que el navegador permita el autoplay
    videoElement.muted = true; 
    
    videoElement.play().catch(error => {
      console.log('Video play prevented (normal si no hubo interacción previa):', error);
    });
  }

  // Función para detener el video al salir
  stopVideo(videoElement: HTMLVideoElement) {
    videoElement.pause();
  }*/
}

