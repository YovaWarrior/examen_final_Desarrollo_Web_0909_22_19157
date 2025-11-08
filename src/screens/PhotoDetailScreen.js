import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');

const PhotoDetailScreen = ({ photo, onClose }) => {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={{ uri: photo.download_url }}
        style={styles.backgroundImage}
        blurRadius={20}
      />
      <LinearGradient
        colors={['rgba(0,0,0,0.8)', 'rgba(26,26,46,0.95)', 'rgba(0,0,0,0.9)']}
        style={styles.overlay}
      >
        <SafeAreaView style={styles.safeArea}>
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <LinearGradient
                  colors={['#00d4ff', '#0080ff']}
                  style={styles.closeButtonGradient}
                >
                  <Text style={styles.closeButtonText}>✕</Text>
                </LinearGradient>
              </TouchableOpacity>
              <Text style={styles.title}>PHOTO DETAILS</Text>
            </View>

            {/* Main Image */}
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: photo.download_url }}
                style={styles.mainImage}
                resizeMode="contain"
              />
              <View style={styles.imageFrameTopLeft} />
              <View style={styles.imageFrameTopRight} />
              <View style={styles.imageFrameBottomLeft} />
              <View style={styles.imageFrameBottomRight} />
            </View>

            {/* Info Grid */}
            <View style={styles.infoGrid}>
              <InfoCard
                label="AUTHOR"
                value={photo.author}
                icon="👤"
                color="#00d4ff"
              />
              <InfoCard
                label="ID"
                value={`#${photo.id}`}
                icon="🆔"
                color="#ff00ff"
              />
              <InfoCard
                label="WIDTH"
                value={`${photo.width}px`}
                icon="↔️"
                color="#00ff88"
              />
              <InfoCard
                label="HEIGHT"
                value={`${photo.height}px`}
                icon="↕️"
                color="#ffaa00"
              />
            </View>

            {/* URL Section */}
            <View style={styles.urlContainer}>
              <Text style={styles.urlLabel}>ORIGINAL URL</Text>
              <View style={styles.urlBox}>
                <Text style={styles.urlText} numberOfLines={2}>
                  {photo.url}
                </Text>
              </View>
            </View>

            {/* Download URL Section */}
            <View style={styles.urlContainer}>
              <Text style={styles.urlLabel}>DOWNLOAD URL</Text>
              <View style={styles.urlBox}>
                <Text style={styles.urlText} numberOfLines={2}>
                  {photo.download_url}
                </Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

const InfoCard = ({ label, value, icon, color }) => (
  <View style={styles.infoCard}>
    <LinearGradient
      colors={['rgba(0,0,0,0.6)', 'rgba(26,26,46,0.8)']}
      style={styles.infoCardGradient}
    >
      <Text style={styles.infoIcon}>{icon}</Text>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={[styles.infoValue, { color }]}>{value}</Text>
      <View style={[styles.infoAccent, { backgroundColor: color }]} />
    </LinearGradient>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundImage: {
    position: 'absolute',
    width: width,
    height: height,
  },
  overlay: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  closeButton: {
    marginRight: 16,
  },
  closeButtonGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00d4ff',
    letterSpacing: 4,
    textShadowColor: '#00d4ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  imageContainer: {
    height: 300,
    marginBottom: 32,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'relative',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  imageFrameTopLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 40,
    height: 40,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: '#00d4ff',
  },
  imageFrameTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 40,
    height: 40,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: '#ff00ff',
  },
  imageFrameBottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 40,
    height: 40,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderColor: '#00ff88',
  },
  imageFrameBottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: '#ffaa00',
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  infoCard: {
    width: '48%',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#00d4ff',
  },
  infoCardGradient: {
    padding: 16,
    alignItems: 'center',
    minHeight: 120,
    justifyContent: 'center',
  },
  infoIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  infoLabel: {
    color: '#888',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 6,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoAccent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
  },
  urlContainer: {
    marginBottom: 20,
  },
  urlLabel: {
    color: '#00d4ff',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 8,
  },
  urlBox: {
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#00d4ff',
  },
  urlText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'monospace',
  },
});

export default PhotoDetailScreen;
