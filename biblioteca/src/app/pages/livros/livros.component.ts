import { Component, OnInit } from '@angular/core';
import { LivrosService } from '../../shared/services/livros.service';
import { Livros } from '../../shared/models/livros';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-livros',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './livros.component.html',
  styleUrl: './livros.component.css'
})
export class LivrosComponent implements OnInit {

  livros: Livros[] = [];

  constructor(private readonly livrosService: LivrosService){}


  ngOnInit(): void {
    this.livrosService.getLivros().subscribe({
      next: (success: Livros[]) => {
        this.livros = success;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
}
