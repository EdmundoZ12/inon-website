import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  LucideAngularModule,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  User,
  MessageSquare,
  Building,
} from 'lucide-angular';
import { ContactService } from '../../core/services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  // Icons
  readonly mailIcon = Mail;
  readonly phoneIcon = Phone;
  readonly mapPinIcon = MapPin;
  readonly clockIcon = Clock;
  readonly sendIcon = Send;
  readonly checkCircleIcon = CheckCircle;
  readonly userIcon = User;
  readonly messageSquareIcon = MessageSquare;
  readonly buildingIcon = Building;

  // Form
  contactForm!: FormGroup;
  isSubmitting = false;
  isSubmitted = false;
  selectedService: string | null = null;

  // Contact Information
  contactInfo = {
    email: 'ineon.software@gmail.com',
    phone: '+591 71097542',
    whatsapp: '+591 71097542',
    address: 'Santa Cruz de la Sierra, Bolivia',
    businessHours: 'Lunes a Viernes: 8:00 AM - 6:00 PM',
    emergencyHours: 'Soporte 24/7 disponible',
  };

  // Services for dropdown
  services = [
    { value: 'custom-development', label: 'Desarrollo de Software a Medida' },
    { value: 'quality-assurance', label: 'Aseguramiento de Calidad (SQAP)' },
    { value: 'consulting', label: 'Consultoría en Ingeniería de Software' },
    { value: 'maintenance', label: 'Mantenimiento y Soporte' },
    { value: 'documentation', label: 'Documentación Técnica' },
    { value: 'audit', label: 'Auditorías de Código' },
    { value: 'other', label: 'Otro (especificar en el mensaje)' },
  ];

  // Project types
  projectTypes = [
    { value: 'web-app', label: 'Aplicación Web' },
    { value: 'mobile-app', label: 'Aplicación Móvil' },
    { value: 'desktop-app', label: 'Aplicación de Escritorio' },
    { value: 'api', label: 'API/Microservicios' },
    { value: 'erp', label: 'Sistema ERP' },
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'other', label: 'Otro' },
  ];

  // Budget ranges
  budgetRanges = [
    { value: 'under-5k', label: 'Menos de $5,000' },
    { value: '5k-15k', label: '$5,000 - $15,000' },
    { value: '15k-50k', label: '$15,000 - $50,000' },
    { value: '50k-plus', label: 'Más de $50,000' },
    { value: 'to-discuss', label: 'A discutir' },
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private contactService: ContactService
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    // Check if a service was pre-selected from query params
    this.route.queryParams.subscribe((params) => {
      if (params['service']) {
        this.selectedService = params['service'];
        this.contactForm.patchValue({ service: params['service'] });
      }
    });
  }

  private initializeForm(): void {
    this.contactForm = this.fb.group({
      // Personal Information
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^[+]?[\d\s\-\(\)]+$/)],
      ],
      company: [''],
      position: [''],

      // Project Information
      service: ['', Validators.required],
      projectType: [''],
      budget: [''],
      timeline: [''],

      // Message
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(20)]],

      // Legal
      acceptTerms: [false, Validators.requiredTrue],
      allowMarketing: [false],
    });
  }

  async onSubmit(): Promise<void> {
    if (this.contactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      try {
        const formData = this.contactForm.value;

        // Call the contact service
        await this.contactService.sendContactForm(formData).toPromise();

        this.isSubmitted = true;
        this.contactForm.reset();

        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          this.isSubmitted = false;
        }, 5000);
      } catch (error) {
        console.error('Error sending contact form:', error);
        // Handle error (could show a toast notification)
      } finally {
        this.isSubmitting = false;
      }
    } else {
      // Mark all fields as touched to show validation errors
      this.markFormGroupTouched(this.contactForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);

    if (field?.errors) {
      if (field.errors['required']) {
        return 'Este campo es requerido';
      }
      if (field.errors['email']) {
        return 'Ingresa un email válido';
      }
      if (field.errors['minlength']) {
        const requiredLength = field.errors['minlength'].requiredLength;
        return `Mínimo ${requiredLength} caracteres`;
      }
      if (field.errors['pattern']) {
        return 'Formato inválido';
      }
    }

    return '';
  }

  openWhatsApp(): void {
    const message = encodeURIComponent(
      'Hola! Me interesa conocer más sobre los servicios de iNeon.'
    );
    const whatsappUrl = `https://wa.me/${this.contactInfo.whatsapp.replace(
      /[^0-9]/g,
      ''
    )}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  }

  openEmailClient(): void {
    const subject = encodeURIComponent('Consulta sobre servicios de iNeon');
    const body = encodeURIComponent(
      'Hola,\n\nMe interesa conocer más sobre sus servicios.\n\nSaludos.'
    );
    const mailtoUrl = `mailto:${this.contactInfo.email}?subject=${subject}&body=${body}`;
    window.open(mailtoUrl);
  }
}
