// Bistrouille — interactions front (structure HTML intacte)
(function(){
  const $ = (sel, ctx=document) => ctx.querySelector(sel);
  const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

  // Header state + hero parallax
  const header = $('.header');
  function onScroll(){
    if(window.scrollY > 40){ header?.classList.add('scrolled'); } else { header?.classList.remove('scrolled'); }
    const hero = $('#heroMedia');
    if(hero){
      const y = window.scrollY * -0.08;
      hero.style.backgroundPosition = `center ${y}px`;
    }
  }
  window.addEventListener('scroll', onScroll, {passive:true}); onScroll();

  // Smooth scroll
  $$('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const id = a.getAttribute('href');
      if(!id || id === '#') return;
      const target = document.querySelector(id);
      if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth', block:'start'}); }
    });
  });

  // Drawer mobile
  const burger = $('.burger'); const drawer = $('#drawer');
  burger?.addEventListener('click', ()=>{
    const open = drawer?.classList.toggle('drawer--open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    drawer?.setAttribute('aria-hidden', open ? 'false' : 'true');
  });

  // Reveal on scroll
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(ent=>{ if(ent.isIntersecting){ ent.target.classList.add('is-visible'); io.unobserve(ent.target); } });
  }, {threshold:0.15});
  $$('.reveal').forEach(el=>io.observe(el));

  // Galerie
  const row = $('#galrow');
  const featured = $('#featured');
  const fimg = $('#featured-img');
  const prev = $('#gprev');
  const nextBtn = $('#gnext');
  const mapIdxToUrl = {
    1:'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1600&q=80',
    2:'https://images.unsplash.com/photo-1551024709-8f23befc6cf7?auto=format&fit=crop&w=1600&q=80',
    3:'https://images.unsplash.com/photo-1544025164-8d1b1c2a7f2e?auto=format&fit=crop&w=1600&q=80',
    4:'https://images.unsplash.com/photo-1526312426976-593c2b999512?auto=format&fit=crop&w=1600&q=80',
    5:'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1600&q=80',
    6:'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=80',
    7:'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=80',
    8:'https://images.unsplash.com/photo-1544025163-5fd6a5d7d8bf?auto=format&fit=crop&w=1600&q=80',
    9:'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80',
    10:'https://images.unsplash.com/photo-1514361892635-6b07e31e75bc?auto=format&fit=crop&w=1600&q=80',
    11:'https://images.unsplash.com/photo-1541782814456-3974c54c1ab1?auto=format&fit=crop&w=1600&q=80',
    12:'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1600&q=80'
  };
  function scrollGallery(dir){ row?.scrollBy({ left: dir*300, behavior:'smooth' }); }
  prev?.addEventListener('click', ()=>scrollGallery(-1));
  nextBtn?.addEventListener('click', ()=>scrollGallery(1));
  row?.addEventListener('click', (e)=>{
    const t = e.target.closest('.thumb');
    if(!t) return;
    const idx = t.dataset.idx;
    if(featured.dataset.open === String(idx)){
      featured.classList.remove('is-open'); fimg.src=''; featured.dataset.open=''; return;
    }
    fimg.src = mapIdxToUrl[idx];
    featured.classList.add('is-open'); featured.dataset.open = String(idx);
  });

  // Formulaires
  const resa = $('#resa-form'); const rfb = $('#resa-feedback');
  resa?.addEventListener('submit',(e)=>{
    e.preventDefault();
    let ok = true; rfb.textContent = '';
    $$('#resa-form input[required], #resa-form select[required]').forEach(el=>{
      el.classList.remove('error');
      if(!el.value){ ok=false; el.classList.add('error'); }
    });
    if(!ok){ rfb.textContent = 'Merci de compléter les champs obligatoires.'; return; }
    rfb.textContent = 'Merci ! Votre demande a bien été envoyée. Nous vous recontactons pour confirmer.';
    resa.reset();
  });

  const es = $('#events-sub'); const efb = $('#events-feedback');
  es?.addEventListener('submit',(e)=>{
    e.preventDefault();
    const email = es.querySelector('input[type=email]');
    const consent = es.querySelector('input[type=checkbox]');
    if(!email.value || !consent.checked){ efb.textContent = 'Merci d’indiquer votre email et de cocher la case.'; return; }
    efb.textContent = 'Merci ! Vous êtes sur la liste.';
    es.reset();
  });
})();