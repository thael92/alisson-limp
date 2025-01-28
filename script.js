
// Menu Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Contact Form Handler
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    // Here you would typically send the form data to a server
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    contactForm.reset();
});

// Chatbot Functionality
const chatToggle = document.querySelector('.chat-toggle');
const chatContainer = document.querySelector('.chat-container');
const closeChat = document.querySelector('.close-chat');
const chatForm = document.querySelector('.chat-form');
const chatMessages = document.querySelector('.chat-messages');

// Add these variables at the top of your script
const WHATSAPP_NUMBER = '5588981962346'; // Replace with your business WhatsApp number
let customerData = {
    name: '',
    service: '',
    type: ''
};

  // Chat state management
  let chatState = 'initial';
  let userName = '';

  // Initial message and options
  const chatFlow = {
      initial: {
          message: "Olá! Bem-vindo à +LIMP! Escolha uma opção:\n1 - Agendar Limpeza\n2 - Solicitar Orçamento\n3 - Informações sobre Serviços\n4 - Falar com Atendente",
          options: ['1', '2', '3', '4']
      },
      scheduling: {
          message: "Qual serviço você deseja agendar?\n1 - Limpeza de Sofá\n2 - Higienização de Colchão\n3 - Limpeza de Estofados\n4 - Voltar ao Menu Principal",
          options: ['1', '2', '3', '4']
      },
      quote: {
          message: "Para orçamento, escolha:\n1 - Sofá\n2 - Colchão\n3 - Outros Estofados\n4 - Voltar ao Menu Principal",
          options: ['1', '2', '3', '4']
      },
      services: {
          message: "Nossos serviços:\n1 - Limpeza de Sofá\n2 - Higienização de Colchão\n3 - Limpeza de Estofados\n4 - Voltar ao Menu Principal",
          options: ['1', '2', '3', '4']
      }
  };

  // Toggle chat window
  chatToggle.addEventListener('click', () => {
      chatContainer.style.display = 'block';
      chatToggle.style.display = 'none';
      // Show initial message
      addMessage('bot', chatFlow.initial.message);
  });

  closeChat.addEventListener('click', () => {
      chatContainer.style.display = 'none';
      chatToggle.style.display = 'block';
      // Reset chat state
      chatState = 'initial';
      chatMessages.innerHTML = '';
  });

  // Handle chat messages
  chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = chatForm.querySelector('input');
      const message = input.value.trim();

      if (message) {
          addMessage('user', message);
          handleUserInput(message);
          input.value = '';
      }
  });

  function handleUserInput(message) {
      switch(chatState) {
          case 'initial':
              handleInitialState(message);
              break;
          case 'scheduling':
              handleSchedulingState(message);
              break;
          case 'quote':
              handleQuoteState(message);
              break;
          case 'services':
              handleServicesState(message);
              break;
          case 'getName':
              handleGetName(message);
              break;
          default:
              addMessage('bot', chatFlow.initial.message);
              chatState = 'initial';
      }
  }

  function handleInitialState(message) {
      switch(message) {
          case '1':
              chatState = 'scheduling';
              setTimeout(() => addMessage('bot', chatFlow.scheduling.message), 500);
              break;
          case '2':
              chatState = 'quote';
              setTimeout(() => addMessage('bot', chatFlow.quote.message), 500);
              break;
          case '3':
              chatState = 'services';
              setTimeout(() => addMessage('bot', chatFlow.services.message), 500);
              break;
          case '4':
              setTimeout(() => {
                  addMessage('bot', 'Em breve um atendente entrará em contato. Por favor, informe seu nome:');
                  chatState = 'attendant';
              }, 500);
              break;
          default:
              setTimeout(() => addMessage('bot', 'Por favor, escolha uma opção válida (1-4):\n' + chatFlow.initial.message), 500);
      }
  }

  function handleSchedulingState(message) {
    const services = ['Sofá', 'Colchão', 'Estofados'];
    if (message === '4') {
        chatState = 'initial';
        setTimeout(() => addMessage('bot', chatFlow.initial.message), 500);
    } else if (['1', '2', '3'].includes(message)) {
        const service = services[parseInt(message) - 1];
        customerData.service = service;
        customerData.type = 'Agendamento';
        setTimeout(() => {
            addMessage('bot', `Ótimo! Para agendar a limpeza de ${service}, por favor informe seu nome:`);
            chatState = 'getName';
        }, 500);
    } else {
        setTimeout(() => addMessage('bot', 'Por favor, escolha uma opção válida (1-4):\n' + chatFlow.scheduling.message), 500);
    }
}

  function handleQuoteState(message) {
      const items = ['Sofá', 'Colchão', 'Estofados'];
      if (message === '4') {
          chatState = 'initial';
          setTimeout(() => addMessage('bot', chatFlow.initial.message), 500);
      } else if (['1', '2', '3'].includes(message)) {
          const item = items[parseInt(message) - 1];
          setTimeout(() => {
              addMessage('bot', `Para fornecer um orçamento para ${item}, vou precisar de algumas informações.\nPor favor, informe seu nome:`);
              chatState = 'getName';
          }, 500);
      } else {
          setTimeout(() => addMessage('bot', 'Por favor, escolha uma opção válida (1-4):\n' + chatFlow.quote.message), 500);
      }
  }

  function handleServicesState(message) {
      if (message === '4') {
          chatState = 'initial';
          setTimeout(() => addMessage('bot', chatFlow.initial.message), 500);
      } else if (['1', '2', '3'].includes(message)) {
          const services = [
              'Nossa limpeza de sofá remove manchas, ácaros e revitaliza o tecido. O processo leva aproximadamente 2 horas.',
              'A higienização de colchão elimina ácaros, bactérias e remove manchas, proporcionando mais saúde para seu sono.',
              'Realizamos limpeza especializada em diversos tipos de estofados, sempre com produtos certificados.'
          ];
          setTimeout(() => {
              addMessage('bot', services[parseInt(message) - 1]);
              addMessage('bot', '\nDeseja mais informações?\n1 - Solicitar Orçamento\n2 - Voltar ao Menu Principal');
              chatState = 'moreInfo';
          }, 500);
      } else {
          setTimeout(() => addMessage('bot', 'Por favor, escolha uma opção válida (1-4):\n' + chatFlow.services.message), 500);
      }
  }

  function addMessage(type, content) {
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('message', type);
      messageDiv.textContent = content;
      chatMessages.appendChild(messageDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
  }

// Add this function to handle getName state
function handleGetName(message) {
    customerData.name = message;
    
    const whatsappMessage = `
🔵 Novo Lead +LIMP
Nome: ${customerData.name}
Serviço: ${customerData.service}
Tipo: ${customerData.type}
    `;
    
    const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
    
    setTimeout(() => {
        addMessage('bot', `Ótimo ${customerData.name}! Clique no link abaixo para continuar seu atendimento no WhatsApp:`);
        
        // Create clickable WhatsApp link
        const linkDiv = document.createElement('div');
        linkDiv.classList.add('message', 'bot');
        const link = document.createElement('a');
        link.href = whatsappLink;
        link.target = '_blank';
        link.textContent = '📱 Continuar no WhatsApp';
        link.classList.add('whatsapp-link');
        linkDiv.appendChild(link);
        chatMessages.appendChild(linkDiv);
        
        // Reset chat state
        setTimeout(() => {
            addMessage('bot', 'Posso ajudar em mais alguma coisa?\n' + chatFlow.initial.message);
            chatState = 'initial';
        }, 2000);
    }, 500);
}
// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
    }
});

// Add at the beginning of the file
// Animation on scroll
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Animate elements on scroll
document.addEventListener('DOMContentLoaded', () => {
    // Elements to animate
    const elements = [
        '.hero-content',
        '.service-card',
        '.portfolio-item',
        '.about-content',
        '.contact-content'
    ];

    elements.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            observer.observe(el);
        });
    });

    // Animate services icons on hover
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('i');
            icon.style.animation = 'iconPulse 0.5s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('i');
            icon.style.animation = '';
        });
    });

    // Animate portfolio items
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.05) rotate(1deg)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    });
});

// Enhanced chat messages animation
function addMessage(type, content) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', type);
    messageDiv.textContent = content;
    messageDiv.style.transform = 'translateX(-20px)';
    messageDiv.style.opacity = '0';
    chatMessages.appendChild(messageDiv);

    requestAnimationFrame(() => {
        messageDiv.style.transition = 'all 0.3s ease';
        messageDiv.style.transform = 'translateX(0)';
        messageDiv.style.opacity = '1';
    });

    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Add this to your existing script
const portfolioSlider = new Swiper('.portfolio-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        640: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
    effect: 'coverflow',
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    }
});
