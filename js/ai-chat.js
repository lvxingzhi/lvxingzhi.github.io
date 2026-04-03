// AI 聊天助手
(function() {
  'use strict';
  
  // 配置
  const CONFIG = {
    apiEndpoint: '', // 待配置 API 端点
    apiKey: '', // 待配置 API Key
    model: 'gpt-3.5-turbo',
    welcomeMessage: '你好！我是 AI 助手，有什么可以帮你的吗？',
    quickQuestions: [
      '介绍一下这个博客',
      '有哪些技术文章？',
      '设计模式系列在哪？',
      '如何联系作者？'
    ]
  };
  
  let chatHistory = [];
  let isTyping = false;
  
  function init() {
    createChatUI();
    bindEvents();
    loadHistory();
    showWelcomeMessage();
  }
  
  function createChatUI() {
    const chatHTML = `
      <div id="ai-chat-widget">
        <i class="fas fa-robot"></i>
      </div>
      
      <div id="ai-chat-container">
        <div id="ai-chat-header">
          <div id="ai-chat-header-title">
            <i class="fas fa-robot"></i>
            <span>AI 助手</span>
          </div>
          <div id="ai-chat-close">×</div>
        </div>
        
        <div id="ai-chat-messages"></div>
        
        <div id="ai-chat-input-area">
          <input type="text" id="ai-chat-input" placeholder="输入消息..." />
          <button id="ai-chat-send">
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', chatHTML);
  }
  
  function bindEvents() {
    const widget = document.getElementById('ai-chat-widget');
    const closeBtn = document.getElementById('ai-chat-close');
    const input = document.getElementById('ai-chat-input');
    const sendBtn = document.getElementById('ai-chat-send');
    
    widget.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);
    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
  }
  
  function toggleChat() {
    const container = document.getElementById('ai-chat-container');
    container.classList.toggle('show');
    
    if (container.classList.contains('show')) {
      document.getElementById('ai-chat-input').focus();
    }
  }
  
  function showWelcomeMessage() {
    addMessage('ai', CONFIG.welcomeMessage);
    showQuickQuestions();
  }
  
  function showQuickQuestions() {
    const messagesDiv = document.getElementById('ai-chat-messages');
    const questionsHTML = `
      <div class="ai-quick-questions">
        ${CONFIG.quickQuestions.map(q => `
          <div class="ai-quick-question" onclick="window.aiChat.askQuestion('${q}')">${q}</div>
        `).join('')}
      </div>
    `;
    messagesDiv.insertAdjacentHTML('beforeend', questionsHTML);
    scrollToBottom();
  }
  
  function addMessage(type, content) {
    const messagesDiv = document.getElementById('ai-chat-messages');
    const messageHTML = `
      <div class="ai-message ${type}">
        <div class="ai-message-avatar">
          <i class="fas fa-${type === 'user' ? 'user' : 'robot'}"></i>
        </div>
        <div class="ai-message-content">${escapeHtml(content)}</div>
      </div>
    `;
    
    messagesDiv.insertAdjacentHTML('beforeend', messageHTML);
    scrollToBottom();
    
    chatHistory.push({ role: type === 'user' ? 'user' : 'assistant', content });
    saveHistory();
  }
  
  function showTyping() {
    const messagesDiv = document.getElementById('ai-chat-messages');
    const typingHTML = `
      <div class="ai-message ai" id="ai-typing-indicator">
        <div class="ai-message-avatar">
          <i class="fas fa-robot"></i>
        </div>
        <div class="ai-message-content">
          <div class="ai-typing">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    `;
    messagesDiv.insertAdjacentHTML('beforeend', typingHTML);
    scrollToBottom();
  }
  
  function hideTyping() {
    const typingIndicator = document.getElementById('ai-typing-indicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }
  
  async function sendMessage() {
    const input = document.getElementById('ai-chat-input');
    const sendBtn = document.getElementById('ai-chat-send');
    const message = input.value.trim();
    
    if (!message || isTyping) return;
    
    addMessage('user', message);
    input.value = '';
    
    isTyping = true;
    sendBtn.disabled = true;
    input.disabled = true;
    
    showTyping();
    
    try {
      const response = await callAI(message);
      hideTyping();
      addMessage('ai', response);
    } catch (error) {
      hideTyping();
      addMessage('ai', '抱歉，我遇到了一些问题。请稍后再试。');
      console.error('AI Error:', error);
    } finally {
      isTyping = false;
      sendBtn.disabled = false;
      input.disabled = false;
      input.focus();
    }
  }
  
  async function callAI(message) {
    if (!CONFIG.apiEndpoint || !CONFIG.apiKey) {
      return getDemoResponse(message);
    }
    
    const response = await fetch(CONFIG.apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CONFIG.apiKey}`
      },
      body: JSON.stringify({
        model: CONFIG.model,
        messages: [
          { role: 'system', content: '你是一个友好的博客助手，帮助访客了解博客内容。' },
          ...chatHistory.slice(-10),
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });
    
    const data = await response.json();
    return data.choices[0].message.content;
  }
  
  function getDemoResponse(message) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const responses = {
          '介绍一下这个博客': '这是 LXZ 的技术博客，主要分享设计模式、Java 技术栈、前端开发等内容。博客包含 55+ 篇原创技术文章，涵盖设计模式系列、技术笔记和项目实践经验。',
          '有哪些技术文章？': '博客主要包含：\n1. 设计模式系列（21篇）\n2. Java 技术栈文章\n3. 前端开发（ES6、Vue等）\n4. 数据库与中间件（MongoDB、Redis等）\n5. 项目架构设计方案',
          '设计模式系列在哪？': '设计模式系列文章可以在"分类"或"标签"中找到，包含工厂模式、单例模式、观察者模式等 21 种设计模式的详细讲解和代码示例。',
          '如何联系作者？': '你可以通过以下方式联系作者：\n📧 Email: 349024548@qq.com\n💻 GitHub: github.com/lvxingzhi'
        };
        
        const response = responses[message] || `你问的是："${message}"。这是一个演示响应。要启用真实 AI 功能，请配置 API Key。\n\n你可以尝试问：\n- 介绍一下这个博客\n- 有哪些技术文章？\n- 设计模式系列在哪？`;
        
        resolve(response);
      }, 1000 + Math.random() * 1000);
    });
  }
  
  function askQuestion(question) {
    document.getElementById('ai-chat-input').value = question;
    sendMessage();
  }
  
  function scrollToBottom() {
    const messagesDiv = document.getElementById('ai-chat-messages');
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }
  
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML.replace(/\n/g, '<br>');
  }
  
  function saveHistory() {
    try {
      localStorage.setItem('ai-chat-history', JSON.stringify(chatHistory));
    } catch (e) {
      console.warn('Failed to save chat history:', e);
    }
  }
  
  function loadHistory() {
    try {
      const saved = localStorage.getItem('ai-chat-history');
      if (saved) {
        chatHistory = JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load chat history:', e);
    }
  }
  
  window.aiChat = {
    askQuestion,
    clearHistory: () => {
      chatHistory = [];
      localStorage.removeItem('ai-chat-history');
      document.getElementById('ai-chat-messages').innerHTML = '';
      showWelcomeMessage();
    }
  };
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
