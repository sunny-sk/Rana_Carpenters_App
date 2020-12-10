/* eslint-disable react-native/no-inline-styles */
// Rn imports
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  View,
  Animated,
  RefreshControl,
  StatusBar,
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
  const renderProductList = ({item}) => (
    <Card
      onPress={() => navigation.navigate('listingDetails', item)}
      title={item.title}
      item={item}
      imgUrl={url._imageBase + item.imgUrl}
      subTitle={item.description}
    />
  );

  return (
    <>
      <StatusBar backgroundColor={colors.light} barStyle="dark-content" />
      {isLoading ? (
        <AppActivityIndicator visible={true} />
      ) : (
        <>
          <Animated.View
            style={{
              ...styles.categoryContainer,
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
            <Animated.View style={{flex: 1}}>
              <FlatList
                getItemLayout={(data, index) => ({
                  length: 310,
                  offset: 310 * index,
                  index,
                })}
                keyboardShouldPersistTaps="always"
                initialNumToRender={10}
                removeClippedSubviews={true}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                data={productListingsTemp}
                keyExtractor={(list) => list._id + Math.random().toString()}
                renderItem={renderProductList}
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
            <View style={styles.center}>
              <Text style={styles.infoText}>No Design found</Text>
              <TouchableOpacity
                style={{marginVertical: 10}}
                onPress={onRefreshClick}>
                <Text style={{color: colors.primary}}>Refresh</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.center}>
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

export default React.memo(ListingsScreenView);
const styles = StyleSheet.create({
  categoryContainer: {
    height: 50,
    marginBottom: 5,
    zIndex: 10,
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
