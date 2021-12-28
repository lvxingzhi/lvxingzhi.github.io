---
title: 【Design pattern】设计模式系列(八)组合模式
date: 2015-06-08 11:22:02
tags:
categories:
    - Design pattern
---
> \[Design pattern\]: 设计模式相关系列

介绍
----
**意图:** 将对象组合成树形结构以表示“部分 -整体”的层次结构。 C o m p o s i t e使得用户对单个对象和组合对象的使用具有一致性。
**适用性:** 1,你想表示对象的部分 -整体层次结构。 2,你希望用户忽略组合对象与单个对象的不同，用户将统一地使用组合结构中的所有对象。
**应用场景** :树形结构,从树顶控制整个树的操作.

#### CODE
> 政府接口
```java
package note.com.composite;

/**
 * 政府接口
 * @author lxz
 *
 */
public interface Government{

    public void build(String str1);

    public boolean add(Government gov);

    public boolean delete(Government gov);
}
```
<!--more-->
> 定义了默认方法的抽象类
```java
package note.com.composite;

/**
 * 构造默认新增,删除方法
 * @author lxz
 *
 */
public abstract class AbstractGovernment implements Government{

    public boolean add(Government gov) {
        return false;
    }

    public boolean delete(Government gov) {
        return false;
    }
}
```

> 树顶,根节点
```java
package note.com.composite;

import java.util.ArrayList;
import java.util.List;

/**
 * 中国政府
 * @author lxz
 *
 */
public class ChinaGov extends AbstractGovernment{

    private List<Government> govList = new ArrayList<Government>();
    public void build(String str1) {
        System.out.println("中国:"+str1);
        doIter(str1);
    }

    private void doIter(String str1){
        for(Government gov:govList){
            gov.build(str1);
        }
    }

    @Override
    public boolean add(Government gov) {
        govList.add(gov);
        return true;
    }

    @Override
    public boolean delete(Government gov) {
        govList.remove(gov);
        return true;
    }

}
```

> 无子节点的节点
```java
package note.com.composite;

/**
 * 北京市政府
 * @author lxz
 *
 */
public class BeiJingGov extends AbstractGovernment{

    public void build(String str1) {
        System.out.println("北京市:"+str1);
    }
}
```
```java
package note.com.composite;

/**
 * 郑州市政府
 * @author lxz
 *
 */
public class ZhengZhouGov extends AbstractGovernment{

    public void build(String str1) {
        System.out.println("郑州市:"+str1);
    }

}
```

> 有子节点的节点
```java
package note.com.composite;

import java.util.ArrayList;
import java.util.List;

/**
 * 河南省政府
 * @author lxz
 *
 */
public class HeNanGov extends AbstractGovernment{

    private List<Government> govList = new ArrayList<Government>();
    public void build(String str1) {
        System.out.println("河南省:"+str1);
        doIter(str1);
    }

    private void doIter(String str1){
        for(Government gov:govList){
            gov.build(str1);
        }
    }

    @Override
    public boolean add(Government gov) {
        govList.add(gov);
        return true;
    }

    @Override
    public boolean delete(Government gov) {
        govList.remove(gov);
        return true;
    }
}
```

> 测试类
```java
package note.com.composite;

public class CompositeTest {
    public static void main(String[] args) {
        Government gov = new ChinaGov();
        Government beijing = new BeiJingGov();
        Government henan = new HeNanGov();
        gov.add(beijing);
        gov.add(henan);
        Government zhengzhou = new ZhengZhouGov();
        henan.add(zhengzhou);

        //中国下发命令
        gov.build("大扫除");
        //河南下发命令
        henan.build("涨工资");

    }
}
``` 



