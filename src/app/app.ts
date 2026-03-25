import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//import { Navbar } from './core/components/navbar/navbar';
import { Footer } from './core/components/footer/footer';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Footer], // <--- AGREGALOS ACÁ
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  
  showLoader = true;

  ngOnInit() {
    this.startIntroSequence();
  }

  startIntroSequence() {
    const introDuration = 2500; // 2.5 segundos de intro

    setTimeout(() => {
      this.showLoader = false;
    }, introDuration);
  }
}