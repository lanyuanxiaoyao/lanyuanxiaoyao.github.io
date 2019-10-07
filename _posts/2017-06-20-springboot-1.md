---
title: Spring Boot（一） Spring Boot项目创建
key: 2017-06-20-springboot-1
date: 2017-06-20 10:44
categories: Spring
tags: [Spring,Spring Boot]
---

* content
{:toc}

# 简介
Spring Boot简化了基于Spring的应用开发，你只需要"run"就能创建一个独立的，产 品级别的Spring应用。	我们为Spring平台及第三方库提供开箱即用的设置，这样你 就可以有条不紊地开始。多数Spring	Boot应用只需要很少的Spring配置。
Spring Boot的目标是：
- 为所有Spring开发提供一个从根本上更快，且随处可得的入门体验。 
- 开箱即用，但通过不采用默认设置可以快速摆脱这种方式。 
- 提供一系列大型项目常用的非功能性特征，比如：内嵌服务器，安全，指标， 健康检测，外部化配置。 
- 绝对没有代码生成，也不需要XML配置。

## 系统要求
默认情况下，Spring Boot 1.4.0.BUILD-SNAPSHOT需要Java7环境，Spring框架 4.3.2.BUILD-SNAPSHOT或以上版本。你可以在Java6下使用Spring Boot，不过需 要添加额外配置。明确提供构建支 持的有Maven（3.2+）和Gradle（1.12+）。  
**注：尽管你可以在Java6或Java7环境下使用Spring Boot，通常建议尽可能使用 Java8**

## Servlet容器
下列内嵌容器支持开箱即用（out of the	box）：  

名称 | Servlet版本 | Java版本
---|---|---
Tomcat 8	|3.1	|Java 7+	
Tomcat 7	|3.0	|Java 6+	
Jetty 9.3	|3.1	|Java 8+	
Jetty 9.2	|3.1	|Java 7+	
Jetty 8	|3.0	|Java 6+	
Undertow 1.3 |3.1 |Java 7+	

你也可以将Spring	Boot应用部署到任何兼容Servlet 3.0+的容器。**spring boot默认使用tomcat**

## 其他
对于java开发者来说，使用Spring Boot就跟使用其他Java库一样，只需要在你的 classpath下引入适当的	spring-boot-\*.jar	文件。Spring	Boot不需要集成任何 特殊的工具，所以你可以使用任何IDE或文本编辑器；同时，Spring	Boot应用也没 有什么特殊之处，你可以像对待其他Java程序那样运行，调试它。  
尽管可以拷贝Spring Boot jars，但我们还是建议你使用支持依赖管理的构建工具， 比如Maven或Gradle。

# 开始使用
**本文使用IntelliJ IDEA作为IDE平台进行构建**  
**所使用各组件版本如下：**
- **IntelliJ IDEA 2017.1.4**
- **Java 1.8.0_121**
- **Gradle 4.10**
- **Spring Boot 2.0.0 M2**

IntelliJ IDEA平台已经提供了很方便的spring boot构建工具，因此构建spring boot变得更简单了
## 新建项目
首先新建新的项目，选择**spring initializr**

![][1]
## 填写项目信息
默认通过 https://start.spring.io 官网来进行构建，当然如果你构建了本地构建工具，也可以通过**custom**来指定本地构建工具的地址（尤其是在国内网络不好的时候）

![][2]
## 选择集成组件
![][3]  
spring boot 提供了很多的组件供我们选择，只要通过打勾的方式就可以简单地集成到项目当中
- Core  
spring核心库
	- Security  
这是一种基于 Spring AOP 和 Servlet 过滤器的安全框架。它提供全面的安全性解决方案，同时在 Web 请求级和方法调用级处理身份确认和授权
	- AOP  
在应用中使用Spring的AOP特性时所需的类。使用基于AOP的Spring特性，如声明型事务管理（Declarative Transaction Management），就要集成这个组件
	- Atomikos(JTA)  
这是一个事务管理器，Atomikos为Java平台提供增值服务的并且开源类事务管理器
	- Bitronic(JTA)  
这也是一个事务管理器，Bitronic是一个完全正常的XA事务管理器，它提供了JTA API所需的所有服务，同时尽可能简化了代码，以便更好地理解XA语义
	- Narayana(JTA)  
这还是一个事务管理器，Narayana是一个事务管理工具包，为使用广泛的基于标准的交易协议开发的应用程序提供支持
	- Cache
支持使用缓存
	- DevTools
	- Configuration Processor  
可以通过注解对其他组件进行配置
	- Validation  
校验相关的组件
	- Session  
顾名思义session相关的组件
	- Retry  
提供重试机制的组件
	- Lombok  
提供一套高效的代码模板，帮助在运行时生成代码
- Web
	- Web
提供spring web相关的组件和类
	- Reactive Web  
