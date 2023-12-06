import { GastoFixo } from "./GastoFixo";
import { GastoParcelado } from "./GastoParcelado";
import {
  Teclado,
  exibirRelatorio,
  solicitarData,
} from "../utilidades/utilidades";
import { Gastos } from "./Gastos";

export class AppFinanceiro {
  gastoFixo: GastoFixo[] = [
    new GastoFixo("Hoje", 89, new Date(2023, 11, 6)),
    new GastoFixo("7 Dias", 99, new Date(2023, 11, 3)),
    new GastoFixo("Este Mês", 89, new Date(2023, 11, 1)),
    new GastoFixo("Todo Período", 89, new Date(1998, 3, 21)),
  ];
  gastoParcelado: GastoParcelado[] = [
    new GastoParcelado("Hoje", 89, new Date(2023, 11, 6), 8),
    new GastoParcelado("7 Dias", 99, new Date(2023, 11, 3), 8),
    new GastoParcelado("Este Mês", 89, new Date(2023, 11, 1), 8),
    new GastoParcelado("Todo Período", 89, new Date(1998, 3, 21), 8),
  ];

  exibirMenuInicial(): void {
    let escolha;

    while (escolha !== 0) {
      console.log("\n----------------------------------------------------\n");
      console.log("Olá, boas-vindas ao seu aplicativo financeiro pessoal.\n");

      console.log(
        "Toda nossa comunicação se dará através de respostas nesse terminal. Você poderá responder, apenas inserindo o número desejado. Casos excepcionais serão indicados na tela.\n"
      );

      console.log("Para começar, insira o que você deseja fazer hoje:\n");

      console.log("    1. Inserir um novo Gasto");
      console.log("    2. Gerar relatório de Gastos\n");
      console.log("    00. Encerrar Programa.\n");

      escolha = +Teclado("O que você deseja fazer?  ");
      console.log("\n");

      switch (escolha) {
        case 1:
          this.menuInserirGastos();
          break;

        case 2:
          this.exibirMenuRelatorioGastos();
          break;

        default:
          break;
      }
    }
  }

  // INÍCIO DO MENU DE INSERIR GASTOS

  menuInserirGastos(): void {
    let escolha;
    while (escolha !== 0) {
      console.log("\n ------------------------------------ \n");
      console.log(`Você selecionou "Inserir Gasto". \n`);
      console.log("Que tipo de gasto você gostaria de trabalhar?\n");

      console.log("    1. Gasto Fixo");
      console.log("    2. Gasto Parcelado \n");
      console.log(`    00. Voltar para o Menu Inicial\n`);

      escolha = +Teclado("O que você deseja fazer?  ");
      console.log("\n");

      switch (escolha) {
        case 0:
          break;

        case 1:
          this.inserirNovoGasto(this.gastoFixo, "fixo");
          break;

        case 2:
          this.inserirNovoGasto(this.gastoParcelado, "parcelado");
          break;

        default:
          console.log("Opção inválida. Tente novamente.\n");
          break;
      }
    }
  }

  inserirNovoGasto(gastos: Gastos[], tipo: string): void {
    console.log("\n ------------------------------------ \n");
    let nomeGasto = Teclado(
      "Por favor, insira o nome do produto/serviço que você deseja cadastrar: "
    );
    let valorGasto = +Teclado(
      "Por favor, insira o valor do produto/serviço que você deseja cadastrar: "
    );
    let mesGasto = solicitarData(
      "Por favor, insira a data do gasto (DD/MM/AAAA): "
    );
    console.log("\n");

    if (tipo === "fixo") {
      gastos.push(new GastoFixo(nomeGasto, valorGasto, mesGasto));
    } else if (tipo === "parcelado") {
      let parcelas = +Teclado("Por favor, insira o número de Parcelas:  ")
      gastos.push(new GastoParcelado(nomeGasto, valorGasto, mesGasto, parcelas));
    }

    exibirRelatorio(gastos);
  }

  // INÍCIO DO MENU DE GERAR RELATÓRIO

  exibirMenuRelatorioGastos(): void {
    let escolha;

    while (escolha !== 0) {
      console.log("\n ------------------------------------ \n");
      console.log("\nQue bom que você quer visualizar seus gastos.\n");

      console.log(
        "Para começar, me conta: você gostaria de visualizar qual tipo de gasto?\n"
      );

      console.log("    1. Gastos Fixos");
      console.log("    2. Gastos Parcelados");
      console.log("    3. Todos os tipos");
      console.log("    00. Voltar para o Menu Inicial\n");

      escolha = +Teclado("O que você deseja fazer?  ");
      console.log("\n");

      switch (escolha) {
        case 1:
          this.menuRelatorioGastos(this.gastoFixo);
          break;

        case 2:
          this.menuRelatorioGastos(this.gastoParcelado);
          break;

        case 3:
          this.menuRelatorioGastos([...this.gastoParcelado, ...this.gastoFixo]);
          break;

        default:
          break;
      }
    }
  }

  menuRelatorioGastos(gastos: Gastos[]): void {
    let escolha;
    while (escolha !== 0) {
      console.log("\nQue bom que você quer visualizar seus gastos fixos.\n");

      console.log("Me diga, você gostaria de ver quais períodos?\n");

      console.log("    1. Hoje");
      console.log("    2. Últimos 7 dias");
      console.log("    3. Este mês");
      console.log("    4. Todos os gastos");
      console.log("    5. Período Personalizado");
      console.log("    00. Voltar para o Menu Inicial\n");

      escolha = +Teclado("O que você deseja fazer?  ");
      console.log("\n");

      switch (escolha) {
        case 1:
        case 2:
        case 3:
        case 4:
          exibirRelatorio(gastos, escolha);
          break;

        case 5:
          const dataInicial = solicitarData(
            "Por favor, insira a data inicial (DD/MM/AAAA): "
          );
          const dataFinal = solicitarData(
            "Por favor, insira a data final (DD/MM/AAAA): "
          );
          exibirRelatorio(gastos, escolha, dataInicial, dataFinal);
          break;

        case 0:
          break;

        default:
          console.log("Opção inválida. Tente novamente.\n");
          break;
      }
    }
  }
}
