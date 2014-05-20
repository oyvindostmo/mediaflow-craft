# Mediaflow plugin for Craft
Craft CMS Keyteq Mediaflow plugin. Read more [Visit Mediaflow!](http://getmediaflow.com)

## Install
```
composer require mediaflow/mediaflow-craft:dev-master
```

Modify your `public/index.php` to autoload depdendencies by adding this as the second to last line:

```php
require __DIR__ . '/../vendor/autoload.php';
```

## Example of usage

### Generating a media preview URL

```smarty
<img src="{{entry.mediaflowField.url({width: 100,height: 100}) }}" />
```

### Example with Foundation Interchange
```smarty
{% set media = entry.mediaflowField %}
<img data-interchange="
    [{{ media.url({width:width,height:height,quality:90}) }}, (default)],
    [{{ media.url({width:width,height:height,quality:90}) }}, (large)]
">
<noscript>
    <img src="{{entry.mediaflowField.getCroppedImage(width,height,[quality]}}">
</noscript>
```

### Using Picturefill.js
```
```
