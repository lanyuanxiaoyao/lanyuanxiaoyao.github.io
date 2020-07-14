---
title: 正则表达式(二) 其他表达式
key: 2018-01-18-regex-expression-2
date: 2018-01-18 18:27
categories: 正则表达式
tags: [正则表达式]
---


# 零宽度断言
在上一篇博客中介绍的`\b`、`^`和`$`都是用来匹配某一个位置的，而且这个位置满足了一定的条件，所以在这里，我们把满足的这一个条件成为**断言**或**零宽度断言**。

| 字符(断言) | 说明 |
| --- | --- |
| `^`   | 匹配行开始的位置 |
| `$`   | 匹配行结束的位置 |
| `\A`  | 匹配必须出现在字符串的开头 |
| `\Z`  | 匹配必须出现在字符串的结尾或字符串结尾处的换行符`\n`之前 |
| `\z`  | 匹配必须出现在字符串的结尾 |
| `\G`  | 匹配必须出现在上一个匹配结束的地方 |
| `\b`  | 匹配字符的开始或结束位置 |
| `\B`  | 匹配不是在字符的开始或结束位置 |

## `(?=expression)`和`(?<=expression)`
`(?=expression)`被称为**零宽度正预测先行断言**，它断言自身位置的后面能够匹配表达式`expression`  
`(?<=expression)`被称为**零宽度正回顾后发断言**，它断言自身位置的前面能够匹配表达式`expression`  

## 测试

- `^`  
匹配每一行的行首，注意测试工具中用*紫色虚线*表示的地方  
![][1]
- `$`  
匹配每一行的行尾  
![][2]
- `\A`  
整个测试文本都被视为一个字符串，把换行符也包括在内了  
![][3]
- `\Z`  
- `\z`  
- `\G\`  
- `\b`  
匹配一个单词的开始或结束位置，不再赘述  
![][4]
- `\B`  
与`\b`相对，匹配不是一个dancing开始或结束位置  
![][5]
- `lo(?=ve)`  
匹配字符`lo`，并且`lo`的后面紧跟着字符`ve`，换成人话就是，匹配一个在字符`ve`前面的字符`lo`，在这个表达式中，字符串`ve`是不算在匹配里面的，只是作为条件判断  
![][6]
- `(?<=ve)lo`  
匹配字符`lo`，并且`lo`的前面紧跟着字符`ve`，换成人话就是，匹配一个在字符`ve`后面的字符`lo`，在这个表达式中，字符串`ve`是不算在匹配里面的，只是作为条件判断  
![][7]

# 负向零宽度断言
与零宽度断言相对的是**负向零宽度断言**，它能够指定或匹配不止一个位置，特别是匹配字符串中不包含指定的字符时特别好用  
*其实这个负向零宽度断言就是零宽度断言的反义*

## `(?!expression)`和`(?<!expression)`
`(?!expression)`被称为**负向零宽度断言**或**零宽度负预测先行断言**，它断言自身位置的后面不能匹配表达式`expression`  
`(?<!expression)`被称为**零宽度负回顾后发断言**，它断言自身位置的前面不能匹配表达式`expression`  

## 测试
- `lo(?!ve)`  
匹配一个后面不是字符`ve`的字符`lo`，显然，这里没有匹配的字符  
![][8]
- `(?<!ve)lo`  
匹配一个前面不是字符`ve`的字符`lo`  
![][9]

# 匹配选项
**匹配选项**可以指定正则表达式匹配中的行为，如忽略大小写、处理多行、处理单行等

**这个选项需要不同的正则表达式引擎支持，没有通用的规则，也不写在正则表达式里面**

# 注释
注释的格式表示为`(?#注释内容)`  
*嘿嘿，没想到正则表达式也可以写注释吧*

![][10]

# 优先级
和所有的运算语言一样，正则表达式的符号之间也存在优先级关系

*表格从上到下，优先级从高到低*  

| 运算符或表达式 | 说明 |
| --- | --- |
| `\` | 转义符 |
| `()`、`(?:)`、`(?=)`、`[]` | 圆括号和方括号 |
| `*`、`+`、`?`、`{n}`、`{n,}`、`{n,m}` | 限定符 |
| `^`、`$`、`\(元字符)` | 位置和顺序 |
| `|` | “或”运算     |

# 递归匹配

# 参考
1. 王蕾. 神奇的匹配 正则表达式求精之旅[M]. 北京:电子工业出版社, 2014.
2. 文中使用的正则表达式测试工具：[正则表达式测试工具在线调试与分享-Zjmainstay](http://regex.zjmainstay.cn/)
3. 文中使用的正则表达式可视化生成工具：[Regulex JavaScript Regular Expression Visualizer.](https://jex.im/regulex/)


  [1]: https://xiaoshujiang-1251968084.cos.ap-guangzhou.myqcloud.com/xiaoshujiang/正则表达式(二)_其他表达式/eb7bba88c4749cd721facd091c52bce3.png
  [2]: https://xiaoshujiang-1251968084.cos.ap-guangzhou.myqcloud.com/xiaoshujiang/正则表达式(二)_其他表达式/a8d03615d18d774191767bbbdeed7bb7.png
  [3]: https://xiaoshujiang-1251968084.cos.ap-guangzhou.myqcloud.com/xiaoshujiang/正则表达式(二)_其他表达式/42ca1f2736f166c52853561a43e5a81a.png
  [4]: https://xiaoshujiang-1251968084.cos.ap-guangzhou.myqcloud.com/xiaoshujiang/正则表达式(二)_其他表达式/3fed70d7f5aa5dabf59a2bf84489713c.png
  [5]: https://xiaoshujiang-1251968084.cos.ap-guangzhou.myqcloud.com/xiaoshujiang/正则表达式(二)_其他表达式/2289b6573f4cd0d792ab3f87d24e7a19.png
  [6]: https://xiaoshujiang-1251968084.cos.ap-guangzhou.myqcloud.com/xiaoshujiang/正则表达式(二)_其他表达式/55d6ff358e19c11d0c4311d54c0c2481.png
  [7]: https://xiaoshujiang-1251968084.cos.ap-guangzhou.myqcloud.com/xiaoshujiang/正则表达式(二)_其他表达式/ea08ba533e86cdc59a0247559256aa19.png
  [8]: https://xiaoshujiang-1251968084.cos.ap-guangzhou.myqcloud.com/xiaoshujiang/正则表达式(二)_其他表达式/e5fadbe2427b58305ae29d30ed53cbe9.png
  [9]: https://xiaoshujiang-1251968084.cos.ap-guangzhou.myqcloud.com/xiaoshujiang/正则表达式(二)_其他表达式/f81a2d7466d1040cd5ff3f6c33b7aa7c.png
  [10]: https://xiaoshujiang-1251968084.cos.ap-guangzhou.myqcloud.com/xiaoshujiang/正则表达式(二)_其他表达式/68440800cfb9b4c2d98d59ece0859d5a.png
