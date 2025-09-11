async function loadJSON(p){ const r=await fetch(p); if(!r.ok) throw new Error("No se pudo cargar "+p); return r.json(); }
function money(v){ return new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR'}).format(v); }

(async ()=>{
  const home = await loadJSON('/content/home.json');
  const cat  = await loadJSON('/content/catalog.json');

  document.getElementById('ctaHeader').href = home.cta_whatsapp;
  document.getElementById('catTitle').textContent = cat.title || 'Catálogo de servicios';
  document.getElementById('catIntro').textContent = cat.intro || '';

  const grid = document.getElementById('catGrid');
  grid.innerHTML = (cat.items||[]).map(s => `
    <article class="card">
      <h3>${s.name}</h3>
      <p>${s.description||''}</p>
      ${typeof s.price==="number" ? `<p class="price">${money(s.price)}</p>` : ''}
      <a class="btn btn-primary" href="${home.cta_whatsapp}" target="_blank" rel="noopener">Solicitar info</a>
    </article>
  `).join('');
})().catch(console.error);
