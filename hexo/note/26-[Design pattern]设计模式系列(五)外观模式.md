---
title: 【Design pattern】设计模式系列(五)外观模式
date: 2015-06-05 11:22:02
tags:
categories:
- 笔记
---
> [Design pattern]: 设计模式相关系列

介绍
----
**概念:** 为子系统中的一组接口提供一个一致的界面， Facade模式定义了一个高层接口，这个接口使得这一子系统更加容易使用。
**理解:** 某个子系统有很多很多的功能,包括一些很底层的操作,但是对于调用这个子系统的用户来说很少去操作底层的操作,那么用户希望有一个特别简单的入口就可以使用这个子系统的大部分操作,而不是调用各种类. 那么我们就给这个子系统加一个外观类吧
**使用场景:** JDBC对于不同的数据库访问提供了相同的入口.
**好处:** 简化了用户使用,并且子系统发生改变用户不需要知道(例如JDBC,为QUERY做一个外观类).
<!--more-->

### CODE
> 比如我们对Jdbc进行一次外观包装
```java
package note.com.facade;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class FacadeUtil {

    public static Statement getStatement(String url, String user,
                                         String password) {
        Statement stmt = null;
        try {
            // 建立连接
            Connection con = DriverManager.getConnection(url, user, password);
            // 创建语句
            stmt = con.createStatement();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return stmt;
    }

    public static void closeState(Statement state){
        try {
            state.close();
            state.getConnection().close();
        } catch (SQLException e) {
            e.printStackTrace();
        }

    }
}
```

> 用户在使用的时候就可以只调用该工具就能实现JDBC的大部分操作了,并且换数据库只需要传入对应的URL,USER,PASSWORD就可以了. 其实它只是个工具而已......
当然JDBC本身已经对底层进行了外观包装了.

