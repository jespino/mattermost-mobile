import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {injectIntl, intlShape} from 'react-intl';
import {
    Platform,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';

import {changeOpacity} from 'app/utils/theme';

class AttachmentButton extends PureComponent {
    static propTypes = {
        blurTextBox: PropTypes.func.isRequired,
        intl: intlShape.isRequired,
        navigator: PropTypes.object.isRequired,
        theme: PropTypes.object.isRequired,
        uploadFiles: PropTypes.func.isRequired
    };

    attachFileFromCamera = () => {
        const {formatMessage} = this.props.intl;
        const options = {
            quality: 0.7,
            noData: true,
            storageOptions: {
                cameraRoll: true,
                waitUntilSaved: true
            },
            permissionDenied: {
                title: formatMessage({
                    id: 'mobile.android.camera_permission_denied_title',
                    defaultMessage: 'Camera access is required'
                }),
                text: formatMessage({
                    id: 'mobile.android.camera_permission_denied_description',
                    defaultMessage: 'To take photos and videos with your camera, please change your permission settings.'
                }),
                reTryTitle: formatMessage({
                    id: 'mobile.android.permission_denied_retry',
                    defaultMessage: 'Set Permission'
                }),
                okTitle: formatMessage({id: 'mobile.android.permission_denied_dismiss', defaultMessage: 'Dismiss'})
            }
        };

        ImagePicker.launchCamera(options, (response) => {
            if (response.error || response.didCancel) {
                return;
            }

            this.uploadFiles([response]);
        });
    };

    attachFileFromLibrary = () => {
        const {formatMessage} = this.props.intl;
        const options = {
            quality: 0.7,
            noData: true,
            permissionDenied: {
                title: formatMessage({
                    id: 'mobile.android.photos_permission_denied_title',
                    defaultMessage: 'Photo library access is required'
                }),
                text: formatMessage({
                    id: 'mobile.android.photos_permission_denied_description',
                    defaultMessage: 'To upload images from your library, please change your permission settings.'
                }),
                reTryTitle: formatMessage({
                    id: 'mobile.android.permission_denied_retry',
                    defaultMessage: 'Set Permission'
                }),
                okTitle: formatMessage({id: 'mobile.android.permission_denied_dismiss', defaultMessage: 'Dismiss'})
            }
        };

        if (Platform.OS === 'ios') {
            options.mediaType = 'mixed';
        }

        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.error || response.didCancel) {
                return;
            }

            this.uploadFiles([response]);
        });
    };

    attachVideoFromLibraryAndroid = () => {
        const {formatMessage} = this.props.intl;
        const options = {
            quality: 0.7,
            mediaType: 'video',
            noData: true,
            permissionDenied: {
                title: formatMessage({
                    id: 'mobile.android.videos_permission_denied_title',
                    defaultMessage: 'Video library access is required'
                }),
                text: formatMessage({
                    id: 'mobile.android.videos_permission_denied_description',
                    defaultMessage: 'To upload videos from your library, please change your permission settings.'
                }),
                reTryTitle: formatMessage({
                    id: 'mobile.android.permission_denied_retry',
                    defaultMessage: 'Set Permission'
                }),
                okTitle: formatMessage({id: 'mobile.android.permission_denied_dismiss', defaultMessage: 'Dismiss'})
            }
        };

        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.error || response.didCancel) {
                return;
            }

            this.uploadFiles([response]);
        });
    };

    uploadFiles = (images) => {
        this.props.uploadFiles(images);
    };

    handleFileAttachmentOption = (action) => {
        this.props.navigator.dismissModal({
            animationType: 'none'
        });

        // Have to wait to launch the library attachment action.
        // If we call the action after dismissModal with no delay then the
        // Wix navigator will dismiss the library attachment modal as well.
        setTimeout(() => {
            if (typeof action === 'function') {
                action();
            }
        }, 100);
    }

    showFileAttachmentOptions = () => {
        this.props.blurTextBox();
        const options = {
            items: [{
                action: () => this.handleFileAttachmentOption(this.attachFileFromCamera),
                text: {
                    id: 'mobile.file_upload.camera',
                    defaultMessage: 'Take Photo or Video'
                },
                icon: 'camera'
            }, {
                action: () => this.handleFileAttachmentOption(this.attachFileFromLibrary),
                text: {
                    id: 'mobile.file_upload.library',
                    defaultMessage: 'Photo Library'
                },
                icon: 'photo'
            }]
        };

        if (Platform.OS === 'android') {
            options.items.push({
                action: () => this.handleFileAttachmentOption(this.attachVideoFromLibraryAndroid),
                text: {
                    id: 'mobile.file_upload.video',
                    defaultMessage: 'Video Library'
                },
                icon: 'file-video-o'
            });
        }

        this.props.navigator.showModal({
            screen: 'OptionsModal',
            title: '',
            animationType: 'none',
            passProps: {
                items: options.items
            },
            navigatorStyle: {
                navBarHidden: true,
                statusBarHidden: false,
                statusBarHideWithNavBar: false,
                screenBackgroundColor: 'transparent',
                modalPresentationStyle: 'overCurrentContext'
            }
        });
    };

    render() {
        const {theme} = this.props;

        return (
            <TouchableOpacity
                onPress={this.showFileAttachmentOptions}
                style={style.buttonContainer}
            >
                <Icon
                    size={30}
                    style={style.attachIcon}
                    color={changeOpacity(theme.centerChannelColor, 0.9)}
                    name='md-add'
                />
            </TouchableOpacity>
        );
    }
}

const style = StyleSheet.create({
    attachIcon: {
        marginTop: Platform.select({
            ios: 2,
            android: 0
        })
    },
    buttonContainer: {
        height: Platform.select({
            ios: 34,
            android: 36
        }),
        width: 45,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default injectIntl(AttachmentButton);
