---
title: 【Design pattern】设计模式系列(十九)中介者模式
date: 2015-06-19 11:22:02
tags:
categories:
- 笔记
---
> [Design pattern]: 设计模式相关系列

介绍
----
**概念：** 用一个中介对象来封装一系列的对象交互。中介者使各对象不需要显式地相互引用，从而使其耦合松散，而且可以独立地改变它们之间的交互。
**应用场景：** 不同功能的模块之间调用关系复杂，耦合度高，不利于修改时使用。
**好处：** 降低耦合，模块独立。
**坏处：** 中介者业务复杂，不易维护。


#### CODE

> 定义模块抽象类
```java
package note.com.mediator;

public abstract class Element {
    public Mediator mediator = null;

    public abstract void good();

    public abstract void bad();

    public Mediator getMediator() {
        return mediator;
    }

    public void setMediator(Mediator mediator) {
        this.mediator = mediator;
    }

    public abstract void changeGood();

    public abstract void changeBad();
}
```

> 模块具体实现
```java
package note.com.mediator;

/**
 * 元素-部队
 * @author lxz
 *
 */
public class Army extends Element{

    @Override
    public void good() {
        System.out.println("部队强大");

    }

    @Override
    public void bad() {
        System.out.println("部队弱小");
    }

    @Override
    public void changeGood() {
        getMediator().change(Mediator.ARMY, Mediator.GOOD);
    }

    @Override
    public void changeBad() {
        getMediator().change(Mediator.ARMY, Mediator.BAD);
    }
}
```
```java
package note.com.mediator;

/**
 * 元素-政府
 * @author lxz
 *
 */
public class Goverment extends Element{

    @Override
    public void good() {
        System.out.println("政府有钱");
    }

    @Override
    public void bad() {
        System.out.println("政府没钱");
    }

    @Override
    public void changeGood() {
        good();
        getMediator().change(Mediator.GOVERMENT, Mediator.GOOD);
    }

    @Override
    public void changeBad() {
        bad();
        getMediator().change(Mediator.GOVERMENT, Mediator.BAD);
    }
}
```
```java
package note.com.mediator;


/**
 * 元素-人民
 * @author lxz
 *
 */
public class People  extends Element{

    @Override
    public void good() {
        System.out.println("人民幸福");
    }

    @Override
    public void bad() {
        System.out.println("人民不幸福");
    }

    @Override
    public void changeGood() {
        good();
        getMediator().change(Mediator.PEOPLE, Mediator.GOOD);
    }

    @Override
    public void changeBad() {
        bad();
        getMediator().change(Mediator.PEOPLE, Mediator.BAD);
    }

}
```

> 中介者，定义模块之间的调用
```java
package note.com.mediator;

/**
 * 协调者
 * @author lxz
 *
 */
public class Mediator{
    public static final String ARMY = "Army";
    public static final String GOVERMENT = "Goverment";
    public static final String PEOPLE = "People";
    public static final String GOOD = "good";
    public static final String BAD = "bad";

    public Element a = null;
    public Element g = null;
    public Element p = null;

    public Mediator(Army a,Goverment g,People p){
        this.a = a;
        this.g = g;
        this.p = p;
    }

    public void change(String label,String state){

        if(ARMY.equals(label)){
            if(GOOD.equals(state)){
                g.good();
                p.good();
            }else if(BAD.equals(state)){
                g.bad();
                p.bad();
            }
        }else if(GOVERMENT.equals(label)){
            if(GOOD.equals(state)){
                a.good();
                p.good();
            }else if(BAD.equals(state)){
                a.bad();
                p.bad();
            }

        }else if(PEOPLE.equals(label)){
            if(GOOD.equals(state)){
                a.good();
                g.good();
            }else if(BAD.equals(state)){
                a.bad();
                g.bad();
            }
        }
    }

    public Element getA() {
        return a;
    }

    public void setA(Element a) {
        this.a = a;
    }

    public Element getG() {
        return g;
    }

    public void setG(Element g) {
        this.g = g;
    }

    public Element getP() {
        return p;
    }

    public void setP(Element p) {
        this.p = p;
    }
}
```

> 测试类
```java
package note.com.mediator;

public class MediatorTest {
    public static void main(String[] args) {
        //三个元素，分别有不同的功能，但又相互有影响
        Army a = new Army();
        Goverment g = new Goverment();
        People p = new People();
        //中间调解者
        Mediator mediator = new Mediator(a,g,p);
        a.setMediator(mediator);
        g.setMediator(mediator);
        p.setMediator(mediator);
        a.changeBad();//军队变化
        System.out.println("====");
        g.changeBad();//政府变化
        System.out.println("====");
        p.changeGood();//人民变化
    }
}
```


> 结果
```text
政府没钱
人民不幸福
====
政府没钱
部队弱小
人民不幸福
====
人民幸福
部队强大
政府有钱
```
______
由此可以看出例子中的三个模块之间的调用关系由Mediator来控制，使三个模块更专心于自己的功能。

注意：小心设计成死循环。