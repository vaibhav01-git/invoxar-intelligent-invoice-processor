// Theme toggle functionality
function setupThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle.querySelector('svg');

  // Check for saved theme or prefer color scheme
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg> Light Mode`;
  } else {
    themeToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg> Dark Mode`;
  }

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');

    if (currentTheme === 'dark') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      themeToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg> Dark Mode`;
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      themeToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg> Light Mode`;
    }
  });
}

// File upload and backend integration
function setupFileUploadAndBackend() {
  const uploadArea = document.getElementById('uploadArea');
  const fileInput = document.getElementById('fileInput');
  const invoicePreview = document.getElementById('invoicePreview');
  const previewPlaceholder = document.getElementById('previewPlaceholder');
  const statusMessage = document.getElementById('statusMessage');
  const statusText = document.getElementById('statusText');
  const progressContainer = document.getElementById('progressContainer');
  const progressBar = document.getElementById('progressBar');
  const progressText = document.getElementById('progressText');
  const dataGrid = document.getElementById('dataGrid');

  let uploadedFilename = null;
  let extractedFields = {};
  // Multi-page PDF support
  let pdfId = null;
  let pdfImages = [];
  let currentPage = 0;

  // Add page navigation for multi-page PDF
  const navBar = document.createElement('div');
  navBar.className = 'pdf-nav-bar';
  const prevBtn = document.createElement('button');
  prevBtn.textContent = 'Prev';
  prevBtn.className = 'pdf-nav-btn';
  const nextBtn = document.createElement('button');
  nextBtn.textContent = 'Next';
  nextBtn.className = 'pdf-nav-btn';
  const pageInfo = document.createElement('span');
  pageInfo.className = 'pdf-page-info';
  navBar.appendChild(prevBtn);
  navBar.appendChild(pageInfo);
  navBar.appendChild(nextBtn);
  document.querySelector('.invoice-preview').appendChild(navBar);
  navBar.style.display = 'none';

  function showPdfPage(pageIdx) {
    if (!pdfImages.length) return;
    currentPage = pageIdx;
    const imgUrl = `/uploads/${pdfId}/${pdfImages[pageIdx]}`;
    invoicePreview.src = imgUrl;
    invoicePreview.classList.remove('hidden');
    previewPlaceholder.classList.add('hidden');
    pageInfo.textContent = `Page ${pageIdx + 1} of ${pdfImages.length}`;
    navBar.style.display = 'flex';
    prevBtn.disabled = (pageIdx === 0);
    nextBtn.disabled = (pageIdx === pdfImages.length - 1);
    // Optionally: trigger extraction for this page
  }
  prevBtn.addEventListener('click', () => {
    if (currentPage > 0) showPdfPage(currentPage - 1);
  });
  nextBtn.addEventListener('click', () => {
    if (currentPage < pdfImages.length - 1) showPdfPage(currentPage + 1);
  });

  // Add Dataset Search, AI Search, Show Boxes buttons
  const searchSection = document.querySelector('.search-section .search-buttons');
  const datasetBtn = document.createElement('button');
  datasetBtn.className = 'search-btn search-btn-primary';
  datasetBtn.innerHTML = 'Dataset Search';
  const aiBtn = document.createElement('button');
  aiBtn.className = 'search-btn search-btn-secondary';
  aiBtn.innerHTML = 'AI Search';
  const showBoxesBtn = document.createElement('button');
  showBoxesBtn.className = 'search-btn search-btn-secondary';
  showBoxesBtn.innerHTML = 'Show Boxes';
  searchSection.appendChild(datasetBtn);
  searchSection.appendChild(aiBtn);
  searchSection.appendChild(showBoxesBtn);

  // Click on upload area triggers file input
  uploadArea.addEventListener('click', (e) => {
    if (e.target !== fileInput) {
      fileInput.click();
    }
  });

  // File input change
  fileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      uploadFileToBackend(e.target.files[0]);
    }
  });

  // Drag and drop functionality
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    uploadArea.addEventListener(eventName, preventDefaults, false);
  });

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  ['dragenter', 'dragover'].forEach(eventName => {
    uploadArea.addEventListener(eventName, () => {
      uploadArea.classList.add('dragover');
    }, false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    uploadArea.addEventListener(eventName, () => {
      uploadArea.classList.remove('dragover');
    }, false);
  });

  uploadArea.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const file = dt.files[0];
    uploadFileToBackend(file);
  });

  function uploadFileToBackend(file) {
    const ext = file.name.split('.').pop().toLowerCase();
    if (!['jpg', 'jpeg', 'png', 'pdf'].includes(ext)) {
      showStatus('Please upload an image or PDF file.', 'error');
      return;
    }
    // Show preview (for images)
    if (ext !== 'pdf') {
      const reader = new FileReader();
      reader.onload = function(e) {
        invoicePreview.src = e.target.result;
        invoicePreview.classList.remove('hidden');
        previewPlaceholder.classList.add('hidden');
        navBar.style.display = 'none';
      };
      reader.readAsDataURL(file);
    }
    showStatus('Uploading invoice...', 'processing');
    progressContainer.classList.remove('hidden');
    progressBar.style.width = '0%';
    progressText.textContent = 'Uploading...';
    const formData = new FormData();
    formData.append('file', file);
    fetch('/upload', {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      if (data.filename) {
        uploadedFilename = data.filename;
        pdfId = null;
        pdfImages = [];
        navBar.style.display = 'none';
        showStatus('File uploaded! Ready for extraction.', 'success');
        progressBar.style.width = '100%';
        progressText.textContent = 'Upload complete!';
      } else if (data.pdf_id) {
        pdfId = data.pdf_id;
        pdfImages = data.images;
        uploadedFilename = pdfImages[0];
        showPdfPage(0);
        showStatus('PDF uploaded! Ready for extraction.', 'success');
        progressBar.style.width = '100%';
        progressText.textContent = 'Upload complete!';
      } else {
        showStatus(data.error || 'Upload failed.', 'error');
        progressContainer.classList.add('hidden');
      }
    })
    .catch(() => {
      showStatus('Upload failed.', 'error');
      progressContainer.classList.add('hidden');
    });
  }

  // Dataset Search
  datasetBtn.addEventListener('click', () => {
    if (!uploadedFilename) return;
    showStatus('Extracting with dataset model...', 'processing');
    fetch('/dataset_search', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({filename: uploadedFilename})
    })
    .then(res => res.json())
    .then(data => {
      if (data.fields) {
        extractedFields = data.fields;
        updateDataGrid(extractedFields);
        showStatus('Extraction complete!', 'success');
      } else {
        showStatus(data.error || 'Extraction failed.', 'error');
      }
    })
    .catch(() => showStatus('Extraction failed.', 'error'));
  });

  // AI Search
  aiBtn.addEventListener('click', () => {
    if (!uploadedFilename) return;
    showStatus('Extracting with Gemini AI...', 'processing');
    fetch('/ai_search', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({filename: uploadedFilename})
    })
    .then(res => res.json())
    .then(data => {
      if (data.fields) {
        extractedFields = data.fields;
        updateDataGrid(extractedFields);
        showStatus('AI extraction complete!', 'success');
      } else {
        showStatus(data.error || 'AI extraction failed.', 'error');
      }
    })
    .catch(() => showStatus('AI extraction failed.', 'error'));
  });

  // Show Boxes
  showBoxesBtn.addEventListener('click', () => {
    if (!uploadedFilename) return;
    showStatus('Fetching bounding boxes...', 'processing');
    fetch('/show_boxes', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({filename: uploadedFilename})
    })
    .then(response => {
      if (!response.ok) throw new Error('Failed to fetch image');
      return response.blob();
    })
    .then(blob => {
      const url = URL.createObjectURL(blob);
      invoicePreview.src = url;
      invoicePreview.classList.remove('hidden');
      previewPlaceholder.classList.add('hidden');
      showStatus('Bounding boxes shown!', 'success');
    })
    .catch(() => showStatus('Failed to show boxes.', 'error'));
  });

  // AI Assistant logic
  const aiInput = document.getElementById('aiInput');
  const askAiBtn = document.getElementById('askAiBtn');
  const searchDataBtn = document.getElementById('searchDataBtn');
  const aiResponse = document.getElementById('aiResponse');
  const confidenceBadge = document.getElementById('confidenceBadge');

  // Multi-turn chat for AI Assistant
  let chatHistory = [];
  let sessionId = localStorage.getItem('ai_session_id') || (Date.now() + '-' + Math.random().toString(36).slice(2));
  localStorage.setItem('ai_session_id', sessionId);
  const aiChatContainer = document.createElement('div');
  aiChatContainer.className = 'ai-chat-history flex flex-col gap-2 mt-4';
  aiResponse.parentNode.insertBefore(aiChatContainer, aiResponse.nextSibling);

  function renderChatHistory() {
    aiChatContainer.innerHTML = '';
    chatHistory.forEach(turn => {
      const userBubble = document.createElement('div');
      userBubble.className = 'self-end bg-primary text-white px-4 py-2 rounded-lg max-w-[70%] mb-1';
      userBubble.textContent = turn.user;
      aiChatContainer.appendChild(userBubble);
      const aiBubble = document.createElement('div');
      aiBubble.className = 'self-start bg-gray-200 dark:bg-darkbg text-gray-900 dark:text-gray-100 px-4 py-2 rounded-lg max-w-[70%] mb-2';
      aiBubble.textContent = turn.ai;
      aiChatContainer.appendChild(aiBubble);
    });
    aiChatContainer.scrollTop = aiChatContainer.scrollHeight;
  }

  askAiBtn.addEventListener('click', () => {
    if (!uploadedFilename && !pdfId) return;
    const question = aiInput.value.trim();
    if (!question) return;
    aiResponse.textContent = 'Thinking...';
    // Add user turn to chat history
    chatHistory.push({user: question, ai: ''});
    renderChatHistory();
    fetch('/ai_chat', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        session_id: sessionId,
        filename: uploadedFilename,
        pdf_id: pdfId,
        query: question,
        chat_history: chatHistory.slice(0, -1) // exclude current turn
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.response) {
        chatHistory[chatHistory.length - 1].ai = data.response;
        renderChatHistory();
        aiResponse.textContent = data.response;
        if (data.confidence) {
          confidenceBadge.textContent = `${(data.confidence * 100).toFixed(1)}% Confidence`;
          confidenceBadge.classList.remove('hidden');
        } else {
          confidenceBadge.classList.add('hidden');
        }
      } else {
        aiResponse.textContent = data.error || 'No answer.';
        confidenceBadge.classList.add('hidden');
      }
    })
    .catch(() => {
      aiResponse.textContent = 'AI Assistant failed.';
      confidenceBadge.classList.add('hidden');
    });
    aiInput.value = '';
  });

  searchDataBtn.addEventListener('click', () => {
    const query = aiInput.value.trim().toLowerCase();
    if (!query) return;
    // Highlight matching fields
    const cards = dataGrid.querySelectorAll('.data-card');
    cards.forEach(card => {
      const label = card.querySelector('.data-label').textContent.toLowerCase();
      const value = card.querySelector('.data-value').value.toLowerCase();
      if (label.includes(query) || value.includes(query)) {
        card.style.background = '#e0e7ff';
        card.style.color = '#1a1d23';
      } else {
        card.style.background = '';
        card.style.color = '';
      }
    });
  });

  function showStatus(message, type) {
    statusMessage.classList.remove('hidden');
    statusText.textContent = message;
    statusMessage.className = 'status-message';
    statusMessage.classList.add(`status-${type}`);
  }

  function updateDataGrid(fields) {
    dataGrid.innerHTML = '';
    Object.entries(fields).forEach(([key, value]) => {
      const card = document.createElement('div');
      card.className = 'data-card';
      const label = document.createElement('div');
      label.className = 'data-label';
      label.textContent = key;
      const input = document.createElement('input');
      input.className = 'data-value';
      input.value = value;
      input.addEventListener('change', e => {
        extractedFields[key] = e.target.value;
      });
      card.appendChild(label);
      card.appendChild(input);
      dataGrid.appendChild(card);
    });
  }

  // Export buttons logic
  function getCurrentFields() {
    // Gather current field values from the data grid
    const fields = {};
    const cards = dataGrid.querySelectorAll('.data-card');
    cards.forEach(card => {
      const label = card.querySelector('.data-label').textContent;
      const value = card.querySelector('.data-value').value;
      fields[label] = value;
    });
    return fields;
  }

  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  }

  // JSON
  document.getElementById('exportJsonBtn').addEventListener('click', () => {
    const data = getCurrentFields();
    const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
    downloadBlob(blob, 'invoice_data.json');
  });

  // TXT
  document.getElementById('exportTxtBtn').addEventListener('click', () => {
    const data = getCurrentFields();
    const txt = Object.entries(data).map(([k, v]) => `${k}: ${v}`).join('\n');
    const blob = new Blob([txt], {type: 'text/plain'});
    downloadBlob(blob, 'invoice_data.txt');
  });

  // CSV
  document.getElementById('exportCsvBtn').addEventListener('click', () => {
    const data = getCurrentFields();
    const csv = Object.keys(data).join(',') + '\n' + Object.values(data).join(',');
    const blob = new Blob([csv], {type: 'text/csv'});
    downloadBlob(blob, 'invoice_data.csv');
  });

  // YAML
  document.getElementById('exportYamlBtn').addEventListener('click', () => {
    const data = getCurrentFields();
    const yaml = Object.entries(data).map(([k, v]) => `${k}: ${v}`).join('\n');
    const blob = new Blob([yaml], {type: 'text/yaml'});
    downloadBlob(blob, 'invoice_data.yaml');
  });

  // XML
  document.getElementById('exportXmlBtn').addEventListener('click', () => {
    const data = getCurrentFields();
    let xml = '<invoice>\n';
    for (const [k, v] of Object.entries(data)) {
      xml += `  <${k.replace(/\s+/g, '_')}>${v}</${k.replace(/\s+/g, '_')}>\n`;
    }
    xml += '</invoice>';
    const blob = new Blob([xml], {type: 'application/xml'});
    downloadBlob(blob, 'invoice_data.xml');
  });

  // PDF and DOCX (call backend to generate and download)
  document.getElementById('exportPdfBtn').addEventListener('click', () => {
    const data = getCurrentFields();
    fetch('/export', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({fields: data, format: 'pdf'})
    })
    .then(res => res.blob())
    .then(blob => downloadBlob(blob, 'invoice_data.pdf'));
  });
  document.getElementById('exportDocxBtn').addEventListener('click', () => {
    const data = getCurrentFields();
    fetch('/export', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({fields: data, format: 'docx'})
    })
    .then(res => res.blob())
    .then(blob => downloadBlob(blob, 'invoice_data.docx'));
  });

  // Table extraction UI
  const tableSection = document.createElement('section');
  tableSection.className = 'extracted-tables bg-white dark:bg-secondary rounded-2xl shadow p-6 mt-8';
  tableSection.innerHTML = `
    <h3 class="text-lg font-semibold mb-4">Extracted Tables</h3>
    <div id="tablesGrid"></div>
    <div class="flex gap-3 mt-4">
      <button id="extractTablesBtn" class="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 transition">Extract Tables (Current Page)</button>
      <button id="extractTablesAllBtn" class="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 transition">Extract Tables (All Pages)</button>
      <button id="exportTablesCsvBtn" class="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 transition">Export Tables CSV</button>
    </div>
  `;
  document.querySelector('main').appendChild(tableSection);
  const tablesGrid = tableSection.querySelector('#tablesGrid');
  const extractTablesBtn = tableSection.querySelector('#extractTablesBtn');
  const extractTablesAllBtn = tableSection.querySelector('#extractTablesAllBtn');
  const exportTablesCsvBtn = tableSection.querySelector('#exportTablesCsvBtn');
  let currentTables = [];

  function renderTables(tables) {
    tablesGrid.innerHTML = '';
    if (!tables || tables.length === 0) {
      tablesGrid.innerHTML = '<div class="text-gray-400">No tables found.</div>';
      return;
    }
    tables.forEach((table, idx) => {
      const tableEl = document.createElement('table');
      tableEl.className = 'min-w-full border border-gray-300 dark:border-gray-700 mb-6';
      table.forEach((row, rIdx) => {
        const tr = document.createElement('tr');
        row.forEach((cell, cIdx) => {
          const cellEl = document.createElement(rIdx === 0 ? 'th' : 'td');
          cellEl.className = 'border border-gray-300 dark:border-gray-700 px-2 py-1';
          cellEl.contentEditable = rIdx !== 0;
          cellEl.textContent = cell;
          cellEl.addEventListener('input', e => {
            currentTables[idx][rIdx][cIdx] = e.target.textContent;
          });
          tr.appendChild(cellEl);
        });
        tableEl.appendChild(tr);
      });
      tablesGrid.appendChild(tableEl);
    });
  }

  extractTablesBtn.addEventListener('click', () => {
    if (!pdfId || pdfImages.length === 0) return;
    fetch('/extract_tables_pdf_page', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({pdf_id: pdfId, page: currentPage})
    })
    .then(res => res.json())
    .then(data => {
      currentTables = data.tables || [];
      renderTables(currentTables);
    });
  });

  extractTablesAllBtn.addEventListener('click', () => {
    if (!pdfId) return;
    fetch('/extract_tables_pdf_all', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({pdf_id: pdfId})
    })
    .then(res => res.json())
    .then(data => {
      // Flatten all tables from all pages
      currentTables = [];
      (data.pages || []).forEach(page => {
        (page.tables || []).forEach(table => currentTables.push(table));
      });
      renderTables(currentTables);
    });
  });

  exportTablesCsvBtn.addEventListener('click', () => {
    if (!currentTables.length) return;
    let csv = '';
    currentTables.forEach(table => {
      table.forEach(row => {
        csv += row.map(cell => '"' + (cell || '').replace(/"/g, '""') + '"').join(',') + '\n';
      });
      csv += '\n';
    });
    const blob = new Blob([csv], {type: 'text/csv'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'invoice_tables.csv';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  });

  // Summarization and Fraud Detection UI
  const summarySection = document.createElement('section');
  summarySection.className = 'summary-fraud-section bg-white dark:bg-secondary rounded-2xl shadow p-6 mt-8';
  summarySection.innerHTML = `
    <div class="flex gap-3 mb-4">
      <button id="summarizeBtn" class="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 transition">Summarize Invoice</button>
      <button id="fraudBtn" class="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 transition">Detect Fraud</button>
    </div>
    <div id="summaryResult" class="mb-4 text-base"></div>
    <div id="fraudResult"></div>
  `;
  document.querySelector('main').appendChild(summarySection);
  const summarizeBtn = summarySection.querySelector('#summarizeBtn');
  const fraudBtn = summarySection.querySelector('#fraudBtn');
  const summaryResult = summarySection.querySelector('#summaryResult');
  const fraudResult = summarySection.querySelector('#fraudResult');

  summarizeBtn.addEventListener('click', () => {
    const fields = getCurrentFields();
    fetch('/summarize_invoice', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({fields})
    })
    .then(res => res.json())
    .then(data => {
      summaryResult.innerHTML = `<div class="bg-blue-50 dark:bg-darkbg border-l-4 border-primary p-4 rounded">${data.summary || 'No summary available.'}</div>`;
    });
  });

  fraudBtn.addEventListener('click', () => {
    const fields = getCurrentFields();
    fetch('/detect_fraud', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({fields})
    })
    .then(res => res.json())
    .then(data => {
      if (data.is_fraud) {
        fraudResult.innerHTML = `<div class="bg-red-50 dark:bg-darkbg border-l-4 border-red-500 p-4 rounded text-red-700 dark:text-red-400 font-semibold">⚠️ Fraud/Anomaly Detected:<br>${(data.flags || []).join('<br>')}</div>`;
      } else {
        fraudResult.innerHTML = `<div class="bg-green-50 dark:bg-darkbg border-l-4 border-green-500 p-4 rounded text-green-700 dark:text-green-400 font-semibold">No fraud or anomaly detected.</div>`;
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupThemeToggle();
  setupFileUploadAndBackend();
}); 