// Motion layer: parallax, scroll progress, marquee, count-up, tilt, trail and click sparks
export function initEffects(CV,$){
const fine=matchMedia('(pointer:fine)').matches,calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
const hero=$('#top'),nav=$('#nav'),prog=document.createElement('div');prog.id='prog';document.body.appendChild(prog);
const ind=document.createElement('span');ind.id='ind';nav.appendChild(ind);
function place(){const a=nav.querySelector('a.on');ind.style.width=a?a.offsetWidth+'px':'0';if(a)ind.style.left=a.offsetLeft+'px'}
new MutationObserver(place).observe(nav,{subtree:true,attributes:true,attributeFilter:['class']});addEventListener('resize',place);
let mx=0,my=0,tx=0,ty=0;addEventListener('pointermove',e=>{tx=e.clientX/innerWidth-.5;ty=e.clientY/innerHeight-.5},{passive:true});
(function tick(){const sy=Math.min(scrollY,innerHeight*1.2);mx+=(tx-mx)*.06;my+=(ty-my)*.06;
 if(!calm){hero.style.setProperty('--mx',mx.toFixed(3));hero.style.setProperty('--my',my.toFixed(3));hero.style.setProperty('--sy',sy.toFixed(1))}
 const h=document.documentElement.scrollHeight-innerHeight;prog.style.transform='scaleX('+(h>0?scrollY/h:0)+')';requestAnimationFrame(tick)})();
const nm=$('#name');nm.setAttribute('aria-label',CV.name);nm.innerHTML=[...CV.name].map((c,i)=>`<span style="--i:${i}" aria-hidden="true">${c===' '?'&nbsp;':c}</span>`).join('');
const items=CV.skills.map(s=>s.name).concat(['侍','桜','浪人']).flatMap(x=>[`<span>${x}</span>`,'<span class="d">◆</span>']).join('');
const mq=document.createElement('div');mq.className='marq';mq.setAttribute('aria-hidden','true');mq.innerHTML=`<div class="track">${items.repeat(8)}</div>`;hero.after(mq);
document.querySelectorAll('.stats b').forEach(b=>{const m=b.textContent.match(/^(\D*)(\d+)(.*)$/);if(!m)return;const pre=m[1],n=+m[2],suf=m[3];b.textContent=pre+'0'+suf;
 new IntersectionObserver((es,o)=>{if(!es[0].isIntersecting)return;o.disconnect();if(calm){b.textContent=pre+n+suf;return}const t0=performance.now();(function f(t){const p=Math.min(1,(t-t0)/1200);b.textContent=pre+Math.round(n*(1-Math.pow(1-p,3)))+suf;if(p<1)requestAnimationFrame(f)})(t0)},{threshold:.6}).observe(b)});
if(calm)return;
const spark=(x,y,tx,ty,c)=>{const d=document.createElement('div');d.className='tr';d.style.cssText=`left:${x-4}px;top:${y-4}px;background:${c};--tx:${tx}px;--ty:${ty}px`;document.body.appendChild(d);setTimeout(()=>d.remove(),650)};
document.addEventListener('click',e=>{for(let i=0;i<10;i++){const a=Math.random()*6.28,r=20+Math.random()*30;spark(e.clientX,e.clientY,Math.cos(a)*r,Math.sin(a)*r,i%2?'#ff5a73':'#b18cff')}});
if(!fine)return;
let lt=0,ci=0;addEventListener('pointermove',e=>{const n=performance.now();if(n-lt<38)return;lt=n;spark(e.clientX,e.clientY,(Math.random()-.5)*24,10+Math.random()*18,ci++%3?'#ff5a73':'#b18cff')},{passive:true});
document.querySelectorAll('.card').forEach(c=>{c.addEventListener('pointerenter',()=>c.style.transitionDelay='0s');
 c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;c.style.setProperty('--gx',x*100+'%');c.style.setProperty('--gy',y*100+'%');c.style.transform=`perspective(700px) rotateX(${(.5-y)*7}deg) rotateY(${(x-.5)*9}deg) translateY(-4px)`});
 c.addEventListener('pointerleave',()=>c.style.transform='')});
document.querySelectorAll('.btn').forEach(b=>{b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();b.style.translate=((e.clientX-r.left-r.width/2)*.18)+'px '+((e.clientY-r.top-r.height/2)*.28)+'px'});b.addEventListener('pointerleave',()=>b.style.translate='')});
}
