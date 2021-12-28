---
title: 【Design pattern】设计模式系列(十四)观察者模式
date: 2015-06-14 11:22:02
tags:
categories:
    - Design pattern
---
> \[Design pattern\]: 设计模式相关系列

介绍
----
**概念:** 定义对象间的一种一对多的依赖关系 ,当一个对象的状态发生改变时 , 所有依赖于它的对象都得到通知并被自动更新。
**应用场景:** 例如新闻订阅模式,邮件订阅等,客户端是观察者,新闻发布平台是被观察者,最重要的一点是被观察者控制着主动权. 注意区分的是:和时下的新闻APP并不相同,现在新闻APP采用的是客户端掌握了新闻更新的主动权.
**好处:** 一处改变,处处改变.

### 接来下实现一个游戏存档与读档的功能
#### CODE
在Java中有已经预定义好的发布-订阅模式的抽象类和接口,直接使用就好了.如果想要自己实现,源代码也很简单,仿写即可.JDK中定义的订阅者接口是java.util.Observer,发布者抽象类是java.util.Observable
下面编写实例
<!--more-->
> 订阅者(观察者)
```java
package note.com.observer;

import java.util.Observable;
import java.util.Observer;

/**
 * 观察者
 * @author lxz
 *
 */
public class 新闻收听者 implements Observer{

    private String name = "";
    private String message = null;

    public 新闻收听者(String name){
        this.name = name;
    }

    public void update(Observable o, Object arg) {
        this.setMessage((String)arg);
        System.out.println(name+":"+message);
    }
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```

> 发布者(被观察者)
```java
package note.com.observer;

import java.util.Observable;

/**
 * 被观察者
 * @author lxz
 *
 */
public class 新闻发布者 extends Observable{

    private String message = null;

    public void releaseNews(String news){
        this.setMessage(news);
        setChanged();
        notifyObservers(news);
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}
```

> 测试类
```java
package note.com.observer;

public class ObserverTest {

    public static void main(String[] args) {
        新闻发布者 from = new 新闻发布者();
        新闻收听者 to1 = new 新闻收听者("河南电视台");
        新闻收听者 to2 = new 新闻收听者("河北电视台");
        新闻收听者 to3 = new 新闻收听者("广东电视台");
        新闻收听者 to4 = new 新闻收听者("辽宁电视台");
        from.addObserver(to1);
        from.addObserver(to2);
        from.addObserver(to3);
        from.addObserver(to4);
        //以上准备监听完成
        //下面进行被观察者的修改,看观察者是否进行相应的观察操作
        from.releaseNews("国家农业税免收");

    }
}
```

> 结果
```text
辽宁电视台:国家农业税免收
广东电视台:国家农业税免收
河北电视台:国家农业税免收
河南电视台:国家农业税免收
```
______
从例子中可以看到定义了4个订阅者,也就是四个电视台的对象和一个发布者.发布者更新新闻信息,四个电视台同时执行了update方法根据发布者的更新内容执行对应的更新操作.

