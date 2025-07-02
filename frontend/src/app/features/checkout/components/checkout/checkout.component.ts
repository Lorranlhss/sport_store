import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../../cart/services/cart.service';
import { CheckoutService } from '../../services/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;
  currentStep = 1;
  loading = false;

  cartItems$ = this.cartService.items$;
  total$ = this.cartService.total$;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cartService: CartService,
    private checkoutService: CheckoutService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.checkCartItems();
  }

  private initializeForm(): void {
    this.checkoutForm = this.fb.group({
      customer: this.fb.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required]],
        cpf: ['', [Validators.required]]
      }),
      shipping: this.fb.group({
        cep: ['', [Validators.required]],
        street: ['', [Validators.required]],
        number: ['', [Validators.required]],
        complement: [''],
        neighborhood: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]]
      }),
      payment: this.fb.group({
        method: ['credit_card', [Validators.required]],
        cardNumber: [''],
        cardName: [''],
        cardExpiry: [''],
        cardCvv: ['']
      })
    });
  }

  private checkCartItems(): void {
    const items = this.cartService.getItems();
    if (items.length === 0) {
      this.router.navigate(['/cart']);
    }
  }

  nextStep(): void {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  async onSubmit(): Promise<void> {
    if (this.checkoutForm.invalid) {
      return;
    }

    this.loading = true;

    try {
      const order = {
        ...this.checkoutForm.value,
        items: this.cartService.getItems(),
        total: await this.total$.toPromise()
      };

      await this.checkoutService.processOrder(order);
      this.cartService.clearCart();
      this.router.navigate(['/checkout/success']);
    } catch (error) {
      console.error('Checkout error:', error);
      // Handle error
    } finally {
      this.loading = false;
    }
  }
}
