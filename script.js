// Carrega os dados dos personagens do arquivo JSON
async function loadCharacters() {
  try {
    const response = await fetch('personagens.json');
    const characters = await response.json();
    renderCharacters(characters);
  } catch (error) {
    console.error('Erro ao carregar personagens:', error);
    // Fallback: usar dados hardcoded se o arquivo JSON não for encontrado
    const fallbackCharacters = [
      {
        "nome": "Relâmpago McQueen",
        "imagem": "./personagens/relampago-mcqueen.png",
        "modelo": "Chevrolet Corvette C6",
        "ano": "2006",
        "informacoes": "Protagonista veloz e determinado que conquistou as pistas e os corações dos fãs."
      },
      {
        "nome": "Chick Hicks",
        "imagem": "./personagens/Chick-Hicks.png",
        "modelo": "Modelo Genérico de Stock Car",
        "ano": "2006",
        "informacoes": "Competidor inescrupuloso e rival de McQueen, sempre disposto a trapacear para vencer."
      },
      {
        "nome": "Doc Hudson",
        "imagem": "./personagens/doc-hudson.png",
        "modelo": "Packard Super Eight",
        "ano": "1951",
        "informacoes": "Ex-campeão de corridas e mentor experiente, cheio de histórias e sabedoria."
      },
      {
        "nome": "Fill More",
        "imagem": "./personagens/fillmore.png",
        "modelo": "Volkswagen Type 2",
        "ano": "1967",
        "informacoes": "Carro relaxado e amante da natureza, que representa o espírito livre dos anos 60."
      },
      {
        "nome": "Flo",
        "imagem": "./personagens/Flo.png",
        "modelo": "Chevrolet Bel Air",
        "ano": "1957",
        "informacoes": "Dona do restaurante local e símbolo de hospitalidade, com um charme inconfundível."
      },
      {
        "nome": "Guido",
        "imagem": "./personagens/Guido.png",
        "modelo": "Empilhadeira Customizada",
        "ano": "2000",
        "informacoes": "Especialista em manobras com empilhadeiras, sempre dando aquela força para a equipe."
      },
      {
        "nome": "Lizzie",
        "imagem": "./personagens/Lizzie.png",
        "modelo": "Carro Clássico dos Anos 1920",
        "ano": "1925",
        "informacoes": "Representa a tradição e história da cidade, com elegância e personalidade."
      },
      {
        "nome": "Luigi",
        "imagem": "./personagens/Luigi.png",
        "modelo": "Fiat 500",
        "ano": "1955",
        "informacoes": "Entusiasta das corridas e apaixonado pela cultura italiana, sempre animado para competir."
      },
      {
        "nome": "Mack",
        "imagem": "./personagens/Mack.png",
        "modelo": "Caminhão Mack",
        "ano": "2005",
        "informacoes": "O leal transportador de McQueen, sempre pronto para cumprir seu papel nas corridas."
      },
      {
        "nome": "Mate",
        "imagem": "./personagens/Mate.png",
        "modelo": "Guincho Customizado",
        "ano": "2006",
        "informacoes": "Parceiro simpático e bem-humorado de McQueen, conhecido por sua lealdade e humor atrapalhado."
      },
      {
        "nome": "Ramone",
        "imagem": "./personagens/Ramone.png",
        "modelo": "Chevrolet Impala Customizado",
        "ano": "1959",
        "informacoes": "Artista e personalizador de carros, Ramone transforma sua oficina em uma verdadeira galeria de arte."
      },
      {
        "nome": "Ruivo",
        "imagem": "./personagens/Ruivo-1.png",
        "modelo": "Carro de Bombeiro  Personalizado",
        "ano": "2006",
        "informacoes": "Personagem carismático com design vibrante, que traz energia e estilo para a cidade."
      }
    ];
    renderCharacters(fallbackCharacters);
  }
}

// Renderiza os personagens na página
function renderCharacters(characters) {
  const grid = document.getElementById('charactersGrid');
  grid.innerHTML = '';

  characters.forEach((character, index) => {
    const cardContainer = document.createElement('div');
    cardContainer.className = 'card-container';
    
    cardContainer.innerHTML = `
      <div class="character-card" onclick="flipCard(this)">
        <div class="card-front">
          <img src="${character.imagem}" alt="${character.nome}" onerror="this.src='./personagens/placeholder.png'">
          <h3>${character.nome}</h3>
          <p class="click-hint">Clique para ver mais!</p>
        </div>
        <div class="card-back">
          <h3>${character.nome}</h3>
          <div class="card-info">
            <p><strong>Modelo:</strong> ${character.modelo}</p>
            <p><strong>Ano:</strong> ${character.ano}</p>
            <div class="description">
              ${character.informacoes}
            </div>
          </div>
          <button class="flip-back-btn" onclick="flipCardBack(event, this.parentElement.parentElement)">
            Voltar
          </button>
        </div>
      </div>
    `;
    
    grid.appendChild(cardContainer);
  });
}

// Função para virar a carta
function flipCard(card) {
  card.classList.toggle('flipped');
}

// Função para voltar a carta (evita propagação do evento)
function flipCardBack(event, card) {
  event.stopPropagation(); // Impede que o clique no botão acione o flipCard
  card.classList.remove('flipped');
}

// Efeito de hover personalizado para melhor UX
document.addEventListener('DOMContentLoaded', function() {
  // Adiciona efeitos sonoros se disponível (opcional)
  const cards = document.querySelectorAll('.character-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      if (!this.classList.contains('flipped')) {
        this.style.transform = 'translateY(-10px) scale(1.02)';
      }
    });
    
    card.addEventListener('mouseleave', function() {
      if (!this.classList.contains('flipped')) {
        this.style.transform = '';
      }
    });
  });
});

// Carrega os personagens quando a página é carregada
document.addEventListener('DOMContentLoaded', loadCharacters);