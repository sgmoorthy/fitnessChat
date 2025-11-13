// Simple chat UI integrated with serverless RAG API

let equipmentDatabase = {};
let conversationHistory = [];

async function loadCatalog() {
  try {
    const response = await fetch('./catalog.json');
    equipmentDatabase = await response.json();
  } catch (error) {
    console.warn('Catalog load skipped:', error);
  }
}

function addMessage(text, isUser = false, htmlContent = null) {
  const messagesContainer = document.getElementById('chatMessages');
  const messageDiv = document.createElement('div');
  messageDiv.className = isUser ? 'message user' : 'message bot';

  const avatar = document.createElement('div');
  avatar.className = 'message-avatar';
  avatar.textContent = isUser ? 'U' : 'EF';

  const contentDiv = document.createElement('div');
  contentDiv.className = 'message-content';

  if (htmlContent) {
    contentDiv.innerHTML = htmlContent;
  } else {
    const textDiv = document.createElement('div');
    textDiv.className = 'message-text';
    textDiv.textContent = text;
    contentDiv.appendChild(textDiv);
  }

  messageDiv.appendChild(avatar);
  messageDiv.appendChild(contentDiv);
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function addBotMessage(text, htmlContent = null) {
  addMessage(text, false, htmlContent);
}

function addUserMessage(text) {
  addMessage(text, true);
}

function showTypingIndicator() {
  const messagesContainer = document.getElementById('chatMessages');
  const typingDiv = document.createElement('div');
  typingDiv.className = 'message bot';
  typingDiv.id = 'typingIndicator';

  const avatar = document.createElement('div');
  avatar.className = 'message-avatar';
  avatar.textContent = 'EF';

  const contentDiv = document.createElement('div');
  contentDiv.className = 'message-content';
  contentDiv.innerHTML = '<div class="typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>';

  typingDiv.appendChild(avatar);
  typingDiv.appendChild(contentDiv);
  messagesContainer.appendChild(typingDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function removeTypingIndicator() {
  const typingIndicator = document.getElementById('typingIndicator');
  if (typingIndicator) typingIndicator.remove();
}

function initializeChat() {
  addBotMessage(
    'Welcome to Energy Fitness Equipment Catalog Assistant!\n\nI answer using official PDFs when available. Ask about products, specs, or comparisons.'
  );
}

function defaultHelp() {
  return 'I can help you browse equipment by category, list products by brand, compare models, and show specs from official PDFs. Try asking: "Compare Mi6 vs Mi7" or "Show FreeMotion treadmills".';
}

async function sendMessage() {
  const input = document.getElementById('chatInput');
  const message = input.value.trim();
  if (!message) return;

  addUserMessage(message);
  input.value = '';
  showTypingIndicator();

  // Add to history
  conversationHistory.push({ role: 'user', message });

  // Try server-side RAG chat first
  try {
    const resp = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: message, history: conversationHistory })
    });
    removeTypingIndicator();
    if (resp.ok) {
      const data = await resp.json();
      const { answer, sources } = data || {};
      let html = '';
      if (sources && Array.isArray(sources) && sources.length > 0) {
        html += '<div style="margin-bottom: 12px;"><strong>Answer</strong></div>' +
                '<div class="message-text">' + (answer || '') + '</div>' +
                '<div style="margin-top: 12px;"><strong>Sources</strong><ul class="feature-list">';
        sources.forEach((s) => {
          const href = s.source ? s.source : (s.url || '#');
          const label = s.title || s.source || s.url || 'Source';
          html += '<li><a href="' + href + '" target="_blank">' + label + '</a></li>';
        });
        html += '</ul></div>';
      } else {
        html = answer || '';
      }
      if (html && html.includes('<')) {
        addBotMessage('', html);
      } else {
        addBotMessage(html || '');
      }
      return;
    }
  } catch (err) {
    // fall back to client-side processing
  }

  // Fallback: simple help
  setTimeout(() => {
    removeTypingIndicator();
    addBotMessage(defaultHelp());
  }, 500);
}

function handleQuickAction(action) {
  const input = document.getElementById('chatInput');
  input.value = action;
  sendMessage();
}

document.addEventListener('DOMContentLoaded', async () => {
  const inputEl = document.getElementById('chatInput');
  if (inputEl) {
    inputEl.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMessage();
    });
  }
  await loadCatalog();
  initializeChat();
});