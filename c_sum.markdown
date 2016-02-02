---
layout: page
title: 归档
image: 10.jpg
---
<div>
    <blockquote>归档目录</blockquote>
    <div style="text-align: left">
        <ul>
        {% for post in site.posts %}
        {% capture ym %}
        {{ post.date | date:"%Y 年 %m 月" }}
        {% endcapture %}
        {% if yearmonth != ym %}
        {% assign yearmonth = ym %}
        <li><a href="#{{ ym | strip_html  }}">{{ ym }}</a></li>
        {% endif %}
        {% endfor %}
        </ul>
    </div>
</div>
<hr>
<div style="text-align: left">
    {% for post in site.posts %}
    {% capture ym %}{{ post.date | date:"%Y 年 %m 月" }}{% endcapture %}
    {% if yearmonth != ym %}
    {% assign yearmonth = ym %}
</ul>
<blockquote id="{{ ym }}">{{ ym }}</blockquote>
<ul>
    {% endif %}
    <li>
        <time datetime="{{ post.date | date_to_string }}">{{ post.date | date_to_string }}</time>
        <a href="{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a>
    </li>
    {% endfor %}
</div>