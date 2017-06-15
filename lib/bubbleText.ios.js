/**
* react-native-message-bubble
* https://github.com/pop-xiaodong/react-native-message-bubble
*/

'use strict';

var React = require('react');
var {
  Animated,
  StyleSheet,
  View,
  Image,
  Dimensions,
  Text,
} = require('react-native');
import StoryText from '../../../src/components/StoryText';
var window = Dimensions.get('window');
import {CachedImage} from "react-native-img-cache";
import DeviceInfo from 'react-native-device-info';

var messageFontSize = DeviceInfo.isTablet() ? 30 : 18;
var senderNameFontSize = DeviceInfo.isTablet() ? 24 : 14;
const screenWidth = Dimensions.get('window').width;

var BubbleText = React.createClass({

  getInitialState() {

    return {
      viewHeight: null,
      viewWidth: window.width/3*2,
      opacity: 0,
      fadeAnim: new Animated.Value(0)
    }
  },
  componentDidMount() {
    if (this.props.shouldFade) {
      Animated.timing(                            // Animate over time
        this.state.fadeAnim,                      // The animated value to drive
        {
          toValue: 1,
          duration: 150,                           // Animate to opacity: 1, or fully opaque
          useNativeDriver: true
        }
      ).start();
    } else {
      this.state.fadeAnim = new Animated.Value(1);
    }
    // Starts the animation
  },

  render() {
    var {viewHeight, viewWidth, opacity} = this.state;
    var {messageType, messages, senderName, shouldFade} = this.props;
    if (messageType == "right") {
      return (
        <Animated.View style = {{opacity: this.state.fadeAnim}}>
          <View style={styles.rowRight}>
            <CachedImage
              capInsets={{top: 30, left: 13, bottom: 18, right: 13}}
              resizeMode='stretch'
              source={require('./img/message_bubble_right.png')}
              onLayout={(e) => {
                this.rightText.measure((a, b, width, height, px, py) =>{
                  if (width != viewWidth || height != viewHeight) {
                    this.setState({
                      viewHeight: height,
                      viewWidth: width,
                      opacity: 1,
                    });
                  }
                });
              }}
              style={{justifyContent: 'center', width: viewWidth, height: viewHeight, opacity: opacity}}
              >
                <StoryText
                  ref={v => this.rightText = v}
                  numberOfLines={0}
                  style={styles.messagesRight}>{messages}</StoryText>
                </CachedImage>
              </View>
              <View style={styles.rowRight}>
                <Text style={styles.senderNameRight}>{senderName}</Text>
              </View>
            </Animated.View>
          )
        } else if (messageType == "left") {
          return (
            <Animated.View style = {{opacity: this.state.fadeAnim}}>
              <View style={styles.rowLeft}>
                <CachedImage
                  capInsets={{top: 30, left: 13, bottom: 18, right: 13}}
                  resizeMode='stretch'
                  source={require('./img/message_bubble_left.png')}
                  onLayout={(e) => {
                    this.LeftText.measure((a, b, width, height, px, py) =>{
                      if (width != viewWidth || height != viewHeight) {
                        this.setState({
                          viewHeight: height,
                          viewWidth: width,
                          opacity: 1,
                        });
                      }
                    });
                  }}
                  style={{justifyContent: 'center', width: viewWidth, height: viewHeight, opacity: opacity}}
                  >
                    <StoryText
                      ref={v => this.LeftText = v}
                      numberOfLines={0}
                      style={styles.messagesLeft}>{messages}</StoryText>
                    </CachedImage>
                  </View>
                  <View style={styles.rowLeft}>
                    <Text style={styles.senderNameLeft}>{senderName}</Text>
                  </View>
                </Animated.View>
              )
            } else if (!messageType && senderName) {
              // long center messages
              return (
                <Animated.View style = {{opacity: this.state.fadeAnim}}>
                  <View style={styles.rowCenter}>
                    <CachedImage
                      capInsets={{top: 30, left: 13, bottom: 18, right: 13}}
                      resizeMode='stretch'
                      source={require('./img/message_bubble_center.png')}
                      onLayout={(e) => {
                        this.CenterText.measure((a, b, width, height, px, py) =>{
                          if (width != viewWidth || height != viewHeight) {
                            this.setState({
                              viewHeight: height,
                              viewWidth: width,
                              opacity: 1,
                            });
                          }
                        });
                      }}
                      style={{justifyContent: 'center', width: screenWidth, height: viewHeight, opacity: opacity}}
                      >
                    <StoryText
                      ref={v => this.CenterText = v}
                      numberOfLines={0}
                      style={styles.messagesRight}>{messages}</StoryText>
                    </CachedImage>
                  </View>
                  <View style={styles.rowRight}>
                    <Text style={styles.senderNameRight}>{senderName}</Text>
                  </View>
                </Animated.View>
              )
            } else {
              // center messages
              return (
                <Animated.View style = {{opacity: this.state.fadeAnim}}>
                  <View style={styles.rowCenter}>
                    <CachedImage
                      capInsets={{top: 30, left: 13, bottom: 18, right: 13}}
                      resizeMode='stretch'
                      source={require('./img/message_bubble_center.png')}
                      onLayout={(e) => {
                        this.CenterText.measure((a, b, width, height, px, py) =>{
                          if (width != viewWidth || height != viewHeight) {
                            this.setState({
                              viewHeight: height,
                              viewWidth: width,
                              opacity: 1,
                            });
                          }
                        });
                      }}
                      style={{justifyContent: 'center', width: viewWidth, height: viewHeight, opacity: opacity}}
                      >
                    <StoryText
                      ref={v => this.CenterText = v}
                      numberOfLines={0}
                      style={styles.messagesLeft}>{messages}</StoryText>
                    </CachedImage>
                  </View>
                  <View style={styles.rowLeft}>
                    <Text style={styles.senderNameLeft}>{senderName}</Text>
                  </View>
                </Animated.View>
              )
            }
          }
        });

        var styles = StyleSheet.create({
          rowRight: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
          },
          rowLeft: {
            flexDirection: 'row',
          },
          rowCenter: {
            flexDirection: 'row',
            justifyContent: 'center',
          },
          messagesRight: {
            textAlign: 'right',
            alignSelf: 'flex-end',
            fontSize: messageFontSize,
            paddingLeft: 17,
            paddingRight: 17,
            paddingBottom: 20,
            paddingTop: 12,
            backgroundColor: 'transparent',
          },
          messagesLeft: {
            textAlign: 'right',
            alignSelf: 'flex-start',
            fontSize: messageFontSize,
            paddingLeft: 17,
            paddingRight: 17,
            paddingBottom: 20,
            paddingTop: 12,
            backgroundColor: 'transparent',
          },
          userImage: {
            marginTop: 2,
            height: 35,
            width: 35,
          },
          senderNameLeft: {
            fontSize: senderNameFontSize,
            alignSelf: 'flex-start',
            paddingLeft: 17,
            paddingRight: 17,
            marginTop: -8,
            paddingBottom: 8,
            backgroundColor: 'transparent',
            color: '#fff000',
          },
          senderNameRight: {
            fontSize: senderNameFontSize,
            alignSelf: 'flex-end',
            paddingLeft: 17,
            paddingRight: 17,
            marginTop: -8,
            paddingBottom: 8,
            backgroundColor: 'transparent',
            color: '#fff000',
          },
        });

        module.exports = BubbleText;
