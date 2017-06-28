/**
 *BubbleView.js
 */
'use strict';
const React = require('react');
var {
 View,
 requireNativeComponent,
} = require('react-native');

var BubbleTextView = requireNativeComponent('BubbleView', BubbleView);

var BubbleView = React.createClass({

  propTypes: {
    ...View.propTypes,
    text: React.PropTypes.string,
    type: React.PropTypes.bool,
    text2: React.PropTypes.string,
    type2: React.PropTypes.bool
  },

  render() {
    return (
      <BubbleTextView {...this.props}/>
    );
  },
});

module.exports = BubbleView;
