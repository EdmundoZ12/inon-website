import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  LucideAngularModule,
  MessageSquare,
  Phone,
  Mail,
  Clock,
  AlertTriangle,
  CheckCircle,
  Search,
  FileText,
  Video,
  Download,
  ExternalLink,
  Ticket,
  Users,
  Zap,
} from 'lucide-angular';
import { SupportService } from '../../core/services/support.service';

// Definir el tipo TabType
export type TabType = 'immediate' | 'tickets' | 'faq' | 'resources';

export interface SupportTicket {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  createdAt: Date;
  updatedAt: Date;
  customerInfo: {
    name: string;
    email: string;
    company?: string;
  };
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  helpful: number;
  views: number;
}

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
})
export class SupportComponent implements OnInit {
  // Icons
  readonly messageSquareIcon = MessageSquare;
  readonly phoneIcon = Phone;
  readonly mailIcon = Mail;
  readonly clockIcon = Clock;
  readonly alertTriangleIcon = AlertTriangle;
  readonly checkCircleIcon = CheckCircle;
  readonly searchIcon = Search;
  readonly fileTextIcon = FileText;
  readonly videoIcon = Video;
  readonly downloadIcon = Download;
  readonly externalLinkIcon = ExternalLink;
  readonly ticketIcon = Ticket;
  readonly usersIcon = Users;
  readonly zapIcon = Zap;

  // Forms
  ticketForm!: FormGroup;
  searchForm!: FormGroup;

  // State - Usar el tipo TabType
  activeTab: TabType = 'immediate';
  isSubmittingTicket = false;
  ticketSubmitted = false;
  searchResults: FAQItem[] = [];
  isSearching = false;

  // Agregar la propiedad Date para el template
  currentDate = Date;

