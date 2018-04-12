declare module "react-native-webview-autoheight" {
    import {Component} from "react";
    import {TextStyle, ViewStyle, WebViewProperties} from "react-native";

    export interface IMyWebViewProps extends WebViewProperties {
        /**
         * Enable or disable auto height
         * Note: Default true
         */
        autoHeight?: boolean;
        /**
         * Sets width of WebView
         * Note: Default Screen width
         */
        width?: number;
        /**
         * Sets default height of the component
         * Note: Default height unless autoHeight
         */
        defaultHeight?: number;
    }

    export default class MyWebView extends Component<IMyWebViewProps> {
    }
}
