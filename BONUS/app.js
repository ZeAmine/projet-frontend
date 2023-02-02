export default class App {
  constructor() {
    this.selectUsers = document.querySelector('#users')
    this.posts = document.querySelector('#posts-list')
    this.comments = document.querySelector('#comments-list')
    this.words = document.querySelector('#words-list')
    this.tasks = document.querySelector('#tasks-list')
    this.distance = document.querySelector('#distance-list')
    this.users = []
    this.userSelected = null
    this.displayUser()
    this.displayUserData()
  }

  async displayUser() {
    this.users = await fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json())
    
    this.users.forEach(user => {
        const option = document.createElement('option')
        option.value = user.id
        option.innerText = user.name
        this.selectUsers.appendChild(option)
      }
    )
  }


  async displayUserPostAndComments(userId){
    this.postsData = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`).then(response => response.json())
    this.commentsData = await fetch(`https://jsonplaceholder.typicode.com/comments`).then(response => response.json())
    this.posts.innerHTML = ``
    this.comments.innerHTML = ``
    let averageCommentPerPost = 0
    this.postsData.forEach(async post => {
      this.posts.innerHTML += `<p>${post.title}</p>`
      this.comments.innerHTML += `----------------------------->`
      this.comments.innerHTML += `<p> Post title : ${post.title}</p>`

      this.commentsData.forEach(comment => {
        if(comment.postId !== post.id) return
        averageCommentPerPost ++ 
        this.comments.innerHTML += `<p>${comment.body}</p>`
      })

    })
    this.comments.innerHTML += `<p> Average comment per post : ${averageCommentPerPost / this.postsData.length}</p>`
    this.displayMostUsedWords()
  }

  displayMostUsedWords(){
    this.words.innerHTML = ``
    const wordsCount = {}
    this.postsData.forEach(post => {
      this.commentsData.forEach(comment => {
        if(comment.postId !== post.id) return
        const words = comment.body.split(' ')
        words.forEach(word => {
          if(wordsCount[word]) {
            wordsCount[word]++
          } else {
            wordsCount[word] = 1
          }
        })

      }
      )
    })
    const wordsCountArray = Object.entries(wordsCount)
    wordsCountArray.sort((a, b) => b[1] - a[1])
    wordsCountArray.forEach((word,index ) => {
      if(index > 9) return
      this.words.innerHTML += `<p> ${word[0]} : ${word[1]}</p>`
    })
      
  }

  async displayUserTasks(userId){
    this.tasksData = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`).then(response => response.json())
    this.tasks.innerHTML = ``
    const numberCompleted = this.tasksData.filter(task => task.completed).length
    this.tasks.innerHTML += `<p> Number of completed tasks : ${numberCompleted}</p>`
    this.tasks.innerHTML += `<p> Number of uncompleted tasks : ${this.tasksData.length - numberCompleted}</p>`
  }

  displayDistanceBetweenOtherUsers(){
    this.distance.innerHTML = ``
    const distance = this.users.map(user => {
      const distance = Math.sqrt(Math.pow(user.address.geo.lat, 2) + Math.pow(user.address.geo.lng, 2))
      return {
        name: user.name,
        distance: distance.toFixed(2)
      }
    })
    distance.sort((a, b) => a.distance - b.distance)
    distance.forEach(user => {
      this.distance.innerHTML += `<p> ${user.name} : ${user.distance} km</p>`
    })
  }

  displayUserData(){
    this.selectUsers.addEventListener('change', async (e) => {
      const userId = e.target.value
      this.displayUserPostAndComments(userId)
      this.displayUserTasks(userId)
      this.displayDistanceBetweenOtherUsers(userId)
    })
  }

}

new App();
