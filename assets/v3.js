
(function(){
  const $$=(s,c=document)=>[...c.querySelectorAll(s)];
  const $=(s,c=document)=>c.querySelector(s);

  // reveal
  const els=$$('[data-reveal]');
  if('IntersectionObserver' in window){
    const io=new IntersectionObserver(entries=>entries.forEach(e=>{
      if(e.isIntersecting){e.target.classList.add('revealed');io.unobserve(e.target)}
    }),{threshold:.08});
    els.forEach(el=>io.observe(el));
  } else els.forEach(el=>el.classList.add('revealed'));

  // counters
  $$('.counter').forEach(el=>{
    const target=parseFloat(el.dataset.target||'0'), suffix=el.dataset.suffix||'', decimals=Number(el.dataset.decimals||0);
    let start=0; const dur=900; const t0=performance.now();
    const tick=t=>{const p=Math.min(1,(t-t0)/dur);const val=target*(1-Math.pow(1-p,3));
      el.textContent=val.toFixed(decimals)+suffix;if(p<1)requestAnimationFrame(tick)};
    requestAnimationFrame(tick);
  });

  // mobile menu
  $$('.menu-toggle').forEach(btn=>btn.addEventListener('click',()=>{
    const nav=$('.navlinks'); if(nav) nav.classList.toggle('open');
  }));

  // filters
  $$('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{
    const group=btn.closest('[data-filter-group]')||document;
    $$('[data-filter]',group).forEach(b=>b.classList.remove('active'));btn.classList.add('active');
    const key=btn.dataset.filter;
    $$('[data-category]').forEach(card=>card.classList.toggle('hidden-card',key!=='all' && card.dataset.category!==key));
  }));

  // tabs
  $$('[data-tab]').forEach(btn=>btn.addEventListener('click',()=>{
    const root=btn.closest('[data-tabs]');
    if(!root)return;
    $$('[data-tab]',root).forEach(b=>b.classList.remove('active'));btn.classList.add('active');
    const name=btn.dataset.tab;
    $$('[data-panel]',root).forEach(p=>p.classList.toggle('active',p.dataset.panel===name));
  }));

  // modal
  $$('[data-open-modal]').forEach(btn=>btn.addEventListener('click',()=>{
    const m=document.getElementById(btn.dataset.openModal); if(m)m.classList.add('open');
  }));
  $$('[data-close-modal]').forEach(btn=>btn.addEventListener('click',()=>btn.closest('.modal')?.classList.remove('open')));
  $$('.modal').forEach(m=>m.addEventListener('click',e=>{if(e.target===m)m.classList.remove('open')}));

  // switches
  $$('.switch').forEach(sw=>sw.addEventListener('click',()=>sw.classList.toggle('on')));

  // toast buttons
  $$('[data-toast]').forEach(btn=>btn.addEventListener('click',()=>{
    let toast=$('.toast'); if(!toast){toast=document.createElement('div');toast.className='toast';document.body.appendChild(toast)}
    toast.textContent=btn.dataset.toast||'Saved';toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),1800);
  }));

  // favorites
  $$('[data-fav]').forEach(btn=>btn.addEventListener('click',()=>{
    btn.classList.toggle('active');btn.textContent=btn.classList.contains('active')?'♥':'♡';
  }));

  // nav active path
  const file=location.pathname.split('/').pop()||'index.html';
  $$('a').forEach(a=>{if((a.getAttribute('href')||'').split('#')[0]===file && a.classList.contains('side-link'))a.classList.add('active')});
})();
