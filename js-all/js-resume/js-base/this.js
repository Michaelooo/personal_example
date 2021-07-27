'use strict';

var name = 'michael';
var person = {
  name: 'cheng',
  sayOne: function () {
    console.log(this.name);
  },
  sayTwo: function () {
    var name = '123';
    return function () {
      console.log(this.name);
    };
  },
  sayThree: () => {
    console.log(this.name);
  }
};
var person2 = person;
person.sayOne();
person.sayTwo()();
person.sayThree();

person2.sayOne();
person2.sayTwo()();
person2.sayThree();
