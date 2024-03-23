import { Component, OnInit } from '@angular/core';
import { LivrosService } from '../../shared/services/livros.service';
import { LivroInput, Livros } from '../../shared/models/livros';
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
  nomeBox: BoxInput = {nome: ""};
  nomeLivro: string = "";
  usuarioLivro: number = 1;
  idBox: number = 0;

  constructor(
    private readonly livrosService: LivrosService,
    private readonly boxService: BoxService
  ){}


  ngOnInit(): void {
    this.buscarLivros();
  }

  buscarLivros(){
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
      },
      complete: () => {
        this.buscarLivros();
      }
    });

  }

  adicionarLivro(){
    const livro: LivroInput = {
      Nome: this.nomeLivro,
      Box: this.idBox,
      Usuario: this.usuarioLivro
    }

    this.livrosService.Insert(livro).subscribe({
      next: () => {
        alert("livro adicionado com sucesso")
      },
      complete: () => {
        this.buscarLivros();
      }
    });
  }

  avancarStatus(id:number){
    this.livrosService.UpdateStatus(id).subscribe({
      next: (success: any) => {
        alert("Status atualizado");
      },
      complete: () => {
        this.buscarLivros();
      }
    });
  }

  deletarLivro(id:number){
    console.log(id)
    this.livrosService.Delete(id).subscribe({
      next: (success: any) => {
        alert("Livro removido");
      },
      complete: () => {
        this.buscarLivros();
      }
    });
  }
}
