---
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

### 主要方法
**`Pattern compile(String regex)`**  
这个工厂方法用于创建一个`Pattern` 实例，一个`Pattern` 实例就是一条正则表达式，可以把`Pattern` 实例理解为正则表达式实例，然后这条正则表达式就可以被Java中的各个方法所使用了    
```java
Pattern pattern = Pattern.compile(".*love.*");
```
**`Pattern compile(String regex, int flags)`**  
这个方法用于在创建`Pattern` 实例的时候指定匹配的模式，如大小写忽略、多行匹配等  
匹配模式共有8种，作为`Pattern` 类的静态字段存在，分别是：
- 	`CANON_EQ` 启用规范等价
- 	`CASE_INSENSITIVE` 启用不区分大小写的匹配
- 	`COMMENTS` 模式中允许空白和注释
- 	`DOTALL` 启用 dotall 模式
- 	`LITERAL` 启用模式的字面值解析
- 	`MULTILINE` 启用多行模式
- 	`UNICODE_CASE` 启用 Unicode 感知的大小写折叠
- 	`UNIX_LINES` 启用 Unix 行模式

```java
Pattern pattern = Pattern.compile(".*love.*", Pattern.MULTILINE);
```
**`Matcher matcher(CharSequence input)`**  
这个方法用于根据输入的字符序列和当前`Pattern`实例构建匹配器，值得注意的是，调用了这个方法的时候，并没有开始匹配，只是构建了匹配器而已  
```java
Matcher matcher = pattern.matcher("I love you!");
```
**`boolean matches(String regex, CharSequence input)`**  
快速对一个输入的字符序列进行匹配尝试，并返回结果。用人话说就是直接对一个字符串和一个正则表达式进行匹配，看这个字符串是否符合这个正则表达式，注意这里使用的都是默认的`Pattern`配置，比如没有办法设置多行匹配，容易出错
```java
boolean result = Pattern.matches(".*love.*", "I love you!");
```

### 全部方法

| 返回值              | 方法体                                                                |
|------------------|--------------------------------------------------------------------|
| `static Pattern` | `compile(String regex)` 将给定的正则表达式编译到模式中。                           |
| `static Pattern` | `compile(String regex, int flags)` 将给定的正则表达式编译到具有给定标志的模式中。         |
| `int`            | `flags()` 返回此模式的匹配标志。                                              |
| `Matcher`        | `matcher(CharSequence input)` 创建匹配给定输入与此模式的匹配器。                    |
| `static boolean` | `matches(String regex, CharSequence input)` 编译给定正则表达式并尝试将给定输入与其匹配。 |
| `String`         | `pattern()` 返回在其中编译过此模式的正则表达式。                                     |
| `static String`  | `quote(String s)` 返回指定 `String` 的字面值模式 `String`。                       |
| `String[]`       | `split(CharSequence input)` 围绕此模式的匹配拆分给定输入序列。                      |
| `String[]`       | `split(CharSequence input, int limit)` 围绕此模式的匹配拆分给定输入序列。           |
| `String`         | `toString()` 返回此模式的字符串表示形式。                                        |

## `Matcher`
`Matcher`类应该被翻译为匹配器，因为在获得这个实例的时候其实并没有开始匹配，只有在调用到具体方法的时候才会开始匹配，所以把`Matcher`类理解为是正则表达式的匹配结果是不正确的，应该是匹配器可以计算出匹配的结果

### 主要方法
**`Matcher	appendReplacement(StringBuffer sb, String replacement)`**  
**`StringBuffer	appendTail(StringBuffer sb)`**  
这两个方法是一对好基友，一般是配合使用。`appendReplacement`方法是把匹配到的字符替换为`replacement`，然后把到匹配位置为止之前的所有文本都追加到`sb`后面，注意！是追加，也就是说`sb`原来有的文本并不会被清除  
`appendTail`与`appendReplacement`相对的，`appendTail`就是把剩下的文本追加到`sb`的末尾  
```java
Pattern pattern = Pattern.compile("a");
Matcher matcher = pattern.matcher("abababbaaabbb");
StringBuffer stringBuffer = new StringBuffer("hhh");
while (matcher.find()) {
	matcher.appendReplacement(stringBuffer, "c");
}
// 没有执行appendTail方法
System.out.println(stringBuffer);
matcher.appendTail(stringBuffer);
// 执行appendTail方法
System.out.println(stringBuffer);
```
以上这段代码执行的结果为：  
![][1]  
可以清楚地看到这两个方法的功能，把上面代码的`while`循环改为`if`语句，就可以达到只替换一个的效果。  
有人说这和`replaceAll()`方法有什么区别，其实这两个方法当然不是为了全部替换，它们的作用是为了控制替换的过程，比如中间的某些字符虽然满足表达式，但是却不需要替换，或是要只需替换第5个匹配之类的需求  
**`boolean find()`**  
解释这个方法首先就要理解`Matcher`匹配器是如何进行匹配这个过程的。在`Matcher`中的字符串并不是一次就被全部匹配完毕，因为我们匹配的文本可能会非常大，所以`Matcher`采取了一边读取一边匹配的“流式匹配”的方式，而在这其中就有一个相当于“游标”的东西，“游标”指示的是当前匹配到的位置，读取到第一个匹配的时候，“游标”就移动到第一个匹配的位置，`find()`方法就是向`Matcher`发出“匹配下一个”的命令的方法，当执行`find()`方法，`Matcher`就会进行匹配，直到出现了一个匹配就停下来，等待下一个`find()`方法被调用才继续匹配。也正是由于这个原因，所以`Matcher`没有方法可以返回文本里到底有多少个匹配  
我们需要在正则匹配取结果的时候使用while循环来读取所有的匹配也是由于这个原因  
```java
Pattern pattern = Pattern.compile("a");
Matcher matcher = pattern.matcher("abababbaaabbb");
while (matcher.find()) {
	System.out.println(matcher.group());
}
```
**`String group()`**  
等于`group(0)`，可以在源码中看到  
`Matcher.java`  
```java
...
public String group() {
	return group(0);
}
...
```
**`String group(int group)`**  
*如果你不知道正则表达式中“组”的概念，那么可以去看我之前的文章，这里就默认你对正则表达式完全了解*  
一个正则表达式可能会有很多个组，那么Java里面提供了可以让我们操作组的方法，在一个`find()`循环中，每一次匹配都可以使用`group(index)`方法访问指定的组，返回的是该组匹配的字符串，如果组有名字的话，那么也可以通过`group(name)`访问  
特别的，`group(0)`是整个正则表达式，同时不计入`groupCount()`中
```java
Pattern pattern = Pattern.compile("(a|b)(?<group>c|b)a");
Matcher matcher = pattern.matcher("ababdddabbaaccabbb");
System.out.println("groupCount: " + matcher.groupCount());
while (matcher.find()) {
	System.out.println("group(0): " + matcher.group(0));
	System.out.println("group(1): " + matcher.group(1));
	System.out.println("group(2): " + matcher.group(2));
	System.out.println("group(\"group\"): " + matcher.group("group"));
}
```
以上这段代码执行的结果为：  
![][2]

