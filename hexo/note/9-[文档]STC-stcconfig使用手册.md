---
title: 【文档】STC-stcconfig 分布式动态配置中心使用手册
date: 2021-12-17 11:00:00
tags: 
categories:
---
>[手册系列文章说明]: 该类型的文章是对项目使用进行说明.

> 代码地址: https://github.com/lvxingzhi/stcconfig
### 概述
> 感谢使用stcconfig分布式动态配置中心, 为了更好地使用相关功能, 请按顺序阅读如下内容

#### stcconfig能做什么?
> stcconfig 分布式动态配置中心包含模块: stcconfig-server, stcconfig-client, stcconfig-web, demo-client
> stcconfig-server: 配置管理中心, 管理相关数据, 维护zookeeper相关节点, 提供对外API, 支持配置文件下载
> stcconfig-client: 配置客户端, 项目引入后可通过注解动态注入配置, 配置更新后实时更新配置文件, 参数值
> stcconfig-web: 配置管理WEB端, 通过UI方式管理环境,项目,配置文件

#### 概念说明
> 环境: 常见的项目开发部署通常包括多环境, 环境类型帮助定义区分不同的环境去使用 
> 项目: 以开发的项目模块为单位,可用于区分不同系统间的配置文件
> 配置: 即配置文件元数据

#### 适用范围
> 如果你的项目基于Spring/Spring boot/Spring cloud, 那么就可以使用stcconfig进行配置的管理

#### 架构图
![](/images/09-01.png)
<!--more-->
#### ZK节点一览
```
/stcconfig -- 根节点
/stcconfig/env --环境根节点
/stcconfig/env/x --环境节点
/stcconfig/env/x/project --项目根节点
/stcconfig/env/x/project/x --项目节点
/stcconfig/env/x/project/x/y --配置节点
```
#### 配置节点元数据
```
{"data":"1",
"fileName":"app.properties",
"path":"http://localhost:8100/client/getConfigFile?path=/stcconfig/env/1/project/1/1",
"version":1}
```
#### 服务端类关系图
![](/images/09-02.png)
#### 客户端类关系图
![](/images/09-03.png)

### 开始
以下步骤将帮助你使用stcconfig

#### 1. 环境准备
```aidl
JDK: 1.8+
Mysql: 5+
Spring: 3+
Maven: 3+
```

#### 2. 下载源码
从Github上下载
```aidl
git clone https://github.com/lvxingzhi/stcconfig.git
```

#### 3. 添加必要的持久化库表(MYSQL)
```aidl
路径: stcconfig-server/src/main/resources/SQL.sql
执行初始化脚本
```

#### 4. 安装zookeeper
```aidl
略
```

### 启动服务端
#### 1. 修改参数
服务端参数本地化配置(数据库,ZK)
```aidl
server.port = 8100
server.context-path=/

#spring
spring.datasource.name=stcconfig
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/stcconfig?serverTimezone=GMT%2B8&useUnicode=true&&characterEncoding=UTF-8&&useSSL=false&allowPublicKeyRetrieval=true
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.username=root 
spring.datasource.password=admin 
spring.datasource.type=com.alibaba.druid.pool.DruidDataSource

# mybatis
mybatis.mapper-locations=classpath:/mapper/*.xml
mybatis.type-aliases-package=cn.notenextday.stcconfigserver.dto
mybatis.configuration.map-underscore-to-camel-case=true

#stcconfig
stcconfig.server.url=localhost
stcconfig.server.port=8100

#zookeeper
#ZookeeperClientUtil单例配置类 --ZK配置去Util中修改
```

#### 2. 启动
执行: StcconfigServerApplication
```aidl
启动成功日志:
[stcconfig][server]启动成功
```

### 启动WEB端
#### 1. 修改参数
```aidl
ServerUrlConstant 配置类中BASE_URL 改为服务端的地址和端口
```

