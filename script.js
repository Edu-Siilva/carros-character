// Carrega os dados dos personagens do arquivo JSON
async function loadCharacters() {
  try {
    const response = await fetch('personagens.json');
    const characters = await response.json();
    renderCharacters(characters);
  } catch (error) {
    console.error('Erro ao carregar personagens:', error);
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
          <img src="${character.imagem}" alt="${character.nome}" onerror="this.src='https://via.placeholder.com/300x200/cccccc/666?text=Carros'">
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
document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.character-card');

  cards.forEach(card => {
    card.addEventListener('mouseenter', function () {
      if (!this.classList.contains('flipped')) {
        this.style.transform = 'translateY(-10px) scale(1.02)';
      }
    });

    card.addEventListener('mouseleave', function () {
      if (!this.classList.contains('flipped')) {
        this.style.transform = '';
      }
    });
  });
});

// Carrega os personagens quando a página é carregada
document.addEventListener('DOMContentLoaded', loadCharacters);