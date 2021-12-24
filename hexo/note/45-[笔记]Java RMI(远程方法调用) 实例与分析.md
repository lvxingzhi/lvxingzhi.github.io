---
title: 【笔记】Java RMI(远程方法调用) 实例与分析
date: 2016-03-22 13:02:12
tags:
categories:
- 笔记
---
> [笔记系列文章说明]: 该类型的文章是笔者学习过程中整理的学习笔记.

#### 目的
通过本文,可以加深对Java RMI的理解,知道它的工作原理,怎么使用等. 也为了加深我自己的理解,故整理成文.不足之处,还望指出.

#### 概念解释
**RMI（RemoteMethodInvocation）：** 远程方法调用，顾名思义，通过远程的方式调用非本地对象的方法并返回结果。使用远程调用通常解决本地计算瓶颈问题，例如分布式记算，最近很火的阿尔法狗人机大战，据说运算使用上千个CPU。
**JRMP（java remote method protocol）：** java远程方法协议，这是完成java到java远程调用的协议，基于TCP协议。
**stub与skeleton：** 这两个概念下面会用到，这里解释下，skeleton是放在服务端的代理，它知道真正的对象在哪。stub是放在客户端的代理，它记录了查找和调用skeleton信息。理解成远程对象引用也成.

>容易混淆的概念

远程方法调用与远程过程调用的区别：远程方法调用是java独有的，基于JRMP对象流协议实现，支持传输java序列化对象。远程过程调用是基于socket技术实现的，不能传输java对象，socket套接字协议支持多种语言。它们都是基于TCP协议传输。远程方法调用传输的是java序列化对象和基本数据类型，而远程过程调用不支持传输对象。

**RMI调用模型：**
![](/images/45-01.png)
从宏观看,想要远程调用需要做两件事情,1,服务端向本地对象注册表中注册能被调用的远程对象. 2,客户端向远程对象注册表请求远程对象的引用.
<!--more-->
#### Java中RMI实现

先通过一个例子了解Java中RMI是怎么用的,然后再根据代码分析源码是如何实现的.

1,先创建远程对象接口,继承自Remote(稍后源码中有分析为什么要有这个接口)
```java
package remote.test;

import java.rmi.Remote;
import java.rmi.RemoteException;
/**
 * 远程接口,实现Remote
 * @author lxz
 *
 */
public interface IRemote extends Remote{

    public String show()throws RemoteException;//声明方法
}
```

2,接口实现,需要继承UnicastRemoteObject类,等会分析
```java
package remote.test;

import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;

/**
 * 远程接口实现,继承UnicastRemoteObject
 * @author lxz
 *
 */
public class RemoteImpl extends UnicastRemoteObject  implements IRemote{
    public RemoteImpl()throws RemoteException{}//构造方法
    public String show()throws RemoteException{//调用方法实现
        System.out.println("进入");
        System.out.println(this.toString());
        return "远程调用成功";
    }
}
```

3,服务端向本地端口1234对象注册表注册对象和它的名字
```java
package remote.test;

import java.net.MalformedURLException;
import java.rmi.AlreadyBoundException;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;

/**
 *  服务端启动,创建端口上的对象注册列表,向对象注册表中注册远程调用对象
 * @author lxz
 *
 */
public class TestServer {
    public static void main(String[] args) throws MalformedURLException, RemoteException, AlreadyBoundException, InterruptedException {
        RemoteImpl r = new RemoteImpl();//创建远程对象
        Registry rr = LocateRegistry.createRegistry(1234); //创建1234端口上的对象注册表,如果已经创建了就用getRegistry方法获取
        rr.bind("testrmi", r);//向注册表中注册对象
        System.out.println(r.toString());
    }
}    
```

4,根据JDK API,以上远程服务就算搭建完毕了,下面通过客户端调用测试
```java
package remote.test;

import java.net.MalformedURLException;
import java.rmi.Naming;
import java.rmi.NotBoundException;
import java.rmi.RemoteException;

/**
 * 客户端启动,获得远程的对象注册表中的对象引用
 * @author lxz
 *
 */
public class TestClient {

    public static void main(String[] args) throws MalformedURLException, RemoteException, NotBoundException {
        IRemote r = (IRemote) Naming.lookup("rmi://localhost:1234/testrmi");//获取远程1234端口对象注册表中testrmi的stub
        String a = r.show();//调用引用的方法,实际上调用的是stub,由stub与服务端交互并返回结果
        System.out.println(a);
    }
}
```

执行结果如下:
```text
服务端:

RemoteImpl[UnicastServerRef [liveRef: [endpoint:[192.168.1.253:58169](local),objID:[-60651394:1539d5944e6:-7fff, -6910034932968554489]]]]
客户端:

远程调用成功
```

这样就完成了一个远程对象注册与远程对象方法调用的完整例子. 现在根据这个例子来分析它为什么要继承UnicastRemoteObject,实现Remote,向注册表注册等等.

首先远程对象实现类中需要继承UnicastRemoteObject类,UnicastRemoteObject具有注册为远程对象,生成远程引用的功能等,所有都已经被JDK封装好了,不需要编写,其中的实现有些是sun包开头的,不公开.

**UnicastRemoteObject继承关系:**
![](/images/45-02.png)

有了远程对象实现类,看服务端的启动逻辑,其中:
```text
Registry rr = LocateRegistry.createRegistry(1234); 
```
LocateRegistry类:用于创建或获取某端口的对象注册表

LocateRegistry.createRegistry：这个方法表示获得远程对象注册表引用,返回Registry对象

Registry：真正操作远程对象注册表的接口

接着,
```text
rr.bind("testrmi", r);
```
利用Registry的对象,把刚刚创建的远程对象注册为名称testrmi. 这里还有一种写法,效果是一样的.
```text
LocateRegistry.createRegistry(1234); //创建,如果已经创建了就可省略这一句
Naming.bind("rmi://localhost:1234/testrmi", r);//需要带上端口
```
Naming：与对象注册表交互的工具类

上面是服务端从远程对象创建到对象注册的整个逻辑.客户端调用的逻辑比较简单,先通过Naming工具类获取到远程对象的引用以后,就可以正常使用了
```text
(IRemote) Naming.lookup("rmi://localhost:1234/testrmi");
```
这里返回的"引用"和通常讲的对象引用不同,是远程对象的引用信息.拿到这个"引用"以后就可以像使用真正的对象一样调用其中的方法.

结束.
