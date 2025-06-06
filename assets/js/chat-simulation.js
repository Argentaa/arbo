const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log("Seção do chat visível. Inicializando script...");
      
      // Executa o script do chat
      (function() {
        const chatBox = document.querySelector('.chat-box');
        let currentTimeout;
        let isDisplaying = false;

        function appendMessage(text, sender) {
          const msgDiv = document.createElement('div');
          msgDiv.classList.add('chat-message', sender, 'fade-in-up');
          const textSpan = document.createElement('span');
          textSpan.classList.add('text');
          textSpan.textContent = text;
          msgDiv.appendChild(textSpan);
          chatBox.appendChild(msgDiv);
          chatBox.scrollTop = chatBox.scrollHeight;
        }

        const conversations = [
          // Exemplo 1: Agendamento de Consultoria
          [
            { text: 'Olá! Gostaria de agendar uma consultoria para discutir a automação de processos na minha empresa.', sender: 'user' },
            { text: 'Olá! Será um prazer ajudar a otimizar os processos da sua empresa. Para agendarmos a consultoria, poderia me informar qual o melhor dia e horário para você durante a próxima semana?', sender: 'bot' },
            { text: 'Tenho disponibilidade na terça-feira à tarde, a partir das 14h, ou na quinta-feira pela manhã.', sender: 'user' },
            { text: 'Perfeito! Verifiquei nossa agenda e temos disponibilidade na terça-feira às 15h ou na quinta-feira às 10h. Qual prefere?', sender: 'bot' },
            { text: 'Quinta-feira às 10h fica ótimo.', sender: 'user' },
            { text: 'Excelente! Agendamento confirmado para quinta-feira, às 10h. Você receberá um e-mail com os detalhes da reunião e um link para a videoconferência. Algo mais em que posso ajudar?', sender: 'bot' },
            { text: 'Não, obrigado!', sender: 'user' }
          ],
          // Exemplo 2: Suporte Técnico
          [
            { text: 'Minha automação de e-mails parou de funcionar. Podem me ajudar?', sender: 'user' },
            { text: 'Claro! Para que eu possa te ajudar, por favor, me informe o código de erro ou uma descrição mais detalhada do problema.', sender: 'bot' },
            { text: 'Não aparece nenhum código, apenas não envia os e-mails. A última vez que funcionou foi ontem.', sender: 'user' },
            { text: 'Entendido. Vou verificar os logs do sistema. Por favor, aguarde um momento.', sender: 'bot' },
            { text: 'Ok.', sender: 'user' },
            { text: 'Verifiquei e parece ser um problema de autenticação com o servidor de e-mail. Por favor, reconfigure suas credenciais e tente novamente.', sender: 'bot' },
            { text: 'Funcionou! Muito obrigado!', sender: 'user' },
            { text: 'De nada! Se precisar de mais alguma coisa, é só chamar.', sender: 'bot' }
          ],
          // Exemplo 3: Informações sobre Serviços
          [
            { text: 'Quais são os serviços de automação que a Arbo Automações oferece?', sender: 'user' },
            { text: 'Oferecemos soluções de automação de processos administrativos, otimização inteligente de conteúdo e chatbots para atendimento automatizado. Qual área te interessa mais?', sender: 'bot' },
            { text: 'Gostaria de saber mais sobre os chatbots.', sender: 'user' },
            { text: 'Nossos chatbots utilizam inteligência artificial para automatizar o atendimento ao cliente e processos internos, proporcionando interações fluidas e eficientes. Eles podem ser personalizados para diversas finalidades.', sender: 'bot' },
            { text: 'Interessante! Vocês oferecem demonstração?', sender: 'user' },
            { text: 'Sim, podemos agendar uma demonstração personalizada para você. Gostaria de prosseguir com o agendamento?', sender: 'bot' },
            { text: 'Sim, por favor.', sender: 'user' }
          ]
        ];

        function displayConversation(chatId) {
          clearTimeout(currentTimeout);
          isDisplaying = true;
          chatBox.innerHTML = '';
          const conversation = conversations[chatId - 1];
          if (conversation) {
            let messageIndex = 0;
            function showMessage() {
              if (messageIndex < conversation.length) {
                const message = conversation[messageIndex];
                appendMessage(message.text, message.sender);
                messageIndex++;
                currentTimeout = setTimeout(showMessage, 2500);
              } else {
                setTimeout(() => {
                  chatBox.innerHTML = '';
                  messageIndex = 0;
                  showMessage();
                }, 3000);
              }
            }
            showMessage();
          } else {
            isDisplaying = false;
          }
        }

        const chatButtons = document.querySelectorAll('.chat-button');
        chatButtons.forEach(button => {
          button.addEventListener('click', function() {
            const chatId = parseInt(this.getAttribute('data-chat-id'));
            displayConversation(chatId);
          });
        });

        // Só exibe a conversa inicial uma vez
        displayConversation(1);

        // Para evitar reinicializar múltiplas vezes
        observer.unobserve(entry.target);
      })();
    }
  });
}, {
  threshold: 0.5
});

const chatSection = document.querySelector('#chat');
if (chatSection) {
  observer.observe(chatSection);
}

