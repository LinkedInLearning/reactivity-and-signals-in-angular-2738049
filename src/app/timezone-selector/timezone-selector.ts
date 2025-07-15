import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ShippingService } from '../services/shipping';

@Component({
  selector: 'app-timezone-selector',
  imports: [],
  templateUrl: './timezone-selector.html',
  styleUrl: './timezone-selector.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimezoneSelector {
  protected readonly shippingService = inject(ShippingService);
}
