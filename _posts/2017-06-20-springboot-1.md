---
layout: post
title: Spring Boot（一） Spring mvc + Mybatis整合
date: 2017-06-20 10:44
categories: Spring
tags: [Spring,Spring Boot,Mybatis]
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

# 系统要求
默认情况下，Spring Boot 1.4.0.BUILD-SNAPSHOT需要Java7环境，Spring框架 4.3.2.BUILD-SNAPSHOT或以上版本。你可以在Java6下使用Spring Boot，不过需 要添加额外配置。明确提供构建支 持的有Maven（3.2+）和Gradle（1.12+）。  
**注：尽管你可以在Java6或Java7环境下使用Spring Boot，通常建议尽可能使用 Java8**