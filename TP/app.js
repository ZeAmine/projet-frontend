export default class App {
  constructor() {
    this.dom = {
      input: document.querySelector(".post"),
      submit: document.querySelector(".submitPost"),
      message: document.querySelector(".message"),
    };

    this.init();
    this.bindEvents();
    this.getData();
  }

  init() {
    this.getData();
  }

  bindEvents() {
    this.dom.submit.addEventListener("click", this.onClick.bind(this));
    // this.dom.input.addEventListener("input", this.eventInput.bind(this));
  }

  getData() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => this.displayData(json));
  }

  displayData(data) {
    data.map((element) => {
      this.dom.message.innerHTML = element.title;
    });
  }

  onClick() {
    const value = this.dom.input.value;
    this.dom.message.innerHTML = value;
  }
}

new App();

// // 1.
// let value = "";

// function eventInput(event) {}

// elInput.addEventListener("input", eventInput);

// // 2.
// function onClick(event) {}

// elSubmit.addEventListener("click", onClick);
