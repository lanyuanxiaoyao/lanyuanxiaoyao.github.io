---
title: 正则表达式(一) 基本表达式
key: 2018-01-16-regex-expression-1
date: 2018-01-16 17:13
categories: 正则表达式
tags: [正则表达式]
---


# 定义
**正则表达式(Regular Expression)**  
用某种模式去匹配一类字符串的公式，主要用来描述字符串匹配的工具。

**匹配**  
文本或字符存在不止一个部分满足给定的正则表达式，这是每一个这样的部分都被称为一个**匹配**。  
匹配分为以下三种类型：  
1. 形容词性的匹配  
即一个字符串匹配一个正则表达式
2. 名词性的匹配  
即在文本或字符串里匹配正则表达式
3. 名词性的匹配  
即字符串中满足给定的正则表达式的一部分

# 元字符
元字符(Metacharacter)是一类非常特殊的字符，它能够匹配一个位置或字符集合中的一个字符，元字符可以分为两种类型
- 匹配位置的元字符
- 匹配字符的元字符

**元字符只能匹配一个字符位置，也就是一个匹配的单位是一个字符，而不是一个字符串**

## 匹配位置的元字符

| 字符  | 说明               |
|-----|------------------|
| `^`   | 匹配行开始            |
| `$`   | 匹配行结束            |
| `\b`  | 匹配单词的开始或结束 不支持中文 |

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

# 文字匹配
## 字符类
**字符类**是一个字符集合，如果该字符集合中的任何一个字符被匹配，则它会找到该匹配项。

- `[]`  
字符类使用中括号作为标志，字符集合写在中括号里面，意为匹配中括号中的任意一个字符
- `\-`  
**当`\-`符号不是第一个字符的时候表示定义字符的范围**，例如`[1-3]`表示`[123]`，`[a-z]`表示匹配任意小写字母，如果`\-`放在第一位，那就**仅表示自己**，这个范围的顺序和两个字符间的内容是按照ASCII表的顺序决定的，例如`[9-1]`是违反ASCII表顺序的一个表达式，这会报错
- `^`  
如果放在字符类第一个，表示该字符类的否定，`[^123]`表示匹配1、2、3之外的所有数字
- **元字符在字符类中不做任何特殊处理**，仅仅表示他们自身

### 测试

- `[aeiou]`  
匹配元音字母
- `[a-z]`  
匹配从小写字母`a`到`z`之间的所有字母
- `[^aeiou]`  
匹配元音字母之外的所有字符(包括任意符号)
- `[^a-z]`  
匹配小写字母`a`到`z`之间的所有字母之外的所有字符
- `[0-9]`  
匹配从`0`到`9`之间的任意一个数字
- `[ao-u]`  
匹配`a`和`o`到`u`之间的所有字母，可以看到只要在连个字符之间使用连接符`-`就会判断为一个区间
- `[!-?]`  
匹配从`!`到`?`之间的任意一个符号，可以看到因为是按照ASCII表顺序来判断`-`连接的字符集合，所以这样写也是没有问题的
- `[a^-]`  
匹配字符`a`、`^`和`-`三个字符，只要`^`符号不在第一位，`-`符号不在两个字符中间，那么它们就只表示自身
- `a[no]`  
匹配字符串`an`或`ao`，这是字符类和元字符的组合

## 字符转义
之前介绍的元字符非常好用，但是这又引出了一个问题，如果我们想在正常的表达式里面使用元字符本身这个符号怎么办呢？难道每次都要写在字符类里面吗？  
当然不，这里就引出了我们的**字符转义**

