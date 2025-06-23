import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  LucideAngularModule,
  Mail,
  Phone,
  MapPin,
  Code,
  Github,
  Linkedin,
  Twitter,
  Heart,
} from 'lucide-angular';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  // Icons
  readonly mailIcon = Mail;
  readonly phoneIcon = Phone;
  readonly mapPinIcon = MapPin;
  readonly codeIcon = Code;
  readonly githubIcon = Github;
  readonly linkedinIcon = Linkedin;
  readonly twitterIcon = Twitter;
  readonly heartIcon = Heart;

  // Current year
  currentYear = new Date().getFullYear();

  // Footer data
  companyInfo = {
    name: 'iNeon',
    description:
      'Empresa líder en desarrollo de software a medida con estándares de calidad IEEE 730.',
    email: 'ineon.software@gmail.com',
    phone: '+591 71097542',
    address: 'Santa Cruz de la Sierra, Bolivia',
  };

  quickLinks = [
    { label: 'Inicio', path: '/home' },
    { label: 'Quiénes Somos', path: '/about' },
    { label: 'Servicios', path: '/services' },
    { label: 'Contacto', path: '/contact' },
    { label: 'Soporte', path: '/support' },
  ];

  services = [
    { label: 'Desarrollo de Software', path: '/services' },
    { label: 'Consultoría en Calidad', path: '/services' },
    { label: 'Auditorías SQAP', path: '/services' },
    { label: 'Implementación IEEE 730', path: '/services' },
    { label: 'Soporte Técnico', path: '/support' },
  ];

  socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/company/ineon',
      icon: this.linkedinIcon,
      color: 'hover:text-blue-600',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/ineon',
      icon: this.githubIcon,
      color: 'hover:text-gray-900',
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/ineon',
      icon: this.twitterIcon,
      color: 'hover:text-blue-400',
    },
  ];

  openWhatsApp(): void {
    const message = encodeURIComponent(
      'Hola! Me interesa conocer más sobre los servicios de iNeon.'
    );
    const whatsappNumber = '59171097542'; // Sin espacios ni símbolos para la URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
