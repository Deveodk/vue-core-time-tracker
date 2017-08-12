# @deveodk/vue-core-time-tracker

<img style="width:100%" src="https://user-images.githubusercontent.com/7561792/29242224-6b4547ac-7f89-11e7-88d8-c7ba77f11a7c.png">

[![npm](https://img.shields.io/npm/v/@deveodk/vue-core-timetracker.svg)](https://www.npmjs.com/package/@deveodk/vue-core-time-tracker) [![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)
-
> Time tracking plugin for deveo core

## Warnings

This package is highly opinonated and is made to work with deveo core only. 
A requirement for this package is ``` @deveodk/vue-core-authenticator```


## Installation

```js

# NPM
# There are multiple options you can set.

import Vue from 'vue'
import VueCoreTimetracker from '@deveodk/vue-core-timetracker'
Vue.use(VueCoreTimetracker, {
    baseURL: 'base url here',
    axios: 'axios instance here',
    interval: 30000
})
```

```html
<!-- Include after Vue -->
<!-- Local files -->
<link rel="stylesheet" href="vue-core-timetracker/dist/vue-core-timetracker.css"></link>
<script src="vue-core-timetracker/dist/vue-core-timetracker.js"></script>

<!-- From CDN -->
<link rel="stylesheet" href="https://unpkg.com/vue-core-timetracker/dist/vue-core-timetracker.css"></link>
<script src="https://unpkg.com/vue-core-timetracker"></script>
```

## License

[MIT](http://opensource.org/licenses/MIT)

<img style="width:100%" src="https://cloud.githubusercontent.com/assets/7561792/26679305/bc4d7bda-46d4-11e7-9270-3f6cacdd0ae9.png"/>
