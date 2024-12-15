import{a as S,i as m,S as v}from"./assets/vendor-D0cagnvz.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function a(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(t){if(t.ep)return;t.ep=!0;const s=a(t);fetch(t.href,s)}})();const E="47599452-88585afd800a8eb35bdc3af8b",q="https://pixabay.com/api/";async function p(e="",r=1){const a=new URLSearchParams({key:E,q:e,image_type:"photo",orientation:"horizontal",safesearch:"true",page:r,per_page:15});try{return(await S(`${q}?${a}`)).data}catch(o){throw new Error(o.response.statusText)}}function h(e){return e.map(({webformatURL:r,largeImageURL:a,tags:o,likes:t,views:s,comments:n,downloads:w})=>`
            <li class="gallery-item">
                <a class="gallery-link" href="${a}">
                    <img class="gallery-image" src="${r}" alt="${o}" />
                </a>
                <ul class="gallery-item-categories-menu">
                    <li class="gallery-item-categories-menu-item">
                        <p class="categories-item-title">Likes</p>
                        <p class="categories-item-count">${t}</p>
                    </li>
                    <li class="gallery-item-categories-menu-item">
                        <p class="categories-item-title">Views</p>
                        <p class="categories-item-count">${s}</p>
                    </li>
                    <li class="gallery-item-categories-menu-item">
                        <p class="categories-item-title">Comments</p>
                        <p class="categories-item-count">${n}</p>
                    </li>
                    <li class="gallery-item-categories-menu-item">
                        <p class="categories-item-title">Downloads</p>
                        <p class="categories-item-count">${w}</p>
                    </li>
                </ul>
            </li>
        `).join("")}function f(e){e.textContent="Loading images, please wait...",e.classList.remove("hidden")}function y(e){e.classList.add("hidden")}function P(){m.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"})}function R(){m.error({title:"Error",message:"An error occurred while fetching images. Please try again later.",position:"topRight"})}function $(){m.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})}const L=document.querySelector(".search-form"),M=document.querySelector(".search-input"),g=document.querySelector(".gallery"),d=document.querySelector(".loader"),i=document.querySelector(".load-more-btn");let u=1,c="",l=0;const b=new v(".gallery a",{captionsData:"alt",captionDelay:250});L.addEventListener("submit",H);i.addEventListener("click",O);async function H(e){if(e.preventDefault(),c=M.value.trim(),!c){m.error({title:"Error",message:"Please enter a keyword to search.",position:"topRight"});return}u=1,f(d),g.innerHTML="",l=0,i.disabled=!1,i.classList.add("hidden");try{const r=await p(c,u);if(!r.hits.length){P();return}g.innerHTML=h(r.hits),l=r.hits.length,b.refresh(),l<r.totalHits?i.classList.remove("hidden"):i.classList.add("hidden")}catch(r){console.error(r),R()}finally{y(d),L.reset()}}async function O(){u+=1,i.disabled=!0,i.classList.add("hidden"),f(d);try{const e=await p(c,u);g.insertAdjacentHTML("beforeend",h(e.hits)),l+=e.hits.length,b.refresh(),l>=e.totalHits?(i.classList.add("hidden"),$()):i.classList.remove("hidden");const a=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({left:0,top:a*2,behavior:"smooth"})}catch(e){alert(e.message)}finally{i.disabled=!1,y(d)}}
//# sourceMappingURL=index.js.map
