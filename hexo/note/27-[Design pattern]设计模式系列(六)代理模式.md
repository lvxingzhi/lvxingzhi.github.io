---
title: 【Design pattern】设计模式系列(六)代理模式
date: 2015-06-06 11:22:02
tags:
categories:
    - Design pattern
---
> \[Design pattern\]: 设计模式相关系列

介绍
----
**概念:** 为其他对象提供一种代理以控制对这个对象的访问。
**使用场景:** 增加一个对象操作的访问控制,如根据权限判断用户是否能执行某个方法. 另一个应用是延迟加载,比如图片的对象,直到真正改变图片文件时才真正加载.


### 一个带访问控制的代理例子
#### CODE
> 真正的执行对象
```java
package note.com.proxy;

/**
 * 可执行动作
 * @author lxz
 *
 */
public class Action {

    public void doOne(){
        System.out.println("One");
    }
    public void doTwo(){
        System.out.println("Two");
    }
    public void doThree(){
        System.out.println("Three");
    }

}
```
<!--more-->
> 权限控制类
```java
package note.com.proxy;

/**
 * 权限类
 * 
 * @author lxz
 *
 */
public class Permission {

    private boolean one = false;
    private boolean two = false;
    private boolean three = false;
    
    public Permission(boolean one,boolean two,boolean three){
        this.one = one;
        this.two = two;
        this.three = three;
    }
    
    public boolean isOne() {
        return one;
    }
    public void setOne(boolean one) {
        this.one = one;
    }
    public boolean isTwo() {
        return two;
    }
    public void setTwo(boolean two) {
        this.two = two;
    }
    public boolean isThree() {
        return three;
    }
    public void setThree(boolean three) {
        this.three = three;
    }
}
```

> 对Action的代理类  
```java
package note.com.proxy;

/**
 * 代理Action类
 * @author lxz
 *
 */
public class Proxy {

    private Action action = null;
    private Permission permission = null;
    
    public Proxy(Permission permission){
        this.action = new Action();
        this.permission = permission;
    }
    
    public void doOne(){
        if(permission.isOne()){
            action.doOne();
        }
    }
    public void doTwo(){
        if(permission.isTwo()){
            action.doTwo();
        }
    }
    public void doThree(){
        if(permission.isThree()){
            action.doThree();
        }
    }
    public Action getAction() {
        return action;
    }
    public void setAction(Action action) {
        this.action = action;
    }
    public Permission getPermission() {
        return permission;
    }
    public void setPermission(Permission permission) {
        this.permission = permission;
    }
}
```

> 测试类
```java
package note.com.proxy;

public class ProxyTest {
    public static void main(String[] args) {
        Permission permission = new Permission(true,false,true);
        Proxy proxy = new Proxy(permission);
        proxy.doOne();
        proxy.doTwo();
        proxy.doThree();
    }
}
```

> 结果
```text
One
Three
```
真正的对象由代理对象去掉用,并且在代理对象中增加的访问控制

