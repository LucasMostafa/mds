import { Component, ElementRef, AfterViewInit, ViewChildren, QueryList, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-process',
  standalone: true,
  templateUrl: './process.html',
  styleUrl: './process.scss'
})
export class Process implements AfterViewInit {

  @ViewChildren('revealEl') revealElements!: QueryList<ElementRef>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      this.revealElements.forEach(el => {
        observer.observe(el.nativeElement);
      });
    }
  }
}