import React, { Component } from 'react';
import { StyleSheet, View, Image, Share, ActivityIndicator, Dimensions } from 'react-native'
import { theme } from '../../../../core/theme';
import { Text, } from '../../../../components/widget';
import * as loginActions from '../../../../actions/Actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { moderateScale, scale } from 'react-native-size-matters';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome'
import { BASE_API_URL_IMAEG_ORIGINAL, BASE_API_URL_VIDEOS } from '../../../../services/config';
import * as Apis from '../../../../services/Apis';

import Video from 'react-native-video';
import SwiperFlatList from 'react-native-swiper-flatlist';



class MediaView extends Component {


    videoPlayer = [];
    constructor(props) {
        super(props);
        this.state = { assetsList: this.props.assetsList, assesCheck: this.props.assesCheck, inital: false }

    }

    componentDidMount() {
        this.setState({
            assetsList: this.props.assetsList, assesCheck: this.props.assesCheck
        })
    }




    onViewableItemsChanged = ({ viewableItems, changed }) => {
        if (viewableItems && viewableItems[0]) {
            this.setState({ viewableItems: viewableItems[0] })
            this.addView(viewableItems[0].item._id)
        }
    }


    Share = async (index) => {
        try {
            var base = (this.props.assesCheck === 'images' ? BASE_API_URL_IMAEG_ORIGINAL : BASE_API_URL_VIDEOS);
            const result = await Share.share({
                message: this.state.assetsList[index].title + '\n\n' + this.state.assetsList[index].description + '\n' + base + this.state.assetsList[index].url,
                title: this.state.assetsList[index].title,
                url: this.state.assetsList[index].uri
            }, {});

            if (result.action === Share.sharedAction) {
            } else if (result.action === Share.dismissedAction) {
            }
        } catch (error) {
            alert(error.message);
        }
    };



    like(id, index) {
        Apis.Post('users/postLike/' + id, {}).then((data) => {
            this.state.assetsList[index].isLoading = false;
            if (!this.state.assetsList[index].isLike) {
                this.state.assetsList[index].isLike = true;
                this.state.assetsList[index].likes = this.state.assetsList[index].likes + 1;
            } else {
                this.state.assetsList[index].isLike = false;
                this.state.assetsList[index].likes = this.state.assetsList[index].likes - 1;
            }

            this.setState({ assetsList: this.state.assetsList })
        }).catch((error) => {
            this.state.assetsList[index].isLoading = false;
            this.setState({ assetsList: this.state.assetsList })
            console.log(error);
            this.setState({ isLoading: false })
        })
    }



    addView(id) {
        Apis.Post('users/postView/' + id, {}).then((data) => {

        }).catch((error) => {

        })
    }


    getCheck(index) {
        if (this.state.viewableItems)
            return index !== this.state.viewableItems.index;
        else false;
    }


    render() {
        return (
            <View
                style={{
                    width: '100%',
                    height: '100%', backgroundColor: 'black'
                }}>

                <SwiperFlatList
                    autoplayDelay={2}
                    renderAll={false}
                    vertical
                    viewabilityConfig={{
                        itemVisiblePercentThreshold: 100
                    }}
                    ref={ref => { if (ref) this.flatList = ref }}

                    onContentSizeChange={() => {
                        if (this.flatList && this.flatList.scrollToIndex && this.state.assetsList && this.state.assetsList.length && !this.state.inital) {
                            this.flatList.scrollToIndex({ animated: true, index: this.props.startingIndex, });
                            console.log('inital');
                            setTimeout(() => {
                                this.setState({ inital: true });
                            }, 100);
                        }
                    }}
                    onViewableItemsChanged={this.onViewableItemsChanged}
                    data={this.state.assetsList}
                    renderItem={({ item, index }) =>

                        <View style={{ width: '100%', height: Dimensions.get('screen').height, backgroundColor: 'black' }}>

                            {this.state.inital &&
                                <View style={{ width: '100%', height: Dimensions.get('screen').height, backgroundColor: 'black' }}>
                                    {this.state.assesCheck === 'videos' &&
                                        <View style={[styles.backgroundVideo, {}]} >
                                            {item.url && item.url !== '' &&
                                                <Video
                                                    repeat={true}
                                                    onError={(error) => {
                                                        console.log('video error', error)
                                                    }}
                                                    paused={this.getCheck(index)}
                                                    posterResizeMode={'cover'}
                                                    resizeMode={'cover'}
                                                    ref={videoPlayer => { this.videoPlayer[index] = videoPlayer }}
                                                    source={{ uri: BASE_API_URL_VIDEOS + item.url }}

                                                    style={[styles.backgroundVideo, { backgroundColor: 'black' }]} />
                                            }
                                        </View>
                                    }
                                    {this.state.assesCheck === 'images' &&
                                        <Image
                                            resizeMode={'contain'}
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                bottom: 0,
                                                right: 0, backgroundColor: "black"
                                            }}
                                            source={{ uri: BASE_API_URL_IMAEG_ORIGINAL + item.url }}
                                        />
                                    }
                                    <Image style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        bottom: 0,
                                        right: 0,
                                        width: '100%', height: '50%',
                                    }} source={require('../../../../assets/assets/categoryshowdow.png')} />

