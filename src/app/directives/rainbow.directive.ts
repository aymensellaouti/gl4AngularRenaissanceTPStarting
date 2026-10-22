import { Directive, signal } from '@angular/core';

@Directive({
  selector: 'input[appRainbow]',
  host: {
    '[style.color]': 'color()',
    '[style.borderColor]': 'color()',
    '(keyup)': 'onKeyUp()',
  },
})
export class RainbowDirective {
  readonly color = signal<string>('');

  onKeyUp(): void {
    this.color.set(this.getRandomColor());
  }

  private getRandomColor(): string {
    const hexChars = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += hexChars[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
