---
title: 【Design pattern】设计模式系列(十三)备忘录模式
date: 2015-06-13 11:22:02
tags:
categories:
- 笔记
---
> \[Design pattern\]: 设计模式相关系列

介绍
----
**概念:** 在不破坏封装性的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态。这样以后就可将该对象恢复到原先保存的状态。
**应用场景:** 需要保存某个对象的某个时间的状态,如游戏的暂停,存档,恢复功能. 如果把数据库与实体关联起来了,也可以说数据库是这个对象的备忘录.

<!--more-->
### 接来下实现一个游戏存档与读档的功能
#### CODE
> 游戏类
```java
package note.com.memento;

import java.math.BigDecimal;
import java.util.ArrayList;

public class DiningRoom {
    private Integer waiter = 1;//服务员初始1
    private String name = "default";//默认名称
    private BigDecimal money  = new BigDecimal(500);//初始金钱500
    private ArrayList<String> foods = new ArrayList<String>();

    public DiningRoom(){
        foods.add("小鸡炖蘑菇");
        foods.add("剁椒鱼头");
        foods.add("狗不理包子");
    }

    /*
     * 读档
     */
    public DiningRoom(SaveGame game){
        this.waiter = game.getWaiter();
        this.name = game.getName();
        this.money = game.getMoney();
        this.foods = game.getFoods();
        System.out.println("读取档案....");
        draw();
    }

    /*
     * 开始游戏
     */
    public void start(){
        System.out.println("游戏开始......");
        draw();
    }

    public void draw(){
        System.out.println("绘制显示......");
    }

    public void openDoor(){
        System.out.println("开业");
    }

    public void closeDoor(){
        System.out.println("打烊");
    }

    /*
     * 恢复游戏
     */
    public void back(SaveGame game){
        this.waiter = game.getWaiter();
        this.name = game.getName();
        this.money = game.getMoney();
        this.foods = game.getFoods();
        System.out.println("恢复档案...");
        draw();
    }

    /*
     * 存档
     */
    public SaveGame save(){
        return new SaveGame(this);
    }

    public void show(){
        System.out.println("餐厅名称:"+this.name);
        System.out.println("余额:"+this.money.toString());
        System.out.println("服务员:"+this.waiter+"人");
    }

    public Integer getWaiter() {
        return waiter;
    }

    public void setWaiter(Integer waiter) {
        this.waiter = waiter;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getMoney() {
        return money;
    }

    public void setMoney(BigDecimal money) {
        this.money = money;
    }

    public ArrayList<String> getFoods() {
        return foods;
    }

    public void setFoods(ArrayList<String> foods) {
        this.foods = foods;
    }
}
```

> 存档实体
```java
package note.com.memento;

import java.math.BigDecimal;
import java.util.ArrayList;

/**
 * 存档
 * @author lxz
 *
 */
public class SaveGame {
    private Integer waiter = 1;//服务员初始1
    private String name = "default";//默认名称
    private BigDecimal money  = new BigDecimal(500);//初始金钱500
    private ArrayList<String> foods = new ArrayList<String>();
    public SaveGame(DiningRoom room){
        this.waiter = room.getWaiter();
        this.name = room.getName();
        this.money = room.getMoney();
        this.foods = room.getFoods();
    }


    public Integer getWaiter() {
        return waiter;
    }
    public void setWaiter(Integer waiter) {
        this.waiter = waiter;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public BigDecimal getMoney() {
        return money;
    }
    public void setMoney(BigDecimal money) {
        this.money = money;
    }
    public ArrayList<String> getFoods() {
        return foods;
    }
    public void setFoods(ArrayList<String> foods) {
        this.foods = foods;
    }
}
```

> 测试类
```java
package note.com.memento;

import java.math.BigDecimal;

public class MementoTest {
    public static void main(String[] args) {
        DiningRoom game = new DiningRoom();
        game.show();
        game.start();
        game.setMoney(new BigDecimal(2000));
        game.setName("小洋人");
        game.show();//显示当前状态
        SaveGame save1 = game.save();
        game.setName("大洋人");
        game.show();//显示当前状态
        game.back(save1);//恢复到修改名称之前
        game.show();//恢复后状态

        //===================重新打开游戏
        System.out.println("=====重新开始=======");
        DiningRoom game2 = new DiningRoom(save1);//重新打开游戏读取存档
        game2.show();//存档状态
    }
}
```

> 结果
```text
餐厅名称:default
余额:500
服务员:1人
游戏开始......
绘制显示......
餐厅名称:小洋人
余额:2000
服务员:1人
餐厅名称:大洋人
余额:2000
服务员:1人
恢复档案...
绘制显示......
餐厅名称:小洋人
余额:2000
服务员:1人
=====重新开始=======
读取档案....
绘制显示......
餐厅名称:小洋人
余额:2000
服务员:1人
```
______
备忘录模式是比较容易理解的了.

