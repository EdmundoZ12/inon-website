import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  LucideAngularModule,
  Code,
  Shield,
  Cog,
  FileText,
  Search,
  CheckCircle,
  ArrowRight,
  Clock,
  Users,
  Award,
  Zap,
} from 'lucide-angular';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit {
  // Icons
  readonly codeIcon = Code;
  readonly shieldIcon = Shield;
  readonly cogIcon = Cog;
  readonly fileTextIcon = FileText;
  readonly searchIcon = Search;
  readonly checkCircleIcon = CheckCircle;
  readonly arrowRightIcon = ArrowRight;
  readonly clockIcon = Clock;
  readonly usersIcon = Users;
  readonly awardIcon = Award;
  readonly zapIcon = Zap;

  // Main Services
  mainServices = [
    {
      id: 'custom-development',
      icon: this.codeIcon,
      title: 'Desarrollo de Software a Medida',
      description:
        'Creamos soluciones personalizadas que se adaptan perfectamente a las necesidades específicas de tu negocio.',
      features: [
        'Aplicaciones web y móviles',
        'Sistemas de gestión empresarial',
        'APIs y microservicios',
        'Aplicaciones PWA (Progressive Web Apps)',
        'Soluciones cloud-native',
      ],
      technologies: [
        'Angular',
        'React',
        'Node.js',
        'Java',
        'Python',
        'C#',
        '.NET',
      ],
      price: 'Desde $5,000',
      duration: '2-6 meses',
      color: 'primary',
    },
    {
      id: 'quality-assurance',
      icon: this.shieldIcon,
      title: 'Aseguramiento de Calidad (SQAP)',
      description:
        'Implementamos planes de aseguramiento de calidad basados en estándares IEEE 730 para garantizar la excelencia.',
      features: [
        'Implementación de SQAP IEEE 730',
        'Revisiones técnicas formales',
        'Auditorías de proceso',
        'Gestión de configuración',
        'Control de calidad continuo',
      ],
      technologies: ['IEEE 730', 'ISO 9001', 'ISO/IEC 25010', 'CMMI'],
      price: 'Desde $2,000',
      duration: '1-3 meses',
      color: 'accent',
    },
    {
      id: 'consulting',
      icon: this.searchIcon,
      title: 'Consultoría en Ingeniería de Software',
      description:
        'Asesoramiento experto para optimizar tus procesos de desarrollo y adoptar mejores prácticas.',
      features: [
        'Análisis de procesos actuales',
        'Recomendaciones de mejora',
        'Implementación de metodologías ágiles',
        'Capacitación de equipos',
        'Transformación digital',
      ],
      technologies: ['Scrum', 'Kanban', 'DevOps', 'CI/CD', 'Agile'],
      price: 'Desde $1,500',
      duration: '1-2 meses',
      color: 'primary',
    },
    {
      id: 'maintenance',
      icon: this.cogIcon,
      title: 'Mantenimiento y Soporte',
      description:
        'Servicios de mantenimiento evolutivo, correctivo y soporte técnico 24/7 para tus aplicaciones.',
      features: [
        'Soporte técnico 24/7',
        'Mantenimiento preventivo',
        'Actualizaciones de seguridad',
        'Optimización de rendimiento',
        'Migración de sistemas',
      ],
      technologies: ['Monitoreo', 'DevOps', 'Cloud', 'CI/CD', 'Testing'],
      price: 'Desde $800/mes',
      duration: 'Continuo',
      color: 'accent',
    },
  ];

  // Additional Services
  additionalServices = [
    {
      icon: this.fileTextIcon,
      title: 'Documentación Técnica',
      description:
        'Creación de documentación completa siguiendo estándares IEEE.',
      includes: [
        'SRS (Especificación de Requisitos)',
        'SDD (Descripción del Diseño)',
        'Plan de Pruebas',
        'Manuales de Usuario',
      ],
    },
    {
      icon: this.searchIcon,
      title: 'Auditorías de Código',
      description:
        'Revisión exhaustiva del código fuente para detectar vulnerabilidades y mejoras.',
      includes: [
        'Análisis estático',
        'Revisión de seguridad',
        'Optimización de rendimiento',
        'Refactoring',
      ],
    },
    {
      icon: this.awardIcon,
      title: 'Certificación de Calidad',
      description:
        'Proceso de certificación para validar que tu software cumple estándares internacionales.',
      includes: [
        'Evaluación ISO 25010',
        'Certificación IEEE 730',
        'Auditoría de procesos',
        'Informe de calidad',
      ],
    },
  ];

  // Why choose us
  whyChooseUs = [
    {
      icon: this.checkCircleIcon,
      title: 'Estándares Internacionales',
      description:
        'Seguimos rigurosamente los estándares IEEE 730, ISO 9001 e ISO/IEC 25010.',
    },
    {
      icon: this.usersIcon,
      title: 'Equipo Experto',
      description:
        'Ingenieros certificados con amplia experiencia en desarrollo y calidad de software.',
    },
    {
      icon: this.clockIcon,
      title: 'Entregas Puntuales',
      description:
        'Cumplimos con los plazos acordados gracias a nuestros procesos optimizados.',
    },
    {
      icon: this.zapIcon,
      title: 'Tecnología Moderna',
      description:
        'Utilizamos las últimas tecnologías y frameworks para crear soluciones robustas.',
    },
  ];

  // Process steps
  processSteps = [
    {
      step: '01',
      title: 'Análisis de Requisitos',
      description: 'Estudiamos a fondo tus necesidades y objetivos de negocio.',
      icon: this.searchIcon,
    },
    {
      step: '02',
      title: 'Planificación y Diseño',
      description:
        'Creamos un plan detallado y diseño arquitectónico de la solución.',
      icon: this.fileTextIcon,
    },
    {
      step: '03',
      title: 'Desarrollo e Implementación',
      description: 'Desarrollamos la solución siguiendo estándares de calidad.',
      icon: this.codeIcon,
    },
    {
      step: '04',
      title: 'Pruebas y Validación',
      description: 'Realizamos pruebas exhaustivas para garantizar la calidad.',
      icon: this.shieldIcon,
    },
    {
      step: '05',
      title: 'Entrega y Soporte',
      description: 'Entregamos la solución y proporcionamos soporte continuo.',
      icon: this.checkCircleIcon,
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Component initialization
  }

  getServiceById(id: string) {
    return this.mainServices.find((service) => service.id === id);
  }

  requestQuote(serviceId: string): void {
    // Navigate to contact with service pre-selected
    this.router.navigate(['/contact'], {
      queryParams: { service: serviceId },
    });
  }

  navigateToContact(): void {
    this.router.navigate(['/contact']);
  }

  trackByService(index: number, service: any): string {
    return service.id || service.title;
  }

  trackByStep(index: number, step: any): string {
    return step.step;
  }
}
