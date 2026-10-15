import { Injectable, computed, signal } from '@angular/core';
import { ProductoCompra } from '../models/compra.model';

@Injectable({
  providedIn: 'root',
})
export class CompraService {
  // Estado reactivo de la compra con Signals
  private _compraActual = signal<ProductoCompra | null>(null);

  // Señales públicas de solo lectura
  public compraActual = this._compraActual.asReadonly();

  // Subtotal calculado automáticamente
  public subtotal = computed(() => {
    const compra = this._compraActual();
    if (!compra) return 0;
    return Number((compra.cantidad * compra.precioUnitario).toFixed(2));
  });

  // Indica si existe una compra válida registrada
  public tieneCompra = computed(() => {
    return this._compraActual() !== null;
  });

  /**
   * Guarda o actualiza los datos de la compra
   */
  public registrarCompra(nombre: string, cantidad: number, precioUnitario: number): void {
    this._compraActual.set({
      nombre: nombre.trim(),
      cantidad: Math.floor(cantidad),
      precioUnitario: Number(precioUnitario),
    });
  }

  /**
   * Limpia el registro actual para iniciar una nueva compra
   */
  public reiniciarCompra(): void {
    this._compraActual.set(null);
  }
}
