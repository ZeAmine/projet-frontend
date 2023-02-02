export default class App {
  constructor() {
    this.dom = {
      input: document.querySelector(".input_post"),
      submitPost: document.querySelector(".submit_post"),
      select: document.querySelector(".user_select"),
      title: document.querySelector(".content_title"),
      posts: document.querySelector(".content_posts"),
      submitNumber: document.querySelector(".submit_number"),
      textNumber: document.querySelector(".number_result"),
      textAverage: document.querySelector(".number_average"),
    };

    this.value = "0";
    this.dataArray = [];
    this.posts = [];
    this.titlePosts = [];

    this.init();
    this.bindEvents();
  }

  init() {
    this.getData();
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
    this.dom.submitPost.addEventListener("click", this.onClick.bind(this));
    this.dom.submitNumber.addEventListener(
      "click",
      this.onClickNumber.bind(this)
    );
  }

  onClick() {
    this.value = this.dom.input.value;

    this.count = 0;
    this.total = 0;
    this.average = 0;

    this.dom.posts.innerHTML = "";
    this.displayPost(this.value);
  }

  onClickNumber() {
    this.dom.textNumber.innerHTML = "";
    this.displayNumber();
  }

  displayPost(value) {
    if (value < this.posts.length) {
      this.posts = [];
      this.titlePosts = [];

      for (let i = 0; i < parseInt(value); i++) {
        this.posts[i] = this.dataArray[i];
      }
    } else {
      this.titlePosts = [];

      for (let i = 0; i < parseInt(value); i++) {
        this.posts[i] = this.dataArray[i];
      }
    }

    this.posts.map((element) => {
      const p = document.createElement("p");
      p.innerHTML = `${element.id} - ${element.title}`;
      this.dom.posts.appendChild(p);
      this.titlePosts.push(p);
    });
  }

  displayNumber() {
    this.titlePosts.map((element) => {
      for (let j = 0; j < element.innerHTML.length; j++) {
        if (element.innerHTML[j] === "e") {
          this.count++;
        }
      }

      this.total += this.count;
    });

    this.average = this.total / this.value;

    this.dom.textNumber.innerHTML =
      "Il y a " + this.total + " 'e' dans les titres des posts";

    this.dom.textAverage.innerHTML =
      "La moyenne des 'e' dans les titres des posts est de " +
      this.average.toFixed(2);
  }
}

new App();
