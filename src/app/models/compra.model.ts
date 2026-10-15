export interface ProductoCompra {
  nombre: string;
  cantidad: number;
  precioUnitario: number;
}

export interface DetallePago {
  subtotal: number;
  descuentoPorcentaje: number;
  descuentoDinero: number;
  totalFinal: number;
  dineroRecibido: number;
  cambio: number;
  saldoPendiente: number;
}
