# 區塊元素

## 標題

# This is an H1
## This is an H2
### This is an H3
#### This is an H4 (normal text size)
##### This is an H5
###### This is an H6 (min)

## 清單項目

1. bird
2. mchale
3. parish


- color
  - red
    - fire
    - sun
  - green
    - tree
    - leaf
  - blue
    - sky
    - ocean

如果清單項目間用空行分開， Markdown會把項目的內容在輸出時用 `<p>` 標籤包起來，舉例來說：

*   Bird

*   Magic

清單項目可以包含多個段落，每個項目下的段落都必須縮排4個空白或是一個tab：

1.  This is a list item with two paragraphs. Lorem ipsum dolor
    sit amet, consectetuer adipiscing elit. Aliquam hendrerit
    mi posuere lectus.

    Vestibulum enim wisi, viverra nec, fringilla in, laoreet
    vitae, risus. Donec sit amet nisl. Aliquam semper ipsum
    sit amet velit.

2.  Suspendisse id sem consectetuer libero luctus adipiscing.

## 程式碼

Here is an example of AppleScript:

    tell application "Foo"
        beep
    end tell

GitHub Flavored Markdown (GFM)

``` markdown
[links](http://example.com) inline or [link references][1].

很長的文字。很長的文字。很長的文字。很長的文字。很長的文字。很長的文字。很長的文字。很長的文字。很長的文字。很長的文字。很長的文字。很長的文字。很長的文字。很長的文字。很長的文字。很長的文字。很長的文字。很長的文字。很長的文字。很長的文字。很長的文字。很長的文字。很長的文字。很長的文字。
very long text. very long text. very long text. very long text. very long text. very long text. very long text. very long text. very long text. very long text. very long text. very long text. very long text. very long text. very long text. very long text. very long text. very long text.

- one _thing_ has *em*phasis
- two __things__ are **bold**

[1]: http://example.com
```

## 表格

||
|-
|1|2
|1|2

靠左靠右

|表格table|置中|對左|對右|
|-|:-:|:-|-:|
|表格table|2|3|4|
|表格table|2|3|4|

# 區段元素

## 特殊字元

html element:

123<sub>456</sub>789

html entity:

space(&nbsp;) &lt; &gt; &amp; &quot; &apos; &cent; &pound; &yen; &euro; &copy; &reg;

## 連結

This is [an example](http://example.com/ "Title") inline link.

[This link](http://example.com/) has no title attribute.

This is [an example][id] reference-style link.
[id]: <http://example.com/>  "Optional Title Here"

自動連結

<http://example.com/>

<address@example.com>

## 強調

`<em>` *single asterisks*

`<em>` _single underscores_

`<strong>` **double asterisks**

`<strong>` __double underscores__

## 行內程式碼

Use the `printf()` function.

## 圖片

![Alt text](https://www.google.com.tw/images/branding/googlelogo/2x/googlelogo_color_120x44dp.png "Optional title")

![Alt text][pic_id]
[pic_id]: https://www.google.com.tw/images/branding/googlelogo/2x/googlelogo_color_120x44dp.png  "Optional title attribute"

## 對齊測試
一二三四五六七八九十|一二三四五六七八九十|一二三四五六七八九十|<br>
Inconsolata is my fi|rst serious original| font release. It is|

# 擴充語法

## li table

- table
  - tr
    - th
      - 1
    - th
      - 2
  - tr
    - td
      - 3
    - td
      - 4