/* ============================================================
   PORTFOLIO ANTONIN BERNARDI — js/main.js 
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    /* ── 1. MENU MOBILE HAMBURGER ────────────────────────────── */
    const hamburger = document.querySelector('.nav-hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger?.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
        });
    });

    /* ── 2. SCROLL REVEAL (ANIMATION AU DEFILEMENT) ───────────── */
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach((e, i) => {
            if (e.isIntersecting) {
                setTimeout(() => e.target.classList.add('visible'), i * 60);
                revealObserver.unobserve(e.target);
            }
        });
    }, { threshold: 0.05 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    /* ── 3. BASE DE DONNÉES DE LA VEILLE (6 SOURCES ÉVOLUÉES SISR) ── */
    const veilleArticles = [
        {
            source: 'certfr',
            sourceLabel: 'CERT-FR',
            sourceColor: '#22d3ee',
            title: 'Alerte : Vulnérabilité critique dans les implémentations Active Directory',
            desc: 'Une faille critique permet à un attaquant non authentifié d\'élever ses privilèges au rang d\'administrateur du domaine via des requêtes Kerberos contrefaites.',
            category: 'Sécurité Système',
            link: 'https://www.cert.ssi.gouv.fr/'
        },
        {
            source: 'anssi',
            sourceLabel: 'ANSSI',
            sourceColor: '#a78bfa',
            title: 'Guide officiel : Sécurisation de l\'architecture des réseaux industriels',
            desc: 'Publication des nouvelles recommandations pour le cloisonnement strict des zones IT et OT à l\'aide de passerelles de filtrage réseau unidirectionnelles.',
            category: 'Réseau & Architecture',
            link: 'https://cyber.gouv.fr/'
        },
        {
            source: 'cyber',
            sourceLabel: 'Cybermalveillance',
            sourceColor: '#4ade80',
            title: 'Rapport annuel : Explosion des attaques par rançongiciel sur les PME',
            desc: 'Analyse des vecteurs d\'entrée principaux : manque de double authentification (MFA) sur les accès VPN distants et défaut de mises à jour système.',
            category: 'Menaces & Audits',
            link: 'https://www.cybermalveillance.gouv.fr/'
        },
        {
            source: 'zk',
            sourceLabel: 'Zataz',
            sourceColor: '#f472b6',
            title: 'Fuite de données massive : 1.5 million d\'identifiants réseau en vente',
            desc: 'Une base de données contenant des configurations de routeurs d\'entreprise et des clés privées pré-partagées a été localisée sur un forum du Dark Web.',
            category: 'Cybercriminalité',
            link: 'https://www.zataz.com/'
        },
        {
            source: 'certfr',
            sourceLabel: 'CERT-FR',
            sourceColor: '#22d3ee',
            title: 'Avis de sécurité : Multiples failles critiques résolues dans Cisco IOS XE',
            desc: 'Mise à jour d\'urgence recommandée pour les commutateurs de cœur de réseau afin de contrer l\'exécution de code arbitraire à distance.',
            category: 'Équipements Réseau',
            link: 'https://www.cert.ssi.gouv.fr/'
        },
        {
            source: 'anssi',
            sourceLabel: 'ANSSI',
            sourceColor: '#a78bfa',
            title: 'Durcissement des serveurs GNU/Linux Debian en environnement sensible',
            desc: 'Méthodologie de configuration des règles de pare-feu applicatif de bas niveau, désactivation des modules noyau inutilisés et restriction SSH.',
            category: 'Système Linux',
            link: 'https://cyber.gouv.fr/'
        }
    ];

    const container = document.getElementById('veille-container');

    function renderArticles(filter = 'all') {
        if (!container) return;

        const filtered = filter === 'all'
            ? veilleArticles
            : veilleArticles.filter(a => a.source === filter);

        container.innerHTML = filtered.map(a => `
      <div class="veille-card reveal visible" style="opacity:1; transform:none;">
        <div>
          <span class="veille-source-tag" style="color:${a.sourceColor}; border-color:${a.sourceColor}">${a.sourceLabel}</span>
          <h3 class="veille-title">
            <a href="${a.link}" target="_blank" class="veille-article-link">${a.title}</a>
          </h3>
          <p class="veille-desc">${a.desc}</p>
        </div>
        <div class="veille-meta" style="display:flex; justify-content:space-between; align-items:center; margin-top:1.5rem;">
          <span style="font-size:0.75rem; font-family:var(--mono); color:var(--text-muted);">${a.category}</span>
          <a href="${a.link}" target="_blank" class="btn-primary" style="padding:0.4rem 0.8rem; font-size:0.7rem; text-decoration:none; border-radius:4px;">Lire la note →</a>
        </div>
      </div>
    `).join('');
    }

    // Initialisation de l'affichage
    renderArticles();

    /* ── 4. GESTION DES FILTRES DE SOURCE ──────────────────────── */
    document.querySelectorAll('.source-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.source-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderArticles(btn.getAttribute('data-source'));
        });
    });

    /* ── 5. SYSTÈME DE REFRESH INTERACTIF (BOUTON DE VEILLE) ────── */
    const refreshBtn = document.getElementById('refresh-veille');
    refreshBtn?.addEventListener('click', () => {
        refreshBtn.innerText = "🔄 Recherche de nouveaux flux...";
        refreshBtn.style.opacity = "0.6";
        refreshBtn.style.pointerEvents = "none";

        setTimeout(() => {
            // Simulation d'injection d'un tout nouvel article urgent en haut du tableau
            const newAlert = {
                source: 'certfr',
                sourceLabel: 'CERT-FR',
                sourceColor: '#22d3ee',
                title: '[URGENT] Vulnérabilité Zero-Day découverte sur OpenSSH Server',
                desc: 'Une faille de corruption mémoire majeure permet d\'obtenir des privilèges Root sans authentification préalable. Appliquer le correctif système immédiatement.',
                category: 'Alerte Majeure',
                link: 'https://www.cert.ssi.gouv.fr/'
            };

            // Évite les doublons si l'utilisateur clique plusieurs fois
            if (!veilleArticles.some(a => a.title.includes('Zero-Day'))) {
                veilleArticles.unshift(newAlert);
            }

            // Remet le bouton à son état normal et réaffiche
            refreshBtn.innerText = "🔄 Actualiser les flux";
            refreshBtn.style.opacity = "1";
            refreshBtn.style.pointerEvents = "auto";

            // Force le filtre général pour voir le nouvel élément arriver en pole position
            const allBtn = document.querySelector('.source-btn[data-source="all"]');
            document.querySelectorAll('.source-btn').forEach(b => b.classList.remove('active'));
            allBtn?.classList.add('active');

            renderArticles('all');
        }, 1200);
    });
});