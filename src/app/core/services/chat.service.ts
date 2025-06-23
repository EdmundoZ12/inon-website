import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface TechnicalResource {
  title: string;
  description: string;
  url: string;
  type: 'documentation' | 'tutorial' | 'tool' | 'article';
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor() {}

  // Simular respuesta del bot
  getBotResponse(message: string): Observable<string> {
    // En una implementación real, aquí se conectaría con un API de chatbot o IA
    const responses = this.generateTechnicalResponse(message);
    return of(responses).pipe(delay(1000));
  }

  private generateTechnicalResponse(message: string): string {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('angular')) {
      return 'Angular es un framework excelente para aplicaciones empresariales. ¿Necesitas ayuda con algún aspecto específico como routing, servicios o componentes?';
    }

    if (lowerMessage.includes('react')) {
      return 'React es muy popular para interfaces dinámicas. ¿Estás trabajando con hooks, state management o performance optimization?';
    }

    if (lowerMessage.includes('node') || lowerMessage.includes('backend')) {
      return 'Node.js es perfecto para backends escalables. ¿Necesitas ayuda con APIs REST, microservicios o base de datos?';
    }

    if (lowerMessage.includes('database') || lowerMessage.includes('sql')) {
      return 'Las bases de datos son críticas para la performance. ¿Trabajas con SQL, NoSQL o necesitas optimización de consultas?';
    }

    return 'Interesante pregunta técnica. ¿Podrías ser más específico sobre el problema o tecnología que te interesa?';
  }

  // Recursos técnicos predefinidos
  getTechnicalResources(category: string): TechnicalResource[] {
    const resources: { [key: string]: TechnicalResource[] } = {
      quality: [
        {
          title: 'IEEE 730 Standard',
          description: 'Estándar para planes de aseguramiento de calidad',
          url: 'https://standards.ieee.org/standard/730-2014.html',
          type: 'documentation',
        },
        {
          title: 'Manual SQAP iNeon',
          description: 'Nuestro manual completo de calidad',
          url: '/assets/documents/sqap-manual.pdf',
          type: 'documentation',
        },
      ],
      architecture: [
        {
          title: 'Clean Architecture Guide',
          description: 'Principios de arquitectura limpia',
          url: 'https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html',
          type: 'article',
        },
        {
          title: 'Microservices Patterns',
          description: 'Patrones para microservicios',
          url: 'https://microservices.io/patterns/',
          type: 'documentation',
        },
      ],
      performance: [
        {
          title: 'Web Performance Best Practices',
          description: 'Mejores prácticas de optimización web',
          url: 'https://web.dev/performance/',
          type: 'tutorial',
        },
      ],
    };

    return resources[category] || [];
  }

  // Analizar intención del usuario
  analyzeIntent(message: string): string {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('error') || lowerMessage.includes('bug')) {
      return 'debugging';
    }

    if (lowerMessage.includes('performance') || lowerMessage.includes('slow')) {
      return 'performance';
    }

    if (
      lowerMessage.includes('security') ||
      lowerMessage.includes('vulnerability')
    ) {
      return 'security';
    }

    if (
      lowerMessage.includes('architecture') ||
      lowerMessage.includes('design')
    ) {
      return 'architecture';
    }

    if (lowerMessage.includes('quality') || lowerMessage.includes('testing')) {
      return 'quality';
    }

    return 'general';
  }

  // Obtener sugerencias basadas en el contexto
  getContextualSuggestions(intent: string): string[] {
    const suggestions: { [key: string]: string[] } = {
      debugging: [
        '¿Qué tipo de error estás viendo?',
        '¿En qué navegador ocurre?',
        '¿Tienes logs del error?',
        '¿Es un error de runtime o compilación?',
      ],
      performance: [
        '¿Qué parte de la aplicación es lenta?',
        '¿Has medido los tiempos de carga?',
        '¿Es frontend o backend?',
        '¿Cuántos usuarios concurrentes tienes?',
      ],
      security: [
        '¿Qué tipo de aplicación estás protegiendo?',
        '¿Manejas datos sensibles?',
        '¿Necesitas auditoría de seguridad?',
        '¿Qué framework estás usando?',
      ],
      architecture: [
        '¿Qué tipo de aplicación estás diseñando?',
        '¿Cuáles son los requisitos de escalabilidad?',
        '¿Prefieren monolítico o microservicios?',
        '¿Qué tecnologías están considerando?',
      ],
      quality: [
        '¿Qué nivel de testing necesitas?',
        '¿Requieren documentación IEEE?',
        '¿Cuál es el presupuesto para calidad?',
        '¿Hay deadlines específicos?',
      ],
    };

    return (
      suggestions[intent] || [
        '¿Puedes contarme más detalles?',
        '¿En qué tecnología trabajas?',
        '¿Es para un proyecto nuevo?',
        '¿Necesitas una cotización?',
      ]
    );
  }
}
