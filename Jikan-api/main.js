const url="https://api.jikan.moe/v3";


function searchAnime(event) {
    event.preventDefault()
    const form=new FormData(this)
    const query=form.get("search")
    console.log(query);
    
      fetch(`${url}/search/anime?q=${query}&page=1`)
    .then(e=>e.json())
    .then(updateDom)
    .catch(e=>console.warn(e.message))
}
 function updateDom(data) {

    const searchresults=document.getElementById('search-results');
    const animeByCatergories=data.results
    .reduce((acc,anime)=>{
      const {type}=anime;
      if(acc[type]===undefined) acc[type]=[]
      acc[type].push(anime)
      return acc

    },{})




    
    
    searchresults.innerHTML=Object.keys(animeByCatergories).map(key=>{
     const animesHTML=animeByCatergories[key]
     .sort((a,b)=>a.episodes-b.episodes)
    .map(anime => {
         return `
         
         
         <div class="col s12 m7">
           <div class="card">
             <div class="card-image">
               <img src="${anime.image_url}">
               
             </div>
             <div class="card-content">
             <span class="card-title">${anime.title}</span>
               <p>"${anime.synopsis}"</p>
             </div>
             <div class="card-action">
               <a href="${anime.url}">Find more!</a>
             </div>
           </div>
         </div>
      
                 
         
         
         
         
         `
         
     }).join("");   
   return `
   <section>
   <h3>${key.toUpperCase()}</h3>
   <div  class="kemicofa-row">${animesHTML}</div>
    </section>`






    }).join("")
        
                          
       
   
     


     
    
 }
function pageloaded() {
    const form=document.getElementById('search_form')
    form.addEventListener('submit',searchAnime)
}

window.addEventListener('load',pageloaded)