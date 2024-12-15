import{S as w,i as c,a as b}from"./assets/vendor-D0cagnvz.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();const p=document.querySelector(".search-form"),S=document.querySelector(".search-input"),d=document.querySelector(".gallery"),m=document.querySelector(".loader"),u=document.querySelector(".load-more-btn");p.addEventListener("submit",$);u.addEventListener("click",M);const v="47599452-88585afd800a8eb35bdc3af8b",P="https://pixabay.com/api/";let g=1,l="",n=0;const h=new w(".gallery a",{captionsData:"alt",captionDelay:250});async function f(s="",t=1){const i=new URLSearchParams({key:v,q:s,image_type:"photo",orientation:"horizontal",safesearch:"true",page:t,per_page:15});try{const o=await b(`${P}?${i}`);return console.log(o),o.data}catch{throw new Error(res.statusText)}}async function $(s){if(s.preventDefault(),l=S.value.trim(),!l){c.error({title:"Error",message:"Please enter a keyword to search.",position:"topRight"});return}q(),d.innerHTML="",g=1,n=0;try{const t=await f(l);if(!t.hits.length){c.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}d.innerHTML=y(t.hits),n=t.hits.length,h.refresh(),console.log(t.hits),console.log(t.totalHits),n<t.totalHits?u.classList.remove("hidden"):u.classList.add("hidden")}catch(t){console.error(t),c.error({title:"Error",message:"An error occurred while fetching images. Please try again later.",position:"topRight"})}finally{E(),p.reset()}}function y(s){return s.map(({webformatURL:t,largeImageURL:i,tags:o,likes:e,views:r,comments:a,downloads:L})=>`
            <li class="gallery-item">
                <a class="gallery-link" href="${i}">
                    <img
                        class="gallery-image"
                        src="${t}"
                        alt="${o}"
                    />
                </a>
                <ul class="gallery-item-categories-menu">
                    <li class="gallery-item-categories-menu-item">
                        <p class="categories-item-title">Likes</p>
                        <p class="categories-item-count">${e}</p>
                    </li>
                    <li class="gallery-item-categories-menu-item">
                        <p class="categories-item-title">Views</p>
                        <p class="categories-item-count">${r}</p>
                    </li>
                    <li class="gallery-item-categories-menu-item">
                        <p class="categories-item-title">Comments</p>
                        <p class="categories-item-count">${a}</p>
                    </li>
                    <li class="gallery-item-categories-menu-item">
                        <p class="categories-item-title">Downloads</p>
                        <p class="categories-item-count">${L}</p>
                    </li>
                </ul>
            </li>
        `).join("")}function q(){m.textContent="Loading images, please wait...",m.classList.remove("hidden")}function E(){m.classList.add("hidden")}async function M(){g+=1;try{const s=await f(l,g);d.insertAdjacentHTML("beforeend",y(s.hits)),n+=s.hits.length,h.refresh(),n>=s.totalHits&&(u.classList.add("hidden"),c.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch(s){alert(s.message)}}
//# sourceMappingURL=index.js.map
