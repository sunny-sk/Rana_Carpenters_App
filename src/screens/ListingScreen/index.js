// Rn imports
import React, {useEffect, useState} from 'react';
import {StyleSheet, StatusBar, Text, ToastAndroid} from 'react-native';

//third party libs
import Snackbar from 'react-native-snackbar';
import {useNetInfo} from '@react-native-community/netinfo';

//custom imports
import Screen from '../../components/Screen';
import ListingsScreenView from './ListingsScreenView';
import {shuffle} from '../../helper/HelperMethods';
import {getAllProducts, getAllCategories} from '../../helper/Api';
import colors from '../../constants/colors';
// import OfflineNotice from '../components/OfflineNotice';

const ListingsScreen = ({navigation}) => {
  const netInfo = useNetInfo();

  const [activatedCategory, setActivatedCategory] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [productListings, setProductListings] = useState([]);
  const [productListingsTemp, setProductListingsTemp] = useState([]);

  const [categories, setCategories] = useState([]);

  const fetcAllProducts = async (loading, cb) => {
    try {
      if (loading) setIsLoading(true);
      const response = await getAllProducts();
      setIsLoading(false);
      if (response.success && response.products.length > 0) {
        setProductListingsTemp(shuffle([...response.products]));
        setProductListings(shuffle([...response.products]));
      }
      cb();
    } catch (error) {
      setIsLoading(false);
      if (
        (netInfo.type === 'unknown' || netInfo.type !== 'unknown') &&
        netInfo.isInternetReachable === false
      ) {
        Snackbar.show({
          text: 'No Internet connection.',
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: 'black',
          action: {
            text: 'close',
            textColor: 'green',
            onPress: () => Snackbar.dismiss(),
          },
        });
      } else {
        Snackbar.show({
          text: 'Try again Later',
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: 'black',
          action: {
            text: 'close',
            textColor: 'green',
            onPress: () => Snackbar.dismiss(),
          },
        });
      }
      cb();
    }
  };
  const fetchAllCategories = async () => {
    try {
      const response = await getAllCategories();
      if (response.success) {
        setCategories([
          {
            name: 'All',
            _id: Math.random() + 'Rana',
            imgUrl: undefined,
          },

          ...response.categories,
        ]);
        setActivatedCategory('All');
      }
    } catch (error) {
      setActivatedCategory('All');
      filterCategory('All');
    }
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
    let loading = true;
    fetchAllCategories();
    fetcAllProducts(loading, () => {
      ToastAndroid.show('List updated successfully', ToastAndroid.SHORT);
    });
  }, []);

  // useEffect(() => {
  //   if (netInfo.type !== 'unknown' && netInfo.isInternetReachable === true) {
  //     let loading = true;
  //     fetchAllCategories();
  //     fetcAllProducts(loading, () => {
  //       ToastAndroid.show('Data updated successfully', ToastAndroid.SHORT);
  //     });
  //   }
  // }, []);

  return (
    <>
      <StatusBar backgroundColor={colors.light} barStyle={'dark-content'} />
      <Screen style={styles.screen}>
        <ListingsScreenView
          navigation={navigation}
          isLoading={isLoading}
          productListingsTemp={productListingsTemp}
          activatedCategory={activatedCategory}
          categories={categories}
          onSwipeDownRefresh={() => {
            fetcAllProducts(false, () => {
              fetchAllCategories();
            });
            console.log('clicked');
          }}
          onRefreshClick={() => {
            fetcAllProducts(true, () => {});
            fetchAllCategories();
          }}
          filterCategory={(e) => {
            filterCategory(e);
          }}
        />
      </Screen>
    </>
  );
};

export default ListingsScreen;

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 10,
    flex: 1,
    backgroundColor: colors.light,
  },
});
