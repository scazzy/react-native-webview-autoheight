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
  window.ReactNativeWebView.postMessage(
    Math.max(document.documentElement.clientHeight, document.documentElement.scrollHeight, document.body.clientHeight, document.body.scrollHeight)
  )
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
    const androidScript = 'window.postMessage = String(Object.hasOwnProperty).replace(\'hasOwnProperty\', \'postMessage\');' +
    '(' + String(injectedScript) + ')();';
    const iosScript = '(' + String(injectedScript) + ')();' + 'window.postMessage = String(Object.hasOwnProperty).replace(\'hasOwnProperty\', \'postMessage\');';
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
