import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedStateService } from '@mfe/shared-state';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly cartCount = signal(0);
  constructor(private sharedState: SharedStateService) {}

  ngOnInit(): void {
    this.sharedState.state$.subscribe(value => {
      this.cartCount.set(value?.cartCount || 0);
    });
  }

  addToCart() {
    this.sharedState.updateCart(this.cartCount() + 1);
  }

}
