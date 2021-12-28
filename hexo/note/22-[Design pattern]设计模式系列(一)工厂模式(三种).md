---
title: 【Design pattern】设计模式系列(一)工厂模式(三种)
date: 2015-06-01 11:22:02
tags:
categories:
    - Design pattern
---
> \[Design pattern\]: 设计模式相关系列

关系图
----
![](/images/22-01.png)

例子中需要构建的实体类代码省略
### 1,简单工厂模式:
**概念:** 静态的,对生成对象进行封装的类
__使用场景:__ 去掉代码中new的操作, 统一生成对象的入口
**好处:** 当对对象进行替换时,只需要修改工厂类中的代码即可,使类的实例化代码与逻辑代码分离.
#### CODE
> 工厂类
```java
package note.com.factory;

import note.com.bean.*;public class SimpleFactory {

    public static A getA1(){
        return new A1();    
    }
    
    public static A getA2(){
        return new A2();    
    }
}
```
<!--more-->
> 测试类
```java
package note.com.factory;

import note.com.bean.Bean;

public class SimpleFactoryTest {
    public static void main(String[] args) {
        A b1 = SimpleFactory.getA1();
        A b2 = SimpleFactory.getA2();
    }
}
```

### 2,工厂模式
**概念:** 定义了一个创建对象的接口,但子类决定要实例化的类是哪一个,工厂方法让类把实例化推迟到了子类(并且子类产生的对象是同一种类型)

**使用场景:** 当需要new的对象有子类时,对工厂类进行抽象,提供针对不同目标对象而构建的对应工厂实现类

**好处:** 同简单工厂类,应对多样化的目标对象,进行的变种.

**特点:** 通常入口只有一个,每个工厂只产生一种类型的对象.本例中只能返回A的子类,针对于这种特点,抽象类作为工厂基类能更好控制统一入口(可在其中增加统一初始化逻辑).

#### CODE
> 工厂抽象类
```java
package note.com.factory;

import note.com.bean.Bean;

public abstract class AFactory {
public  A getA(){
return getRealA();
}

    public  abstract A getRealA();

}
```
> 工厂子类1
```java
package note.com.factory;

import note.com.bean.A1;
import note.com.bean.Bean;

public  class AFactory1 extends AFactory{

    @Override
    public A getRealA() {
        return new A1();
    }
}
```
> 工厂子类2
```java
package note.com.factory;

import note.com.bean.A2;
import note.com.bean.Bean;


public  class AFactory2 extends AFactory{

    @Override
    public A getRealA() {
        return new A2();
    }
}
```

> 测试类    

一个工厂产生了同一类型的不同实现的对象
```java
package note.com.factory;

import note.com.bean.A;

public class AFactoryTest {
    
    public static A getA(AFactory factory){
        return factory.getA();
    }
    public static void main(String[] args) {
        AFactory factory1 = new AFactory1();
        AFactory factory2 = new AFactory1();
        A a  = null;
        a = AFactoryTest.getA(factory1);
        a = AFactoryTest.getA(factory2);
    }
}
```

### 3,抽象工厂模式
**概念:** 提供一个接口,用于创建相关或依赖对象的家族,而不需要明确指定具体类.

**特点:** 与工厂模式比较,入口可以有多个,返回的类型也多种多样.下面例子中返回两种类型A,B,本例中没有用到抽象类独有的特点,所以使用接口实现

####CODE
> 工厂接口
```java
package note.com.factory;

import note.com.bean.A;
import note.com.bean.B;

public interface IFactory {
    public A getA();
    
    public B getB();
}
```
> 工厂实现类1
```java
package note.com.factory;

import note.com.bean.A;
import note.com.bean.A1;
import note.com.bean.B;
import note.com.bean.B1;

public class InterfaceFactory1 implements IFactory{

    public A getA() {
        return new A1();
    }

    public B getB() {
        return new B1();
    }
}
```

> 工厂实现类2
```java
package note.com.factory;

import note.com.bean.A;
import note.com.bean.A2;
import note.com.bean.B;
import note.com.bean.B2;

public class InterfaceFactory2 implements IFactory{
    public A getA() {
        return new A2();
    }

    public B getB() {
        return new B2();
    }
}
```

> 测试类

一个工厂产生了不同类型的对象 并且不同的工厂可以产生同一类型的不同实现的对象
```java
package note.com.factory;

import note.com.bean.A;
import note.com.bean.B;

public class IFactoryTest {
    public static A getA(IFactory factory) {
        return factory.getA();
    }

    public static B getB(IFactory factory) {
        return factory.getB();
    }

    public static void main(String[] args) {
        IFactory factory1 = new InterfaceFactory1();
        IFactory factory2 = new InterfaceFactory2();
        A a = null;
        B b = null;
        a = IFactoryTest.getA(factory1);
        b = IFactoryTest.getB(factory1);
        a = IFactoryTest.getA(factory2);
        b = IFactoryTest.getB(factory2);
    }
}
```