---
title: 【文档】mybatis文件生成自定义工具
date: 2019-04-07 11:10:33
tags: 
categories:
---
>\[文档系列文章说明\]: 该类型的文章是对项目使用进行说明.

> 代码地址: https://github.com/lvxingzhi/MybatisGeneratorMysqlUtil.git

快速构建项目自定义的实体映射相关文件
<!-- more -->
### 使用说明
```java
package org.note.main;
 
import org.mybatis.generator.api.MyBatisGenerator;
import org.mybatis.generator.config.Configuration;
import org.mybatis.generator.config.xml.ConfigurationParser;
import org.mybatis.generator.exception.InvalidConfigurationException;
import org.mybatis.generator.exception.XMLParserException;
import org.mybatis.generator.internal.DefaultShellCallback;
 
import java.io.File;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
 
/**
 * Mian
 *
 * @Description TODO
 * @Author xingzhi.lv
 * @Version 1.0
 * @Date 2019/2/29 12:14
 */
public class GeneratorRun {
 
    /**
     *
     * 修改:
     *  1, 检查数据库地址,库名是否正确 generatorConfig.xml->jdbcConnection标签配置
     *  2, 修改generatorConfig.xml table标签tableName属性为要生成的表名
     *  3, 执行GeneratorRun.main
     *  4, 执行结果DAO,XML,Entity 三个类存放再build对应包中
     *  5, 拷贝对应文件到项目中,修改包名路径为项目路径
     *  6, 有XML的拷贝注意修改包路径
     *
     * @param args
     * @throws InvalidConfigurationException
     * @throws XMLParserException
     * @throws IOException
     * @throws SQLException
     * @throws InterruptedException
     */
    public static void main(String[] args) throws InvalidConfigurationException, XMLParserException, IOException, SQLException, InterruptedException {
        List<String> warnings = new ArrayList<String>();
        boolean overwrite = true;
        File configFile = new File(ClassLoader.getSystemResource("generatorConfig.xml").getFile());
        ConfigurationParser cp = new ConfigurationParser(warnings);
        Configuration config = cp.parseConfiguration(configFile);
        DefaultShellCallback callback = new DefaultShellCallback(overwrite);
        MyBatisGenerator myBatisGenerator = new MyBatisGenerator(config, callback, warnings);
        myBatisGenerator.generate(null);
    }
}
```


