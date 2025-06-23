import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  LucideAngularModule,
  Target,
  Eye,
  Users,
  Award,
  CheckCircle,
  Star,
  TrendingUp,
  Shield,
} from 'lucide-angular';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  // Icons
  readonly targetIcon = Target;
  readonly eyeIcon = Eye;
  readonly usersIcon = Users;
  readonly awardIcon = Award;
  readonly checkCircleIcon = CheckCircle;
  readonly starIcon = Star;
  readonly trendingUpIcon = TrendingUp;
  readonly shieldIcon = Shield;

  // Company info from SQAP document
  companyInfo = {
    name: 'iNeon',
    slogan: 'Innovación y calidad en cada solución de software',
    description:
      'Empresa mediana dedicada al desarrollo de software a medida que ha decidido formalizar sus procesos de calidad para asegurar productos de alta calidad a sus clientes.',
    mission:
      'Brindar soluciones de software a medida de alta calidad que satisfagan plenamente las necesidades de nuestros clientes. Logramos esto mediante la excelencia técnica, la innovación constante y un fuerte compromiso con la calidad y la mejora continua en todos nuestros procesos.',
    vision:
      'Ser reconocida internacionalmente como una empresa líder en desarrollo de software a medida, destacada por su compromiso con la calidad, la confiabilidad de sus productos y la satisfacción del cliente.',
    foundedYear: 2020,
    employees: '15-50',
    projectsCompleted: '50+',
    clientSatisfaction: '100%',
  };

  // Quality policies from SQAP
  qualityPolicies = [
    {
      icon: this.usersIcon,
      title: 'Enfoque en el cliente',
      description:
        'Los requisitos y expectativas del cliente guían todo nuestro trabajo. Nos comprometemos a entregar software que cumpla y exceda dichos requisitos.',
    },
    {
      icon: this.awardIcon,
      title: 'Cumplimiento de estándares',
      description:
        'Desarrollamos conforme a estándares reconocidos como IEEE 730, ISO/IEC 25010, y ISO 9001 para garantizar prácticas probadas.',
    },
    {
      icon: this.shieldIcon,
      title: 'Prevención sobre corrección',
      description:
        'Priorizamos la prevención de defectos mediante revisiones sistemáticas y cumplimiento de procesos rigurosos.',
    },
    {
      icon: this.trendingUpIcon,
      title: 'Mejora continua',
      description:
        'Establecemos objetivos de calidad y medimos regularmente nuestro desempeño para optimizar procesos constantemente.',
    },
  ];

  // Team values
  teamValues = [
    {
      icon: this.checkCircleIcon,
      title: 'Excelencia Técnica',
      description:
        'Nuestro equipo domina las últimas tecnologías y mejores prácticas de la industria.',
    },
    {
      icon: this.starIcon,
      title: 'Innovación Constante',
      description:
        'Buscamos continuamente nuevas formas de resolver problemas y crear valor.',
    },
    {
      icon: this.targetIcon,
      title: 'Orientación a Resultados',
      description:
        'Cada proyecto se enfoca en entregar valor tangible y medible al cliente.',
    },
    {
      icon: this.usersIcon,
      title: 'Trabajo en Equipo',
      description:
        'La colaboración y comunicación efectiva son pilares de nuestro éxito.',
    },
  ];

  // Key achievements
  achievements = [
    {
      number: '100%',
      label: 'Satisfacción del Cliente',
      description: 'Todos nuestros clientes recomiendan nuestros servicios',
    },
    {
      number: '50+',
      label: 'Proyectos Completados',
      description: 'Soluciones entregadas con estándares de calidad IEEE 730',
    },
    {
      number: '99.9%',
      label: 'Calidad Garantizada',
      description: 'Índice de calidad en nuestros procesos de desarrollo',
    },
    {
      number: '24/7',
      label: 'Soporte Técnico',
      description: 'Atención continua para nuestros clientes',
    },
  ];

  ngOnInit(): void {
    // Component initialization
  }

  calculateYearsInBusiness(): number {
    return new Date().getFullYear() - this.companyInfo.foundedYear;
  }

  trackByAchievement(index: number, achievement: any): string {
    return achievement.label;
  }

  trackByPolicy(index: number, policy: any): string {
    return policy.title;
  }

  trackByValue(index: number, value: any): string {
    return value.title;
  }
}
