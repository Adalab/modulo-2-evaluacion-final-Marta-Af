const v=document.querySelector(".js_btn"),g=document.querySelector(".js_form"),a=document.querySelector(".js_listCard"),u=document.querySelector(".js_sectionFavourite");document.querySelector(".js_chromesFavourites");const m=document.querySelector(".js_liFavourites"),_=document.querySelector(".js_ResetAll");let c=[],n=[];function p(e){const t=e.currentTarget,o=t.dataset.id,l=c.find(s=>s._id===parseInt(o)),i=n.findIndex(s=>s._id===parseInt(o));i===-1?n.push(l):n.splice(i,1),t.classList.toggle("favourite"),localStorage.setItem("favouriteData",JSON.stringify(n)),r(),u.classList.remove("hidden")}v.addEventListener("click",e=>{e.preventDefault();const t=g.querySelector("input").value;fetch(`//api.disneyapi.dev/character?name=${t}`).then(o=>o.json()).then(o=>{c=o.data,a.innerHTML="",f(),console.log(c)})});function S(e){e.imageUrl===void 0?a.innerHTML+=`
        <li class="chrome js_oneChrome" data-id="${e._id}">
          <img class="photo" src="https://via.placeholder.com/210x295/ffffff/555555/?text=Disney" alt="" />
          <h3>${e.name}</h3>
        </li>
      `:a.innerHTML+=`
        <li class="chrome js_oneChrome" data-id="${e._id}">
          <img class="photo" src="${e.imageUrl}" alt="" />
          <h3>${e.name}</h3>
        </li>
      `}function f(){for(let t=0;t<c.length;t++)S(c[t]);const e=document.querySelectorAll(".js_oneChrome");for(const t of e)t.addEventListener("click",p)}function j(e){m.innerHTML+=`<li class="chrome js_oneChrome" data-id="${e._id}">
    <button class="btnStar js_btnReset" data-id="${e._id}">&times;</button>
      <img class="photo" src="${e.imageUrl}" alt="" />
      <h3>${e.name}</h3>
    </li>`}function r(){m.innerHTML="";for(let t=0;t<n.length;t++)j(n[t]);document.querySelectorAll(".js_btnReset").forEach(t=>{t.addEventListener("click",o=>{const i=o.currentTarget.dataset.id;console.log(i);const s=n.findIndex(h=>h._id===parseInt(i));console.log(s),n.splice(s,1),r(),localStorage.setItem("favouriteData",JSON.stringify(n)),r()})}),_.addEventListener("click",t=>{n.splice(0,n.length),localStorage.removeItem("favouriteData"),r()})}fetch("//api.disneyapi.dev/character").then(e=>e.json()).then(e=>{c=e.data,f()});const d=localStorage.getItem("favouriteData");d&&(n=JSON.parse(d),u.classList.remove("hidden"),r());
//# sourceMappingURL=main.js.map
