import React from 'react';
import { StyleSheet } from 'react-native';

export const headerStyle = StyleSheet.create({
  searchbar:{
    backgroundColor: 'rgba(0, 0, 0, 0)',
    paddingVertical: 0, paddingHorizontal: 0,
    marginVertical: 0, marginHorizontal: 0,
    borderTopWidth: 0, borderRightWidth: 0, borderBottomWidth: 0, borderLeftWidth: 0,
  },
  searchbarInputContainer:{
    backgroundColor: 'rgb(240,246,253)',
  },
  searchbarInput:{
    backgroundColor:'rgb(240,246,253)',
  },
  container: {
    // flex: 1,
    paddingHorizontal: 10, paddingVertical: 15,
    backgroundColor: 'rgb(25,140,220)',
    flexDirection:'row',
    height:75,
  },
  colAuto:{
    flex: 1,
  },
  colText:{
    color: '#FFF', fontSize: 20, paddingTop: 10, paddingLeft: 10,
  },
  colRight:{
    color: '#FFF'
  },
  searchButton:{
    paddingHorizontal: 10, paddingVertical: 10,
  },
  backButton:{
    paddingVertical: 6,
    paddingLeft: 10, paddingRight: 15,
  }

});

export const avatarStyle = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    width: '90%',
    flex: 1,
    alignItems: 'center',
    borderRadius: 50,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  closeButton:{
    marginTop: 10,
    paddingHorizontal: 50,
    padding: 0,
  },
  job:{},
  name:{
    fontSize: 30,
  },
  details:{
    width: '100%', backgroundColor: '#F0F6FD',
    marginTop: 15, marginBottom: 10,
    paddingLeft: 5, paddingTop: 5, paddingBottom: 5,
    borderLeftWidth: 5, borderLeftColor: '#5388D0',
    borderTopLeftRadius: 5, borderBottomLeftRadius: 5,
    alignItems: 'flex-start',
    textAlign: 'left', fontSize: 10,
  }

});
