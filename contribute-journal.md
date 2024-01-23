---
layout: main
title: Submit a Journal Layout — Pouch Cafe
stylesheet: /css/contribution-form.css
script: /js/journal.js
---

<div class="page">

# Submit your journal layout

<img src="/images/contribute-layout.png">

Would you like to be part of the first issue of _Pouch_?
I'd love to include your work!

**Use the form below to send me a picture of a journal layout or planner layout that you made yourself, and it will be included in the layout gallery for Pouch issue #1!**

<ul>
  <li><em>Deadline: March 18, 2024</em>
  <li>All journal layouts will be displayed on the pouch.cafe website, and some will be published in the magazine. (I'll include as many as I can in the magazine, space permitting!)
  <li>All contributors will receive a free digital download of Pouch issue #1.
  <li> <em>Pouch</em> is an all ages magazine, so please keep contributions suitable for any age 💖
</ul>


**Trouble submitting? Other questions?** Send an email to <code>hello@pouch.cafe</code>!

---

<form id="journalsubmit">

### 1. Enter your name

_This **will** be published alongside your submission. A fake name or nickname is OK!_

<input id="name" type="text" name="name" value="" placeholder="Name" required minlength="1"/>
<span class="error"></span>

### 2. Enter your email

_This **will NOT** be published on the website or magazine._

<input id="email" type="email" name="email" value="" placeholder="Email" required/>
<span class="error"></span>

### 3. Upload a photo of your journal layout

Take a photo of the spread from top-down, or use a scanner to scan in your layout.

Please send a high resolution photo if possible. _(Max file size: 5 MB)_

<details class="inline">
  <summary>Example photo</summary>
  <img src="/images/sample-journal-photo.jpg"/>
</details>


<label id="upload-photo" taborder="0">
  <img src="/images/add.png"  class="plus"/>
  Click to select a photo
  <input type="file" accept="image/*" required id="journal-img-input"/>
</label>
<span class="error"></span>

<div id="canvas-house">
  <canvas id="preview-journal" height=0 width=0></canvas>
  <input type="button" id="reset-photo" value="✖️ Remove photo" hidden></button>
</div>

### 4. Tell us about your journal layout! _(optional)_

- For example, you could talk about what you were journaling about, or focus more on the design of the layout, or talk about your love of stationery in general.
- What stationery products did you use? The readers would love to know!

<textarea id="layout-description"></textarea>

### 5. Social media or websites _(optional)_

Let us know if you have social media accounts or websites that you'd like to promote, and we'll publish it next to your journal layout!

<textarea id="social-media"></textarea>

### 6. Submit!

<input type="submit" />

<div id="submitting" hidden>
  <img src="/images/loading-spinner.gif" height="40" width="40"> Submitting form...
</div>

<div id="submitting-error" class="error" hidden>
</div>

</form>

</div>