customElements.define('rating-widget', class extends HTMLElement {

  constructor () {
    super();

    this.innerHTML = '';
    this.stare = document.createElement('input');
    this.appendChild(this.stars)
    
  }

  updateStars(){
    
  }




}