  // Data
  supportChannels = [
    {
      type: 'whatsapp',
      title: 'WhatsApp Business',
      description: 'Respuesta inmediata para consultas urgentes',
      contact: '+591 71097542',
      responseTime: 'Inmediato',
      availability: '24/7',
      icon: this.messageSquareIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
    {
      type: 'email',
      title: 'Email Técnico',
      description: 'Para consultas detalladas y documentación',
      contact: 'ineon.software@gmail.com',
      responseTime: '< 4 horas',
      availability: '24/7',
      icon: this.mailIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      type: 'ticket',
      title: 'Sistema de Tickets',
      description: 'Para seguimiento formal de incidencias',
      contact: 'Portal Web',
      responseTime: 'Según SLA',
      availability: '24/7',
      icon: this.ticketIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
    },
  ];

  ticketCategories = [
    { value: 'bug', label: 'Error/Bug en Software' },
    { value: 'feature', label: 'Solicitud de Funcionalidad' },
    { value: 'performance', label: 'Problema de Performance' },
    { value: 'security', label: 'Incidente de Seguridad' },
    { value: 'integration', label: 'Problema de Integración' },
    { value: 'deployment', label: 'Error de Despliegue' },
    { value: 'training', label: 'Solicitud de Capacitación' },
    { value: 'consultation', label: 'Consultoría Técnica' },
    { value: 'other', label: 'Otro' },
  ];

  ticketPriorities = [
    {
      value: 'low',
      label: 'Baja',
      description: 'Sin impacto en operaciones',
      sla: '48 horas',
      color: 'text-gray-600',
    },
    {
      value: 'medium',
      label: 'Media',
      description: 'Impacto menor en operaciones',
      sla: '24 horas',
      color: 'text-yellow-600',
    },
    {
      value: 'high',
      label: 'Alta',
      description: 'Impacto significativo',
      sla: '4 horas',
      color: 'text-orange-600',
    },
    {
      value: 'critical',
      label: 'Crítica',
      description: 'Sistema no funcional',
      sla: '1 hora',
      color: 'text-red-600',
    },
  ];

  faqCategories = [
    {
      id: 'general',
      title: 'Preguntas Generales',
      icon: this.fileTextIcon,
      count: 12,
    },
    {
      id: 'technical',
      title: 'Soporte Técnico',
      icon: this.zapIcon,
      count: 24,
    },
    {
      id: 'development',
      title: 'Desarrollo',
      icon: this.messageSquareIcon,
      count: 18,
    },
    {
      id: 'quality',
      title: 'Calidad (SQAP)',
      icon: this.checkCircleIcon,
      count: 8,
    },
  ];

  featuredFAQs: FAQItem[] = [
    {
      id: '1',
      question: '¿Cómo reportar un error en mi aplicación?',
      answer:
        'Para reportar un error, puedes crear un ticket de soporte con la siguiente información: pasos para reproducir el error, capturas de pantalla, logs del sistema y versión del software. Nuestro equipo analizará el problema en menos de 4 horas.',
      category: 'technical',
      tags: ['error', 'bug', 'reporte'],
      helpful: 45,
      views: 127,
    },
    {
      id: '2',
      question: '¿Qué incluye el soporte técnico de iNeon?',
      answer:
        'Nuestro soporte incluye: resolución de bugs, actualizaciones de seguridad, optimización de performance, consultoría técnica, capacitación del equipo y soporte 24/7 para incidencias críticas.',
      category: 'general',
      tags: ['soporte', 'servicios', 'sla'],
      helpful: 38,
      views: 94,
    },
    {
      id: '3',
      question: '¿Cómo implementar SQAP en mi proyecto?',
      answer:
        'La implementación de SQAP (Software Quality Assurance Plan) incluye: análisis de requisitos, definición de procesos, implementación IEEE 730, auditorías de calidad y capacitación del equipo. Contacta con nuestros especialistas para un plan personalizado.',
      category: 'quality',
      tags: ['sqap', 'calidad', 'ieee730'],
      helpful: 31,
      views: 76,
    },
    {
      id: '4',
      question: '¿Cuál es el tiempo de respuesta para diferentes prioridades?',
      answer:
        'Nuestros SLA son: Crítico (1 hora), Alto (4 horas), Medio (24 horas), Bajo (48 horas). Para emergencias críticas, contáctanos por WhatsApp para respuesta inmediata.',
      category: 'general',
      tags: ['sla', 'tiempo', 'respuesta'],
      helpful: 52,
      views: 156,
    },
  ];

  resources = [
    {
      title: 'Manual SQAP Completo',
      description: 'Guía completa de implementación IEEE 730',
      type: 'pdf',
      icon: this.downloadIcon,
      action: 'download',
      url: '#',
    },
    {
      title: 'Guía de Mejores Prácticas',
      description: 'Desarrollo de software con estándares de calidad',
      type: 'guide',
      icon: this.fileTextIcon,
      action: 'view',
      url: '#',
    },
    {
      title: 'Videos Tutoriales',
      description: 'Capacitación técnica en video',
      type: 'video',
      icon: this.videoIcon,
      action: 'external',
      url: 'https://youtube.com/ineon',
    },
    {
      title: 'Portal del Cliente',
      description: 'Acceso a proyectos y documentación',
      type: 'portal',
      icon: this.externalLinkIcon,
      action: 'external',
      url: '#',
    },
  ];

  constructor(private fb: FormBuilder, private supportService: SupportService) {
    this.initializeForms();
  }

  ngOnInit(): void {
    // Component initialization
  }

  private initializeForms(): void {
    this.ticketForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      category: ['', Validators.required],
      priority: ['medium', Validators.required],
      description: ['', [Validators.required, Validators.minLength(50)]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      company: [''],
      phone: [''],
      systemInfo: [''],
    });

    this.searchForm = this.fb.group({
      query: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  // Corregir el método setActiveTab para aceptar string y validar internamente
  setActiveTab(tab: string): void {
    // Validar que el tab sea uno de los valores permitidos
    if (
      tab === 'immediate' ||
      tab === 'tickets' ||
      tab === 'faq' ||
      tab === 'resources'
    ) {
      this.activeTab = tab as TabType;
    } else {
      console.warn(`Invalid tab: ${tab}. Falling back to 'immediate'.`);
      this.activeTab = 'immediate';
    }
  }

  async submitTicket(): Promise<void> {
    if (this.ticketForm.valid && !this.isSubmittingTicket) {
      this.isSubmittingTicket = true;

      try {
        const ticketData = this.ticketForm.value;
        await this.supportService.createTicket(ticketData).toPromise();

        this.ticketSubmitted = true;
        this.ticketForm.reset();

        // Auto-hide success message after 10 seconds
        setTimeout(() => {
          this.ticketSubmitted = false;
        }, 10000);
      } catch (error) {
        console.error('Error creating ticket:', error);
        // Handle error (could show toast notification)
      } finally {
        this.isSubmittingTicket = false;
      }
    } else {
      this.markFormGroupTouched(this.ticketForm);
    }
  }

  async searchFAQ(): Promise<void> {
    if (this.searchForm.valid && !this.isSearching) {
      this.isSearching = true;

      try {
        const query = this.searchForm.value.query;
        this.searchResults =
          (await this.supportService.searchFAQ(query).toPromise()) || [];
      } catch (error) {
        console.error('Error searching FAQ:', error);
        this.searchResults = [];
      } finally {
        this.isSearching = false;
      }
    }
  }

  openSupportChannel(channel: any): void {
    switch (channel.type) {
      case 'whatsapp':
        this.openWhatsApp();
        break;
      case 'email':
        this.openEmailClient();
        break;
      case 'ticket':
        this.setActiveTab('tickets');
        break;
    }
  }

  // Hacer público el método openWhatsApp para que el template pueda acceder
  public openWhatsApp(): void {
    const message = encodeURIComponent(
      'Hola! Necesito soporte técnico urgente para mi proyecto con iNeon.'
    );
    const whatsappUrl = `https://wa.me/59171097542?text=${message}`;
    window.open(whatsappUrl, '_blank');
  }

  private openEmailClient(): void {
    const subject = encodeURIComponent('Soporte Técnico - iNeon');
    const body = encodeURIComponent(`Hola equipo de iNeon,

Necesito asistencia técnica con:

Proyecto: [Nombre del proyecto]
Descripción del problema: [Describe detalladamente]
Prioridad: [Baja/Media/Alta/Crítica]

Información del sistema:
- Versión del software:
- Sistema operativo:
- Navegador (si aplica):

Pasos para reproducir:
1.
2.
3.

Gracias por su pronta atención.

Saludos.`);

    const mailtoUrl = `mailto:ineon.software@gmail.com?subject=${subject}&body=${body}`;
    window.open(mailtoUrl);
  }

  executeResourceAction(resource: any): void {
    switch (resource.action) {
      case 'download':
        // Trigger download
        const event = new CustomEvent('downloadSQAP');
        window.dispatchEvent(event);
        break;
      case 'external':
        window.open(resource.url, '_blank');
        break;
      case 'view':
        // Handle view action
        console.log('View resource:', resource.title);
        break;
    }
  }

  isFieldInvalid(formName: 'ticket' | 'search', fieldName: string): boolean {
    const form = formName === 'ticket' ? this.ticketForm : this.searchForm;
    const field = form.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(formName: 'ticket' | 'search', fieldName: string): string {
    const form = formName === 'ticket' ? this.ticketForm : this.searchForm;
    const field = form.get(fieldName);

    if (field?.errors) {
      if (field.errors['required']) return 'Este campo es requerido';
      if (field.errors['email']) return 'Ingresa un email válido';
      if (field.errors['minlength']) {
        const requiredLength = field.errors['minlength'].requiredLength;
        return `Mínimo ${requiredLength} caracteres`;
      }
    }

    return '';
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  markFAQHelpful(faq: FAQItem): void {
    faq.helpful++;
    // In a real app, you'd call the service to update this
    this.supportService.markFAQHelpful(faq.id).subscribe();
    console.log(`FAQ ${faq.id} marked as helpful`);
  }

  trackByFAQ(index: number, item: FAQItem): string {
    return item.id;
  }

  trackByResource(index: number, item: any): string {
    return item.title;
  }
}
