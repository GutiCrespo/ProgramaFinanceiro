import { Gastos } from "./Gastos";

export class GastoFixo extends Gastos {
  constructor(nome: string, valor: number, mes: Date) {
    super(nome, valor, mes);
  }

  public visualizarGasto(): string {
    return (
      `Nome do Gasto Fixo: ${this.getNome()} \n` +
      `Valor do Gasto Fixo: ${this.getValor().toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      })} \n` +
      `Mês de Início do Gasto Fixo: ${this.getMes().toDateString()}\n`
    );
  }
}
