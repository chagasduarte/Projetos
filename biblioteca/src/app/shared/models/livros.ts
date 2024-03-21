export interface ILivros {
  id_livro: number,
  nome_livro: string,
  usuario_livro: number,
  box_livro: number,
  status: number
}

export class Livros implements ILivros {
  id_livro: number;
  nome_livro: string;
  usuario_livro: number;
  box_livro: number;
  status: number;

  constructor(id: number, nome: string, usuario:number, box: number, status:number){
    this.id_livro = id;
    this.nome_livro = nome;
    this.usuario_livro = usuario;
    this.box_livro = box;
    this.status = status;
  }
}

export interface ILivroInput {
  Nome: string,
  Usuario: number,
  Box: number
}

export class LivroInput implements ILivroInput {
  Nome: string;
  Box: number;
  Usuario: number;

  constructor(Nome: string, Usuario: number, Box: number){
    this.Nome = Nome;
    this.Box = Box;
    this.Usuario = Usuario;
  }
}
