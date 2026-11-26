'use strict';
document.documentElement.classList.add('js');
const $=(s,root=document)=>root.querySelector(s);
const $$=(s,root=document)=>Array.from(root.querySelectorAll(s));
const menu=$('.menu-toggle'),nav=$('#navigation');
function setMenu(open){menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');nav.classList.toggle('open',open)}
menu.addEventListener('click',()=>setMenu(menu.getAttribute('aria-expanded')!=='true'));
nav.addEventListener('click',e=>{if(e.target.closest('a'))setMenu(false)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){setMenu(false);menu.focus()}});
document.addEventListener('click',e=>{if(!e.target.closest('.site-header')&&menu.getAttribute('aria-expanded')==='true')setMenu(false)});
window.matchMedia('(min-width:851px)').addEventListener('change',e=>{if(e.matches)setMenu(false)});
const bar=$('.progress span');
function progress(){const total=document.documentElement.scrollHeight-window.innerHeight;bar.style.width=(total>0?Math.min(100,Math.max(0,scrollY/total*100)):0)+'%'}
window.addEventListener('scroll',progress,{passive:true});window.addEventListener('resize',progress);progress();
const links=$$('nav a');if('IntersectionObserver' in window){
 const navObserver=new IntersectionObserver(entries=>{for(const e of entries){if(e.isIntersecting){links.forEach(a=>{if(a.hash==='#'+e.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')})}}},{rootMargin:'-20% 0px -55% 0px'});
 links.forEach(a=>{const section=$(a.hash);if(section)navObserver.observe(section)});
 if(!matchMedia('(prefers-reduced-motion: reduce)').matches){const blocks=$$('.section-heading,.identity-copy,.timeline,.value,.steps li,.material-card');const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.08});blocks.forEach(b=>{b.classList.add('reveal');observer.observe(b)});document.documentElement.classList.add('reveal-ready')}
}
// Image failures have a local, explicitly illustrative fallback.
const fallback=new URL('assets/fallback.svg',document.baseURI).href;
function imageFallback(image){if(image.dataset.failed)return;image.dataset.failed='1';image.src=fallback;image.alt='Ilustración de inspiración, imagen original no disponible'}
$$('img:not(#dialog-image)').forEach(img=>{if(!img.closest('.brand')){img.addEventListener('error',()=>imageFallback(img));if(img.complete&&img.naturalWidth===0)imageFallback(img)}});
// Gallery, filter and native accessible dialog.
const cards=$$('.gallery-card'),filterButtons=$$('[data-filter]'),dialog=$('#gallery-dialog'),dialogImage=$('#dialog-image');let current=0,visible=cards.slice(),returnFocus=null;
function filter(category){filterButtons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===category)));visible=cards.filter(c=>category==='all'||c.dataset.category===category);cards.forEach(c=>{c.hidden=!visible.includes(c)});$('#gallery-count').textContent=visible.length+' referencias'}
filterButtons.forEach(b=>b.addEventListener('click',()=>filter(b.dataset.filter)));
function displayGallery(i){if(!visible.length)return;current=(i+visible.length)%visible.length;const c=visible[current],im=$('img',c);delete dialogImage.dataset.failed;dialogImage.alt=im.alt;dialogImage.src=im.dataset.failed?fallback:im.dataset.large;$('#dialog-title').textContent=$('h3',c).textContent;$('#dialog-text').textContent=$('.gallery-description',c).textContent;$('#dialog-count').textContent=(current+1)+' / '+visible.length;$('#gallery-prev').disabled=visible.length<2;$('#gallery-next').disabled=visible.length<2}
dialogImage.addEventListener('error',()=>imageFallback(dialogImage));
cards.forEach(c=>$('.gallery-open',c).addEventListener('click',e=>{returnFocus=e.currentTarget;displayGallery(visible.indexOf(c));dialog.showModal();$('.dialog-close').focus()}));
$('.dialog-close').addEventListener('click',()=>dialog.close());
$('#gallery-prev').addEventListener('click',()=>displayGallery(current-1));$('#gallery-next').addEventListener('click',()=>displayGallery(current+1));
dialog.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();displayGallery(current-1)}else if(e.key==='ArrowRight'){e.preventDefault();displayGallery(current+1)}});
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});dialog.addEventListener('close',()=>{if(returnFocus)returnFocus.focus()});
// SVG finish visualizer, no external dependencies.
const finishes={roble:{name:'Roble natural',color:'#b98b5c',grain:true,desc:'Tono medio y veta visible.'},nogal:{name:'Nogal tostado',color:'#6b4936',grain:true,desc:'Tonalidad profunda y contraste.'},marfil:{name:'Lacado marfil',color:'#e6dfd2',grain:false,desc:'Superficie clara y uniforme.'},arena:{name:'Arena mate',color:'#b7a998',grain:false,desc:'Tono neutro intermedio.'}};
const walls={warm:{name:'Marfil',color:'#e3ded3'},sand:{name:'Arena',color:'#c5b6a3'},sage:{name:'Salvia',color:'#a4ada0'}};
const handles={black:{name:'Negro',color:'#252923'},silver:{name:'Acero',color:'#aeb9bc'},brass:{name:'Latón',color:'#c39b56'}};
const options=$('.config-options');const selected=name=>$('input[name="'+name+'"]:checked',options).value;
let chosen=null;
function renderConfig(){const piece=selected('piece'),finish=finishes[selected('finish')],wall=walls[selected('wall')],handle=handles[selected('handle')],layout=selected('layout');const title=piece==='door'?'Puerta':'Armario';
 $('#door-scene').setAttribute('visibility',piece==='door'?'visible':'hidden');$('#wardrobe-scene').setAttribute('visibility',piece==='wardrobe'?'visible':'hidden');
 $$('.wood').forEach(el=>el.setAttribute('fill',finish.color));$$('.grain').forEach(el=>el.setAttribute('opacity',finish.grain?'1':'0'));$$('.hardware').forEach(el=>el.setAttribute('fill',handle.color));$('#wall').setAttribute('fill',wall.color);
 $('#door-lines').setAttribute('opacity',layout==='lined'?'.3':'0');$('#wardrobe-lines').setAttribute('d',layout==='lined'?'M310 50V360M210 50V360M410 50V360':'M310 50V360');
 $('#scene-label').textContent=title+' · '+finish.name;$('#scene').setAttribute('aria-label','Visualización esquemática: '+title+', '+finish.name+', pared '+wall.name+', herraje '+handle.name+', composición '+(layout==='lined'?'con líneas':'lisa'));
 $('#finish-info').textContent=finish.name+': '+finish.desc;return {piece,title,finish:finish.name,wall:wall.name,handle:handle.name,layout:layout==='lined'?'Con líneas':'Lisa'}}
