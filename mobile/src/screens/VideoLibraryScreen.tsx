import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  AccessibilityInfo,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { sampleVideoLibrary } from '../data/sampleEthicsContent';

const { width } = Dimensions.get('window');

interface TrainingVideo {
  id: string;
  title: string;
  description: string;
  duration: string;
  url: string;
  category: string;
  transcript: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  releaseDate?: string;
  isNew?: boolean;
}

// Enhanced sample video library with demo content
const trainingVideos: TrainingVideo[] = [
  ...sampleVideoLibrary.map(video => ({
    ...video,
    difficulty: 'Beginner' as const,
    releaseDate: '2024-01-15',
    isNew: video.id === '1'
  })),
  {
    id: '4',
    title: 'Outside Employment and Activities',
    description: 'Rules and approval processes for external employment and speaking engagements.',
    duration: '18:15',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'outside-activities',
    difficulty: 'Advanced',
    releaseDate: '2023-12-20',
    transcript: 'Federal employees must carefully consider outside activities that could conflict with their official duties...',
  },
  {
    id: '5',
    title: 'Post-Employment Restrictions',
    description: 'Understanding the limitations that apply after leaving federal service.',
    duration: '16:45',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'post-employment',
    difficulty: 'Advanced',
    releaseDate: '2023-12-15',
    transcript: 'Former federal employees face several restrictions on their subsequent employment...',
  },
  {
    id: '6',
    title: 'Scientific Integrity at EPA',
    description: 'Maintaining scientific integrity and independence in environmental research.',
    duration: '14:30',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'scientific-integrity',
    difficulty: 'Intermediate',
    releaseDate: '2024-01-12',
    transcript: 'Scientific integrity is fundamental to EPA\'s mission and public trust...',
    isNew: true,
  },
  {
    id: '7',
    title: 'Whistleblower Protections',
    description: 'Understanding your rights and protections when reporting misconduct.',
    duration: '20:45',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'whistleblower',
    difficulty: 'Intermediate',
    releaseDate: '2024-01-08',
    transcript: 'Federal employees have important protections when reporting violations...',
  },
  {
    id: '8',
    title: 'Ethics Case Studies',
    description: 'Real-world scenarios and how ethics principles apply in practice.',
    duration: '22:30',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'case-studies',
    difficulty: 'Intermediate',
    releaseDate: '2023-12-10',
    transcript: 'Let\'s examine several real-world ethics scenarios and how to handle them properly...',
  },
];

const categories = [
  'All', 
  'overview', 
  'conflicts', 
  'gifts', 
  'outside-activities', 
  'post-employment', 
  'scientific-integrity', 
  'whistleblower', 
  'case-studies'
];

const getCategoryDisplayName = (category: string) => {
  const displayNames: { [key: string]: string } = {
    'All': 'All Videos',
    'overview': 'Ethics Overview',
    'conflicts': 'Conflicts of Interest',
    'gifts': 'Gifts & Travel',
    'outside-activities': 'Outside Activities',
    'post-employment': 'Post-Employment',
    'scientific-integrity': 'Scientific Integrity',
    'whistleblower': 'Whistleblower Protection',
    'case-studies': 'Case Studies'
  };
  return displayNames[category] || category;
};

const VideoLibraryScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedVideo, setSelectedVideo] = useState<TrainingVideo | null>(null);

  const filteredVideos = selectedCategory === 'All' 
    ? trainingVideos 
    : trainingVideos.filter(video => video.category === selectedCategory);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    AccessibilityInfo.announceForAccessibility(`Filtered videos by ${category}`);
  };

  const handleVideoSelect = (video: TrainingVideo) => {
    setSelectedVideo(video);
    AccessibilityInfo.announceForAccessibility(`Playing ${video.title}`);
  };

  const handleBackToLibrary = () => {
    setSelectedVideo(null);
    AccessibilityInfo.announceForAccessibility('Returned to video library');
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'Beginner':
        return '#28A745';
      case 'Intermediate':
        return '#FFC107';
      case 'Advanced':
        return '#DC3545';
      default:
        return '#6C757D';
    }
  };

  if (selectedVideo) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.videoHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackToLibrary}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Back to video library"
            accessibilityHint="Returns to the video library list"
          >
            <Ionicons name="arrow-back" size={24} color="#0066CC" />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.videoContainer}>
          {/* Video Player Placeholder */}
          <View style={styles.videoPlayerPlaceholder}>
            <Ionicons name="play-circle" size={80} color="#FFFFFF" />
            <Text style={styles.videoPlayerText}>Video Player</Text>
            <Text style={styles.videoPlayerSubtext}>
              {selectedVideo.title} • {selectedVideo.duration}
            </Text>
          </View>

          {/* Video Details */}
          <View style={styles.videoDetails}>
            <View style={styles.videoTitleRow}>
              <Text style={styles.videoTitle}>{selectedVideo.title}</Text>
              {selectedVideo.isNew && (
                <View style={styles.newBadge}>
                  <Text style={styles.newBadgeText}>NEW</Text>
                </View>
              )}
            </View>
            
            <View style={styles.videoMeta}>
              <View style={styles.metaItem}>
                <Ionicons name="time-outline" size={16} color="#666666" />
                <Text style={styles.metaText}>{selectedVideo.duration}</Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons name="bookmark-outline" size={16} color="#666666" />
                <Text style={styles.metaText}>{getCategoryDisplayName(selectedVideo.category)}</Text>
              </View>
              {selectedVideo.difficulty && (
                <View style={styles.metaItem}>
                  <View style={[styles.difficultyDot, { backgroundColor: getDifficultyColor(selectedVideo.difficulty) }]} />
                  <Text style={styles.metaText}>{selectedVideo.difficulty}</Text>
                </View>
              )}
            </View>

            <Text style={styles.videoDescription}>{selectedVideo.description}</Text>

            {/* Accessibility Features */}
            <View style={styles.accessibilitySection}>
              <Text style={styles.sectionTitle}>Accessibility Features</Text>
              <View style={styles.accessibilityOptions}>
                <TouchableOpacity
                  style={styles.accessibilityOption}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel="Show closed captions"
                >
                  <Ionicons name="text-outline" size={20} color="#0066CC" />
                  <Text style={styles.accessibilityOptionText}>Closed Captions</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.accessibilityOption}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel="View transcript"
                >
                  <Ionicons name="document-text-outline" size={20} color="#0066CC" />
                  <Text style={styles.accessibilityOptionText}>Transcript</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.accessibilityOption}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel="Audio description"
                >
                  <Ionicons name="volume-high-outline" size={20} color="#0066CC" />
                  <Text style={styles.accessibilityOptionText}>Audio Description</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Video Controls */}
            <View style={styles.controlsSection}>
              <Text style={styles.sectionTitle}>Playback Options</Text>
              <View style={styles.controls}>
                <TouchableOpacity
                  style={styles.controlButton}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel="Adjust playback speed"
                >
                  <Ionicons name="speedometer-outline" size={20} color="#0066CC" />
                  <Text style={styles.controlButtonText}>Speed: 1x</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.controlButton}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel="Download for offline viewing"
                >
                  <Ionicons name="download-outline" size={20} color="#0066CC" />
                  <Text style={styles.controlButtonText}>Download</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Training Videos</Text>
          <Text style={styles.headerDescription}>
            Watch whiteboard training sessions covering key ethics topics
          </Text>
        </View>

        {/* Category Filter */}
        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Categories</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoryScrollView}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.categoryButtonActive
                ]}
                onPress={() => handleCategorySelect(category)}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel={`Filter by ${category}`}
                accessibilityState={{ selected: selectedCategory === category }}
              >
                <Text style={[
                  styles.categoryButtonText,
                  selectedCategory === category && styles.categoryButtonTextActive
                ]}>
                  {getCategoryDisplayName(category)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Video Grid */}
        <View style={styles.videoGrid}>
          {filteredVideos.map((video) => (
            <TouchableOpacity
              key={video.id}
              style={styles.videoCard}
              onPress={() => handleVideoSelect(video)}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={`${video.title}. Duration: ${video.duration}${video.difficulty ? `. ${video.difficulty} level` : ''}.`}
              accessibilityHint={video.description}
            >
              {/* Video Thumbnail */}
              <View style={styles.videoThumbnail}>
                <Ionicons name="play-circle" size={40} color="#FFFFFF" />
                <View style={styles.videoDuration}>
                  <Text style={styles.videoDurationText}>{video.duration}</Text>
                </View>
                {video.isNew && (
                  <View style={styles.newIndicator}>
                    <Text style={styles.newIndicatorText}>NEW</Text>
                  </View>
                )}
              </View>

              {/* Video Info */}
              <View style={styles.videoInfo}>
                <Text style={styles.videoCardTitle} numberOfLines={2}>
                  {video.title}
                </Text>
                <Text style={styles.videoCardDescription} numberOfLines={2}>
                  {video.description}
                </Text>
                
                <View style={styles.videoCardMeta}>
                  <Text style={styles.videoCardCategory}>{getCategoryDisplayName(video.category)}</Text>
                  {video.difficulty && (
                    <View style={styles.videoCardDifficulty}>
                      <View style={[styles.difficultyDot, { backgroundColor: getDifficultyColor(video.difficulty) }]} />
                      <Text style={styles.difficultyText}>{video.difficulty}</Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Accessibility Notice */}
        <View style={styles.accessibilityNotice}>
          <Ionicons name="accessibility-outline" size={20} color="#0066CC" />
          <Text style={styles.accessibilityNoticeText}>
            All videos include closed captions, transcripts, and audio descriptions for full accessibility.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  headerDescription: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
  },
  filterSection: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
  },
  categoryScrollView: {
    flexDirection: 'row',
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: '#F8F9FA',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  categoryButtonActive: {
    backgroundColor: '#0066CC',
    borderColor: '#0066CC',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  categoryButtonTextActive: {
    color: '#FFFFFF',
  },
  videoGrid: {
    padding: 20,
    paddingTop: 0,
  },
  videoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    overflow: 'hidden',
  },
  videoThumbnail: {
    height: 180,
    backgroundColor: '#0066CC',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  videoDuration: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  videoDurationText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  newIndicator: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#DC3545',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  newIndicatorText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  videoInfo: {
    padding: 16,
  },
  videoCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
    lineHeight: 22,
  },
  videoCardDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 12,
  },
  videoCardMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  videoCardCategory: {
    fontSize: 12,
    color: '#0066CC',
    fontWeight: '500',
  },
  videoCardDifficulty: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  difficultyDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  difficultyText: {
    fontSize: 12,
    color: '#666666',
  },
  accessibilityNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F0F8FF',
    margin: 20,
    borderRadius: 8,
  },
  accessibilityNoticeText: {
    flex: 1,
    fontSize: 14,
    color: '#0066CC',
    marginLeft: 12,
    lineHeight: 20,
  },
  // Video Detail Styles
  videoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    color: '#0066CC',
    marginLeft: 4,
  },
  videoContainer: {
    flex: 1,
  },
  videoPlayerPlaceholder: {
    height: 220,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoPlayerText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  videoPlayerSubtext: {
    color: '#CCCCCC',
    fontSize: 14,
    marginTop: 4,
  },
  videoDetails: {
    padding: 20,
  },
  videoTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  videoTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  newBadge: {
    backgroundColor: '#DC3545',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginLeft: 12,
  },
  newBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  videoMeta: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 4,
  },
  videoDescription: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
    marginBottom: 24,
  },
  accessibilitySection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
  },
  accessibilityOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  accessibilityOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F8FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#D6EBFF',
  },
  accessibilityOptionText: {
    fontSize: 14,
    color: '#0066CC',
    marginLeft: 6,
    fontWeight: '500',
  },
  controlsSection: {
    marginBottom: 24,
  },
  controls: {
    flexDirection: 'row',
    gap: 12,
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  controlButtonText: {
    fontSize: 14,
    color: '#0066CC',
    marginLeft: 8,
    fontWeight: '500',
  },
});

export default VideoLibraryScreen;