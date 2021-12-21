---
title: 【笔记】ECMAScript6学习
date: 2021-12-21 14:12:31
tags:
- markdown
categories:
- 笔记
---
> [笔记系列文章说明]: 该类型的文章是笔者学习过程中整理的学习笔记.

ECMAScript6 是JS的版本升级,主流浏览器和手机固件都已支持解析. 对过去来说的JS其实也是ECMAcript, 不过是老版本,名字也没有变. 6版本对JS的编写规则进行了封装, 形成了一套新的编写方式. 对于不支持解析的容器上,
可以通过EC6转EC5工具进行转换后运行(如Babel)

# 背景故事

ECMAScript 和 JavaScript 的关系 ECMAScript是发布国际标准的组织,JavaScript是Netscape创建的,后提交给ECMAScript ECMAScript= 标准 JavaScript= 实现(
3.0)
ECMAScript的版本 从3.0到 3.1=5 到6 中间版本没有通过...

# 语法

## 新的关键字

#### 一, let(只作用于代码块内的变量声明关键字)

```bash
{
  let name = "脆饼";
}
```

1, 适用于局部使用的变量: for循环, 临时变量 2, let非顺序执行将报错,var将显示undefined(var的变量提升未执行先使用将导致undefined)
3, let在区块中后者覆盖前者,前者将报错失效(单位内唯一性)
4, var中作用域为全局和方法中, ECMA6增加区块作用域,使用let实现

#### 二, const(常量声明且初始化)

```bash
const DEFAULT_VALUE = 3;
```

1, 声明后必须赋值 2, 再赋值将报错 3, 支持区块作用域 4, 地址级别的常量,类似JAVA中的对象常量
<!--more-->

#### 三, class

```bash

```

1,

#### 四, import

```bash

```

1,

## 解构(新的赋值方式)

#### 数组
```bash
老的方式
let a = 1;
let b = 2;
let c = 3;
新的方式
let [a, b, c] = [1, 2, 3];
let [a=1, b=2, c=3] = [];
```

#### 对象
```aidl
老的方式
let obj =  {}
obj.a = "1"
obj.b= "2"
新的方式
let {a : a, b : b} = {a : "1", b : "2"}
// a = "1"
```
#### 字符串
```aidl
略
```

## 字符串的扩展
支持unicode标识标识字符
```bash
let a = "aa";
let a = "\u0061\u0061"
改进版
let a = "\u{0061}\u{0061}"
```

#### 字符串遍历字符
```aidl
for (let ch of "abc"){
    console.log(ch)
}
```

#### 模板字符串
```
反引号``中间内容代表模板字符串(数字1左边的按键)
字符串中需要使用反引号增加\反斜杠
模板字符串支持JS表达式
${name} ${po.value} ${a+b}${函数()}
```

#### 新的方法
```aidl
是否包含
includes()
是否以开始
startsWith()
是否以结束
endsWith()
头部补全长度
padStart()
尾部补全长度
padEnd()
去空
trim()
trimStart()
trimEnd()
```

#### 正则
```aidl
支持正则的方法: match(), replace(), search(), split()
正则的格式: /xxxxxxxxxxxxxxxxxxxxxxxx/ 
```

## 数值的扩展
#### 二进制,八进制表示
```aidl
0b111110111 === 503 // true
0B111110111 === 503 // true
0o767 ===503 // true
0O767 ===503 // true
```
#### Number工具
```aidl
Number.isFinite() // 是否是有限的
Number.isNaN() // 是否是NaN
Number.parseInt() // 转换为整型
Number.parseFloat() // 转为float
Number.isInteger() // 是否为整数
```

#### Math工具
```aidl
略
```

#### 大整数(BigInt), 支持更大的数值表示
```aidl
略
```

#### 数组扩展方法
```aidl
sort() // 排序
includes() // 包含
entries() // 遍历
keys()
values()
```

## 对象扩展
#### 快捷赋值
```aidl

let foo = "abc"
let xoo = {foo} // 相当于 let xoo = {foo: "abc"}
```

#### 属性遍历
```text
1, for...in
2, Object.keys(obj)
3, Object.getOwnPropertyNames(obj)
4, Object.getOwnPropertySymbols(obj)
5, Reflect.ownKeys(obj)
```

#### 新关键字super
```text
只能这么写,其他形式报错
const obj = {
  x: 'world',
  foo() {
    super.foo();
  }
}
```

#### 比较
```text
Object.is(a,b) // true false
```

#### 拷贝
```text
浅拷贝
Object.assign(target, source1,source2) // 后者覆盖前者
```

## 新增数据结构
#### SET
```text
let s = new Set();
s.add("a");
s.delete("a");
s.has("a");
s.clear();

遍历1
for (let item of set.entries()) {
  console.log(item);
}
遍历2
set.forEach((value, key) => console.log(key + ' : ' + value))
```

#### Map
```text
let m = new Map();
m.set(o, "content");
m.get(o);
m.delete(o);
m.has(o);

size()
clear()

遍历
for (let item of map.entries()) {
  console.log(item[0], item[1]);
}

转JSON: JSON.stringify(strMapToObj(strMap))
JSON转MAP: new Map(JSON.parse(jsonStr))

```

## 循环
#### Iterator
```text
集合: 数组, 对象, MAP, SET
略
```

## Class
#### 新的语法糖
```javascript
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
```
#### 继承特性
#### 模块引入

## 编码规范&风格
```text
1, let取代var
2, 字符串使用单引号/反引号
3, 对象最后用逗号结尾
4, 实体用Class描述
```



















