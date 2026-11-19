import { TestBed } from "@angular/core/testing";
import { TtcCalculatorService } from "./ttc-calculator.service";

describe("TtcCalculatorService", () => {
  let service: TtcCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TtcCalculatorService);
  });

  it("calculates a price with the default VAT rate and no discount", () => {
    expect(service.calculate(100, 1, 18)).toEqual({
      unitPriceTtc: 118,
      subtotalHt: 100,
      discountRate: 0,
      discountAmountHt: 0,
      totalHt: 100,
      vatAmount: 18,
      totalTtc: 118,
    });
  });

  it("applies a 20 percent discount from 10 through 15 pieces", () => {
    expect(service.calculate(100, 10, 18)).toEqual({
      unitPriceTtc: 118,
      subtotalHt: 1000,
      discountRate: 0.2,
      discountAmountHt: 200,
      totalHt: 800,
      vatAmount: 144,
      totalTtc: 944,
    });
    expect(service.calculate(100, 15, 18).discountRate).toBe(0.2);
  });

  it("applies a 30 percent discount above 15 pieces", () => {
    const result = service.calculate(100, 16, 18);

    expect(result.discountRate).toBe(0.3);
    expect(result.discountAmountHt).toBe(480);
    expect(result.totalTtc).toBe(1321.6);
  });

  it("rejects invalid calculator values", () => {
    expect(() => service.calculate(-1, 1, 18)).toThrowError(RangeError);
    expect(() => service.calculate(100, 0, 18)).toThrowError(RangeError);
    expect(() => service.calculate(100, 1.5, 18)).toThrowError(RangeError);
    expect(() => service.calculate(100, 1, -1)).toThrowError(RangeError);
  });
});
