/* eslint-disable react-native/no-inline-styles */
import React, {useCallback} from 'react';
import {
  StyleSheet,
  Modal,
  View,
  TouchableOpacity,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import colors from '../constants/colors';
import Icon from './Icon';
import AppText from './AppText';

const CallModal = ({visible, onClose, onPress, numbers}) => {
  const keyExtractor = useCallback(() => (e) => e.phone, []);
  const renderItem = ({item}) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
      }}>
      <Icon
        from="MaterialIcons"
        name="call"
        bgColor="#090446"
        color="#FEB95F"
      />
      <TouchableHighlight
        underlayColor={colors.light}
        style={{padding: 10, marginVertical: 3, flex: 1}}
        onPress={() => {
          onPress(item.phone);
        }}>
        <AppText>
          {item.phone} ({item.phoneOwner})
        </AppText>
      </TouchableHighlight>
    </View>
  );

  return (
    <>
      <Modal transparent={true} visible={visible} animationType="slide">
        <TouchableOpacity style={styles.container} onPress={onClose} />
        <View style={styles.card}>
          <View style={{alignItems: 'flex-end', padding: 10}}>
            <TouchableOpacity onPress={onClose}>
              <Icon
                from="AntDesign"
                name="close"
                bgColor="transparent"
                color={colors.primary}
                size={45}
              />
            </TouchableOpacity>
          </View>
          <View style={{padding: 20}}>
            <FlatList
              data={numbers}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default CallModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,.8)',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  card: {
    position: 'absolute',
    backgroundColor: colors.white,
    height: '50%',
    width: '100%',
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
