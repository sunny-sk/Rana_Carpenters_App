// Rn imports
import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  View,
  Animated,
  RefreshControl,
} from 'react-native';

//custom import
import Card from '../../components/Card';
import AppActivityIndicator from '../../components/AppActivityIndicator';
import CategoriesList from '../../components/CategoriesList';
import url from '../../helper/url';
import colors from '../../constants/colors';

const ListingsScreenView = ({
  isLoading,
  productListingsTemp,
  onRefreshClick,
  onSwipeDownRefresh,
  activatedCategory,
  categories,
  filterCategory,
  navigation,
}) => {
  const scrollY = useState(new Animated.Value(0))[0];
  const padding = useState(new Animated.Value(50))[0];
  const scrollPos = useRef();
  const animate = (value) => {
    Animated.timing(scrollY, {
      toValue: value,
      duration: 200,
      useNativeDriver: false,
    }).start();
    Animated.timing(padding, {
      toValue: 50,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };
  const diffClamp = Animated.diffClamp(scrollY, 0, 50);
  const diffClam1 = Animated.diffClamp(scrollY, 0, 50);
  let translateY = diffClamp.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -50],
  });
  let paddingY = diffClam1.interpolate({
    inputRange: [0, 50],
    outputRange: [50, 0],
  });
  return (
    <>
      {isLoading ? (
        <AppActivityIndicator visible={true} />
      ) : (
        <>
          <Animated.View
            style={{
              ...styles.categoryContainer,
              // position: 'absolute',
              // borderWidth: 1,
              // top: 6,
              // top: scrollY,
              transform: [{translateY: translateY}],
              transform: [{translateY: 0}],
            }}>
            <View>
              <CategoriesList
                activatedCategory={activatedCategory}
                lists={categories}
                onPress={(e) => {
                  filterCategory(e);
                }}
              />
            </View>
          </Animated.View>
          {productListingsTemp && productListingsTemp.length > 0 ? (
            // <Animated.View style={{paddingTop: paddingY}}>
            <Animated.View style={{flex: 1}}>
              <FlatList
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                onScroll={(e) => {
                  animate(e.nativeEvent.contentOffset.y);
                }}
                ref={scrollPos}
                data={productListingsTemp}
                keyExtractor={(list) => list._id + Math.random().toString()}
                renderItem={({item}) => {
                  return (
                    <Card
                      onPress={() =>
                        navigation.navigate('listingDetails', item)
                      }
                      title={item.title}
                      item={item}
                      imgUrl={url._imageBase + item.imgUrl}
                      subTitle={item.description}
                    />
                  );
                }}
                refreshControl={
                  <RefreshControl
                    refreshing={isLoading}
                    onRefresh={onSwipeDownRefresh}
                  />
                }
              />
            </Animated.View>
          ) : productListingsTemp &&
            productListingsTemp.length === 0 &&
            activatedCategory ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.infoText}>
                No Design found With this category
              </Text>
              <TouchableOpacity
                style={{marginVertical: 10}}
                onPress={onRefreshClick}>
                <Text style={{color: colors.primary}}>Refresh</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.infoText}>No Design found</Text>
              <TouchableOpacity
                style={{marginVertical: 10}}
                onPress={onRefreshClick}>
                <Text style={{color: colors.primary}}>Refresh</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </>
  );
};

export default ListingsScreenView;
const styles = StyleSheet.create({
  categoryContainer: {
    height: 50,
    marginBottom: 5,
    zIndex: 10,
    backgroundColor: 'white',
    right: 0,
    backgroundColor: colors.light,
    left: 0,
    paddingHorizontal: 6,
    justifyContent: 'center',
  },

  infoText: {
    fontSize: 20,
    textAlign: 'center',
  },
});
