let cartas = [];
let imagensCartas = [];
let cartasViradas = [];
let cartasEncontradas = [];
let tempoRestante = 30; // Tempo total para o jogo
let cronometroAtivo = true;
let tempoAcabou = false;
const larguraCarta = 100;
const alturaCarta = 150;
let imagemFundo; // Variável para a imagem de fundo
let imagensUsadas = []; // Imagens usadas na rodada atual

function preload() {
  // Carregar as imagens das cartas
  imagensCartas.push(loadImage('bolo.jpg'));
  imagensCartas.push(loadImage('gato.jpg'));
  imagensCartas.push(loadImage('menino.jpg'));
  imagensCartas.push(loadImage('menina.jpg'));
  imagensCartas.push(loadImage('sorvete.jpg'));
  imagensCartas.push(loadImage('pato-1.jpeg')); // Mais imagens
  imagensCartas.push(loadImage('pizza.jpeg'));
  imagensCartas.push(loadImage('cavalo.jpg'));
  imagensCartas.push(loadImage('flor.jpg'));

  // Carregar a imagem de fundo
  imagemFundo = loadImage('praiaaa.jpg'); // Substitua 'fundo.jpg' pelo caminho correto da sua imagem
}

function setup() {
  createCanvas(800, 600);
  inicializarCartas();
  textSize(32);
}

function draw() {
  // Desenha a imagem de fundo
  background(imagemFundo);

  // Exibe as cartas
  for (let i = 0; i < cartas.length; i++) {
    let x = (i % 5) * (larguraCarta + 20) + 50;
    let y = Math.floor(i / 5) * (alturaCarta + 20) + 50;
    if (cartasViradas.includes(i) || cartasEncontradas.includes(i)) {
      image(imagensUsadas[cartas[i]], x, y, larguraCarta, alturaCarta);
    } else {
      fill(255);
      rect(x, y, larguraCarta, alturaCarta);
    }
  }

  // Exibe o tempo restante
  fill(0);
  text("Tempo: " + tempoRestante, width - 150, 30);

  // Verifica se o jogador venceu
  if (cartasEncontradas.length === cartas.length) {
    fill(0, 200, 0);
    textSize(48);
    textAlign(CENTER, CENTER);
    text("Você venceu!", width / 2, height / 2);
    noLoop(); // Para o jogo
  }

  // Controla o cronômetro
  if (cronometroAtivo && !tempoAcabou) {
    if (frameCount % 60 === 0 && tempoRestante > 0) {
      tempoRestante--;
    } else if (tempoRestante === 0) {
      tempoAcabou = true;
      textSize(48);
      textAlign(CENTER, CENTER);
      text("Tempo Esgotado!", width / 2, height / 2);
      noLoop();
    }
  }
}

function mousePressed() {
  for (let i = 0; i < cartas.length; i++) {
    let x = (i % 5) * (larguraCarta + 20) + 50;
    let y = Math.floor(i / 5) * (alturaCarta + 20) + 50;
    if (
      mouseX > x &&
      mouseX < x + larguraCarta &&
      mouseY > y &&
      mouseY < y + alturaCarta
    ) {
      if (!cartasViradas.includes(i) && !cartasEncontradas.includes(i)) {
        cartasViradas.push(i); // Vira a carta

        // Verifica se duas cartas foram viradas
        if (cartasViradas.length === 2) {
          let carta1 = cartas[cartasViradas[0]];
          let carta2 = cartas[cartasViradas[1]];

          if (carta1 === carta2) {
            cartasEncontradas.push(...cartasViradas); // Marca como encontrada
            cartasViradas = []; // Reseta as viradas
          } else {
            // Mantém as cartas viradas até acertar
            setTimeout(() => {
              cartasViradas = [];
            }, 1000);
          }
        }
      }
    }
  }
}

function inicializarCartas() {
  cartas = [];
  cartasViradas = [];
  cartasEncontradas = [];

  let numPares = 5; // Número fixo de pares
  let totalImagens = imagensCartas.length;

  // Embaralha todas as imagens disponíveis e escolhe as usadas na rodada
  imagensUsadas = shuffle(imagensCartas).slice(0, numPares);

  // Cria os pares de cartas
  for (let i = 0; i < imagensUsadas.length; i++) {
    cartas.push(i);
    cartas.push(i);
  }

  // Embaralha as cartas
  cartas = shuffle(cartas);
}
