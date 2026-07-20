(function () {
  'use strict';

  document.documentElement.classList.add('js-enabled');

  function initSite() {
    const header = document.querySelector('.site-header');
    const progress = document.querySelector('.scroll-progress span');
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-nav');
    const reveals = document.querySelectorAll('.reveal');
    const year = document.getElementById('year');
    const form = document.getElementById('leadForm');

    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progress) {
        progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
      }
      if (header) {
        header.classList.toggle('scrolled', window.scrollY > 20);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (toggle && nav) {
      toggle.addEventListener('click', function () {
        const open = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(open));
      });

      nav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          nav.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // O conteúdo fica visível mesmo quando IntersectionObserver não está disponível.
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -3% 0px' });

      reveals.forEach(function (element) {
        observer.observe(element);
      });

      // Proteção: nunca deixa o site invisível por falha na animação.
      window.setTimeout(function () {
        reveals.forEach(function (element) {
          element.classList.add('visible');
        });
      }, 1400);
    } else {
      reveals.forEach(function (element) {
        element.classList.add('visible');
      });
    }

    if (year) {
      year.textContent = String(new Date().getFullYear());
    }

    if (form) {
      form.addEventListener('submit', function (event) {
        event.preventDefault();
        const data = new FormData(form);
        const message = [
          'Olá, AR Digital! Gostaria de solicitar uma análise inicial.',
          '',
          `*Nome:* ${data.get('nome') || ''}`,
          `*Empresa/atividade:* ${data.get('empresa') || ''}`,
          `*Segmento:* ${data.get('segmento') || ''}`,
          `*Cidade:* ${data.get('cidade') || ''}`,
          `*WhatsApp:* ${data.get('whatsapp') || ''}`,
          `*Site/Instagram:* ${data.get('site') || ''}`,
          `*Necessidade:* ${data.get('mensagem') || ''}`
        ].join('\n');

        const numero = '5551995758811';
        const url = `https://wa.me/${numero}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSite, { once: true });
  } else {
    initSite();
  }
})();
