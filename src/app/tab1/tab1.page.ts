import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
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
  IonButton,
  IonIcon,
  IonBadge,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  cartOutline,
  arrowForwardOutline,
  shieldCheckmarkOutline,
  cashOutline,
  calculatorOutline,
  sparklesOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonIcon,
    IonBadge,
    IonGrid,
    IonRow,
    IonCol,
  ],
})
export class Tab1Page {
  private router = inject(Router);

  constructor() {
    addIcons({
      cartOutline,
      arrowForwardOutline,
      shieldCheckmarkOutline,
      cashOutline,
      calculatorOutline,
      sparklesOutline,
    });
  }

  public irACompra(): void {
    this.router.navigate(['/tabs/tab2']);
  }
}