正则表达式定义了一些特殊的元字符，如`^`、`$`、`.`等。由于这些字符在正则表达式中被解释成其他指定的含义，如果需要匹配这些字符，则需要使用字符转义来解决这个问题。转义字符使用符号`\`(反斜杠)，它可以取消这些字符(如`^`、`$`、`.`等)在表达式中具有的特殊意义。

- `.`  
匹配字符`.`
- `*`  
匹配字符`*` 
- `\`  
匹配字符`\`
- `www\.lanyuanxiaoyao\.com`  
匹配字符串`www\.lanyuanxiaoyao\.com`，网址中的dot符号也是需要转义的

### 常用转义字符

| 字符或表达式 | 说明                                                               |
| ------------ | ------------------------------------------------------------------ |
| `\a`           | 响铃(警报) `\u0007`                                                  |
| `\b`           | 在正则表达式中，表示单词的边界；如果在字符类中，则表示退格符`\u0008` |
| `\t`           | 制表符`\u0009`                                                       |
| `\r`           | 回车符`\u000D`                                                       |
| `\v`           | 垂直制表符`\u000B`                                                   |
| `\f`           | 换页符`\u000C`                                                       |
| `\n`           | 换行符`\u000A`                                                       |
| `\e`           | 回退(ESC)符`\u001B`                                                  |
| `\040`         | 将ASCII字符匹配为八进制数(最多3位)                                 |
| `\x20`         | 使用十六进制表示，形式与ASCII字符匹配                              |
| `\cC`          | ASCII控制字符，如Ctrl-C                                            |
| `\u0020`       | 使用十六进制表示形式(恰好4位)与Unicode字符匹配 |

## 限定符
这是一个重要的知识点   
**限定符**用于指定允许特定字符或字符集自身重复出现的次数。

| 字符或表达式 | 说明                  |
|--------|---------------------|
| `{n}`    | 重复n次                |
| `{n,}`   | 重复至少n次              |
| `{n,m}`  | 重复至少n次，最多m次         |
| `*`      | 重复至少0次，等同于{0,}      |
| `+`      | 重复至少1次，等同于{1,}      |
| `?`      | 重复0次或1次，等同于{0,1}    |
| `\*?`    | 尽可能少地使用重复的第1个匹配     |
| `+?`     | 尽可能少地使用重复但至少使用1次    |
| `??`     | 使用0次重复(如果有可能)或1次重复  |
| `{n}?`   | 等同于{n}              |
| `{n,}?`  | 尽可能少地使用重复，但至少使用1次   |
| `{n,m}?` | 介于n次和m次之间，尽可能少地使用重复 |

### 测试
- `a{3}`  
![][18]
- `a{2,}`  
![][19]
- `a{2,3}`  
![][20]
- `ab+`  
![][21]
- `ab?`  
![][22]
- `ab*`  
![][23]
- `ab+?`  
![][24]
- `ab??`  
![][25]
- `ab*?`  
![][26]

### 贪婪模式与懒惰模式
如果在限定符`*`、`+`、`?`、`{n}`、`{n,}`和`{n,m}`之后再添加一个字符 **`?`** ，则表示 **尽可能少地重复字符`?`之前的限定符号的重复次数**，这种匹配方式称为**懒惰匹配**，与之相对的，如果没有字符 **`?`** ，仅仅使用单个限定符`*`、`+`、`?`、`{n}`、`{n,}`和`{n,m}`的匹配，就称为**贪婪匹配**。  
看起来好像很复杂，但是理解历来并不难，即懒惰匹配模式只匹配最短符合表达式的字符串，贪婪匹配模式只匹配最长符合表达式的字符串。  
*这里的贪婪模式和懒惰模式在不同的教程或者说明里面都有不同的叫法，所以可以理解意思就行了，大同小异*

#### 测试
- 贪婪模式 `a.*b`  
可以看到这里只有一个匹配，就是整个字符串，因为这是最长的匹配  
![][27]  
- 懒惰模式 `a.?b`  
这里一旦发现一个匹配立刻就完成当前的匹配，然后从下一个字符开始新的匹配，所以这里会有4个匹配  
![][28]

# 字符的运算
## 替换
**替换**使用字符`|`来表示，表示如果某一个字符串匹配了表达式中字符`|`左边或者右边的规则，那么这个字符串就匹配了这个表达式  
`|`表示“或”的意思，这个符号和代码中的“逻辑或”相同，比较好理解  
**匹配是根据左边优先的原则，即从左往右，当左边的表达式不满足的时候，才会去尝试右边的表达式**

### 测试
- `a|b`  
可以看到不管是字符`a`还是`b`都可以匹配这个表达式，它等同于`[ab]`
![][29]  
![][30]

## 分组
**分组**又被称为子表达式，即把一个正则表达式的全部或部分分成一个或多个组，分组使用`()`来表示，括号中的表达式就是一个组，一个组就是一个整体  
要注意和字符类`[]`区分开来，`[123]`是表示匹配字符`1`或`2`或`3`，而`(123)`就是匹配`123`这个字符串

### 反向引用
**组号**  
当一个正则表达式被分组之后，默认从左到右每一个分组都会自动被赋予一个组号，以左括号`(`为分界从1开始自增，第一个组的组号是1，第二个组的组号是2，以此类推，在后面的表达式，使用`\组号`的方式来引用前面的组，例如`\b(\w)\1\b`这个表达式中，后面的`\1`就是对前面`(\w)`组的引用
**自定义组号**  
分组不止会自动使用数字作为组号，还可以手动命名，形式为`(?<name>)`，`(?<word>\w)`和`(?'word'\w)`都是把`\w+`匹配到的字母保存到名为`word`的分组，自定义命名的分组使用`\k<name>`的方式使用 ，如`\b(?<word>\w)\k<word>\b`是匹配连续的相同的两个字母的单词
**反向引用**  
提供了查找重复字符组的简便方法，可以认为是再次匹配同一个字符组的快捷指令  
**反向引用引用的是前面的表达式匹配到的字符串，而不是前面的表达式**  
例如，`\b(\w)\1\b` 这个表达式中的`\1`表示的是前面`\w`匹配到的字符，前面匹配到字母`a`那么`\1`处也必须替换为字母`a`，而不是任意一个字母 所以这个表达式匹配的是两个完全相同的字母 而如果是\b(\w)\w\b 则是表示两个允许不相同的字母  

| 字符                    | 说明                                                   |
|-----------------------|------------------------------------------------------|
| `(expression)`          | 匹配字符串`expression`，并将匹配到的文本保存到自动命名的分组里                  |
| `(?<name>expression)` | 匹配字符串`expression`，并将匹配的文本以name进行命名。该名称不能包含标点符号，不能以数字开头 |
| `(?:expression)`        | 匹配字符串`expression`，不保存匹配的文明，也不给此组分配组号                   |
| `(?=expression)`        | 匹配字符串`expression`前面的位置                                 |
| `(?!expression)`        | 匹配后面不是字符串`expression`的位置                               |
| `(?<=expression)`       | 匹配字符串`expression`后面的位置                                 |
| `(?<!expression)`     | 匹配前面不是字符串`expression`的位置                               |
| `(?>expression)`        | 只匹配字符串`expression`一次                                   |

#### 测试
- `(ab)`  
`ab`就是一个整体看待，和单独的字符串`ab`没有区别  
![][31]
- `(?<word>ab)\k<word>`  
把`ab`这个组命名为`word`，然后在后面调用前面命名的这个组匹配的字符，即这个表达式相当于`(ab)ab`  
![][32]
- `(?:a)(b)\1`  
前面的组被取消命名，所以自动命名从`(b)`开始，所以后面的`\1`匹配的是`(b)`  
![][33]
- `b(?=a)`  
这个表达式的意思是，匹配字符`b`，这个字符`b`的后面紧跟着一个`a`
![][34]
- `b(?!a)`  
这个表达式的意思是，匹配字符`b`，这个字符`b`的后面不是`a`  
![][35]
- `(?<=a)b`  
这个表达式的意思是，匹配字符`b`，这个字符`b`的前面是`a`
![][36]
- `(?<!a)b`  
这个表达式的意思是，匹配字符`b`，这个字符`b`的前面不是`a`  
![][37]
- `(?>a)b`  
![][38]

# 参考
1. 王蕾. 神奇的匹配 正则表达式求精之旅[M]. 北京:电子工业出版社, 2014.
2. 文中使用的正则表达式测试工具：[正则表达式测试工具在线调试与分享-Zjmainstay](http://regex.zjmainstay.cn/)
3. 文中使用的正则表达式可视化生成工具：[Regulex JavaScript Regular Expression Visualizer.](https://jex.im/regulex/)


  [1]: https://xiaoshujiang-1251968084.cos.ap-guangzhou.myqcloud.com/xiaoshujiang/正则表达式(一)_基本表达式/764df9d3edab2a51533801f4eda5e10b.png
  [2]: https://xiaoshujiang-1251968084.cos.ap-guangzhou.myqcloud.com/xiaoshujiang/正则表达式(一)_基本表达式/08845dafc115c3afe3095664ea297ae9.png
  [3]: https://xiaoshujiang-1251968084.cos.ap-guangzhou.myqcloud.com/xiaoshujiang/正则表达式(一)_基本表达式/ed63983bf327fb817fef4bf6ca5348c4.png
  [4]: https://xiaoshujiang-1251968084.cos.ap-guangzhou.myqcloud.com/xiaoshujiang/正则表达式(一)_基本表达式/bda2bbd73a110a3658ec7d24fdee23a2.png
  [5]: https://xiaoshujiang-1251968084.cos.ap-guangzhou.myqcloud.com/xiaoshujiang/正则表达式(一)_基本表达式/e3e6e5f8f12bf1d5c32ee47f94258fa4.png
  [6]: https://xiaoshujiang-1251968084.cos.ap-guangzhou.myqcloud.com/xiaoshujiang/正则表达式(一)_基本表达式/9d5782df54697499c11933bb5382d66e.png
  [7]: https://xiaoshujiang-1251968084.cos.ap-guangzhou.myqcloud.com/xiaoshujiang/正则表达式(一)_基本表达式/dc1692fdfbde99e5b026c0b625e4e7fc.png
  [8]: https://xiaoshujiang-1251968084.cos.ap-guangzhou.myqcloud.com/xiaoshujiang/正则表达式(一)_基本表达式/8a307a5776f8bc92c1337f939420cf58.png
  [9]: https://xiaoshujiang-1251968084.cos.ap-guangzhou.myqcloud.com/xiaoshujiang/正则表达式(一)_基本表达式/0eba7da9d3d0d37ea112487e01ac4b42.png
  [10]: https://xiaoshujiang-1251968084.cos.ap-guangzhou.myqcloud.com/xiaoshujiang/正则表达式(一)_基本表达式/2bf2f9154905e93145f0930112dc6bee.png
  [11]: https://xiaoshujiang-1251968084.cos.ap-guangzhou.myqcloud.com/xiaoshujiang/正则表达式(一)_基本表达式/d0c7504f64c0c63bc1da902ec9334953.png
  [12]: https://xiaoshujiang-1251968084.cos.ap-guangzhou.myqcloud.com/xiaoshujiang/正则表达式(一)_基本表达式/7d232169912175852be20c4a33df8a5c.png
  [13]: https://xiaoshujiang-1251968084.cos.ap-guangzhou.myqcloud.com/xiaoshujiang/正则表达式(一)_基本表达式/bf1decbcd28cbbdb3f06cbdac3cfbf1f.png
  [14]: https://xiaoshujiang-1251968084.cos.ap-guangzhou.myqcloud.com/xiaoshujiang/正则表达式(一)_基本表达式/9bae6a54273d1f3028065e97924a8f2f.png
  [15]: https://xiaoshujiang-1251968084.cos.ap-guangzhou.myqcloud.com/xiaoshujiang/正则表达式(一)_基本表达式/f4036adac45ba94e97b2a9f420bfd900.png
  [16]: https://xiaoshujiang-1251968084.cos.ap-guangzhou.myqcloud.com/xiaoshujiang/正则表达式(一)_基本表达式/03a07bd3f9499ebfa337f9a562ebd0be.png
  [17]: https://xiaoshujiang-1251968084.cos.ap-guangzhou.myqcloud.com/xiaoshujiang/正则表达式(一)_基本表达式/e1bcdfb1281f1c0270b85548ea82e20d.png
  [18]: https://xiaoshujiang-1251968084.cos.ap-guangzhou.myqcloud.com/xiaoshujiang/正则表达式(一)_基本表达式/6d618aad986a3e7da095b277550ab67e.png
  [19]: https://xiaoshujiang-1251968084.cos.ap-guangzhou.myqcloud.com/xiaoshujiang/正则表达式(一)_基本表达式/69cd3be707ea454bfbe75f9f0d8ed9bd.png
  [20]: https://xiaoshujiang-1251968084.cos.ap-guangzhou.myqcloud.com/xiaoshujiang/正则表达式(一)_基本表达式/a0a1e753e06aa2dbc1dc961537f6bd20.png
  [21]: https://xiaoshujiang-1251968084.cos.ap-guangzhou.myqcloud.com/xiaoshujiang/正则表达式(一)_基本表达式/e0c971a49b03c5f65cced97748c5420d.png
  [22]: https://xiaoshujiang-1251968084.cos.ap-guangzhou.myqcloud.com/xiaoshujiang/正则表达式(一)_基本表达式/96c29e77fa3410876f9add39ef95c59a.png
  [23]: https://xiaoshujiang-1251968084.cos.ap-guangzhou.myqcloud.com/xiaoshujiang/正则表达式(一)_基本表达式/9d3bf3ace88c55a138f09b84d5a91e33.png
  [24]: https://xiaoshujiang-1251968084.cos.ap-guangzhou.myqcloud.com/xiaoshujiang/正则表达式(一)_基本表达式/427524dd5ab76c6cde1d10f29e81cc9c.png
  [25]: https://xiaoshujiang-1251968084.cos.ap-guangzhou.myqcloud.com/xiaoshujiang/正则表达式(一)_基本表达式/5cbc5d68c8d229452a94c88bd98caad3.png
  [26]: https://xiaoshujiang-1251968084.cos.ap-guangzhou.myqcloud.com/xiaoshujiang/正则表达式(一)_基本表达式/cf81d58ec5c1905a7fafae79cbf78e74.png
  [27]: https://xiaoshujiang-1251968084.cos.ap-guangzhou.myqcloud.com/xiaoshujiang/正则表达式(一)_基本表达式/8bad9f7ac28ac09ea472dbcc6ed7af33.png
  [28]: https://xiaoshujiang-1251968084.cos.ap-guangzhou.myqcloud.com/xiaoshujiang/正则表达式(一)_基本表达式/977b1dc564973cf3bfa6c97d61f8d352.png
  [29]: https://xiaoshujiang-1251968084.cos.ap-guangzhou.myqcloud.com/xiaoshujiang/正则表达式(一)_基本表达式/9a83934cae03fa89c8094f7dec2a800b.png
  [30]: https://xiaoshujiang-1251968084.cos.ap-guangzhou.myqcloud.com/xiaoshujiang/正则表达式(一)_基本表达式/a81fbb5c77144d7ac3daa6b0ddf88179.png
  [31]: https://xiaoshujiang-1251968084.cos.ap-guangzhou.myqcloud.com/xiaoshujiang/正则表达式(一)_基本表达式/bc55d23df4436ceee614f891b501dc44.png
  [32]: https://xiaoshujiang-1251968084.cos.ap-guangzhou.myqcloud.com/xiaoshujiang/正则表达式(一)_基本表达式/4f6628e50be11af855eb8134b32c389d.png
  [33]: https://xiaoshujiang-1251968084.cos.ap-guangzhou.myqcloud.com/xiaoshujiang/正则表达式(一)_基本表达式/dd98df412ee636bb7177ef6b40d73982.png
  [34]: https://xiaoshujiang-1251968084.cos.ap-guangzhou.myqcloud.com/xiaoshujiang/正则表达式(一)_基本表达式/a531a1dee5031a29817e86a4e0d7d79a.png
  [35]: https://xiaoshujiang-1251968084.cos.ap-guangzhou.myqcloud.com/xiaoshujiang/正则表达式(一)_基本表达式/311ea871d2ad1bae0d12611d298822b4.png
  [36]: https://xiaoshujiang-1251968084.cos.ap-guangzhou.myqcloud.com/xiaoshujiang/正则表达式(一)_基本表达式/4b6534dba26b65c2e8e1f4c4e31f4a5a.png
  [37]: https://xiaoshujiang-1251968084.cos.ap-guangzhou.myqcloud.com/xiaoshujiang/正则表达式(一)_基本表达式/7081d13100d304753c3aa201eb21dcc8.png
  [38]: https://xiaoshujiang-1251968084.cos.ap-guangzhou.myqcloud.com/xiaoshujiang/正则表达式(一)_基本表达式/682e8feea289731e7008f07a33d6b6aa.png
