async function loadJSON(path){
  const res = await fetch(path);
  if(!res.ok) throw new Error("No se pudo cargar "+path);
  return res.json();
}
function money(v){ return new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR'}).format(v); }

(async ()=>{
  // HOME
  const home = await loadJSON('/content/home.json');
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

  // PACKS (grid)
  const services = await loadJSON('/content/services.json');
  const grid = document.getElementById('servicesGrid');
  if(grid){
    grid.innerHTML = services.items.map(s => `
      <article class="card">
        <h3>${s.title}</h3>
        <p>${s.description}</p>
        <p class="price">desde ${money(s.price_from)}</p>
        <a class="btn btn-primary" href="${home.cta_whatsapp}" target="_blank" rel="noopener">Solicitar info por WhatsApp</a>
      </article>
    `).join('');
  }

  // TESTIMONIOS (solo 2, estilo “pantallazo”)
  const testimonials = await loadJSON('/content/testimonials.json');
  const wrap = document.getElementById('instaWrap');
  if(wrap){
    const two = testimonials.items.slice(0,2);
    wrap.innerHTML = two.map(t => `
      <article class="insta-card">
        <div class="insta-top">
          <div class="insta-ava"></div>
          <div class="insta-name">diversion.redonda</div>
          <div class="insta-dots">•••</div>
        </div>
        <div class="insta-body">
          <p>“${t.quote}”</p>
          <p><strong>— ${t.author}</strong></p>
        </div>
        <div class="insta-meta">Ver en Instagram</div>
      </article>
    `).join('');
  }
})().catch(console.error);
