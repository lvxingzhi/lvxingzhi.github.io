---
title: 【Design pattern】设计模式系列(三)生成器模式
date: 2015-06-03 11:22:02
tags:
categories:
- 笔记
---
> [Design pattern]: 设计模式相关系列

介绍
----
**概念:** 将一个复杂对象的构建与它的表示分离，使得同样的构建过程可以创建不同的表示。
**例如:** 衣服制造厂(实体)有制造衣服的功能,每种衣服的制造流程都不相同,因此把制造衣服这个复杂且可变的功能分离出来.
**使用场景:** 实体的某个功能复杂且不只有一种
**好处:** 功能的扩展不影响实体,实体更加内聚,与可变的部分耦合度低

#### CODE
> 生产过程接口
```java
package note.com.builder;

public interface Builder {
    public String build(Factory factory);

}
```
<!--more-->
> 生产1过程
```java
package note.com.builder;

public class Builder1 implements Builder{

    public String build(Factory factory) {
        String clothes = factory.getOne1()+factory.getTwo2()+factory.getThree1()+factory.getFour1();
        return clothes;
    }
}
```

> 生产2过程
```java
package note.com.builder;

public class Builder2 implements Builder{

    public String build(Factory factory) {
        String clothes = factory.getOne2()+factory.getTwo1()+factory.getFour1();
        return clothes;
    }
}
```

> 衣服工厂实体
```java
package note.com.builder;

public class Factory {
    private String one1 = "纺织布";
    private String one2 = "尼龙布";
    private String two1 = "裁剪";
    private String two2 = "上色";
    private String three1 = "加领";
    private String four1 = "缝合";

    public String build(Builder builder){
        String clothes = builder.build(this);
        System.out.println("生产过程:"+clothes);
        return clothes;
    }


    public String getOne1() {
        return one1;
    }
    public void setOne1(String one1) {
        this.one1 = one1;
    }
    public String getOne2() {
        return one2;
    }
    public void setOne2(String one2) {
        this.one2 = one2;
    }
    public String getTwo1() {
        return two1;
    }
    public void setTwo1(String two1) {
        this.two1 = two1;
    }
    public String getTwo2() {
        return two2;
    }
    public void setTwo2(String two2) {
        this.two2 = two2;
    }
    public String getThree1() {
        return three1;
    }
    public void setThree1(String three1) {
        this.three1 = three1;
    }
    public String getFour1() {
        return four1;
    }
    public void setFour1(String four1) {
        this.four1 = four1;
    }
}
```

> 测试类
```java
package note.com.builder;

public class BuilderTest {
    public static void main(String[] args) {
        Factory factory = new Factory();
        Builder builder1 = new Builder1();
        Builder builder2 = new Builder2();
        factory.build(builder1);
        factory.build(builder2);
    }
}
```

> 结果
```text
生产过程:纺织布上色加领缝合
生产过程:尼龙布裁剪缝合
```

由此,工厂的生产过程与工厂进行分离,并且每次增加新衣服的生产都只需要增加Builder的实现就可以了.
