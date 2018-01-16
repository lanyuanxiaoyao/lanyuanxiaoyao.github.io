---
layout: post
title: 正则表达式学习(一)
date: 2018-01-16 17:13
categories: 正则表达式
tags: [正则表达式]
---

* content
{:toc}

# 定义
**正则表达式(Regular Expression)**  
用某种模式去匹配一类字符串的公式，主要用来描述字符串匹配的工具。

**匹配**  
文本或字符存在不止一个部分满足给定的正则表达式，这是每一个这样的部分都被称为一个匹配。  
匹配分为以下三种类型：  
1. 形容词性的匹配  
即一个字符串匹配一个正则表达式
2. 名词性的匹配  
即在文本或字符串里匹配正则表达式
3. 名词性的匹配
即字符串中满足给定的正则表达式的一部分

# 元字符
## 匹配位置的元字符

| 字符  | 说明               |
|-----|------------------|
| ^   | 匹配行开始            |
| $   | 匹配行结束            |
| \b  | 匹配单词的开始或结束 不支持中文 |

### 测试

- `^a`  
匹配第一个字母为`a`的一行  
![][1]
- `a$`  
匹配最后一个字母为`a`的一行  
![][2]
-  `^a$`  
匹配只有一个字母`a`的一行   
![][3]
-  `\bStr`
匹配以`Str`为开头的单词  
![][4]
-  `ing\b`
匹配以`ing`为结尾的单词  
![][5]
-  `\bString\b`
仅匹配`String`这个单词  
![][6]

**`\b`字符如何识别哪个是单词呢？**  
以标点符号或空格分隔的字符串将被识别为单词，而且 **`\b`只能用于英文，不能用于中文**

## 匹配字符的元字符
**元字符都是按照单个字符进行匹配**  

| 字符    | 说明                          |
|-------|-----------------------------|
| `.` (点号) | 匹配除换行符之外的任意字符               |
| `\w`    | 匹配任意单词字符(字母，数字，下划线)         |
| `\W`    | 匹配任意非单词字符                   |
| `\s`    | 匹配任意空白字符(空格，制表符，换行符，中文全角空格) |
| `\S`    | 匹配任意非空白字符                   |
| `\d`    | 匹配任意数字 0~9的任意一个数字           |
| `\D`    | 匹配任意非数字                     |

### 测试

- `.`  
全部字符匹配  
![][7]
- `\w`  
匹配了全部的单词字符，除了下划线之外的标点符号和汉字都被排除在外  
![][8]
- `\W`  
匹配结果和\w刚好相反，注意那个**下划线是属于单词字符的**  
![][9]
- `\s`  
有2个空格被匹配，**注意！这里总共有6个符号被匹配了，除了两个空格还有1~4行末的换行符**  
![][10]
- `\S`  
除了2个空格和4个换行符，其余字符全部匹配  
![][11]
- `\d`  
匹配所有的数字  
![][12]
- `\D`  
匹配所有数字之外的字符  
![][13]

## 元字符组合
仅仅是元字符就可以自由组合来实现不同的匹配效果  

- `\w\w`  
匹配连续的两个单词字符  
![][14]  
![][15]
- `\w\s`  
注意第三行最后匹配的`m`是和行末的换行符一起匹配成功的
![][16]  
![][17]

# 字符类
[] 写在中括号之间的是字符类 意为匹配中括号中的任意一个字符
\- 当 \- 符号不是第一个字符的时候表示定义字符的范围 [1-3]表示[123] [a-z]表示匹配任意小写字母 如果\- 放在第一位 那就仅表示自己 这个范围的顺序和两个字符间的内容是按照ASCII表的顺序决定的
^ 如果放在字符类第一个 表示否定该字符类 [^123]表示匹配1、2、3之外的所有数字
元字符在字符类中不做任何特殊处理 仅仅表示他们自身

# 字符转义
使用反斜杠 \\
\\. \\\* \\\\ 等都将表示这个符号自身

