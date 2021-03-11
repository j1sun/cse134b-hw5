class ExperienceCard extends HTMLElement {
  constructor() {
    super();
    const template = document.querySelector('#experience-card-template').content;
    const shadowRoot = this.attachShadow({ mode: 'open' }).appendChild(template.cloneNode(true));
  }

  connectedCallback() {
    // Insert picture into card
    let figure = this.shadowRoot.querySelector('figure');
    let picture = this.querySelector('picture');
    figure.insertBefore(picture, figure.firstChild);

    this.updateAttributes();
  }

  updateAttributes() {
    let shadow = this.shadowRoot;

    let projectSrc = this.dataset.project;
    shadow.querySelector('.primary-btn').setAttribute('href', projectSrc);

    let githubSrc = this.dataset.github;
    shadow.querySelector('.secondary-btn').setAttribute('href', githubSrc);
  }
}

customElements.define('experience-card', ExperienceCard);