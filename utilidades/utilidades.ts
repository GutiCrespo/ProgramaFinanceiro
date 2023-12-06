import prompt from "prompt-sync";
import { Gastos } from "../classes/Gastos";

export const Teclado = prompt();

export function solicitarData(prompt: string): Date {
  while (true) {
    const input = Teclado(prompt);
    const partes = input.split("/");

    if (partes.length === 3) {
      const dia = parseInt(partes[0]);
      const mes = parseInt(partes[1]) - 1;
      const ano = parseInt(partes[2]);

      if (!isNaN(dia) && !isNaN(mes) && !isNaN(ano)) {
        return new Date(ano, mes, dia);
      }
    }

    console.log("Formato de data inválido. Tente novamente.");
  }
}

export function periodoGastos(
  gastos: Gastos[],
  periodo: number,
  dataInicial?: Date,
  dataFinal?: Date
): Gastos[] {
  const hoje = new Date();

  switch (periodo) {
    case 1: // Hoje
      return gastos.filter(
        (gasto) => gasto.getMes().toDateString() === hoje.toDateString()
      );

    case 2: // Ultimos 7 Dias
      const ultimos7Dias = new Date(hoje);
      ultimos7Dias.setDate(hoje.getDate() - 7);
      return gastos.filter((gasto) => gasto.getMes() >= ultimos7Dias);

    case 3: // Este mês
      const primeiroDiaMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
      return gastos.filter((gasto) => gasto.getMes() >= primeiroDiaMes);

    case 4: // Todo Período
      return gastos;

    case 5: // Período Personalizado
      if (dataInicial === undefined || dataFinal === undefined) {
        return [];
      }

      return gastos.filter(
        (gasto) => gasto.getMes() >= dataInicial && gasto.getMes() <= dataFinal
      );

    default:
      return [];
  }
}

export function exibirRelatorio(
  gastos: Gastos[],
  periodo?: number,
  dataInicial?: Date,
  dataFinal?: Date
): void {
  let gastosFiltrados;

  if (periodo === undefined) {
    gastosFiltrados = gastos;
  } else {
    gastosFiltrados = periodoGastos(gastos, periodo, dataInicial, dataFinal);
  }

  console.log("\n------------------------------------\n");
  console.log("Relatório de Gastos:\n");

  let somaTotal = 0;

  for (const gasto of gastosFiltrados) {
    somaTotal += gasto.getValor();
    console.log(gasto.visualizarGasto());
  }
  console.log(
    `Valor Total do período: ${somaTotal.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    })}`
  );
  console.log(`Número de itens no período: ${gastosFiltrados.length} \n`);
  console.log("\n------------------------------------\n");
}
