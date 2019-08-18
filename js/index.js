/* @flow */

import React, { Component, Fragment as F } from 'react';
import { View, Text, FlatList, Animated, TouchableOpacity } from 'react-native';
import { ListItem, Icon, Card, Button, Avatar, SearchBar } from 'react-native-elements';
import Modal from './components/Modal';
import faker from 'faker';
import clients from '../assets/clients.json';
import { avatarStyle, headerStyle } from '../assets/styles';

const CustomButton = props => (
  <Button title={props.title || "Button"}
    style={props.style || {}}
    type={props.type || "outline"}
    titleStyle={{fontSize: 12, lineHeight: 20, color: '#000', padding: 0, margin: 0}}
    buttonStyle={{paddingHorizontal: 50, padding: 0, backgroundColor: 'rgba(83,136,208, 0.8)'}}
    containerStyle={{}}
    onPress={props.onPress} />
)

const toDataURL = url => fetch(url)
  .then(response => response.blob())
  .then(blob => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  }))

export default class ListApp extends Component {
  // constructor(props){
  //   super(props);
  // }
  state = { overlayvisible:false, selectedRec:null, search:"", openSearch:false, };

  /********** Fake data generator **********/
  generateFakeData(num=20){
    faker.seed(123);
    let arr = [];
    for(let a=0; a<num; a++){
      let obj = {
        name: faker.name.findName(),
        company: faker.company.companyName(),
        job: faker.name.jobTitle(),
        phone: faker.phone.phoneNumber(),
        email: faker.internet.email(),
        city: faker.address.city(),
        country: faker.address.country(),
        avatar: this.imgToDataURL( faker.image.avatar() ),
      };
      arr.push(obj);
    }
    // console.log("generateFakeData:", arr);
    // console.log("JSON:", JSON.stringify(arr));
    return arr;
  }
  // convert live image to base64 string data/
  getimg = async() => {
    for(let a=0; a<clients.length; a++){
      if(clients[a].avatar){
        let avatar = clients[a].avatar;
        // avatar = require(avatar);
        avatar = await toDataURL(avatar);
        // console.log(a, " = ", avatar  );
      }
    }
  }
  imgToDataURL = async(url) => {
    return await toDataURL(url);
  }



  /********** List functions **********/
  keyExtractor = (item, index) => index.toString();
  renderItem = ({ item }) => (
      <ListItem bottomDivider
        onPress={()=>this.openContact(item)}
        Component={TouchableOpacity}
        title={item.name} subtitle={item.job}
        leftAvatar={{
          source: item.avatar && {uri:item.avatar},
          // source: item.avatar && { uri: item.avatar },
          title: item.name[0]
        }}
        rightIcon={<Icon name='angle-right' type='font-awesome' size={30} color='#517fa4' />}
      />
  )
  // Since we have all keys in lowercase, so simpley converting array to JSON.lowercase will do the trick for casesenctive search/
  filterList = args => {
    if(!this.state.search || this.state.search.length<1) return clients;
    // converting values to lowercase for casesenctive search
    let search = this.state.search.toLowerCase();
    let _clients = JSON.stringify(clients).toLowerCase();
    _clients = JSON.parse(_clients);
    // running search loop
    return clients.filter((item, i) => {
      for(let a in item){
        if(a!=='avatar' && _clients[i][a].indexOf(search)>=0) return true;
        // if(a!=='avatar' && item[a].indexOf(this.state.search)>=0) return true;
      }
      return false;
    });
  }



  openContact = item => {
    this.setState({overlayvisible:true, selectedRec:item});
  }
  closeContact = args => {
    this.setState({overlayvisible:false, selectedRec:null});
  }

  showSearch = () => {
    this.setState({openSearch:true});
  }
  hideSearch = () => {
    this.setState({openSearch:false, search:""});
  }
  updateSearch = search => {
    this.setState({ search });
  }


  render() {
    const { overlayvisible, selectedRec, openSearch } = this.state;

    return (
      <View style={{flex: 1}}>

        {/* ************ Header *********** */}
        <View style={headerStyle.container}>
          {!openSearch &&
            <F>
              <View style={headerStyle.colAuto}><Text style={headerStyle.colText}>Client List</Text></View>
              <View style={headerStyle.colRight}>
                <TouchableOpacity style={headerStyle.searchButton} onPress={this.hideSearch}><Icon onPress={this.showSearch} name="search" color="#FFF" /></TouchableOpacity>
              </View>
            </F>
          }
          {openSearch &&
            <F>
              <View>
                <TouchableOpacity style={headerStyle.backButton} onPress={this.hideSearch}>
                  <Icon name='angle-left' type='font-awesome' size={30} color='#FFF' />
                </TouchableOpacity>
              </View>
              <View style={headerStyle.colAuto}>
                <SearchBar round
                  containerStyle={headerStyle.searchbar}
                  inputContainerStyle={headerStyle.searchbarInputContainer}
                  inputStyle={headerStyle.searchbarInput}
                  lightTheme={true}
                  placeholder="Search..."
                  value={this.state.search}
                  onChangeText={this.updateSearch} />
              </View>
            </F>
          }
        </View>


        {/* ************ Client Details *********** */}
        <Modal visible={overlayvisible} onClose={this.closeContact}>
          {selectedRec &&
            <View style={{textAlign: 'center', alignItems: 'center'}}>
              <Avatar rounded size="xlarge" title={selectedRec.name[0]}
                source={selectedRec.avatar ? {uri:selectedRec.avatar} : null} />
              <Text style={avatarStyle.name}>{selectedRec.name}</Text>
              <Text style={avatarStyle.job}>{selectedRec.job}</Text>
              <Text>at</Text>
              <Text style={avatarStyle.job}>{selectedRec.company}</Text>
              <View style={avatarStyle.details}>
                <Text>{selectedRec.phone}</Text>
                <Text>{selectedRec.email}</Text>
                <Text>{selectedRec.city}, {selectedRec.country}</Text>
              </View>
              {/* <CustomButton title="Close" style={{marginTop: 10}} onPress={this.closeContact} /> */}
            </View>
          }
        </Modal>


        {/* ************ Listing *********** */}
        <FlatList
          keyExtractor={this.keyExtractor}
          data={this.filterList()}
          renderItem={this.renderItem}
        />

      </View>
    );
  }
}
