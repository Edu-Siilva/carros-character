// Carrega os dados dos personagens do arquivo JSON
async function loadCharacters() {
  try {
    const response = await fetch('personagens.json');
    const characters = await response.json();
    renderCharacters(characters);
  } catch (error) {
    console.error('Erro ao carregar personagens:', error);
    // Exibe mensagem de erro para o usuário
    showErrorMessage('Erro ao carregar os personagens. Tente recarregar a página.');
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
          <img src="${character.imagem}" alt="${character.nome}" onerror="handleImageError(this)">
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

  // Reaplica os efeitos de hover após renderizar
  applyHoverEffects();
}

// Função para lidar com erros de imagem
function handleImageError(img) {
  // Tenta usar a logo do site primeiro
  if (img.src !== './assets/OIP-removebg-preview.png') {
    img.src = './assets/OIP-removebg-preview.png';
  } else {
    // Se a logo também falhar, usa placeholder online
    img.src = 'https://via.placeholder.com/300x200/1e40af/ffffff?text=Carros+Character';
    img.style.opacity = '0.7';
  }
  
  // Adiciona uma classe para estilização diferente se necessário
  img.classList.add('placeholder-image');
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

// Aplica efeitos de hover nos cards
function applyHoverEffects() {
  const cards = document.querySelectorAll('.character-card');

  cards.forEach(card => {
    // Remove listeners antigos para evitar duplicação
    card.removeEventListener('mouseenter', handleMouseEnter);
    card.removeEventListener('mouseleave', handleMouseLeave);
    
    // Adiciona novos listeners
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);
  });
}

// Handlers de mouse para efeitos de hover
function handleMouseEnter() {
  if (!this.classList.contains('flipped')) {
    this.style.transform = 'translateY(-10px) scale(1.02)';
    this.style.transition = 'transform 0.3s ease';
  }
}

function handleMouseLeave() {
  if (!this.classList.contains('flipped')) {
    this.style.transform = '';
  }
}

// Função para exibir mensagens de erro
function showErrorMessage(message) {
  const grid = document.getElementById('charactersGrid');
  grid.innerHTML = `
    <div class="error-message">
      <h3>Oops! 🚗💨</h3>
      <p>${message}</p>
      <button onclick="location.reload()" class="retry-btn">Tentar Novamente</button>
    </div>
  `;
}

// Função para verificar se a página foi carregada corretamente
function checkPageLoad() {
  // Verifica se elementos essenciais existem
  const grid = document.getElementById('charactersGrid');
  if (!grid) {
    console.error('Elemento charactersGrid não encontrado!');
    return false;
  }
  return true;
}

// Função de inicialização
function initializeApp() {
  if (checkPageLoad()) {
    loadCharacters();
  } else {
    console.error('Falha na inicialização da aplicação');
  }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚗 Carros Character - Aplicação inicializada');
  initializeApp();
});

// Opcional: Recarregar personagens quando a aba volta a ter foco
document.addEventListener('visibilitychange', function() {
  if (!document.hidden) {
    // Recarrega apenas se não houver personagens carregados
    const grid = document.getElementById('charactersGrid');
    if (grid && grid.children.length === 0) {
      loadCharacters();
    }
  }
});

// Tratamento de erros globais para debugging
window.addEventListener('error', function(e) {
  console.error('Erro global capturado:', e.error);
});

// Função utilitária para debug (remover em produção se necessário)
function debugInfo() {
  console.log('🔍 Debug Info:');
  console.log('- Grid element:', document.getElementById('charactersGrid'));
  console.log('- Cards count:', document.querySelectorAll('.character-card').length);
  console.log('- Page visibility:', document.visibilityState);
}