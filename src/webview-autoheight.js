/**
 * Custom WebView with autoHeight feature
 * Also allows to add CSS and javascript if required
 *
 * @prop source: Same as WebView
 * @prop autoHeight: true|false
 * @prop defaultHeight: 100
 * @prop width: device Width
 * @prop webviewStyle: Object
 * @prop ...props
 *
 * @author Elton Jain
 */

import React, { Component } from 'react';
import {
  Dimensions,
  WebView,
} from 'react-native';

export default class MyWebView extends Component {
  state = {
    webViewHeight: Number
  };

  constructor (props: Object) {
    super(props);
    this.state = {
      webViewHeight: this.props.defaultHeight
    }
  }
  _updateWebViewHeight = (e) => {
    this.setState({
      webViewHeight: parseInt(e.jsEvaluationValue)
    });
  }

  render () {
    return (
      <WebView
        injectedJavaScript="document.body.scrollHeight;"
        scrollEnabled={false}
        onNavigationStateChange={this._updateWebViewHeight}
        automaticallyAdjustContentInsets={true}
        style={[{width: this.props.width || Dimensions.get('window').width}, this.props.webviewStyle, {height: this.props.autoHeight ? this.state.webViewHeight : this.props.defaultHeight}]}
        {...this.props}
      />
    )
  }
}
