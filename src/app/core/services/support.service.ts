import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { delay, map } from 'rxjs/operators';

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
    phone?: string;
  };
  systemInfo?: string;
  assignedTo?: string;
  resolution?: string;
  estimatedResolution?: Date;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  helpful: number;
  views: number;
  lastUpdated: Date;
  relatedFAQs?: string[];
}

export interface SupportMetrics {
  totalTickets: number;
  openTickets: number;
  averageResponseTime: number;
  customerSatisfaction: number;
  resolvedTickets: number;
}

@Injectable({
  providedIn: 'root',
})
export class SupportService {
  // Estado interno del servicio
  private ticketsSubject = new BehaviorSubject<SupportTicket[]>([]);
  public tickets$ = this.ticketsSubject.asObservable();

  private metricsSubject = new BehaviorSubject<SupportMetrics>({
    totalTickets: 1247,
    openTickets: 23,
    averageResponseTime: 2.3, // horas
    customerSatisfaction: 4.8,
    resolvedTickets: 1224,
  });
  public metrics$ = this.metricsSubject.asObservable();

  // Datos simulados de FAQ
  private faqDatabase: FAQItem[] = [
    {
      id: '1',
      question: '¿Cómo reportar un error en mi aplicación?',
      answer:
        'Para reportar un error de manera efectiva, sigue estos pasos: 1) Documenta los pasos exactos para reproducir el problema. 2) Toma capturas de pantalla o graba un video del comportamiento inesperado. 3) Revisa los logs del sistema o consola del navegador. 4) Incluye información del entorno (SO, navegador, versión). 5) Crea un ticket con prioridad según el impacto en tu operación. Nuestro equipo analizará el problema y te contactará dentro del SLA establecido según la prioridad.',
      category: 'technical',
      tags: ['error', 'bug', 'reporte', 'debugging'],
      helpful: 45,
      views: 127,
      lastUpdated: new Date('2024-01-15'),
      relatedFAQs: ['2', '8'],
    },
    {
      id: '2',
      question: '¿Qué incluye el soporte técnico de iNeon?',
      answer:
        'Nuestro soporte técnico integral incluye: • Resolución de bugs y errores del software • Actualizaciones de seguridad y parches • Optimización de performance y escalabilidad • Consultoría técnica y arquitectural • Capacitación para tu equipo técnico • Soporte de infraestructura y DevOps • Migración y actualización de sistemas • Monitoreo proactivo 24/7 para sistemas críticos • Documentación técnica actualizada • Acceso prioritario a nuevas funcionalidades.',
      category: 'general',
      tags: ['soporte', 'servicios', 'sla', 'incluye'],
      helpful: 38,
      views: 94,
      lastUpdated: new Date('2024-01-20'),
      relatedFAQs: ['4', '7'],
    },
    {
      id: '3',
      question: '¿Cómo implementar SQAP (IEEE 730) en mi proyecto?',
      answer:
        'La implementación de SQAP requiere un enfoque estructurado: 1) Análisis inicial de requisitos de calidad. 2) Definición de procesos y métricas de calidad. 3) Establecimiento de criterios de aceptación. 4) Implementación de revisiones técnicas formales. 5) Configuración de herramientas de testing automatizado. 6) Documentación de procedimientos SRS y SDD. 7) Capacitación del equipo en estándares IEEE 730. 8) Auditorías periódicas de cumplimiento. Ofrecemos consultoría especializada para implementar SQAP adaptado a tu contexto específico.',
      category: 'quality',
      tags: ['sqap', 'calidad', 'ieee730', 'implementacion'],
      helpful: 31,
      views: 76,
      lastUpdated: new Date('2024-01-18'),
      relatedFAQs: ['9', '10'],
    },
    {
      id: '4',
      question:
        '¿Cuáles son los tiempos de respuesta para diferentes prioridades?',
      answer:
        'Nuestros SLA garantizados son: • CRÍTICO: Respuesta en 1 hora, disponible 24/7 vía WhatsApp para emergencias que afecten operaciones críticas. • ALTO: Respuesta en 4 horas durante horario laboral, escalación automática si no se resuelve en 24h. • MEDIO: Respuesta en 24 horas, resolución objetivo en 72 horas. • BAJO: Respuesta en 48 horas, resolución en próxima ventana de mantenimiento. Incluimos actualizaciones cada 24h y notificaciones automáticas de progreso.',
      category: 'general',
      tags: ['sla', 'tiempo', 'respuesta', 'prioridad'],
      helpful: 52,
      views: 156,
      lastUpdated: new Date('2024-01-22'),
      relatedFAQs: ['1', '2'],
    },
    {
      id: '5',
      question: '¿Cómo optimizar el performance de mi aplicación web?',
      answer:
        'Para optimizar performance web implementamos: Frontend: • Lazy loading de componentes y rutas • Code splitting y tree shaking • Optimización de imágenes (WebP, lazy loading) • CDN para assets estáticos • Minificación y compresión Gzip/Brotli. Backend: • Database indexing y query optimization • Caching strategies (Redis/Memcached) • Connection pooling • API rate limiting • Monitoreo con APM tools. Realizamos auditorías de performance completas con métricas Web Vitals.',
      category: 'technical',
      tags: ['performance', 'optimizacion', 'web', 'velocidad'],
      helpful: 67,
      views: 203,
      lastUpdated: new Date('2024-01-25'),
      relatedFAQs: ['11', '12'],
    },
    {
      id: '6',
      question: '¿Qué medidas de seguridad implementa iNeon?',
      answer:
        'Implementamos seguridad multicapa: • Autenticación: JWT con refresh tokens, OAuth 2.0, MFA • Autorización: RBAC granular, least privilege principle • Datos: Encriptación AES-256 en reposo y TLS 1.3 en tránsito • Código: SAST/DAST, dependency scanning, code reviews • Infraestructura: WAF, DDoS protection, network segmentation • Compliance: OWASP Top 10, auditorías de penetration testing • Monitoreo: SIEM, threat detection, incident response 24/7.',
      category: 'technical',
      tags: ['seguridad', 'security', 'proteccion', 'encriptacion'],
      helpful: 41,
      views: 118,
      lastUpdated: new Date('2024-01-20'),
      relatedFAQs: ['13', '14'],
    },
    {
      id: '7',
      question: '¿Ofrecen capacitación técnica para equipos?',
      answer:
        'Sí, ofrecemos programas de capacitación técnica personalizados: • Workshops prácticos de desarrollo • Entrenamiento en mejores prácticas • Certificación en tecnologías específicas • Mentoring técnico uno-a-uno • Bootcamps intensivos • Capacitación en herramientas DevOps • Training en metodologías ágiles • Cursos de arquitectura de software. Modalidades: presencial, remota o híbrida. Incluye materiales, certificados y seguimiento post-capacitación.',
      category: 'general',
      tags: ['capacitacion', 'training', 'equipos', 'educacion'],
      helpful: 29,
      views: 85,
      lastUpdated: new Date('2024-01-16'),
      relatedFAQs: ['15', '16'],
    },
    {
      id: '8',
      question: '¿Cómo manejan las integraciones con sistemas terceros?',
      answer:
        'Manejamos integraciones complejas con expertise: • APIs REST y GraphQL • Webhooks y event-driven architecture • Message queues (RabbitMQ, Apache Kafka) • ESB y middleware integration • Legacy systems modernization • Real-time data synchronization • Error handling y retry mechanisms • Monitoring y logging de integraciones • Testing automatizado de APIs • Documentación completa con OpenAPI/Swagger.',
      category: 'technical',
      tags: ['integracion', 'api', 'sistemas', 'terceros'],
      helpful: 34,
      views: 92,
      lastUpdated: new Date('2024-01-19'),
      relatedFAQs: ['17', '18'],
    },
  ];

