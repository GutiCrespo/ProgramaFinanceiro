import { Gastos } from "./Gastos";

export class GastoVariavel extends Gastos {
  constructor(nome: string, valor: number, mes: Date) {
    super(nome, valor, mes);
  }

  public visualizarGasto(): string {
    return (
      `Nome do Gasto Variavel: ${this.getNome()} \n` +
      `Valor do Gasto Variavel: ${this.getValor().toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      })} \n` +
      `Mês de Início do Gasto Varial: ${this.getMes().toDateString()}\n`
    );
  }
}
