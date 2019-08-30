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
import PropTypes from "prop-types";

const injectedScript = function() {
  function waitForBridge() {
    if (window.postMessage.length !== 1){
      setTimeout(waitForBridge, 200);
    }
    else {
      postMessage(
        Math.max(document.documentElement.clientHeight, document.documentElement.scrollHeight, document.body.clientHeight, document.body.scrollHeight)
      )
    }
  }
  waitForBridge();
};

export default class MyWebView extends Component {
  state = {
    webViewHeight: Number
  };

  static propTypes = {
    onMessage: PropTypes.func
  };

  static defaultProps = {
    autoHeight: true,
    onMessage: () => {}
  };

  constructor (props: Object) {
    super(props);
    this.state = {
      webViewHeight: this.props.defaultHeight
    }

    this._onMessage = this._onMessage.bind(this);
  }

  _onMessage(e) {
    const { onMessage } = this.props;
    this.setState({
      webViewHeight: parseInt(e.nativeEvent.data)
    });
    onMessage(e);
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
        javaScriptEnabled={true}
        automaticallyAdjustContentInsets={true}
        {...this.props}
	onMessage={this._onMessage}
	style={[{ width: _w }, this.props.style, { height: _h }]}
      />
    )
  }
}
