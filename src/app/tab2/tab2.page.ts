import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonItem,
  IonInput,
  IonButton,
  IonIcon,
  IonText,
  ToastController,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  cartOutline,
  arrowForwardOutline,
  pricetagOutline,
  layersOutline,
  alertCircleOutline,
  checkmarkCircleOutline,
  calculatorOutline,
  bagHandleOutline,
} from 'ionicons/icons';
import { CompraService } from '../services/compra.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonItem,
    IonInput,
    IonButton,
    IonIcon,
    IonText,
  ],
})
export class Tab2Page {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private compraService = inject(CompraService);
  private toastController = inject(ToastController);

  public compraForm: FormGroup;
  public formSubmitted = false;

  constructor() {
    addIcons({
      cartOutline,
      arrowForwardOutline,
      pricetagOutline,
      layersOutline,
      alertCircleOutline,
      checkmarkCircleOutline,
      calculatorOutline,
      bagHandleOutline,
    });

    // Formulario reactivo con validaciones estrictas
    this.compraForm = this.fb.group({
      nombre: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?!\s*$).+/), // No solo espacios vacíos
        ],
      ],
      cantidad: [
        null,
        [
          Validators.required,
          Validators.min(1), // Mayor que cero
          Validators.pattern(/^[0-9]+$/), // Entero positivo
        ],
      ],
      precioUnitario: [
        null,
        [
          Validators.required,
          Validators.min(0.01), // Mayor que cero
        ],
      ],
    });

    // Si ya había una compra en el servicio, cargarla
    const compraExistente = this.compraService.compraActual();
    if (compraExistente) {
      this.compraForm.patchValue({
        nombre: compraExistente.nombre,
        cantidad: compraExistente.cantidad,
        precioUnitario: compraExistente.precioUnitario,
      });
    }
  }

  // Subtotal preliminar en tiempo real
  public get subtotalEstimado(): number {
    const cant = Number(this.compraForm.get('cantidad')?.value) || 0;
    const precio = Number(this.compraForm.get('precioUnitario')?.value) || 0;
    if (cant > 0 && precio > 0) {
      return Number((cant * precio).toFixed(2));
    }
    return 0;
  }

  // Getters para verificar errores fácilmente en el HTML
  get nombreInvalid(): boolean {
    const ctrl = this.compraForm.get('nombre');
    return !!(ctrl && ctrl.invalid && (ctrl.touched || this.formSubmitted));
  }

  get cantidadInvalid(): boolean {
    const ctrl = this.compraForm.get('cantidad');
    return !!(ctrl && ctrl.invalid && (ctrl.touched || this.formSubmitted));
  }

  get precioInvalid(): boolean {
    const ctrl = this.compraForm.get('precioUnitario');
    return !!(ctrl && ctrl.invalid && (ctrl.touched || this.formSubmitted));
  }

  /**
   * Valida los datos y abre la pestaña Pago
   */
  public async enviarFormulario(): Promise<void> {
    this.formSubmitted = true;

    if (this.compraForm.invalid) {
      this.compraForm.markAllAsTouched();
      const toast = await this.toastController.create({
        message: 'Por favor complete todos los campos con valores válidos.',
        duration: 2500,
        color: 'warning',
        position: 'top',
        icon: 'alert-circle-outline',
      });
      await toast.present();
      return;
    }

    const { nombre, cantidad, precioUnitario } = this.compraForm.value;

    // Guardar en el servicio
    this.compraService.registrarCompra(nombre, Number(cantidad), Number(precioUnitario));

    const toast = await this.toastController.create({
      message: '¡Datos validados! Abriendo pestaña de Pago...',
      duration: 1800,
      color: 'success',
      position: 'top',
      icon: 'checkmark-circle-outline',
    });
    await toast.present();

    // Abrir la pestaña Pago (tab3)
    this.router.navigate(['/tabs/tab3']);
  }
}
