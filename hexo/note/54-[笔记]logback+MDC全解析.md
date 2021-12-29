---
title: 【笔记】logback+MDC全解析
date: 2019-05-15 10:32:02
tags:
categories:
    - 笔记
---
> \[笔记系列文章说明\]: 该类型的文章是笔者学习过程中整理的学习笔记.

#### logback的配置详解
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!--        表达式一览       -->
<!--        -X号: X信息输出时左对齐；-->
<!--        %p: 输出日志信息优先级，即DEBUG，INFO，WARN，ERROR，FATAL,-->
<!--        %d: 输出日志时间点的日期或时间，默认格式为ISO8601，也可以在其后指定格式，比如：%d{yyy MMM dd HH:mm:ss,SSS}，输出类似：2002年10月18日 22：10：28，921-->
<!--        %r: 输出自应用启动到输出该log信息耗费的毫秒数-->
<!--        %c: 输出日志信息所属的类目，通常就是所在类的全名-->
<!--        %t: 输出产生该日志事件的线程名-->
<!--        %l: 输出日志事件的发生位置，相当于%C.%M(%F:%L)的组合,包括类目名、发生的线程，以及在代码中的行数。举例：Testlog4.main (TestLog4.java:10)-->
<!--        %x: 输出和当前线程相关联的NDC(嵌套诊断环境),尤其用到像Java servlets这样的多客户多线程的应用中。-->
<!--        %%: 输出一个”%”字符-->
<!--        %F: 输出日志消息产生时所在的文件名称-->
<!--        %L: 输出代码中的行号-->
<!--        %m: 输出代码中指定的消息,产生的日志具体信息-->
<!--        %n: 输出一个回车换行符，Windows平台为”\r\n”，Unix平台为”\n”输出日志信息换行-->

<!-- scan属性未true时，如果配置文档发生改变将会进行重新加载 -->
<!-- scanPeriod属性设置监测配置文件修改的时间间隔，默认单位为毫秒，在scan为true时才生效 -->
<!-- debug属性如果为true时，会打印出logback内部的日志信息 -->
<configuration scan="true" scanPeriod="5 seconds" debug="true">
    <!--定义变量-->
    <property name="app.name" value="app" />
    <property name="log.level" value="debug" />
    <property name="log.maxHistory" value="30" />
    <property name="log.filePath" value="${catalina.base}/logs/webapps" />
    <property name="log.pattern" value="%d{yyyy-MM-dd HH:mm:ss.SSSS} [%thread] %-5level %logger{50}-%msg%n" />
    <property name="log.pattern2" value="%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n" />

    <!--每个appender代表一个输出-->
<!--    org.apache.log4j.ConsoleAppender（控制台）-->
<!--    org.apache.log4j.FileAppender（文件）-->
<!--    org.apache.log4j.DailyRollingFileAppender（每天产生一个日志文件）-->
<!--    org.apache.log4j.RollingFileAppender（文件大小到达指定尺寸的时候产生一个新的文件）-->
<!--    org.apache.log4j.WriterAppender（将日志信息以流格式发送到任意指定的地方）-->
    <!--控制台输出-->
    <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>${log.pattern2}</pattern>
        </encoder>
    </appender>

    <appender name="FILE1" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <encoder>
            <pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
            <charset>utf-8</charset>
        </encoder>
        <file>log/output.log</file>
<!--        滚动策略-->
<!--        TimeBasedRollingPolicy - 基于时间-->
<!--        SizeAndTimeBasedRollingPolicy - 基于文件大小和时间-->
<!--        FixedWindowRollingPolicy - 基于自定义滚动触发 配合triggeringPolicy配置触发-->
        <rollingPolicy class="ch.qos.logback.core.rolling.FixedWindowRollingPolicy">
            <fileNamePattern>rolllog/output.log.%i</fileNamePattern>
        </rollingPolicy>
        <triggeringPolicy class="ch.qos.logback.core.rolling.SizeBasedTriggeringPolicy">
            <MaxFileSize>1KB</MaxFileSize>
        </triggeringPolicy>
    </appender>

    <appender name="FILE2" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <encoder>
            <pattern>%d [%t] %-5level %logger{36} [%file : %line] - %msg%n</pattern>
            <charset>utf-8</charset>
        </encoder>
        <!--获取java启动时的配置值,可根据环境不同利用启动区分,java -Dscheduler.manager.server.home=/path/to-->
        <file>log/${app.name}.log</file>
        <!--日志滚动策略-->
        <rollingPolicy class="ch.qos.logback.core.rolling.FixedWindowRollingPolicy">
            <fileNamePattern>rolllog/${app.name}.log.%i</fileNamePattern>
        </rollingPolicy>
<!--        <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">-->
            <!--日志文件输出的文件名-->