# 限定符
| 字符或表达式 | 说明                  |
|--------|---------------------|
| {n}    | 重复n次                |
| {n,}   | 重复至少n次              |
| {n,m}  | 重复至少n次，最多m次         |
| *      | 重复至少0次，等同于{0,}      |
| +      | 重复至少1次，等同于{1,}      |
| ?      | 重复0次或1次，等同于{0,1}    |
| \*?    | 尽可能少地使用重复的第1个匹配     |
| +?     | 尽可能少地使用重复但至少使用1次    |
| ??     | 使用0次重复(如果有可能)或1次重复  |
| {n}?   | 等同于{n}              |
| {n,}?  | 尽可能少地使用重复，但至少使用1次   |
| {n,m}? | 介于n次和m次之间，尽可能少地使用重复 |

a.+?b aaaabaaaababaaacaccb -> aaaab aaaabab aaacaccb 懒惰
a.+b  aaaabaaaababaaacaccb -> aaaabaaaababaaacaccb   贪婪

# 字符的运算
## 替换
| 表示“或”的意思
匹配是根据左边优先的原则 即从左往右

[jJ]ack和jack|Jack表示同样的意思

## 分组
使用 () 来表示一组子表达式 括号里面的内容是一个整体
(123){1,3} 表示的是123这个整体重复1到3次

## 反向引用
当一个正则表达式被分组之后，默认从左到右每一个分组都会自动被赋予一个组号，以左括号为分界从1开始自增
反向引用引用的是前面的表达式匹配到的字符串，而不是前面的规则
\b(\w)\1\b 这个表达式中的\1表示的是前面\w匹配到的字符，前面匹配到字母a那么\1处也必须是字母a 而不是任意一个字母 所以这个表达式匹配的是两个完全相同的字母 而如果是\b(\w)\w\b 则是表示两个允许不相同的字母
分组不止默认使用数字作为组号 还可以手动命名 (?\<word\>\w)和(?'word'\w)都是把\w+匹配到的字母保存到名为word的分组 自定义命名的分组使用\k\<name\>的方式使用 \b(?\<word\>\w)\k\<word\>\b

