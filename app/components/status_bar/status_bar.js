// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
// @flow

import React, {PureComponent} from 'react';
import {
    Platform,
    StatusBar as NativeStatusBar,
} from 'react-native';
import tinyColor from 'tinycolor2';

type Props = {|
    theme: Object,
    headerColor?: string,
|};

export default class StatusBar extends PureComponent<Props> {
    render() {
        const {theme} = this.props;
        let headerColor = tinyColor(theme.sidebarHeaderBg);
        if (this.props.headerColor) {
            headerColor = tinyColor(this.props.headerColor);
        }
        let barStyle = 'light-content';
        if (headerColor.isLight() && Platform.OS === 'ios') {
            barStyle = 'dark-content';
        }

        return <NativeStatusBar barStyle={barStyle}/>;
    }
}
