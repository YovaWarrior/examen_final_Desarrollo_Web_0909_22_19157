import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Modal,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import PhotoCard from '../components/PhotoCard';
import PhotoDetailScreen from './PhotoDetailScreen';
import { fetchPhotos } from '../services/api';

const GalleryScreen = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async (pageNum = 1) => {
    try {
      setLoading(true);
      const data = await fetchPhotos(pageNum, 30);
      setPhotos(data);
      setPage(pageNum);
    } catch (error) {
      console.error('Error loading photos:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMorePhotos = async () => {
    if (loadingMore) return;
    
    try {
      setLoadingMore(true);
      const nextPage = page + 1;
      const data = await fetchPhotos(nextPage, 30);
      setPhotos([...photos, ...data]);
      setPage(nextPage);
    } catch (error) {
      console.error('Error loading more photos:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPhotos(1);
    setRefreshing(false);
  };

  const handlePhotoPress = (photo) => {
    setSelectedPhoto(photo);
  };

  const closeDetail = () => {
    setSelectedPhoto(null);
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>GALERÍA</Text>
      <Text style={styles.subtitle}>FUTURISTA</Text>
      <View style={styles.headerLine} />
      <Text style={styles.photoCount}>
        {photos.length} FOTOS CARGADAS
      </Text>
    </View>
  );

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="large" color="#00d4ff" />
      </View>
    );
  };

  if (loading) {
    return (
      <LinearGradient
        colors={['#0a0a1e', '#1a1a2e', '#16213e']}
        style={styles.loadingContainer}
      >
        <StatusBar style="light" />
        <View style={styles.loaderBox}>
          <ActivityIndicator size="large" color="#00d4ff" />
          <Text style={styles.loadingText}>Cargando Galería...</Text>
          <View style={styles.loadingLine} />
        </View>
      </LinearGradient>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['#0a0a1e', '#1a1a2e', '#16213e']}
        style={styles.gradient}
      >
        <SafeAreaView style={styles.safeArea}>
          <FlatList
            data={photos}
            renderItem={({ item, index }) => (
              <PhotoCard photo={item} onPress={handlePhotoPress} index={index} />
            )}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.listContent}
            ListHeaderComponent={renderHeader}
            ListFooterComponent={renderFooter}
            onEndReached={loadMorePhotos}
            onEndReachedThreshold={0.5}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="#00d4ff"
                colors={['#00d4ff', '#ff00ff']}
              />
            }
            showsVerticalScrollIndicator={true}
            nestedScrollEnabled={true}
          />
        </SafeAreaView>
      </LinearGradient>

      {/* Photo Detail Modal */}
      <Modal
        visible={selectedPhoto !== null}
        animationType="fade"
        onRequestClose={closeDetail}
      >
        {selectedPhoto && (
          <PhotoDetailScreen photo={selectedPhoto} onClose={closeDetail} />
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a1e',
    height: '100vh',
  },
  gradient: {
    flex: 1,
    height: '100%',
  },
  safeArea: {
    flex: 1,
    height: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderBox: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#00d4ff',
  },
  loadingText: {
    color: '#00d4ff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    letterSpacing: 2,
  },
  loadingLine: {
    width: 150,
    height: 3,
    backgroundColor: '#00d4ff',
    marginTop: 12,
    borderRadius: 2,
  },
  headerContainer: {
    paddingTop: 20,
    paddingBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#9df9ef',
    letterSpacing: 8,
    textShadowColor: '#9df9ef',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff00ff',
    letterSpacing: 6,
    marginTop: 4,
    textShadowColor: '#ff00ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  headerLine: {
    width: 100,
    height: 3,
    backgroundColor: '#00d4ff',
    marginTop: 12,
    marginBottom: 12,
  },
  photoCount: {
    color: '#888',
    fontSize: 12,
    letterSpacing: 2,
    fontWeight: 'bold',
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  row: {
    justifyContent: 'space-between',
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});

export default GalleryScreen;
