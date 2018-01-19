---
layout: post
title: 正则表达式(三) Java使用正则表达式
date: 2018-01-19 09:38
categories: 正则表达式
tags: [Java,正则表达式]
---

* content
{:toc}

# 类
Java中和正则表达式有关的类有三个
- `Pattern`  
`Pattern`对象是一个正则表达式的编译表示。`Pattern`类没有公共构造方法。要创建一个`Pattern`对象，你必须首先调用其公共静态编译方法，它返回一个`Pattern`对象。该方法接受一个正则表达式作为它的第一个参数。
- `Matcher`  
`Matcher`对象是对输入字符串进行解释和匹配操作的引擎。`Matcher` 类一样，`Matcher`也没有公共构造方法。你需要调用`Matcher`对象的 `matcher()`方法来获得一个`Matcher`对象。
- `PatternSyntaxException`  
`PatternSyntaxException`是一个非强制异常类，它表示一个正则表达式模式中的语法错误。