import React, { Component } from 'react';
import { StyleSheet, StatusBar, View, FlatList, Image, I18nManager, ActivityIndicator, ScrollView, Modal } from 'react-native'
import { theme } from '../../../../core/theme';
import { Block, Text, } from '../../../../components/widget';
import * as loginActions from '../../../../actions/Actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../childs/Header';
import { moderateScale } from 'react-native-size-matters';
import { translate } from '../../../../utils/utils';
import { BASE_API_URL_VIDEOS, BASE_API_URL_IMAEG_ORIGINAL } from '../../../../services/config';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome'
import Video from 'react-native-video';
import moment from "moment";
import * as Apis from '../../../../services/Apis';

import TextInput from '../../../../components/Weights/TextInput';
import Loader from '../../../../components/widget/loader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MediaView from '../childs/MediaView';





class CeleberateDetails extends Component {


    videoPlayer = [];
    GiftvideoPlayer = [];


    constructor(props) {
        super(props);
        this.state = {
            isLoading: true, selectedtab: 0, celebraty: {}, details: '', assetsView: false, startingIndex: 0
        }

    }


    componentDidMount() {
        this.setState({ isLoading: true })
        this.getCelebrityDetails();
    }






    like(id) {
        Apis.Post('users/postLike/' + id, {}).then((data) => {
            this.getCelebrityDetails()
        }).catch((error) => {
            console.log(error);
            this.setState({ isLoading: false })
        })
    }


    addReview() {
        Apis.Post('users/review/', { details: this.state.details, userTo: this.state.celebraty._id }).then((data) => {
            this.getCelebrityDetails();
            this.setState({ details: '', commentLoading: false })
        }).catch((error) => {
            this.setState({ commentLoading: false })
            console.log(error);
            this.setState({ isLoading: false })
        })
    }


    getCelebrityDetails() {
        Apis.Get('users/' + this.props.navigation.state.params.item._id).then((data) => {
            console.log('celeberaty details', data)


            this.setState({ celebraty: data })

            setTimeout(() => {
                this.setState({ isLoading: false })
                for (let k in this.state.celebraty.videosList) {
                    this.state.celebraty.videosList[k].isLoading = true;
                    this.state.celebraty.videosList[k].play = true;
                }
                for (let k in this.state.celebraty.giftVideosList) {
                    this.state.celebraty.giftVideosList[k].isLoading = true;
                    this.state.celebraty.giftVideosList[k].play = true;
                }
                this.setState({ celebraty: this.state.celebraty })

            }, 200);
        }).catch((error) => {
            console.log(error);
            this.setState({ isLoading: false })
        })
    }


