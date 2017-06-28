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
  Text,
  Alert,
  Dimensions,
} = require('react-native');
import StoryText from '../../../src/components/StoryText';
var window = Dimensions.get('window');
var BubbleView = require('./bubbleView');
import DeviceInfo from 'react-native-device-info';
import {CachedImage} from "react-native-img-cache";
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
          <View
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
            style={{width: viewWidth, height: viewHeight, opacity: 0}}
            >
            <Text
              ref={v => this.rightText = v}
              style={styles.messagesRight}>{messages}</Text>
          </View>
          <BubbleView
            text={messages}
            type={true}
            style={{justifyContent: 'center', width: viewWidth+15, height: viewHeight-5, opacity: opacity}}
            >
          </BubbleView>
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
          <BubbleView
            text={messages}
            type={false}
            style={{justifyContent: 'center', width: viewWidth+15, height: viewHeight-5, opacity: opacity}}
            >
          </BubbleView>
          <View
            onLayout={(e) => {
              this.leftText.measure((a, b, width, height, px, py) =>{
                if (width != viewWidth || height != viewHeight) {
                  this.setState({
                    viewHeight: height,
                    viewWidth: width,
                    opacity: 1,
                  });
                }
              });
            }}
            style={{width: viewWidth, height: viewHeight, opacity: 0}}
            >
            <Text
              ref={v => this.leftText = v}
              style={styles.messagesLeft}>{messages}</Text>
          </View>
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
            <View
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
              style={{width: viewWidth, height: viewHeight, opacity: 1,backgroundColor:'red'}}
              >
            <Text
              ref={v => this.CenterText = v}
              numberOfLines={0}
              style={styles.messagesRight}>{messages}</Text>
            </View>
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
            <View
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
              style={{ justifyContent: 'center', width: viewWidth + 15, height: viewHeight, opacity: 1,backgroundColor:'red', borderRadius: 5}}
              >
            <Text
              ref={v => this.CenterText = v}
              numberOfLines={0}
              style={styles.messagesCenter}>{messages}</Text>
            </View>
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
    alignSelf: 'flex-end',
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: 'transparent',
  },
  messagesLeft: {
    alignSelf: 'flex-start',
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: 'transparent',
  },
  messagesCenter: {
    alignSelf: 'center',
    paddingBottom: 10,
    paddingTop: 10,
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
