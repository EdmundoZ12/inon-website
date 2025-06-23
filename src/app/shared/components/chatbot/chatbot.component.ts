import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewChecked,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  LucideAngularModule,
  MessageSquare,
  Send,
  X,
  Minimize2,
  Code,
  Bug,
  FileText,
  Headphones,
  ExternalLink,
} from 'lucide-angular';
import { ChatService } from '../../../core/services/chat.service';

export interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  type?: 'text' | 'options' | 'code' | 'link';
  options?: ChatOption[];
  codeSnippet?: string;
  links?: ChatLink[];
}

export interface ChatOption {
  id: string;
  text: string;
  value: string;
  icon?: any;
}

export interface ChatLink {
  text: string;
  url: string;
  external?: boolean;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss'],
})
export class ChatbotComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('chatMessages') private chatMessagesContainer!: ElementRef;
  @ViewChild('messageInput') private messageInput!: ElementRef;

  // Icons
  readonly messageSquareIcon = MessageSquare;
  readonly sendIcon = Send;
  readonly xIcon = X;
  readonly minimize2Icon = Minimize2;
  readonly codeIcon = Code;
  readonly bugIcon = Bug;
  readonly fileTextIcon = FileText;
  readonly headphonesIcon = Headphones;
  readonly externalLinkIcon = ExternalLink;

  // Chat state
  isOpen = false;
  isMinimized = false;
  messages: ChatMessage[] = [];
  currentMessage = '';
  isTyping = false;
  hasNewMessages = false;

  // Technical categories
  technicalCategories: ChatOption[] = [
    {
      id: 'quality',
      text: 'Aseguramiento de Calidad',
      value: 'quality',
      icon: this.fileTextIcon,
    },
    {
      id: 'debug',
      text: 'Debugging y Testing',
      value: 'debug',
      icon: this.bugIcon,
    },
    {
      id: 'architecture',
      text: 'Arquitectura de Software',
      value: 'architecture',
      icon: this.codeIcon,
    },
    {
      id: 'performance',
      text: 'Optimización y Performance',
      value: 'performance',
      icon: this.codeIcon,
    },
    {
      id: 'security',
      text: 'Seguridad de Aplicaciones',
      value: 'security',
      icon: this.fileTextIcon,
    },
    {
      id: 'support',
      text: 'Soporte Técnico',
      value: 'support',
      icon: this.headphonesIcon,
    },
  ];

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.initializeChat();
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  private initializeChat(): void {
    // Welcome message
    this.addBotMessage(
      '¡Hola! 👋 Soy el asistente técnico de iNeon. Estoy aquí para ayudarte con consultas sobre desarrollo de software, calidad y mejores prácticas.',
      'text'
    );

    // Show main menu after a short delay
    setTimeout(() => {
      this.showMainMenu();
    }, 1000);
  }

  private showMainMenu(): void {
    this.addBotMessage(
      '¿En qué área técnica puedo asistirte hoy?',
      'options',
      this.technicalCategories
    );
  }

  toggleChat(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.isMinimized = false;
      this.hasNewMessages = false;
      setTimeout(() => {
        this.focusInput();
      }, 300);
    }
  }

  minimizeChat(): void {
    this.isMinimized = true;
  }

  maximizeChat(): void {
    this.isMinimized = false;
    this.focusInput();
  }

  closeChat(): void {
    this.isOpen = false;
    this.isMinimized = false;
  }

  private focusInput(): void {
    if (this.messageInput) {
      this.messageInput.nativeElement.focus();
    }
  }

  sendMessage(): void {
    if (this.currentMessage.trim()) {
      this.addUserMessage(this.currentMessage);
      this.processUserMessage(this.currentMessage);
      this.currentMessage = '';
    }
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  selectOption(option: ChatOption): void {
    this.addUserMessage(option.text);
    this.processOptionSelection(option);
  }

  private addUserMessage(text: string): void {
    const message: ChatMessage = {
      id: this.generateId(),
      text,
      isBot: false,
      timestamp: new Date(),
      type: 'text',
    };
    this.messages.push(message);
  }

  private addBotMessage(
    text: string,
    type: 'text' | 'options' | 'code' | 'link' = 'text',
    options?: ChatOption[],
    codeSnippet?: string,
    links?: ChatLink[]
  ): void {
    this.isTyping = true;

    setTimeout(() => {
      const message: ChatMessage = {
        id: this.generateId(),
        text,
        isBot: true,
        timestamp: new Date(),
        type,
        options,
        codeSnippet,
        links,
      };

      this.messages.push(message);
      this.isTyping = false;

      if (!this.isOpen) {
        this.hasNewMessages = true;
      }
    }, 1000);
  }

  private processUserMessage(message: string): void {
    const lowerMessage = message.toLowerCase();

    // Saludos y cortesías
    if (this.isGreeting(lowerMessage)) {
      this.handleGreeting();
    }
    // Servicios de iNeon
    else if (this.isServicesQuestion(lowerMessage)) {
      this.handleServicesQuestion();
    }
    // Precios y costos
    else if (this.isPricingQuestion(lowerMessage)) {
      this.handlePricingQuestion();
    }
    // Contacto o humano
    else if (this.isContactRequest(lowerMessage)) {
      this.handleContactRequest();
    }
    // SQAP y calidad
    else if (this.isQualityQuestion(lowerMessage)) {
      this.handleQualityQuestion();
    }
    // Errores y debugging
    else if (this.isDebuggingQuestion(lowerMessage)) {
      this.handleDebuggingQuestion();
    }
    // Performance
    else if (this.isPerformanceQuestion(lowerMessage)) {
      this.handlePerformanceQuestion();
    }
    // Seguridad
    else if (this.isSecurityQuestion(lowerMessage)) {
      this.handleSecurityQuestion();
    }
    // Tecnologías específicas
    else if (this.isTechnologyQuestion(lowerMessage)) {
      this.handleTechnologyQuestion(lowerMessage);
    }
    // Tiempo de desarrollo
    else if (this.isTimelineQuestion(lowerMessage)) {
      this.handleTimelineQuestion();
    }
    // Empresa iNeon
    else if (this.isCompanyQuestion(lowerMessage)) {
      this.handleCompanyQuestion();
    }
    // Pregunta general
    else {
      this.handleGeneralQuestion();
    }
  }

  // Métodos auxiliares para detectar tipos de preguntas
  private isGreeting(message: string): boolean {
    const greetings = [
      'hola',
      'buenos días',
      'buenas tardes',
      'buenas noches',
      'hey',
      'hello',
      'hi',
      'saludos',
      'buenas',
    ];
    return greetings.some((greeting) => message.includes(greeting));
  }

  private isServicesQuestion(message: string): boolean {
    const serviceKeywords = [
      'servicios',
      'qué ofrece',
      'que ofrece',
      'qué hace',
      'que hace',
      'qué hacen',
      'que hacen',
      'servicio',
      'ofrecen',
      'hacen',
    ];
    return serviceKeywords.some((keyword) => message.includes(keyword));
  }

  private isPricingQuestion(message: string): boolean {
    const pricingKeywords = [
      'precio',
      'costo',
      'cotización',
      'cotizacion',
      'cuánto cuesta',
      'cuanto cuesta',
      'tarifas',
      'presupuesto',
    ];
    return pricingKeywords.some((keyword) => message.includes(keyword));
  }

  private isContactRequest(message: string): boolean {
    const contactKeywords = [
      'contacto',
      'humano',
      'persona',
      'hablar',
      'comunicar',
      'llamar',
      'whatsapp',
      'teléfono',
      'telefono',
    ];
    return contactKeywords.some((keyword) => message.includes(keyword));
  }

  private isQualityQuestion(message: string): boolean {
    const qualityKeywords = [
      'sqap',
      'calidad',
      'ieee',
      '730',
      'estándar',
      'estandar',
      'manual',
    ];
    return qualityKeywords.some((keyword) => message.includes(keyword));
  }

  private isDebuggingQuestion(message: string): boolean {
    const debugKeywords = [
      'error',
      'bug',
      'problema',
      'falla',
      'no funciona',
      'debugging',
      'debug',
    ];
    return debugKeywords.some((keyword) => message.includes(keyword));
  }

  private isPerformanceQuestion(message: string): boolean {
    const perfKeywords = [
      'performance',
      'optimizar',
      'optimización',
      'lento',
      'rapidez',
      'velocidad',
      'mejorar',
    ];
    return perfKeywords.some((keyword) => message.includes(keyword));
  }

  private isSecurityQuestion(message: string): boolean {
    const securityKeywords = [
      'seguridad',
      'security',
      'protección',
      'proteccion',
      'vulnerabilidad',
      'hackeo',
    ];
    return securityKeywords.some((keyword) => message.includes(keyword));
  }

  private isTechnologyQuestion(message: string): boolean {
    const techKeywords = [
      'angular',
      'react',
      'node',
      'javascript',
      'python',
      'java',
      'php',
      'laravel',
      'vue',
      'mongodb',
      'mysql',
    ];
    return techKeywords.some((keyword) => message.includes(keyword));
  }

  private isTimelineQuestion(message: string): boolean {
    const timeKeywords = [
      'tiempo',
      'cuánto demora',
      'cuanto demora',
      'duración',
      'duracion',
      'plazo',
      'cronograma',
    ];
    return timeKeywords.some((keyword) => message.includes(keyword));
  }

  private isCompanyQuestion(message: string): boolean {
    const companyKeywords = [
      'ineon',
      'empresa',
      'compañía',
      'compania',
      'quiénes son',
      'quienes son',
      'sobre ustedes',
    ];
    return companyKeywords.some((keyword) => message.includes(keyword));
  }

  private processOptionSelection(option: ChatOption): void {
    switch (option.value) {
      case 'quality':
        this.handleQualityCategory();
        break;
      case 'debug':
        this.handleDebuggingCategory();
        break;
      case 'architecture':
        this.handleArchitectureCategory();
        break;
      case 'performance':
        this.handlePerformanceCategory();
        break;
      case 'security':
        this.handleSecurityCategory();
        break;
      case 'support':
        this.handleSupportCategory();
        break;
      case 'download':
        this.handleDownloadSQAP();
        break;
      case 'contact':
        this.handleContactRequest();
        break;
      case 'main':
        this.showMainMenu();
        break;
      // Nuevos casos
      case 'services_info':
        this.handleServicesQuestion();
        break;
      case 'pricing_info':
        this.handlePricingQuestion();
        break;
      case 'development_info':
        this.handleDevelopmentInfo();
        break;
      case 'consulting_info':
        this.handleConsultingInfo();
        break;
      default:
        this.showMainMenu();
    }
  }

  private handleDevelopmentInfo(): void {
    this.addBotMessage(
      'Nuestro servicio de desarrollo de software a medida incluye:',
      'code',
      [],
      `💻 DESARROLLO DE SOFTWARE A MEDIDA:

TIPOS DE APLICACIONES:
• Aplicaciones web (SPA, PWA)
• Aplicaciones móviles (iOS, Android)
• Sistemas de escritorio
• APIs y microservicios
• Sistemas empresariales (ERP, CRM)

TECNOLOGÍAS:
• Frontend: Angular, React, Vue.js
• Backend: Node.js, Java, Python, PHP
• Bases de datos: MySQL, PostgreSQL, MongoDB
• Cloud: AWS, Azure, Google Cloud

METODOLOGÍA:
• Desarrollo ágil (Scrum)
• Entrega continua (CI/CD)
• Testing automatizado
• Documentación completa
• Soporte post-lanzamiento

GARANTÍAS:
• Código limpio y documentado
• Testing exhaustivo
• Entrega puntual
• Soporte por 6 meses incluido`
    );

    setTimeout(() => {
      this.addBotMessage(
        '¿Qué tipo de aplicación tienes en mente?',
        'options',
        [
          { id: 'web', text: 'Aplicación Web', value: 'contact' },
          { id: 'mobile', text: 'Aplicación Móvil', value: 'contact' },
          { id: 'enterprise', text: 'Sistema Empresarial', value: 'contact' },
          { id: 'back', text: '← Volver a servicios', value: 'services_info' },
        ]
      );
    }, 3000);
  }

  private handleConsultingInfo(): void {
    this.addBotMessage(
      'Nuestro servicio de consultoría técnica abarca:',
      'code',
      [],
      `🔧 CONSULTORÍA TÉCNICA:

ÁREAS DE ESPECIALIDAD:
• Arquitectura de software
• Auditoría de código existente
• Optimización de performance
• Migración de sistemas legacy
• Implementación de DevOps
• Seguridad de aplicaciones

PROCESO DE CONSULTORÍA:
1. Análisis inicial (gratuito)
2. Diagnóstico detallado
3. Plan de mejoras
4. Implementación guiada
5. Capacitación del equipo
6. Seguimiento post-implementación

BENEFICIOS:
• Reducción de costos operativos
• Mejora en performance
• Mayor escalabilidad
• Procesos optimizados
• Equipo capacitado

MODALIDADES:
• Consultoría remota
• Consultoría presencial
• Proyectos a largo plazo
• Capacitación de equipos`
    );

    setTimeout(() => {
      this.addBotMessage(
        '¿En qué área específica necesitas consultoría?',
        'options',
        [
          {
            id: 'architecture',
            text: 'Arquitectura de Software',
            value: 'architecture',
          },
          {
            id: 'performance',
            text: 'Optimización Performance',
            value: 'performance',
          },
          { id: 'security', text: 'Auditoría de Seguridad', value: 'security' },
          { id: 'contact', text: 'Hablar con Consultor', value: 'contact' },
          { id: 'back', text: '← Volver a servicios', value: 'services_info' },
        ]
      );
    }, 3000);
  }

  private handleQualityCategory(): void {
    this.addBotMessage(
      'Excelente elección. En iNeon implementamos SQAP (Software Quality Assurance Plan) basado en IEEE 730.',
      'text'
    );

    setTimeout(() => {
      this.addBotMessage(
        'Nuestro proceso incluye:',
        'code',
        [],
        `• Revisiones Técnicas Formales (RTF)
• Control de Configuración
• Auditorías de Proceso
• Gestión de Métricas de Calidad
• Verificación y Validación (V&V)
• Documentación SRS y SDD`
      );
    }, 2000);

    setTimeout(() => {
      this.addBotMessage(
        '¿Te gustaría saber más sobre algún aspecto específico o descargar nuestro manual SQAP?',
        'options',
        [
          { id: 'rtf', text: 'Revisiones Técnicas Formales', value: 'rtf' },
          { id: 'metrics', text: 'Métricas de Calidad', value: 'metrics' },
          { id: 'download', text: 'Descargar Manual SQAP', value: 'download' },
          { id: 'back', text: '← Volver al menú principal', value: 'main' },
        ]
      );
    }, 4000);
  }

  private handleDebuggingCategory(): void {
    this.addBotMessage(
      'El debugging efectivo es clave para el desarrollo de calidad. Te comparto algunas mejores prácticas:',
      'code',
      [],
      `🔍 ESTRATEGIAS DE DEBUGGING:

1. Logging Estructurado
   - Usar niveles: ERROR, WARN, INFO, DEBUG
   - Incluir contexto: timestamp, usuario, acción

2. Debugging Preventivo
   - Unit Tests con alta cobertura
   - Integration Tests automatizados
   - Code Reviews sistemáticos

3. Herramientas Recomendadas
   - Debuggers integrados (VS Code, IntelliJ)
   - Profilers para performance
   - Static Analysis (SonarQube, ESLint)`
    );

    setTimeout(() => {
      this.addBotMessage(
        '¿Tienes algún problema específico que necesites resolver?',
        'options',
        [
          {
            id: 'frontend',
            text: 'Error en Frontend',
            value: 'frontend_debug',
          },
          { id: 'backend', text: 'Error en Backend', value: 'backend_debug' },
          {
            id: 'database',
            text: 'Problemas de Base de Datos',
            value: 'db_debug',
          },
          {
            id: 'performance_issue',
            text: 'Problemas de Performance',
            value: 'perf_debug',
          },
          { id: 'back', text: '← Volver al menú principal', value: 'main' },
        ]
      );
    }, 3000);
  }

  private handleArchitectureCategory(): void {
    this.addBotMessage(
      'La arquitectura sólida es fundamental. En iNeon seguimos patrones probados:',
      'code',
      [],
      `🏗️ PATRONES ARQUITECTÓNICOS:

• Clean Architecture
  - Separación de responsabilidades
  - Independencia de frameworks
  - Testabilidad alta

• Microservicios
  - Servicios independientes
  - API-first design
  - Escalabilidad horizontal

• SOLID Principles
  - Single Responsibility
  - Open/Closed
  - Liskov Substitution
  - Interface Segregation
  - Dependency Inversion`
    );

    setTimeout(() => {
      this.addBotMessage(
        '¿Qué aspecto arquitectónico te interesa más?',
        'options',
        [
          { id: 'clean', text: 'Clean Architecture', value: 'clean_arch' },
          {
            id: 'microservices',
            text: 'Microservicios',
            value: 'microservices',
          },
          { id: 'solid', text: 'Principios SOLID', value: 'solid' },
          { id: 'patterns', text: 'Design Patterns', value: 'patterns' },
          { id: 'back', text: '← Volver al menú principal', value: 'main' },
        ]
      );
    }, 3000);
  }

  private handlePerformanceCategory(): void {
    this.addBotMessage(
      'La optimización de performance requiere un enfoque sistemático:',
      'code',
      [],
      `⚡ OPTIMIZACIÓN DE PERFORMANCE:

Frontend:
• Lazy Loading de componentes
• Code Splitting
• Image optimization (WebP, lazy loading)
• Minificación y compresión
• CDN para assets estáticos

Backend:
• Database indexing
• Query optimization
• Caching strategies (Redis, Memcached)
• Connection pooling
• Asynchronous processing

Monitoreo:
• Application Performance Monitoring (APM)
• Real User Monitoring (RUM)
• Synthetic monitoring`
    );

    setTimeout(() => {
      this.addBotMessage(
        '¿En qué área específica necesitas optimizar performance?',
        'options',
        [
          {
            id: 'frontend_perf',
            text: 'Performance Frontend',
            value: 'frontend_perf',
          },
          {
            id: 'backend_perf',
            text: 'Performance Backend',
            value: 'backend_perf',
          },
          { id: 'database_perf', text: 'Optimización de BD', value: 'db_perf' },
          {
            id: 'monitoring',
            text: 'Monitoreo y Métricas',
            value: 'monitoring',
          },
          { id: 'back', text: '← Volver al menú principal', value: 'main' },
        ]
      );
    }, 3000);
  }

  private handleSecurityCategory(): void {
    this.addBotMessage(
      'La seguridad debe ser considerada desde el diseño. Estas son nuestras recomendaciones:',
      'code',
      [],
      `🔒 SEGURIDAD DE APLICACIONES:

Autenticación y Autorización:
• JWT con refresh tokens
• OAuth 2.0 / OpenID Connect
• Multi-factor authentication (MFA)
• Role-based access control (RBAC)

Protección de Datos:
• Encriptación en tránsito (HTTPS/TLS)
• Encriptación en reposo
• Hashing seguro de passwords (bcrypt)
• Input validation y sanitization

Mejores Prácticas:
• OWASP Top 10 compliance
• Security headers (CSP, HSTS)
• Regular security audits
• Dependency vulnerability scanning`
    );

    setTimeout(() => {
      this.addBotMessage(
        '¿Qué aspecto de seguridad te preocupa más?',
        'options',
        [
          {
            id: 'auth',
            text: 'Autenticación/Autorización',
            value: 'auth_security',
          },
          { id: 'data', text: 'Protección de Datos', value: 'data_security' },
          { id: 'web', text: 'Seguridad Web (OWASP)', value: 'web_security' },
          {
            id: 'audit',
            text: 'Auditoría de Seguridad',
            value: 'security_audit',
          },
          { id: 'back', text: '← Volver al menú principal', value: 'main' },
        ]
      );
    }, 3000);
  }

  private handleSupportCategory(): void {
    this.addBotMessage(
      'Para soporte técnico especializado, puedes contactarnos directamente:',
      'link',
      [],
      '',
      [
        {
          text: 'Email: ineon.software@gmail.com',
          url: 'mailto:ineon.software@gmail.com',
        },
        {
          text: 'WhatsApp: +591 71097542',
          url: 'https://wa.me/59171097542',
          external: true,
        },
        { text: 'Formulario de Soporte', url: '/support' },
      ]
    );

    setTimeout(() => {
      this.addBotMessage(
        'También puedes describir tu problema aquí y te orientaré sobre la mejor solución.',
        'text'
      );
    }, 2000);

    setTimeout(() => {
      this.showMainMenu();
    }, 4000);
  }

  private handleDownloadSQAP(): void {
    this.addBotMessage(
      'Perfecto! Nuestro manual SQAP contiene toda la información sobre nuestros procesos de calidad basados en IEEE 730.',
      'text'
    );

    setTimeout(() => {
      this.addBotMessage(
        'Puedes descargarlo directamente desde aquí:',
        'link',
        [],
        '',
        [{ text: '📄 Descargar Manual SQAP (PDF)', url: '#', external: false }]
      );
    }, 1500);

    setTimeout(() => {
      this.addBotMessage(
        '¿Hay algo más sobre calidad de software en lo que pueda ayudarte?',
        'options',
        [
          {
            id: 'quality_process',
            text: 'Ver Procesos de Calidad',
            value: 'quality',
          },
          {
            id: 'contact_team',
            text: 'Hablar con el Equipo',
            value: 'contact',
          },
          { id: 'back', text: '← Volver al menú principal', value: 'main' },
        ]
      );
    }, 3000);
  }

  private handlePricingQuestion(): void {
    this.addBotMessage(
      'Los costos varían según la complejidad del proyecto. Te doy un estimado general:',
      'code',
      [],
      `💰 ESTIMADOS DE PROYECTOS:

Desarrollo Web/Móvil:
• App básica: $5,000 - $15,000
• App intermedia: $15,000 - $50,000
• Sistema empresarial: $50,000+

Servicios de Calidad:
• Implementación SQAP: $2,000 - $8,000
• Auditoría de código: $1,000 - $5,000
• Consultoría técnica: $100 - $200/hora

Factores que influyen:
• Complejidad funcional
• Integraciones requeridas
• Nivel de calidad (IEEE 730)
• Timeline del proyecto`
    );

    setTimeout(() => {
      this.addBotMessage(
        'Para una cotización exacta, necesitamos conocer los detalles específicos de tu proyecto.',
        'options',
        [
          { id: 'quote', text: 'Solicitar Cotización', value: 'contact' },
          {
            id: 'contact',
            text: 'Hablar con un Especialista',
            value: 'contact',
          },
          { id: 'back', text: '← Volver al menú principal', value: 'main' },
        ]
      );
    }, 3000);
  }

  private handleContactRequest(): void {
    this.addBotMessage(
      'Te conecto con nuestro equipo técnico. Puedes contactarnos por:',
      'link',
      [],
      '',
      [
        {
          text: '📧 ineon.software@gmail.com',
          url: 'mailto:ineon.software@gmail.com',
        },
        {
          text: '📱 WhatsApp: +591 71097542',
          url: 'https://wa.me/59171097542',
          external: true,
        },
        { text: '📝 Formulario de Contacto', url: '/contact' },
      ]
    );

    setTimeout(() => {
      this.addBotMessage(
        'Nuestro equipo responde en menos de 24 horas. ¿Hay algo más en lo que pueda ayudarte mientras tanto?',
        'text'
      );
    }, 2000);

    setTimeout(() => {
      this.showMainMenu();
    }, 4000);
  }

  private handleQualityQuestion(): void {
    this.addBotMessage(
      'SQAP (Software Quality Assurance Plan) es nuestro diferenciador. Implementamos IEEE 730 para garantizar máxima calidad.',
      'text'
    );

    setTimeout(() => {
      this.addBotMessage(
        '¿Te gustaría descargar nuestro manual completo SQAP o conocer más sobre nuestros procesos?',
        'options',
        [
          {
            id: 'download_sqap',
            text: '📄 Descargar Manual SQAP',
            value: 'download',
          },
          {
            id: 'quality_process',
            text: '⚙️ Ver Procesos de Calidad',
            value: 'quality',
          },
          { id: 'back', text: '← Volver al menú principal', value: 'main' },
        ]
      );
    }, 2000);
  }

  private handleDebuggingQuestion(): void {
    this.addBotMessage(
      'Los errores son parte del desarrollo. ¿Podrías contarme más sobre el problema específico que tienes?',
      'text'
    );

    setTimeout(() => {
      this.addBotMessage(
        'Mientras tanto, aquí tienes un checklist básico de debugging:',
        'code',
        [],
        `🔧 CHECKLIST DE DEBUGGING:

□ Reproducir el error consistentemente
□ Revisar logs de error recientes
□ Verificar configuración del entorno
□ Comprobar dependencias actualizadas
□ Validar inputs/outputs
□ Usar breakpoints para seguir flujo
□ Revisar cambios recientes en código

Si el problema persiste, nuestro equipo técnico puede ayudarte directamente.`
      );
    }, 2000);
  }

  private handlePerformanceQuestion(): void {
    this.addBotMessage(
      'Performance es clave para la experiencia del usuario. ¿En qué área específica necesitas optimizar?',
      'options',
      [
        {
          id: 'frontend_perf',
          text: 'Performance Frontend',
          value: 'performance',
        },
        {
          id: 'backend_perf',
          text: 'Performance Backend',
          value: 'performance',
        },
        {
          id: 'database_perf',
          text: 'Optimización de BD',
          value: 'performance',
        },
        { id: 'back', text: '← Volver al menú principal', value: 'main' },
      ]
    );
  }

  private handleSecurityQuestion(): void {
    this.addBotMessage(
      'La seguridad es fundamental en cualquier aplicación. ¿Qué aspecto específico te preocupa?',
      'options',
      [
        {
          id: 'auth_security',
          text: 'Autenticación/Autorización',
          value: 'security',
        },
        { id: 'data_security', text: 'Protección de Datos', value: 'security' },
        {
          id: 'web_security',
          text: 'Seguridad Web (OWASP)',
          value: 'security',
        },
        { id: 'back', text: '← Volver al menú principal', value: 'main' },
      ]
    );
  }

  private handleGeneralQuestion(): void {
    this.addBotMessage(
      'Interesante pregunta. Como asistente técnico, me especializo en temas de desarrollo de software, calidad y arquitectura.',
      'text'
    );

    setTimeout(() => {
      this.addBotMessage(
        'Si tu consulta es sobre otros temas o necesitas atención personalizada, te recomiendo contactar directamente con nuestro equipo.',
        'options',
        [
          { id: 'contact', text: 'Contactar Equipo Humano', value: 'contact' },
          { id: 'back', text: '← Ver Opciones Técnicas', value: 'main' },
        ]
      );
    }, 2000);
  }

  // Nuevos manejadores de respuestas
  private handleGreeting(): void {
    const greetings = [
      '¡Hola! 😊 Me da mucho gusto saludarte.',
      '¡Buenos días! Es un placer poder ayudarte.',
      '¡Hola! Qué gusto tenerte por aquí.',
      '¡Saludos! Estoy aquí para ayudarte con tus consultas técnicas.',
    ];

    const randomGreeting =
      greetings[Math.floor(Math.random() * greetings.length)];

    this.addBotMessage(randomGreeting, 'text');

    setTimeout(() => {
      this.addBotMessage(
        'Soy el asistente técnico de iNeon, especialista en desarrollo de software y calidad. ¿En qué puedo ayudarte hoy?',
        'options',
        [
          {
            id: 'services',
            text: '🛠️ Ver Nuestros Servicios',
            value: 'services_info',
          },
          {
            id: 'quality',
            text: '⚡ Aseguramiento de Calidad',
            value: 'quality',
          },
          {
            id: 'pricing',
            text: '💰 Consultar Precios',
            value: 'pricing_info',
          },
          { id: 'contact', text: '📞 Contactar Equipo', value: 'contact' },
        ]
      );
    }, 1500);
  }

  private handleServicesQuestion(): void {
    this.addBotMessage(
      'Te cuento sobre nuestros servicios principales en iNeon:',
      'text'
    );

    setTimeout(() => {
      this.addBotMessage(
        'Estos son nuestros servicios especializados:',
        'code',
        [],
        `🛠️ SERVICIOS DE iNEON:

1. 💻 DESARROLLO DE SOFTWARE A MEDIDA
   • Aplicaciones web y móviles
   • Sistemas empresariales (ERP, CRM)
   • APIs y microservicios
   • Aplicaciones PWA
   Desde $5,000

2. 🛡️ ASEGURAMIENTO DE CALIDAD (SQAP)
   • Implementación IEEE 730
   • Auditorías de código
   • Revisiones técnicas formales
   • Gestión de configuración
   Desde $2,000

3. 🔧 CONSULTORÍA TÉCNICA
   • Arquitectura de software
   • Optimización de performance
   • Transformación digital
   • Capacitación de equipos
   Desde $150/hora

4. 🔄 MANTENIMIENTO Y SOPORTE
   • Soporte técnico 24/7
   • Actualizaciones de seguridad
   • Optimización continua
   Desde $800/mes`
      );
    }, 2000);

    setTimeout(() => {
      this.addBotMessage(
        '¿Qué servicio te interesa más o tienes alguna pregunta específica?',
        'options',
        [
          {
            id: 'desarrollo',
            text: 'Desarrollo de Software',
            value: 'development_info',
          },
          { id: 'calidad', text: 'Aseguramiento de Calidad', value: 'quality' },
          {
            id: 'consultoria',
            text: 'Consultoría Técnica',
            value: 'consulting_info',
          },
          { id: 'cotizacion', text: 'Solicitar Cotización', value: 'contact' },
          { id: 'back', text: '← Volver al menú principal', value: 'main' },
        ]
      );
    }, 4000);
  }

  private handleTechnologyQuestion(message: string): void {
    const tech = this.detectTechnology(message);

    this.addBotMessage(
      `¡Excelente! ${tech.name} es una tecnología que manejamos muy bien en iNeon.`,
      'text'
    );

    setTimeout(() => {
      this.addBotMessage(`Sobre ${tech.name}:`, 'code', [], tech.info);
    }, 1500);

    setTimeout(() => {
      this.addBotMessage(
        `¿Tienes algún proyecto en mente con ${tech.name} o necesitas consultoría técnica?`,
        'options',
        [
          {
            id: 'project',
            text: `Proyecto con ${tech.name}`,
            value: 'contact',
          },
          {
            id: 'consulting',
            text: 'Consultoría Técnica',
            value: 'consulting_info',
          },
          { id: 'back', text: '← Volver al menú principal', value: 'main' },
        ]
      );
    }, 3000);
  }

  private detectTechnology(message: string): { name: string; info: string } {
    if (message.includes('angular')) {
      return {
        name: 'Angular',
        info: `🅰️ ANGULAR EXPERTISE:

• Framework empresarial robusto
• TypeScript nativo
• Arquitectura escalable
• PWA y SSR ready
• Excelente para sistemas complejos

Proyectos realizados:
• Sistemas ERP completos
• Aplicaciones PWA
• Dashboards en tiempo real
• Plataformas e-commerce`,
      };
    } else if (message.includes('react')) {
      return {
        name: 'React',
        info: `⚛️ REACT EXPERTISE:

• Biblioteca flexible y potente
• Ecosistema rico (Next.js, Redux)
• Componentes reutilizables
• Performance excelente
• Ideal para UIs dinámicas

Especialidades:
• SPAs complejas
• Aplicaciones móviles (React Native)
• Dashboards interactivos
• Plataformas de contenido`,
      };
    } else if (message.includes('node')) {
      return {
        name: 'Node.js',
        info: `🟢 NODE.JS EXPERTISE:

• Backend JavaScript escalable
• APIs REST y GraphQL
• Microservicios
• Real-time applications
• Ecosystem npm rico

Servicios:
• APIs robustas
• Aplicaciones en tiempo real
• Microservicios
• Integración con bases de datos`,
      };
    }

    return {
      name: 'esa tecnología',
      info: `Trabajamos con múltiples tecnologías modernas para crear soluciones robustas y escalables.`,
    };
  }

  private handleTimelineQuestion(): void {
    this.addBotMessage(
      'Los tiempos de desarrollo dependen de varios factores. Te doy estimaciones típicas:',
      'code',
      [],
      `⏱️ TIEMPOS DE DESARROLLO:

APLICACIONES WEB:
• Landing page: 1-2 semanas
• Web app básica: 1-2 meses
• Sistema mediano: 3-4 meses
• ERP completo: 6-12 meses

APLICACIONES MÓVILES:
• App básica: 2-3 meses
• App compleja: 4-6 meses
• App nativa: +30% tiempo

SERVICIOS DE CALIDAD:
• Auditoría código: 1-2 semanas
• Implementación SQAP: 1-3 meses
• Certificación calidad: 2-4 meses

FACTORES QUE INFLUYEN:
• Complejidad funcional
• Integraciones requeridas
• Nivel de testing
• Revisiones del cliente`
    );

    setTimeout(() => {
      this.addBotMessage(
        '¿Tienes algún deadline específico o quieres que evaluemos tu proyecto?',
        'options',
        [
          { id: 'urgente', text: 'Proyecto Urgente', value: 'contact' },
          { id: 'planificar', text: 'Planificar Proyecto', value: 'contact' },
          { id: 'back', text: '← Volver al menú principal', value: 'main' },
        ]
      );
    }, 3000);
  }

  private handleCompanyQuestion(): void {
    this.addBotMessage('Te cuento sobre iNeon:', 'text');

    setTimeout(() => {
      this.addBotMessage(
        'Información sobre nuestra empresa:',
        'code',
        [],
        `🏢 SOBRE iNEON:

MISIÓN:
Brindar soluciones de software a medida de alta calidad
que satisfagan plenamente las necesidades de nuestros
clientes mediante excelencia técnica e innovación.

VISIÓN:
Ser reconocida internacionalmente como empresa líder
en desarrollo de software a medida, destacada por
nuestro compromiso con la calidad.

ESPECIALIDADES:
• Desarrollo de software empresarial
• Implementación de estándares IEEE 730
• Arquitectura de software escalable
• Consultoría en transformación digital

UBICACIÓN:
📍 Santa Cruz de la Sierra, Bolivia
📧 ineon.software@gmail.com
📱 +591 71097542

SLOGAN:
"Innovación y calidad en cada solución de software"`
      );
    }, 2000);

    setTimeout(() => {
      this.addBotMessage(
        '¿Te gustaría conocer más sobre nuestros servicios o hablar con nuestro equipo?',
        'options',
        [
          { id: 'servicios', text: 'Ver Servicios', value: 'services_info' },
          { id: 'contacto', text: 'Contactar Equipo', value: 'contact' },
          { id: 'back', text: '← Volver al menú principal', value: 'main' },
        ]
      );
    }, 4000);
  }

  private scrollToBottom(): void {
    if (this.chatMessagesContainer) {
      const container = this.chatMessagesContainer.nativeElement;
      container.scrollTop = container.scrollHeight;
    }
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  openLink(url: string, external = false): void {
    if (external) {
      window.open(url, '_blank');
    } else {
      if (url === '#') {
        // Trigger download SQAP
        const event = new CustomEvent('downloadSQAP');
        window.dispatchEvent(event);
      } else {
        // Navigate internally
        window.location.href = url;
      }
    }
  }

  trackMessage(index: number, message: ChatMessage): string {
    return message.id;
  }
}
