---
title: 【Design pattern】设计模式系列(七)适配器模式
date: 2015-06-07 11:22:02
tags:
categories:
- 笔记
---
> [Design pattern]: 设计模式相关系列

介绍
----
**意图:** 将一个类的接口转换成客户希望的另外一个接口。 A d a p t e r模式使得原本由于接口不兼容而不能一起工作的那些类可以一起工作。
**别名:** 包装器 Wrapper
**动机:** 有时，为复用而设计的工具箱类不能够被复用的原因仅仅是因为它的接口与专业应用领域所需要的接口不匹配。
**应用场景:** 需要使用到老的类,但是不符合新接口规则的时候,就是适配器出场的时候了

#### CODE
> 老的类
```java
package note.com.adapter;

public class OldActionA {
    public void start(){
        System.out.println("start开始工作");
    }
}
```

> 新的类基类
```java
package note.com.adapter;

public interface NewAction {
    public void run();
}
```

> 新的类实现 
```java
package note.com.adapter;

public class NewActionB implements NewAction{
    public void run(){
        System.out.println("run开始工作");
    }
}
```

> 新的调用规则
```java
package note.com.adapter;

public class NewClient {

    public void userDo(NewAction action){
        action.run();
    }
}
```

> 符合新的调用规则的老类适配器
```java
package note.com.adapter;

public class NewAdapter implements NewAction{//如果新类是没有基类的,可以直接继承新类

    private OldActionA a = null;
    public NewAdapter(OldActionA a){
        this.a = a;
    }
    public void run() {
        a.start();
    }

}
```

> 测试类
```java
package note.com.adapter;

public class AdapterTest {
    public static void main(String[] args) {
        NewClient client = new NewClient();//创建新的调用器
        NewActionB newB = new NewActionB();//符合新调用器规则的类
        client.userDo(newB);//调用器调用
        OldActionA oldA = new OldActionA();//不符合新调用器规则的类
        NewAdapter newA = new NewAdapter(oldA);//能够对不符合调用器规则的类进行适配的适配器
        client.userDo(newA);//调用器调用
    }
}
``` 
>结果
```text
run开始工作
start开始工作
```


