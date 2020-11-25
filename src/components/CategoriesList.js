import React, {useRef} from 'react';

import {TouchableOpacity, ScrollView} from 'react-native';
import AppText from './AppText';
import colors from '../constants/colors';

const CategoriesList = ({activatedCategory, lists, onPress}) => {
  const scrollView = useRef();
  return (
    <>
      <ScrollView
        style={{}}
        ref={scrollView}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {lists.map((e, i) => {
          return (
            <TouchableOpacity
              key={i}
              style={{
                // borderWidth: 1,
                paddingHorizontal: 15,
                paddingVertical: 8,
                marginRight: 10,
                borderRadius: 10,
                // borderColor: colors.primary,
                justifyContent: 'center',
                backgroundColor:
                  activatedCategory === e.name ? '#2B3252' : null,
              }}
              onPress={() => {
                // if ((i + 1) % 3 == 0) {
                //   // scrollView.current.scrollToEnd({
                //     animated: true,
                //   });
                // }
                onPress(e.name);
              }}>
              <AppText
                style={{
                  fontWeight: 'bold',
                  fontSize: 16.5,
                  color:
                    activatedCategory === e.name
                      ? colors.light
                      : colors.primary,
                }}>
                {e.name}
              </AppText>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </>
  );
};

export default CategoriesList;
