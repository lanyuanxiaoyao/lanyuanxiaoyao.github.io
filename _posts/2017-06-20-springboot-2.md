---
layout: post
title: Spring Boot（二） Spring mvc + Mybatis整合
date: 2017-06-20 13:30
categories: Spring
tags: [Spring,Spring Boot,Mybatis]
---

* content
{:toc}

# 说明
本文旨在记录spring boot中创建spring mvc + mybatis的整合，网上的各种乱七八糟的整合方式都有，所以把自己的套路记录下来，我采用的整合方式为：**gradle + spring mvc + mybatis**

# 项目结构
新建项目完成之后，项目结构如下：

![][1]  
- **main**
主目录，放编写的所有代码
	- **Demo2Application**
启动文件，项目从这个文件直接部署到内置的tomcat运行
- **resource**
	- **static**
放静态文件，如`js` `css`
	- **templates**
模板文件的默认目录
	-  **application.properties**
spring配置文件
- **test**
测试目录，用于测试代码

# 编写测试Demo
## 建数据库
先建立测试数据，我们在数据库中建两张表：`student`和`class`（其中有外键关系）：  

![][2]

![][3]

简单的数据库关系，其中学生信息中的班级和班级表构成外键关系，这里在数据库中不使用外键，而是在代码中维护外键关系

## 配置
由于spring boot的整合非常简洁，mybatis的配置不需要写一大串的xml文件，仅需要在默认的spring配置文件application.properties中配置即可  
### 数据库信息配置
application.properties
```
# 数据库参数
spring.datasource.url=jdbc:mysql://localhost:3306/springdemo?characterEncoding=utf-8
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.driver-class-name=com.mysql.jdbc.Driver
```
非常简单，根据字段故名思义，包括数据库连接，用户名，密码和对应数据库的驱动，这四个属性配置好了就可以基本使用了，如果还有其他要求可以在后面继续补充添加配置信息，包括多个数据源或第三方连接池的配置等。

  [1]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/Ashampoo_Snap_2017%E5%B9%B46%E6%9C%8820%E6%97%A5_11h47m55s_009_.png "项目结构"
  [2]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/Ashampoo_Snap_2017%E5%B9%B46%E6%9C%8820%E6%97%A5_11h59m28s_011_.png "student"
  [3]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/Ashampoo_Snap_2017%E5%B9%B46%E6%9C%8820%E6%97%A5_11h59m48s_012_.png "class"