即Spring WebFlux，是一个全新的非堵塞的函数式 Reactive Web 框架，可以用来构建异步的、非堵塞的、事件驱动的服务，在伸缩性方面表现非常好
	- Websocket
	- Web Service
	- Jersey(JAX-RS)  
Jersey是提供JAX-RS参考实现和更多的REST框架
	- Apache CXF(JAX-RS)  
也是一个REST框架
	- Ratpack
适合高性能搞吞吐量的微服务型网络开发库
	- Vaadin  
Vaadin是一个用于丰富互联网应用程序的开源 Web框架，使用ajax让大部分的服务在服务器上运行
	- Rest Repositores
	- HATEOAS
	- Rest Repositores HAL Browser
	- Mobile
	- REST Docs
	- Stormpath
	- Keycloak
- Template Engines
模板引擎
	- Freemaker  
FreeMarker是一个基于Java的模板引擎，最初专注于使用MVC软件架构生成动态网页。但是，它是一个通用的模板引擎，不依赖于servlets或HTTP或HTML，因此它通常用于生成源代码
	- Velocity  
Apache Velocity是一个基于Java的模板引擎，但是已经在spring boot的新版本中被放弃了
	- Groovy Templates
	- Thymeleaf  
Thymeleaf是一个开源的Java模板引擎库，其模板文件本身也是一个格式良好的HTML文件，并且可以直接被浏览器打开，也是spring boot官方推荐的模板引擎
	- Mystache
- SQL  
数据库相关组件，就不详细介绍了，用到哪个就点哪个
	- JPA
	- JOOQ
	- MyBatis
	- JDBC
	- H2
	- HSQLDB
	- Apache Derby
	- MySQL
	- PostgreSQL
	- SQL Server
	- Flyway
	- Liquibase
- NoSQL
	- MongoDB
	- Reactive MongoDB
	- Embedded MongoDB
	- Cassandra
	- Reactive Cassandra
	- Couchbase
	- Neo4j
	- Redis
	- Reactive Redis
	- Gemfire
	- Solr
	- Elasticsearch
- Social  
社交应用相关组件，只有三个，国内用不上
	- Facebook
	- LinkedIn
	- Twitter
- I/O  
输入输出相关组件
	- Batch
	- Intergration
	- Quartz Scheduler
	- Activiti
	- Apache Camel
	- JMS (ActiveMQ)
	- JMS (Artemis)
	- JMS (HornetQ)
	- AMQP
	- Kafka
	- Mail
	- LDAP

选好组件之后，选中的组件会在右边的窗口显示

![][4]

## 完成创建
然后就是点finish就结束了  

![][5]

## 其他
### gradle设置
在IntelliJ IDEA中，选择`gradle`作为创建工具，在完成创建之后会需要对`gradle`进行设置  

![][6]  
个人经验：`auto-import`可以不选，`gradle`最好使用本地的，不然每次创建项目都要根据引入的组件下载一个新的`gradle`，由于国内的原因，网速非常慢，往往会浪费几个小时
### gradle下载
还是由于国内的原因，`gradle`默认从maven中央仓库下载组件，那个速度，同样慢到不行……所以，我们可以在`gradle`的脚本中把maven默认的中央仓库改为阿里云提供的镜像  
原默认仓库设置：
```gradle
repositories {
	mavenCentral()
	maven { url "https://repo.spring.io/snapshot" }
	maven { url "https://repo.spring.io/milestone" }
}
```
改为：
```gradle
allprojects {
repositories {
	maven { url 'http://maven.aliyun.com/nexus/content/groups/public/' }
}
}
repositories {
	//mavenCentral()
	maven { url "https://repo.spring.io/snapshot" }
	maven { url "https://repo.spring.io/milestone" }
}
```
然后速度就很快了，我在这里就浪费了不少时间
# 小结
spring boot通过模块化的集成方式，帮助开发者快速构建spring项目，确实节省了很多时间，也避免了配置和整合的许多人为错误


  [1]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/Ashampoo_Snap_2017%E5%B9%B46%E6%9C%8820%E6%97%A5_10h15m24s_001_New%20Project.png "new project"
  [2]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/Ashampoo_Snap_2017%E5%B9%B46%E6%9C%8820%E6%97%A5_10h20m53s_003_New%20Project.png "填写项目信息"
  [3]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/Ashampoo_Snap_2017%E5%B9%B46%E6%9C%8820%E6%97%A5_10h28m37s_004_New%20Project.png "选择项目集成组件"
  [4]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/Ashampoo_Snap_2017%E5%B9%B46%E6%9C%8820%E6%97%A5_11h23m14s_005_New%20Project.png "选择组件"
  [5]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/Ashampoo_Snap_2017%E5%B9%B46%E6%9C%8820%E6%97%A5_11h25m18s_006_New%20Project.png "完成"
  [6]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/Ashampoo_Snap_2017%E5%B9%B46%E6%9C%8820%E6%97%A5_11h28m48s_008_Import%20Module%20from%20Gradle.png "gradle设置"
