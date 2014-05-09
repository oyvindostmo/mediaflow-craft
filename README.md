# Mediaflow plugin for Craft
Craft CMS Keyteq Mediaflow plugin. Read more [Visit Mediaflow!](http://getmediaflow.com)

## Install
Download it and install in the plugins folder of Craft. 

## Example of usage
You can use the Mediaflow plugin 

### Using IMG tag
```
<img src="{{entry.mediaflowField.getCroppedImage(width,height,[quality]}}" />
```

### Using Foundation Interchange
```
<img data-interchange="[{{entry.mediaflowField.getCroppedImage(width,height,[quality]}}, (default)], [{{entry.mediaflowField.getCroppedImage(width,height,[quality]}}, (large)]">
<noscript><img src="{{entry.mediaflowField.getCroppedImage(width,height,[quality]}}"></noscript>
```

### Using Picturefill.js
```

```

## Download