  constructor() {
    // Inicializar con algunos tickets de ejemplo
    this.initializeMockData();
  }

  // Crear nuevo ticket de soporte
  createTicket(ticketData: any): Observable<SupportTicket> {
    const newTicket: SupportTicket = {
      id: this.generateTicketId(),
      title: ticketData.title,
      description: ticketData.description,
      priority: ticketData.priority,
      category: ticketData.category,
      status: 'open',
      createdAt: new Date(),
      updatedAt: new Date(),
      customerInfo: {
        name: ticketData.name,
        email: ticketData.email,
        company: ticketData.company,
        phone: ticketData.phone,
      },
      systemInfo: ticketData.systemInfo,
      estimatedResolution: this.calculateEstimatedResolution(
        ticketData.priority
      ),
    };

    // Simular guardado en servidor
    return of(newTicket).pipe(
      delay(1500), // Simular latencia de red
      map((ticket) => {
        // Actualizar lista local
        const currentTickets = this.ticketsSubject.value;
        this.ticketsSubject.next([ticket, ...currentTickets]);

        // Actualizar métricas
        this.updateMetrics();

        // Simular notificación automática
        this.sendNotificationEmail(ticket);

        return ticket;
      })
    );
  }

  // Obtener ticket por ID
  getTicket(id: string): Observable<SupportTicket | null> {
    const ticket = this.ticketsSubject.value.find((t) => t.id === id);
    return of(ticket || null).pipe(delay(300));
  }

