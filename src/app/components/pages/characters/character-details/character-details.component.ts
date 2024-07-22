import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from '@app/shared/interfaces/character.interface';
import { TrackHttpError } from '@app/shared/models/trackHttpError';
import { CharacterService } from '@app/shared/services/character.service';
import { Observable, take, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-character-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.scss'
})


export default class CharacterDetailsComponent implements OnInit {
  character$!: Observable<Character | TrackHttpError>;

  constructor(private route: ActivatedRoute, private characterSvc: CharacterService, private location: Location) { }

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe((params) => {
      const id = params['id'];
      this.character$ = this.characterSvc.getDetails(id).pipe(
        catchError((error: TrackHttpError) => {
          console.error('Error fetching character details:', error);
          return of(error);
        })
      );
    });
  }

  onGoBack(): void {
    this.location.back();
    // window.history.back();

  }

  isCharacter(data: Character | TrackHttpError): data is Character {
    return (data as Character).image !== undefined;
  }
}
