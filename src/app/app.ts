import { Component } from '@angular/core';
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
export class App { }