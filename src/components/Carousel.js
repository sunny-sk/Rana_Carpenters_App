/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  FlatList,
  Animated,
  View,
  TouchableOpacity,
} from 'react-native';
import CarouselItem from './CarouselItem';
import colors from '../constants/colors';
import Icon from './Icon';
import url from '../helper/url';
const WIDTH = Dimensions.get('screen').width;

const Carousel = ({images = [], ...props}) => {
  const scrollX = new Animated.Value(0);
  let position = Animated.divide(scrollX, WIDTH);
  let scrollView = useRef();
  const [scrollValue, setScrollValue] = useState(0);
  const [scrolled, setScrolled] = useState(0);
  const swipRight = () => {
    if (scrollValue < images.length - 1) {
      let p = scrolled + WIDTH;
      setScrolled(p);
      setScrollValue(scrollValue + 1);
      scrollView.current.scrollToOffset({Animated: true, offset: p});
    }
  };
  const swipLeft = () => {
    if (scrollValue > 0) {
      let p = scrolled - WIDTH;
      setScrolled(p);
      setScrollValue(scrollValue - 1);
      scrollView.current.scrollToOffset({Animated: true, offset: p});
    }
  };

  const renderCaroselItem = ({item}) => {
    return (
      <>
        <CarouselItem {...props} imageUrl={url._inventoryBase + item.imgUrl} />
      </>
    );
  };

  return (
    <View style={styles.container}>
      {images.length > 0 ? (
        <FlatList
          ref={scrollView}
          horizontal
          pagingEnabled
          scrollEnabled
          snapToAlignment="center"
          scrollEventThrottle={16}
          decelerationRate={'fast'}
          showsHorizontalScrollIndicator={false}
          data={images}
          keyExtractor={(list) => list._id + Math.random.toString()}
          renderItem={renderCaroselItem}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
        />
      ) : (
        <CarouselItem imageUrl={undefined} />
      )}

      {images.length > 1 && (
        <>
          <View style={{position: 'absolute', right: 0}}>
            <TouchableOpacity onPress={swipRight}>
              <Icon
                from="AntDesign"
                name="right"
                bgColor="transparent"
                color={colors.primary2}
                size={55}
              />
            </TouchableOpacity>
          </View>
          <View style={{position: 'absolute', left: 0}}>
            <TouchableOpacity onPress={swipLeft}>
              <Icon
                from="AntDesign"
                name="left"
                bgColor="transparent"
                color={colors.primary2}
                size={55}
              />
            </TouchableOpacity>
          </View>
        </>
      )}
      <View style={styles.dotContainer}>
        {images.map((_, i) => {
          let opacity = position.interpolate({
            inputRange: [i - 1, i, i + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={Math.random().toString() + _.id}
              style={{
                opacity,
                ...styles.dot,
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 8,
    width: 8,
    backgroundColor: colors.primary2,
    marginLeft: 8,
    borderRadius: 5,
  },
});
