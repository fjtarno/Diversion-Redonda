async function loadJSON(path){
  const res = await fetch(path);
  if(!res.ok) throw new Error("No se pudo cargar "+path);
  return res.json();
}
function money(v){ return new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR'}).format(v); }

(function init(){
  // Evita saltos al principio: los botones del header reciben el enlace de WhatsApp
  loadJSON('/content/home.json').then(home=>{
    ['ctaHeader','ctaHero','ctaFinal'].forEach(id=>{
      const el = document.getElementById(id);
      if(el) el.href = home.cta_whatsapp;
    });
    const h1 = document.getElementById('headline');
    const sub = document.getElementById('subheadline');
    const about = document.getElementById('aboutText');
    if(h1) h1.textContent = home.headline;
    if(sub) sub.textContent = home.subheadline;
    if(about) about.textContent = home.about;
  }).catch(console.error);

  // Render packs en carrusel
  Promise.all([
    loadJSON('/content/services.json'),
    loadJSON('/content/testimonials.json')
  ]).then(([services, testimonials])=>{
    // CARRUSEL
    const track = document.getElementById('packsTrack');
    if(track){
      track.innerHTML = services.items.map(s => `
        <article class="slide">
          <h3>${s.title}</h3>
          <p>${s.description}</p>
          <p class="price">desde ${money(s.price_from)}</p>
          <a class="btn btn-primary" href="#" target="_blank" rel="noopener">Solicitar info por WhatsApp</a>
        </article>
      `).join('');

      const slides = [...track.querySelectorAll('.slide')];
      const prev = document.querySelector('.carousel .prev');
      const next = document.querySelector('.carousel .next');

      let index = 0;
      const setActive = (i)=>{
        slides.forEach((s,idx)=> s.classList.toggle('active', idx===i));
      };
      const scrollTo = (i)=>{
        index = (i+slides.length)%slides.length;
        slides[index].scrollIntoView({behavior:'smooth', inline:'center', block:'nearest'});
        setActive(index);
      };

      // Inicial
      setActive(0);

      // Botones
      if(prev) prev.addEventListener('click', ()=> scrollTo(index-1));
      if(next) next.addEventListener('click', ()=> scrollTo(index+1));

      // Activar por scroll (centro)
      track.addEventListener('scroll', ()=>{
        const mid = track.scrollLeft + track.clientWidth/2;
        let bestI = 0, bestDist = Infinity;
        slides.forEach((s,i)=>{
          const rect = s.getBoundingClientRect();
          const left = rect.left + track.scrollLeft;
          const center = left + rect.width/2;
          const dist = Math.abs(center - mid);
          if(dist < bestDist){ bestDist = dist; bestI = i; }
        });
        setActive(bestI);
        index = bestI;
      }, {passive:true});

      // Botón WhatsApp dentro de cada slide
      loadJSON('/content/home.json').then(home=>{
        slides.forEach(s=>{
          const a = s.querySelector('a.btn');
          if(a) a.href = home.cta_whatsapp;
        });
      });
    }

    // TESTIMONIOS
    const tgrid = document.getElementById('testimonialsGrid');
    if(tgrid){
      tgrid.innerHTML = testimonials.items.map(t => `
        <article class="card testimonial">
          <div class="avatar"></div>
          <div>
            <p>“${t.quote}”</p>
            <small>— ${t.author}</small>
          </div>
        </article>
      `).join('');
    }
  }).catch(console.error);
})();
