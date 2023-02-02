const char_rot = (n, char)=> {
    const charCode = char.charCodeAt(0);
    if (charCode >= 65 && charCode <= 90) {
      // Uppercase
      return String.fromCharCode((charCode - 65 + n) % 26 + 65);
    } else if (charCode >= 97 && charCode <= 122) {
      // Lowercase
      return String.fromCharCode((charCode - 97 + n) % 26 + 97);
    }
    return char;
  }
  
  const cesar=(n, message)=> {
    let encrypted = "";
    for (let i = 0; i < message.length; i++) {
      encrypted += char_rot(n, message[i]);
    }
    return encrypted;
  }
  
  function cesar_decode(n, message) {
    return cesar(-n, message);
  }
  
  const message = "Bonjour tout le monde";
  const encrypted = cesar(1, message);
  console.log(`Message original: ${message}`);
  console.log(`Message chiffré: ${encrypted}`);
  console.log(`Message déchiffré: ${cesar_decode(1, encrypted)}`);