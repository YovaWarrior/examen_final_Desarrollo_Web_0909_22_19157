import React, { useEffect, useRef } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

const PhotoCard = ({ photo, onPress, index = 0 }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        delay: index * 50,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        delay: index * 50,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View 
      style={[
        styles.cardContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <TouchableOpacity onPress={() => onPress(photo)} activeOpacity={0.8}>
        <View style={styles.card}>
        <Image
          source={{ uri: photo.download_url }}
          style={styles.image}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.9)']}
          style={styles.gradient}
        >
          <View style={styles.infoContainer}>
            <Text style={styles.author} numberOfLines={1}>
              {photo.author}
            </Text>
            <View style={styles.dimensionsContainer}>
              <View style={styles.dimensionBadge}>
                <Text style={styles.dimensionText}>
                  {photo.width} × {photo.height}
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>
        
        {/* Futuristic corner accents */}
        <View style={styles.cornerTopLeft} />
        <View style={styles.cornerTopRight} />
        <View style={styles.cornerBottomLeft} />
        <View style={styles.cornerBottomRight} />
      </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: CARD_WIDTH,
    marginBottom: 16,
  },
  card: {
    height: 240,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#1a1a2e',
    borderWidth: 1,
    borderColor: '#00d4ff',
    shadowColor: '#00d4ff',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    justifyContent: 'flex-end',
    padding: 12,
  },
  infoContainer: {
    gap: 6,
  },
  author: {
    color: '#00d4ff',
    fontSize: 14,
    fontWeight: 'bold',
    textShadowColor: '#00d4ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  dimensionsContainer: {
    flexDirection: 'row',
  },
  dimensionBadge: {
    backgroundColor: 'rgba(0, 212, 255, 0.2)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#00d4ff',
  },
  dimensionText: {
    color: '#00d4ff',
    fontSize: 10,
    fontWeight: '600',
  },
  // Futuristic corner accents
  cornerTopLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 20,
    height: 20,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: '#ff00ff',
  },
  cornerTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 20,
    height: 20,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: '#ff00ff',
  },
  cornerBottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 20,
    height: 20,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderColor: '#ff00ff',
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: '#ff00ff',
  },
});

export default PhotoCard;
