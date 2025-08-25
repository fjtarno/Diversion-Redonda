
async function loadJSON(path){
  const res = await fetch(path);
  if(!res.ok) throw new Error("No se pudo cargar "+path);
  return res.json();
}
function money(v){ return new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR'}).format(v); }
(async ()=>{
  const home = await loadJSON('/content/home.json');
  const services = await loadJSON('/content/services.json');
  const testimonials = await loadJSON('/content/testimonials.json');
  document.getElementById('headline').textContent = home.headline;
  document.getElementById('subheadline').textContent = home.subheadline;
  document.getElementById('aboutText').textContent = home.about;
  ['ctaHeader','ctaHero','ctaFinal'].forEach(id=>{ document.getElementById(id).href = home.cta_whatsapp; });
  const grid = document.getElementById('servicesGrid');
  grid.innerHTML = services.items.map(s => `
    <article class="card">
      <h3>${s.title}</h3>
      <p>${s.description}</p>
      <p class="price">desde ${money(s.price_from)}</p>
      <a class="btn btn-primary" href="${home.cta_whatsapp}" target="_blank" rel="noopener">Solicitar info por WhatsApp</a>
    </article>
  `).join('');
  const tgrid = document.getElementById('testimonialsGrid');
  tgrid.innerHTML = testimonials.items.map(t => `
    <article class="card testimonial">
      <div class="avatar"></div>
      <div>
        <p>“${t.quote}”</p>
        <small>— ${t.author}</small>
      </div>
    </article>
  `).join('');
})().catch(err=>console.error(err));
