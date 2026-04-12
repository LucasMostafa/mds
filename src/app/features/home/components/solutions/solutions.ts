import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-solutions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './solutions.html',
  styleUrls: ['./solutions.scss']
})
export class Solutions implements AfterViewInit, OnDestroy {

  // Variables de estado
  selectedTheme = 'beige';
  selectedButtonShape = 'rounded';
  selectedTypography = 'sans';

  // Controladores de los desplegables
  themeDropdownOpen = false;
  shapeDropdownOpen = false;
  typographyDropdownOpen = false;

  // 🔥 Variables para la animación de scroll 🔥
  isVisible = false;
  @ViewChild('solutionsSection') solutionsSection!: ElementRef;
  private sectionObserver!: IntersectionObserver;

  constructor(private router: Router) {}

  // 🔥 Lógica del observador cuando la vista ya cargó 🔥
  ngAfterViewInit() {
    this.sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.isVisible = true; // Activa la animación inyectando la clase en el HTML
          this.sectionObserver.unobserve(entry.target); // Deja de observar para que no se repita si el usuario sube y baja
        }
      });
    }, { 
      threshold: 0.2 // Se activa cuando el 20% de la sección entra en la pantalla
    });

    if (this.solutionsSection) {
      this.sectionObserver.observe(this.solutionsSection.nativeElement);
    }
  }

  // 🔥 Limpieza de memoria al cambiar de página 🔥
  ngOnDestroy() {
    if (this.sectionObserver) {
      this.sectionObserver.disconnect();
    }
  }

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