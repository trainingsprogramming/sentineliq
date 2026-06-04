import fs from 'fs';
import { Marked } from 'marked';

const markdownFile = '../project.md';
const outputFile = 'index.html';

const markdownContent = fs.readFileSync(markdownFile, 'utf8');

const marked = new Marked({ gfm: true });
let htmlContent = marked.parse(markdownContent);

// Wrap every <table> in a scrollable div so wide tables don't clip on small screens
htmlContent = htmlContent
  .replace(/<table>/g, '<div class="table-scroll"><table>')
  .replace(/<\/table>/g, '</table></div>');

const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SentinelIQ — Applied AI Engineering</title>
    <meta name="description" content="SentinelIQ: An enterprise-grade Applied AI Engineering system for NexaTel. Build RAG, LangGraph, and ingestion pipelines over telecom operational data.">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bangers&family=Space+Grotesk:wght@400;700;900&family=Yellowtail&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"><\/script>
</head>
<body>
    <div class="page-wrapper">
        <div class="window-container">

            <div class="window-header">
                <div class="window-controls">
                    <span class="dot bg-red"></span>
                    <span class="dot bg-yellow"></span>
                    <span class="dot bg-green"></span>
                </div>
                <button class="hamburger" id="hamburger-btn" aria-label="Open menu">&#9776;</button>
                <div class="window-nav" id="main-nav">
                    <a href="#">Home</a>
                    <a href="#">About us</a>
                    <a href="#">Documentation</a>
                    <a href="#">Contact</a>
                    <a href="#">Blog</a>
                </div>
                <div class="window-auth">
                    <a href="sentineliq_project_skeleton.zip" download class="btn-download">&#11015; Download Skeleton</a>
                    <a href="#" class="font-bold">
                        <span class="icon-user">&#128100;</span> Sign in
                    </a>
                </div>
            </div>

            <div class="window-body">
                <div class="pop-element smiley">
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="50" cy="50" r="45" fill="#ffee58" stroke="#000" stroke-width="4"/>
                        <ellipse cx="35" cy="40" rx="4" ry="10" fill="#000"/>
                        <ellipse cx="65" cy="40" rx="4" ry="10" fill="#000"/>
                        <path d="M 25 60 Q 50 85 75 60" fill="none" stroke="#000" stroke-width="5" stroke-linecap="round"/>
                        <path d="M 70 20 Q 90 20 85 45 Z" fill="#fff" stroke="#000" stroke-width="4"/>
                    </svg>
                </div>
                <div class="pop-element star">
                    <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                        <polygon points="256 0 314 163 496 172 354 285 401 462 256 366 111 462 158 285 16 172 198 163 256 0" fill="#ffee58" stroke="#000" stroke-width="25"/>
                    </svg>
                </div>
                <div class="pop-element star2">
                    <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                        <polygon points="256 0 314 163 496 172 354 285 401 462 256 366 111 462 158 285 16 172 198 163 256 0" fill="#ffee58" stroke="#000" stroke-width="25"/>
                    </svg>
                </div>
                <div class="pop-element lightning">
                    <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
                        <polygon points="60 0 10 75 45 80 20 150 90 60 50 55" fill="#ffee58" stroke="#000" stroke-width="5"/>
                    </svg>
                </div>

                <div class="content-box">
                    <div class="markdown-content">
                        ${htmlContent}
                    </div>
                </div>

            </div>
        </div>
    </div>

    <!-- Login Modal -->
    <div id="login-modal" class="modal-overlay" style="display: none;">
        <div class="modal-box">
            <h2 class="modal-title">Welcome SRE!</h2>
            <p class="modal-subtitle">Enter your email to customize your staging setup.</p>
            <form id="login-form">
                <input type="email" id="user-email-input" class="modal-input" placeholder="e.g. name@nexatel.example" required />
                <button type="submit" class="modal-submit-btn">CONTINUE <span class="cursor-img">&#10148;</span></button>
            </form>
            <div id="modal-error" class="modal-error-msg" style="display: none;"></div>
        </div>
    </div>

    <style>
    /* ── Table scroll ── */
    .table-scroll {
        overflow-x: auto;
        margin-bottom: 2em;
        border: 4px solid var(--color-black);
        box-shadow: 4px 4px 0px var(--color-black);
    }
    .table-scroll table {
        border: none;
        box-shadow: none;
        margin-bottom: 0;
        min-width: 600px;
    }

    /* ── Download button ── */
    .btn-download {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: var(--color-yellow);
        border: 3px solid var(--color-black);
        border-radius: 30px;
        padding: 6px 18px;
        font-family: 'Space Grotesk', sans-serif;
        font-size: 0.9rem;
        font-weight: 900;
        color: var(--color-black) !important;
        text-decoration: none !important;
        box-shadow: 3px 3px 0px var(--color-black);
        transition: all 0.15s;
        white-space: nowrap;
    }
    .btn-download:hover {
        transform: translate(-2px, -2px);
        box-shadow: 5px 5px 0px var(--color-black);
        background: var(--color-green) !important;
    }

    /* ── Hamburger ── */
    .hamburger {
        display: none;
        background: none;
        border: 3px solid var(--color-black);
        border-radius: 6px;
        padding: 4px 10px;
        font-size: 1.4rem;
        cursor: pointer;
        font-weight: 900;
    }
    @media (max-width: 767px) {
        .hamburger { display: block; }
        .window-nav {
            display: none;
            flex-direction: column;
            gap: 10px;
            position: absolute;
            top: 62px;
            left: 0;
            right: 0;
            background: var(--bg-window-header);
            border-bottom: 4px solid var(--color-black);
            padding: 20px;
            z-index: 1000;
        }
        .window-nav.open { display: flex !important; }
        .window-header { position: relative; flex-wrap: wrap; }
        .btn-download { font-size: 0.78rem; padding: 5px 12px; }
    }

    /* ── Mermaid diagrams ── */
    .mermaid {
        background: #fff;
        border: 4px solid var(--color-black);
        box-shadow: 4px 4px 0px var(--color-black);
        padding: 20px;
        margin-bottom: 1.5em;
        overflow-x: auto;
        text-align: center;
    }

    /* ── Modal ── */
    .modal-overlay {
        position: fixed;
        top: 0; left: 0;
        width: 100vw; height: 100vh;
        background-color: rgba(216, 202, 255, 0.95);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 99999;
    }
    .modal-box {
        background-color: #ffffff;
        border: 6px solid #111111;
        box-shadow: 12px 12px 0px #111111;
        padding: 40px;
        width: 90%;
        max-width: 480px;
        text-align: center;
        transform: rotate(-1deg);
    }
    .modal-title {
        font-family: 'Bangers', cursive;
        font-size: 3.5rem;
        color: var(--color-pink);
        text-shadow: 3px 3px 0 #000;
        margin-bottom: 15px;
        letter-spacing: 2px;
    }
    .modal-subtitle {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 1.1rem;
        font-weight: 700;
        color: #111111;
        margin-bottom: 25px;
    }
    .modal-input {
        width: 100%;
        border: 4px solid #111111;
        padding: 14px 20px;
        font-family: 'Space Grotesk', sans-serif;
        font-size: 1.2rem;
        font-weight: 700;
        outline: none;
        box-shadow: 4px 4px 0px #111111;
        margin-bottom: 25px;
        transition: transform 0.1s;
        box-sizing: border-box;
    }
    .modal-input:focus {
        transform: translate(-2px, -2px);
        box-shadow: 6px 6px 0px #111111;
    }
    .modal-submit-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background-color: var(--color-yellow);
        border: 4px solid #111111;
        border-radius: 40px;
        padding: 10px 40px;
        font-family: 'Bangers', cursive;
        font-size: 1.8rem;
        color: #111111;
        cursor: pointer;
        box-shadow: 4px 4px 0px #111111;
        transition: all 0.15s;
        width: 100%;
    }
    .modal-submit-btn:hover { transform: translate(-2px, -2px); box-shadow: 6px 6px 0px #111111; }
    .modal-submit-btn:active { transform: translate(2px, 2px); box-shadow: 2px 2px 0px #111111; }
    .modal-error-msg { color: var(--color-red); font-weight: 900; margin-top: 15px; font-size: 1rem; }
    </style>

    <script>
    document.addEventListener('DOMContentLoaded', () => {
        // ── Mermaid: convert <pre><code class="language-mermaid"> to <div class="mermaid"> ──
        document.querySelectorAll('pre > code.language-mermaid').forEach(codeEl => {
            const pre = codeEl.parentElement;
            const div = document.createElement('div');
            div.className = 'mermaid';
            div.textContent = codeEl.textContent;
            pre.replaceWith(div);
        });

        mermaid.initialize({
            startOnLoad: true,
            theme: 'base',
            themeVariables: {
                primaryColor: '#ffee58',
                primaryBorderColor: '#111111',
                primaryTextColor: '#111111',
                lineColor: '#111111',
                fontSize: '16px'
            }
        });

        // ── Hamburger ──
        const hamburgerBtn = document.getElementById('hamburger-btn');
        const mainNav = document.getElementById('main-nav');
        if (hamburgerBtn && mainNav) {
            hamburgerBtn.addEventListener('click', () => mainNav.classList.toggle('open'));
        }

        // ── Email suffix modal ──
        const modal = document.getElementById('login-modal');
        const form = document.getElementById('login-form');
        const input = document.getElementById('user-email-input');
        const errorMsg = document.getElementById('modal-error');
        const signInBtn = document.querySelector('.window-auth a.font-bold');

        function getSuffix(email) {
            const cleanAlpha = email.replace(/[^a-zA-Z]/g, '');
            return (cleanAlpha.substring(0, 5).toUpperCase()) || 'STAGE';
        }

        function applySuffix(email) {
            const suffix = getSuffix(email);
            walkTextNodes(document.body, suffix);
            if (signInBtn) signInBtn.innerHTML = '<span class="icon-user">&#128100;</span> ' + suffix;
        }

        function walkTextNodes(node, suffix) {
            if (node.nodeType === Node.TEXT_NODE) {
                let t = node.nodeValue;
                const U = suffix.toUpperCase(), L = suffix.toLowerCase();
                t = t.replace(/SUPPORT_TICKETS(_[A-Z0-9]{1,10})?/g, 'SUPPORT_TICKETS_' + U);
                t = t.replace(/support_tickets(_[a-z0-9]{1,10})?/g, 'support_tickets_' + L);
                t = t.replace(/ingestion_runs(_[a-z0-9A-Z]{1,10})?/g, 'ingestion_runs_' + L);
                t = t.replace(/source_files(_[a-z0-9A-Z]{1,10})?/g, 'source_files_' + L);
                t = t.replace(/raw_documents(_[a-z0-9A-Z]{1,10})?/g, 'raw_documents_' + L);
                t = t.replace(/normalized_documents(_[a-z0-9A-Z]{1,10})?/g, 'normalized_documents_' + L);
                t = t.replace(/extracted_entities(_[a-z0-9A-Z]{1,10})?/g, 'extracted_entities_' + L);
                t = t.replace(/ingestion_errors(_[a-z0-9A-Z]{1,10})?/g, 'ingestion_errors_' + L);
                t = t.replace(/audit_events(_[a-z0-9A-Z]{1,10})?/g, 'audit_events_' + L);
                node.nodeValue = t;
            } else if (node.nodeName !== 'SCRIPT' && node.nodeName !== 'STYLE' && node.id !== 'login-modal') {
                for (let child of node.childNodes) walkTextNodes(child, suffix);
            }
        }

        const savedEmail = localStorage.getItem('sentineliq_user_email');
        if (savedEmail) { applySuffix(savedEmail); } else { modal.style.display = 'flex'; }

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = input.value.trim();
            if (!email) { errorMsg.textContent = 'Please enter a valid email.'; errorMsg.style.display = 'block'; return; }
            localStorage.setItem('sentineliq_user_email', email);
            applySuffix(email);
            modal.style.display = 'none';
        });

        if (signInBtn) {
            signInBtn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.style.display = 'flex';
                const cur = localStorage.getItem('sentineliq_user_email');
                if (cur) input.value = cur;
            });
        }
    });
    <\/script>
</body>
</html>
`;

fs.writeFileSync(outputFile, htmlTemplate);
console.log('Successfully generated index.html');