    render() {

        var item = this.state.celebraty;

        return (
            <Block>
                <StatusBar backgroundColor="transparent" barStyle="dark-content" />

                <Header search={false} back={false} back={true} navigation={this.props.navigation} backclick={() => { this.props.navigation.pop() }} Text={translate('Details')} />
                <Loader isLoading={this.state.isLoading} />


                {!this.state.isLoading &&
                    <KeyboardAwareScrollView scrollEnabled={false} showsVerticalScrollIndicator={false} contentContainerStyle={{ height: '100%' }}>
                        <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'column', }}>
                                <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: moderateScale(20), height: moderateScale(200) }}>
                                    <Image resizeMode="cover" style={{
                                        height: moderateScale(200),
                                        backgroundColor: 'white', width: '90%', alignSelf: 'center', borderRadius: moderateScale(10)
                                    }}
                                        source={{ uri: BASE_API_URL_IMAEG_ORIGINAL + this.state.celebraty.cover_image }}
                                    />
                                </View>


                                <View style={{ paddingTop: moderateScale(10), paddingHorizontal: moderateScale(5), flexDirection: 'row' }}>

                                    <View style={{ height: moderateScale(50), flex: 1, justifyContent: 'center' }}>
                                        <View style={{ flexDirection: 'row', flex: 1, width: '100%', marginTop: moderateScale(7), marginStart: moderateScale(5) }}>

                                            <View style={{ flexDirection: 'column', alignItems: 'center', alignContent: 'center', marginHorizontal: moderateScale(3) }}>
                                                <Icon size={moderateScale(25)} name="instagram" color={'#3f729b'} />
                                                <Text style={[styles.heading, {
                                                    ...I18nManager.isRTL ? { textAlign: 'right' } : {}, textAlign: 'center',
                                                    color: theme.colors.secondary, fontSize: moderateScale(7),
                                                }]}>{item.instagram_count}{'\nfollowers'}</Text>
                                            </View>

                                            <View style={{ flexDirection: 'column', alignItems: 'center', alignContent: 'center', marginHorizontal: moderateScale(3) }}>
                                                <Icon size={moderateScale(25)} name="facebook-square" color={'#3b5998'} />
                                                <Text style={[styles.heading, {
                                                    ...I18nManager.isRTL ? { textAlign: 'right' } : {}, textAlign: 'center',
                                                    color: theme.colors.secondary, fontSize: moderateScale(7),
                                                }]}>{item.facebook_count}{'\nfollowers'}</Text>
                                            </View>

                                            <View style={{ flexDirection: 'column', alignItems: 'center', alignContent: 'center', marginHorizontal: moderateScale(3) }}>
                                                <Icon size={moderateScale(25)} name="youtube-square" color={'#FF0000'} />
                                                <Text style={[styles.heading, {
                                                    ...I18nManager.isRTL ? { textAlign: 'right' } : {}, textAlign: 'center',
                                                    color: theme.colors.secondary, fontSize: moderateScale(7),
                                                }]}>{item.youtube_count}{'\nfollowers'}</Text>
                                            </View>

                                        </View>
                                    </View>

                                    <View style={{ flex: 2, flexDirection: 'column-reverse', paddingHorizontal: moderateScale(5), justifyContent: 'flex-end', alignContent: 'flex-end', alignItems: 'flex-end', paddingTop: moderateScale(5), }}>

                                        <View style={{ flexDirection: 'row', paddingStart: moderateScale(10), flex: 1, alignItems: 'flex-end', alignContent: 'flex-end', marginTop: moderateScale(0) }}>
                                            {item.verified === 0 &&
                                                <Image source={require('app/assets/assets/verified.png')} resizeMode={'cover'} style={{
                                                    height: moderateScale(22), width: moderateScale(22), borderRadius: moderateScale(50),
                                                }} />}
                                            <Text numberOfLines={1} style={[styles.heading, {
                                                ...I18nManager.isRTL ? { textAlign: 'right' } : {}, fontWeight: 'bold', textAlign: 'right',
                                                color: theme.colors.secondary, fontSize: moderateScale(20),
                                                marginHorizontal: moderateScale(5),
                                            }]}>{item.first_name + ' ' + item.last_name}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', borderRadius: moderateScale(10), borderWidth: moderateScale(0.5), backgroundColor: theme.colors.white, padding: moderateScale(3), marginEnd: moderateScale(10) }}>
                                            <Text style={[{
                                                ...I18nManager.isRTL ? { textAlign: 'left' } : {}, fontWeight: 'bold', textAlign: 'right',
                                                color: theme.colors.secondary, fontSize: moderateScale(14), paddingHorizontal: moderateScale(5)
                                            }]}>{item.profession}</Text>

                                            <Image source={{ uri: (BASE_API_URL_IMAEG_ORIGINAL + item.country.image) }} resizeMode={'cover'} style={{
                                                height: moderateScale(15), width: moderateScale(15), borderRadius: moderateScale(20),
                                            }} />
                                        </View>
                                    </View>
                                </View>

                            </View>
                            <View style={{ flex: 1, marginHorizontal: moderateScale(14), }}>
                                <View style={{ width: '100%', height: moderateScale(1), backgroundColor: theme.colors.secondary, marginVertical: moderateScale(10), alignSelf: 'center' }} />

                                <View style={{ width: '100%', height: moderateScale(35), marginBottom: moderateScale(10), flexDirection: 'row' }}>

                                    <View style={{
                                        flex: 1, backgroundColor: theme.colors.gray06, marginHorizontal: moderateScale(2), ...this.state.selectedtab === 0 ? {
                                            backgroundColor: theme.colors.secondary, borderWidth: moderateScale(0.5), borderColor: theme.colors.primary
                                        } : {}
                                    }}>
                                        <TouchableOpacity onPress={() => { this.setState({ selectedtab: 0 }) }} style={{
                                            height: '100%', justifyContent: 'center', alignSelf: 'center',
                                        }}>
                                            <Text style={[{
                                                fontWeight: 'bold', textAlign: 'center',
                                                fontSize: moderateScale(10),
                                                marginHorizontal: moderateScale(5), ...this.state.selectedtab === 0 ? { color: theme.colors.primary, } : { color: theme.colors.secondary }
                                            }]}>{'Images'}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{
                                        flex: 1, backgroundColor: theme.colors.gray06, marginHorizontal: moderateScale(2), ...this.state.selectedtab === 1 ? {
                                            backgroundColor: theme.colors.secondary, borderWidth: moderateScale(0.5), borderColor: theme.colors.primary
                                        } : {}
                                    }}>
                                        <TouchableOpacity onPress={() => { this.setState({ selectedtab: 1 }) }} style={{ height: '100%', justifyContent: 'center', alignSelf: 'center' }}>
                                            <Text style={[{
                                                fontWeight: 'bold', textAlign: 'center',
                                                fontSize: moderateScale(10),
                                                marginHorizontal: moderateScale(5), ...this.state.selectedtab === 1 ? { color: theme.colors.primary, } : { color: theme.colors.secondary }
                                            }]}>{'Videos'}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{
                                        flex: 1, backgroundColor: theme.colors.gray06, marginHorizontal: moderateScale(2), ...this.state.selectedtab === 2 ? {
                                            backgroundColor: theme.colors.secondary, borderWidth: moderateScale(0.5), borderColor: theme.colors.primary
                                        } : {}
                                    }}>
                                        <TouchableOpacity onPress={() => { this.setState({ selectedtab: 2 }) }} style={{ height: '100%', justifyContent: 'center', alignSelf: 'center' }}>
                                            <Text style={[{
                                                fontWeight: 'bold', textAlign: 'center',
                                                fontSize: moderateScale(10),
                                                marginHorizontal: moderateScale(5), ...this.state.selectedtab === 2 ? { color: theme.colors.primary, } : { color: theme.colors.secondary }
                                            }]}>{'Gift Videos'}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{
                                        flex: 1, backgroundColor: theme.colors.gray06, marginHorizontal: moderateScale(2), ...this.state.selectedtab === 3 ? {
                                            backgroundColor: theme.colors.secondary, borderWidth: moderateScale(0.5), borderColor: theme.colors.primary
                                        } : {}
                                    }}>
                                        <TouchableOpacity onPress={() => { this.setState({ selectedtab: 3 }) }} style={{ height: '100%', justifyContent: 'center', alignSelf: 'center' }}>
                                            <Text style={[{
                                                fontWeight: 'bold', textAlign: 'center',
                                                fontSize: moderateScale(10),
                                                marginHorizontal: moderateScale(5), ...this.state.selectedtab === 3 ? { color: theme.colors.primary, } : { color: theme.colors.secondary }
                                            }]}>{'Reviews'}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{
                                        flex: 1, backgroundColor: theme.colors.gray06, marginHorizontal: moderateScale(2), ...this.state.selectedtab === 4 ? {
                                            backgroundColor: theme.colors.secondary, borderWidth: moderateScale(0.5), borderColor: theme.colors.primary
                                        } : {}
                                    }}>
                                        <TouchableOpacity onPress={() => { this.setState({ selectedtab: 4 }) }} style={{ height: '100%', justifyContent: 'center', alignSelf: 'center' }}>
                                            <Text style={[{
                                                fontWeight: 'bold', textAlign: 'center',
                                                fontSize: moderateScale(10),
                                                marginHorizontal: moderateScale(5), ...this.state.selectedtab === 4 ? { color: theme.colors.primary, } : { color: theme.colors.secondary }
                                            }]}>{'About Artist'}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {this.state.selectedtab === 0 &&

                                    <FlatList
                                        data={this.state.celebraty.imagesList}
                                        showsVerticalScrollIndicator={false}
                                        contentContainerStyle={{ paddingBottom: moderateScale(100) }}
                                        renderItem={({ item, index }) => (
                                            <View
                                                key={'image-gallery-' + index}
                                                style={{
                                                    flex: 1 / 3,
                                                    flexDirection: 'column',
                                                    margin: moderateScale(2)
                                                }}>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        this.setState({ assetsView: true, assetsList: this.state.celebraty.imagesList, assesCheck: 'images', startingIndex: index })
                                                    }}>
                                                    <Image
                                                        style={{
                                                            justifyContent: 'center',
                                                            alignItems: 'center', borderRadius: moderateScale(10),
                                                            height: moderateScale(150),
                                                        }}
                                                        source={{ uri: BASE_API_URL_IMAEG_ORIGINAL + item.url }} />

                                                    <View style={{ position: 'absolute', padding: moderateScale(10), bottom: 0, left: 0, flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>

                                                        <TouchableOpacity onPress={() => {

                                                            this.state.celebraty.imagesList[index].isLoading = true;
                                                            this.setState({ celebraty: this.state.celebraty })
                                                            this.like(item._id, index)

                                                        }}>

                                                            {!item.isLoading && <Icon size={moderateScale(25)} name="heart" color={!item.isLike ? theme.colors.white : theme.colors.primary} />}
                                                            {item.isLoading && <ActivityIndicator size={'small'} color={theme.colors.white} />}
                                                        </TouchableOpacity>

                                                        <Text style={[{
                                                            textAlign: 'center',
                                                            fontSize: moderateScale(20),
                                                            marginHorizontal: moderateScale(5), color: theme.colors.white
                                                        }]}>{item.likes}</Text>

                                                    </View>
                                                </TouchableOpacity>

                                            </View>
                                        )}
                                        numColumns={3}
                                        keyExtractor={(item, index) => index}
                                    />

                                }

                                {this.state.selectedtab === 1 &&
                                    <FlatList
                                        data={this.state.celebraty.videosList}
                                        extraData={this.state}
                                        contentContainerStyle={{ paddingBottom: moderateScale(100) }}
                                        showsVerticalScrollIndicator={false}
                                        renderItem={({ item, index }) => (
                                            <View
                                                key={'video-gallery-' + index}
                                                style={{
                                                    flex: 1 / 2,
                                                    flexDirection: 'column',
                                                    margin: moderateScale(5),
                                                }}>
                                                <TouchableOpacity onPress={() => {


                                                    // this.state.celebraty.videosList[index].play = !this.state.celebraty.videosList[index].play;
                                                    // this.setState({ celebraty: this.state.celebraty });
                                                    // this.videoPlayer[index].presentFullscreenPlayer();

                                                    this.setState({ assetsView: true, assetsList: this.state.celebraty.videosList, assesCheck: 'videos', startingIndex: index })

                                                }} style={{ flexDirection: 'column', width: '100%' }}>

                                                    <View style={{ height: moderateScale(200), width: '100%', justifyContent: 'center', zIndex: 10, }}>
                                                        <Video
                                                            paused={item.play}
                                                            posterResizeMode={'stretch'}
                                                            resizeMode={'cover'}
                                                            onVideoFullscreenPlayerWillDismiss={() => {
                                                                this.state.celebraty.videosList[index].play = !this.state.celebraty.videosList[index].play;
                                                                this.setState({ celebraty: this.state.celebraty })
                                                            }}
                                                            source={{ uri: BASE_API_URL_VIDEOS + item.url }}
                                                            ref={videoPlayer => { this.videoPlayer[index] = videoPlayer }}
                                                            onError={(error) => {
                                                                console.log('video error', error)
                                                            }}
                                                            onLoad={() => {
                                                                this.state.celebraty.videosList[index].isLoading = !this.state.celebraty.videosList[index].isLoading;
                                                                this.setState({ celebraty: this.state.celebraty })
                                                                if (this.videoPlayer[index])
                                                                    this.videoPlayer[index].seek(1);
                                                            }}
                                                            posterResizeMode='stretch'
                                                            style={{
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                height: moderateScale(200), backgroundColor: theme.colors.black, borderRadius: moderateScale(10), zIndex: 10,
                                                            }} />

                                                        {!item.isLoading &&
                                                            <Image resizeMode="contain"
                                                                style={{
                                                                    position: 'absolute', alignSelf: 'center',
                                                                    height: moderateScale(30), width: moderateScale(30), opacity: 0.5, zIndex: 2,
                                                                }}
                                                                source={require('app/assets/assets/selected.png')}
                                                            />
                                                        }


                                                        {item.isLoading && <ActivityIndicator size={'small'} color={theme.colors.primary} style={{ position: 'absolute', alignSelf: 'center', zIndex: 4, }} />}


                                                    </View>

                                                    <View style={{ backgroundColor: theme.colors.gray07, width: '100%', top: moderateScale(-15), zIndex: 0, }}>
                                                        <Text numberOfLines={1} style={[{
                                                            fontWeight: 'bold',
                                                            fontSize: moderateScale(10),
                                                            margin: moderateScale(5), marginTop: moderateScale(20)
                                                        }]}>{item.title}</Text>
                                                        <View style={{
                                                            flex: 1, flexDirection: 'row',
                                                            alignItems: 'center', alignContent: 'center', marginHorizontal: moderateScale(5), marginBottom: moderateScale(10)
                                                        }}>
                                                            <Image resizeMode="contain"
                                                                style={{
                                                                    height: moderateScale(12), width: moderateScale(12),
                                                                }}
                                                                source={require('app/assets/assets/time.png')}
                                                            />
                                                            <Text style={[{
                                                                fontWeight: 'bold',
                                                                fontSize: moderateScale(8), marginStart: moderateScale(10)
                                                            }]}>{moment(new Date(item.createdAt)).format('DD MMM YYYY')}</Text>
                                                        </View>
                                                    </View>

                                                    <View style={{ position: 'absolute', padding: moderateScale(10), top: moderateScale(0), left: 0, flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', zIndex: 99999, }}>

                                                        <TouchableOpacity onPress={() => {

                                                            this.state.celebraty.videosList[index].isLoadingLike = true;
                                                            this.setState({ celebraty: this.state.celebraty })
                                                            this.like(item._id, index)

                                                        }}>

                                                            {!item.isLoadingLike && <Icon size={moderateScale(25)} name="heart" color={!item.isLike ? theme.colors.white : theme.colors.primary} />}
                                                            {item.isLoadingLike && <ActivityIndicator size={'small'} color={theme.colors.white} />}
                                                        </TouchableOpacity>

                                                        <Text style={[{
                                                            textAlign: 'center',
                                                            fontSize: moderateScale(20),
                                                            marginHorizontal: moderateScale(5), color: theme.colors.white
                                                        }]}>{item.likes}</Text>

                                                    </View>
                                                </TouchableOpacity>

                                            </View>
                                        )}
                                        numColumns={2}
                                        keyExtractor={(item, index) => index}
                                    />

                                }



                                {this.state.selectedtab === 2 &&
                                    <FlatList
                                        data={this.state.celebraty.giftVideosList}
                                        extraData={this.state}
                                        contentContainerStyle={{ paddingBottom: moderateScale(50) }}
                                        showsVerticalScrollIndicator={false}
                                        renderItem={({ item, index }) => (
                                            <View
                                                key={'video-gallery-' + index}
                                                style={{
                                                    flex: 1 / 2,
                                                    flexDirection: 'column',
                                                    margin: moderateScale(5),
                                                }}>
                                                <TouchableOpacity onPress={() => {
                                                    this.state.celebraty.giftVideosList[index].play = !this.state.celebraty.giftVideosList[index].play;
                                                    this.setState({ celebraty: this.state.celebraty })
                                                    this.GiftvideoPlayer[index].presentFullscreenPlayer();
                                                }} style={{ flexDirection: 'column', width: '100%' }}>

                                                    <View style={{ height: moderateScale(200), width: '100%', justifyContent: 'center', zIndex: 10, }}>
                                                        <Video
                                                            paused={item.play}
                                                            posterResizeMode={'stretch'}
                                                            resizeMode={'cover'}
                                                            onVideoFullscreenPlayerWillDismiss={() => {
                                                                this.state.celebraty.giftVideosList[index].play = !this.state.celebraty.giftVideosList[index].play;
                                                                this.setState({ celebraty: this.state.celebraty })
                                                            }}
                                                            source={{ uri: BASE_API_URL_VIDEOS + item.url }}
                                                            ref={GiftvideoPlayer => { this.GiftvideoPlayer[index] = GiftvideoPlayer }}
                                                            onError={(error) => {
                                                                console.log('video error', error)
                                                            }}
                                                            onLoad={() => {
                                                                this.state.celebraty.giftVideosList[index].isLoading = !this.state.celebraty.giftVideosList[index].isLoading;
                                                                this.setState({ celebraty: this.state.celebraty })
                                                                if (this.GiftvideoPlayer[index])
                                                                    this.GiftvideoPlayer[index].seek(0);
                                                            }}
                                                            posterResizeMode='stretch'
                                                            style={{
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                height: moderateScale(200), backgroundColor: theme.colors.black, borderRadius: moderateScale(10), zIndex: 10,
                                                            }} />

                                                        {!item.isLoading &&
                                                            <Image resizeMode="contain"
                                                                style={{
                                                                    position: 'absolute', alignSelf: 'center',
                                                                    height: moderateScale(30), width: moderateScale(30), opacity: 0.5, zIndex: 2,
                                                                }}
                                                                source={require('app/assets/assets/selected.png')}
                                                            />
                                                        }
                                                        {item.isLoading && <ActivityIndicator size={'small'} color={theme.colors.primary} style={{ position: 'absolute', alignSelf: 'center', zIndex: 4, }} />}
                                                    </View>
                                                    <View style={{ backgroundColor: theme.colors.gray07, width: '100%', top: moderateScale(-15), zIndex: 0, }}>
                                                        <Text numberOfLines={1} style={[{
                                                            fontWeight: 'bold',
                                                            fontSize: moderateScale(10),
                                                            margin: moderateScale(5), marginTop: moderateScale(20)
                                                        }]}>{item.title}</Text>
                                                        <View style={{
                                                            flex: 1, flexDirection: 'row',
                                                            alignItems: 'center', alignContent: 'center', marginHorizontal: moderateScale(5), marginBottom: moderateScale(10)
                                                        }}>
                                                            <Image resizeMode="contain"
                                                                style={{
                                                                    height: moderateScale(12), width: moderateScale(12),
                                                                }}
                                                                source={require('app/assets/assets/time.png')}
                                                            />
                                                            <Text style={[{
                                                                fontWeight: 'bold',
                                                                fontSize: moderateScale(8), marginStart: moderateScale(10)
                                                            }]}>{moment(new Date(item.createdAt)).format('DD MMM YYYY')}</Text>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                        numColumns={2}
                                        keyExtractor={(item, index) => index}
                                    />
                                }

                                {this.state.selectedtab === 3 && this.state.celebraty.reviews.length !== 0 && this.state.celebraty.reviews[0].userFrom &&
                                    <View style={{ flexDirection: 'column', width: '100%', flex: 1 }}>
                                        <View style={{ flex: 1 }}>
                                            <FlatList
                                                data={this.state.celebraty.reviews}
                                                extraData={this.state}
                                                contentContainerStyle={{ paddingBottom: moderateScale(0) }}
                                                showsVerticalScrollIndicator={false}
                                                renderItem={({ item, index }) => (
                                                    <View
                                                        key={'reviews-reviews-' + index}
                                                        style={{
                                                            flex: 1,
                                                            flexDirection: 'column',
                                                            margin: moderateScale(5),
                                                        }}>
                                                        <TouchableOpacity style={{ flexDirection: 'column', width: '100%' }}>

                                                            <View style={{ backgroundColor: theme.colors.gray07, width: '100%', zIndex: 0, paddingTop: moderateScale(5), padding: moderateScale(5), }}>
                                                                <View style={{
                                                                    flex: 1, flexDirection: 'row',
                                                                    alignItems: 'center', alignContent: 'center',
                                                                }}>
                                                                    <Text style={[{
                                                                        fontWeight: 'bold',
                                                                        fontSize: moderateScale(15), flex: 1

                                                                    }]}>{item.userFrom.first_name + ' ' + item.userFrom.last_name}</Text>
                                                                    <Text style={[{
                                                                        fontSize: moderateScale(8), color: theme.colors.secondary, marginBottom: moderateScale(5)
                                                                    }]}>{moment(new Date(item.createdAt)).format('DD MMM YYYY')}</Text>
                                                                </View>

                                                                <Text style={[{
                                                                    fontSize: moderateScale(10), marginTop: moderateScale(5), color: theme.colors.gray04
                                                                }]}>{item.details}</Text>
                                                            </View>

                                                        </TouchableOpacity>
                                                    </View>
                                                )}
                                                keyExtractor={(item, index) => index}
                                            />
                                        </View>


                                        {this.props.data.userInfo._id !== item._id &&
                                            <View style={{ backgroundColor: theme.colors.white, paddingTop: moderateScale(20), }}>
                                                <View style={{ minHeight: moderateScale(100), backgroundColor: theme.colors.gray06, marginBottom: moderateScale(30), borderRadius: moderateScale(20), padding: moderateScale(10), }}>


                                                    <View style={{ flexDirection: 'row', }}>
                                                        <Text bold style={{ color: theme.colors.secondary, marginBottom: moderateScale(0), ...I18nManager.isRTL ? { textAlign: 'left' } : {}, marginHorizontal: moderateScale(20), flex: 1 }}>{item.first_name + ' ' + item.last_name}</Text>

                                                        <TouchableOpacity onPress={() => {
                                                            if (this.state.details !== '') {
                                                                this.addReview()
                                                                this.setState({ commentLoading: true })
                                                            }
                                                        }} style={{
                                                            marginHorizontal: moderateScale(0), backgroundColor: theme.colors.secondary, zIndex: 10,
                                                            alignItems: 'center', borderRadius: moderateScale(20),
                                                            justifyContent: 'center', borderColor: theme.colors.secondary, borderWidth: moderateScale(0.5),
                                                            shadowColor: theme.colors.primary, shadowOffset: {
                                                                width: 0,
                                                                height: 2,
                                                            }, shadowOpacity: 0.25,
                                                            shadowRadius: 3.84,
                                                            paddingHorizontal: moderateScale(10), paddingVertical: moderateScale(5),
                                                        }}>
                                                            <View>
                                                                <Text style={[styles.heading, {
                                                                    ...I18nManager.isRTL ? { textAlign: 'left' } : {}, fontWeight: 'bold', textAlign: 'center',
                                                                    color: theme.colors.white, fontSize: moderateScale(15),

                                                                }]}>{'Add Review'}
                                                                </Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>

                                                    <TextInput
                                                        style={[{
                                                            marginTop: 5,
                                                            marginBottom: 5,
                                                            paddingStart: 10,
                                                            paddingEnd: 10,
                                                            paddingBottom: 10,
                                                            borderColor: theme.colors.gray05, backgroundColor: theme.colors.gray06, borderRadius: moderateScale(20),
                                                            borderWidth: 0, marginHorizontal: moderateScale(10), ...I18nManager.isRTL ? { paddingEnd: 10, textAlign: 'right' } : {}, paddingHorizontal: moderateScale(0),
                                                        }, { borderRadius: moderateScale(10), paddingHorizontal: moderateScale(20), ...I18nManager.isRTL ? { textAlign: 'right' } : {} }]}
                                                        value={this.state.details}
                                                        onChangeText={text => this.setState({ details: text })}
                                                        multiline={true}
                                                        onFocus={(change) => {
                                                            console.log('changechangechange', change)
                                                        }}
                                                        placeholder={translate('type your review here .... ')}
                                                        blurOnSubmit={true}
                                                        underlineColorAndroid='transparent'
                                                        autoCapitalize="sentences"
                                                    />


                                                </View>

                                            </View>

                                        }
                                    </View>
                                }




                                {this.state.selectedtab === 4 &&
                                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: moderateScale(10), }}>
                                        <Text style={[{
                                            fontWeight: 'bold', textAlign: 'center',
                                            fontSize: moderateScale(15), borderWidth: moderateScale(0.5), borderRadius: moderateScale(20), marginTop: moderateScale(10), padding: moderateScale(10)

                                        }]}>{this.state.celebraty.description}</Text>
                                    </ScrollView>
                                }


                            </View>



                            {this.state.selectedtab !== 3 && this.props.data.userInfo._id !== item._id &&
                                <View style={{ alignSelf: 'center', position: 'absolute', bottom: moderateScale(20), zIndex: 1, width: '80%', }}>
                                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('CeleberateBooking', { item: item }) }} style={{
                                        marginHorizontal: moderateScale(0), backgroundColor: theme.colors.secondary, zIndex: 10,
                                        height: moderateScale(40), alignItems: 'center', borderRadius: moderateScale(20),
                                        justifyContent: 'center', borderColor: theme.colors.secondary, borderWidth: moderateScale(0.5),
                                        shadowColor: theme.colors.primary, shadowOffset: {
                                            width: 0,
                                            height: 2,
                                        }, shadowOpacity: 0.25, shadowRadius: 3.84,
                                    }}>
                                        <View>
                                            <Text style={[styles.heading, {
                                                ...I18nManager.isRTL ? { textAlign: 'left' } : {}, fontWeight: 'bold', textAlign: 'center',
                                                color: theme.colors.primary, fontSize: moderateScale(15),

                                            }]}>{'Book Now'}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            }


                        </View>

                    </KeyboardAwareScrollView>
                }


                {this.state.assetsView &&
                    <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: "center", backgroundColor: 'black' }}>
                        <Modal
                            animationType="slide"
                            visible={this.state.assetsView}
                            onRequestClose={() => {
                                this.setState({ assetsView: false })
                            }}
                            onDismiss={() => {
                                this.setState({ assetsView: false })
                            }}>
                            <MediaView startingIndex={this.state.startingIndex} assetsList={this.state.assetsList} assesCheck={this.state.assesCheck} onHide={() => { this.setState({ assetsView: false }) }} />
                        </Modal>
                    </View>
                }
            </Block >
        )

    }

}
const mapStateToProps = (state) => ({
    data: {
        userInfo: state.login.userInfo
    },
})
const mapDispatchToProps = (dispatch) => ({
    actions: {
        about: bindActionCreators(loginActions, dispatch)
    }
})


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        backgroundColor: '#fff',

    },

});
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(CeleberateDetails))