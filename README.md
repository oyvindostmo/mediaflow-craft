# Mediaflow plugin for Craft
Craft CMS Keyteq Mediaflow plugin. Read more [Visit Mediaflow!](http://getmediaflow.com)

## Install
Download it and install in the plugins folder of Craft. 

## Example of usage

### Generating a media preview URL

```twig
<img src="{{entry.mediaflowField.url({width: 100,height: 100}) }}" />
```

### Example with Foundation Interchange
```twig
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
