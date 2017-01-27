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
} from 'react-native';

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
  }
  _updateWebViewHeight = (e) => {
    this.setState({
      webViewHeight: parseInt(e.jsEvaluationValue)
    });
  }

  render () {
    const _w = this.props.width || Dimensions.get('window').width;
    const _h = this.props.autoHeight ? this.state.webViewHeight : this.props.defaultHeight;
    
    return (
      <WebView
        injectedJavaScript="document.body.scrollHeight;"
        scrollEnabled={this.props.scrollEnabled || false}
        onNavigationStateChange={this._updateWebViewHeight}
        automaticallyAdjustContentInsets={true}
        {...this.props}
        style={[{width: _w}, this.props.style, {height: _h}]}
      />
    )
  }
}
