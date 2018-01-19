---
layout: post
title: 正则表达式(三) Java使用正则表达式
date: 2018-01-19 09:38
categories: 正则表达式
tags: [Java,正则表达式]
---

* content
{:toc}

# 简介
Java从JDK1.4版本开始提供了非常强大的正则表达式功能，不仅支持了传统的正则表达式的使用，还额外支持了很多基于正则表达式的便捷操作，给我们的开发带来了非常大的帮助。  
如果你还没有了解过正则表达式，可以从我之前的两篇文章中学习
- [正则表达式(一) 基本表达式](http://lanyuanxiaoyao.com/2018/01/16/regex-expression-1/)
- [正则表达式(二) 其他表达式](http://lanyuanxiaoyao.com/2018/01/18/regex-expression-2/)

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

# 类
Java中和正则表达式有关的类有三个
- `Pattern`  
`Pattern`对象是一个正则表达式的编译表示。`Pattern`类没有公共构造方法。要创建一个`Pattern`对象，你必须首先调用其公共静态编译方法，它返回一个`Pattern`对象。该方法接受一个正则表达式作为它的第一个参数。
- `Matcher`  
`Matcher`对象是对输入字符串进行解释和匹配操作的引擎。`Matcher` 类一样，`Matcher`也没有公共构造方法。你需要调用`Matcher`对象的 `matcher()`方法来获得一个`Matcher`对象。
- `PatternSyntaxException`  
`PatternSyntaxException`是一个非强制异常类，它表示一个正则表达式模式中的语法错误。

下面我们来详细看一下这三个类是如何配合使用的

## `Pattern`
`Pattern`类比较简单，其实就是代表一个匹配，用人话来说，`Pattern`类就是一条正则表达式，在Java中，一条正则表达式也必须先构造成一个`Pattern`实例才能被Java在各个地方使用  
`Pattern`类的构造方法是私有的，着意味着我们只能通过它的工厂方法来构造一个新的`Pattern`对象  
先来认识一下`Pattern`类中的方法  

| 返回值 | 方法体 |
| --- | --- |
| static Pattern | compile(String regex) 将给定的正则表达式编译到模式中。 |
| static Pattern | compile(String regex, int flags) 将给定的正则表达式编译到具有给定标志的模式中。 |
 | int | flags() 返回此模式的匹配标志。 |
 | Matcher | matcher(CharSequence input) 创建匹配给定输入与此模式的匹配器。 |
| static boolean | matches(String regex, CharSequence input) 编译给定正则表达式并尝试将给定输入与其匹配。 |
| String | pattern() 返回在其中编译过此模式的正则表达式。 |
| static String | quote(String s) 返回指定 String 的字面值模式 String。 |
| String[] | split(CharSequence input) 围绕此模式的匹配拆分给定输入序列。 |
| String[] | split(CharSequence input, int limit) 围绕此模式的匹配拆分给定输入序列。 |
| String | toString() 返回此模式的字符串表示形式。 |

# 参考
1. [Java 正则表达式\| 菜鸟教程](http://www.runoob.com/java/java-regular-expressions.html)