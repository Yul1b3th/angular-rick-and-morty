import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Params, Router, RouterLink } from '@angular/router';

import { filter, take } from 'rxjs/operators';

import { Character } from '@app/shared/interfaces/character.interface';
import { TrackHttpError } from '@app/shared/models/trackHttpError';
import { CharacterService } from '@app/shared/services/character.service';
import { CharactersComponent } from '../characters.component';

type RequestInfo = {
  next: string | null;
};

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [RouterLink, CommonModule, CharactersComponent],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.scss'
})
export default class CharacterListComponent implements OnInit {
  characters: Character[] = [];

  info: RequestInfo = {
    next: null,
  };

  showGoUpButton = false;

  private pageNum = 1;

  private query!: string;

  private hideScrollHeight = 200;

  private showScrollHeight = 500;

  constructor(
    @Inject(DOCUMENT) private document:Document,
    private characterSvc: CharacterService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.onUrlChanged();
  }

  ngOnInit(): void {
    this.getCharactersByQuery();
    // this.getDataFromService();
  }

  // @HostListener('window:scroll', [])
  // onWindowScroll():void {
  //   const yOffSet = window.pageYOffset;
  //   if ((yOffSet || this.document.documentElement.scrollTop || this.document.body.scrollTop) > this.showScrollHeight) {
  //     this.showGoUpButton = true;
  //   } else if (this.showGoUpButton && (yOffSet || this.document.documentElement.scrollTop || this.document.body.scrollTop) < this.hideScrollHeight) {
  //     this.showGoUpButton = false;
  //   }
  // }

  // onScrollDown():void{
  //   if (this.info.next) {
  //     this.pageNum++;
  //     this.getDataFromService();
  //   }
  // }

  // onScrollTop():void{
  //   this.document.body.scrollTop = 0; // Safari
  //   this.document.documentElement.scrollTop = 0; // Other
  // }

  private onUrlChanged(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.characters = [];
        this.pageNum = 1;
        this.getCharactersByQuery();
      });
  }

  private getCharactersByQuery(): void {
    this.route.queryParams.pipe(take(1)).subscribe((params: Params) => {
      // console.log('Params ->', params);

      this.query = params['q'];
      this.getDataFromService();
    });
  }

  private getDataFromService(): void {
    this.characterSvc
      .searchCharacters(this.query, this.pageNum)
      .pipe(take(1))
      .subscribe((res: any) => {
        if (res?.results?.length) {
          // console.log('Response ->', res);
          const { info, results } = res;
          this.characters = [...this.characters, ...results];
          this.info = info;
        } else {
          this.characters = [];
        }
      }, (error:TrackHttpError) => console.log((error.friendlyMessage)));
  }

  // private getDataFromService(): void {
  //   console.log('Yuli');

  //   this.characterSvc
  //     .searchCharacters(this.query, this.pageNum)
  //     .pipe(take(1))
  //     .subscribe((res: any) => {
  //       if (res?.results?.length) {
  //         console.log('Response ->', res);

  //         const { info, results } = res;
  //         this.characters = [...this.characters, ...results];
  //         this.info = info;
  //       }


  //     });
  // }


}

