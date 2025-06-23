import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Download, FileText } from 'lucide-angular';
import { DownloadService } from '../../../core/services/download.service';

@Component({
  selector: 'app-download-button',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <button
      (click)="downloadFile()"
      [class]="buttonClass"
      [disabled]="isDownloading"
    >
      <lucide-angular
        [img]="downloadIcon"
        class="w-5 h-5 mr-2"
        [class.animate-bounce]="isDownloading"
      >
      </lucide-angular>

      {{ isDownloading ? 'Generando PDF...' : text }}
    </button>

    <!-- Información adicional -->
    <div *ngIf="showInfo" class="mt-2 text-xs text-gray-500 flex items-center">
      <lucide-angular [img]="fileIcon" class="w-3 h-3 mr-1"></lucide-angular>
      <span>Documento SQAP basado en IEEE 730 | Formato: PDF</span>
    </div>
  `,
  styleUrls: ['./download-button.component.scss'],
})
export class DownloadButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'accent' = 'primary';
  @Input() text: string = 'Descargar SQAP';
  @Input() fileName: string = 'ineon-sqap-manual';
  @Input() showInfo: boolean = false;

  readonly downloadIcon = Download;
  readonly fileIcon = FileText;

  isDownloading = false;

  constructor(private downloadService: DownloadService) {}

  get buttonClass(): string {
    const baseClass =
      'inline-flex items-center font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';

    switch (this.variant) {
      case 'secondary':
        return `${baseClass} btn-secondary`;
      case 'accent':
        return `${baseClass} btn-accent`;
      default:
        return `${baseClass} btn-primary`;
    }
  }

  async downloadFile(): Promise<void> {
    if (this.isDownloading) return;

    this.isDownloading = true;

    try {
      // Descargar el archivo SQAP como PDF
      await this.downloadService.downloadSQAP().toPromise();

      // Mostrar mensaje de éxito (opcional)
      console.log('PDF SQAP descargado exitosamente');
    } catch (error) {
      console.error('Error al descargar el PDF:', error);
      alert('Hubo un error al generar el PDF. Por favor, intenta nuevamente.');
    } finally {
      this.isDownloading = false;
    }
  }
}
