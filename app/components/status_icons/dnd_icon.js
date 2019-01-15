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

export default class DndIcon extends PureComponent<Props> {
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
                        d='M10,0c5.519,0 10,4.481 10,10c0,5.519 -4.481,10 -10,10c-5.519,0 -10,-4.481 -10,-10c0,-5.519 4.481,-10 10,-10Zm5.25,8.5l-10.5,0c-0.414,0 -0.75,0.336 -0.75,0.75l0,1.5c0,0.414 0.336,0.75 0.75,0.75l10.5,0c0.414,0 0.75,-0.336 0.75,-0.75l0,-1.5c0,-0.414 -0.336,-0.75 -0.75,-0.75Z'
                        fill={color}
                        fillRule='evenodd'
                    />
                </Svg>
            </View>
        );
    }
}
