/* @flow */
import React, { Component, Fragment as F } from 'react';
import { View, Modal, StyleSheet, PanResponder, Animated, TouchableOpacity } from 'react-native';

export default class CustomModal extends Component {
  constructor(props){
    super(props);
    this.state = { yPoz:0, };

    // ************ Swipe Handeler ***********
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
        // console.log( gestureState.moveX );
        // console.log( "Distance: "+gestureState.dx+" x "+gestureState.dy  );
        // console.log( "Postiion: "+gestureState.moveX+" x "+gestureState.moveY  );
        this.setState({yPoz:gestureState.dy});
      },
      onPanResponderGrant: (evt, gestureState) => {
        console.log("Pan started");
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        if(gestureState.dy>100){ // swip action completes if dragged more than 100 units
          props.onClose()
        }
        this.setState({yPoz:0});
        // console.log("Pan Stopped");
      },
    })
  }


  render() {
    return (
      <F>
        <Modal
          animationType={this.props.animationType || "slide"}
          // presentationStyle={this.props.presentationStyle || "fullScreen"}
          transparent={true}
          visible={this.props.visible==true}
          onRequestClose={() => {
            console.log("Modal clsoed");
          }}>
          <View style={{...modalStyle.overlaybg, marginTop: this.state.yPoz}} {...this._panResponder.panHandlers}>
            <View style={modalStyle.contents}>
              {this.props.children}
            </View>
          </View>
        </Modal>
      </F>
    );
  }
}


export const modalStyle = StyleSheet.create({
  overlaybg:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  contents:{
    borderTopWidth: 10, borderTopColor: '#5388D0',
    borderBottomWidth: 10, borderBottomColor: '#5388D0',
    padding: 10,
    width: '90%',
    borderRadius: 20,
    backgroundColor: '#FFF',
  }
});
