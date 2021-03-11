class ProjectCard extends HTMLElement {
  constructor() {
    super();
    const template = document.querySelector('#project-card-template').content;
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

    let date = this.dataset.date;
    shadow.querySelector('time').setAttribute('datetime', date);

    let projectSrc = this.dataset.project;
    shadow.querySelector('.primary-btn').setAttribute('href', projectSrc);

    let githubSrc = this.dataset.github;
    shadow.querySelector('.secondary-btn').setAttribute('href', githubSrc);
  }
}

customElements.define('project-card', ProjectCard);