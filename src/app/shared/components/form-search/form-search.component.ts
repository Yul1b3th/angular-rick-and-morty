import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-search',
  standalone: true,
  imports: [],
  templateUrl: './form-search.component.html',
  styleUrl: './form-search.component.scss'
})
export class FormSearchComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onSearch(value: string) {
    console.log('Buscar->', value);

    if (value && value.length > 3) {
      this.router.navigate(['/character-list'], {
        queryParams: { q: value },
      });
    }
  }
}
