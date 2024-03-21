import { Component, OnInit } from '@angular/core';
import { LivrosService } from '../../shared/services/livros.service';
import { Livros } from '../../shared/models/livros';
import { CommonModule } from '@angular/common';
import { Box, BoxInput } from '../../shared/models/box';
import { BoxService } from '../../shared/services/box.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-livros',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './livros.component.html',
  styleUrl: './livros.component.css'
})
export class LivrosComponent implements OnInit {

  livros: Livros[] = [];
  boxs: Box[] = [];
  nomeBox: BoxInput = {nome: ""}
  constructor(
    private readonly livrosService: LivrosService,
    private readonly boxService: BoxService
  ){}


  ngOnInit(): void {
    this.boxService.GetAll().subscribe({
      next: (success: Box[]) => {
        this.boxs = success;
      }
    });
  }

  adicionarBox(){
    this.boxService.Insert(this.nomeBox).subscribe({
      next: (success: any) => {
        alert("Box Adicionado com  sucesso");
      }
    })
  }
}