                                    <Image style={{
                                        position: 'absolute',
                                        left: 0,
                                        bottom: 0,
                                        right: 0,
                                        transform: [{ rotate: '180 deg' }],
                                        width: '100%', height: '50%',
                                    }} source={require('../../../../assets/assets/categoryshowdow.png')} />





                                    <View style={{ marginTop: moderateScale(10), flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center', position: 'absolute', bottom: 0, width: '100%', paddingBottom: moderateScale(10), borderBottomEndRadius: moderateScale(20), borderBottomStartRadius: moderateScale(20) }}>

                                        <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1, justifyContent: 'center', justifyContent: 'flex-end', alignItems: 'center', marginVertical: moderateScale(1) }}>
                                            <View style={{
                                                flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center',
                                                borderRadius: moderateScale(30), paddingHorizontal: moderateScale(7)
                                            }}>

                                                <View style={{ flex: 1 }}>
                                                    <View style={{ padding: moderateScale(10), flexDirection: 'column', }}>
                                                        <Text style={[{
                                                            fontSize: moderateScale(15),
                                                            marginHorizontal: moderateScale(5), color: theme.colors.white, fontWeight: 'bold'
                                                        }]}>{item.title}</Text>

                                                        <Text style={[{
                                                            fontSize: moderateScale(10),
                                                            marginHorizontal: moderateScale(5), color: theme.colors.white, marginTop: moderateScale(5)
                                                        }]}>{item.description}</Text>
                                                    </View>
                                                </View>

                                            </View>
                                        </View>
                                    </View>





                                    <View style={{
                                        marginTop: moderateScale(10), flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', position: 'absolute',
                                        top: moderateScale(20), padding: moderateScale(15)
                                    }}>

                                        <View style={{
                                            flexDirection: 'row', justifyContent: 'center', flex: 1,
                                            justifyContent: 'center', justifyContent: 'flex-start', alignItems: 'center',
                                        }}>
                                            <View style={{
                                                flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center',
                                                borderRadius: moderateScale(30), justifyContent: 'flex-end', alignItems: 'flex-end'
                                            }}>

                                                <TouchableOpacity style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }} onPress={() => { this.props.onHide() }}>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                                        <Icon size={moderateScale(25)} name="close" color={theme.colors.white} />
                                                    </View>
                                                </TouchableOpacity>

                                            </View>
                                        </View>


                                        <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1, justifyContent: 'center', justifyContent: 'flex-end', alignItems: 'center', }}>
                                            <View style={{
                                                flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center',
                                                justifyContent: 'flex-end', alignItems: 'flex-end',
                                            }}>

                                                <TouchableOpacity style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginEnd: moderateScale(12) }} onPress={() => {

                                                    this.state.assetsList[index].isLoading = true;
                                                    this.setState({ assetsList: this.state.assetsList })
                                                    this.like(item._id, index)


                                                }}>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                                        <Text style={[{
                                                            textAlign: 'center',
                                                            fontSize: moderateScale(20),
                                                            color: theme.colors.white
                                                        }]}>{'' + item.likes + '   '}</Text>

                                                        {!item.isLoading && <Icon size={moderateScale(25)} name="heart" color={!item.isLike ? theme.colors.white : theme.colors.primary} />}
                                                        {item.isLoading && <ActivityIndicator size={'small'} color={theme.colors.white} />}

                                                    </View>
                                                </TouchableOpacity>

                                                <TouchableOpacity style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }} onPress={() => { this.Share(index) }}>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>

                                                        <Icon size={moderateScale(25)} name="share" color={theme.colors.white} />

                                                    </View>
                                                </TouchableOpacity>

                                            </View>
                                        </View>
                                    </View>
                                </View>

                            }

                        </View>
                    }>



                </SwiperFlatList>


            </View>


        );
    }

}


const styles = StyleSheet.create({
    container_scrolling: {
        flex: 1,
        backgroundColor: theme.colors.white,

    },
    wrapper: {
        flex: 1,
        backgroundColor: theme.colors.gray06
    },
    wrapperCategory: {
        paddingRight: 0,
        paddingStart: scale(8),
        flex: 1
    },

    exampleContainer: {
        paddingVertical: moderateScale(15),
    },
    sliderContentContainer: {
        paddingVertical: 0,
    },
    slider: {
        marginTop: 0,
        overflow: 'visible',
    },
    card: {
        width: '100%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    heading: {
        fontSize: moderateScale(14),
        color: theme.colors.primary,
        width: '100%', fontWeight: '500', alignSelf: 'flex-start'
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});



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
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(MediaView))


