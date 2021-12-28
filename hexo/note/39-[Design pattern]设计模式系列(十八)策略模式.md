---
title: 【Design pattern】设计模式系列(十八)策略模式
date: 2015-06-18 11:22:02
tags:
categories:
- 笔记
---
> \[Design pattern\]: 设计模式相关系列

介绍
----
**概念:** 定义一系列的算法,把它们一个个封装起来, 并且使它们可相互替换。本模式使得算法可独立于使用它的客户而变化。
**应用场景:** 用户主动切换执行规则，比如 画图工具，不同的工具执行的事件效果不同. 压缩工具的格式，不同的格式执行不同的压缩算法.
**好处:** 扩展容易，不会破坏原有的结构，遵循开闭原则。
**与状态模式的区别：** 与状态模式的区别在于切换应对策略的主动权在用户，而状态模式的切换是在内部。


#### CODE

> 工具基类
```java
package note.com.strategy;

/**
 * 工具基类
 * @author lxz
 *
 */
public abstract class ATool {

    public abstract void leftMouseClick();

    public abstract void rightMouseClick();

    public abstract void leftDoubleMouseClick();

}
```
<!--more-->
> 具体工具类
```java
package note.com.strategy;

/**
 * 圆形工具
 * @author lxz
 *
 */
public class Circle extends ATool{

    @Override
    public void leftMouseClick() {
        System.out.println("界面出现了一个圆");

    }

    @Override
    public void rightMouseClick() {
        System.out.println("界面出现了圆形的属性菜单");

    }

    @Override
    public void leftDoubleMouseClick() {
        System.out.println("界面出现了一个圆");
        System.out.println("界面出现了一个圆");

    }

}
```
```java
package note.com.strategy;

/**
 * 油漆桶工具
 * @author lxz
 *
 */
public class PaintKettle extends ATool{

    @Override
    public void leftMouseClick() {
        System.out.println("界面出现了填充颜色");

    }

    @Override
    public void rightMouseClick() {
        System.out.println("界面出现了油漆桶的属性菜单");

    }

    @Override
    public void leftDoubleMouseClick() {
        System.out.println("界面出现了填充颜色,颜色更深了");
    }

}
```
```java
package note.com.strategy;

/**
 * 画笔工具
 * @author lxz
 *
 */
public class Pen extends ATool{

    @Override
    public void leftMouseClick() {
        System.out.println("界面出现了一个点");

    }

    @Override
    public void rightMouseClick() {
        System.out.println("界面出现了画笔工具的属性菜单");

    }

    @Override
    public void leftDoubleMouseClick() {
        System.out.println("界面出现了一个点");

    }
}
```
```java
package note.com.strategy;

/**
 * 矩形工具
 * @author lxz
 *
 */
public class Rectangle extends ATool{

    @Override
    public void leftMouseClick() {
        System.out.println("界面出现了一个矩形");
        
    }

    @Override
    public void rightMouseClick() {
        System.out.println("界面出现了矩形工具的属性菜单");
        
    }

    @Override
    public void leftDoubleMouseClick() {
        System.out.println("界面出现了一个矩形");
        System.out.println("界面出现了一个矩形");
    }

}
```

> 画图工具界面类
```java
package note.com.strategy;

/**
 * 管理工具的界面
 *
 * @author lxz
 *
 */
public class UI {
    private ATool tool = new Pen();// 默认是画笔工具
    public static final int PEN = 1;
    public static final int RECTANGLE = 2;
    public static final int CIRCLE = 3;
    public static final int PAINTKETTLE = 4;

    public  UI() {
        System.out.println("画图工具已经启动");
    }

    /*
     * 切换工具(状态)
     */
    public void changeTool(int toolNum) {
        switch (toolNum) {
            case PEN:
                tool = new Pen();
                break;
            case RECTANGLE:
                tool = new Rectangle();
                break;
            case CIRCLE:
                tool = new Circle();
                break;
            case PAINTKETTLE:
                tool = new PaintKettle();
                break;
            default:
                tool = new Pen();
                break;
        }
    }

    public void leftMouseClick(){
        tool.leftMouseClick();
    }

    public void rightMouseClick(){
        tool.rightMouseClick();
    }

    public void leftDoubleMouseClick(){
        tool.leftDoubleMouseClick();
    }
}
```

> 测试类
```java
package note.com.strategy;

public class ToolTest {
    public static void main(String[] args) {
        System.out.println("启动画图工具......");
        UI ui = new UI();//启动画图工具
        System.out.println("点击画笔工具......");
        ui.changeTool(UI.PEN);//点击画笔工具
        System.out.println("左键点击画板......");
        ui.leftMouseClick();//左键点击画板
        System.out.println("点击圆形工具......");
        ui.changeTool(UI.CIRCLE);//点击圆形工具
        System.out.println("左键双击画板......");
        ui.leftDoubleMouseClick();//左键双击画板
    }
}
```


> 结果
```text
启动画图工具......
画图工具已经启动
点击画笔工具......
左键点击画板......
界面出现了一个点
点击圆形工具......
左键双击画板......
界面出现了一个圆
界面出现了一个圆
```
______
根据选择的工具(策略)不同,执行的操作相应也不同,具有一次改变,次次使用的效果.