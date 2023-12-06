export abstract class Gastos {
  protected _nome: string;
  protected _valor: number;
  protected _mes: Date;

  constructor(nome: string, valor: number, mes: Date) {
    this._nome = nome;
    this._valor = valor;
    this._mes = mes;
  }

  public getNome(): string {
    return this._nome;
  }

  public getValor(): number {
    return this._valor;
  }

  public getMes(): Date {
    return this._mes;
  }

  public abstract visualizarGasto(): string;
}
