import { TestBed } from "@angular/core/testing";
import { TtcComponent } from "./ttc.component";

describe("TtcComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TtcComponent],
    }).compileComponents();
  });

  it("starts with the requested default values", () => {
    const fixture = TestBed.createComponent(TtcComponent);
    const component = fixture.componentInstance;

    expect(component.unitPriceHt()).toBe(0);
    expect(component.quantity()).toBe(1);
    expect(component.vatRate()).toBe(18);
  });

  it("recalculates the total when a value changes", () => {
    const fixture = TestBed.createComponent(TtcComponent);
    const component = fixture.componentInstance;

    component.setUnitPriceHt(100);
    component.setQuantity(10);
    fixture.detectChanges();

    expect(component.calculation().discountRate).toBe(0.2);
    expect(component.calculation().totalTtc).toBe(944);
  });
});
