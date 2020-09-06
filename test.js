/* let obj = {
  name: "admin",
  age: 18,
}; */
let obj = ['push','pop','splice','join','slice','shift','unshift','indexOf']
let proto = Object.create(Array.prototype)
obj.forEach(item=>{
  /* obj[item] 就是 数组中的各种方法 ...arguments就是参数 */
  /* obj.push(1) */
  obj[item]=function(){
    /* 改变this指向 到原型 */
    Array.prototype.push.call(this,...arguments)
    reative(item,...arguments)
  }
})


init(obj);
function init(obj) {
  if(Array.isArray(obj)){
   obj.__proto__ = proto
  }
  if (Object.prototype.toString.call(obj) == "[object Object]") {
    for (let prop in obj) {
      Object.defineProperty(obj, prop, {
        get() {
          return prop;
        },
        set(val) {
          reative(prop, val);
        },
      });
    }
  }
}

function reative(prop, val) {
  console.log(`${prop}改变,值${val}`);
}
obj.splice(2,1)
obj.push(11)
/* obj.name = "shan";
obj.age = 20; */
/* obj.push(11)
console.log(obj); */
