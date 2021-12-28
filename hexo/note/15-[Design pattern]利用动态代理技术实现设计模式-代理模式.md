---
title: 【Design pattern】利用动态代理技术实现设计模式-代理模式
date: 2017-11-07 21:01:21 
tags:
categories:
    - Design pattern
---
> \[Design pattern\]: 设计模式相关系列

#### 什么时候可以使用代理模式?

需要在原有功能的基础上神不知鬼不觉的增加一些额外功能时,使用代理模式.

#### 如何实现？

##### 1,接口定义

```java
package kooko.com.proxy;

public interface HelloWorld {
    public void sayHelloWorld();
    public void sayBye();
}
```

##### 2,接口实现

```java
package kooko.com.proxy;

public class HelloWorldImpl implements HelloWorld{

    public void sayHelloWorld(){
        System.out.println("say hello");
    }

    public void sayBye(){
        System.out.println("say bye");
    }
}
```
<!--more-->
##### 3,代理功能类实现

```java
package kooko.com.proxy.handler;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

import kooko.com.proxy.HelloWorld;
import kooko.com.proxy.HelloWorldImpl;

/**
 * 动态代理
 * 实现给某个接口实现类的前后加上日志输出
 * @author lxz
 *
 */
public class HelloWorldHandler implements InvocationHandler{
    private Object obj;//要代理的原始对象

    public HelloWorldHandler(Object obj){
        super();
        this.obj = obj;
    }
    public HelloWorldHandler(){
        super();
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args)
            throws Throwable {
        Object result = null;
        doBefore();
        //
        result = method.invoke(obj, args);
        doAfter();
        return result;
    }

    private void doBefore(){
        System.out.println("before say hello");
    }

    private void doAfter(){
        System.out.println("after say hello");
    }

    public void setObject(Object xxx){
        this.obj=xxx;
    }

}
```

##### 4,调用测试方法
```text
 public static void main(String[] args){
        InvocationHandler handler = new HelloWorldHandler(new HelloWorldImpl());
        HelloWorldHandler xxxx= new HelloWorldHandler();
        xxxx.setObject(new HelloWorldImpl());
        InvocationHandler handler = xxxx;
        //这里需要类加载器
        HelloWorld proxy = (HelloWorld) Proxy.newProxyInstance(new HelloWorldHandler().getClass().getClassLoader()
                , new HelloWorldImpl().getClass().getInterfaces(), handler);
        proxy.sayHelloWorld();
        proxy.sayBye();
        
        //什么时候可以使用呢
        //封装一个代理服务类,当需要调用方法的前后做一些事情的时候,利用代理服务类来生成对象就可以了
    }
```