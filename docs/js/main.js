const v=document.querySelector(".js_btn"),g=document.querySelector(".js_form"),r=document.querySelector(".js_listCard"),u=document.querySelector(".js_sectionFavourite");document.querySelector(".js_chromesFavourites");const m=document.querySelector(".js_liFavourites"),_=document.querySelector(".js_ResetAll");let a=[],n=[];function p(e){const t=e.currentTarget,o=t.dataset.id,l=a.find(s=>s._id===parseInt(o)),c=n.findIndex(s=>s._id===parseInt(o));c===-1?n.push(l):n.splice(c,1),t.classList.toggle("favourite"),localStorage.setItem("favouriteData",JSON.stringify(n)),i(),u.classList.remove("hidden")}v.addEventListener("click",e=>{e.preventDefault();const t=g.querySelector("input").value;fetch(`//api.disneyapi.dev/character?name=${t}`).then(o=>o.json()).then(o=>{a=o.data,r.innerHTML="",f(),console.log(a)})});function S(e){e.imageUrl===void 0?r.innerHTML+=`
        <li class="chrome js_oneChrome" data-id="${e._id}">
          <img class="photo" src="https://via.placeholder.com/210x295/ffffff/555555/?text=Disney" alt="" />
          <h3 class="name">${e.name}</h3>
        </li>
      `:r.innerHTML+=`
        <li class="chrome js_oneChrome" data-id="${e._id}">
          <img class="photo" src="${e.imageUrl}" alt="" />
          <h3 class="name">${e.name}</h3>
        </li>
      `}function f(){for(let t=0;t<a.length;t++)S(a[t]);const e=document.querySelectorAll(".js_oneChrome");for(const t of e)t.addEventListener("click",p)}function j(e){m.innerHTML+=`<li class="chrome js_oneChrome" data-id="${e._id}">
    <button class="btnStar js_btnReset" data-id="${e._id}">&times;</button>
      <img class="photo" src="${e.imageUrl}" alt="" />
      <h3 class="name">${e.name}</h3>
    </li>`}function i(){m.innerHTML="";for(let t=0;t<n.length;t++)j(n[t]);document.querySelectorAll(".js_btnReset").forEach(t=>{t.addEventListener("click",o=>{const c=o.currentTarget.dataset.id;console.log(c);const s=n.findIndex(h=>h._id===parseInt(c));console.log(s),n.splice(s,1),i(),localStorage.setItem("favouriteData",JSON.stringify(n)),i()})}),_.addEventListener("click",t=>{n.splice(0,n.length),localStorage.removeItem("favouriteData"),i()})}fetch("//api.disneyapi.dev/character").then(e=>e.json()).then(e=>{a=e.data,f()});const d=localStorage.getItem("favouriteData");d&&(n=JSON.parse(d),u.classList.remove("hidden"),i());
//# sourceMappingURL=main.js.map
