---
title: 【笔记】Sonarqube-安装
date: 2017-10-21 13:13:33
tags:
categories:
- 笔记
---
> [笔记系列文章说明]: 该类型的文章是笔者学习过程中整理的学习笔记.

### 软件作用
根据规则分析源代码，进行数据统计，呈现在可视化界面，方便使用者对代码分析。

>使用软件：
1. 安装软件。
2. 使用者根据具体需要定义代码分析规则。
3. 利用Sonar软件对源代码分析上传到Sonar服务器。
4. 访问服务器图形界面，对代码进行分析。
5. 使用者根据分析结果，对项目进行优化调整。

### 帮助理解
Sonar-runner客户端:配置sonar服务端配置之后,可与sonar服务端结合分析,存储项目
maven或者Jenkins集成sonar，底层利用Sonar-runner客户端工具。

### Sonar+Sonar-runner进行项目的源代码分析
#### 准备
1. 下载sonarqube安装文件,下载地址:http://www.sonarqube.org/downloads/
2. 数据库一个（支持各种数据库，自带H2，速度慢，测试使用）
3. sonar-runner工具包

##### 安装步骤
###### 一,sonar
1, 配置
```text
配置sonarqube配置文件\conf\sonar.properties
sonar.jdbc.username=scholar2test
sonar.jdbc.password=scholar2test
sonar.jdbc.url=jdbc:oracle:thin:@192.168.10.222:1521:ora11g
sonar.web.port=9000
```

2, 版权问题使用oracle时自己导jdbc包
extensions/jdbc-driver/oracle目录下放入对应的oracle驱动jar包
路径oracle客户端目录 client_1\jdbc\lib下

3, 导入汉化包extensions/plugins
下载地址:http://docs.codehaus.org/display/SONAR/Chinese+Pack

4, 找到对应系统的执行目录,这里运行/bin/linux-x86-64/sonar.sh
<!--more-->
5, 访问地址
http://192.168.10.221:9000
默认账户 admin/admin

###### 二,sonar-runner
1, 解压到任何目录,配置环境变量到bin目录(/etc/profile),方便执行命令,记得用source 该文件命令使之生效
2, 在conf配置目录下配置sonar-runner.properties配置文件
形如下面:
```text
sonar.host.url=http://localhost:9000     sonar服务器地址
sonar.jdbc.url=jdbc:oracle:thin:@192.168.10.222:1521:ora11g    oracle地址表空间配置
sonar.jdbc.username=scholar2test          oracle用户名
sonar.jdbc.password=scholar2test          oracle密码
sonar.login=admin                      sonar服务器web登陆用户名
sonar.password=admin                   sonar服务器web登陆密码
```
3, 比如我想监测ABC这个项目的源代码质量怎么样,在ABC目录中新建一个文件sonar-project.properties（换位置就修改下面的配置文件sources）    这个文件里面配置要监测的目录,监测规则,上传到服务器的名称,唯一标识等.
例如:
```text
sonar.projectName=My project
sonar.projectVersion=1.0
sonar.sources=.
```

4, 配置完成后,在所在的目录执行sonar-runner命令（自动当前目录寻找配置文件）,随即开始上传到服务端进行分析存储.
根据提示链接访问查看分析结果.如图：
![](/images/11-01.png)

###### 可能不成功的原因:具体根据错误信息分析
1,Oracle驱动包没有导入
2,安装启动提示jvm内存不足   修改wrapper.conf配置文件的内存分配(4--->8)
3,运行出现内容内存溢出,修改sonar运行内存
Linux:export SONAR_RUNNER_OPTS="-Xmx512m -XX:MaxPermSize=128m"
Windows:set SONAR_RUNNER_OPTS=-Xmx512m -XX:MaxPermSize=128m

###### Sonar-project.properties配置文件详细功能
```text
常用参数(Mandatory Parameters):
Sonar.host.url=http://localhost:9000        服务器地址
Sonar.jdbc.url=jdbc:h2:tcp://localhost:9092/sonar   数据源
Sonar.jdbc.username=sonar       数据库用户名
Sonar.jdbc.password=sonar       数据库密码
sonar.projectVersion=版本号
sonar.projectKey=唯一标识
Sonar.language=解析语言
sonar.projectName=web平台显示名称
Sonar.sources=目录
其他扩展参数(Optional Parameters)
见地址:
http://docs.sonarqube.org/display/SONAR/Analysis+Parameters
```

###### Sonarqube插件扩展下载地址:（注：使用中渐渐扩展，循序渐进）
* JavaScript代码检查：http://docs.codehaus.org/display/SONAR/JavaScript+Plugin
* python代码检查：http://docs.codehaus.org/display/SONAR/Python+Plugin
Web页面检查（HTML、JSP、JSF、Ruby、PHP等）
* http://docs.codehaus.org/display/SONAR/Web+Plugin
* xml文件检查：http://docs.codehaus.org/display/SONAR/XML+Plugin
* scm源码库统计分析：http://docs.codehaus.org/display/SONAR/SCM+Stats+Plugin
* 文件度量：http://docs.codehaus.org/display/SONAR/Tab+Metrics+Plugin
* 中文语言包：http://docs.codehaus.org/display/SONAR/Chinese+Pack
* 时间表显示度量结果：http://docs.codehaus.org/display/SONAR/Timeline+Plugin
* 度量结果演进图：http://docs.codehaus.org/display/SONAR/Motion+Chart+Plugin

#### Sonar+Maven进行项目的源代码分析
##### 准备: 下面是版本兼容信息,使用对应的版本
![](/images/11-02.png)

##### 步骤:
1,配置maven settings配置文件,加入sonarqube的配置信息如下:
```xml
<!--sonar配置-->
<profile>
     <id>sonar</id>
     <activation>
         <activeByDefault>true</activeByDefault>
     </activation>

     <properties>
          <sonar.jdbc.url>
          jdbc:oracle:thin:@192.168.10.222:1521:ora11g
          </sonar.jdbc.url>
          <sonar.jdbc.username>scholar2test</sonar.jdbc.username>
          <sonar.jdbc.password>scholar2test</sonar.jdbc.password>
         <sonar.host.url>http://192.168.10.221:9000</sonar.host.url>
     </properties>
</profile>
```

2, 针对科研之友项目特别注意:
在分析项目之前,需要执行mvn clean 编译一下scm3-parent项目,把各自依赖的项目打包,保证所有的模块（即code包）jar包都生成, 否则在分析模块的时候去本地库/远程库找不到对应的包,不需要使用mvn install.
在pom.xml所在文件夹运行mvn sonar:sonar 开始分析 提示成功则可登陆sonar服务器web平台查看分析结果.
