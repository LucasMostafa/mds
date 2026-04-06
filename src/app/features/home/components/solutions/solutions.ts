import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-solutions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './solutions.html',
  styleUrls: ['./solutions.scss']
})
export class Solutions {

  // Variables de estado
  selectedTheme = 'beige';
  selectedButtonShape = 'rounded';
  selectedTypography = 'sans';

  // Controladores de los desplegables
  themeDropdownOpen = false;
  shapeDropdownOpen = false;
  typographyDropdownOpen = false;

  constructor(private router: Router) {}

  goToSolutions() {
    this.router.navigate(['/solutions']);
    window.scrollTo(0, 0); 
  }

  // Funciones Toggle
  toggleThemeDropdown() { this.themeDropdownOpen = !this.themeDropdownOpen; }
  toggleShapeDropdown() { this.shapeDropdownOpen = !this.shapeDropdownOpen; }
  toggleTypographyDropdown() { this.typographyDropdownOpen = !this.typographyDropdownOpen; }

  // Selección
  selectTheme(theme: string) { this.selectedTheme = theme; this.themeDropdownOpen = false; }
  selectButtonShape(shape: string) { this.selectedButtonShape = shape; this.shapeDropdownOpen = false; }
  selectTypography(typo: string) { this.selectedTypography = typo; this.typographyDropdownOpen = false; }

  // Clases dinámicas
  get selectedThemeClass(): string { return `theme-${this.selectedTheme}`; }
  get selectedButtonShapeClass(): string { return `button-${this.selectedButtonShape}`; }
  get selectedTypographyClass(): string { return `typography-${this.selectedTypography}`; }
}