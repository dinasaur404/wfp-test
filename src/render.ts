// Copyright (c) 2022 Cloudflare, Inc.
// Licensed under the APACHE LICENSE, VERSION 2.0 license found in the LICENSE file or at http://www.apache.org/licenses/LICENSE-2.0

import { ResourceValues } from './types';

function ResourceValueToString(value: ResourceValues) {
  return value?.toString() ?? 'null';
}

export function BuildTable(name: string, dataRows: Record<string, string | number | boolean | null>[] | undefined): string {
  const container = (value: ResourceValues) => `<div class="dataContainer"><h3>${name}</h3>${ResourceValueToString(value)}</div>`;
  if (!dataRows?.length) {
    return container('no data');
  }
  const columns = Object.keys(dataRows[0]);
  const makeColumnsHead = (values: ResourceValues[]) => values.map((value) => `<th>${ResourceValueToString(value)}</th>`).join('');
  const makeColumnsData = (values: ResourceValues[]) => values.map((value) => `<td>${ResourceValueToString(value)}</td>`).join('');
  const makeRow = (value: ResourceValues) => `<tr>${ResourceValueToString(value)}</tr>`;
  const table = `<table class="dataTable">${[
    makeRow(makeColumnsHead(columns)),
    dataRows.map((value) => makeRow(makeColumnsData(Object.values(value)))).join(''),
  ].join('')}</table>`;
  return container(table);
}

export const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

:root {
  --background: oklch(95.38% 0.0357 72.89);
  --secondary-background: oklch(100% 0 0);
  --foreground: oklch(0% 0 0);
  --main-foreground: oklch(0% 0 0);
  --main: oklch(72.27% 0.1894 50.19);
  --border: oklch(0% 0 0);
  --ring: oklch(0% 0 0);
  --overlay: oklch(0% 0 0 / 0.8);
  --shadow: 4px 4px 0px 0px var(--border);
  --chart-1: #FF7A05;
  --chart-2: #0099FF;
  --chart-3: #FFBF00;
  --chart-4: #00D696;
  --chart-5: #7A83FF;
  --chart-active-dot: #000;
}

* {
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 500;
  background-color: var(--background);
  color: var(--foreground);
  margin: 0;
  padding: 20px;
  line-height: 1.6;
  max-width: 1200px;
  margin: 0 auto;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 700;
  color: var(--foreground);
}

.header {
  padding-bottom: 20px;
  border-bottom: 2px solid var(--border);
  margin-bottom: 20px;
}

.header h1 {
  font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 15px 0;
}

.header a {
  display: inline-block;
  padding: 12px 20px;
  background-color: var(--main);
  color: var(--main-foreground);
  text-decoration: none;
  border: 2px solid var(--border);
  border-radius: 5px;
  font-weight: 700;
  margin-right: 10px;
  box-shadow: var(--shadow);
  transition: all 0.1s ease;
}

.header a:hover {
  transform: translate(4px, 4px);
  box-shadow: none;
}

.header input {
  padding: 12px;
  border: 2px solid var(--border);
  border-radius: 5px;
  font-size: 16px;
  margin-right: 10px;
  box-shadow: var(--shadow);
  background-color: var(--secondary-background);
  color: var(--foreground);
}

.header input:focus {
  outline: none;
  transform: translate(4px, 4px);
  box-shadow: none;
}

.header button {
  padding: 12px 20px;
  background-color: var(--main);
  color: var(--main-foreground);
  border: 2px solid var(--border);
  border-radius: 5px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: var(--shadow);
  transition: all 0.1s ease;
}

.header button:hover {
  transform: translate(4px, 4px);
  box-shadow: none;
}

hr.solid {
  border: none;
  border-top: 2px solid var(--border);
  margin: 20px 0;
}

.dataContainer {
  padding: 20px;
  max-width: 800px;
  background-color: var(--secondary-background);
  border: 2px solid var(--border);
  border-radius: 5px;
  box-shadow: var(--shadow);
  margin-bottom: 20px;
}

.dataContainer h3 {
  margin-top: 0;
  font-size: 1.5rem;
  font-weight: 700;
}

.dataTable {
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
  border: 2px solid var(--border);
  border-radius: 5px;
  overflow: hidden;
  box-shadow: var(--shadow);
}

.dataTable td, .dataTable th {
  border-right: 2px solid var(--border);
  border-bottom: 2px solid var(--border);
  padding: 12px;
  text-align: left;
}

.dataTable td:last-child, .dataTable th:last-child {
  border-right: none;
}

.dataTable tr:last-child td {
  border-bottom: none;
}

.dataTable tr:nth-child(even) { 
  background-color: var(--background);
}

