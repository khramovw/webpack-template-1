let x = (a,b) => a+b;
let v = (a,b) => { let p=x(a,b); return p+a+b };
let y = x(5,10);
let d = v(5,15);
console.log(y,d);