import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, take} from 'rxjs';

import { Character } from '@app/shared/interfaces/character.interface';
import { CharacterService } from '@app/shared/services/character.service';
import { CharactersComponent } from '../characters.component';

@Component({
  selector: 'app-character-details',
  standalone: true,
  imports: [CommonModule, CharactersComponent],
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.scss'
})

export default class CharacterDetailsComponent implements OnInit {
  character$!: Observable<Character>;

  constructor(private route: ActivatedRoute, private characterSvc: CharacterService, private location: Location) { }

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe((params) => {
      const id = params['id'];
      this.character$ = this.characterSvc.getDetails(id);
    });
  }

  onGoBack(): void {
    this.location.back();
    // window.history.back();
  }

  isCharacter(data: Character): data is Character {
    return (data as Character).image !== undefined;
  }
}
