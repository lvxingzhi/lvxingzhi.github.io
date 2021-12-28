---
title: 【项目】STC-stcconfig 分布式动态配置中心
date: 2021-11-03 16:12:31
tags: 
categories:
---
>\[项目系列文章说明\]: 该类型的文章是对项目的实现方案和部分代码进行说明.

STC-stcconfig 分布式动态配置中心: 包含服务端,客户端包,WEB管理三大模块组成
1,可实现配置,环境,项目三级管理.
2,客户端动态下载,注解方式加载配置文件配置.
3,服务端管理环境,zookeeper节点管理,版本管理,历史记录管理.
4,WEB管理实现配置文件更新,客户端实时变更.

>代码地址: https://github.com/lvxingzhi/stcconfig

## 系统实现原理
>注解实现配置注入
>核心容器管理配置与注解对象,实现动态更新
>https配置文件下载
>zookeeper节点管理实现配置层级管理,监控机制实现订阅
>服务器mysql持久化配置文件,客户端持久化本地
>基于layui实现UI

## 依赖
>1, spring boot
>2, mysql
>3, zookeeper
>4, fastjson, lombok等

## 难点
>1, 客户端实现动态配置文件下载,更新,监听
>2, 服务端实现zookeeper节点管理,更新,对比,删除
<!--more-->
## UI界面展示
### 首页
![](/images/05-01.png)
### 环境管理
![](/images/05-02.png)
### 项目管理
![](/images/05-03.png)
### 配置文件管理
![](/images/05-04.png)

## 使用说明
### 请参考另一篇文章: 【项目】STC-stcconfig 使用文档