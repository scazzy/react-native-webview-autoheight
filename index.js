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
import {View, Dimensions, WebView, StyleSheet} from 'react-native';

const injectedScript = function() {
    function waitForBridge() {
        if (window.postMessage.length != 1) {
            setTimeout(waitForBridge, 200);
        } else {
            let height = 0;
            if(document.documentElement.clientHeight>document.body.clientHeight) {
                height = document.documentElement.clientHeight;
            }
            else {
                height = document.body.clientHeight;
            }
            postMessage(height);
        }
    }
    waitForBridge();
};

const windowWidth = Dimensions.get('window').width

export default class MyWebView extends Component {
    webView;
    setWebViewRef = (ref) => this.webView = ref;

    state = {
        webViewHeight: Number
    };

    static defaultProps = {
        autoHeight: true,
    }

    constructor (props: Object) {
        super(props);
        this.state = {
            webViewHeight: defaultHeight
        };

        this._onMessage = this._onMessage.bind(this);
    }

    _onMessage(e) {
        this.setState({
            webViewHeight: parseInt(e.nativeEvent.data)
        });
    }

    getInjectedJavaScript() {
        return '(' + String(injectedScript) + ')();' + 'window.postMessage = String(Object.hasOwnProperty).replace(\'hasOwnProperty\', \'postMessage\');';
    }

    stopLoading() {
        this.webview.stopLoading();
    }

    render () {
        const {width, autoHeight, defaultHeight, style, scrollEnabled, ...props} = this.props;

        const _w = width || windowWidth;
        const _h = autoHeight ? this.state.webViewHeight : defaultHeight;
        
        return (
            <WebView
                ref={this.setWebViewRef}
                injectedJavaScript={this.getInjectedJavaScript()}
                scrollEnabled={scrollEnabled || false}
                onMessage={this._onMessage}
                automaticallyAdjustContentInsets={true}
                {...props}
                style={StyleSheet.flatten([{width: _w}, style, {height: _h}])}
                javaScriptEnabled={true}
            />
        );
    }
}
