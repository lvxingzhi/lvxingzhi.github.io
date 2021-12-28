---
title: 【笔记】Java程序员对服务器一词的解释
date: 2016-03-25 11:02:32
tags:
categories:
    - 笔记
---
> \[笔记系列文章说明\]: 该类型的文章是笔者学习过程中整理的学习笔记.

#### 分类
**HTTP服务器:** 主要用作Http请求转发

**Servlet容器:** 满足Servlet规范的容器,

**应用服务器:** 满足J2EE规范的Web容器

#### 对比
根据他们的主要用途,用图表的形式给出

|  名称	|HTTP服务器	|Servlet容器	| 支持J2EE|	厂家   |
| ---- | ----   |   ----  |  ---- |  ----  |
|Tomcat	|×	|√|	×	|apache|
|Apache|	√|	×	|×	|apache|
|Jboss|	×|	×	|√	|Redhat|
|Nginx	|√	|×	|×	|Igor| Sysoev|
|WebLogic|	×|	√	|√|	Oracle|
|WebSphere	|×|	√	|√|	IBM|
|Resin|	×	|√	|×|	CAUCHO|
|Jetty|	×	|√|	×|	Webtide|