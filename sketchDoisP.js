// Sketch - Nomenclatura utilizada para representar o programa no p5

class Bola {
  constructor(jogo) {

    this.posicaoX = width / 2;
    this.posicaoY = height / 2;
    this.velocidadeX = random([-11, -9, 9, 11]);
    this.velocidadeY = random([-11, -9, 9, 11]);
    //this.velocidadeX = 4
    //this.velocidadeY = 4
    this.diametro = 20;
    this.jogo = jogo;
  }


  centralizar() {
    this.posicaoX = width / 2;
    this.posicaoY = height / 2;
  }

  desenhar() {
    circle(this.posicaoX, this.posicaoY, this.diametro); // x, y, diametro (x, y) coordenadas do ponto central
  }

  movimentar() {
    this.posicaoX += this.velocidadeX;
    this.posicaoY += this.velocidadeY;
  }

  checarBordas() { // sendo igual a zero quer dizer que encostou em uma extremidade
    if (this.posicaoX - this.diametro / 2 <= 0) { // checa se a bola encosta no lado esquerdo
      this.jogo.pontuar(2);
      this.jogo.parar();
    } else if (this.posicaoX + this.diametro / 2 >= width) { // checa se a bola encosta no lado direito
      this.jogo.pontuar(1);
      this.jogo.parar();
    }

    if (this.posicaoY - this.diametro / 2 <= 0) {
      this.velocidadeY *= -1;
    }
    if (this.posicaoY + this.diametro / 2 >= height) {
      this.velocidadeY *= -1;
    }
  }
  checarColisaoPlayer(jogador) {
    this.ymenor = jogador.posicaoY;
    this.ymaior = jogador.posicaoY + jogador.altura;

    if (jogador.id == 1) {
      this.xreferencia = jogador.posicaoX + jogador.largura;

      if (this.posicaoX - this.diametro / 2 <= this.xreferencia && this.posicaoX - this.diametro / 2 > 0) {
        if (this.posicaoY >= this.ymenor && this.posicaoY <= this.ymaior) {
          this.velocidadeX *= -1;
        }
      }
    }
    else if (jogador.id == 2) {

      this.xreferencia = jogador.posicaoX;


      if (this.posicaoX + this.diametro / 2 >= this.xreferencia && this.posicaoX < width) {
        if (this.posicaoY >= this.ymenor && this.posicaoY <= this.ymaior) {
          this.velocidadeX *= -1;
        }
      }
    }
  }

}

class Jogador {
  constructor(tipoJ, cor) {
    this.id = tipoJ;
    this.altura = 100;
    this.largura = 13;
    this.cor = cor


    if (this.id == 1) {
      this.posicaoX = 30;
    } else if (this.id == 2) {
      this.posicaoX = windowWidth - 60;
    }
    this.posicaoY = height / 2;
    this.velocidadeY = 10;
  }

  movimentar() {
    //movimentos do jogador 1 para cima e baixo
    if (this.id == 1) {
      if (keyIsDown(87)) {
        if (this.posicaoY > 0) {
          this.posicaoY -= this.velocidadeY;
        } else {
          this.posicaoY = 0;
        }
      }
      if (keyIsDown(83)) {
        this.posicaoY += this.velocidadeY;
        if (this.posicaoY + this.altura > height) {
          this.posicaoY = height - this.altura;
        }
      }
    } else if (this.id == 2) {
      //movimentos do jogador 1 para cima e baixo
      if (keyIsDown(UP_ARROW)) {
        if (this.posicaoY > 0) {
          this.posicaoY -= this.velocidadeY;
        } else {
          this.posicaoY = 0;
        }
      }
      if (keyIsDown(DOWN_ARROW)) {
        this.posicaoY += this.velocidadeY;
        if (this.posicaoY + this.altura > height) {
          this.posicaoY = height - this.altura;
        }
      }
    }
  }

  desenhar() {
    fill(this.cor)
    rect(this.posicaoX, this.posicaoY, this.largura, this.altura);
  }



}

class Jogo {
  constructor() {
    this.rodando = false;
    this.pontosP1 = 0;
    this.pontosP2 = 0;
  }

  parar() {
    this.rodando = false;
  }

  iniciar() {
    this.bola.centralizar();
    this.rodando = true;

  }

  pontuar(p) {
    if (p == 1) {
      this.pontosP1++;
    } else if (p == 2) {
      this.pontosP2++;
    }
    //print("Pontos player 1:" + this.pontosP1 + " /Pontos player 2:" + this.pontosP2);
  }

  zerarPontos() {
    this.pontosP1 = this.pontosP2 = 0;
  }

  setarBola(bola) {
    this.bola = bola;
  }


}
function setup() { // configura e inicializa alguns aspectos do programa ex: criar uma tela/ canvas
  createCanvas(windowWidth, windowHeight); // cria a tela do programa
  //roda uma única vez antes de iniciar o programa
  jogo = new Jogo();
  bola1 = new Bola(jogo);
  jogador1 = new Jogador(1, color(173, 216, 230));
  jogador2 = new Jogador(2, color(255, 182, 193));

  jogo.setarBola(bola1);

}

function draw() { // draw - desenhar. Roda em loop, serve para desenhar na tela, tudo que colocar na função será executado até o programa terminar
  //A função draw é chamada X vezes por segundo a depender do framerate do monitor  
  background(1, 1, 1); // cor de fundo da tela, a função usa o padrão RGB
  let pontuacaoJogador1 = this.jogo.pontosP1
  let pontuacaoJogador2 = this.jogo.pontosP2
  textSize(32)
  textFont('Consolas')
  fill(255)
  text(`J1 ${pontuacaoJogador1}`, windowWidth / 2 - 100, 50)
  text(`J2 ${pontuacaoJogador2}`, windowWidth / 2 + 100, 50)

  jogador1.desenhar();
  jogador2.desenhar();

  document.addEventListener('keydown', function (event) {
    if (event.key === 'm' || event.key === 'M') {
      window.location.href = "/index.html"; // Substitua "/" pelo caminho completo da sua página principal
    } else if (jogo.rodando == true) {

    }
  });

  if (jogo.rodando == true) {
    bola1.desenhar();
    bola1.movimentar();
    bola1.checarBordas();
    jogador1.movimentar();
    jogador2.movimentar();
    bola1.checarColisaoPlayer(jogador1);
    bola1.checarColisaoPlayer(jogador2);
  } else {
    if (keyIsDown(ENTER)) {
      jogo.iniciar();
    }
  }
}