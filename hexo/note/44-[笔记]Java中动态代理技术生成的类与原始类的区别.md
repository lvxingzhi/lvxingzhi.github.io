---
title: 【笔记】Java中动态代理技术生成的类与原始类的区别
date: 2016-03-16 17:02:12
tags:
categories:
- 笔记
---
> \[笔记系列文章说明\]: 该类型的文章是笔者学习过程中整理的学习笔记.

用动态代理的时候,对它新生成的类长什么样子感到好奇.有幸通过一些资料消除了心里的疑惑.

平时工作使用的Spring框架里面有一个AOP(面向切面)的机制,只知道它是把类重新生成了一遍,在切面上加上了后来定义的逻辑.这样就达到了动态的在原有类上增加一些功能.比如日志打印,拦截信息等.

这里只关心动态代理技术生成新的类,先不管虚拟机是如何去生成类,用了什么字节码生成技术,怎么产生字节码等这一系列动作.现在只关心最后生成的新类长什么样,它和老类有什么区别.为了获取到生成后的代理类的字节码并且反编译成我们能够看得懂的代码,需要实现一个动态代理例子.
<!--more-->
#### 例子
> 接口
```java
package note.com;

/**
 * Girl接口
 * @author lxz
 *
 */
public interface IGirl {
    void sayHello();
}
```

> 接口实现,也是需要利用动态代理扩展功能的类
```java
package note.com;

/**
 * 具体Girl
 * @author lxz
 *
 */
public class MyGirl implements IGirl {
    public void sayHello() {
        System.out.println("如花似玉石榴姐");
    }
}
```

> 代理实现类
```java
package note.com;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

/**
 * 代理类
 * 功能:给IGirl实现类增加介绍
 * @author lxz
 *
 */
public class ProxyGirl implements InvocationHandler {
    Object originalObj;

    Object bind(Object originalObj) {
        this.originalObj = originalObj;
        return Proxy.newProxyInstance(originalObj.getClass()
                .getClassLoader(), originalObj.getClass().getInterfaces(),
                this);
    }

    public Object invoke(Object proxy, Method method, Object[] args)
            throws Throwable {
        System.out.println("第一美女是:");
        return method.invoke(originalObj, args);
    }
}
```

> 测试类
```java
package note.com;

/**
 * 测试类
 * 
 * @author lxz
 *
 */
public class Test {

    public static void main(String[] args) {
        IGirl hello = (IGirl) new ProxyGirl().bind(new MyGirl());
        hello.sayHello();
　　　　　System.out.println(hello.getClass().getName());
    }
}
```

> 结果
```text
第一美女是:
如花似玉石榴姐
com.sun.proxy.$Proxy0
```
这里可见hello真实类型是$Proxy0,到底它长什么样子,往下看.
#### 代理类字节码反编译结果
```java
package note.com;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.lang.reflect.UndeclaredThrowableException;

/**
 * 动态生成的类字节码的反编译结果
 *
 */
public final class $Proxy0 extends Proxy implements IGirl {

    private static Method m3;
    private static Method m1;
    private static Method m0;
    private static Method m2;

    /*
     * 构造函数传入能够访问真实对象的代理类,这个实际是上例Test中的new ProxyGirl()
     */
    protected $Proxy0(InvocationHandler h) {
        super(h);
    }

    /*
     * 代理实现sayHello,
     */
    public void sayHello() {
        try {
            this.h.invoke(this, m3, null);
        } catch (RuntimeException localRuntimeException) {
            throw localRuntimeException;
        } catch (Throwable localThrowable) {
            throw new UndeclaredThrowableException(localThrowable);
        }

    }

    /*
     * 代理实现继承自Object的equals
     */
    public void equals() {
        try {
            this.h.invoke(this, m1, null);
        } catch (RuntimeException localRuntimeException) {
            throw localRuntimeException;
        } catch (Throwable localThrowable) {
            throw new UndeclaredThrowableException(localThrowable);
        }
    }

    /*
     * 代理实现继承自Object的hashCode
     */
    public int hashCode() {
        try {
            return (Integer) this.h.invoke(this, m0, null);
        } catch (RuntimeException localRuntimeException) {
            throw localRuntimeException;
        } catch (Throwable localThrowable) {
            throw new UndeclaredThrowableException(localThrowable);
        }
    }

    /*
     * 代理实现继承自Object的toString
     */
    public String toString() {
        try {
            return (String) this.h.invoke(this, m2, null);
        } catch (RuntimeException localRuntimeException) {
            throw localRuntimeException;
        } catch (Throwable localThrowable) {
            throw new UndeclaredThrowableException(localThrowable);
        }
    }

    /*
     * 初始化真实对象中的所有方法
     */
    static {
        try {
            m3 = Class.forName("note.com.IGirl").getMethod("sayHello",
                    new Class[0]);
            m1 = Class.forName("java.lang.Object").getMethod("equals",
                    new Class[] { Class.forName("java.lang.Object") });
            m0 =  Class.forName("java.lang.Object").getMethod("equals",
                    new Class[0]);
            m2 =  Class.forName("java.lang.Object").getMethod("equals",
                    new Class[0]);
        } catch (NoSuchMethodException localNoSuchMethodException) {
            throw new NoSuchMethodError(localNoSuchMethodException.getMessage());
        } catch (ClassNotFoundException localClassNotFoundException) {
            throw new NoClassDefFoundError(
                    localClassNotFoundException.getMessage());
        }
    }

}
```

通过观察反编译后的动态类,这个逻辑并不复杂,主要功能是对所有的方法进行初始化,到执行某个方法的时候调用我们自己实现的代理类去执行扩展功能和原始类的方法.

##### 对原始类和动态代理后产生的类进行比较:
1. $Proxy0访问真实的类对象通过InvocationHandler的实现类调用.
2. 动态代理扩展功能并没有在$Proxy0中加入,而是回调InvocationHandler的接口,通过子类实现Invoke方法扩展.

从调用关系上看使用动态代理前后:
![](/images/44-01.png)
**左边:** 是原始的调用关系,原始类中有什么逻辑就执行什么.
**右边:** 是动态代理以后,通过动态代理生成类的对象调用代理类,代理类调用扩展逻辑,然后调用原始类对象的逻辑.由此实现了对原始类的动态扩展.
通过这样追本溯源的去了解,我对动态代理的理解更加深刻,也打消了心里的一个疑惑.


**ps：** 
动态代理什么时候用?可以参考这个:动态代理技术实现设计模式-代理模式
文中的字节码反编译是参考<<深入理解Java虚拟机 JVM高级特性与最佳实践>>这本书.

