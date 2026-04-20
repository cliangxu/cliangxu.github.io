(function () {
    const root = document.currentScript.src.replace(/nav\.js$/, '');

    // ── Inject into <head> ──────────────────────────────────
    const head = document.head;

    // Viewport meta
    const vp = document.createElement('meta');
    vp.name = 'viewport';
    vp.content = 'width=device-width, initial-scale=1';
    head.prepend(vp);

    // Stylesheets (order matters: framework → icons → custom)
    [
        root + 'w3.css',
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
        root + 'xu.css',
    ].forEach(href => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        head.appendChild(link);
    });

    // ── Inject header + nav after this <script> tag ─────────
    const items = [
        ['index.html',   'Home'],
        ['r/index.html', 'Research'],
        ['p/index.html', 'Publications'],
        ['g/index.html', 'Group'],
    ];
    const lis = items.map(([path, label]) =>
        `<li><a class="nav" href="${root}${path}">${label}</a></li>`
    ).join('');

    document.currentScript.insertAdjacentHTML('afterend',
        `<div id="site-header">` +
            `<div id="site-nav">` +
                `<a id="site-name" href="${root}index.html">Chenliang Xu</a>` +
                `<ul class="w3-navbar">${lis}</ul>` +
                `<a href="https://www.rochester.edu" id="ur-logo-link">` +
                    `<img src="${root}UR-logo.png" alt="University of Rochester" id="ur-logo">` +
                `</a>` +
            `</div>` +
        `</div>`
    );

    // Shadow when page is scrolled
    window.addEventListener('scroll', function () {
        document.getElementById('site-header').classList.toggle('scrolled', window.scrollY > 0);
    }, { passive: true });

    // ── Inject footer before </body> ─────────────────────────
    document.addEventListener('DOMContentLoaded', function () {
        const footer = document.createElement('footer');
        footer.id = 'site-footer';
        footer.innerHTML = `<p>© ${new Date().getFullYear()} Chenliang Xu &middot; University of Rochester</p>`;
        document.body.appendChild(footer);
    });
})();
