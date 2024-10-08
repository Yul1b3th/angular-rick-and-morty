import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Character } from '@app/shared/interfaces/character.interface';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharactersComponent {
    @Input() character!:Character;
}
