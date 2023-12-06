import { Gastos } from "./Gastos";

export class GastoParcelado extends Gastos {

  private _parcelas: number

  constructor(nome: string, valor: number, mes: Date, parcelas: number) {
    super(nome, valor, mes);
    this._parcelas = parcelas
  }

  public getParcelas(): number {
    return this._parcelas;
  }

  public visualizarGasto(): string {
    return (
      `Nome do Gasto Parcelado: ${this.getNome()} \n` +
      `Valor do Gasto Parcelado: ${this.getValor().toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      })} \n` +
      `Mês de Início do Gasto Parcelado: ${this.getMes().toDateString()}\n` +
      `Número de Parcelas: ${this.getParcelas()}\n`
    );
  }
}