options.addEventListener('change',renderConfig);
$('#reset-config').addEventListener('click',()=>{['piece','finish','wall','handle','layout'].forEach(n=>{$('input[name="'+n+'"]',options).checked=true});renderConfig()});
$$('.material-jump').forEach(a=>a.addEventListener('click',()=>{const radio=$('input[name="finish"][value="'+a.dataset.material+'"]',options);if(radio){radio.checked=true;const card=a.closest('.gallery-card');if(card&&card.dataset.category!=='detalle')$('input[name="piece"][value="'+(card.dataset.category==='armarios'?'wardrobe':'door')+'"]',options).checked=true;renderConfig()}}));
renderConfig();
// Project preparation tool. No data collection or persistence.
const projectType=$('#project-type'),projectCount=$('#project-count'),projectState=$('#project-state'),projectPriority=$('#project-priority'),summary=$('#project-summary'),copyStatus=$('#copy-status');
function renderSummary(){const count=Number(projectCount.value);let line=Number.isInteger(count)&&count>=1&&count<=50?count+' '+(count===1?'elemento':'elementos'):'Cantidad por determinar (1–50)';let parts=['Tipo: '+projectType.value,'Cantidad: '+line,'Situación: '+projectState.value,'Prioridad: '+projectPriority.value];if(chosen&&((chosen.piece==='door'&&projectType.selectedIndex===0)||(chosen.piece==='wardrobe'&&projectType.selectedIndex===1)))parts.push('Acabado orientativo: '+chosen.finish,'Pared: '+chosen.wall,'Herrajes: '+chosen.handle,'Composición: '+chosen.layout);parts.push('Ficha orientativa · confirmar medidas y disponibilidad.');summary.textContent=parts.join('\n');copyStatus.textContent='';return summary.textContent}
[projectType,projectCount,projectState,projectPriority].forEach(el=>el.addEventListener('input',renderSummary));projectType.addEventListener('change',()=>{if(chosen&&((chosen.piece==='door'&&projectType.selectedIndex!==0)||(chosen.piece==='wardrobe'&&projectType.selectedIndex!==1)))chosen=null;renderSummary()});
$('#use-config').addEventListener('click',()=>{chosen=renderConfig();projectType.selectedIndex=chosen.piece==='door'?0:1;renderSummary()});
$('#copy-summary').addEventListener('click',async()=>{const t=renderSummary();try{if(!navigator.clipboard||!window.isSecureContext)throw new Error('Clipboard unavailable');await navigator.clipboard.writeText(t);copyStatus.textContent='Resumen copiado.'}catch{const range=document.createRange();range.selectNodeContents(summary);const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);copyStatus.textContent='Texto seleccionado. Pulsa Ctrl+C o usa el menú de copia.'}});
renderSummary();
// Demo-only form. No named fields, no network calls, no browser storage.
const form=$('#demo-form'),formFields=$('#form-fields'),formStatus=$('#form-status'),message=$('#demo-message');
formFields.disabled=false;
form.addEventListener('submit',e=>{e.preventDefault();message.setCustomValidity('');if(message.value.trim().length<15)message.setCustomValidity('Escribe al menos 15 caracteres ficticios.');if(!form.reportValidity())return;form.reset();formStatus.textContent='Simulación completada. No se ha enviado, recopilado ni guardado ningún dato.';formStatus.focus()});
message.addEventListener('input',()=>message.setCustomValidity(''));
$$('[data-topic]').forEach(a=>a.addEventListener('click',()=>{$('#demo-topic').value=a.dataset.topic;formStatus.textContent=''}));
