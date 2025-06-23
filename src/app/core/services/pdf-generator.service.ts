import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root',
})
export class PdfGeneratorService {
  constructor() {}

  downloadSQAPPdf(): void {
    // Crear nuevo documento PDF
    const doc = new jsPDF('p', 'mm', 'a4');

    // Configurar fuente
    doc.setFont('helvetica');

    // Variables para control de página
    let yPosition = 20;
    const lineHeight = 7;
    const pageHeight = 280;
    const margin = 20;

    // Función auxiliar para agregar nueva página si es necesario
    const checkNewPage = (additionalHeight = 0) => {
      if (yPosition + additionalHeight > pageHeight) {
        doc.addPage();
        yPosition = 20;
      }
    };

    // Función auxiliar para agregar texto con salto de línea automático
    const addText = (
      text: string,
      fontSize = 11,
      isBold = false,
      color = [0, 0, 0]
    ) => {
      checkNewPage(lineHeight);
      doc.setFontSize(fontSize);
      doc.setFont('helvetica', isBold ? 'bold' : 'normal');
      doc.setTextColor(color[0], color[1], color[2]);

      const textLines = doc.splitTextToSize(text, 170);
      const textHeight = textLines.length * lineHeight;

      checkNewPage(textHeight);
      doc.text(textLines, margin, yPosition);
      yPosition += textHeight + 3;
    };

    // HEADER - Logo y título
    doc.setFillColor(37, 99, 235); // Color primario de iNeon
    doc.rect(0, 0, 210, 40, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('iNeon', 20, 15);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Innovación y calidad en cada solución de software', 20, 25);

    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Manual de Calidad (SQAP)', 20, 35);

    yPosition = 50;

    // Información del documento
    doc.setTextColor(0, 0, 0);
    addText('Plan de Aseguramiento de Calidad de Software', 14, true);
    addText('Basado en estándar IEEE 730', 12);
    addText(`Versión 1.0 - ${new Date().getFullYear()}`, 12);
    addText(
      `Fecha de generación: ${new Date().toLocaleDateString('es-BO')}`,
      10
    );

    yPosition += 10;

    // 1. INTRODUCCIÓN
    addText('1. INTRODUCCIÓN', 16, true, [37, 99, 235]);

    addText('1.1 ANTECEDENTES', 14, true);
    addText(
      'iNeon es una empresa mediana dedicada al desarrollo de software a medida, que ha decidido formalizar sus procesos de calidad para asegurar productos de alta calidad a sus clientes. En un mercado competitivo, la satisfacción del cliente y la confiabilidad del software son fundamentales. Por ello, iNeon adopta un Plan Institucional de Aseguramiento de la Calidad del Software (SQAP) basado en el estándar IEEE 730.'
    );

    addText('1.2 OBJETIVOS', 14, true);
    addText('1.2.1 OBJETIVO GENERAL', 12, true);
    addText(
      'Implementar un marco institucional de aseguramiento de la calidad del software que garantice que todos los productos de software desarrollados por iNeon cumplan con los requisitos acordados y estándares de calidad establecidos, aumentando la satisfacción del cliente y la eficiencia de los procesos internos.'
    );

    addText('1.2.2 OBJETIVOS ESPECÍFICOS', 12, true);
    addText(
      '• Estandarizar procesos de calidad: Definir procedimientos comunes de verificación y validación aplicables a todos los proyectos.'
    );
    addText(
      '• Cumplimiento de estándares: Adoptar estándares reconocidos para codificación, documentación, pruebas y gestión.'
    );
    addText(
      '• Detección temprana de defectos: Institucionalizar revisiones técnicas formales y auditorías.'
    );
    addText(
      '• Mejora continua: Establecer mecanismos de medición de la calidad.'
    );
    addText(
      '• Formación y conciencia en calidad: Asegurar que todo el personal reciba capacitación en políticas de calidad.'
    );

    // Misión
    yPosition += 5;
    doc.setFillColor(248, 250, 252);
    doc.rect(margin - 5, yPosition - 5, 180, 25, 'F');
    doc.setDrawColor(37, 99, 235);
    doc.rect(margin - 5, yPosition - 5, 4, 25, 'F');

    addText('1.3 MISIÓN', 14, true, [37, 99, 235]);
    addText(
      'La misión de iNeon es brindar soluciones de software a medida de alta calidad que satisfagan plenamente las necesidades de nuestros clientes. Logramos esto mediante la excelencia técnica, la innovación constante y un fuerte compromiso con la calidad y la mejora continua en todos nuestros procesos.'
    );

    // Visión
    yPosition += 5;
    doc.setFillColor(248, 250, 252);
    doc.rect(margin - 5, yPosition - 5, 180, 25, 'F');
    doc.setDrawColor(6, 182, 212);
    doc.rect(margin - 5, yPosition - 5, 4, 25, 'F');

    addText('1.4 VISIÓN', 14, true, [6, 182, 212]);
    addText(
      'La visión de iNeon es ser reconocida internacionalmente como una empresa líder en desarrollo de software a medida, destacada por su compromiso con la calidad, la confiabilidad de sus productos y la satisfacción del cliente.'
    );

    // Políticas de Calidad
    addText('1.5 POLÍTICAS DE CALIDAD', 14, true, [37, 99, 235]);
    addText(
      '• Enfoque en el cliente: Los requisitos y expectativas del cliente guían todo nuestro trabajo.'
    );
    addText(
      '• Cumplimiento de estándares: Desarrollamos conforme a estándares reconocidos (IEEE 730, ISO/IEC 25010, ISO 9001).'
    );
    addText(
      '• Prevención sobre corrección: Priorizamos la prevención de defectos mediante revisiones sistemáticas.'
    );
    addText(
      '• Mejora continua: Establecemos objetivos de calidad y medimos regularmente nuestro desempeño.'
    );
    addText(
      '• Participación de todos: La calidad es responsabilidad de cada miembro de iNeon.'
    );

    // Slogan
    yPosition += 5;
    doc.setFillColor(37, 99, 235);
    doc.rect(margin - 5, yPosition - 5, 180, 15, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(
      '"Innovación y calidad en cada solución de software."',
      105,
      yPosition + 5,
      { align: 'center' }
    );
    yPosition += 20;

    // 2. PLAN DE ASEGURAMIENTO DE CALIDAD
    doc.setTextColor(0, 0, 0);
    addText(
      '2. PLAN DE ASEGURAMIENTO DE CALIDAD DE SOFTWARE (SQAP)',
      16,
      true,
      [37, 99, 235]
    );

    addText('2.1 PROPÓSITO', 14, true);
    addText(
      'Especificar las actividades que se realizarán para asegurar la calidad del software desarrollado por iNeon. En este documento se detallan los productos que serán objeto de revisión y los estándares, normas y métodos que se aplicarán.'
    );

    addText('2.1.1 OBJETIVO', 12, true);
    addText(
      'Definir un conjunto de normas, prácticas y actividades destinadas a garantizar la calidad en el desarrollo de software. Esto incluye establecer criterios de calidad claros, designar procesos de verificación y validación apropiados.'
    );

    addText('2.1.2 DESCRIPCIÓN', 12, true);
    addText(
      'Calidad de software es el grado en que el software cumple con los requisitos explícitamente establecidos, se ajusta a los estándares de desarrollo aplicados y satisface los requisitos implícitos que todo usuario espera de un producto profesional.'
    );

    // Estándares
    addText('3. ESTÁNDARES Y METODOLOGÍAS', 16, true, [37, 99, 235]);

    addText('3.1 ESTÁNDARES APLICADOS', 14, true);
    addText(
      '• IEEE 730-2014: Standard for Software Quality Assurance Processes'
    );
    addText(
      '• IEEE 1012-2016: Standard for System and Software Verification and Validation'
    );
    addText('• IEEE 1028-2008: Standard for Software Reviews and Audits');
    addText(
      '• ISO/IEC 25010: Modelo de calidad de sistemas y productos de software'
    );
    addText('• ISO 9001: Sistema de gestión de calidad');

    addText('3.2 MARCO DE TRABAJO GENÉRICO (MTPS)', 14, true);
    addText(
      '• Comunicación: Entendimiento común con el cliente sobre requisitos y expectativas'
    );
    addText(
      '• Planeación: Definición de recursos, cronograma, estimaciones y riesgos'
    );
    addText('• Modelado: Ingeniería de requisitos y diseño del software');
    addText('• Construcción: Codificación, pruebas unitarias e integración');
    addText(
      '• Despliegue: Entrega, instalación y soporte inicial del producto'
    );

    // Nueva página para información de contacto
    checkNewPage(50);

    // Información de contacto
    yPosition += 10;
    doc.setFillColor(37, 99, 235);
    doc.rect(0, yPosition - 10, 210, 40, 'F');

    doc.setTextColor(255, 255, 255);
    addText('4. INFORMACIÓN DE CONTACTO', 16, true);

    doc.setTextColor(0, 0, 0);
    yPosition += 10;
    addText('Email: ineon.software@gmail.com', 12, true);
    addText('Teléfono/WhatsApp: +591 71097542', 12, true);
    addText('Ubicación: Santa Cruz de la Sierra, Bolivia', 12);
    addText('Website: www.ineon.com', 12);

    // Footer
    yPosition += 20;
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(
      `© ${new Date().getFullYear()} iNeon - Todos los derechos reservados`,
      105,
      yPosition,
      { align: 'center' }
    );
    doc.text(
      'Este documento es propiedad de iNeon y contiene información confidencial.',
      105,
      yPosition + 5,
      { align: 'center' }
    );
    doc.text(
      'Para obtener el documento completo y detallado, contacte con nuestro equipo.',
      105,
      yPosition + 10,
      { align: 'center' }
    );

    // Descargar el PDF
    doc.save('iNeon-SQAP-Manual-Calidad.pdf');
  }

  // Método para generar PDF con más detalle (versión extendida)
  generateDetailedSQAPPdf(): void {
    // Este método podría incluir más secciones del documento completo
    this.downloadSQAPPdf();
  }
}
