import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Character } from '@shared/interfaces/character.interface';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  constructor(private http: HttpClient) {}

  // El page es para hacerle solicitudes a la API por pagina 1, 2, 3, etc
  // El query podemos filtrar todos los persoajes o  podemos buscar un personaje en especifico
  searchCharacters(query = '', page = 1):Observable<Character[]> {
    const filter = `${environment.baseUrlAPI}/?name=${query}&page=${page}`;
    return this.http.get<Character[]>(filter);
  }

  getDetails(id: number) {
    return this.http.get<Character>(`${environment.baseUrlAPI}/${id}`);
  }
}