.dataTable tr:hover { 
  background-color: var(--main);
  color: var(--main-foreground);
  transform: translate(2px, 2px);
  transition: all 0.1s ease;
}

.dataTable th {
  background-color: var(--main);
  color: var(--main-foreground);
  font-weight: 700;
  border-bottom: 2px solid var(--border);
}

.form-container {
  background-color: var(--secondary-background);
  border: 2px solid var(--border);
  border-radius: 5px;
  box-shadow: var(--shadow);
  padding: 30px;
  margin-bottom: 20px;
}

.form-container h3 {
  margin-top: 0;
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 700;
  color: var(--foreground);
}

.form-group input, .form-group textarea {
  width: 100%;
  padding: 12px;
  border: 2px solid var(--border);
  border-radius: 5px;
  font-size: 16px;
  font-family: inherit;
  box-shadow: var(--shadow);
  transition: all 0.1s ease;
  background-color: var(--secondary-background);
  color: var(--foreground);
}

.form-group input:focus, .form-group textarea:focus {
  outline: none;
  transform: translate(4px, 4px);
  box-shadow: none;
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

.form-group small {
  color: var(--foreground);
  opacity: 0.7;
  font-size: 14px;
  margin-left: 8px;
}

.btn {
  padding: 12px 24px;
  background-color: var(--main);
  color: var(--main-foreground);
  border: 2px solid var(--border);
  border-radius: 5px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: var(--shadow);
  transition: all 0.1s ease;
  font-size: 16px;
}

.btn:hover {
  transform: translate(4px, 4px);
  box-shadow: none;
}

.btn:active {
  transform: translate(4px, 4px);
  box-shadow: none;
}

.btn-success {
  background-color: var(--chart-4);
}

.btn-danger {
  background-color: #ff5252;
}

.response-success {
  background-color: var(--chart-4);
  color: var(--main-foreground);
  padding: 20px;
  border: 2px solid var(--border);
  border-radius: 5px;
  box-shadow: var(--shadow);
  margin-top: 20px;
}

.response-error {
  background-color: #ff5252;
  color: white;
  padding: 20px;
  border: 2px solid var(--border);
  border-radius: 5px;
  box-shadow: var(--shadow);
  margin-top: 20px;
}

.response-success h3, .response-error h3 {
  margin-top: 0;
  font-weight: 700;
}

.response-success a {
  color: var(--main-foreground);
  text-decoration: underline;
  font-weight: 700;
}
`;

export const renderPage = (body: string, options?: { customDomain?: string }) => `
<!DOCTYPE html><html>
<head>
  <title>Build a Website</title>
  <style>${CSS}</style>
</head>
<body>
<div class="header">
  <h1>Build a Website</h1>
  <p style="margin: 0; font-size: 1.2rem; color: var(--foreground); opacity: 0.8; font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">Create and deploy your website instantly</p>
</div>
${body}
<script>
  window.CUSTOM_DOMAIN = '${options?.customDomain || ''}';
</script>
</body>
</html>
`;


export const BuildWebsitePage = `
<div class="form-container">
  <form id="projectForm">
    <div class="form-group">
      <label for="projectName">Website Name</label>
      <input type="text" id="projectName" required placeholder="My Awesome Site" style="font-size: 1.1rem; padding: 16px;" oninput="document.getElementById('subdomain').value = this.value.toLowerCase().replace(/[^a-z0-9\\s-]/g, '').replace(/\\s+/g, '-').replace(/^-+|-+$/g, '')">
    </div>
    
    <div class="form-group">
      <label for="subdomain">Your URL</label>
      <div id="urlPreview" style="display: flex; align-items: center; gap: 8px;">
        <input type="text" id="subdomain" required placeholder="my-awesome-site" pattern="[a-z0-9-]+" title="Only lowercase letters, numbers, and hyphens" style="font-size: 1.1rem; padding: 16px; flex: 1;">
        <span style="font-size: 1.1rem; font-weight: 600;">.saasysite.me</span>
      </div>
      <small>This will be your website's address</small>
    </div>
    
    <div class="form-group">
      <label for="customHostname">Or connect your own domain (optional)</label>
      <input type="text" id="customHostname" placeholder="mystore.com" style="font-size: 1.1rem; padding: 16px;">
      <small>Already have a domain? Connect it to display your site at your own URL.</small>
      <div id="dnsInstructions" style="display: none; margin-top: 10px; padding: 20px; background-color: var(--chart-1); color: white; border: 2px solid var(--border); border-radius: 5px; box-shadow: var(--shadow); font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <strong style="font-size: 1.1rem; font-weight: 700;">⚠️ DNS Setup Required:</strong>
        <p style="margin: 10px 0 15px 0; font-weight: 500;">Add this DNS record to your domain:</p>
        <code style="background: rgba(0,0,0,0.2); color: white; padding: 12px 16px; border-radius: 5px; border: 2px solid var(--border); display: block; font-size: 14px; font-weight: 600; font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;">CNAME <span id="customDomainName"></span> → my.saasysite.me</code>
      </div>
    </div>
    
    <div class="form-group">
      <label for="scriptContent">Website Code</label>
      <textarea id="scriptContent" name="scriptContent" rows="18" required style="font-size: 14px; line-height: 1.4;">
export default {
  async fetch(request, env, ctx) {
    const html = \`
<!DOCTYPE html>
<html>
<head>
  <title>My Website</title>
  <style>
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      max-width: 800px; 
      margin: 0 auto; 
      padding: 40px 20px;
      background: #f8f9fa;
      color: #333;
    }
    h1 { 
      color: #FF7A05; 
      font-size: 2.5rem;
      margin-bottom: 20px;
    }
    p { 
      font-size: 1.1rem; 
      line-height: 1.6;
      margin-bottom: 15px;
    }
    .container {
      background: white;
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Welcome to My Website!</h1>
    <p>This is my new website built with Cloudflare Workers.</p>
    <p>You can customize this code to build anything you want!</p>
  </div>
</body>
</html>
    \`;
    
    return new Response(html, {
      headers: { 'Content-Type': 'text/html' }
    });
  }
};
      </textarea>
    </div>
    
    <button type="submit" class="btn" style="font-size: 1.1rem; padding: 16px 32px; width: 100%;">🚀 Create & Deploy Website</button>
  </form>

  <div id="projectResponse"></div>
</div>

<script>
// Set up event listeners when DOM is ready
document.addEventListener('DOMContentLoaded', function() {

  // DNS instructions
  const customHostnameInput = document.getElementById('customHostname');
  if (customHostnameInput) {
    customHostnameInput.addEventListener('input', function(e) {
      const customHostname = e.target.value;
      const dnsInstructions = document.getElementById('dnsInstructions');
      const customDomainName = document.getElementById('customDomainName');
      
      if (customHostname) {
        customDomainName.textContent = customHostname;
        dnsInstructions.style.display = 'block';
      } else {
        dnsInstructions.style.display = 'none';
      }
    });
  }

  // Form submission
  const projectForm = document.getElementById('projectForm');
  if (projectForm) {
    projectForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const projectName = document.getElementById('projectName').value;
      const subdomain = document.getElementById('subdomain').value;
      const customHostname = document.getElementById('customHostname').value;
      const scriptContent = document.getElementById('scriptContent').value;
      const responseDiv = document.getElementById('projectResponse');
      const submitButton = document.querySelector('button[type="submit"]');
      
      submitButton.textContent = '🚀 Creating...';
      submitButton.disabled = true;
      
      try {
        const response = await fetch('/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: projectName,
            subdomain: subdomain,
            custom_hostname: customHostname || undefined,
            script_content: scriptContent
          })
        });
        
        const result = await response.text();
        
        if (response.ok) {
          const customDomain = window.CUSTOM_DOMAIN;
          let finalUrl;
          let urlDisplay;
          
          if (customHostname) {
            finalUrl = \`https://\${customHostname}\`;
            urlDisplay = customHostname;
          } else if (customDomain) {
            finalUrl = \`https://\${subdomain}.\${customDomain}\`;
            urlDisplay = \`\${subdomain}.\${customDomain}\`;
          } else {
            finalUrl = \`/\${subdomain}\`;
            urlDisplay = \`\${window.location.hostname}/\${subdomain}\`;
          }
          
          responseDiv.innerHTML = \`
            <div class="response-success">
              <h3>🎉 Website Created Successfully!</h3>
              <p>Your website "\${projectName}" is now live at:</p>
              <p><strong>\${urlDisplay}</strong></p>
              \${customHostname ? '<p><small>Make sure you have added the DNS record as shown above!</small></p>' : ''}
              <p>Redirecting you to your website...</p>
            </div>
          \`;
          
          setTimeout(() => {
            window.location.href = finalUrl;
          }, customHostname ? 5000 : 2000);
          
        } else {
          responseDiv.innerHTML = \`
            <div class="response-error">
              <h3>Error Creating Website</h3>
              <p>\${result}</p>
            </div>
          \`;
          submitButton.textContent = '🚀 Create & Deploy Website';
          submitButton.disabled = false;
        }
      } catch (error) {
        responseDiv.innerHTML = \`
          <div class="response-error">
            <h3>Error</h3>
            <p>Failed to create website: \${error.message}</p>
          </div>
        \`;
        submitButton.textContent = '🚀 Create & Deploy Website';
        submitButton.disabled = false;
      }
    });
  }
});
</script>
`;
