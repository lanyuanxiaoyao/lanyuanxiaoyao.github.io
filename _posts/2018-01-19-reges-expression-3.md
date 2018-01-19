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

# 使用
## 简单的验证
`Pattern`类提供了最简单的正则表达式使用方式，直接使用`Pattern`的静态方法`matches(regex, text)`即可直接验证一个字符串是否满足指定的正则表达式
```java
// 显然这里的结果是true
boolean result = Pattern.matches(".*love.*", "I love you!");
```
如果你要问还有更简单的方法吗？答案是：有。在`String`类中直接提供了`matches(regex)`方法用于验证当前字符串是否满足一个指定的正则表达式
```java
// 这里的返回值也是boolean类型
boolean result = "I love you!".matches(".*love.*");
```
通过`String`类的源码我们可以看到，实际上`String`的`matches(regex)`方法其实也是调用`Pattern`类的`matches(regex, text)`方法  
`String.java`:
```java
...
public boolean matches(String regex) {
	return Pattern.matches(regex, this);
}
...
```
其实这些都是简单的使用方法，接下来看一下一个比较正式的正则表达式使用方式
```java
// 创建一个模式
Pattern pattern = Pattern.compile(".*love.*");
// 获取模式在字符串中捕获的匹配
Matcher matcher = pattern.matcher("I love you!");
// 调用find()方法判断是否存在匹配
boolean result = matcher.find();
```

# 参考
1. [Java 正则表达式| 菜鸟教程](http://www.runoob.com/java/java-regular-expressions.html)