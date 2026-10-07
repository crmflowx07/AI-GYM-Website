
document.addEventListener('DOMContentLoaded',()=>{
 const toggle=document.querySelector('[data-menu]'); const nav=document.querySelector('.navlinks');
 if(toggle&&nav) toggle.addEventListener('click',()=>nav.classList.toggle('open'));
 document.querySelectorAll('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{
  const group=btn.closest('[data-filter-group]')||document; group.querySelectorAll('[data-filter]').forEach(x=>x.classList.remove('active')); btn.classList.add('active');
  const key=btn.dataset.filter; document.querySelectorAll('[data-category]').forEach(card=>card.classList.toggle('hidden-card',key!=='all'&&card.dataset.category!==key));
 }));
 document.querySelectorAll('[data-modal-open]').forEach(b=>b.addEventListener('click',()=>document.getElementById(b.dataset.modalOpen)?.classList.add('open')));
 document.querySelectorAll('[data-modal-close]').forEach(b=>b.addEventListener('click',()=>b.closest('.modal')?.classList.remove('open')));
 document.querySelectorAll('[data-toast]').forEach(b=>b.addEventListener('click',()=>{const t=document.getElementById('toast'); if(t){t.textContent=b.dataset.toast;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1800)}}));
 document.querySelectorAll('[data-toggle]').forEach(x=>x.addEventListener('click',()=>x.classList.toggle('on')));
});
