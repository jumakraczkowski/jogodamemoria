let cartas = [];
let imagensCartas = [];
let cartasViradas = [];
let cartasEncontradas = [];
let imagemFundo;
let imagemCapa;
let larguraCarta = 150;
let alturaCarta = 150;
let tempoRestante = 30; // Tempo inicial em segundos
let cronometroAtivo = true;
let jogoIniciado = false;

// Fixa a parte do preload
function preload() {
  // Carregar as imagens das cartas
  imagensCartas.push(loadImage('bolo.jpg'));
  imagensCartas.push(loadImage('gato.jpg'));
  imagensCartas.push(loadImage('menino.jpg'));
  imagensCartas.push(loadImage('menina.jpg'));
  imagensCartas.push(loadImage('sorvete.jpg'));
  imagensCartas.push(loadImage('pato-1.jpeg'));
  imagensCartas.push(loadImage('pizza.jpeg'));
  imagensCartas.push(loadImage('cavalo.jpg'));
  imagensCartas.push(loadImage('flor.jpg'));

  // Carregar a imagem de fundo e a capa
  imagemFundo = loadImage('praiaaa.jpg');
  imagemCapa = loadImage('capaaa.jpg'); // Sua imagem de capa
}

function setup() {
  createCanvas(800, 600);
  setInterval(() => {
    if (cronometroAtivo && tempoRestante > 0) {
      tempoRestante--;
    } else if (tempoRestante === 0 && cronometroAtivo) {
      // Reinicia o cronômetro e reseta o jogo na mesma rodada
      reiniciarRodada();
    }
  }, 1000);
}

function draw() {
  if (!jogoIniciado) {
    // Exibe a capa
    background(imagemCapa);
    textSize(48);
    fill(255);
    textAlign(CENTER, CENTER);
    text("Jogo da Memória", width / 2, height / 3);
    
    // Botão "Começar"
    fill(0, 255, 0);
    rect(width / 2 - 100, height / 2 + 100, 200, 50);
    fill(0);
    textSize(32);
    text("Começar", width / 2, height / 2 + 125);
    
    return;
  }

  // Desenhar o fundo
  background(imagemFundo);

  // Mostrar o cronômetro
  textSize(32);
  fill(255);
  text(`Tempo: ${tempoRestante}`, width - 150, 40);

  // Desenhar as cartas
  for (let i = 0; i < cartas.length; i++) {
    let x = (i % 4) * (larguraCarta + 10) + 50;
    let y = floor(i / 4) * (alturaCarta + 10) + 100;

    if (cartasViradas.includes(i) || cartasEncontradas.includes(i)) {
      image(imagensCartas[cartas[i]], x, y, larguraCarta, alturaCarta);
    } else {
      fill(200);
      rect(x, y, larguraCarta, alturaCarta, 10);
    }
  }

  // Verificar se o jogador venceu
  if (cartasEncontradas.length === cartas.length) {
    cronometroAtivo = false;
    textSize(50);
    fill(0, 255, 0);
    text('Você venceu!', width / 2 - 150, height / 2);
    setTimeout(() => {
      inicializarCartas();
      tempoRestante = 30;
      cronometroAtivo = true;
    }, 3000); // Reinicia o jogo após 3 segundos
  }

  // Verificar se o tempo acabou
  if (tempoRestante <= 0) {
    textSize(50);
    fill(255, 0, 0);
    text('Tempo esgotado!', width / 2 - 200, height / 2);
  }
}

function mousePressed() {
  if (!jogoIniciado) {
    // Inicia o jogo ao clicar no botão
    if (
      mouseX > width / 2 - 100 &&
      mouseX < width / 2 + 100 &&
      mouseY > height / 2 + 100 &&
      mouseY < height / 2 + 150
    ) {
      jogoIniciado = true;
      inicializarCartas();
    }
    return;
  }

  for (let i = 0; i < cartas.length; i++) {
    let x = (i % 4) * (larguraCarta + 10) + 50;
    let y = floor(i / 4) * (alturaCarta + 10) + 100;

    if (
      mouseX > x &&
      mouseX < x + larguraCarta &&
      mouseY > y &&
      mouseY < y + alturaCarta
    ) {
      if (!cartasViradas.includes(i) && !cartasEncontradas.includes(i)) {
        cartasViradas.push(i);

        if (cartasViradas.length === 2) {
          let carta1 = cartas[cartasViradas[0]];
          let carta2 = cartas[cartasViradas[1]];

          if (carta1 === carta2) {
            cartasEncontradas.push(...cartasViradas);
          }

          setTimeout(() => {
            cartasViradas = [];
          }, 1000);
        }
      }
    }
  }
}

function inicializarCartas() {
  cartas = [];
  cartasViradas = [];
  cartasEncontradas = [];

  // Define o número de pares de cartas (6 pares fixos neste exemplo)
  let numPares = 6;
  let paresMaximos = Math.min(numPares, imagensCartas.length);

  for (let i = 0; i < paresMaximos; i++) {
    cartas.push(i);
    cartas.push(i);
  }

  cartas = shuffle(cartas);
}

function reiniciarRodada() {
  // Reseta as variáveis para o estado inicial da rodada
  cartasViradas = [];
  cartasEncontradas = [];
  tempoRestante = 30;
  cronometroAtivo = true;
}
