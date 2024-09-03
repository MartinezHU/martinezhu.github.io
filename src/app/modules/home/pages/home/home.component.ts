import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public menu: any[] = [];
  isMenuOpen = false;
  screenWidth!: number;

  constructor() {
    this.screenWidth = window.innerWidth;

    this.menu = [
      { name: 'Inicio', link: '/#home' },
      { name: 'Portfolio', link: '/#portfolio' },
      { name: 'Sobre mi', link: '/#about' },
      { name: 'Contacto', link: '/#contact' },
    ];
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth >= 768) {
      this.isMenuOpen = false; // Cerramos el menú cuando se cambia de tamaño
    }
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    // Verifica si el clic se realizó fuera del menú y del botón hamburguesa
    const clickedElement = event.target as HTMLElement;
    const menuElement = document.querySelector('.menu-fijo');
    const buttonElement = document.querySelector('.menu-toggle');

    if (
      this.isMenuOpen &&
      !menuElement?.contains(clickedElement) &&
      !buttonElement?.contains(clickedElement)
    ) {
      this.isMenuOpen = false;
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
