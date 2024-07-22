import { Component } from '@angular/core';
import { FormSearchComponent } from '../form-search/form-search.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormSearchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
