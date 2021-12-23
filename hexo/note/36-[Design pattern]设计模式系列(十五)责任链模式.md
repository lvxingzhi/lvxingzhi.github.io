---
title: 【Design pattern】设计模式系列(十五)责任链模式
date: 2015-06-15 11:22:02
tags:
categories:
- 笔记
---
> [Design pattern]: 设计模式相关系列

介绍
----
**概念:** 使多个对象都有机会处理请求，从而避免请求的发送者和接收者之间的耦合关系。将这些对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理它为止。
**应用场景:** 经常增加处理场景的业务,比如处理零食商品的类,不断有新增的零食,就需要不断增加处理零食的方法,耦合度太高.为了降低耦合度使用职责链模式.
**好处:** 扩展灵活.结构清晰.

#### CODE

> 处理器接口定义
```java
package note.com.chain;

public abstract class Handler {
    public  String name = null;
    private Handler next = null;

    public Handler(String name,Handler next){
        this.name = name;
        this.next = next;
    }

    /*
     * 入口
     */
    public void execute(String label){
        if(isMe(label)){
            doHandler(label);
        }else{
            nextDo(label);
        }
    }

    /*
     * 子类实现处理逻辑
     */
    public abstract void doHandler(String label);

    /*
     * 判断是否有责任
     */
    private boolean isMe(String label){
        if(name!=null){
            return name.equals(label);
        }
        return false;
    };

    /*
     * 责任传递
     */
    private void nextDo(String label){
        if(next!=null){
            next.doHandler(label);
        }
    }
}
```

> 处理器实现类
```java
package note.com.chain;


/**
 * 第一个处理器
 * @author lxz
 *
 */
public class FirstChain extends Handler{

    public FirstChain(String name, Handler next) {
        super(name, next);
    }

    public void doHandler(String label) {
        System.out.println(label+":由first来处理");
    }

}
```
```java
package note.com.chain;

/**
 * 人类处理器
 * @author lxz
 *
 */
public class PersonChain  extends Handler{

    public PersonChain(String name, Handler next) {
        super(name, next);
    }

    public void doHandler(String label) {
        System.out.println(label+":由我人类处理器处理");
    }

}
```
```java
package note.com.chain;

/**
 * 昆虫类处理
 * @author lxz
 *
 */
public class InsectChain  extends Handler{

    public InsectChain(String name, Handler next) {
        super(name, next);
    }

    public void doHandler(String label) {
        System.out.println(label+":由我昆虫处理器处理");
    }
}
```
```java
package note.com.chain;

/**
 * 鱼类处理
 * @author lxz
 *
 */
public class FishChain  extends Handler{

    public FishChain(String name, Handler next) {
        super(name, next);
    }

    public void doHandler(String label) {
        System.out.println(label+":由我鱼类处理器处理");
    }
}
```
```java
package note.com.chain;

/**
 * 动物类处理
 * @author lxz
 *
 */
public class AnimalChain  extends Handler{

    public AnimalChain(String name, Handler next) {
        super(name, next);
    }

    public void doHandler(String label) {
        System.out.println(label+":由我动物类处理器处理");
    }
}
```

> 组装职责链并进行测试
```java
package note.com.chain;

/**
 * 测试类
 * @author lxz
 *
 */
public class ChainTest {
    public static void main(String[] args) {
        String FISH = "fish";
        String ANIMAL = "animal";
        String INSECT = "insect";
        String PERSON = "person";
        String First = "first";
        //组装责任链
        PersonChain person = new PersonChain(PERSON, null);
        InsectChain insect = new InsectChain(INSECT,person);
        FishChain fish = new FishChain(FISH,insect);
        AnimalChain animal = new AnimalChain(ANIMAL,fish);
        FirstChain first = new FirstChain(First,animal);
        System.out.println("我这里有一个生物需要处理");
        String thing1 = INSECT;//昆虫
        String thing2 = ANIMAL;//动物
        first.execute(thing1);
        first.execute(thing2);
    }
}
```


> 结果
```text
我这里有一个生物需要处理
insect:由我昆虫处理器处理
animal:由我动物类处理器处理
```
______
FirstChain不用生物的名称来定义,是为了演示更清楚的知道我把FirstChain作为责任传递的第一棒.

由 此,所有的待处理都从第一个职责链入口进行处理,不需要知道具体是谁处理了.另外,有新增的物种需要处理时只需要扩张Handler的实现,并且把 该实现收在链中管理即可.

责任链和命令模式容易混淆,下篇讲完命令模式再区分它们的区别.
