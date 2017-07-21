---
layout: post
title: 2017编程提高第6节课(作业)
date: 2017-07-21 12:53
categories: 2017编程提高
tags: [设计模式,建造者模式,作业]
---

* content
{:toc}

# 问题
## 自制Builder 创建xml 字符串
![][1]

![][2]

![][3]

![][4]

# 分析
这里的意思主要是把原来的设置属性的操作转变为链式调用的操作，让这个Builder更加直观，实现链式调用的关键在于原本返回值是`void`，现在改成了返回自己，所以就可以在调用的基础上再次调用

![][5]

# 代码
接下来就简单了，首先是预先定义好的`TagNode`类：
```java
package DoubleLevelNesting;

import java.util.ArrayList;
import java.util.List;

/**
 * Tag节点
 *
 * @author LanyuanXiaoyao
 * @create 2017-07-18
 */
public class TagNode {
    private String tagName;
    private String tagValue;
    private List<TagNode> children = new ArrayList<>();
    private List<Attribute> attributes = new ArrayList<>();

    public TagNode(String tagName) {
        this.tagName = tagName;
    }

    public String getTagName() {
        return tagName;
    }

    public void setTagName(String tagName) {
        this.tagName = tagName;
    }

    public String getTagValue() {
        return tagValue;
    }

    public void setTagValue(String tagValue) {
        this.tagValue = tagValue;
    }

    public List<TagNode> getChildren() {
        return children;
    }

    public void setChildren(List<TagNode> children) {
        this.children = children;
    }

    public List<Attribute> getAttributes() {
        return attributes;
    }

    public void setAttributes(List<Attribute> attributes) {
        this.attributes = attributes;
    }

    public static class Attribute {
        public Attribute(String name, String value) {
            this.name = name;
            this.value = value;
        }

        String name;
        String value;
    }

    public String toXML() {
        return toXML(this);
    }

    private String toXML(TagNode node) {
        StringBuilder buffer = new StringBuilder();
        buffer.append("<").append(node.tagName);
        if (node.attributes.size() > 0) {
            for (int i = 0; i < node.attributes.size(); i++) {
                Attribute attr = node.attributes.get(i);
                buffer.append(" ").append(toXML(attr));
            }
        }
        if (node.children.size() == 0) {
            buffer.append("/>");
            return buffer.toString();
        }
        System.out.println(node.children.size());
        buffer.append(">");
        for (TagNode childNode : node.children) {
            buffer.append(toXML(childNode));
        }
        buffer.append("</").append(node.tagName).append(">");

        return buffer.toString();
    }

    private String toXML(Attribute attr) {
        return attr.name + "=\"" + attr.value + "\"";
    }
}
```
这里面除了基本的`attribute`和`children`之外，还有一个`toXML`方法是用来打印这个节点内容的  
然后就是我们的`TagNodeBuilder`类了：
```java
package DoubleLevelNesting;

import java.util.ArrayList;

/**
 * Tag构造器
 *
 * @author LanyuanXiaoyao
 * @create 2017-07-18
 */
public class TagBuilder {

    private TagNode root;
    private TagBuilder rootBuilder;

    public TagBuilder(String rootName) {
        this.root = new TagNode(rootName);
        this.root.setChildren(new ArrayList<>());
        this.root.setAttributes(new ArrayList<>());
    }

    public TagBuilder(String rootName, TagBuilder tagBuilder) {
        this.root = new TagNode(rootName);
        this.root.setChildren(new ArrayList<>());
        this.root.setAttributes(new ArrayList<>());
        this.rootBuilder = tagBuilder;
    }

    public TagBuilder addChild(String childName) {
        TagBuilder childBuilder = new TagBuilder(childName, this);
        if (rootBuilder == null)
            root.getChildren().add(childBuilder.build());
        else
            rootBuilder.build().getChildren().add(childBuilder.build());
        return childBuilder;
    }

    public TagBuilder setAttribute(String name, String value) {
        TagNode.Attribute attribute = new TagNode.Attribute(name, value);
        root.getAttributes().add(attribute);
        return this;
    }

    public TagBuilder end() {
        return rootBuilder;
    }

    public void toXML() {
        if (rootBuilder == null)
            System.out.println(root.toXML());
        else
            rootBuilder.toXML();
    }

    public TagNode build() {
        return root;
    }
}
```
这里面的关键点在于多了一个`public TagBuilder(String rootName, TagBuilder tagBuilder)`的构造函数，用来在子结点中存储父结点的信息，方便我们在调用`toXML()`方法的时候可以递归调用到根节点的`toXML()`方法

