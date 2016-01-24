# JAccordion

Distributable accordion class using GSAP


##Requirements:
JAccordion has a requirement for the following 3 tools:
+ JQuery
+ GSAP TweenLite
+ CSSPlugin (as part of GSAP TweenLite

You can use the following CDN links:  
http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js  
http://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.0/TweenLite.min.js  
http://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.0/plugins/CSSPlugin.min.js  



##Usage
Add the JAccordion.js, and create a new JAccordion object:

```javascript
jAcc = new JAccordion(items, titles, contentContainers, autoClose)
```
where
```javascript
items, titles, and contentContainers
```
are query strings for their corresponding classes in html, as per the below:


```html
<div class="accordion">
  <div class="item">
      <div class="title">
          This is the title, which will persist and is clickable
      </div>
      <div class="content-container">
          This is the long content we wish to expand/contract
      </div>
  </div>
  <!-- further items -->
</div>
```
and
```javascript
autoClose
```
is a boolean value which will enable the automatic shrinkage of one section upon the openning of the other. Really this is what makes it an 'Accordion', and it default to 'true', but this functionality can be turned off