<!--            <FileNamePattern>${LOG_HOME}/${LOG_NAME}.info.log.%d{yyyy-MM-dd-HH}.%i.log</FileNamePattern>-->
            <!--日志文件保留天数-->
<!--            <MaxHistory>7</MaxHistory>-->
            <!--日志文件的最大大小-->
<!--            <MaxFileSize>100MB</MaxFileSize>-->
<!--        </rollingPolicy>-->
        <triggeringPolicy class="ch.qos.logback.core.rolling.SizeBasedTriggeringPolicy">
            <MaxFileSize>1KB</MaxFileSize>
        </triggeringPolicy>
    </appender>
    <!--为appender增加异步-->
    <!-- 不丢失日志.默认的,如果队列的80%已满,则会丢弃TRACT、DEBUG、INFO级别的日志 -->
    <!-- 更改默认的队列的深度,该值会影响性能.默认值为256 -->
    <!-- 添加附加的appender,最多只能添加一个 -->
    <appender name="file.async" class="ch.qos.logback.classic.AsyncAppender">
        <discardingThreshold>0</discardingThreshold>
        <queueSize>256</queueSize>
        <includeCallerData>true</includeCallerData>
        <appender-ref ref="FILE2" />
    </appender>

    　　<!-- 使用异步来记录其他信息-->
    <appender name="file.async.other" class="ch.qos.logback.classic.AsyncAppender">
        <discardingThreshold>0</discardingThreshold>
        <queueSize>256</queueSize>
        <includeCallerData>true</includeCallerData>
        <appender-ref ref="FILE1" />
    </appender>



    <!--定义日志输出匹配的级别,包,默认root-->
    <logger name="ch.qos" level="%{log.level}" additivity="false">
        <appender-ref ref="file.async" />
        <appender-ref ref="file.async.other" />
    </logger>
    <root level="INFO">
        <appender-ref ref="CONSOLE" />
        <appender-ref ref="FILE1" />
        <appender-ref ref="FILE2" />
    </root>
</configuration>

<!--        https://www.cnblogs.com/wenbronk/p/6529161.html-->
<!--        http://www.51gjie.com/javaweb/1108.html-->
```

#### MDC,NDC
**什么是MDC?**
Mapped Diagnostic Context
线程独立自定义Map存储上下文信息,子线程拷贝父线程Map信息
```text
1.保存信息到上下文
MDC.put(key, value);

2.从上下文获取设置的信息
MDC.get(key);

3.清楚上下文中指定的key的信息
MDC.remove(key);

4.清除所有
clear()

5.输出模板，注意是大写[%X{key}]
log4j.appender.consoleAppender.layout.ConversionPattern = %-4r [%t] %5p %c %x - %m - %X{key}%n
```
**什么是NDC?**
Nested Diagnostic Context
线程独立自定义栈存储上下文信息,子线程拷贝父线程栈信息
```text
1.开始调用
NDC.push(message);

2.删除栈顶消息
NDC.pop();

3.清除全部的消息，必须在线程退出前显示的调用，否则会导致内存溢出。
NDC.remove();

4.输出模板，注意是小写的[%x]
log4j.appender.stdout.layout.ConversionPattern=[%d{yyyy-MM-dd HH:mm:ssS}] [%x] : %m%n
```

#### logback中的MDC
##### 单机MDC使用
```java

import ch.qos.logback.classic.LoggerContext;
import ch.qos.logback.classic.encoder.PatternLayoutEncoder;
import ch.qos.logback.classic.spi.ILoggingEvent;
import ch.qos.logback.core.ConsoleAppender;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;

public class SimpleMDC {
    static public void main(String[] args) {
        Logger logger = LoggerFactory.getLogger(SimpleMDC.class);
        programmaticConfiguration();
        logger.info("今天的天气真不错");
        logger.info("是的, 雨好大啊");
        MDC.put("one", "one");
        MDC.put("two", "two");
        logger.info("今天的天气真不错");
        logger.debug("是的, 雨好大啊");
        MDC.put("one", "three");
        MDC.put("two", "four");
        logger.info("今天的天气真不错");
        logger.info("是的, 雨好大啊");
        // 实际使用,通常在finally中使用MDC.remove清除掉旧值
        MDC.remove("one");
        MDC.remove("two");
    }

    /**
     * 定义日志输出格式
     */
    static void programmaticConfiguration() {
        LoggerContext loggerContext = (LoggerContext) LoggerFactory.getILoggerFactory();
        loggerContext.reset();
        PatternLayoutEncoder layout = new PatternLayoutEncoder();
        layout.setContext(loggerContext);
        layout.setPattern("%X{one} %X{two} - %m%n");
        layout.start();
        ConsoleAppender<ILoggingEvent> appender = new ConsoleAppender<ILoggingEvent>();
        appender.setContext(loggerContext);
        appender.setEncoder(layout);
        appender.start();
        ch.qos.logback.classic.Logger root = (ch.qos.logback.classic.Logger) LoggerFactory.getLogger("root");
        root.addAppender(appender);
    }
}

