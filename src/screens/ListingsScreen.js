import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  View,
  StatusBar,
  ToastAndroid,
  Animated,
} from 'react-native';
import Screen from '../components/Screen';
import Card from '../components/Card';
import colors from '../constants/colors';
import AppActivityIndicator from '../components/AppActivityIndicator';
import CategoriesList from '../components/CategoriesList';
import {getAllProducts, getAllCategories} from '../helper/Api';
import url from '../helper/url';
import {useNetInfo} from '@react-native-community/netinfo';
import OfflineNotice from '../components/OfflineNotice';
const ListingsScreen = ({navigation}) => {
  const scrollY = useState(new Animated.Value(0))[0];
  const padding = useState(new Animated.Value(50))[0];
  const netInfo = useNetInfo();
  const scrollPos = useRef();
  const [activatedCategory, setActivatedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [productListings, setProductListings] = useState([]);
  const [productListingsTemp, setProductListingsTemp] = useState([]);
  const [categories, setCategories] = useState([
    {
      name: 'All',
      _id: Math.random() + 'Rana',
      imgUrl: undefined,
    },
  ]);
  const fetcAllProducts = async (loading, cb) => {
    try {
      if (loading) setIsLoading(true);
      const response = await getAllProducts();
      setIsLoading(false);
      if (response.success && response.products.length > 0) {
        setProductListingsTemp([...response.products]);
        setProductListings([...response.products]);
        cb();
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  const fetchAllCategories = async () => {
    try {
      const response = await getAllCategories();
      if (response.success) {
        setCategories([...categories, ...response.categories]);
        setActivatedCategory('All');
      }
    } catch (error) {}
  };
  const filterCategory = (filterName) => {
    if (filterName === 'All') {
      setProductListingsTemp([...productListings]);
      setActivatedCategory('All');
    } else {
      let all = [...productListings];
      all = all.filter((e) => e.category === filterName);
      setActivatedCategory(filterName);
      setProductListingsTemp([...all]);
    }
  };

  useEffect(() => {
    if (netInfo.type !== 'unknown' && netInfo.isInternetReachable === true) {
      let loading = true;
      fetchAllCategories();
      fetcAllProducts(loading, () => {
        ToastAndroid.show('Data updated successfully', ToastAndroid.SHORT);
      });
    }
  }, [netInfo]);
  useEffect(() => {
    let loading = true;
    fetcAllProducts(loading, () => {});
    fetchAllCategories();
  }, []);

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
      <OfflineNotice />
      <StatusBar backgroundColor={colors.light} barStyle={'dark-content'} />
      <Screen style={styles.screen}>
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
            {productListingsTemp.length > 0 ? (
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
                />
              </Animated.View>
            ) : (
              <>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.infoText}>No Design found</Text>
                  <TouchableOpacity
                    style={{marginVertical: 10}}
                    onPress={() => {
                      fetcAllProducts(true, () => {});
                      fetchAllCategories();
                    }}>
                    <Text style={{color: colors.primary}}>Refresh</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </>
        )}
      </Screen>
    </>
  );
};

export default ListingsScreen;

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
  screen: {
    paddingHorizontal: 10,
    flex: 1,
    backgroundColor: colors.light,
  },
  infoText: {
    fontSize: 20,
    textAlign: 'center',
  },
});
