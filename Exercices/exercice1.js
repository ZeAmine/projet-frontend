class Parser {
    constructor(pattern) {
      this.pattern = pattern;
    }
    
    parse(phrase) {
      const regex = new RegExp(`\\d+`, 'g');
      this.str = phrase.split(this.pattern)
        .join(' ')
        .match(regex)
        .join(' ');
    }
  }
  
  const phrase = "8790: bonjour le monde:8987:7777:Hello World:    9007";
  const p = new Parser(":");
  p.parse(phrase);
  console.log(p.str); // Sortie: "8790 8987 7777 9007"