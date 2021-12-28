---
title: 【Design pattern】设计模式系列(二)原型模式
date: 2015-06-02 11:22:02
tags:
categories:
- 笔记
---
> \[Design pattern\]: 设计模式相关系列

介绍
----
**概念:** 由对象来生成新的对象,而不是用类类型或其他方式.

**使用场景:** 需要对象克隆时

**特点:** 参数复制了,不用再初始化数据

原型模式在C++等其他语言中运用较广,JAVA有Object的clone方法,所以使用起来比较简单
### 假如Object中没有clone方法,怎么来实现原型模式?
#### CODE
> 首先创建对象实体 基类
```java
package note.com.bean;

public abstract class Prototype {
    private String name = null;

    public abstract Prototype clone(Prototype p);

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```
<!--more-->
> 子类
```java
package note.com.bean;

public class Prototype1 extends Prototype {

    public Prototype clone(Prototype p){
        Prototype pp = new Prototype1();
        pp.setName(this.getName());
        return pp;
    }
}
```

> 测试类
```java
package note.com.prototype;

import note.com.bean.Prototype;
import note.com.bean.Prototype1;

public class PrototypeTest {

    public static void main(String[] args) {
        Prototype p1 = new Prototype1();
        p1.setName("1");
        System.out.println(p1);
        System.out.println(p1.getName());
        Prototype p11 = p1.clone(p1);
        System.out.println(p11);
        System.out.println(p11.getName());
    }
}
```

> 结果
```text
note.com.bean.Prototype1@659e0bfd
1
note.com.bean.Prototype1@2a139a55
1
```
可得,对象已经是新的对象,但内容是相同的.

### 使用JAVA的clone方法以后可以这么写,或者不重写clone方法,直接使用
#### CODE
> 子类
```java
package note.com.bean;

public class Prototype2 extends Prototype{
    
    public Prototype clone(Prototype p){
        Prototype pp = null;
        try {
            pp = (Prototype) this.clone();
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
        }
        return pp;
    }
}
```
注意:Object中的clone是浅克隆,如果想使用深克隆,就要自定义clone方法了(利用序列化实现深克隆属性)
> 克隆方法
```text
 public Object deepClone(Object o) throws IOException, ClassNotFoundException{
        // 将对象写到流里
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        ObjectOutputStream oos = new ObjectOutputStream(bos);
        oos.writeObject(o);
        // 从流里读回来
        ByteArrayInputStream bis = new ByteArrayInputStream(bos.toByteArray());
        ObjectInputStream ois = new ObjectInputStream(bis);
        return ois.readObject();
    }
```
