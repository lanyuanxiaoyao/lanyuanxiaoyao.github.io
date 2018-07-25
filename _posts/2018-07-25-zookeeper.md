---
layout: post
title: Zookeeper学习之路
date: 2018-07-25 22:00
categories: Zookeeper
tags: [Java,Zookeeper,大数据]
description: Zookeeper是分布式大数据系统中的状态枢纽
---
* content
{:toc}

# TODO
- [ ] 技术背景
- [ ] 基本概念
- [ ] 操作使用
    - [ ] 部署与运行
        - [ ] 运行环境
        - [ ] 运行模式
            - [ ] 单机
            - [ ] 集群
        - [ ] 服务启停
            - [ ] Java命令行
            - [ ] Zookeeper脚本
        - [ ] 常见异常
            - [ ] 端口被占用
            - [ ] 磁盘没有剩余空间
            - [ ] 无法找到myid文件
            - [ ] 集群中其他机器的Leader选举端口未开
    - [ ] 操作与使用
        - [ ] 客户端脚本
            - [ ] 创建
            - [ ] 读取
            - [ ] 更新
            - [ ] 删除
        - [ ] Java API
            - [ ] 创建会话
            - [ ] 创建节点
            - [ ] 删除节点
            - [ ] 读取数据
            - [ ] 更新数据
            - [ ] 检测节点是否存在
            - [ ] 权限控制
        - [ ] 客户端
            - [ ] ZkClient
            - [ ] Curator
- [ ] 应用场景
- [ ] 深入理解
- [ ] 运行维护

# 技术背景
## 集中式与分布式
### 集中式系统
由==一台主机或多台==计算机组成中心节点，==数据集中存储==在这个中心节点上，并且整个系统的==所有业务单元==都集中部署在这个中心节点上，系统的==所有功能==均由其集中处理。
#### 特点
部署简单，结构简单
### 分布式系统
一个硬件或软件组件分布在==不同的网络计算机==上，彼此之间==仅仅通过消息传递==进行通信和协调的系统。
#### 特点
- **分布性** 分布式系统中的多台计算机都会在==空间上随意分布==，机器的分布情况也会==随时改变==
- **对等性** 分布式系统中的计算机没有主/从之分，==所有节点都是平等的==
    - **副本** 分布式系统对数据和服务提供的一种冗余方式，数据副本是解决分布式系统数据丢失问题的最有效手段；服务副本是指多个节点提供相同的服务，==每个节点都能独立接收外部请求并进行处理==
- **并发性**
- **缺乏全局时钟** 在分布式系统中很难定义两个事件发生的先后，因为分布式系统==缺乏一个全局的时钟序==列，计算机节点之间存在时间差
- **故障总会发生** 组成分布式系统的所有计算机，都有可能发生==任何形式的故障==
#### 问题与挑战
- **通信异常** 分布式系统中的各个节点依赖网络进行传输，因此==每次网络通信都伴随着网络不可用的风险==，其次，即使可以正常通信，系统操作之间的==时延也会非常大==，消息丢失变得非常普遍
- **网络分区** 由于网络的原因，导致分布式系统的节点里面只有部分节点之间能够正常通信，这个现象称为“网络分区”（或“脑裂”），这==对分布式一致性提出了非常大的挑战==
- **超时** 当发生以下两种超时现象的时候，网络通信的发起方是无法确定请求是否被处理成功
    - 由于网络原因，请求没有被成功发送到接收方，而是在==发送给接收方的过程中消息丢失了==
    - 由于网络原因，消息被接收方成功接收后，并进行了处理，但响应‘反馈的消息在==发送给发送方的过程中丢失了==
- **节点故障** 分布式系统中节点出现==宕机==或“僵死”的现象
## 事务与一致性
### 事务(Transaction)
事务
: 由==一系列==对系统中数据进行访问与更新的操作组成的一个程序==执行逻辑单元==

分布式事务
: 指事务的参与者、支持事务的机器、资源以及事务管理等都分别在分布式系统的==不同节点==上
### ACID
- **原子性(Atomicity)** 事务必须是一个原子的操作序列，==任何一项操作失败都导致整个事务失败==，其他已经执行了的操作将会==被撤销并回滚==到未执行事务之前的状态
- **一致性(Consistency)** 事务不能破坏数据的==完整性和一致性==
- **隔离性(Isolation)** ==事务的执行不能被其他事务干扰==，隔离级别分为以下四种。大多数情况下，“授权读取”可以在避免脏读的情况下保证较好的性能，对于可能出现的虚读、不可重复读等并发问题，==主动采用悲观锁或乐观锁进行控制==
    - **未授权读取** 该级别==允许脏读==，隔离级别最低
    - **授权读取** 只允许读取==已经被提交==的数据
    - **可重复读取** 在事务处理过程中，==多次读取==同一个数据都只能得到==事务开始时刻的值==
    - **串行化** 最严格的事务隔离级别，要求所有事务串行执行，不能并发执行
- **持久性(Durability)** 一个事务一旦提交，它对数据的变更就应该被永久保留下来
### CAP
CAP定理
: 一个分布式系统不可能同时满足一致性(Consistency)、可用性(Avaliability)和分区容错性(Partition tolerance)，==最多只能同时满足两个==