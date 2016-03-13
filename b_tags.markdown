---
layout: page
title: 分类
image: 10.jpg
bar: true
---

<div id='tag_cloud'>
{% for tag in site.tags %}
<a href="#{{ tag[0] }}" title="{{ tag[0] }}" rel="{{ tag[1].size }}" style="font-size: {{ tag[1].size | divided_by:5 | times:20 | plus:100 }}%;margin: 5px;color: #FFFFFF;background-color: #77D7FF;border-radius: 10px;text-align: center;display: inline-block;padding: 5px;">{{ tag[0] }}({{ tag[1].size }})</a>
{% endfor %}
</div>

<ul class="listing">
{% for tag in site.tags %}
  <li class="listing-seperator" id="{{ tag[0] }}">{{ tag[0] }}</li>
{% for post in tag[1] %}
  <li class="listing-item">
  <time datetime="{{ post.date | date:"%Y-%m-%d" }}">{{ post.date | date:"%Y-%m-%d" }}</time>
  <a href="{{ site.url }}{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a>
  </li>
{% endfor %}
{% endfor %}
</ul>

<script src="{{ site.baseurl }}assets/javascript/jquery.tagcloud.js" type="text/javascript" charset="utf-8"></script> 
<script language="javascript">
$.fn.tagcloud.defaults = {
    size: {start: 1, end: 2, unit: 'em'},
      color: {start: '#ada8b5', end: '#000000'}
};

$(function () {
    $('#tag_cloud a').tagcloud();
});
</script>
