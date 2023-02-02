
data = [  1, 1, 2, 3, 4, 8, 8, 5, 6, 6, 9, 9, 10, 11, 12, 14, 48, 48, 51, 51, 1, 1, 1,  51, 3, 3, 3, 51, 51, 51, 51, 51, 0,];
let results =[]
let object = {};

for (let i = 0; i < data.length; i++) {
  if (object[data[i]]) {
    object[data[i]]++;
  } else {
    object[data[i]] = 1;
  }
}
results.push(object)
console.log(results);
