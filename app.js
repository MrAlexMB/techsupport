// TechSupport Pro JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.querySelector('.nav__menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            // Close mobile menu if open
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        });
    });

    // Hero CTA buttons
    const getSupportBtn = document.getElementById('get-support');
    const viewServicesBtn = document.getElementById('view-services');
    
    if (getSupportBtn) {
        getSupportBtn.addEventListener('click', function() {
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }
    
    if (viewServicesBtn) {
        viewServicesBtn.addEventListener('click', function() {
            const servicesSection = document.querySelector('#services');
            if (servicesSection) {
                servicesSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }

    // Service card buttons
    const serviceButtons = document.querySelectorAll('.service-card__btn');
    serviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const service = this.getAttribute('data-service');
            showServiceModal(service);
        });
    });

    // Portfolio filtering
    const portfolioFilters = document.querySelectorAll('.portfolio__filter');
    const portfolioItems = document.querySelectorAll('.portfolio__item');

    portfolioFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Update active filter
            portfolioFilters.forEach(f => f.classList.remove('portfolio__filter--active'));
            this.classList.add('portfolio__filter--active');
            
            // Filter items
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // Contact form
    const contactForm = document.querySelector('.contact__form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactForm();
        });
    }

    // Chat widgets - Fixed implementation
    const telegramChatBtn = document.getElementById('telegram-chat');
    const aiChatBtn = document.getElementById('ai-chat');
    const modalOverlay = document.getElementById('modal-overlay');

    console.log('Telegram chat button:', telegramChatBtn);
    console.log('AI chat button:', aiChatBtn);

    if (telegramChatBtn) {
        telegramChatBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Telegram chat clicked');
            openModal('telegram-modal');
        });
    }

    if (aiChatBtn) {
        aiChatBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('AI chat clicked');
            openModal('ai-modal');
        });
    }

    // Modal close buttons
    const closeButtons = document.querySelectorAll('.chat-modal__close');
    closeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const modalId = this.getAttribute('data-modal');
            closeModal(modalId);
        });
    });

    // Overlay click to close
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function() {
            closeAllModals();
        });
    }

    // Telegram bot quick replies
    const quickReplies = document.querySelectorAll('.quick-reply');
    quickReplies.forEach(reply => {
        reply.addEventListener('click', function(e) {
            e.preventDefault();
            const replyText = this.getAttribute('data-reply');
            handleTelegramReply(replyText);
        });
    });

    // AI chat input - Fixed implementation
    const aiInput = document.getElementById('ai-input');
    const aiSendBtn = document.getElementById('ai-send');

    if (aiSendBtn) {
        aiSendBtn.addEventListener('click', function(e) {
            e.preventDefault();
            sendAiMessage();
        });
    }

    if (aiInput) {
        aiInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendAiMessage();
            }
        });
    }

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(var(--color-surface-rgb, 255, 255, 255), 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = 'var(--color-surface)';
                header.style.backdropFilter = 'none';
            }
        }
    });

    // Initialize animations
    animateOnScroll();
});