### 全部方法

| 返回值             | 方法体                                                                    |
|-----------------|------------------------------------------------------------------------|
| `Matcher`       | `appendReplacement(StringBuffer sb, String replacement)` 实现非终端添加和替换步骤。 |
| `StringBuffer`  | `appendTail(StringBuffer sb)` 实现终端添加和替换步骤。                             |
| `int`           | `end()` 返回最后匹配字符之后的偏移量。                                                |
| `int`           | `end(int group)` 返回在以前的匹配操作期间，由给定组所捕获子序列的最后字符之后的偏移量。                   |
| `boolean`       | `find()` 尝试查找与该模式匹配的输入序列的下一个子序列。                                       |
| `boolean`       | `find(int start)` 重置此匹配器，然后尝试查找匹配该模式、从指定索引开始的输入序列的下一个子序列。              |
| `String`        | `group()` 返回由以前匹配操作所匹配的输入子序列。                                          |
| `String`        | `group(int group)` 返回在以前匹配操作期间由给定组捕获的输入子序列。                            |
| `int`           | `groupCount()` 返回此匹配器模式中的捕获组数。                                         |
| `boolean`       | `hasAnchoringBounds()` 查询此匹配器区域界限的定位。                                  |
| `boolean`       | `hasTransparentBounds()` 查询此匹配器区域边界的透明度。                               |
| `boolean`       | `hitEnd()` 如果匹配器执行的最后匹配操作中搜索引擎遇到输入结尾，则返回 `true`。                         |
| `boolean`       | `lookingAt()` 尝试将从区域开头开始的输入序列与该模式匹配。                                   |
| `boolean`       | `matches()` 尝试将整个区域与模式匹配。                                              |
| `Pattern`       | `pattern()` 返回由此匹配器解释的模式。                                              |
| `static String` | `quoteReplacement(String s)` 返回指定 `String` 的字面值替换 `String`。                |
| `Matcher`       | `region(int start, int end)` 设置此匹配器的区域限制。                              |
| `int`           | `regionEnd()` 报告此匹配器区域的结束索引（不包括）。                                      |
| `int`           | `regionStart()` 报告此匹配器区域的开始索引。                                         |
| `String`        | `replaceAll(String replacement)` 替换模式与给定替换字符串相匹配的输入序列的每个子序列。           |
| `String`        | `replaceFirst(String replacement)` 替换模式与给定替换字符串匹配的输入序列的第一个子序列。         |
| `boolean`       | `requireEnd()` 如果很多输入都可以将正匹配更改为负匹配，则返回 `true`。                           |
| `Matcher`       | `reset()` 重置匹配器。                                                       |
| `Matcher`       | `reset(CharSequence input)` 重置此具有新输入序列的匹配器。                            |
| `int`           | `start()` 返回以前匹配的初始索引。                                                 |
| `int`           | `start(int group)` 返回在以前的匹配操作期间，由给定组所捕获的子序列的初始索引。                      |
| `MatchResult`   | `toMatchResult()` 作为 `MatchResult` 返回此匹配器的匹配状态。                          |
| `String`        | `toString()` 返回匹配器的字符串表示形式。                                            |
| `Matcher`       | `useAnchoringBounds(boolean b)` 设置匹配器区域界限的定位。                          |
| `Matcher`       | `usePattern(Pattern newPattern)` 更改此 `Matcher` 用于查找匹配项的 `Pattern`。         |
| `Matcher`       | `useTransparentBounds(boolean b)` 设置此匹配器区域边界的透明度。                      |

# 参考
1. [Java 正则表达式\| 菜鸟教程](http://www.runoob.com/java/java-regular-expressions.html)


  [1]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/%E5%B0%8F%E4%B9%A6%E5%8C%A0/2018/1/19/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F%28%E4%B8%89%29%20Java%E4%BD%BF%E7%94%A8%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F/Ashampoo_Snap_2018.01.19_16h02m35s_001_.png
  [2]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/%E5%B0%8F%E4%B9%A6%E5%8C%A0/2018/1/19/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F%28%E4%B8%89%29%20Java%E4%BD%BF%E7%94%A8%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F/Ashampoo_Snap_2018.01.19_17h19m56s_003_.png