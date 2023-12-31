class ratingWidget extends HTMLElement {

  constructor () {
    super();

    this.innerHTML = '';
    const shadow = this.attachShadow({mode: 'open'});
    const template = document.createElement('template');
    template.innerHTML = `
      <style>
      .stars {
        display: inline;
      }

      .stars a {
          opacity: 40%;
          font-size: 2rem;
          cursor: pointer;
      }

      .stars:hover a{
        opacity: 100%;
      }

      .stars a:hover{
        opacity: 100%;
      } 

      .stars a:hover ~ a{
        opacity: 40%;
      }
      </style>
      
       <div class=stars >
       <a>★</a>
       <a>★</a>
       <a>★</a>
      <a>★</a>
      <a>★</a>
      </div>
    `
   
    
    shadow.appendChild(template.content.cloneNode(true));
    
    const allStars = shadow.querySelector("div");
    const stars = shadow.querySelectorAll(".stars a");
    let rating = 0;
    
    
   stars.forEach((stars, idx) => {
        stars.addEventListener('click', () => {
          rating = `${idx+1}`;
          if(idx > 2){
            allStars.textContent = `Thanks for the ${idx + 1} star rating!`; 
            (async () => {
              const rawResponse = await fetch('https://httpbin.org/post', {
                method: 'POST',
                sentBy: 'JS',
                headers: {
                    'x-Sent-By': 'JS',
                },
                body: JSON.stringify({rating: rating})
              });
         const content = await rawResponse.json();

         console.log(content);
        })();
    

          };
          if(idx < 3){
            allStars.textContent = `Thanks for your feedback of ${idx + 1} stars. We will             try and do better!`;
            (async () => {
              const rawResponse = await fetch('https://httpbin.org/post', {
                method: 'POST',
                sentBy: 'JS',
                headers: {
                    'x-Sent-By': 'JS',
                },
                body: JSON.stringify({rating: rating})
              });
         const content = await rawResponse.json();

         console.log(content);
        })();
          };
        });
              
    });
      
    
   }
}
    
    
customElements.define('rating-widget', ratingWidget);  
    