### 2. 启动
执行: StcconfigWebApplication
```aidl
启动成功日志:
2021-12-17 14:20:37.081  INFO 16200 --- [           main] c.n.s.StcconfigWebApplication            : Started StcconfigWebApplication in 2.182 seconds (JVM running for 2.936)
```

### 启动DEMO-CLIENT测试项目
#### 1. 添加stcconfig相关配置
项目application.properties中添加如下配置(根据真实环境修改相应配置)
```aidl
server.port = 8102
server.context-path=/

#stcconfig 配置
## 环境ID
server.stcconfig.envId=1
## 项目ID
server.stcconfig.projectId=1
## zookeeper地址
server.stcconfig.zookeeperUrl=127.0.0.1:2181
## resources目录下配置文件下载路径,默认stcconfig
server.stcconfig.directory=myconfig
```

#### 2. 启动DEMO-CLIENT(引入stcconfig-client,可发布相应的maven包)
执行: DemoClientApplication
```aidl
启动成功日志
[stcconfig-client][2021-12-17 14:22:57.975][main-EventThread][INFO][c.n.s.u.ZookeeperClientUtil][lambda$init$0:146][] -
                [stcconfig][client][zookeeper] 服务连接成功
[stcconfig-client][2021-12-17 14:23:01.026][main][WARN][c.n.s.m.PullConfigFileManage][pullConfigFile:106][] -
                [stcconfig][client]下载配置文件:/C:/work/workspace/stcconfig/demo-client/target/classes/myconfig/app.properties
[stcconfig-client][2021-12-17 14:23:01.141][main][INFO][c.n.s.u.FileReadToTypeUtil][properties2Map:56][] -
                [stcconfig][client] properties读取配置: name=韩梅梅1
[stcconfig-client][2021-12-17 14:23:01.142][main][WARN][c.n.s.m.PullConfigFileManage][pullConfigFile:106][] -
                [stcconfig][client]下载配置文件:/C:/work/workspace/stcconfig/demo-client/target/classes/myconfig/app2.properties
[stcconfig-client][2021-12-17 14:23:01.174][main][INFO][c.n.s.u.FileReadToTypeUtil][properties2Map:56][] -
                [stcconfig][client] properties读取配置: name=韩梅梅2
[stcconfig-client][2021-12-17 14:23:01.376][main][INFO][c.n.s.m.PullConfigFileManage][lambda$init$0:89][] -
                [stcconfig][client]赋值,fieldName:name, value:韩梅梅1
[stcconfig-client][2021-12-17 14:23:01.376][main][INFO][c.n.s.m.PullConfigFileManage][lambda$init$0:89][] -
                [stcconfig][client]赋值,fieldName:age, value:null
[stcconfig-client][2021-12-17 14:23:01.379][main][INFO][c.n.s.m.PullConfigFileManage][lambda$init$0:89][] -
                [stcconfig][client]赋值,fieldName:name, value:韩梅梅2
[stcconfig-client][2021-12-17 14:23:01.379][main][INFO][c.n.s.m.PullConfigFileManage][lambda$init$0:89][] -
                [stcconfig][client]赋值,fieldName:age, value:null
[stcconfig-client][2021-12-17 14:23:01.379][main][INFO][c.n.s.m.PullConfigFileManage][init:92][] -
                [stcconfig][client]测试赋值是否成功: demoBean.name=韩梅梅1
```

### 应用中的使用方式
```aidl
@Component
public class DemoClientBean {

    @StcconfigValue(key = "name", fileName = "app2.properties")
    private String name;
    @StcconfigValue(key = "age", fileName = "app4.yaml")
    private String age;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }
}
```
> 使用注解@StcconfigValue注入相应配置
> 
> 参数 key: 配置文件中的key值
> 参数 fileName: 配置文件名称


### WEB管理
#### 添加/修改环境
![](/images/05-05.png)
#### 添加/修改项目
![](/images/05-06.png)
#### 添加/修改配置
![](/images/05-07.png)





