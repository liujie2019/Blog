[TOC]
### Flex布局是什么？
Flex 是 Flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。

任何一个容器都可以指定为Flex布局。

```css
.box{
   display: flex;
}
```
行内元素也可以使用 Flex 布局。

```CSS
.box {
   display: inline-flex;
}
```
Webkit内核的浏览器，必须加上-webkit前缀。

```CSS
.box {
   display: -webkit-flex; /* Safari */
   display: flex;
}
```
>注意：设为Flex布局以后，子元素的float、clear和vertical-align属性将失效。

### 基本概念
![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071004.png)
采用Flex布局的元素，称为Flex容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。
容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end。

项目默认沿主轴排列。单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size。
### 容器的属性
以下6个属性设置在容器上。

- flex-direction：定义主轴的方向（即项目的排列方向）；
- flex-wrap：
- flex-flow：
- justify-content：
- align-items：定义项目在交叉轴上如何对齐；
- align-content：定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用，具体属性值如下：
  - flex-start：与交叉轴的起点对齐；
  - flex-end：与交叉轴的终点对齐；
  - center：与交叉轴的中点对齐；
  - space-between：与交叉轴两端对齐，轴线之间的间隔平均分布；
  - space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍；
  - stretch（默认值）：轴线占满整个交叉轴。

### 项目的属性
以下6个属性设置在项目上。

- order：定义项目的排列顺序。数值越小，排列越靠前，默认为0；
- flex-grow：定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大；如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。
- flex-shrink：定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小；如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小，负值对该属性无效。
- flex-basis：定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。
- flex：该属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。该属性有两个快捷值：auto (1 1 auto)和none(0 0 auto)。建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。
- align-self：允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。

### 骰子的布局
默认m的HTML模板如下：
```html
<div class="box">
  <span class="item"></span>
</div>
```
上面代码中，div元素（代表骰子的一个面）是Flex容器，span元素（代表一个点）是Flex项目。如果有多个项目，就要添加多个span元素，以此类推。
#### 一个点
首先，只有左上角1个点的情况。Flex布局默认就是首行左对齐，所以一行代码就够了。
```css
.box {
    display: flex;
}
```
设置项目的对齐方式，就能实现居中对齐和右对齐。
```css
.box {
    display: flex;
    justify-content: center; // 水平居中对齐
}
```
```css
.box {
    display: flex;
    justify-content: flex-end; // 水平右对齐
}
```
设置交叉轴对齐方式，可以垂直移动主轴。
>水平左对齐，垂直居中：
```css
.box {
  display: flex;
  align-items: center;
}
```
>水平垂直居中：
```css
.box {
    display: flex;
    justify-content: center;
    align-items: center;
}
```
>水平居中，垂直靠下：
```css
.box {
    display: flex;
    justify-content: center;
    align-items: flex-end;
}
```
>水平局右，垂直靠下：
```css
.box {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
}
```
#### 两个点




### 参考文档
1. [Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool)
2. [Flex 布局教程：实例篇](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)