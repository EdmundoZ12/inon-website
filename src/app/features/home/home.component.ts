import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  LucideAngularModule,
  ArrowRight,
  Code,
  Shield,
  Zap,
  Users,
  Download,
  CheckCircle,
  Star,
} from 'lucide-angular';
import { DownloadButtonComponent } from '../../shared/components/download-button/download-button.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, DownloadButtonComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // Icons
  readonly arrowRightIcon = ArrowRight;
  readonly codeIcon = Code;
  readonly shieldIcon = Shield;
  readonly zapIcon = Zap;
  readonly usersIcon = Users;
  readonly downloadIcon = Download;
  readonly checkCircleIcon = CheckCircle;
  readonly starIcon = Star;

  // Data
  stats = [
    { value: '100%', label: 'Satisfacción del Cliente' },
    { value: '50+', label: 'Proyectos Completados' },
    { value: '99.9%', label: 'Calidad Garantizada' },
    { value: '24/7', label: 'Soporte Técnico' },
  ];

  features = [
    {
      icon: this.codeIcon,
      title: 'Desarrollo a Medida',
      description:
        'Soluciones personalizadas que se adaptan perfectamente a las necesidades específicas de tu negocio.',
    },
    {
      icon: this.shieldIcon,
      title: 'Estándares IEEE 730',
      description:
        'Implementamos rigurosos planes de aseguramiento de calidad siguiendo estándares internacionales.',
    },
    {
      icon: this.zapIcon,
      title: 'Tecnología Moderna',
      description:
        'Utilizamos las últimas tecnologías y frameworks para crear aplicaciones robustas y escalables.',
    },
    {
      icon: this.usersIcon,
      title: 'Equipo Experto',
      description:
        'Nuestro equipo de ingenieros especializados garantiza la excelencia en cada línea de código.',
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Component initialization
  }

  navigateToServices(): void {
    this.router.navigate(['/services']);
  }

  navigateToContact(): void {
    this.router.navigate(['/contact']);
  }

  navigateToAbout(): void {
    this.router.navigate(['/about']);
  }

  trackByFeature(index: number, feature: any): string {
    return feature.title;
  }
}
