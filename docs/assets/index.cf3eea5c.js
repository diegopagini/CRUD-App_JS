(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerpolicy&&(r.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?r.credentials="include":s.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();const L="/assets/javascript.8dac5379.svg";class y{constructor({id:t,isActive:n,balance:a,avatar:s,firstName:r,lastName:c,gender:m}){this.id=t,this.isActive=n,this.balance=a,this.avatar=s,this.firstName=r,this.lastName=c,this.gender=m}}const g=e=>{const{avatar:t,balance:n,first_name:a,gender:s,id:r,isActive:c,last_name:m}=e;return new y({avatar:t,balance:n,firstName:a,gender:s,id:r,isActive:c,lastName:m})},p=async(e=1)=>{const t=`${{BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0}.VITE_BASE_URL}/users?_page=${e}`;return(await(await fetch(t)).json()).map(g)},o={currentPage:0,users:[]},P=async()=>{const e=await p(o.currentPage+1);e.length!==0&&(o.currentPage+=1,o.users=e)},b=async()=>{if(o.currentPage===1)return;const e=await p(o.currentPage-1);o.users=e,o.currentPage-=1},w=e=>{let t=!1;o.users=o.users.map(n=>n.id===e.id?(t=!0,e):n),o.users.length<10&&!t&&o.users.push(e)},N=async()=>{const e=await p(o.currentPage);if(e.length===0){await b();return}o.users=e},l={loadNextPage:P,loadPreviousPage:b,onUserChanged:w,reloadPage:N,getUsers:()=>[...o.users],getCurrentPage:()=>o.currentPage},S=`<div class="modal-dialog">
  <form novalidate>
    <span>User</span>
    <input type="text" name="firstName" placeholder="First Name" />
    <input type="text" name="lastName" placeholder="Last Name" />
    <input type="number" name="balance" placeholder="Balance" />

    <div>
      <input type="checkbox" id="is-active" name="isActive" checked />
      <label for="is-active">is active?</label>
    </div>

    <button type="submit">Save</button>
  </form>
</div>
`,T=async e=>{const t=`${{BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0}.VITE_BASE_URL}/users/${e}`,a=await(await fetch(t)).json();return g(a)};let i,d,h={};const E=async e=>{if(i==null||i.classList.remove("hide-modal"),h={},!e)return;const t=await T(e);A(t)},v=()=>{i==null||i.classList.add("hide-modal"),d==null||d.reset()},A=e=>{d.querySelector('[name="firstName"]').value=e.firstName,d.querySelector('[name="lastName"]').value=e.lastName,d.querySelector('[name="balance"]').value=e.balance,d.querySelector('[name="isActive"]').checked=e.isActive,h=e},U=(e,t)=>{i||(i=document.createElement("div"),i.innerHTML=S,i.className="modal-container hide-modal",d=i.querySelector("form"),i.addEventListener("click",n=>{n.target.className==="modal-container"&&v()}),d.addEventListener("submit",async n=>{n.preventDefault();const a=new FormData(d),s={...h};for(const[r,c]of a){if(r==="balance"){s[r]=+c;continue}if(r==="isActive"){s[r]=c==="on";continue}s[r]=c}await t(s),v()}),e.append(i))},B=async e=>{const t=`${{BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0}.VITE_BASE_URL}/users/${e}`,a=await(await fetch(t,{method:"DELETE"})).json();return console.log({deleteResult:a}),!0};let u;const D=()=>{const e=document.createElement("table"),t=document.createElement("thead");t.innerHTML=`
        <tr>
            <th>#ID</th>
            <th>Balance</th>
            <th>FistName</th>
            <th>LastName</th>
            <th>Active</th>
            <th>Actions</th>
        </tr>
    `;const n=document.createElement("tbody");return e.append(t,n),e},_=e=>{const t=e.target.closest(".select-user");if(!t)return;const n=t.getAttribute("data-id");E(n)},$=async e=>{const t=e.target.closest(".delete-user");if(!t)return;const n=t.getAttribute("data-id");try{await B(n),await l.reloadPage(),document.querySelector("#current-page").innerText=l.getCurrentPage(),f()}catch(a){console.log(a),alert("No se pudo eliminar")}},f=e=>{const t=l.getUsers();u||(u=D(),e.append(u),u.addEventListener("click",_),u.addEventListener("click",$));let n="";t.forEach(a=>{n+=`
            <tr>
                <td>${a.id}</td>
                <td>${a.balance}</td>
                <td>${a.firstName}</td>
                <td>${a.lastName}</td>
                <td>${a.isActive}</td>
                <td>
                    <a href="#/" class="select-user" data-id="${a.id}">Select</a>
                    |
                    <a href="#/" class="delete-user" data-id="${a.id}">Delete</a>
                </td>
            </tr>
        `}),u.querySelector("tbody").innerHTML=n};const M=e=>{const t=document.createElement("button");t.innerText=" Next >";const n=document.createElement("button");n.innerText="< Prev ";const a=document.createElement("span");a.id="current-page",a.innerText=l.getCurrentPage(),e.append(n,a,t),t.addEventListener("click",async()=>{await l.loadNextPage(),a.innerText=l.getCurrentPage(),f(e)}),n.addEventListener("click",async()=>{await l.loadPreviousPage(),a.innerText=l.getCurrentPage(),f(e)})};const O=e=>{const t=document.createElement("button");t.innerText="+",t.classList.add("fab-button"),e.append(t),t.addEventListener("click",()=>{E()})},R=e=>{const{avatar:t,balance:n,firstName:a,gender:s,id:r,isActive:c,lastName:m}=e;return{avatar:t,balance:n,first_name:a,gender:s,id:r,isActive:c,last_name:m}},x=async e=>{const t=new y(e);if(!t.firstName||!t.lastName)throw"First & last name are required";const n=R(t);let a;return t.id?a=await V(n):a=await k(n),g(a)},k=async e=>{const t=`${{BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0}.VITE_BASE_URL}/users`,a=await(await fetch(t,{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}})).json();return console.log({newUser:a}),a},V=async e=>{const t=`${{BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0}.VITE_BASE_URL}/users/${e.id}`,a=await(await fetch(t,{method:"PATCH",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}})).json();return console.log({updatedUser:a}),a},q=async e=>{e.innerHTML="Loading...",await l.loadNextPage(),e.innerHTML="",f(e),M(e),O(e),U(e,async t=>{const n=await x(t);l.onUserChanged(n),f()})};document.querySelector("#app").innerHTML=`
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${L}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1 id="app-title">Hello Vite!</h1>
    <div class="card">
      
    </div>
    
  </div>
`;const H=document.querySelector(".card");q(H);