```

#### 跨服务MDC使用(web + dubbo)
1. 使用Spring拦截器HandlerInterceptorAdapter初始化MDC trace
```java
/**
 * 日志跟踪
 */
public class TraceLogInterceptor extends HandlerInterceptorAdapter {

	/* 追踪ID */
	private static final String TRACE_KEY = "traceId";

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)throws Exception {
		String a = UUID.randomUUID().toString().replace("-", "");
		MDC.put(TRACE_KEY, a);
		HttpLogLocalCache.setMsg( a);
		return true;
	}

	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
		MDC.clear();
	}
}

```

2. 使用Dubbo Filter拦截, RpcContext传递
调用者设置值
```java
public class TraceConsumerFilter implements Filter {
    private static Logger logger = LoggerFactory.getLogger(TraceConsumerFilter.class);
    /* 追踪ID */
    private static final String TRACE_KEY = "traceId";
    @Override
    public Result invoke(Invoker<?> invoker, Invocation invocation) throws RpcException {
        LoggerFactory.getLogger(invoker.getInterface().getName()).info(" [dubbo consumer] 服务调用-请求|method:{}|参数:{}| client[ip:{}-protocol:{}]", invocation.getMethodName(), invocation.getArguments(), RpcContext.getContext().getRemoteAddressString(), invoker.getUrl().getProtocol());
        try {
            logger.debug("MDC-traceId:" + MDC.get(TRACE_KEY));
            RpcContext.getContext().setAttachments(MDC.getCopyOfContextMap());
        } catch (Exception ex) {
            logger.error("dubbo consumer MDC-traceId:reset fail");
        }
        Result result = invoker.invoke(invocation);
        LoggerFactory.getLogger(invoker.getInterface().getName()).info(" [dubbo consumer] 服务调用-返回|method:{}|结果:{}| client[ip:{}-protocol:{}]", invocation.getMethodName(), result, RpcContext.getContext().getRemoteAddressString(), invoker.getUrl().getProtocol());
        return result;
    }

}

```

消费者获取值
```java
public class TraceProviderFilter implements Filter {

    @Override
    public Result invoke(Invoker<?> invoker, Invocation inv) throws RpcException {
        RpcContext context = RpcContext.getContext();
        MDC.setContextMap(context.getAttachments());
        LoggerFactory.getLogger(invoker.getInterface().getName()).info(" [dubbo provider] 服务调用-接收|method:{}|参数:{}| client[ip:{}-protocol:{}]", inv.getMethodName(), inv.getArguments(), RpcContext.getContext().getRemoteAddressString(), invoker.getUrl().getProtocol());
        long start = System.currentTimeMillis();
        Result result = invoker.invoke(inv);
        long time = System.currentTimeMillis() - start;
        Object rval = result.getValue();
        String logtxt = null;
        if (rval != null) {
            Class<?> clazz = rval.getClass();
            if (List.class.isAssignableFrom(clazz)) {
                int size = ((List) rval).size();
                if (size > 5) {
                    logtxt = size + "(SIZE)";
                } else {
                    logtxt = JSON.toJSONString(rval, new LogArgumentFilter());
                }
            } else if (Set.class.isAssignableFrom(clazz)) {
                int size = ((Set) rval).size();
                if (size > 5) {
                    logtxt = size + "(SIZE)";
                } else {
                    logtxt = JSON.toJSONString(rval, new LogArgumentFilter());
                }
            } else {
                logtxt = JSON.toJSONString(rval, new LogArgumentFilter());
            }
        }
        LoggerFactory.getLogger(invoker.getInterface().getName()).info(" [dubbo provider] 服务调用-返回|method:{}|结果:{}| client[ip:{}-protocol:{}]", inv.getMethodName(), logtxt, RpcContext.getContext().getRemoteAddressString(), invoker.getUrl().getProtocol());
        LoggerFactory.getLogger(invoker.getInterface().getName()).info(" [dubbo provider 服务性能] 统计|method:{}|耗时:{} ms|host:{}", inv.getMethodName(), time, RpcContext.getContext().getRemoteAddressString());
        try {
            MDC.clear();
        } catch (Exception ex) {
            LoggerFactory.getLogger(TraceProviderFilter.class).error("dubbo provider MDC-traceId:reset fail");
        }
        return result;
    }
}

```

调用者配置 spring-dubbo-reference.xml
```xml
	<dubbo:consumer filter="traceConsumerFilter"  version="1.0" timeout="3000" check="${dubbo.reference.check}"/>
```
提供者者配置 spring-dubbo-provider.xml
```xml
	<dubbo:provider protocol="dubbo" filter="traceProviderFilter" version="1.0" timeout="3500" delay="-1" />
```

