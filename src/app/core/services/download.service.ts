import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { PdfGeneratorService } from './pdf-generator.service';

@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  constructor(private pdfGenerator: PdfGeneratorService) {}

  // Descarga del archivo SQAP real como PDF
  downloadSQAP(): Observable<boolean> {
    // Generar y descargar el PDF
    this.pdfGenerator.downloadSQAPPdf();

    // Retornar observable de éxito
    return of(true).pipe(delay(500));
  }

  // Versión detallada del PDF
  generateDetailedSQAPPdf(): Observable<boolean> {
    this.pdfGenerator.generateDetailedSQAPPdf();
    return of(true).pipe(delay(500));
  }

  // Método para descargar cualquier archivo desde assets
  downloadFile(url: string, filename: string): void {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Descargar archivo predefinido desde assets (si tienes un PDF real)
  downloadSQAPFromAssets(): void {
    // Si colocas un archivo PDF en src/assets/documents/
    const pdfUrl = '/assets/documents/ineon-sqap-manual.pdf';
    this.downloadFile(pdfUrl, 'iNeon-SQAP-Manual-Calidad.pdf');
  }
}
