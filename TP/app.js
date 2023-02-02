export default class App {
  constructor() {
    this.dom = {
      input: document.querySelector(".post"),
      submit: document.querySelector(".submitPost"),
      message: document.querySelector(".message"),
      select: document.querySelector(".user_select"),
      posts: document.querySelector(".content_posts"),
    };

    this.value = "0";
    this.dataArray = [];
    this.posts = [];

    this.init();
    this.bindEvents();
  }

  init() {
    this.getData();
    // this.getPostByUser();
  }

  getData() {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => this.displayData(json));
  }

  displayData(data) {
    this.dataArray = data;
  }

  bindEvents() {
    this.dom.submit.addEventListener("click", this.onClick.bind(this));
  }

  onClick() {
    this.value = this.dom.input.value;

    this.dom.posts.innerHTML = "";
    this.displayPost(this.value);
  }

  displayPost(value) {
    for (let i = 0; i < parseInt(value); i++) {
      this.posts[i] = this.dataArray[i];
    }

    this.posts.map((element) => {
      const p = document.createElement("p");
      p.innerHTML = element.title;
      this.dom.posts.appendChild(p);
    });
  }
}

new App();

// data.map((element) => {
//   const option = document.createElement("option");
//   option.innerHTML = element.name;
//   option.value = element.id;
//   this.dom.select.appendChild(option);
// });
// const options = Array.from(document.querySelectorAll("option"));
// options.forEach((element) => {
//   element.addEventListener("mouseenter", (e) => console.log(element.value));
// });
