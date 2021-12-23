---
title: 【Design pattern】设计模式系列(十)桥接模式
date: 2015-06-10 11:22:02
tags:
categories:
- 笔记
---
> [Design pattern]: 设计模式相关系列

介绍
----
**意图:** 将抽象部分与它的实现部分分离，使它们都可以独立地变化。
**使用场景:** 当一个接口中有多个方法定义,它的方法有多种有不同的实现,为了避免在子类中重复的定义相同的方法.

#### CODE
> 剥离功能1接口
```java
package note.com.bridge;

/**
 * 颜色接口
 * @author lxz
 *
 */
public interface IColour {

    public void buildColour();

}
```

> 功能1实现
```java
package note.com.bridge;

public class Blue implements IColour{

    public void buildColour() {
        System.out.println("蓝色");
    }
}
```
```java
package note.com.bridge;

public class Red implements IColour{

    public void buildColour() {
        System.out.println("红色");
    }

}
```

> 剥离功能2接口
```java
package note.com.bridge;

/**
 * 味道接口
 * @author lxz
 *
 */
public interface ITaste {

    public void buildTaste();

}
```

> 功能2实现
```java
package note.com.bridge;

/**
 * 甜味
 * @author lxz
 *
 */
public class Sweet implements ITaste{

    public void buildTaste() {
        System.out.println("甜味");
    }
}
```
```java
package note.com.bridge;

/**
 * 酸味
 * @author lxz
 *
 */
public class Sour implements ITaste{

    public void buildTaste() {
        System.out.println("酸味");
    }
}
```

> 真正的功能接口
```java
package note.com.bridge;

/**
 * 饮料基类
 * @author lxz
 *
 */
public abstract class ADrink {

    private IColour colour = null;

    private ITaste taste = null;

    public ADrink(IColour colour,ITaste taste){
        this.colour = colour;
        this.taste = taste;
    }

    public abstract void finish();

    public IColour getColour() {
        return colour;
    }

    public void setColour(IColour colour) {
        this.colour = colour;
    }

    public ITaste getTaste() {
        return taste;
    }

    public void setTaste(ITaste taste) {
        this.taste = taste;
    }
}
```

> 功能接口实现类
```java
package note.com.bridge;

public class Drink extends ADrink{

    public Drink(IColour colour,ITaste taste) {
        super(colour,taste);
    }

    @Override
    public void finish() {
        System.out.println("酒:");
        getColour().buildColour();
        getTaste().buildTaste();
    }
}
```

> 测试类
```java
package note.com.bridge;

public class DrinkTest {

    public static void main(String[] args) {
        IColour blue = new Blue();
        ITaste sweet = new Sweet();
        Drink drink1 = new Drink(blue,sweet); 
        drink1.finish();
        IColour red = new Red();
        ITaste sour = new Sour();
        Drink drink2 = new Drink(red,sour); 
        drink2.finish();
    }
}
```

> 结果
```text
酒:
蓝色
甜味
酒:
红色
酸味
``` 



