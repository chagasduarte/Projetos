import { Component, OnInit } from '@angular/core';
import { LivrosService } from '../../shared/services/livros.service';
import { Livros } from '../../shared/models/livros';

@Component({
  selector: 'app-livros',
  standalone: true,
  imports: [],
  templateUrl: './livros.component.html',
  styleUrl: './livros.component.css'
})
export class LivrosComponent implements OnInit {
  constructor(private readonly livrosService: LivrosService){}


  ngOnInit(): void {
    this.livrosService.getLivros().subscribe({
      next: (success: Livros[]) => {
        console.log(success);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
}