  // Actualizar estado de ticket
  updateTicketStatus(
    id: string,
    status: SupportTicket['status']
  ): Observable<SupportTicket> {
    return of(null).pipe(
      delay(500),
      map(() => {
        const tickets = this.ticketsSubject.value;
        const ticketIndex = tickets.findIndex((t) => t.id === id);

        if (ticketIndex !== -1) {
          tickets[ticketIndex] = {
            ...tickets[ticketIndex],
            status,
            updatedAt: new Date(),
          };

          this.ticketsSubject.next([...tickets]);
          return tickets[ticketIndex];
        }

        throw new Error('Ticket no encontrado');
      })
    );
  }

  // Buscar en FAQ
  searchFAQ(query: string): Observable<FAQItem[]> {
    const searchTerms = query.toLowerCase().split(' ');

    return of(this.faqDatabase).pipe(
      delay(800), // Simular búsqueda en servidor
      map((faqs) => {
        const results = faqs.filter((faq) => {
          const searchableText = `${faq.question} ${faq.answer} ${faq.tags.join(
            ' '
          )}`.toLowerCase();
          return searchTerms.some((term) => searchableText.includes(term));
        });

        // Ordenar por relevancia (simulado)
        return results.sort((a, b) => {
          const aScore = this.calculateRelevanceScore(a, searchTerms);
          const bScore = this.calculateRelevanceScore(b, searchTerms);
          return bScore - aScore;
        });
      })
    );
  }

  // Obtener FAQ por categoría
  getFAQByCategory(category: string): Observable<FAQItem[]> {
    return of(this.faqDatabase).pipe(
      delay(300),
      map((faqs) => faqs.filter((faq) => faq.category === category))
    );
  }

  // Marcar FAQ como útil
  markFAQHelpful(faqId: string): Observable<boolean> {
    return of(true).pipe(
      delay(200),
      map(() => {
        const faq = this.faqDatabase.find((f) => f.id === faqId);
        if (faq) {
          faq.helpful++;
          return true;
        }
        return false;
      })
    );
  }

  // Incrementar vistas de FAQ
  incrementFAQViews(faqId: string): Observable<boolean> {
    const faq = this.faqDatabase.find((f) => f.id === faqId);
    if (faq) {
      faq.views++;
      return of(true);
    }
    return of(false);
  }

  // Obtener métricas de soporte
  getSupportMetrics(): Observable<SupportMetrics> {
    return this.metrics$.pipe(delay(500));
  }

  // Obtener tickets del usuario
  getUserTickets(email: string): Observable<SupportTicket[]> {
    return this.tickets$.pipe(
      map((tickets) => tickets.filter((t) => t.customerInfo.email === email))
    );
  }

  // Obtener estadísticas de categorías
  getCategoryStats(): Observable<{ category: string; count: number }[]> {
    return this.tickets$.pipe(
      map((tickets) => {
        const stats: { [key: string]: number } = {};
        tickets.forEach((ticket) => {
          stats[ticket.category] = (stats[ticket.category] || 0) + 1;
        });

        return Object.entries(stats).map(([category, count]) => ({
          category,
          count,
        }));
      })
    );
  }

  // Generar reporte de soporte
  generateSupportReport(startDate: Date, endDate: Date): Observable<any> {
    return this.tickets$.pipe(
      delay(2000), // Simular generación de reporte
      map((tickets) => {
        const filteredTickets = tickets.filter(
          (ticket) =>
            ticket.createdAt >= startDate && ticket.createdAt <= endDate
        );

        return {
          period: { startDate, endDate },
          totalTickets: filteredTickets.length,
          byPriority: this.groupBy(filteredTickets, 'priority'),
          byCategory: this.groupBy(filteredTickets, 'category'),
          byStatus: this.groupBy(filteredTickets, 'status'),
          averageResolutionTime:
            this.calculateAverageResolutionTime(filteredTickets),
          customerSatisfaction: 4.7,
          trends: this.calculateTrends(filteredTickets),
        };
      })
    );
  }