// Chat bot responses data
const chatbotData = {
    telegram: {
        greeting: "👋 Привет! Я бот поддержки. Как могу вам помочь сегодня?",
        responses: {
            "Техническая поддержка": "🛠️ Наша техническая поддержка включает:\n• Помощь 24/7\n• Удаленная поддержка\n• Обслуживание систем\n• Диагностика проблем\n• Обновления безопасности\n\nНужна срочная помощь? Звоните +7 (495) 123-45-67",
            "Веб-разработка": "🌐 Услуги веб-разработки:\n• Сайты под ключ\n• Адаптивный дизайн\n• Интеграция с CMS\n• E-commerce решения\n\nОбычные сроки проекта: 2-4 недели",
            "Создание ботов": "🤖 Разработка Telegram-ботов:\n• ИИ-боты\n• Автоматизация бизнеса\n• Интеграция с API\n• Пользовательский функционал\n\nОт 30,000 рублей",
            "Цены": "💰 Наши цены:\n• Техническая поддержка: от 3,500₽/месяц\n• Разработка сайтов: от 70,000₽\n• Telegram-боты: от 30,000₽\n\nСвяжитесь с нами для подробного расчета!",
            "Контакты": "📞 Контактная информация:\nТелефон: +7 (495) 123-45-67\nEmail: info@techsupportpro.ru\n\nЧасы работы:\nПн-Пт: 9:00-21:00\nСб-Вс: 10:00-18:00"
        }
    },
    ai: {
        greeting: "Привет! Я ваш ИИ помощник. Задавайте вопросы о наших услугах или получите мгновенную помощь!",
        responses: {
            services: "Мы предлагаем три основные услуги: Техническая поддержка (круглосуточная помощь и обслуживание), Веб-разработка (сайты под ключ и приложения) и Создание Telegram-ботов (ИИ-решения для автоматизации). О чем хотели бы узнать подробнее?",
            pricing: "Наши цены варьируются в зависимости от услуги: Техническая поддержка от 3,500₽/месяц, Веб-разработка от 70,000₽ за проект, Telegram-боты от 30,000₽. Мы предлагаем индивидуальные расценки в зависимости от ваших требований.",
            support: "Наша техническая поддержка включает удаленную помощь, обслуживание систем, диагностику неисправностей, обновления безопасности и экстренное реагирование. Мы доступны 24/7 со средним временем ответа менее 30 минут.",
            development: "Процесс веб-разработки включает консультацию, дизайн, разработку, тестирование и запуск. Мы используем современные технологии и обеспечиваем адаптивный дизайн для всех устройств. Обычные сроки 2-4 недели в зависимости от сложности.",
            bots: "Мы создаем интеллектуальных Telegram-ботов с интеграцией ИИ, пользовательской бизнес-логикой, подключением к API и возможностями автоматизации. Идеально для поддержки клиентов, генерации лидов и автоматизации бизнес-процессов.",
            contact: "Вы можете связаться с нами по телефону +7 (495) 123-45-67 или email info@techsupportpro.ru. Наши рабочие часы: Пн-Пт 9:00-21:00, Сб-Вс 10:00-18:00. Мы находимся в Москве.",
            default: "Я могу помочь вам с информацией о нашей технической поддержке, веб-разработке и услугах создания Telegram-ботов. Какие у вас конкретные вопросы?"
        }
    }
};

