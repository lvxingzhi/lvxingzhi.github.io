---
title: 【Design pattern】设计模式系列(二十一)访问者模式
date: 2015-06-21 11:22:02
tags:
categories:
- 笔记
---
> [Design pattern]: 设计模式相关系列

介绍
----
**概念：** 表示一个作用于某对象结构中的各元素的操作。它使你可以在不改变各元素的类的前提下定义作用于这些元素的新操作。
**应用场景：** 实体之间内部属性有差别，而且实体类型经常增加。他们的调用方式相同，但是调用的规则经常变化。
**缺点：** 实体的特殊内容访问类需要知道。


#### CODE

> 实体基类
```java
package note.com.visitor;
public abstract class Food {

    public abstract void show(IVisitor visitor);
}
```

> 具体实体
```java
package note.com.visitor;

/**
 * 面条
 * @author Br
 *
 */

public class Noodle extends Food{
    private String price = "5块";
    private String image = "***";
    private String foodA = "营养1";
    private String foodB = "营养2";
    private String foodC = "营养3";

    @Override
    public void show(IVisitor visitor) {
        visitor.show(this);

    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getFoodA() {
        return foodA;
    }

    public void setFoodA(String foodA) {
        this.foodA = foodA;
    }

    public String getFoodB() {
        return foodB;
    }

    public void setFoodB(String foodB) {
        this.foodB = foodB;
    }

    public String getFoodC() {
        return foodC;
    }

    public void setFoodC(String foodC) {
        this.foodC = foodC;
    }
}
```

```java
package note.com.visitor;

/**
 * 米
 * @author Br
 *
 */
public class Rice extends Food{

    private String price = "2块";
    private String image = "&&&";
    private String foodA = "营养1";
    private String foodD = "营养2";
    private String foodE = "营养3";

    @Override
    public void show(IVisitor visitor) {
        visitor.show(this);
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getFoodA() {
        return foodA;
    }

    public void setFoodA(String foodA) {
        this.foodA = foodA;
    }

    public String getFoodD() {
        return foodD;
    }

    public void setFoodD(String foodD) {
        this.foodD = foodD;
    }

    public String getFoodE() {
        return foodE;
    }

    public void setFoodE(String foodE) {
        this.foodE = foodE;
    }

}
```
```java
package note.com.visitor;

/**
 * 汤
 * @author Br
 *
 */
public class Soup extends Food{
    private String price = "1块";
    private String image = "###";
    private String foodA = "营养1"; 
    private String foodF = "营养2"; 
    private String foodG = "营养3"; 
    
    @Override
    public void show(IVisitor visitor) {
        visitor.show(this);
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getFoodA() {
        return foodA;
    }

    public void setFoodA(String foodA) {
        this.foodA = foodA;
    }

    public String getFoodF() {
        return foodF;
    }

    public void setFoodF(String foodF) {
        this.foodF = foodF;
    }

    public String getFoodG() {
        return foodG;
    }

    public void setFoodG(String foodG) {
        this.foodG = foodG;
    }
}
```

> 访问者接口定义
```java
package note.com.visitor;

public interface IVisitor {
    public void showMenu(Food foodO);

    public void show(Noodle noodle);
    
    public void show(Rice rice);
    
    public void show(Soup soup);
}
```

> 访问者实现
```java
package note.com.visitor;

/**
 * 菜单显示信息（访问者：获取到被访问者，按需求显示所要的信息）
 * @author Br
 *
 */
public class Visitor implements IVisitor{

    @Override
    public void showMenu(Food food) {
        food.show(this);
    }
    
    //下面的方法破坏了封装特性，因为这里清楚的知道对象拥有哪些方法，属性
    
    public void show(Noodle noodle){
        String show = noodle.getPrice()+" "+noodle.getImage()+" "+noodle.getFoodA()+" "+noodle.getFoodB()+" "+noodle.getFoodC();
        System.out.println(show);
    }
    
    public void show(Rice rice){
        String show = rice.getPrice()+" "+rice.getImage()+" "+rice.getFoodA()+" "+rice.getFoodD()+" "+rice.getFoodE();
        System.out.println(show);
    }
    
    public void show(Soup soup){
        String show = soup.getPrice()+" "+soup.getImage()+" "+soup.getFoodA()+" "+soup.getFoodF()+" "+soup.getFoodG();
        System.out.println(show);
    }
    
}
```

> 访问者与实体的组合类
```java
package note.com.visitor;

import java.util.ArrayList;
import java.util.List;


public class Menu {
    private List<Food> list = new ArrayList<Food>();
    /*显示菜单
     * 
     */
    public void showMenu(IVisitor visitor) {
        for(Food f : list){
            visitor.showMenu(f);
        }
    }
    
    public void addFood(Food food){
        list.add(food);
    }
}
```

> 测试类
```java
package note.com.visitor;

public class Test {
    public static void main(String[] args) {
        Menu menu = new Menu();
        //加入三个实体
        menu.addFood(new Noodle());
        menu.addFood(new Rice());
        menu.addFood(new Soup());
        //传入访问者获取菜单内容
        menu.showMenu(new Visitor());
    }
}
```

> 结果
```text
5块 *** 营养1 营养2 营养3
2块 &&& 营养1 营养2 营养3
1块 ### 营养1 营养2 营养3
```

####好处：
1. 如果要改变菜单中实体的具体显示，只需要更改访问者类的访问规则。
2. 如果要加入新的实体，只需要扩展访问者类的访问规则。