const findMaximum = (a, b, c)=> {  //pourrait faire un reduce aussi 
    let max = a;
    if (b > max) {
      max = b;
    }
    if (c > max) {
      max = c;
    }
    return max;
  }
  
  const a = 5;
  const b = 10;
  const c = 7;
  console.log(`Le maximum est: ${findMaximum(a, b, c)}`); // Sortie: "Le maximum est: 15"