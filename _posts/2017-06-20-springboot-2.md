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



  [1]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/Ashampoo_Snap_2017%E5%B9%B46%E6%9C%8820%E6%97%A5_11h47m55s_009_.png "项目结构"