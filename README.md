# React Native WebView Autoheight
React Native WebView that sets its height automatically with minimal efforts.

You can also add a custom CSS style or JavaScript to your WebView using below example.



![Downloads](https://nodei.co/npm/react-native-webview-autoheight.png?downloads=true&stars=true)



## Installation

Install the package using yarn or npm:

```yarn add react-native-webview-autoheight``` or  ```npm install --save react-native-webview-autoheight```

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
Uses WebView properties (https://facebook.github.io/react-native/docs/webview.html#props) along with following ones:

 Property                                |                   Type                   | Description                           |
| --------------------------------------- | :-------------------------------------- | :--------------------------------------- |
| `autoHeight`                                | bool (default true)           | Enable or disable auto height             |
| `width`                                |number (default Screen width)           | Sets width of WebView             |
| `defaultHeight`                                |number (default height unless autoHeight)           | Sets default height of the component             |


## How it works
It is a very simple wrapper around the built-in React Native WebView, which updates the height of the WebView based on a state change using `onNavigationStateChange`.


### Feel free to add issues or feature requests

