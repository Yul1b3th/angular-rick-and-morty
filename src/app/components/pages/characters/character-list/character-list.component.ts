import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router, RouterLink } from '@angular/router';

import { filter, take } from 'rxjs/operators';
import { InfiniteScrollModule } from "ngx-infinite-scroll";

import { Character } from '@shared/interfaces/character.interface';
import { TrackHttpError } from '@shared/models/trackHttpError';
import { CharacterService } from '@shared/services/character.service';
import { CharactersComponent } from '../characters.component';

type RequestInfo = {
  next: string | null;
};

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [RouterLink, CommonModule, CharactersComponent, InfiniteScrollModule],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.scss'
})
export default class CharacterListComponent implements OnInit {
  characters: Character[] = [];

  // Propiedad para almacenar la informacion de la paginacion
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

  // Operador para escuchar el evento window:scroll
  @HostListener('window:scroll', [])
    onWindowScroll():void {
    const yOffSet = window.pageYOffset;
    if ((yOffSet || this.document.documentElement.scrollTop || this.document.body.scrollTop) > this.showScrollHeight) {
      this.showGoUpButton = true;
    } else if (this.showGoUpButton && (yOffSet || this.document.documentElement.scrollTop || this.document.body.scrollTop) < this.hideScrollHeight) {
      this.showGoUpButton = false;
    }
  }

  onScrollDown():void{
    if (this.info.next) {
      this.pageNum++;
      this.getDataFromService();
    }
  }

  onScrollTop():void{
    this.document.body.scrollTop = 0; // Safari
    this.document.documentElement.scrollTop = 0; // Other
  }

  // Metodo para escuchar los cambios de la URL
  private onUrlChanged(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.characters = [];
        this.pageNum = 1;
        this.getCharactersByQuery();
      });
  }

  // Aqui recibimos los parametros de la URL, es decir lo que los usuarios escriben en el formulario de busqueda
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
          const { info, results } = res; // hacemos una destructuracion de los resultados
          this.characters = [...this.characters, ...results]; // Concatenamos los resultados y obtenemos solo result
          this.info = info; // Obtenemos la informacion de la paginacion
        } else {
          this.characters = [];
        }
      }, (error:TrackHttpError) => console.log((error.friendlyMessage)));
  }
}

