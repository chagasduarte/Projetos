export interface ILivros {
  id_livro: number,
  nome_livro: string,
  usuario_livro: number,
  box_livro: number
}

export class Livros implements ILivros {
  id_livro: number;
  nome_livro: string;
  usuario_livro: number;
  box_livro: number;

  constructor(id: number, nome: string, usuario:number, box: number){
    this.id_livro = id;
    this.nome_livro = nome;
    this.usuario_livro = usuario;
    this.box_livro = box;
  }
}
