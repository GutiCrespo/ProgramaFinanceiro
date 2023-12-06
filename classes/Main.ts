import { Teclado } from "../utilidades/Teclado";

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

export class GastoFixo extends Gastos {

    constructor (nome: string, valor: number, mes: Date){
        super(nome, valor, mes)
    }

    public visualizarGasto(): string {
        return (`Nome do Gasto Fixo: ${this.getNome()} \n` +
                `Valor do Gasto Fixo: ${this.getValor().toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })} \n` +
                `Mês de Início do Gasto Fixo: ${this.getMes().toDateString()}\n`)
    }

}

export class GastoVariavel extends Gastos {

    constructor (nome: string, valor: number, mes: Date){
        super(nome, valor, mes)
    }

    public visualizarGasto(): string {
        return (`Nome do Gasto Variavel: ${this.getNome()} \n` +
                `Valor do Gasto Variavel: ${this.getValor().toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })} \n` +
                `Mês de Início do Gasto Varial: ${this.getMes().toDateString()}\n`)
    }

}

export class AppFinanceiro {
    gastoFixo: GastoFixo[] = [
        // new GastoFixo("Hoje", 89, new Date(2023, 11, 6)),
        // new GastoFixo("7 Dias", 99, new Date(2023, 11, 3)),
        // new GastoFixo("Este Mês", 89, new Date(2023, 11, 1)),
        // new GastoFixo("Todo Período", 89, new Date(1998, 3, 21))
    ];

    gastoVariavel: GastoFixo[] = [];
    escolha!: number;

    exibirMenuInicial(): void{
        console.log("\n----------------------------------------------------\n");
        console.log("Olá, boas-vindas ao seu aplicativo financeiro pessoal.\n");
        
        console.log("Toda nossa comunicação se dará através de respostas nesse terminal. Você poderá responder, apenas inserindo o número desejado. Casos excepcionais serão indicados na tela.\n");
        
        console.log("Para começar, insira o que você deseja fazer hoje:\n");
        
        console.log("    1. Inserir um novo Gasto");
        console.log("    2. Gerar relatório de Gastos\n");

        this.escolha = +Teclado("O que você deseja fazer?  ")
        console.log("\n");  

        switch (this.escolha) {
            case 1:
                this.exibirMenuInserirGastos()
                break;

            case 2:
                this.exibirMenuRelatorioGastos()
                break;
        
            default:
                break;
        }

    }

    // INÍCIO DO MENU DE INSERIR GASTOS - [Ponto de Criação de Novo componente]

    // Condições Gerais (Inserir Gasto)
    exibirMenuInserirGastos(): void {
        console.log("\n ------------------------------------ \n" );
        console.log(`Você selecionou "Inserir Gasto". \n`);
        console.log("Que tipo de gasto você gostaria de inserir?\n");

        console.log("    1. Gasto Fixo");
        console.log("    2. Gasto Variavel \n");
        console.log(`    00. Voltar para o Menu Inicial\n`);   

        this.escolha = +Teclado("O que você deseja fazer?  ")
        console.log("\n");  

        switch (this.escolha) {
            case 1:
                this.exibirMenuGastoFixo()
                break;

            case 2:
                this.exibirMenuGastoVariavel()
                break;
        
                case 0:
                    this.exibirMenuInicial();
                    break;
    
                default:
                    console.log("Opção inválida. Tente novamente.\n");
                    this.relatorioGastosFixos();
                    break;
        }
    }

