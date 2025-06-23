import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import emailjs from '@emailjs/browser';

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  position?: string;
  service: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  subject: string;
  message: string;
  acceptTerms: boolean;
  allowMarketing: boolean;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  ticketId?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  // Configuración EmailJS - Reemplazar con tus datos reales
  private readonly SERVICE_ID = 'service_ineon'; // Obtendrás esto de EmailJS
  private readonly TEMPLATE_ID = 'template_contact'; // Obtendrás esto de EmailJS
  private readonly USER_ID = 'your_user_id'; // Obtendrás esto de EmailJS

  constructor() {
    // Inicializar EmailJS
    emailjs.init(this.USER_ID);
  }

  sendContactForm(formData: ContactFormData): Observable<ContactResponse> {
    // Preparar datos para el template de EmailJS
    const templateParams = {
      // Datos del cliente
      client_name: `${formData.firstName} ${formData.lastName}`,
      client_email: formData.email,
      client_phone: formData.phone,
      client_company: formData.company || 'No especificado',
      client_position: formData.position || 'No especificado',

      // Información del proyecto
      service_type: this.getServiceLabel(formData.service),
      project_type: formData.projectType || 'No especificado',
      budget_range: formData.budget || 'No especificado',
      timeline: formData.timeline || 'No especificado',

      // Mensaje
      subject: formData.subject,
      message: formData.message,

      // Email de destino
      to_email: 'ineon.software@gmail.com',

      // Metadatos
      timestamp: new Date().toLocaleString('es-BO'),
      marketing_consent: formData.allowMarketing ? 'Sí' : 'No',
    };

    return from(
      emailjs.send(this.SERVICE_ID, this.TEMPLATE_ID, templateParams)
    ).pipe(
      map((response) => {
        console.log('Email enviado exitosamente:', response);
        return {
          success: true,
          message:
            'Tu mensaje ha sido enviado correctamente. Te contactaremos pronto.',
          ticketId: this.generateTicketId(),
        };
      }),
      catchError((error) => {
        console.error('Error enviando email:', error);
        return of({
          success: false,
          message:
            'Hubo un error al enviar tu mensaje. Por favor, intenta nuevamente o contáctanos por WhatsApp.',
          ticketId: undefined,
        });
      })
    );
  }

  private getServiceLabel(serviceValue: string): string {
    const serviceLabels: { [key: string]: string } = {
      'custom-development': 'Desarrollo de Software a Medida',
      'quality-assurance': 'Aseguramiento de Calidad (SQAP)',
      consulting: 'Consultoría en Ingeniería de Software',
      maintenance: 'Mantenimiento y Soporte',
      documentation: 'Documentación Técnica',
      audit: 'Auditorías de Código',
      other: 'Otro',
    };
    return serviceLabels[serviceValue] || serviceValue;
  }

  private generateTicketId(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `INEON-${timestamp}-${random}`;
  }

  // Método para obtener servicios disponibles
  getAvailableServices(): Observable<{ value: string; label: string }[]> {
    const services = [
      { value: 'custom-development', label: 'Desarrollo de Software a Medida' },
      { value: 'quality-assurance', label: 'Aseguramiento de Calidad (SQAP)' },
      { value: 'consulting', label: 'Consultoría en Ingeniería de Software' },
      { value: 'maintenance', label: 'Mantenimiento y Soporte' },
      { value: 'documentation', label: 'Documentación Técnica' },
      { value: 'audit', label: 'Auditorías de Código' },
      { value: 'other', label: 'Otro (especificar en el mensaje)' },
    ];

    return of(services).pipe(delay(100));
  }

  // Método para validar email (adicional)
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Método para validar teléfono (adicional)
  validatePhone(phone: string): boolean {
    const phoneRegex = /^[+]?[\d\s\-\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 7;
  }
}
