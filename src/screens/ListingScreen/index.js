/* eslint-disable react-hooks/exhaustive-deps */
// Rn imports
import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
//third party libs
import Snackbar from 'react-native-snackbar';

//custom imports
import { Screen } from '../../components';
import colors from '../../constants/colors';
import { getAllCategories, getAllProducts } from '../../helper/Api';
import ListingsScreenView from './ListingsScreenView';

const ListingsScreen = ({ navigation, ...props }) => {
  const [activatedCategory, setActivatedCategory] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [productListings, setProductListings] = useState([]);
  const [productListingsTemp, setProductListingsTemp] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetcAllProducts = async (loading, cb) => {
    try {
      if (loading) {
        setIsLoading(true);
      }
      const response = await getAllProducts();
      setIsLoading(false);
      if (response.success && response.products.length > 0) {
        setProductListingsTemp([...response.products]);
        setProductListings([...response.products]);
      }
      cb();
    } catch (error) {
      setIsLoading(false);
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
    setActivatedCategory(filterName === 'All' ? 'All' : filterName);
    if (filterName === 'All') {
      setProductListingsTemp([...productListings]);
    } else {
      setProductListingsTemp([
        ...productListings.filter((e) => e.category === filterName),
      ]);
    }
  };

  useEffect(() => {
    let loading = true;
    fetchAllCategories();
    fetcAllProducts(loading, () => {
      // ToastAndroid.show('List updated successfully', ToastAndroid.SHORT);
    });
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      // The screen is focused
      try {
        const response = await getAllProducts();
        if (response.success && response.products.length > 0) {
          setProductListingsTemp([...response.products]);
          setProductListings([...response.products]);
        }
      } catch (error) {
        //nothing to do
      }
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <>
      <StatusBar backgroundColor={colors.light} barStyle={'dark-content'} />
      <Screen style={styles.screen}>
        <ListingsScreenView
          {...props}
          navigation={navigation}
          isLoading={isLoading}
          productListingsTemp={productListingsTemp}
          activatedCategory={activatedCategory}
          categories={categories}
          onSwipeDownRefresh={() => {
            fetcAllProducts(false, () => {
              fetchAllCategories();
            });
            // console.log('clicked');
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
