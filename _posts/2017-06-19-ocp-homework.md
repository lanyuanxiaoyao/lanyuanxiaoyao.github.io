---
layout: post
title: 2017编程提高第2节课(作业)
date: 2017-06-19 22:20
categories: 2017编程提高
tags: [软件工程,OCP,开闭原则,设计模式,作业]
---

* content
{:toc}

# 问题
重构一个简单的log打印，使之符合开闭原则(OCP)
# 解题
这个星期的作业似乎比上个星期的要简单，重构起来思路也很清晰，不过仍然有一些令我迷惑的地方，这个也在下面会讲到
## 分析
![][1]
如图只有5个文件，功能分别为
- DateUtil
在log中拼接上时间信息
- Logger
提供主log方法
- MailUtil
使用邮件发送log
- SMSUtil
使用sms发送log

当然啦，我相信这些方法都是瞎掰的，所以不用管，其实只要看一下Logger这个类中的方法就可以了，Logger类内容如下
```java
public class Logger {
	
	public final int RAW_LOG = 1;
	public final int RAW_LOG_WITH_DATE = 2;
	public final int EMAIL_LOG = 1;
	public final int SMS_LOG = 2;
	public final int PRINT_LOG = 3;
	
	int type = 0;
	int method = 0;
			
	public Logger(int logType, int logMethod){
		this.type = logType;
		this.method = logMethod;		
	}
	public void log(String msg){
		
		String logMsg = msg;
		
		if(this.type == RAW_LOG){
			logMsg = msg;
		} else if(this.type == RAW_LOG_WITH_DATE){
			String txtDate = DateUtil.getCurrentDateAsString();
			logMsg = txtDate + ": " + msg;
		}
		
		if(this.method == EMAIL_LOG){
			MailUtil.send(logMsg);
		} else if(this.method == SMS_LOG){
			SMSUtil.send(logMsg);
		} else if(this.method == PRINT_LOG){
			System.out.println(logMsg);
		}
	}
}
```
一看就是要重构的代码，违反OCP原则的代码有个比较明显的特征就是使用了很多`if else`或`switch`等分支语句对传进来的参数进行判断，而我重构的任务就是使用多态和继承来把这些分支语句去掉，或者说拆分开。  
那么可以发现这里的重构是分为两部分，一部分是用来判断log文本是否需要进行某种“加工”处理，比如添加时间信息
```java
if(this.type == RAW_LOG){
	logMsg = msg;
} else if(this.type == RAW_LOG_WITH_DATE){
	String txtDate = DateUtil.getCurrentDateAsString();
	logMsg = txtDate + ": " + msg;
}
```
另一部分就是用来判断log需要通过什么方式发送出去
```java
if(this.method == EMAIL_LOG){
	MailUtil.send(logMsg);
} else if(this.method == SMS_LOG){
	SMSUtil.send(logMsg);
} else if(this.method == PRINT_LOG){
	System.out.println(logMsg);
}
```
知道我要重构的目标代码，接下来就是拆分了
## 重构
### log文本加工判断部分的重构
前面我说出现迷惑的地方就是这里，因为原代码中只有两种情况：加日期/不加日期，我一开始就在纠结，加不加日期的这个判断是否需要重构？毕竟只有两种情况就是应该用`if`来处理的啊，把这个也拆分开来会不会过度设计了，但是我转念就想通了，我犯了和我第一次作业同样的错误，就是抽象程度不足，事实上这部分的代码正确的抽象应该是**对log文本进行处理**，而不仅仅只是加不加日期，所以除了加日期，以后还有可能加上类名啊，作者名啊什么乱七八糟的，所以这样看来一个`if`显然是不能胜任的，所以这一段代码也是要进行拆分的。  
讲完这一部分剩下的就简单了，++套路就是通过从一个基类继承实现传参的多态性，再通过基类实现某个动作的结构来实现功能的多态性++（这句话是我自己瞎掰的……不严谨，意思到了就行），所以重构如下：  
一个接口IMsgHandle.java
```java
public interface IMsgHandle {
	String handleMsg(String msg);
}
``` 
一个基类BaseMsgTool.java
```java
public abstract class BaseMsgTool implements IMsgHandle{ }
```
然后就是从基类继承的各种子类  
HandleMsgWithNone.java
```java
// 直接打印log不进行任何加工
public class HandleMsgWithNone extends BaseMsgTool {
	public String handleMsg(String msg) {
		return msg;
	}
}
```
HandleMsgWithDate.java
```java
// 在log前加上当前日期
public class HandleMsgWithDate extends BaseMsgTool {
	public String handleMsg(String msg) {
		return DateUtil.getCurrentDateAsString() + ": " + msg;
	}
}
```
## 判断log需要通过什么方式发送部分的重构
和上面一样就不多赘述了  
一个接口ISendLog.java
```java
public interface ISendLog {
	void sendLog(String msg);
}
``` 
一个基类BaseLog.java
```java
public abstract class BaseLog implements ISendLog{ }
```
然后就是从基类继承的各种子类  
EmailLog.java
```java
public class EmailLog extends BaseLog {
	public void sendLog(String msg) {
		MailUtil.send(msg);
	}
}
```
SmsLog.java
```java
public class SmsLog extends BaseLog {
	public void sendLog(String msg) {
		SMSUtil.send(msg);
	}
}
```
PrintLog.java
```java
public class PrintLog extends BaseLog {
	public void sendLog(String msg) {
		System.out.println(msg);
	}
}
```
## Logger类变成什么样了？
经过重构之后，Logger类变成了
```java
public class Logger {

	private BaseMsgTool tool;
	private BaseLog log;

	public Logger(BaseMsgTool tool, BaseLog log) {
		this.tool = tool;
		this.log = log;
	}

	public void log(String msg) {
		log.sendLog(tool.handleMsg(msg));
	}
	
}
```
然后再其他类中的调用就变成了
```java
public static void main(String[] args) {
	new Logger(new HandleMsgWithNone(), new PrintLog()).log("Hello world");
}
```
至此，我的重构就完成了，但我觉得还是有点什么不对……到底是什么不对呢？
## 小结
开闭原则是复用代码的基石，继承基类然后通过多态来实现`if`的效果，可以达到在调用的时候不需要改原来调用的方法就直接添加新的子类，大大提高了扩展性和可维护性。

  [1]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/Ashampoo_Snap_2017%E5%B9%B46%E6%9C%8819%E6%97%A5_22h32m13s_001_.png "原始代码结构"