  // Métodos privados de utilidad
  private initializeMockData(): void {
    const mockTickets: SupportTicket[] = [
      {
        id: 'TK240001',
        title: 'Error en módulo de autenticación',
        description:
          'Los usuarios no pueden iniciar sesión después de la última actualización.',
        priority: 'high',
        category: 'bug',
        status: 'in-progress',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        customerInfo: {
          name: 'Ana García',
          email: 'ana.garcia@empresa.com',
          company: 'TechCorp Bolivia',
          phone: '+591 70123456',
        },
        assignedTo: 'Carlos Mendoza',
        estimatedResolution: new Date(Date.now() + 2 * 60 * 60 * 1000),
      },
      {
        id: 'TK240002',
        title: 'Solicitud de nueva funcionalidad de reportes',
        description:
          'Necesitamos generar reportes personalizados con filtros avanzados.',
        priority: 'medium',
        category: 'feature',
        status: 'open',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        customerInfo: {
          name: 'Roberto Silva',
          email: 'roberto.silva@startup.bo',
          company: 'InnovaTech',
          phone: '+591 76987654',
        },
        estimatedResolution: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    ];

    this.ticketsSubject.next(mockTickets);
  }

  private generateTicketId(): string {
    const year = new Date().getFullYear().toString().slice(-2);
    const timestamp = Date.now().toString().slice(-6);
    return `TK${year}${timestamp}`;
  }

  private calculateEstimatedResolution(priority: string): Date {
    const now = new Date();

    // Definir el tipo del objeto hours con índice de cadena
    const hours: { [key: string]: number } = {
      critical: 1,
      high: 4,
      medium: 24,
      low: 48,
    };

    // Usar el operador de acceso seguro con valor por defecto
    const hoursToAdd = hours[priority] || 24;

    return new Date(now.getTime() + hoursToAdd * 60 * 60 * 1000);
  }

  private updateMetrics(): void {
    const currentMetrics = this.metricsSubject.value;
    const tickets = this.ticketsSubject.value;

    const updatedMetrics: SupportMetrics = {
      totalTickets: tickets.length,
      openTickets: tickets.filter((t) =>
        ['open', 'in-progress'].includes(t.status)
      ).length,
      resolvedTickets: tickets.filter((t) =>
        ['resolved', 'closed'].includes(t.status)
      ).length,
      averageResponseTime: this.calculateAverageResponseTime(tickets),
      customerSatisfaction: currentMetrics.customerSatisfaction,
    };

    this.metricsSubject.next(updatedMetrics);
  }

  private calculateAverageResponseTime(tickets: SupportTicket[]): number {
    // Simulación de cálculo de tiempo promedio de respuesta
    return 2.3; // horas
  }

  private calculateAverageResolutionTime(tickets: SupportTicket[]): number {
    const resolvedTickets = tickets.filter((t) => t.status === 'resolved');
    if (resolvedTickets.length === 0) return 0;

    const totalTime = resolvedTickets.reduce((sum, ticket) => {
      const resolutionTime =
        ticket.updatedAt.getTime() - ticket.createdAt.getTime();
      return sum + resolutionTime;
    }, 0);

    return totalTime / resolvedTickets.length / (1000 * 60 * 60); // en horas
  }

  private calculateRelevanceScore(faq: FAQItem, searchTerms: string[]): number {
    let score = 0;
    const text = `${faq.question} ${faq.answer}`.toLowerCase();

    searchTerms.forEach((term) => {
      if (faq.question.toLowerCase().includes(term)) score += 3;
      if (faq.answer.toLowerCase().includes(term)) score += 1;
      if (faq.tags.some((tag) => tag.includes(term))) score += 2;
    });

    return score;
  }

  private groupBy(array: any[], key: string): { [key: string]: number } {
    return array.reduce((groups, item) => {
      const group = item[key];
      groups[group] = (groups[group] || 0) + 1;
      return groups;
    }, {});
  }

  private calculateTrends(tickets: SupportTicket[]): any {
    // Implementar cálculo de tendencias
    return {
      weeklyGrowth: 5.2,
      resolutionImprovement: 12.3,
      satisfactionTrend: 'up',
    };
  }

  private sendNotificationEmail(ticket: SupportTicket): void {
    // Simular envío de email de confirmación
    console.log(
      `Email enviado para ticket ${ticket.id} a ${ticket.customerInfo.email}`
    );

    // En producción, aquí se enviaría un email real
    // this.emailService.sendTicketConfirmation(ticket);
  }

  // Método para simular respuesta automática
  private autoRespond(ticket: SupportTicket): void {
    setTimeout(() => {
      const autoResponse = this.generateAutoResponse(ticket);
      console.log('Respuesta automática:', autoResponse);
    }, 5000);
  }

  private generateAutoResponse(ticket: SupportTicket): string {
    // Definir el tipo con índice de cadena
    const responses: { [key: string]: string } = {
      critical:
        'Hemos recibido tu reporte crítico. Un especialista te contactará en menos de 1 hora.',
      high: 'Ticket de alta prioridad recibido. Te contactaremos dentro de 4 horas.',
      medium: 'Gracias por tu reporte. Te responderemos dentro de 24 horas.',
      low: 'Hemos recibido tu solicitud. Te contactaremos dentro de 48 horas.',
    };

    return responses[ticket.priority] || responses['medium'];
  }
}
