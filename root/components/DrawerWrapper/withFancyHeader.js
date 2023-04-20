import React, { useContext } from 'react';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { Text, View } from 'react-native';
import { UIELEMENTS } from '@/constants/index';
import { useDrawerProgress } from '@react-navigation/drawer';
import styles from './styles';

export function withFancyDrawer(Component) {
    function Wrapper({ children }) {
    const drawerProgress = useDrawerProgress();
    const animatedStyle_container = useAnimatedStyle(() => {
      const scale = interpolate(drawerProgress.value, [0, 1], [1, 0.8], {
        extrapolateRight: Extrapolate.CLAMP,
      });
      const translate = interpolate(drawerProgress.value, [0, 1], [0, 20], {
        extrapolateRight: Extrapolate.CLAMP,
      });
      return {
        transform: [{translateX: translate},{scale}]
      }
    })
    const animatedStyle_card = useAnimatedStyle(() => {
      const translate = interpolate(drawerProgress.value, [0, 0.5, 1], [0, 0, -50], {
        extrapolateRight: Extrapolate.CLAMP,
      });
      return {
        transform: [{translateX: translate},{scale:0.9}]
      }
    })
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: UIELEMENTS.DEFAULT_BACKGROUND_COLOR,
        }}>
        <Animated.View
          style={[styles.transitionContainer, animatedStyle_container]}
        >
          <Animated.View
            style={[styles.transparentCard, animatedStyle_card]}
          />
          <View style={styles.card}>{children}</View>
        </Animated.View>
      </View>
    );
  }
  return props => (
    <Wrapper>
      <Component {...props} />
    </Wrapper>
  );
}
