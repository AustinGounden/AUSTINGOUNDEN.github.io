// Loads data/cv.json, renders every section, then starts the motion layer.
import { initEffects } from './effects.js';

let CV;
try {
  CV = await (await fetch('data/cv.json')).json();
} catch (err) {
  document.body.insertAdjacentHTML('afterbegin',
    '<p style="padding:110px 20px;font-family:monospace">Could not load data/cv.json. Run <b>python3 tools/serve.py</b> or deploy to GitHub Pages.</p>');
  throw err;
}
CV.footer += ' ' + new Date().getFullYear();


const $=s=>document.querySelector(s), S=CV.sections;
document.title=CV.name+" | Portfolio";
$('#name').textContent=CV.name; $('#nameJP').textContent=CV.nameJP; $('#tagline').textContent=CV.tagline;
$('#b1').textContent=S.projects[0]; $('#b2').textContent=S.contact[0]; $('#foot').textContent=CV.footer;

// Pixel sun
(function(){let h='';for(let y=0;y<16;y++)for(let x=0;x<16;x++){const d=Math.hypot(x-7.5,y-7.5);
 if(d<7.6)h+=`<rect x="${x}" y="${y}" width="1" height="1" fill="${d<4?'#ff5a73':d<6?'#d6203f':'#7a2a9a'}"/>`}$('#sun').innerHTML=h})();

const card=(c,x)=>`<div class="card rv ${c||''}">${x}</div>`;
const sec=(id,body)=>`<section class="s" id="${id}"><div class="h rv"><h2>${S[id][0]}</h2><span>${S[id][1]}</span></div>${body}</section>`;
$('#main').innerHTML=
 sec('about',`<div class="rv">${CV.about.map(p=>`<p>${p}</p>`).join('')}</div><div class="stats">${CV.stats.map(s=>card('',`<b>${s.value}</b>${s.label}`)).join('')}</div>`)+
 sec('skills',`<div class="card rv">${CV.skills.map(k=>`<div class="skill"><div><span>${k.name}</span><span>${k.level}/10</span></div><div class="bar">${Array.from({length:10},(_,i)=>`<i class="${i<k.level?'f':''}" style="--n:${i}"></i>`).join('')}</div></div>`).join('')}</div>`)+
 sec('experience',CV.experience.map(e=>`<div class="quest rv"><h3>${e.role}</h3><em>${e.company} | ${e.period}</em><ul>${e.points.map(p=>`<li>${p}</li>`).join('')}</ul></div>`).join(''))+
 sec('projects',`<div class="grid">${CV.projects.map(p=>card('proj',`<h3>${p.title}</h3><p>${p.desc}</p><div class="tags">${p.tags.map(t=>`<span>${t}</span>`).join('')}</div>${p.link?`<p><a href="${p.link}" target="_blank" rel="noopener">View project</a></p>`:''}`)).join('')}</div>`)+
 sec('education',`<div class="grid">${CV.education.map(e=>card('',`<h3 style="font-size:13px">${e.degree}</h3><p>${e.school}<br><em style="color:var(--muted)">${e.period}</em></p>`)).join('')}</div>`)+
 sec('contact',`<div class="rv"><a class="btn" href="mailto:${CV.contact.email}">${CV.contact.email}</a>${CV.contact.links.map(l=>`<a class="btn alt" href="${l.url}" target="_blank" rel="noopener">${l.label}</a>`).join('')}</div>`);

$('#nav').innerHTML=Object.keys(S).map(k=>`<a href="#${k}" data-k="${k}">${S[k][0]}<small>${S[k][1]}</small></a>`).join('');

// Typewriter
(function(){const el=$('#role');let r=0,c=0,del=false;
 (function t(){const w=CV.roles[r];el.firstChild&&el.removeChild(el.firstChild);
  el.insertBefore(document.createTextNode(w.slice(0,c)),el.firstChild);
  if(!del&&c===w.length){del=true;return setTimeout(t,1400)}
  if(del&&c===0){del=false;r=(r+1)%CV.roles.length}
  c+=del?-1:1;setTimeout(t,del?35:80)})()})();

// Scroll reveal and active nav
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vis');io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll('.rv').forEach((e,i)=>{e.style.transitionDelay=(i%4)*60+'ms';io.observe(e)});
const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)document.querySelectorAll('nav a').forEach(a=>a.classList.toggle('on',a.dataset.k===e.target.id))}),{rootMargin:'-40% 0px -55% 0px'});
document.querySelectorAll('section.s').forEach(s=>so.observe(s));

// Falling sakura pixels
const N=innerWidth<700?8:16;for(let i=0;i<N;i++){const p=document.createElement('div');p.className='petal';
 p.style.left=Math.random()*100+'vw';p.style.setProperty('--dx',(Math.random()*160-80)+'px');
 p.style.animationDuration=8+Math.random()*10+'s';p.style.animationDelay=-Math.random()*14+'s';
 p.style.opacity=.35+Math.random()*.4;if(Math.random()<.35)p.style.background='#b18cff';document.body.appendChild(p)}

initEffects(CV, $);
