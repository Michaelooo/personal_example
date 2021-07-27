// Object.defineProperty(record, 'id', {
//   enumerable: false,
//   configurable: true,
//   set (newVal) {
//     if(originId !== newVal)
//       throw new Error('id 不可修改')
//   },
//   get () {
//     return originId
//   }
// });

// let validator = {
//   set: function (obj, prop, value) {
//     if (prop === 'age') {
//       if(obj.age !== value) {
//         throw new Error('id 不可修改');
//       }

//       if (!Number.isInteger(value)) {
//         throw new TypeError('The age is not an integer');
//       }

//       if (value > 200) {
//         throw new RangeError('The age seems invalid');
//       }
//     }

//     // The default behavior to store the value
//     obj[prop] = value;

//     // 表示成功
//     return true;
//   },
// };

// try {
//   let person = new Proxy({ age: 100 }, validator);

//   person.age = 100;

//   console.log(person.age);
//   // 100

//   person.age = 110;

//   person.age = 'young';
//   // 抛出异常: Uncaught TypeError: The age is not an integer

//   person.age = 300;
//   // 抛出异常: Uncaught RangeError: The age seems invalid
// } catch (error) {
//   console.log('xxx', error.toString());
// }


function validateModel(obj) {
  let validator = {
    set: function (obj, prop, value) {
      if (prop === 'id') {
        if(obj.id !== value) {
          throw new Error('id 不可修改');
        }

        if(obj.name !== value) {
          throw new Error('name 不可修改');
        }
      }
  
      obj[prop] = value;
  
      return true;
    },
  };


  try {
    let person = new Proxy(obj, validator);
    return person;
  
    // person.age = 100;
  
    // console.log(person.age);
    // // 100
  
    // person.age = 110;
  
    // person.age = 'young';
    // // 抛出异常: Uncaught TypeError: The age is not an integer
  
    // person.age = 300;
    // // 抛出异常: Uncaught RangeError: The age seems invalid
  } catch (error) {
    console.log('yyyyyy', error.toString());
  }
}

const person = validateModel({ id: 100 });
person.id = 110;