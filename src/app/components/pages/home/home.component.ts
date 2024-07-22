import { Component } from '@angular/core';
import CharacterListComponent from '../characters/character-list/character-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CharacterListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export default class HomeComponent {

}
