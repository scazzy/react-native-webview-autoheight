# React Native WebView Autoheight
React Native WebView which sets it's height automatically with minimal efforts.

You can also add custom CSS style or javascript to your webview using below example.



![Downloads](https://nodei.co/npm/react-native-webview-autoheight.png?downloads=true&stars=true)



## Installation
> npm install --save react-native-webview-autoheight

## Usage

```
import MyWebView from 'react-native-webview-autoheight';
const customStyle = "<style>* {max-width: 100%;} body {font-family: sans-serif;} h1 {color: red;}</style>";
const htmlContent = "<h1>This is title</h1><p>Throw your entire HTML here</p>";

<MyWebView
    source={{html: customStyle + htmlContent}}
    startInLoadingState={true}
/>
```

```
<MyWebView
    source={{uri: 'http://example.com/helloworld.html'}}
    startInLoadingState={true}
/>
```


## Props
* Same as https://facebook.github.io/react-native/docs/webview.html#props
* `autoHeight` (default: true)
* `width` (default: Screen width)
* `defaultHeight` (default height unless autoHeight)

## How it works
It is a very simple wrapper around the built-in React Native Webview, which updates the height of the webview based on a state change using `onNavigationStateChange`.


### Feel free to add issues or feature requests