// Modal functions - Fixed implementation
function openModal(modalId) {
    console.log('Opening modal:', modalId);
    const modal = document.getElementById(modalId);
    const overlay = document.getElementById('modal-overlay');
    
    if (modal && overlay) {
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
        console.log('Modal opened successfully');
        
        // Focus on input if it's AI modal
        if (modalId === 'ai-modal') {
            setTimeout(() => {
                const aiInput = document.getElementById('ai-input');
                if (aiInput) {
                    aiInput.focus();
                }
            }, 100);
        }
    } else {
        console.error('Modal or overlay not found:', { modal, overlay });
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    const overlay = document.getElementById('modal-overlay');
    
    if (modal && overlay) {
        modal.classList.add('hidden');
        overlay.classList.add('hidden');
    }
}

function closeAllModals() {
    const modals = document.querySelectorAll('.chat-modal');
    const overlay = document.getElementById('modal-overlay');
    
    modals.forEach(modal => {
        modal.classList.add('hidden');
    });
    
    if (overlay) {
        overlay.classList.add('hidden');
    }
}

// Service modal function
function showServiceModal(service) {
    const serviceInfo = {
        support: {
            title: "Техническая поддержка",
            content: "Круглосуточная техническая поддержка, диагностика неисправностей, обслуживание систем и IT-консультации для бизнеса любого масштаба."
        },
        web: {
            title: "Веб-разработка", 
            content: "Разработка сайтов под ключ, адаптивный дизайн, интеграция с CMS и создание современных веб-приложений."
        },
        bots: {
            title: "Telegram-боты",
            content: "ИИ-боты для Telegram, решения для автоматизации и пользовательские интеграции для бизнес-процессов."
        }
    };

    if (serviceInfo[service]) {
        alert(`${serviceInfo[service].title}\n\n${serviceInfo[service].content}\n\nСвяжитесь с нами для получения подробной консультации!`);
    }
}

// Telegram chat functions
function handleTelegramReply(replyText) {
    const messagesContainer = document.getElementById('telegram-messages');
    
    if (!messagesContainer) return;
    
    // Add user message
    addMessage(messagesContainer, replyText, 'user');
    
    // Add bot response after delay
    setTimeout(() => {
        const response = chatbotData.telegram.responses[replyText] || "Извините, я не понял ваш запрос. Выберите один из предложенных вариантов.";
        addMessage(messagesContainer, response, 'bot');
    }, 1000);
}

// AI chat functions - Fixed implementation
function sendAiMessage() {
    const input = document.getElementById('ai-input');
    const messagesContainer = document.getElementById('ai-messages');
    
    if (!input || !messagesContainer) {
        console.error('AI input or messages container not found');
        return;
    }
    
    const message = input.value.trim();
    
    if (!message) return;
    
    console.log('Sending AI message:', message);
    
    // Add user message
    addMessage(messagesContainer, message, 'user');
    input.value = '';
    
    // Add typing indicator
    addTypingIndicator(messagesContainer);
    
    // Generate AI response after delay
    setTimeout(() => {
        removeTypingIndicator(messagesContainer);
        const response = generateAiResponse(message);
        addMessage(messagesContainer, response, 'bot');
    }, 1500);
}

function generateAiResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('услуги') || lowerMessage.includes('сервис') || lowerMessage.includes('что вы делаете')) {
        return chatbotData.ai.responses.services;
    }
    
    if (lowerMessage.includes('цена') || lowerMessage.includes('стоимость') || lowerMessage.includes('сколько')) {
        return chatbotData.ai.responses.pricing;
    }
    
    if (lowerMessage.includes('поддержка') || lowerMessage.includes('помощь') || lowerMessage.includes('техническая')) {
        return chatbotData.ai.responses.support;
    }
    
    if (lowerMessage.includes('сайт') || lowerMessage.includes('разработка') || lowerMessage.includes('веб')) {
        return chatbotData.ai.responses.development;
    }
    
    if (lowerMessage.includes('бот') || lowerMessage.includes('telegram') || lowerMessage.includes('автоматизация')) {
        return chatbotData.ai.responses.bots;
    }
    
    if (lowerMessage.includes('контакт') || lowerMessage.includes('телефон') || lowerMessage.includes('связаться')) {
        return chatbotData.ai.responses.contact;
    }
    
    return chatbotData.ai.responses.default;
}

// Message functions - Enhanced implementation
function addMessage(container, text, type) {
    if (!container) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message chat-message--${type}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'chat-message__content';
    contentDiv.textContent = text;
    
    messageDiv.appendChild(contentDiv);
    container.appendChild(messageDiv);
    
    // Scroll to bottom
    container.scrollTop = container.scrollHeight;
}

function addTypingIndicator(container) {
    if (!container) return;
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message chat-message--bot typing-message';
    typingDiv.innerHTML = '<div class="chat-message__content typing-indicator">Печатает...</div>';
    
    container.appendChild(typingDiv);
    container.scrollTop = container.scrollHeight;
}

function removeTypingIndicator(container) {
    if (!container) return;
    
    const typingMessage = container.querySelector('.typing-message');
    if (typingMessage) {
        typingMessage.remove();
    }
}

// Contact form function
function handleContactForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Пожалуйста, заполните все обязательные поля.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Пожалуйста, введите корректный email адрес.');
        return;
    }
    
    // Simulate form submission
    alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
    
    // Reset form
    const form = document.querySelector('.contact__form');
    if (form) {
        form.reset();
    }
}

// Smooth animations on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .feature, .portfolio__card, .testimonial');
    
    if (!window.IntersectionObserver) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}