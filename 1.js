/* GÕ CHỮ HEADER */
const text = "BÁO TƯỜNG TRẢI NGHIỆM";
let i = 0;
const title = document.getElementById("title");
title.innerHTML = "";

function typeTitle() {
    if (i < text.length) {
        title.innerHTML += text[i];
        i++;
        setTimeout(typeTitle, 80);
    }
}
typeTitle();

/* HIỆN SECTION KHI CUỘN */
const sections = document.querySelectorAll(".news-section");
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.2 });

sections.forEach(sec => observer.observe(sec));

/* HOA RƠI ỔN ĐỊNH */
const hoaContainer = document.getElementById("hoa-roi");
const hoaIcons = ["🌸", "🍃", "🌼"];

function taoHoa() {
    const hoa = document.createElement("div");
    hoa.className = "flower";
    hoa.innerText = hoaIcons[Math.floor(Math.random() * hoaIcons.length)];
    hoa.style.left = Math.random() * window.innerWidth + "px";
    hoa.style.animationDuration = 6 + Math.random() * 4 + "s";
    hoa.style.opacity = Math.random();
    hoaContainer.appendChild(hoa);

    setTimeout(() => hoa.remove(), 10000);
}

setInterval(taoHoa, 400);
/* ===== COMMENT ULTRA LOGIC ===== */
const wall = document.getElementById('commentWall');
const btn = document.getElementById('sendBtn');
const KEY = 'ultra_comments';

const load = () => {
  const data = JSON.parse(localStorage.getItem(KEY)||'[]');
  data.forEach(addCard);
};
const save = (arr)=>localStorage.setItem(KEY, JSON.stringify(arr));

const addCard = (c) => {
  const card = document.createElement('div');
  card.className='c-card';
  card.innerHTML=`
    <div class="c-head">
      <div class="c-ava">${c.name[0].toUpperCase()}</div>
      <div>
        <div class="c-name">${c.name}</div>
        <div class="c-time">${c.time}</div>
      </div>
    </div>
    <div class="c-text">${c.text}</div>
    <div class="c-react">
      <button data-k="love">❤️ <b>${c.love||0}</b></button>
      <button data-k="like">👍 <b>${c.like||0}</b></button>
      <button data-k="star">🌟 <b>${c.star||0}</b></button>
    </div>`;
  card.querySelectorAll('.c-react button').forEach(b=>{
    b.onclick=()=>{
      c[b.dataset.k]=(c[b.dataset.k]||0)+1;
      b.querySelector('b').innerText=c[b.dataset.k];
      persist(c.id,c);
    }
  });
  wall.prepend(card);
};

const persist=(id, nc)=>{
  const arr=JSON.parse(localStorage.getItem(KEY)||'[]');
  const i=arr.findIndex(x=>x.id===id);
  if(i>-1){arr[i]=nc; save(arr);}
};

btn.onclick=()=>{
  const name=cname.value.trim(), text=ctext.value.trim();
  if(!name||!text) return;
  const c={id:Date.now(),name,text,time:new Date().toLocaleString('vi-VN'),love:0,like:0,star:0};
  const arr=JSON.parse(localStorage.getItem(KEY)||'[]');
  arr.push(c); save(arr); addCard(c);
  cname.value=''; ctext.value='';
  // confetti nhẹ
  for(let i=0;i<14;i++){
    const s=document.createElement('span');
    s.textContent=['✨','💫','🌟'][i%3];
    s.style.cssText=`position:fixed;left:${50+Math.random()*20}vw;top:60vh;
      animation:conf 1.2s linear forwards;`;
    document.body.appendChild(s); setTimeout(()=>s.remove(),1200);
  }
};

const style=document.createElement('style');
style.innerHTML=`@keyframes conf{to{transform:translateY(-120px);opacity:0}}`;
document.head.appendChild(style);

load();
