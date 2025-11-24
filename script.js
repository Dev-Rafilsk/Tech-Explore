document.addEventListener('DOMContentLoaded', () => {
    
    const container = document.getElementById('cards-container'); 
    const searchInput = document.getElementById('search-input'); 
    let todasAsLinguagens = [];

    /**
     * @param {string} nome 
     * @param {string} iconeDefinido 
     * @returns {string} 
     */
    const getIcon = (nome, iconeDefinido) => {
        
        if (iconeDefinido) return iconeDefinido;
        
        const map = {
            'c#': 'fa-brands fa-microsoft',
            'go': 'fa-brands fa-golang',
            'java': 'fa-brands fa-java',
            'javascript': 'fa-brands fa-js',
            'python': 'fa-brands fa-python',
            'typescript': 'fa-brands fa-js',
            'rust': 'fa-solid fa-shield-halved',
            'swift': 'fa-brands fa-apple'
        };
        
        return map[nome.toLowerCase()] || 'fa-solid fa-code';
    };

    /**
     * @param {Array} linguagens
     */
    const renderizarCards = (linguagens) => {
       
        container.innerHTML = '';
        
        if (linguagens.length === 0) {
            container.innerHTML = `
                <div class="no-results">
                    <i class="fa-regular fa-face-frown" style="font-size: 3rem; margin-bottom: 10px;"></i>
                    <p>Nenhuma linguagem encontrada.</p>
                </div>
            `;
            return; 
        }

        linguagens.forEach((linguagem, index) => {
            
            const cardLink = document.createElement('a');
            cardLink.className = 'card';
            
            cardLink.href = linguagem.link;
            cardLink.target = '_blank'; 
            cardLink.style.animationDelay = `${index * 0.1}s`;

            const iconeClass = getIcon(linguagem.nome, linguagem.icone);

            cardLink.innerHTML = `
                <div class="card-header">
                    <i class="${iconeClass} lang-icon"></i>
                    <h2>${linguagem.nome}</h2>
                </div>
                <p>${linguagem.descricao}</p>
                <div class="card-footer">
                    <span>Criador: ${linguagem.criador}</span>
                    <span class="year-badge">${linguagem.ano}</span>
                </div>
            `;
            
            container.appendChild(cardLink);
        });
    };

    fetch('data.json')
        .then(response => {
            if (!response.ok) throw new Error('Erro na rede');
            return response.json(); 
        })
        .then(data => {
            todasAsLinguagens = data; 
            renderizarCards(todasAsLinguagens); 
        })
        .catch(error => {
            console.error('Erro:', error);
            container.innerHTML = '<p class="no-results">Erro ao carregar dados.</p>';
        });

    searchInput.addEventListener('input', (e) => {
        const termoDigitado = e.target.value.toLowerCase(); 
        const listaFiltrada = todasAsLinguagens.filter(lang => 
            lang.nome.toLowerCase().includes(termoDigitado)
        );
        
        renderizarCards(listaFiltrada);
    });
});