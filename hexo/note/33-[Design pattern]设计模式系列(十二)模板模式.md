---
title: 【Design pattern】设计模式系列(十二)模板模式
date: 2015-06-12 11:22:02
tags:
categories:
    - Design pattern
---
> \[Design pattern\]: 设计模式相关系列

介绍
----
**概念:** 定义一个操作中的算法的骨架，而将一些步骤延迟到子类中。TemplateMethod使得子类可以不改变一个算法的结构即可重定义该算法的某些特定步骤。
**应用场景:** 由模板定义统一的公共逻辑,公共入口,子类定义不同的实现.好处:统一了公共部分,父类(模板)控制了子类的流程,子类只能定义规定内的逻辑.
<!--more-->
### 利用抽象类来实现模板模式:
#### CODE
> 定义模板类
```java
package note.com.template;

public abstract class Template {
    public abstract void init();
    public abstract void destroy();
    public abstract void hook();

    /*
     * 模板公共入口
     */
    public void doAll(){
        init();
        doOne();
        if(isDoHook()){
            hook();
        }
        doTwo();
        destroy();
    }
    public void doOne(){
        System.out.println("执行公共逻辑1");
    }

    public void doTwo(){
        System.out.println("执行公共逻辑2");
    }

    /*
     * 钩子方法,钩的是hook()方法,默认关闭
     */
    public boolean isDoHook(){
        return false;
    }
}
```

> 模板子类1
```java
package note.com.template;

/**
 * 模板子类
 * @author lxz
 *
 */
public class TemplateA extends Template{

    /*
     *钩子方法实现
     */
    @Override
    public void hook() {
        System.out.println("钩子方法执行");
    }

    /*
     * 初始化
     */
    @Override
    public void init() {
        System.out.println("初始化A");

    }

    /*
     * 销毁
     */
    @Override
    public void destroy() {
        System.out.println("结束A");
    }

    /*
     * 开放钩子方法
     */
    @Override
    public boolean isDoHook() {
        return true;
    }

}
```

> 模板子类2
```java
package note.com.template;

/**
 * 模板子类
 * @author lxz
 *
 */
public class TemplateB extends Template{

    /*
     *钩子方法实现
     */
    @Override
    public void hook() {
    }

    /*
     * 初始化
     */
    @Override
    public void init() {
        System.out.println("初始化B");

    }

    /*
     * 销毁
     */
    @Override
    public void destroy() {
        System.out.println("结束B");
    }
}
```

> 测试类
```java
package note.com.template;

public class TemplateTest {
    public static void main(String[] args) {
        Template a = new TemplateA();
        Template b = new TemplateB();
        //调用入口
        System.out.println("调用A:");
        a.doAll();
        System.out.println("调用B:");
        b.doAll();
    }
}
```

> 结果
```text
//结果:

调用A:
初始化A
执行公共逻辑1
钩子方法执行
执行公共逻辑2
结束A
调用B:
初始化B
执行公共逻辑1
执行公共逻辑2
结束B

```
______
### 钩子方法
一个抽象类,入口函数默认执行1,2,3逻辑, 而2之后有一个判断方法来决定是否执行3. 抽象类的子类可以去覆盖这个判断方法,由具体的子类行为来决定是否执行3.
其中这个判断方法就叫做钩子方法.

补充:子类可以随时挂上逻辑与去掉逻辑,形象的比喻成控制范围内的逻辑挂钩.

