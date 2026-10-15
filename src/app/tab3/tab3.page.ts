import { Component, computed, inject } from '@angular/core';
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
  IonBadge,
  AlertController,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  walletOutline,
  cartOutline,
  receiptOutline,
  cashOutline,
  pricetagOutline,
  alertCircleOutline,
  checkmarkCircleOutline,
  refreshOutline,
  arrowBackOutline,
  trendingDownOutline,
} from 'ionicons/icons';
import { CompraService } from '../services/compra.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
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
    IonBadge,
  ],
})
export class Tab3Page {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  public compraService = inject(CompraService);
  private alertController = inject(AlertController);

  public pagoForm: FormGroup;
  public formSubmitted = false;

  constructor() {
    addIcons({
      walletOutline,
      cartOutline,
      receiptOutline,
      cashOutline,
      pricetagOutline,
      alertCircleOutline,
      checkmarkCircleOutline,
      refreshOutline,
      arrowBackOutline,
      trendingDownOutline,
    });

    // Formulario de pago con validaciones:
    // Descuento entre 0 y 100
    // Dinero recibido >= 0
    this.pagoForm = this.fb.group({
      descuento: [
        0,
        [
          Validators.required,
          Validators.min(0),
          Validators.max(100),
        ],
      ],
      dineroRecibido: [
        null,
        [
          Validators.required,
          Validators.min(0),
        ],
      ],
    });
  }

  // Getters para validaciones
  get descuentoInvalid(): boolean {
    const ctrl = this.pagoForm.get('descuento');
    return !!(ctrl && ctrl.invalid && (ctrl.touched || this.formSubmitted));
  }

  get dineroInvalid(): boolean {
    const ctrl = this.pagoForm.get('dineroRecibido');
    return !!(ctrl && ctrl.invalid && (ctrl.touched || this.formSubmitted));
  }

  // Descuento porcentual actual
  public get descuentoPorcentaje(): number {
    const val = Number(this.pagoForm.get('descuento')?.value);
    return isNaN(val) || val < 0 ? 0 : Math.min(val, 100);
  }

  // Dinero recibido actual
  public get dineroRecibidoValor(): number {
    const val = Number(this.pagoForm.get('dineroRecibido')?.value);
    return isNaN(val) || val < 0 ? 0 : val;
  }

  // Descuento en dinero ($)
  public get montoDescuento(): number {
    const subtotal = this.compraService.subtotal();
    return Number(((subtotal * this.descuentoPorcentaje) / 100).toFixed(2));
  }

  // Total final a pagar
  public get totalFinal(): number {
    const subtotal = this.compraService.subtotal();
    return Number(Math.max(0, subtotal - this.montoDescuento).toFixed(2));
  }

  // Diferencia entre dinero recibido y total final
  public get diferencia(): number {
    const recibido = Number(this.pagoForm.get('dineroRecibido')?.value) || 0;
    return Number((recibido - this.totalFinal).toFixed(2));
  }

  // Indica si el dinero recibido cubre el total
  public get dineroSuficiente(): boolean {
    const ctrl = this.pagoForm.get('dineroRecibido');
    if (!ctrl || ctrl.value === null || ctrl.value === '') return false;
    return this.diferencia >= 0;
  }

  // Cambio a entregar al cliente
  public get cambio(): number {
    return this.diferencia >= 0 ? this.diferencia : 0;
  }

  // Saldo pendiente por pagar
  public get saldoPendiente(): number {
    return this.diferencia < 0 ? Math.abs(this.diferencia) : 0;
  }

  // Indica si el usuario ya ingresó un valor en dinero recibido
  public get haIngresadoDinero(): boolean {
    const ctrl = this.pagoForm.get('dineroRecibido');
    return !!(ctrl && ctrl.value !== null && ctrl.value !== '' && !this.dineroInvalid);
  }

  public irACompra(): void {
    this.router.navigate(['/tabs/tab2']);
  }

  /**
   * Finaliza la transacción y reinicia los formularios
   */
  public async nuevaCompra(): Promise<void> {
    const alert = await this.alertController.create({
      header: '¿Iniciar nueva compra?',
      message: 'Esta acción liquidará la compra actual y reiniciará los datos.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.compraService.reiniciarCompra();
            this.pagoForm.reset({ descuento: 0, dineroRecibido: null });
            this.formSubmitted = false;
            this.router.navigate(['/tabs/tab2']);
          },
        },
      ],
    });

    await alert.present();
  }
}
