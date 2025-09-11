async function loadJSON(p){
  const url = p + (p.includes('?') ? '&' : '?') + 'v=' + Date.now();
  const r = await fetch(url, { cache: 'no-store' });
  if(!r.ok) throw new Error("No se pudo cargar "+url);
  return r.json();
}
function money(v){ return new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR'}).format(v); }

(async ()=>{
  try{
    const home = await loadJSON('/content/home.json');
    const cat  = await loadJSON('/content/catalog.json');

    const cta = document.getElementById('ctaHeader');
    if(cta) cta.href = home.cta_whatsapp;

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
  }catch(err){
    console.error(err);
    const grid = document.getElementById('catGrid');
    if(grid) grid.innerHTML = `<p style="color:#c00">No se pudo cargar el catálogo. Revisa <code>content/catalog.json</code>.</p>`;
  }
})();
