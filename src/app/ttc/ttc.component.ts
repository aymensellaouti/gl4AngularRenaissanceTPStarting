import { DecimalPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, computed, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TtcCalculatorService } from "./ttc-calculator.service";

@Component({
  selector: "app-ttc",
  templateUrl: "./ttc.component.html",
  styleUrls: ["./ttc.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DecimalPipe, FormsModule],
})
export class TtcComponent {
  private readonly calculator = inject(TtcCalculatorService);

  readonly unitPriceHt = signal(0);
  readonly quantity = signal(1);
  readonly vatRate = signal(18);

  readonly calculation = computed(() =>
    this.calculator.calculate(
      this.unitPriceHt(),
      this.quantity(),
      this.vatRate()
    )
  );

  setUnitPriceHt(value: number | null): void {
    this.unitPriceHt.set(this.toNonNegativeNumber(value));
  }

  setQuantity(value: number | null): void {
    const quantity = Number(value);
    this.quantity.set(
      Number.isFinite(quantity) ? Math.max(1, Math.floor(quantity)) : 1
    );
  }

  setVatRate(value: number | null): void {
    this.vatRate.set(this.toNonNegativeNumber(value));
  }

  private toNonNegativeNumber(value: number | null): number {
    const numberValue = Number(value);
    return Number.isFinite(numberValue) ? Math.max(0, numberValue) : 0;
  }
}
