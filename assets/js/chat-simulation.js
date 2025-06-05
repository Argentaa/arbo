/* Chat simulation code */
/* Chat simulation code */
(function() {
  const chatBox = document.querySelector('.chat-box');
  let currentTimeout; // Variable to hold the timeout ID
  let isDisplaying = false; // Flag to check if a conversation is being displayed

  function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('chat-message', sender, 'fade-in-up'); /* Add animation class */
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
  console.log('Displaying conversation for chat ID:', chatId); // Log the chat ID being displayed

  // Clear any existing timeout and stop current display if active
  clearTimeout(currentTimeout);
  isDisplaying = true; // Set flag to true when starting display

  chatBox.innerHTML = ''; // Clear current messages
  const conversationIndex = chatId - 1; // chat-id 1 corresponds to index 0
  const conversation = conversations[conversationIndex];

  if (conversation) {
    console.log('Conversation data:', conversation); // Log the conversation data
    let messageIndex = 0;

    function showMessage() {
      if (messageIndex < conversation.length) {
        const message = conversation[messageIndex];
        appendMessage(message.text, message.sender);
        console.log('Appending message:', message.text); // Log the message being appended
        messageIndex++;
        currentTimeout = setTimeout(showMessage, 2500); // Show next message after delay
      } else {
        // Reinicia a conversa após um pequeno atraso
        setTimeout(() => {
          chatBox.innerHTML = ''; // Limpa o chat
          messageIndex = 0; // Reinicia o índice
          showMessage(); // Começa novamente
        }, 3000); // Espera 3 segundos antes de repetir
      }
    }

    showMessage(); // Start displaying messages
  } else {
    isDisplaying = false; // Reset flag if conversation is not found
  }
}


  // Add event listeners to the buttons
  const chatButtons = document.querySelectorAll('.chat-button');
  chatButtons.forEach(button => {
    button.addEventListener('click', function() {
        console.log('Button clicked:', this.getAttribute('data-chat-id')); // Log the chat ID
      const chatId = parseInt(this.getAttribute('data-chat-id'));
      displayConversation(chatId);
    });
  });

  // Display the first conversation by default on page load
  displayConversation(1);
})();