| 字符                    | 说明                                                   |
|-----------------------|------------------------------------------------------|
| (expression)          | 匹配字符串expression，并将匹配到的文本保存到自动命名的分组里                  |
| (?\<name\>expression) | 匹配字符串expression，并将匹配的文本以name进行命名。该名称不能包含标点符号，不能以数字开头 |
| (?:expression)        | 匹配字符串expression，不保存匹配的文明，也不给此组分配组号                   |
| (?=expression)        | 匹配字符串expression前面的位置                                 |
| (?!expression)        | 匹配后面不是字符串expression的位置                               |
| (?<=expression)       | 匹配字符串expression后面的位置                                 |
| (?\<\!expression)     | 匹配前面不是字符串expression的位置                               |
| (?>expression)        | 只匹配字符串expression一次                                   |


  [1]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/%E5%B0%8F%E4%B9%A6%E5%8C%A0/2018/1/16/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F%E5%AD%A6%E4%B9%A0%28%E4%B8%80%29/Ashampoo_Snap_2018%E5%B9%B41%E6%9C%8816%E6%97%A5_20h14m07s_002_.png
  [2]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/%E5%B0%8F%E4%B9%A6%E5%8C%A0/2018/1/16/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F%E5%AD%A6%E4%B9%A0%28%E4%B8%80%29/Ashampoo_Snap_2018%E5%B9%B41%E6%9C%8816%E6%97%A5_20h16m46s_003_.png
  [3]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/%E5%B0%8F%E4%B9%A6%E5%8C%A0/2018/1/16/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F%E5%AD%A6%E4%B9%A0%28%E4%B8%80%29/Ashampoo_Snap_2018%E5%B9%B41%E6%9C%8816%E6%97%A5_20h20m44s_004_.png
  [4]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/%E5%B0%8F%E4%B9%A6%E5%8C%A0/2018/1/16/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F%E5%AD%A6%E4%B9%A0%28%E4%B8%80%29/Ashampoo_Snap_2018%E5%B9%B41%E6%9C%8816%E6%97%A5_20h24m14s_005_.png
  [5]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/%E5%B0%8F%E4%B9%A6%E5%8C%A0/2018/1/16/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F%E5%AD%A6%E4%B9%A0%28%E4%B8%80%29/Ashampoo_Snap_2018%E5%B9%B41%E6%9C%8816%E6%97%A5_20h26m53s_006_.png
  [6]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/%E5%B0%8F%E4%B9%A6%E5%8C%A0/2018/1/16/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F%E5%AD%A6%E4%B9%A0%28%E4%B8%80%29/Ashampoo_Snap_2018%E5%B9%B41%E6%9C%8816%E6%97%A5_20h27m47s_007_.png
  [7]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/%E5%B0%8F%E4%B9%A6%E5%8C%A0/2018/1/16/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F%E5%AD%A6%E4%B9%A0%28%E4%B8%80%29/Ashampoo_Snap_2018%E5%B9%B41%E6%9C%8816%E6%97%A5_20h32m27s_008_.png
  [8]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/%E5%B0%8F%E4%B9%A6%E5%8C%A0/2018/1/16/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F%E5%AD%A6%E4%B9%A0%28%E4%B8%80%29/Ashampoo_Snap_2018%E5%B9%B41%E6%9C%8816%E6%97%A5_20h33m33s_009_.png
  [9]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/%E5%B0%8F%E4%B9%A6%E5%8C%A0/2018/1/16/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F%E5%AD%A6%E4%B9%A0%28%E4%B8%80%29/Ashampoo_Snap_2018%E5%B9%B41%E6%9C%8816%E6%97%A5_20h34m25s_010_.png
  [10]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/%E5%B0%8F%E4%B9%A6%E5%8C%A0/2018/1/16/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F%E5%AD%A6%E4%B9%A0%28%E4%B8%80%29/Ashampoo_Snap_2018%E5%B9%B41%E6%9C%8816%E6%97%A5_20h35m30s_011_.png
  [11]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/%E5%B0%8F%E4%B9%A6%E5%8C%A0/2018/1/16/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F%E5%AD%A6%E4%B9%A0%28%E4%B8%80%29/Ashampoo_Snap_2018%E5%B9%B41%E6%9C%8816%E6%97%A5_20h36m12s_012_.png
  [12]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/%E5%B0%8F%E4%B9%A6%E5%8C%A0/2018/1/16/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F%E5%AD%A6%E4%B9%A0%28%E4%B8%80%29/Ashampoo_Snap_2018%E5%B9%B41%E6%9C%8816%E6%97%A5_20h37m01s_013_.png
  [13]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/%E5%B0%8F%E4%B9%A6%E5%8C%A0/2018/1/16/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F%E5%AD%A6%E4%B9%A0%28%E4%B8%80%29/Ashampoo_Snap_2018%E5%B9%B41%E6%9C%8816%E6%97%A5_20h38m49s_014_.png
  [14]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/%E5%B0%8F%E4%B9%A6%E5%8C%A0/2018/1/16/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F%E5%AD%A6%E4%B9%A0%28%E4%B8%80%29/ww.png
  [15]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/%E5%B0%8F%E4%B9%A6%E5%8C%A0/2018/1/16/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F%E5%AD%A6%E4%B9%A0%28%E4%B8%80%29/Ashampoo_Snap_2018%E5%B9%B41%E6%9C%8816%E6%97%A5_20h42m07s_015_.png
  [16]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/%E5%B0%8F%E4%B9%A6%E5%8C%A0/2018/1/16/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F%E5%AD%A6%E4%B9%A0%28%E4%B8%80%29/ws.png
  [17]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/%E5%B0%8F%E4%B9%A6%E5%8C%A0/2018/1/16/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F%E5%AD%A6%E4%B9%A0%28%E4%B8%80%29/Ashampoo_Snap_2018%E5%B9%B41%E6%9C%8816%E6%97%A5_20h43m42s_016_.png
  [18]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/%E5%B0%8F%E4%B9%A6%E5%8C%A0/2018/1/16/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F%E5%AD%A6%E4%B9%A0%28%E4%B8%80%29/ww.png