import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useEthics } from '../context/EthicsContext';

const { width } = Dimensions.get('window');

const videoCategories = [
  { id: 'all', name: 'All Videos', color: '#1B365D' },
  { id: 'basics', name: 'Ethics Basics', color: '#A51C30' },
  { id: 'cases', name: 'Case Studies', color: '#059669' },
  { id: 'qa', name: 'Q&A Sessions', color: '#7C3AED' },
];

const sampleVideos = [
  {
    id: 'intro-ethics',
    title: 'Introduction to Ethics',
    description: 'A comprehensive overview of federal ethics principles and their importance in public service.',
    duration: '15:30',
    thumbnailUrl: 'https://via.placeholder.com/300x200/1B365D/FFFFFF?text=Ethics+Intro',
    videoUrl: 'https://example.com/video1.mp4',
    category: 'basics',
    views: 1250,
    rating: 4.8,
  },
  {
    id: 'conflict-case-study',
    title: 'Conflict of Interest Case Study',
    description: 'Real-world examples of conflict of interest situations and how to handle them properly.',
    duration: '22:15',
    thumbnailUrl: 'https://via.placeholder.com/300x200/A51C30/FFFFFF?text=Conflict+Cases',
    videoUrl: 'https://example.com/video2.mp4',
    category: 'cases',
    views: 890,
    rating: 4.6,
  },
  {
    id: 'gifts-gratuities',
    title: 'Gifts and Gratuities Guidelines',
    description: 'Understanding the rules and restrictions around accepting gifts in federal service.',
    duration: '18:45',
    thumbnailUrl: 'https://via.placeholder.com/300x200/059669/FFFFFF?text=Gifts+Rules',
    videoUrl: 'https://example.com/video3.mp4',
    category: 'basics',
    views: 675,
    rating: 4.7,
  },
  {
    id: 'qa-session-1',
    title: 'Ethics Q&A Session #1',
    description: 'Common questions and answers about federal ethics from real EPA employees.',
    duration: '35:20',
    thumbnailUrl: 'https://via.placeholder.com/300x200/7C3AED/FFFFFF?text=Q%26A+Session',
    videoUrl: 'https://example.com/video4.mp4',
    category: 'qa',
    views: 432,
    rating: 4.5,
  },
  {
    id: 'travel-expenses',
    title: 'Travel and Expenses Ethics',
    description: 'Guidelines for ethical handling of travel and expense reimbursements.',
    duration: '12:30',
    thumbnailUrl: 'https://via.placeholder.com/300x200/F59E0B/FFFFFF?text=Travel+Ethics',
    videoUrl: 'https://example.com/video5.mp4',
    category: 'basics',
    views: 789,
    rating: 4.4,
  },
  {
    id: 'outside-employment',
    title: 'Outside Employment Rules',
    description: 'What you need to know about outside employment and activities as a federal employee.',
    duration: '20:15',
    thumbnailUrl: 'https://via.placeholder.com/300x200/EF4444/FFFFFF?text=Employment+Rules',
    videoUrl: 'https://example.com/video6.mp4',
    category: 'cases',
    views: 543,
    rating: 4.9,
  },
];

