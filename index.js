/**
 * Custom WebView with autoHeight feature
 *
 * @prop source: Same as WebView
 * @prop autoHeight: true|false
 * @prop defaultHeight: 100
 * @prop width: device Width
 * @prop ...props
 *
 * @author Elton Jain
 * @version v1.0.2
 */

import React, { Component } from 'react';
import {
  View,
  Dimensions,
  Platform,
} from 'react-native';
import { WebView } from 'react-native-webview';


const injectedScript = function() {
  function postSize() {
    //https://stackoverflow.com/questions/1145850/how-to-get-height-of-entire-document-with-javascript
    var body = document.body, html = document.documentElement;

    var maxHeight = Math.max( body.scrollHeight, body.offsetHeight,
                        html.clientHeight, html.scrollHeight, html.offsetHeight );

    console.log('postSize maxHeight', maxHeight)
    window.ReactNativeWebView.postMessage(maxHeight);
  }

  var postSizeTimeout;
  function debouncedPostSize() {
    clearTimeout(postSizeTimeout);
    postSizeTimeout = setTimeout(function () {
      postSize()
    }, 500)
  }

  debouncedPostSize();
  //trigger when DOM changes
  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
  var observer = new MutationObserver(debouncedPostSize);
    observer.observe(document, {
    subtree: true,
    attributes: true
  });
};

export default class MyWebView extends Component {
  state = {
    webViewHeight: Number
  };

  static defaultProps = {
      autoHeight: true,
  }

  constructor (props: Object) {
    super(props);
    this.state = {
      webViewHeight: this.props.defaultHeight
    }

    this._onMessage = this._onMessage.bind(this);
  }

  _onMessage(e) {
    this.setState({
      webViewHeight: parseInt(e.nativeEvent.data)
    });
  }

  stopLoading() {
    this.webview.stopLoading();
  }

  reload() {
    this.webview.reload();
  }

  render () {
    const _w = this.props.width || Dimensions.get('window').width;
    const _h = this.props.autoHeight ? this.state.webViewHeight : this.props.defaultHeight;
    const injectedJavaScript = '(' + String(injectedScript) + ')();';

    return (
      <WebView
        ref={(ref) => { this.webview = ref; }}
        injectedJavaScript={injectedJavaScript}
        scrollEnabled={this.props.scrollEnabled || false}
        onMessage={this._onMessage}
        javaScriptEnabled={true}
        automaticallyAdjustContentInsets={true}
        {...this.props}
        style={[{width: _w}, this.props.style, {height: _h}]}
      />
    )
  }
}
