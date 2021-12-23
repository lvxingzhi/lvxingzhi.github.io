---
title: 【Design pattern】设计模式系列(四)单例模式
date: 2015-06-04 11:22:02
tags:
categories:
- 笔记
---
> [Design pattern]: 设计模式相关系列

介绍
----
**概念:** 保证一个类仅有一个实例，并提供一个访问它的全局访问点。
**使用场景:** 整个项目中只能创建一次对象的类.防止出现多个对象同时存在.如:数据库连接池,有多个就不能有效控制连接数了.


### 两种实现方式
#### 第一种
> 单例类
```java
package note.com.singleton;

public class Singleton {
    private static volatile Singleton singleton = null;
    private Singleton(){
    }

    public static synchronized Singleton getSingleton(){//synchronized是必须的
        if(singleton==null){
            singleton = new Singleton();
        }
        return singleton;
    }
}
```
<!--more-->
> 测试类
```java
package note.com.singleton;

public class SingletonTest {
    public static void main(String[] args) {
        Singleton s11 = Singleton.getSingleton();
        Singleton s12 = Singleton.getSingleton();
        System.out.println(s11);
        System.out.println(s12);
    }
}
```

> 结果
```text
note.com.singleton.Singleton@659e0bfd
note.com.singleton.Singleton@659e0bfd
```

#### 第二种
> 单例类
```java
package note.com.singleton;

public class Singleton2 {
    private static Singleton2 singleton = new Singleton2();
    private Singleton2(){

    }
    public static Singleton2 getSingleton2(){
        return singleton;
    }
}
```

> 测试类
```java
package note.com.singleton;

public class SingletonTest {
    public static void main(String[] args) {
        Singleton2 s11 = Singleton2.getSingleton2();
        Singleton2 s12 = Singleton2.getSingleton2();
        System.out.println(s11);
        System.out.println(s12);
    }
}
```

> 结果
```text
note.com.singleton.Singleton2@659e0bfd
note.com.singleton.Singleton2@659e0bfd
```