    private solicitarData(prompt: string): Date {

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

    // MENU DE GASTO FIXO (Inserir Gasto)
    exibirMenuGastoFixo(): void {

        

        console.log("\n ------------------------------------ \n" );
        console.log(`Você selecionou 'Gasto Fixo'. \n`);

        console.log(`    1. Inserir novo Gasto Fixo`);
        console.log(`    2. Visualizar Gastos Fixos Registrados`);
        console.log(`    00. Voltar para o Menu de Inserir Gastos \n`);    
        
        this.escolha = +Teclado("O que você deseja fazer?  ")
        console.log("\n");    
    
        switch (this.escolha) {
            case 1:
                this.inserirNovoGastoFixo()
                break;

            case 2:
                this.exibirGastoFixo()
                break;
        
                case 0:
                    this.exibirMenuInserirGastos();
                    break;
    
                default:
                    console.log("Opção inválida. Tente novamente.\n");
                    this.relatorioGastosFixos();
                    break;
        }
    }

    exibirGastoFixo(): void {
        console.log("\n ------------------------------------ \n" );
        console.log("Gastos Fixos Registrados:\n");
    
        for (const gasto of this.gastoFixo) {
            console.log(gasto.visualizarGasto())
        }

        this.exibirMenuGastoFixo()
    }

    inserirNovoGastoFixo(): void {

        console.log("\n ------------------------------------ \n" );
        let nomeGasto = Teclado("Por favor, insira o nome do produto/serviço que você deseja cadastrar: ")
        let valorGasto = +Teclado("Por favor, insira o valor do produto/serviço que você deseja cadastrar: ")
        let mesGasto = this.solicitarData("Por favor, insira a data do gasto (DD/MM/AAAA): "); 
        console.log("\n" );

        const novoGastoFixo = new GastoFixo(nomeGasto, valorGasto, mesGasto)
        this.gastoFixo.push(novoGastoFixo)

        this.exibirMenuGastoFixo()
    }

    // MENU DE GASTO VARIAVEL (Inserir Gasto)
    exibirMenuGastoVariavel(): void {

        console.log("\n ------------------------------------ \n" );
        console.log(`Você selecionou 'Gasto Variavel'. \n`);

        console.log(`    1. Inserir novo Gasto Variavel`);
        console.log(`    2. Visualizar Gastos Variaveis Registrados`);
        console.log(`    00. Voltar ao Menu Inicial \n`);    
        
        this.escolha = +Teclado("O que você deseja fazer?  ")
        console.log("\n");    
    
        switch (this.escolha) {
            case 1:
                this.inserirNovoGastoVariavel()
                break;

            case 2:
                this.exibirGastoVariavel()
                break;
        
                case 0:
                    this.exibirMenuInicial();
                    break;
    
                default:
                    console.log("Opção inválida. Tente novamente.\n");
                    this.relatorioGastosFixos();
                    break;
        }
    }

    exibirGastoVariavel(): void {
        console.log("\n ------------------------------------ \n" );
        console.log("Gastos Variaveis Registrados:\n");
    
        for (const gasto of this.gastoVariavel) {
            console.log(gasto.visualizarGasto())
        }

        this.exibirMenuGastoFixo()
    }

    inserirNovoGastoVariavel(): void {

        console.log("\n ------------------------------------ \n" );
        let nomeGasto = Teclado("Por favor, insira o nome do produto/serviço que você deseja cadastrar: ")
        let valorGasto = +Teclado("Por favor, insira o valor do produto/serviço que você deseja cadastrar: ")
        let mesGasto = this.solicitarData("Por favor, insira a data do gasto (DD/MM/AAAA): "); 
        console.log("\n" );

        const novoGastoVariavel = new GastoVariavel(nomeGasto, valorGasto, mesGasto)
        this.gastoVariavel.push(novoGastoVariavel)

        this.exibirMenuGastoVariavel()
    }

    // FIM DO MENU DE INSERIR GASTOS


    // INÍCIO DO MENU DE GERAR RELATÓRIO

    // MÉTODOS PRIVATES PARA FILTRAR OS PERÍODOS
    
    private filtroGastosFixos(periodo: number, dataInicial?: Date, dataFinal?: Date): GastoFixo[] {
        const hoje = new Date();

        switch (periodo) {
            case 1: // Hoje
                return this.gastoFixo.filter(gasto => gasto.getMes().toDateString() === hoje.toDateString());

            case 2: // Ultimos 7 Dias
                const ultimos7Dias = new Date(hoje);
                ultimos7Dias.setDate(hoje.getDate() - 7);
                return this.gastoFixo.filter(gasto => gasto.getMes() >= ultimos7Dias);

            case 3: // Este mês
                const primeiroDiaMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
                return this.gastoFixo.filter(gasto => gasto.getMes() >= primeiroDiaMes);

            case 4: // Todo Período
                return this.gastoFixo;

            case 5: // Período Personalizado
                if(dataInicial === undefined || dataFinal === undefined){
                    return []
                } 
                
                return this.gastoFixo.filter(gasto => gasto.getMes() >= dataInicial && gasto.getMes() <= dataFinal);

            default:
                return [];
        }
    }

    private exibirRelatorioGastosFixos(periodo: number, dataInicial?: Date, dataFinal?: Date): void {
        const gastosFiltrados = this.filtroGastosFixos(periodo, dataInicial, dataFinal);

        console.log("\n------------------------------------\n");
        console.log("Relatório de Gastos Fixos:\n");
        
        let somaTotal = 0
        
        for (const gasto of gastosFiltrados) {
            somaTotal += gasto.getValor();
            console.log(gasto.visualizarGasto())  
        }
        console.log(`Valor Total do período: ${somaTotal.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`);
        console.log(`Número de itens no período: ${gastosFiltrados.length} \n`);
        console.log("\n------------------------------------\n");
    }

    exibirMenuRelatorioGastos(): void{
        console.log("\nQue bom que você quer visualizar seus gastos.\n");

        console.log("Para começar, me conta: você gostaria de visualizar qual tipo de gasto?\n");

        console.log("    1. Gastos Fixos");
        console.log("    2. Gastos Variáveis");
        console.log("    3. Todos os tipos");
        console.log("    00. Voltar para o Menu Inicial\n");

        this.escolha = +Teclado("O que você deseja fazer?  ")
        console.log("\n");    

        switch (this.escolha) {
            case 1:
                this.relatorioGastosFixos()
                break;

            // case 2:
            //     this.exibirGastoVariavel()
            //     break;
        
            default:
                this.exibirMenuInserirGastos()
                break;
        }
    }

    relatorioGastosFixos(): void {

        while(this.escolha !== 0){

            console.log("\nQue bom que você quer visualizar seus gastos fixos.\n");
            
            console.log("Me diga, você gostaria de ver quais períodos?\n");
            
            console.log("    1. Hoje");
            console.log("    2. Últimos 7 dias");
            console.log("    3. Este mês");
            console.log("    4. Todos os gastos");
            console.log("    5. Período Personalizado");
            console.log("    00. Voltar para o Menu Inicial\n");
    
            this.escolha = +Teclado("O que você deseja fazer?  ")
            console.log("\n");    
    
    
            switch (this.escolha) {
                case 1:
                case 2:
                case 3:
                case 4:
                    this.exibirRelatorioGastosFixos(this.escolha);   
                    break;
    
                case 5:
                    const dataInicial = this.solicitarData("Por favor, insira a data inicial (DD/MM/AAAA): ");
                    const dataFinal = this.solicitarData("Por favor, insira a data final (DD/MM/AAAA): ");
                    this.exibirRelatorioGastosFixos(this.escolha, dataInicial, dataFinal)
                    break;
    
                case 0:
                    this.exibirMenuInicial();
                    break;
    
                default:
                    console.log("Opção inválida. Tente novamente.\n");
                    break;
            }
        }
    }
    
}