## 测试
写完了就简单测试一下
```java
public static void main(String[] args) {
	new TagBuilder("root")
		.setAttribute("attr3", "value")
		.setAttribute("attr4", "value")
		.addChild("child")
			.setAttribute("attr1", "value")
			.setAttribute("attr2", "value")
		.addChild("child2")
			.setAttribute("attr5", "value")
			.setAttribute("attr6", "value")
		.toXML();
    }
```
运行结果：
```java
<root attr3="value" attr4="value">
	<child attr1="value" attr2="value"/>
	<child2 attr5="value" attr6="value"/>
</root>
```

# 扩展
从代码可以看到，我们实际上只做了两层结点的生成，实际上我们应该需要做多层结点的，也就是儿子还有儿子的意思，但是我们如果想通过上面的代码生成，就会发现，我们根本没有办法识别子结点的嵌套关系，所以如果要实现多层嵌套关系，我们必须还要增加一个方法来表达本层节点结束的意思，这里我用一个`and()`表示，代码如下：
```java
package MultiLevelNesting;

import java.util.ArrayList;

/**
 * Tag构造器
 *
 * @author LanyuanXiaoyao
 * @create 2017-07-18
 */
public class TagBuilder {

    private TagNode root;
    private TagBuilder rootBuilder;

    public TagBuilder(String rootName) {
        this.root = new TagNode(rootName);
        this.root.setChildren(new ArrayList<>());
        this.root.setAttributes(new ArrayList<>());
    }

    public TagBuilder(String rootName, TagBuilder tagBuilder) {
        this.root = new TagNode(rootName);
        this.root.setChildren(new ArrayList<>());
        this.root.setAttributes(new ArrayList<>());
        this.rootBuilder = tagBuilder;
    }

    public TagBuilder addChild(String childName) {
        TagBuilder childBuilder = new TagBuilder(childName, this);
        root.getChildren().add(childBuilder.toTagTreeNode());
        return childBuilder;
    }

    public TagBuilder setAttribute(String name, String value) {
        TagNode.Attribute attribute = new TagNode.Attribute(name, value);
        root.getAttributes().add(attribute);
        return this;
    }

    public TagBuilder and() {
        return rootBuilder;
    }

    public void toXML() {
        if (rootBuilder == null)
            System.out.println(root.toXML());
        else
            rootBuilder.toXML();
    }

    public TagNode toTagTreeNode() {
        return root;
    }
```
可以看到我在`end()`中返回了父结点的构造器，这样就终止了继续添加子结点在当前结点上。
## 测试
也是简单地测试了一下
```java
public static void main(String[] args) {
	new TagBuilder("root")
		.setAttribute("attr0","0")
		.addChild("child")
			.setAttribute("attr1","1")
			.setAttribute("attr1","1")
			.setAttribute("attr1","1")
			.addChild("child2")
				.setAttribute("attr2","2")
				.setAttribute("attr2","2")
				.setAttribute("attr2","2")
				.and()
			.and()
		.addChild("child3")
			.setAttribute("attr3","3")
	.toXML();
}
```
运行结果：
```java
<root attr0="0">
	<child attr1="1" attr1="1" attr1="1">
		<child2 attr2="2" attr2="2" attr2="2"/>
	</child>
	<child3 attr3="3"/>
</root>
```


  [1]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/20/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC6%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%286%29/%E5%9B%BE%E7%89%8734.png "作业"
  [2]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/20/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC6%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%286%29/%E5%9B%BE%E7%89%8735.png "作业"
  [3]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/20/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC6%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%286%29/%E5%9B%BE%E7%89%8736.png "作业"
  [4]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/20/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC6%E8%8A%82%E8%AF%BE%E2%80%94%E2%80%94%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E8%AE%BE%E8%AE%A1%286%29/%E5%9B%BE%E7%89%8737.png "作业"
  [5]: https://www.github.com/lanyuanxiaoyao/GitGallery/raw/master/2017/7/21/2017%E7%BC%96%E7%A8%8B%E6%8F%90%E9%AB%98%E7%AC%AC6%E8%8A%82%E8%AF%BE%28%E4%BD%9C%E4%B8%9A%29/2.png "builder原理"