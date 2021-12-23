---
title: 【Design pattern】设计模式系列(十七)状态模式
date: 2015-06-17 11:22:02
tags:
categories:
- 笔记
---
> [Design pattern]: 设计模式相关系列

介绍
----
首先明白两个单词:打开和关闭是同一个物体的两种状态,是需要经常互相切换的,不是没有关系的两个单词. let`s Go

**概念:** 允许一个对象在其内部状态改变时改变它的行为。对象看起来似乎修改了它的类。
**应用场景:** 关闭着的门--》打开的门--》关闭的门，自动的切换到下一个状态的可执行事件。
**好处:** 控制对象内部不同的状态执行不同的操作，按照状态流程执行。

### 典型的状态模式例子
#### CODE

> 状态接口
```java
package note.com.state;

/**
 * 状态接口定义
 * @author lxz
 *
 */
public interface State {
     State changeState();
     void doOne();
     void doTwo();
     void doThree();
}
```
<!--more-->
> 具体状态
```java
package note.com.state;

public class Open implements State{

    public State changeState() {
        return new Connect();
    }

    public void doOne() {
        System.out.println("事件一:打开状态执行");

    }

    public void doTwo() {
        System.out.println("事件二:打开状态执行");

    }

    public void doThree() {
        System.out.println("事件三:打开状态执行");
    }
}
```
```java
package note.com.state;

public class Connect implements State{


    public State changeState() {
        return new Close();
    }

    public void doOne() {
        System.out.println("事件一:连接状态执行");

    }

    public void doTwo() {
        System.out.println("事件二:连接状态执行");

    }

    public void doThree() {
        System.out.println("事件三:连接状态执行");
    }
}
```
```java
package note.com.state;

public class Close implements State{


    public State changeState() {
        return new Open();
    }

    public void doOne() {
        System.out.println("事件一:关闭状态执行");

    }

    public void doTwo() {
        System.out.println("事件二:关闭状态执行");

    }

    public void doThree() {
        System.out.println("事件三:关闭状态执行");
    }
}
```

> 根据状态来执行具体操作的类
```java
package note.com.state;

public class Context {
    private State state = null;

    public Context(){
        state = new Open();
    }
    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
    }

    public void execute(){
        state.doOne();
        state.doTwo();
        state.doThree();
        state = state.changeState();
    }
}
```

> 测试类
```java
package note.com.state;

public class StateTest {
    public static void main(String[] args) {
        Context context = new Context();
        context.execute();
        context.execute();
        context.execute();
        context.execute();
    }
}
```


> 结果
```text
事件一:打开状态执行
事件二:打开状态执行
事件三:打开状态执行
事件一:连接状态执行
事件二:连接状态执行
事件三:连接状态执行
事件一:关闭状态执行
事件二:关闭状态执行
事件三:关闭状态执行
事件一:打开状态执行
事件二:打开状态执行
事件三:打开状态执行
```
______
这个例子非常切合概念,有明显的状态内部的切换,有状态改变后的不同事件