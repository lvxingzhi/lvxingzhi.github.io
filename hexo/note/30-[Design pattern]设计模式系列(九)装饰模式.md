---
title: 【Design pattern】设计模式系列(九)装饰模式
date: 2015-06-09 11:22:02
tags:
categories:
- 笔记
---
> [Design pattern]: 设计模式相关系列

介绍
----
**意图:** 动态地给一个对象添加一些额外的职责。就增加功能来说， D e c o r a t o r模式相比生成子类更为灵活。
**使用场景:** 处理规则可以任意组装的时候
**结构图:**
![](/images/30-01.png)

#### CODE
> 过滤功能接口
```java
package note.com.decorator;

public interface Deal {
    public void deal();

    public String read();
}
```

> 过滤功能接口实现
```java
package note.com.decorator;

public class HtmlDeal implements Deal{
    private String string = null;

    public HtmlDeal(String str) {
        string = str;
    }

    public void deal() {
        System.out.println("HTML处理:"+ read());
    }

    public String getString() {
        return string;
    }

    public void setString(String string) {
        this.string = string;
    }

    public String  read() {
        return string;
    }

}
```

> 装饰过滤接口基类
```java
package note.com.decorator;

/**
 * 符合装饰规则的
 * @author lxz
 *
 */
public abstract class Decorator implements Deal{
    private Deal deal = null;
    public  Decorator(Deal deal) {
        this.deal = deal;
    }

    public void deal() {
        deal.deal();
    }

    public String read() {
        return deal.read();
    }
}
```

> 装饰器子类1
```java
package note.com.decorator;

public class ChineseDeal extends Decorator{

    public ChineseDeal(Deal deal) {
        super(deal);
    }

    public void deal() {
        System.out.println("Chinese处理:"+read());
        super.deal();
    }

    public String read() {
        return super.read();
    }
}
```

> 装饰器子类2
```java
package note.com.decorator;

public class EnglishDeal extends Decorator{

    public EnglishDeal(Deal deal) {
        super(deal);
    }

    public void deal() {
        System.out.println("English处理:"+read());
        super.deal();
    }

    public String read() {
        return super.read();
    }
}
```

> 测试类
```java
package note.com.decorator;

import java.lang.reflect.InvocationTargetException;

public class DecaratorTest {

    public static void main(String[] args) throws ClassNotFoundException,
            NoSuchMethodException, SecurityException, InstantiationException,
            IllegalAccessException, IllegalArgumentException,
            InvocationTargetException {
        Deal html = new HtmlDeal("请处理我这一串字符串");
        Deal chinese = new ChineseDeal(html);
        Deal english = new EnglishDeal(chinese);
        english.deal();

    }
}
```

> 结果
```text
English处理:请处理我这一串字符串
Chinese处理:请处理我这一串字符串
HTML处理:请处理我这一串字符串
``` 



