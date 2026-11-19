import { Injectable } from "@angular/core";
import { TtcCalculation } from "./ttc-calculation.model";

@Injectable({
  providedIn: "root",
})
export class TtcCalculatorService {
  calculate(
    unitPriceHt: number,
    quantity: number,
    vatRate: number
  ): TtcCalculation {
    if (!Number.isFinite(unitPriceHt) || unitPriceHt < 0) {
      throw new RangeError("Le prix HT doit être un nombre positif ou nul.");
    }
    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new RangeError("La quantité doit être un entier supérieur à zéro.");
    }
    if (!Number.isFinite(vatRate) || vatRate < 0) {
      throw new RangeError("Le taux de TVA doit être un nombre positif ou nul.");
    }

    const subtotalHt = unitPriceHt * quantity;
    const discountRate =
      quantity >= 10 && quantity <= 15 ? 0.2 : quantity > 15 ? 0.3 : 0;
    const discountAmountHt = subtotalHt * discountRate;
    const totalHt = subtotalHt - discountAmountHt;
    const vatAmount = (totalHt * vatRate) / 100;

    return {
      unitPriceTtc: unitPriceHt * (1 + vatRate / 100),
      subtotalHt,
      discountRate,
      discountAmountHt,
      totalHt,
      vatAmount,
      totalTtc: totalHt + vatAmount,
    };
  }
}
