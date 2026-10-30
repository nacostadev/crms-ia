import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

// Íconos Tabler servidos desde el sprite que arma `npm run icons` (scripts/build-icons.mjs).
const SPRITE = 'assets/icons/tabler-sprite.svg';

@Component({
  selector: 'app-icon',
  standalone: true,
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      viewBox="0 0 24 24"
      [attr.fill]="filled() ? 'currentColor' : 'none'"
      [attr.stroke]="filled() ? 'none' : 'currentColor'"
      [attr.stroke-width]="stroke()"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <use [attr.href]="href()" />
    </svg>
  `,
  host: { class: 'inline-flex shrink-0' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  readonly name = input.required<string>();
  readonly size = input(16);
  readonly stroke = input(1.5);
  readonly filled = input(false);

  readonly href = computed(() => `${SPRITE}#${this.name()}${this.filled() ? '-filled' : ''}`);
}
