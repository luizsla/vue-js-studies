new Vue({
    el: '#jogo',
    data: {
        jogoIniciado: false,
        vidaJogador: 100,
        vidaMonstro: 100,
        logs: [],
    },
    computed: {
        jogoTerminou() {
            return this.vidaJogador <= 0 || this.vidaMonstro <= 0;
        }
    },
    methods: {
        iniciarJogo() {
            this.jogoIniciado = true;
        },
        calcularValor(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        gerarLogMovimento(movimento, numero) {
            let mensagem;

            if (movimento === 'ataque-jogador') {
                mensagem = `Jogador atingiu monstro com ${numero}.`;
            } else if (movimento === 'ataque-monstro') {
                mensagem = `Monstro atingiu jogador com ${numero}.`;
            } else {
                mensagem = `Jogador ganhou força de ${numero}.`;
            }

            this.logs.push({
                movimento,
                mensagem
            });
        },
        gerarAtaque(especial) {
            const maxAtaqueJogador = especial ? 20 : 12;
            //Gerar um ataque do jogador
            const ataqueJogador = this.calcularValor(1, maxAtaqueJogador);
            //Vamos diminuir o valor do ataque no life do monstro.
            this.vidaMonstro = Math.max(this.vidaMonstro - ataqueJogador, 0);
            //Gerando o log
            this.gerarLogMovimento('ataque-jogador', ataqueJogador);
            //Gerar um ataque do monstro
            const ataqueMonstro = this.calcularValor(1, 15);
            //Vamos diminui o valor do ataque no life do jogador.
            this.vidaJogador = Math.max(this.vidaJogador - ataqueMonstro, 0);
            //Gerar um log ataque monstro 
            this.gerarLogMovimento('ataque-monstro', ataqueMonstro);
        },
        curar() {
            //Curar Jogador
            const vidaCurada = this.calcularValor(1, 20);
            //Adicionar vida ao jogador.
            this.vidaJogador = Math.min(this.vidaJogador + vidaCurada, 100);
            //Gerar log da cura
            this.gerarLogMovimento('cura-jogador', vidaCurada);
            //realizar ataque do monstro
            const ataqueMonstro = this.calcularValor(1, 15);
            //Diminuir do jogador do valor de sua vida
            this.vidaJogador -= ataqueMonstro;
            //gerar log do ataque
            this.gerarLogMovimento('ataque-monstro', ataqueMonstro);
        },
    },
    watch: {
        jogoIniciado() {
            if (!this.jogoIniciado) {
                this.vidaJogador = 100;
                this.vidaMonstro = 100;
                this.logs = [];
            }
        }
    }
});