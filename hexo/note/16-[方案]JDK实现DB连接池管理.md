---
title: 【方案】JDK实现DB连接池管理
date: 2017-11-20 21:21:27 
tags:
categories:
    - 方案
---
> \[方案系列文章说明\]: 该类型的文章是我在使用和学习中认为不错的解决办法,当然会有更好的方案,也一定会有, 所以文章具有一定的局限性, 请结合自己的思考辩证的看.

#### 1,连接池接口定义
```java
package dbsource;

import java.sql.Connection;
import java.sql.SQLException;

/**
 * 连接池接口
 * @author lxz
 *
 */
public interface DBSource {

    Connection getConnection() throws SQLException;
    
    void closeConnection(Connection con) throws SQLException;
}
```
<!--more-->
#### 2,连接池接口实现
```java
package dbsource;

import java.io.FileInputStream;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

public class BasicDBSource implements DBSource {

    private final static String URL = "url";
    private final static String PASSWORD = "password";
    private final static String USER = "user";
    private final static String POOLMAX = "poolmax";
    private final static String DRIVER = "driver";
    private final static String INIT = "init";
    private final static String DEFAULT_PRO = "myjdbc.properties";

    private Properties pro = new Properties();// 属性文件对象
    private String url;// 地址
    private String user;// 数据库用户名
    private String password;// 数据库密码
    private int max;// 最大连接数
    private int init;//初始化连接池
    private List<Connection> connections;// 数据连接集合
    

    public BasicDBSource(String configFile) throws IOException,
            ClassNotFoundException {
        pro.load(new FileInputStream(configFile));
        url = pro.getProperty(URL);
        user = pro.getProperty(USER);
        password = pro.getProperty(PASSWORD);
        max = Integer.parseInt(pro.getProperty(POOLMAX));
        init = Integer.parseInt(pro.getProperty(INIT));
        Class.forName(pro.getProperty(DRIVER));
        connections = new ArrayList<Connection>();
        for(int i=0;i<init;i++){
            try {
                connections.add(DriverManager.getConnection(url,user,password));
            } catch (SQLException e) {
                //数据库连接失败
            }
        }
    }

    public BasicDBSource() throws ClassNotFoundException, IOException{
        this(DEFAULT_PRO);
    }
    
    public Connection getConnection() throws SQLException {
        if(connections.size()==0){
            return DriverManager.getConnection(url,user,password);
        }else{
            int last = connections.size()-1;
            return connections.remove(last);
        }
    }

    public void closeConnection(Connection con) throws SQLException {
        if(connections.size()>=max){
            con.close();
        }else{
            connections.add(con);
        }
    }
}
```

#### 3,配置文件
```properties
url=数据库地址
password=密码
user=用户名
poolmax=最大连接数
driver=数据库驱动
init=初始化连接数
```

#### 4,Test
```java
package source;

import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;

import dbsource.BasicDBSource;
import dbsource.DBSource;

public class MainTest {
    
    public static void main(String[] args) {
        try {
            DBSource dbsource = new BasicDBSource("myjdbc.properties");
            Connection con1 = dbsource.getConnection();
            System.out.println("第一次获取的数据库连接对象地址:"+con1);
            dbsource.closeConnection(con1);
            Connection con2 = dbsource.getConnection();
            System.out.println("第二次获取的数据库连接对象地址:"+con2);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
```