export default function VideosScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVideos = sampleVideos.filter(video => {
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleVideoPress = (video: any) => {
    Alert.alert(
      video.title,
      'This is a demonstration. In the full app, this would open the video player.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Play Video', onPress: () => console.log('Playing video:', video.id) },
      ]
    );
  };

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#64748B" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search videos..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#94A3B8"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#64748B" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Category Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}
        contentContainerStyle={styles.categoryContent}
      >
        {videoCategories.map((category) => {
          const isSelected = selectedCategory === category.id;
          return (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                isSelected && [styles.categoryButtonSelected, { backgroundColor: category.color }],
              ]}
              onPress={() => setSelectedCategory(category.id)}
              accessibilityLabel={`Filter by ${category.name}`}
              accessibilityRole="button"
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  isSelected && styles.categoryButtonTextSelected,
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Videos List */}
      <ScrollView style={styles.videosContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.videosHeader}>
          <Text style={styles.videosTitle}>Training Videos</Text>
          <Text style={styles.videosCount}>
            {filteredVideos.length} video{filteredVideos.length !== 1 ? 's' : ''}
          </Text>
        </View>

        {filteredVideos.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="videocam-off" size={64} color="#CBD5E1" />
            <Text style={styles.emptyStateTitle}>No Videos Found</Text>
            <Text style={styles.emptyStateText}>
              Try adjusting your search or category filter
            </Text>
          </View>
        ) : (
          <View style={styles.videosList}>
            {filteredVideos.map((video) => (
              <TouchableOpacity
                key={video.id}
                style={styles.videoCard}
                onPress={() => handleVideoPress(video)}
                accessibilityLabel={`Play ${video.title}`}
                accessibilityRole="button"
              >
                <View style={styles.videoThumbnailContainer}>
                  <Image
                    source={{ uri: video.thumbnailUrl }}
                    style={styles.videoThumbnail}
                    resizeMode="cover"
                  />
                  <LinearGradient
                    colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
                    style={styles.videoOverlay}
                  >
                    <View style={styles.playButton}>
                      <Ionicons name="play" size={20} color="white" />
                    </View>
                    <Text style={styles.videoDuration}>{video.duration}</Text>
                  </LinearGradient>
                </View>

                <View style={styles.videoInfo}>
                  <Text style={styles.videoTitle} numberOfLines={2}>
                    {video.title}
                  </Text>
                  <Text style={styles.videoDescription} numberOfLines={2}>
                    {video.description}
                  </Text>
                  
                  <View style={styles.videoMeta}>
                    <View style={styles.videoStats}>
                      <View style={styles.videoStat}>
                        <Ionicons name="eye" size={14} color="#64748B" />
                        <Text style={styles.videoStatText}>{formatViews(video.views)} views</Text>
                      </View>
                      <View style={styles.videoStat}>
                        <Ionicons name="star" size={14} color="#F59E0B" />
                        <Text style={styles.videoStatText}>Rating: {video.rating}</Text>
                      </View>
                    </View>
                    
                    <View style={styles.videoCategoryBadge}>
                      <Text style={styles.videoCategoryText}>
                        {videoCategories.find(cat => cat.id === video.category)?.name || 'General'}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Video Library Info */}
        <View style={styles.libraryInfoCard}>
          <LinearGradient
            colors={['#EBF4FF', '#DBEAFE']}
            style={styles.libraryInfoGradient}
          >
            <Ionicons name="information-circle" size={24} color="#3B82F6" />
            <Text style={styles.libraryInfoTitle}>About Training Videos</Text>
            <Text style={styles.libraryInfoText}>
              Our comprehensive video library covers all aspects of federal ethics. 
              New content is added regularly based on current regulations and common questions.
            </Text>
          </LinearGradient>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1E293B',
  },
  categoryContainer: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  categoryContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  categoryButtonSelected: {
    borderColor: 'transparent',
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
  },
  categoryButtonTextSelected: {
    color: 'white',
  },
  videosContainer: {
    flex: 1,
  },
  videosHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  videosTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  videosCount: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#64748B',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 24,
  },
  videosList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  videoCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  videoThumbnailContainer: {
    position: 'relative',
    height: 200,
  },
  videoThumbnail: {
    width: '100%',
    height: '100%',
  },
  videoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 'auto',
    marginTop: 'auto',
  },
  videoDuration: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  videoInfo: {
    padding: 20,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
    lineHeight: 24,
  },
  videoDescription: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
    marginBottom: 16,
  },
  videoMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  videoStats: {
    flexDirection: 'row',
    gap: 16,
  },
  videoStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  videoStatText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  videoCategoryBadge: {
    backgroundColor: '#EBF4FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  videoCategoryText: {
    fontSize: 12,
    color: '#3B82F6',
    fontWeight: '600',
  },
  libraryInfoCard: {
    marginHorizontal: 20,
    marginBottom: 32,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  libraryInfoGradient: {
    padding: 20,
    alignItems: 'center',
  },
  libraryInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E40AF',
    marginTop: 8,
    marginBottom: 8,
    textAlign: 'center',
  },
  libraryInfoText: {
    fontSize: 14,
    color: '#3730A3',
    textAlign: 'center',
    lineHeight: 20,
  },
});