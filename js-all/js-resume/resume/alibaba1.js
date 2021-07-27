/*
 *题目一：
 *编写函数`convert(money)` ，传入金额，将金额转换为千分位表示法。
 *例如：12345.6 => 12,345.6
 */
function convert(money) {
  const splitArr = money.toString().split('.');
  const intValue = splitArr[0];
  const intArr = Array.from(intValue.toString()).reverse();
  const tempArr = [];
  intArr.forEach((item, index) => {
    tempArr.push(item);
    if ((index + 1) % 3 === 0) {
      tempArr.push(',');
    }
  });

  return tempArr.reverse().join('') + '.' + splitArr[1];
}

/* 请通过代码实现大整数（可能比Number.MAX_VALUE大）相加运算 */
class BigInt {
  constructor(str) {
    this.str = str;
  }

  plus(val) {
    if (!val) return this.str;

    let digit = 0;
    const aVal = Array.from(this.str).reverse();
    const bVal = Array.from(this.toString(val)).reverse();
    const maxLen = Math.max(aVal, bVal);

    let i = 0;
    let j = 0;
    let ans = [];
    while (i < aVal.length || j < bVal.length) {
      let a = aVal[i] || 0;
      let b = bVal[j] || 0;
      digit = a + b + digit >= 10 ? 1 : 0;
      if (digit > 0) {
        ans.push((a + b + digit) % 10);
      } else {
        ans.push(a + b);
      }
      i++;
      j++;
    }

    return ans.reverse();
  }

  toString() {
    return this.str;
  }
}

const bigint1 = new BigInt('1234232453525454546445458814343421545454545454');
const bigint2 = new BigInt('1234232453525454546445459914343421536654545454');

console.log(bigint1.plus(bigint2));

/*请完成React组件封装，能够实现如下图的输入组件
*![](https://zos.alipayobjects.com/skylark/fa965c45-088f-4a07-9f41-58af0871c0cb/attach/8107/4cb06836ae8f268b/image.png)

*组件属性有：
*  - value   当前的value 值  string      
*  - defaultValue    初始化的value 值 string      
*  - onChange    发生改变的时候触发的回调    Function(value, e)  
*/
function Input({ value, defaultValue, maxLen = 10, onChange = (value, e) => {}, ...props }) {
  const [len, setLen] = useState(0);
  const handleOnChange = (e) => {
    const val = e.target.value();
    setLen(val.length);
    onChange && onChange(val, e);
  };

  return (
    <div style={{ position: 'relative' }}>
      <input onChange={handleOnChange} value={defaultValue ?? value} {...props} />
      {value.length && <div style={{ position: 'absolue', right: '-10px', top: 2 }}>{len / maxLen}</div>}
    </div>
  );
}
