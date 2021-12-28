---
title: 【Design pattern】设计模式系列(十一)享元模式
date: 2015-06-11 11:22:02
tags:
categories:
- 笔记
---
> \[Design pattern\]: 设计模式相关系列

介绍
----
**概念:** 运用共享技术有效地支持大量细粒度的对象。
**应用场景:** 项目中某个类需要产生大量的对象,其中对象中的属性创建占用了大量的内存,如果这些属性对象可以被公用,那么可以利用享元模式把他们指向同一个地址.

>这让我想起了字符串常量池的做法.
那么我们就用例子模仿一个字符串存储的逻辑.
#### CODE
> 自创字符串类
```java
package note.com.flyweight;

/**
 * 自定义String类
 * @author lxz
 *
 */
public class MyString {
    private String name = null;

    public MyString(String name){
        this.name = name;
    }
    public String getName() {
        return name;
    }

}
```
<!--more-->
> 自创字符串常量池
```java
package note.com.flyweight;

import java.util.HashMap;
import java.util.Map;

/**
 * MyString存放池,类似字符串常量池
 * @author lxz
 *
 */
public class MyStringPool {

    private static Map<String,MyString> map = new HashMap<String,MyString>();

    /*
     * 获取MyString
     */
    public static synchronized MyString getMyString(String key){
        MyString myString = map.get(key);
        if(myString==null){
            myString = new MyString(key);
            map.put(key, myString);
        }
        return myString;
    }
}
```

> 人实体,其中名字属性用到我们自创的字符串来表示
```java
package note.com.flyweight;

public class Person {
    private MyString name = null;
    private Integer age = null;
    public Person(MyString name,Integer age){
        this.name = name;
        this.age = age;
    }
    public MyString getName() {
        return name;
    }
    public void setName(MyString name) {
        this.name = name;
    }
    public Integer getAge() {
        return age;
    }
    public void setAge(Integer age) {
        this.age = age;
    }
}
```

> 测试类
```java
package note.com.flyweight;

public class FlyWeightTest {

    public static void main(String[] args) {
        Person one = new Person(MyStringPool.getMyString("小明"),5);
        Person two = new Person(MyStringPool.getMyString("小红"),6);
        Person three = new Person(MyStringPool.getMyString("小明"),7);
        Person four = new Person(MyStringPool.getMyString("小明"),8);
        System.out.println(one.getName());
        System.out.println(two.getName());
        System.out.println(three.getName());
        System.out.println(four.getName());
    }
}
```

> 结果
```text
note.com.flyweight.MyString@659e0bfd
note.com.flyweight.MyString@2a139a55
note.com.flyweight.MyString@659e0bfd
note.com.flyweight.MyString@659e0bfd
```

###### 结果可见,三个同名的Person实体,他们的name属性指向了同一个地址,这说明我们省了两个MyString的对象空间.假如有一万个同明的人,我们就省了九千九百九十九个对象的空间,情景尽可能极端,这样做的效果越好.



