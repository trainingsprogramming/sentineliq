const fs = require('fs');
const { Marked } = require('marked');

const markdownFile = '../project.md';
const outputFile = 'index.html';

const markdownContent = fs.readFileSync(markdownFile, 'utf8');

const marked = new Marked({ gfm: true });
const htmlContent = marked.parse(markdownContent);

const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SentinelIQ - Retro Edition</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=VT323&family=Fira+Code:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="scanlines"></div>
    <div class="flicker">
        <header class="header">
            <div class="banner-wrapper">
                <img src="banner.png" alt="Retro Cyberpunk Banner" class="banner">
                <h1 class="glitch-title" data-text="SentinelIQ">SentinelIQ</h1>
                <p class="subtitle">Applied AI Engineering System <span class="blink">_</span></p>
            </div>
        </header>
        
        <main class="container">
            <div class="terminal-window">
                <div class="terminal-header">
                    <span class="btn btn-close"></span>
                    <span class="btn btn-min"></span>
                    <span class="btn btn-max"></span>
                    <div class="terminal-title">~/project.md</div>
                </div>
                <div class="markdown-content">
                    ${htmlContent}
                </div>
            </div>
        </main>
        
        <footer class="footer">
            <p>SYSTEM BOOT COMPLETE. MEMORY: 640K OK.</p>
        </footer>
    </div>
    
    <script>
        // Simple JS to add typing effect to headers when scrolled into view
        document.addEventListener('DOMContentLoaded', () => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && entry.target.tagName === 'H2') {
                        entry.target.classList.add('typing-active');
                    }
                });
            });
            
            document.querySelectorAll('.markdown-content h2').forEach(h2 => {
                observer.observe(h2);
            });
        });
    </script>
</body>
</html>
`;

fs.writeFileSync(outputFile, htmlTemplate);
console.log('Successfully generated index.html');
