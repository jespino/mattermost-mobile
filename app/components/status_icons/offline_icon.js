// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
// @flow

import React, {PureComponent} from 'react';
import {View} from 'react-native';
import Svg, {
    Path,
} from 'react-native-svg';

type Props = {|
    width: number,
    height: number,
    color: string,
|}

export default class OfflineIcon extends PureComponent<Props> {
    render() {
        const {color, height, width} = this.props;
        return (
            <View style={{height, width, alignItems: 'flex-start'}}>
                <Svg
                    width={width}
                    height={height}
                    viewBox='0 0 20 20'
                >
                    <Path
                        d='M10,0c5.519,0 10,4.481 10,10c0,5.519 -4.481,10 -10,10c-5.519,0 -10,-4.481 -10,-10c0,-5.519 4.481,-10 10,-10Zm0,2c4.415,0 8,3.585 8,8c0,4.415 -3.585,8 -8,8c-4.415,0 -8,-3.585 -8,-8c0,-4.415 3.585,-8 8,-8Z'
                        fill={color}
                        fillOpacity={0.5}
                        fillRule='evenodd'
                    />
                </Svg>
            </View>
        );
    }
}
