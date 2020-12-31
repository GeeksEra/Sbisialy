import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Modal, ActionSheetIOS, I18nManager } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from '../../../../actions/Actions';
import { theme } from "../../../../core/theme";
import { moderateScale } from 'react-native-size-matters';
import { TextAnimationShake } from 'react-native-text-effects';
import { BASE_API_URL_IMAEG_ORIGINAL, FONT_FAMILY } from '../../../../services/config';
import Icon from "react-native-vector-icons/FontAwesome";
import { Text } from '../../../../components/widget';
import * as ImagePicker from 'react-native-image-picker';
import * as Apis from '../../../../services/Apis';
import { showSuccessPopup, translate } from '../../../../utils/utils';
import { Input } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Video from 'react-native-video';
import Loader from '../../../../components/widget/loader';



class CeleberatyHeader extends Component {



    constructor(props) {
        super(props);
        this.state = {
            options: false,isLoading:false
        }
        this.inputRefs = {
        };
    }



    handlePress(props) {
        let options = props.options;


        let destructiveIndex = -1;
        if (
            Number.isInteger(props.destructiveIndex) &&
            props.destructiveIndex >= 0
        ) {
            destructiveIndex = props.destructiveIndex;
        }
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: options,
                destructiveButtonIndex: destructiveIndex,
                cancelButtonIndex: options.length - 1
            },
            buttonIndex => {


                console.log(buttonIndex)

                if (buttonIndex === 0 && props.image) {
                    ImagePicker.launchImageLibrary(
                        {
                            mediaType: 'photo',
                            includeBase64: false,
                            maxHeight: 200,
                            maxWidth: 200,
                        },
                        (response) => {
                            this.uplaodfile(response, 'image');
                        },
                    )
                }


                if (buttonIndex === 1 && props.image) {
                    ImagePicker.launchCamera(
                        {
                            mediaType: 'photo',
                            includeBase64: false,
                            maxHeight: 200,
                            maxWidth: 200,
                        },
                        (response) => {
                            this.uplaodfile(response, 'image');
                        },
                    )
                }





                if (buttonIndex === 0 && props.video) {
                    ImagePicker.launchImageLibrary(
                        {
                            mediaType: 'video',
                        },
                        (response) => {
                            this.uplaodfile(response, 'image');
                        },
                    )
                }


                if (buttonIndex === 1 && props.video) {
                    ImagePicker.launchCamera(
                        {
                            mediaType: 'video',
                        },
                        (response) => {
                            this.uplaodfile(response, 'image');
                        },
                    )
                }


            }
        );
    };

    uplaodfile(response) {
        this.setState({ uplaodfile: true, uplaodfileresponse: response })
    }

    createImageOrVideo(url, data) {
        this.setState({ uplaodfile: false, isLoading: true })
        Apis.Post(url, data).then((data) => {
            setTimeout(() => {
                showSuccessPopup('Thanks for uplaoding content.', 'Success!');
                setTimeout(() => {
                    this.props.navigation.navigate('CeleberateDetails', { item: this.props.data.userInfo })
                }, 500);
                this.setState({ isLoading: false })
            }, 2000);
        }).catch((error) => {
            console.log(error);
            this.setState({ isLoading: false })
        })
    }






    render() {

        return (
            <View style={{ width: '100%', flexDirection: 'row' }}>
                {this.props.data.userInfo.email && this.props.data.userInfo.role !== 'user' &&

                    <View style={{ width: '100%', backgroundColor: theme.colors.gray07, height: moderateScale(90), justifyContent: 'center', flexDirection: 'row', alignItems: 'center', alignContent: 'center', paddingHorizontal: moderateScale(10), paddingTop: moderateScale(20), marginTop: moderateScale(-25) }}>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('CeleberateDetails', { item: this.props.data.userInfo }) }}>
                            <Image source={{ uri: (BASE_API_URL_IMAEG_ORIGINAL + (this.props.data.userInfo.cover_image)) }} resizeMode={"cover"} style={{
                                height: moderateScale(55), width: moderateScale(55), borderRadius: moderateScale(60),
                            }} />
                        </TouchableOpacity>


                        <View style={{ flex: 1, marginHorizontal: moderateScale(10), justifyContent: 'center', flexDirection: 'row', alignItems: 'center', alignContent: 'center', }}>
                            <TextAnimationShake value={this.props.data.userInfo.first_name + ' ' + this.props.data.userInfo.last_name} delay={100} duration={1000} fontSize={moderateScale(1)} style={{
                                color: theme.colors.secondary,
                                fontSize: moderateScale(25),
                                textAlign: 'center',
                                fontFamily: FONT_FAMILY, letterSpacing: 0.1
                            }} />
                        </View>



                        <TouchableOpacity onPress={() => { this.setState({ options: true }) }} style={{
                            width: moderateScale(55),
                            height: moderateScale(55), backgroundColor: theme.colors.secondary, borderRadius: moderateScale(50), marginHorizontal: moderateScale(10), justifyContent: 'center', alignItems: 'center'
                        }}>


                            <Image source={require('app/assets/assets/options.png')} resizeMode={"contain"} style={{
                                height: moderateScale(25), width: moderateScale(25), tintColor: theme.colors.white, transform: [{ rotate: '90 deg' }],
                            }} />


                        </TouchableOpacity>

                    </View>
                }

                <Loader isLoading={this.state.isLoading} />

                {this.state.options &&
                    <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: "center", }}>
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={this.state.options}
                            onRequestClose={() => {
                                this.setState({ options: false })
                            }}
                            onDismiss={() => {
                                this.setState({ options: false })
                            }}>


                            <View style={{
                                flex: 1,
                                alignItems: 'center',
                                flexDirection: 'column',
                                justifyContent: 'space-around',
                                backgroundColor: theme.colors.gray03 + '70'
                            }}>



                                <TouchableOpacity onPress={() => {
                                    this.setState({ options: false });
                                }}
                                    style={{ flex: 1, height: '100%', width: '90%', flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginHorizontal: moderateScale(30) }}>
                                    <TouchableOpacity onPress={() => {
                                        this.setState({ options: false });
                                        setTimeout(() => {
                                            this.handlePress({ options: ["Select video", "Take video", "Cancel"], destructiveIndex: 2, video: true })
                                        }, (100));
                                    }} style={{ width: moderateScale(80), height: moderateScale(80), backgroundColor: theme.colors.black, borderRadius: moderateScale(50), marginHorizontal: moderateScale(10), justifyContent: 'center', alignItems: 'center' }}>


                                        <Icon
                                            name="gift"
                                            size={moderateScale(30)}
                                            color={theme.colors.white}
                                        />
                                        <Text style={{
                                            color: theme.colors.white,
                                            fontSize: moderateScale(10), textAlign: 'center', textTransform: 'capitalize', fontWeight: 'bold', marginTop: moderateScale(8)
                                        }}>{'Gift Video'}</Text>

                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => {
                                        this.setState({ options: false }); setTimeout(() => {
                                            this.handlePress({ options: ["Select video", "Take video", "Cancel"], destructiveIndex: 2, video: true })
                                        }, 100);
                                    }} style={{ width: moderateScale(80), height: moderateScale(80), backgroundColor: '#988E8C', borderRadius: moderateScale(50), marginHorizontal: moderateScale(10), justifyContent: 'center', alignItems: 'center' }}>


                                        <Icon
                                            name="image"
                                            size={moderateScale(28)}
                                            color={theme.colors.white}
                                        />
                                        <Text style={{
                                            color: theme.colors.white,
                                            fontSize: moderateScale(10), textAlign: 'center', textTransform: 'capitalize', fontWeight: 'bold', marginTop: moderateScale(8)
                                        }}>{'Image'}</Text>


                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => {
                                        this.setState({ options: false });
                                        setTimeout(() => {
                                            this.handlePress({ options: ["Select image", "Take image", "Cancel"], destructiveIndex: 2, image: true })
                                        }, 100);
                                    }} style={{ width: moderateScale(80), height: moderateScale(80), backgroundColor: theme.colors.white, borderRadius: moderateScale(50), marginHorizontal: moderateScale(10), justifyContent: 'center', alignItems: 'center' }}>


                                        <Icon
                                            name="play"
                                            size={moderateScale(28)}
                                            color={theme.colors.primary}
                                        />
                                        <Text style={{
                                            color: theme.colors.secondary,
                                            fontSize: moderateScale(10), textAlign: 'center', textTransform: 'capitalize', fontWeight: 'bold', marginTop: moderateScale(8)
                                        }}>{'Video'}</Text>

                                    </TouchableOpacity>
                                </TouchableOpacity>

                            </View>
                        </Modal>
                    </View>
                }




                {this.state.uplaodfile &&
                    <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: "center" }}>
                        <Modal
                            animationType="slide"
                            visible={this.state.uplaodfile}
                            onRequestClose={() => {
                                this.setState({ uplaodfile: false })
                            }}
                            onDismiss={() => {
                                this.setState({ uplaodfile: false })
                            }}>
                            <View
                                activeOpacity={1}
                                onPressOut={(e) => {
                                    if (e.nativeEvent.locationY < 0) {
                                        this.setState({ uplaodfile: false });
                                    }
                                }}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}>
                                <KeyboardAwareScrollView style={{
                                    flex: 1,
                                    height: '100%',
                                    backgroundColor: "white",
                                }}>
                                    <View style={{
                                        marginTop: moderateScale(50),
                                        borderRadius: 20, marginHorizontal: moderateScale(20)
                                    }}>



                                        <Text style={{
                                            fontSize: moderateScale(25),
                                            color: theme.colors.secondary,
                                            width: '100%', alignSelf: 'center', marginVertical: moderateScale(20), marginTop: moderateScale(20), ...I18nManager.isRTL ? { textAlign: 'left' } : {},
                                        }}>{translate('Upload').toUpperCase()}</Text>

                                        <View style={{ width: '100%', height: moderateScale(200), borderColor: theme.colors.secondary, borderWidth: moderateScale(0.5), borderRadius: moderateScale(20), justifyContent: 'center', alignItems: 'center' }}>

                                            {this.state.uplaodfileresponse && this.state.uplaodfileresponse.type === 'image/jpg' &&
                                                <Image resizeMode="contain"
                                                    style={{
                                                        height: '80%', width: '80%', alignSelf: 'center'
                                                    }}
                                                    source={{ uri: this.state.uplaodfileresponse?.uri }}
                                                />

                                            }

                                            {this.state.uplaodfileresponse && this.state.uplaodfileresponse.type !== 'image/jpg' &&
                                                <Video
                                                    paused
                                                    posterResizeMode={'stretch'}
                                                    resizeMode={'cover'}
                                                    source={{ uri: this.state.uplaodfileresponse?.uri }}
                                                    ref={player => { this.player = player }}
                                                    onError={(error) => {
                                                        console.log('video error', error)
                                                    }}
                                                    onLoad={() => {
                                                        if (this.player)
                                                            this.player.seek(1);
                                                    }}
                                                    posterResizeMode='stretch'
                                                    style={{
                                                        height: '80%', width: '80%', alignSelf: 'center', backgroundColor: theme.colors.black, borderRadius: moderateScale(10), zIndex: 10,
                                                    }} />

                                            }

                                        </View>


                                        <Text style={{ color: theme.colors.gray04, marginTop: moderateScale(10), fontSize: moderateScale(15), paddingHorizontal: moderateScale(10), width: '100%', ...I18nManager.isRTL ? { textAlign: 'left' } : {}, }}>{translate('Title')}</Text>
                                        <Input
                                            autoFocus
                                            labelStyle={{ color: theme.colors.secondary }}
                                            defaultValue={this.state.last_name}
                                            containerStyle={{ paddingLeft: 0, paddingRight: 0 }}
                                            inputContainerStyle={{
                                                width: '100%', height: moderateScale(45),
                                                ...I18nManager.isRTL ? { paddingHorizontal: moderateScale(10) } : { paddingHorizontal: moderateScale(10) }, borderBottomWidth: 0, backgroundColor: theme.colors.gray01, marginTop: moderateScale(5), borderRadius: moderateScale(10)
                                            }}
                                            inputStyle={{ textAlignVertical: 'center', height: '100%', ...I18nManager.isRTL ? { textAlign: 'right' } : {}, fontFamily: FONT_FAMILY }}
                                            ref={(input) => { if (input) { this.inputRefs.old_password = input; } }}
                                            onSubmitEditing={() => { this.inputRefs.new_password.focus() }}
                                            returnKeyType="next"
                                            placeholderTextColor={theme.colors.gray02}
                                            placeholder="Title"
                                            value={this.state.title}
                                            onChangeText={(value) => this.setState({ title: value })}
                                        />


                                        <Text style={{ color: theme.colors.gray04, marginTop: moderateScale(10), fontSize: moderateScale(15), paddingHorizontal: moderateScale(10), width: '100%', ...I18nManager.isRTL ? { textAlign: 'left' } : {}, }}>{translate('Description')}</Text>
                                        <Input
                                            labelStyle={{ color: theme.colors.secondary }}
                                            defaultValue={this.state.last_name}
                                            containerStyle={{ paddingLeft: 0, paddingRight: 0 }}
                                            inputContainerStyle={{
                                                width: '100%', height: moderateScale(145),
                                                ...I18nManager.isRTL ? { paddingHorizontal: moderateScale(10) } : { paddingHorizontal: moderateScale(10) }, borderBottomWidth: 0, backgroundColor: theme.colors.gray01, marginTop: moderateScale(5), borderRadius: moderateScale(10), padding: moderateScale(10),
                                            }}
                                            inputStyle={{ textAlignVertical: 'center', height: '100%', ...I18nManager.isRTL ? { textAlign: 'right' } : {}, fontFamily: FONT_FAMILY }}
                                            ref={(input) => { if (input) { this.inputRefs.new_password = input; } }}
                                            onSubmitEditing={() => { }}
                                            returnKeyType="done"
                                            placeholderTextColor={theme.colors.gray02}
                                            multiline={true}
                                            placeholder="Description"
                                            value={this.state.description}
                                            onChangeText={(value) => this.setState({ description: value })}
                                        />




                                        <View style={{
                                            borderColor: theme.colors.primary, marginTop: moderateScale(45),
                                            borderRadius: moderateScale(10), borderWidth: moderateScale(0), height: moderateScale(40), width: '100%', backgroundColor: theme.colors.secondary, bottom: moderateScale(10),
                                            opacity: (this.state.description === '' || this.state.title === '') ? .4 : 1
                                        }}>
                                            <TouchableOpacity onPress={() => {


                                                if ((this.state.description === '' || this.state.title === '')) {
                                                    return;
                                                }

                                                if (this.state.uplaodfileresponse.type !== 'image/jpg') {
                                                    var data = new FormData();
                                                    var photo = {
                                                        uri: this.state.uplaodfileresponse.uri,
                                                        type: this.state.uplaodfileresponse.type,
                                                        name: 'uplaod.' + String(this.state.uplaodfileresponse.uri).split('/')[String(this.state.uplaodfileresponse.uri).split('/').length - 1],
                                                    };
                                                    data.append('video', photo);
                                                    this.setState({ isLoading: true })
                                                    Apis.Post('file/mp4', data).then((data) => {
                                                        console.log(data);


                                                        var video = {};
                                                        video.description = this.state.description;
                                                        video.title = this.state.title;
                                                        video.isPrivate = false;
                                                        video.url = data.url;
                                                        this.createImageOrVideo('users/video', video)
                                                    }).catch((error) => {
                                                        console.log(error);
                                                        this.setState({ isLoading: false })
                                                    })
                                                } else {
                                                    var data = new FormData();
                                                    var photo = {
                                                        uri: this.state.uplaodfileresponse.uri,
                                                        type: this.state.uplaodfileresponse.type,
                                                        name: 'uplaod.' + String(this.state.uplaodfileresponse.uri).split('/')[String(this.state.uplaodfileresponse.uri).split('/').length - 1],
                                                    };
                                                    data.append('file', photo);
                                                    this.setState({ isLoading: true })
                                                    Apis.Post('file/image', data).then((data) => {
                                                        console.log(data);


                                                        var image = {};
                                                        image.description = this.state.description;
                                                        image.isPrivate = false;
                                                        image.title = this.state.title;
                                                        image.url = data.originalname;

                                                        this.createImageOrVideo('users/image', image)



                                                    }).catch((error) => {
                                                        console.log(error);
                                                        this.setState({ isLoading: false })
                                                    })
                                                }




                                            }} style={{ width: '100%', height: "100%", alignSelf: 'center', alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
                                                <Text style={{ fontSize: moderateScale(16), color: theme.colors.white, fontFamily: FONT_FAMILY, fontWeight: 'bold' }}>{translate('Upload').toUpperCase()}</Text>
                                            </TouchableOpacity>
                                        </View>


                                    </View>
                                </KeyboardAwareScrollView>
                            </View>
                        </Modal>
                    </View>
                }

            </View>

        );
    }

}

const mapStateToProps = (state) => ({
    data: {
        cart: state.app.cart,
        userInfo: state.login.userInfo,
    },
})
const mapDispatchToProps = (dispatch) => ({
    actions: {
        product: bindActionCreators(loginActions, dispatch)
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(CeleberatyHeader))


