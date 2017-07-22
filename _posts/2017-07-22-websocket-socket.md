---
layout: post
title: 为什么不直接使用socket ,还要定义一个新的websocket 的呢？
date: 2017-07-22 09:34
categories: 2017编程提高
tags: [Websocket,Socket,Issues]
---

* content
{:toc}

# 关于问题
问题链接：[为什么不直接使用socket ,还要定义一个新的websocket 的呢？](https://github.com/onlyliuxin/coding2017/issues/497)

首先，要说到这个websocket和socket，umm，只让我和大家一样不约而同地想到一个图：

![][1]

哈哈哈哈，反正他们之间是没什么直接的联系单的，既然要说区别，就让我们先来理一理这两个东西是个什么玩意儿先。

# Websocket
> WebSocket一种在单个 **TCP 连接**上进行**全双工通讯**的协议。WebSocket通讯协定于**2011年**被IETF定为标准RFC 6455，并被RFC7936所补充规范。WebSocket API也被W3C定为标准。  
> 　
> WebSocket 使得客户端和服务器之间的数据交换变得更加简单，**允许服务端主动向客户端推送数据**。在 WebSocket API 中，浏览器和服务器只需要完成一次握手，两者之间就直接可以**建立持久性的连接**，并进行**双向数据传输**。
> 　  
> ——维基百科

以上是对Websocket的一个简单的介绍，其实从上面加粗的关键词就可以看出Websocket的一些特点：持久连接，双向数据传输……  
可能我们没有对网络传输有一个系统的概念，那么我们先描述一下在Websocket之前我们是怎么进行网络数据传输的
## 没有Websocket的时代
显然我们寻常的网站都是使用HTTP协议进行通信的，那么相比较Websocket，HTTP最大的缺点是什么呢？那就是——**请求只能由客户端发起**，这是一种什么情况呢，就是每次都是客户端向服务端请求信息，然后服务器回传信息，但是服务器不能主动向客户端发送信息，让我们想象一下两个人说话  
客户端：“嘿！服务器你吃了吗？”  
服务器：“吃了！吃了！”  
客户端（心想）：“原来服务器酱已经吃过了”（捂住耳朵）  
服务器：“嘿！我们一起出去玩吧！”  
客户端：“听不见，听不见……”  
服务器：“嘿！我们一起出去玩吧！”  
客户端：“听不见，听不见……”  
服务器：“欸~ 我们一起出去玩吧，你怎么都不理我了……”（委屈哭）  
客户端：“听不见，听不见……”  
这种单向的消息传递在平常是没有问题的，因为服务器就像一个客服一样，只有当我们有问题去问它的时候，它才会告诉我们答案，然后平常客服是没有办法主动打扰我们，但是在有的场景却并不是这么简单，比如在线聊天和在线游戏，当我们服务端发生了连续的变化，而且这种变化不是由客户端引起的，那么服务器也没有办法通知客户端发生了何种变化，除非客户端主动来问（发起请求）  
在这种情况下，客户端该如何保持和服务器的联系呢？我们有一个简单的方式：**轮询**  
顾名思义，就是客户端像一个车轮一样不断重复向服务器发起请求，询问有没有发生变化，但是我们也可以想到，这种方式是有很多缺点的
1. 服务器消耗资源大  
为了应付我们客户端的轮询，HTTP连接必须不断打开关闭，或者一直保持打开的状态，即使服务器的状态没有发生变化，我们客户端这边的资源也会一直被占用，没有办法被释放
2. 效率低下  
可以想象得到，其实在轮询中我们获得的有效信息占有的部分是非常小的，有可能我们一整天数据才发生一次变化，但是为了获得这个变化，却不得不一整天都在对服务器进行轮询，效率非常低
3. 网络压力大  
我们都知道HTTP请求是包含着各种头部信息的，这就意味着，即使我们的请求里面没有任何信息，一个HTTP也要有好几百B的数据量，似乎并不大，但是如果在高并发的状况下进行轮询，那么网络中的流量可就非常庞大了，而且这些流量都是无用的

## Websocket的时代
显然我们现有的网络协议都不能解决这个服务器主动发起通信的问题，那么！我们来写一个新的协议吧！  
于是，Websocket协议就在2011年被正式提出来了，并且迅速被所有浏览器都支持了，因为这个功能贼好用啊！在网络中服务端和客户端终于可以进行平等通信了，情况就变成了  
客户端：“嘿！服务器你吃了吗？”  
服务器：“吃了！吃了！”  
服务器：“嘿！我们一起出去玩吧！”  
客户端：“好啊！好啊！”  
这个变化可以用一张图来表示

![][2]

**Websocket的优点**
*   较少的控制开销  
在连接建立后，服务器和客户端之间交换数据时，用于协议控制的**数据包头部相对较小**。在不包含扩展的情况下，对于服务器到客户端的内容，此头部大小只有2至10字节（和数据包长度有关）；对于客户端到服务器的内容，此头部还需要加上额外的4字节的掩码。相对于HTTP请求每次都要携带完整的头部，此项开销显著减少了。
*   更强的实时性  
由于协议是全双工的，所以服务器可以随时**主动给客户端下发数据**。相对于HTTP请求需要等待客户端发起请求服务端才能响应，延迟明显更少；即使是和Comet等类似的长轮询比较，其也能在短时间内更多次地传递数据。
*   保持连接状态  
于HTTP不同的是，Websocket需要先建立连接，这就使得其成为一种**有状态**的协议，之后通信时可以省略部分状态信息。而HTTP请求可能需要在每个请求都携带状态信息（如身份认证等）。
*   更好的二进制支持  
Websocket定义了二进制帧，相对HTTP，可以更轻松地处理二进制内容。
*   可以支持扩展  
Websocket定义了扩展，用户可以扩展协议、实现部分自定义的子协议。如部分浏览器支持压缩等。
*   更好的压缩效果  
相对于HTTP压缩，Websocket在适当的扩展支持下，可以沿用之前内容的上下文，在传递类似的数据时，可以显著地提高压缩率。

虽然有一堆乱七八糟的特点，但是最重要的一点就是解决了服务器主动向客户端下发消息这个问题  
值得注意的一点是，Websocket和HTTP是同级的协议，都是基于TCP协议的应用层协议，也就是说不存在说HTTP协议包含Websocket协议这种说法，但是这也不是说这两个协议之间毫无关系，因为Websocket在服务器主动发起请求的时候，采用的是HTTP协议来进行握手，一旦握手成功，Websocket就转而运行在TCP协议之上的，就和HTTP协议没有关系了

# Socket
> Socket本质是编程接口(API)，对TCP/IP的封装，TCP/IP也要提供可供程序员做网络开发所用的接口，这就是Socket编程接口；HTTP是轿车，提供了封装或者显示数据的具体形式;Socket是发动机，提供了网络通信的能力。
> ——百度百科

Socket是一套API接口，是建立在TCP和应用程序之间的一个抽象层，就是我们之前说的“面向抽象编程”的这个抽象，Socket这个抽象层帮我们封装了TCP/UDP等网络协议的操作，让我们可以通过Socket提供的接口进行网络通信，可以通过一个图来说明这个抽象的功能

![][3]

然后我们就可以简单得使用Socket的API进行通信操作了，当然，我们是不用管下面TCP具体是怎么实现的

![][4]

**关于Socket的起源**  
Socket起源于UNIX，在Unix一切皆文件哲学的思想下，Socket是一种"打开—读/写—关闭"模式的实现，服务器和客户端各自维护一个"文件"，在建立连接打开后，可以向自己文件写入内容供对方读取或者读取对方内容，通讯结束时关闭文件

# 对比
让我们把目光放回Websocket和Socket的关系上来，当然结论我们已经知道了，就是这俩家伙没有什么关系，Websocket是一种应用层协议，Socket是封装了网络层操作的抽象API接口，如果非要说他们有什么关系的话，那么除了名字比较像之外，应该就是理念差不多了吧

# 参考
1. [维基百科-WebSocket](https://www.wikiwand.com/zh-hans/WebSocket)
2. [阮一峰-WebSocket 教程](http://www.ruanyifeng.com/blog/2017/05/websocket.html)
3. [Socket 与 WebSocket](http://blog.zengrong.net/post/2199.html)
4. [WebSocket 是什么原理？为什么可以实现持久连接？](https://www.zhihu.com/question/20215561)
5. [WebSocket和Socket的区别](http://www.jianshu.com/p/59b5594ffbb0)


  [1]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/22/%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%8D%E7%9B%B4%E6%8E%A5%E4%BD%BF%E7%94%A8socket%20,%E8%BF%98%E8%A6%81%E5%AE%9A%E4%B9%89%E4%B8%80%E4%B8%AA%E6%96%B0%E7%9A%84websocket%20%E7%9A%84%E5%91%A2%EF%BC%9F/1966024-28aa9e546a7c7528.jpg "websocket和socket的关系"
  [2]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/22/%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%8D%E7%9B%B4%E6%8E%A5%E4%BD%BF%E7%94%A8socket%20,%E8%BF%98%E8%A6%81%E5%AE%9A%E4%B9%89%E4%B8%80%E4%B8%AA%E6%96%B0%E7%9A%84websocket%20%E7%9A%84%E5%91%A2%EF%BC%9F/bg2017051502.png "HTTP和Websocket"
  [3]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/22/%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%8D%E7%9B%B4%E6%8E%A5%E4%BD%BF%E7%94%A8socket%20,%E8%BF%98%E8%A6%81%E5%AE%9A%E4%B9%89%E4%B8%80%E4%B8%AA%E6%96%B0%E7%9A%84websocket%20%E7%9A%84%E5%91%A2%EF%BC%9F/05225723-2ffa89aad91f46099afa530ef8660b20.jpg "Socket抽象层"
  [4]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/22/%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%8D%E7%9B%B4%E6%8E%A5%E4%BD%BF%E7%94%A8socket%20,%E8%BF%98%E8%A6%81%E5%AE%9A%E4%B9%89%E4%B8%80%E4%B8%AA%E6%96%B0%E7%9A%84websocket%20%E7%9A%84%E5%91%A2%EF%BC%9F/05232335-fb19fc7527e944d4845ef40831da4ec2.png "Socket的使用"