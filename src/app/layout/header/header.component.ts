import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import {
  LucideAngularModule,
  Menu,
  X,
  Code,
  Home,
  Users,
  Briefcase,
  Mail,
  Headphones,
} from 'lucide-angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  template: `
    <header [class]="headerClasses">
      <div class="container-custom">
        <div class="flex items-center justify-between h-16 lg:h-20">
          <!-- Logo -->
          <div
            class="flex items-center space-x-3 cursor-pointer"
            (click)="navigateHome()"
          >
            <div class="p-2 bg-primary-500 rounded-lg">
              <lucide-angular
                [img]="codeIcon"
                class="w-6 h-6 lg:w-8 lg:h-8 text-white"
              >
              </lucide-angular>
            </div>
            <div class="hidden sm:block">
              <h1 class="text-xl lg:text-2xl font-bold gradient-text">iNeon</h1>
              <p class="text-xs text-gray-600 -mt-1">Software Solutions</p>
            </div>
          </div>

          <!-- Desktop Navigation -->
          <nav class="hidden lg:flex items-center space-x-8">
            <a
              *ngFor="let item of menuItems"
              [routerLink]="item.path"
              routerLinkActive="active-link"
              class="nav-link group"
              [class.active-link]="isActiveRoute(item.path)"
            >
              <lucide-angular
                [img]="item.icon"
                class="w-4 h-4 mr-2 transition-transform group-hover:scale-110"
              >
              </lucide-angular>
              {{ item.label }}

              <!-- Underline effect -->
              <span
                class="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full"
              ></span>
            </a>
          </nav>

          <!-- CTA Button Desktop -->
          <div class="hidden lg:block">
            <button (click)="navigateToContact()" class="btn-primary">
              Contáctanos
            </button>
          </div>

          <!-- Mobile Menu Button -->
          <button
            class="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            (click)="toggleMobileMenu()"
            [attr.aria-label]="mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'"
          >
            <lucide-angular
              [img]="mobileMenuOpen ? xIcon : menuIcon"
              class="w-6 h-6 text-gray-700"
            >
            </lucide-angular>
          </button>
        </div>

        <!-- Mobile Navigation -->
        <div
          class="lg:hidden overflow-hidden transition-all duration-300 ease-in-out"
          [class.max-h-0]="!mobileMenuOpen"
          [class.max-h-96]="mobileMenuOpen"
        >
          <nav class="py-4 border-t border-gray-100">
            <a
              *ngFor="let item of menuItems; trackBy: trackByPath"
              [routerLink]="item.path"
              routerLinkActive="active-mobile-link"
              class="mobile-nav-link"
              (click)="closeMobileMenu()"
            >
              <lucide-angular [img]="item.icon" class="w-5 h-5 mr-3">
              </lucide-angular>
              {{ item.label }}
            </a>

            <!-- Mobile CTA -->
            <div class="pt-4 mt-4 border-t border-gray-100">
              <button
                (click)="navigateToContact(); closeMobileMenu()"
                class="btn-primary w-full"
              >
                Contáctanos
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  `,
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  // Icons
  readonly codeIcon = Code;
  readonly menuIcon = Menu;
  readonly xIcon = X;
  readonly homeIcon = Home;
  readonly usersIcon = Users;
  readonly briefcaseIcon = Briefcase;
  readonly mailIcon = Mail;
  readonly headphonesIcon = Headphones;

  // State
  mobileMenuOpen = false;
  isScrolled = false;

  // Navigation items
  menuItems = [
    { path: '/home', label: 'Inicio', icon: this.homeIcon },
    { path: '/about', label: 'Quiénes Somos', icon: this.usersIcon },
    { path: '/services', label: 'Servicios', icon: this.briefcaseIcon },
    { path: '/contact', label: 'Contacto', icon: this.mailIcon },
    { path: '/support', label: 'Soporte', icon: this.headphonesIcon },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Initialize any needed logic
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    this.isScrolled = window.pageYOffset > 50;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(): void {
    if (window.innerWidth >= 1024) {
      this.mobileMenuOpen = false;
    }
  }

  get headerClasses(): string {
    return `
      fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${
        this.isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100'
          : 'bg-white shadow-sm'
      }
    `;
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  navigateHome(): void {
    this.router.navigate(['/home']);
    this.closeMobileMenu();
  }

  navigateToContact(): void {
    this.router.navigate(['/contact']);
    this.closeMobileMenu();
  }

  isActiveRoute(path: string): boolean {
    return this.router.url === path;
  }

  trackByPath(index: number, item: any): string {
    return item.path;
  }
}
