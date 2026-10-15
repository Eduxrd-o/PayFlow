# 💳 PayFlow - Sistema de Registro de Compra y Cobro Inteligente

Aplicación móvil desarrollada con **Ionic** y **Angular Standalone Components** para la gestión ágil del registro de productos, cálculo automático de importes, aplicación de descuentos porcentuales y liquidación de pagos con cálculo de cambio y saldo pendiente.

---

## 📋 Descripción del Proyecto

**PayFlow** permite a un comercio o usuario registrar una venta de forma interactiva dividiendo el flujo en pestañas intuitivas:
1. **Inicio:** Pantalla de bienvenida con presentación visual mediante una ilustración temática e información del funcionamiento.
2. **Compra:** Formulario reactivo para capturar el producto, cantidad entera y precio unitario con validaciones en tiempo real y vista previa del subtotal.
3. **Pago:** Recibe el subtotal registrado, permite aplicar un descuento porcentual (0% - 100%) y registrar el dinero entregado por el cliente, determinando al instante el **total a pagar**, el **cambio** a favor del cliente o el **saldo pendiente** por cobrar.

---

## 🚀 Características y Reglas de Negocio

### 1. Pestaña de Inicio (Home)
- Presentación gráfica atractiva con ilustración vectorial (`welcome-hero.svg`).
- Resumen didáctico del flujo de trabajo (Registro $\rightarrow$ Descuentos $\rightarrow$ Liquidación).
- Botón de acción rápida para iniciar el registro de una nueva compra.
- Ícono personalizado: `home-outline`.

### 2. Pestaña de Compra (Registro)
- Formulario reactivo (`ReactiveFormsModule`) con las siguientes validaciones:
  - **Nombre del Producto:** Campo obligatorio (no admite espacios vacíos).
  - **Cantidad:** Número entero obligatorio estrictamente mayor que cero ($\ge 1$).
  - **Precio Unitario ($):** Obligatorio y estrictamente mayor que cero ($\ge \$0.01$).
- **Cálculo en Tiempo Real:** Muestra el subtotal estimado mientras se completan los campos.
- **Flujo Automático:** Al validar y enviar el formulario, guarda los datos en el servicio y navega automáticamente a la pestaña de **Pago**.
- Ícono personalizado: `cart-outline`.

### 3. Pestaña de Pago (Liquidación)
- Lectura reactiva del subtotal generado en la pestaña de compra mediante **Angular Signals**.
- Estado vacío (*Empty State*) informativo si no existe una compra previa activa.
- Formulario de liquidación con validaciones:
  - **Descuento (%):** Valor numérico obligatorio entre $0$ y $100$.
  - **Dinero Entregado ($):** Valor numérico obligatorio mayor o igual a cero ($\ge \$0.00$).
- **Cálculos Financieros:**
  $$\text{Monto Descuento} = \text{Subtotal} \times \left(\frac{\text{Descuento}}{100}\right)$$
  $$\text{Total Final} = \text{Subtotal} - \text{Monto Descuento}$$
  $$\text{Diferencia} = \text{Dinero Entregado} - \text{Total Final}$$
- **Banners de Resultado:**
  - Si $\text{Diferencia} \ge 0$: Destaca en verde el **Cambio a Entregar** al cliente.
  - Si $\text{Diferencia} < 0$: Destaca en rojo/ámbar el **Saldo Pendiente** por cobrar.
- Botón para **reiniciar e iniciar una nueva compra**.
- Ícono personalizado: `wallet-outline`.

### 4. Personalización de Marca con `@capacitor/assets`
- **Ícono de la Aplicación:** Se reemplazó el ícono por defecto de Capacitor por el logotipo propio de PayFlow diseñado en SVG de alta resolución.
- **Splash Screen:** Pantalla de carga nativa personalizada generada para orientaciones vertical y horizontal con soporte para modo día y noche.
- **Recursos Nativos:** Generación automatizada de 87 variantes de densidad gráfica para Android (`mipmap-*` y `drawable-*`).

---

## 🛠️ Tecnologías Utilizadas

- **Framework:** [Ionic Framework 9](https://ionicframework.com/)
- **Librería Base:** [Angular 22](https://angular.dev/) (Arquitectura 100% **Standalone Components**)
- **Manejo de Estado:** Angular **Signals** (`signal`, `computed`)
- **Validación de Formularios:** Angular **ReactiveFormsModule** (`FormBuilder`, `Validators`)
- **Estilos:** SCSS con variables CSS de Ionic y soporte de alto contraste
- **Plataforma Nativa:** [Capacitor 8](https://capacitorjs.com/)
- **Generador de Assets:** `@capacitor/assets`
- **Íconos:** [Ionicons 8](https://ionic.io/ionicons)

---

## 📂 Estructura del Proyecto

```text
PayFlow/
├── assets/                          # Fuentes gráficas para Capacitor Assets
│   ├── logo.svg                     # Logotipo fuente (1024x1024)
│   ├── icon.svg                     # Ícono fuente (1024x1024)
│   └── splash.svg                   # Splash screen fuente (2732x2732)
├── android/                         # Plataforma nativa Android generada
│   └── app/src/main/res/            # Íconos mipmap y drawables del splash
├── src/
│   ├── app/
│   │   ├── models/
│   │   │   └── compra.model.ts      # Interfaces TypeScript (Producto y Pago)
│   │   ├── services/
│   │   │   └── compra.service.ts    # Servicio reactivo con Signals
│   │   ├── tab1/                    # Pestaña 1: Inicio (Bienvenida con imagen)
│   │   ├── tab2/                    # Pestaña 2: Compra (Formulario y validaciones)
│   │   ├── tab3/                    # Pestaña 3: Pago (Descuento, cambio y saldo)
│   │   └── tabs/                    # Contenedor de pestañas e íconos
│   ├── assets/
│   │   ├── images/
│   │   │   └── welcome-hero.svg     # Ilustración de portada de la app
│   │   └── icons/                   # Íconos generados para PWA/Web
│   └── global.scss                  # Estilos globales y contraste
├── capacitor.config.ts              # Configuración de Capacitor
└── package.json                     # Dependencias y scripts del proyecto
```

---

## 💻 Instalación y Ejecución

### Prerrequisitos
- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada)
- [Ionic CLI](https://ionicframework.com/docs/intro/cli) (`npm install -g @ionic/cli`)
- [Android Studio](https://developer.android.com/studio) (para ejecución en emulador o dispositivo móvil)

### 1. Clonar o ingresar al proyecto
```bash
cd PayFlow
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Ejecutar en el navegador (Desarrollo Web)
```bash
ionic serve
```
La aplicación se abrirá en `http://localhost:8100/`.

---

## 📱 Compilación y Ejecución en Android

### 1. Generar la compilación web
```bash
ionic build
```

### 2. Generar íconos y splash screen nativos
```bash
npx @capacitor/assets generate --android
```

### 3. Sincronizar cambios con Android
```bash
ionic capacitor sync android
```

### 4. Abrir en Android Studio
```bash
ionic capacitor open android
```
Dentro de Android Studio, haz clic en **Run 'app'** para desplegar en tu emulador o dispositivo físico.
