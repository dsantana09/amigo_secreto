(() => {
    const amigos = [];

    const $input = document.getElementById('amigo');
    const $lista = document.getElementById('listaAmigos');
    const $resultado = document.getElementById('resultado');
    const $btnLimpar = document.getElementById('btnLimpar');


    
    function atualizarLista() {
        $lista.innerHTML = '';

        amigos.forEach((amigo, index) => {
            const li = document.createElement('li');
            li.textContent = amigo;

            const btnRemover = document.createElement('button');
            btnRemover.classList.add('btn-remover-amigo');
            btnRemover.setAttribute('aria-label', `Remover amigo ${amigo}`);

            const icon = document.createElement('i');
            icon.classList.add('material-icons');
            icon.textContent = 'close';

            const spanText = document.createElement('span');
            spanText.textContent = 'Remover';

            btnRemover.appendChild(icon);
            btnRemover.appendChild(spanText);

            btnRemover.onclick = () => {
                amigos.splice(index, 1);
                atualizarLista();
            };

            li.appendChild(btnRemover);
            $lista.appendChild(li);
        });

        $btnLimpar.disabled = amigos.length === 0;
    }

    function adicionarAmigo() {
        const nome = $input.value.trim();
        if (!nome) {
            alert('Por favor, insira um nome válido.');
            return;
        }
        if (amigos.some(a => a.toLowerCase() === nome.toLowerCase())) {
            alert('Esse nome já foi adicionado.');
            return;
        }
        amigos.push(nome);
        atualizarLista();
        $input.value = '';
        $input.focus();
        $resultado.innerHTML = '';
        
    }

    function sortearAmigo() {
        // Alerta foi atualizado para pedir apenas 1 nome
        if (amigos.length === 0) {
            alert('Adicione pelo menos um nome antes de sortear.');
            return;
        }

        // Lógica de sorteio alterada para selecionar apenas um nome
        const indice = Math.floor(Math.random() * amigos.length);
        const sorteado = amigos[indice];

        // Limpa as listas de nomes e do resultado anterior
        $lista.innerHTML = '';
        $resultado.innerHTML = '';
        
        // Exibe o nome sorteado na lista de resultados
        $resultado.innerHTML = `<li>O amigo secreto sorteado é: <strong>${sorteado}</strong></li>`;
    
      
    }

    function limparLista() {
        amigos.length = 0;
        $lista.innerHTML = '';
        $resultado.innerHTML = '';
        $btnLimpar.disabled = true;
        
    }

    window.adicionarAmigo = adicionarAmigo;
    window.sortearAmigo = sortearAmigo;
    window.limparLista = limparLista;
    $input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') adicionarAmigo();
    });
    
    atualizarLista();
})();