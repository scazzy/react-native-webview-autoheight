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
  WebView,
  Platform,
} from 'react-native';

//https://github.com/facebook/react-native/issues/10865
const patchPostMessageFunction = function() {
  var originalPostMessage = window.postMessage;

  var patchedPostMessage = function(message, targetOrigin, transfer) {
    originalPostMessage(message, targetOrigin, transfer);
  };

  patchedPostMessage.toString = function() {
    return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
  };

  window.postMessage = patchedPostMessage;
};

const injectedScript = function() {

  function postSize() {
    //https://stackoverflow.com/questions/1145850/how-to-get-height-of-entire-document-with-javascript
    var body = document.body, html = document.documentElement;

    var maxHeight = Math.max( body.scrollHeight, body.offsetHeight,
                        html.clientHeight, html.scrollHeight, html.offsetHeight );

    window.postMessage(maxHeight);
  }

  function waitForBridge() {
    if (window.postMessage.length !== 1){
      setTimeout(waitForBridge, 200);
    }
    else {
      postSize();

      //trigger when DOM changes
      var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
      var observer = new MutationObserver(postSize);
        observer.observe(document, {
        subtree: true,
        attributes: true
      });
    }
  }

  waitForBridge();
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
    const patchPostMessageJsCode = '(' + String(patchPostMessageFunction) + ')();';
    const androidScript = patchPostMessageJsCode + '(' + String(injectedScript) + ')();';
    const iosScript = '(' + String(injectedScript) + ')();' + patchPostMessageJsCode;

    return (
      <WebView
        ref={(ref) => { this.webview = ref; }}
        injectedJavaScript={Platform.OS === 'ios' ? iosScript : androidScript}
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
