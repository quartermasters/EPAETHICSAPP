import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  AccessibilityInfo,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category: string;
}

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'PDF' | 'Link' | 'Document';
  url?: string;
  category: string;
}

const faqs: FAQ[] = [
  {
    id: '1',
    question: 'Can I accept a coffee from a contractor?',
    answer: 'Generally no, if the coffee costs more than $20 or if you would exceed the $50 annual limit from that source. However, there may be exceptions for widely attended events or if based on a personal relationship that predates the business relationship.',
    category: 'Gifts',
  },
  {
    id: '2',
    question: 'Do I need to report stock investments to my ethics advisor?',
    answer: 'You should report any financial interests that could be affected by your official duties, particularly if they exceed $15,000 in value. This includes individual stocks, but diversified mutual funds may have different thresholds.',
    category: 'Financial',
  },
  {
    id: '3',
    question: 'Can I use my government email for personal messages?',
    answer: 'Limited personal use may be permitted under your agency\'s policies, but this varies by organization. Check with your IT department and ethics advisor for specific guidelines.',
    category: 'Resources',
  },
  {
    id: '4',
    question: 'When do I need approval for outside activities?',
    answer: 'Most outside employment and compensated activities require advance written approval. This includes teaching, speaking engagements, writing, and consulting work.',
    category: 'Outside Activities',
  },
  {
    id: '5',
    question: 'How long do post-employment restrictions last?',
    answer: 'It depends on the specific restriction. Some are lifetime (switching sides), others are one or two years. The restrictions depend on your position level and the type of matter involved.',
    category: 'Post-Employment',
  },
];

const glossaryTerms: GlossaryTerm[] = [
  {
    id: '1',
    term: 'Prohibited Source',
    definition: 'Any person or organization that seeks official action from your agency, does business or seeks to do business with your agency, or whose interests may be substantially affected by your official duties.',
    category: 'General',
  },
  {
    id: '2',
    term: 'Financial Interest',
    definition: 'Any current or contingent ownership, equity, or security interest in an entity, including stocks, bonds, partnership interests, and similar holdings.',
    category: 'Financial',
  },
  {
    id: '3',
    term: 'Official Responsibility',
    definition: 'The direct administrative or operating authority over a particular matter, whether intermediate or final, exercised either alone or with others.',
    category: 'Authority',
  },
  {
    id: '4',
    term: 'Recusal',
    definition: 'The act of disqualifying oneself from participation in an official matter due to a conflict of interest or appearance of impropriety.',
    category: 'Process',
  },
  {
    id: '5',
    term: 'Widely Attended Event',
    definition: 'An event with at least 100 people expected to attend, where attendees represent a range of views or interests relevant to the function.',
    category: 'Events',
  },
];

const resources: Resource[] = [
  {
    id: '1',
    title: 'Federal Ethics Statutes and Regulations',
    description: 'Complete text of federal ethics laws and implementing regulations',
    type: 'PDF',
    category: 'Legal',
  },
  {
    id: '2',
    title: 'EPA Ethics Contact Directory',
    description: 'Contact information for designated ethics advisors by region and office',
    type: 'Document',
    category: 'Contacts',
  },
  {
    id: '3',
    title: 'Financial Disclosure Forms',
    description: 'Required forms for reporting financial interests and potential conflicts',
    type: 'PDF',
    category: 'Forms',
  },
  {
    id: '4',
    title: 'Outside Activity Request Form',
    description: 'Form for requesting approval of outside employment and activities',
    type: 'PDF',
    category: 'Forms',
  },
  {
    id: '5',
    title: 'Office of Government Ethics',
    description: 'Official OGE website with additional guidance and resources',
    type: 'Link',
    url: 'https://oge.gov',
    category: 'External',
  },
];

const ResourcesScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'faq' | 'glossary' | 'documents'>('faq');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const handleTabChange = (tab: 'faq' | 'glossary' | 'documents') => {
    setActiveTab(tab);
    setSearchQuery('');
    setExpandedFAQ(null);
    AccessibilityInfo.announceForAccessibility(`Switched to ${tab} section`);
  };

  const handleFAQToggle = (faqId: string) => {
    const newExpanded = expandedFAQ === faqId ? null : faqId;
    setExpandedFAQ(newExpanded);
    
    if (newExpanded) {
      const faq = faqs.find(f => f.id === faqId);
      AccessibilityInfo.announceForAccessibility(`Expanded: ${faq?.question}`);
    } else {
      AccessibilityInfo.announceForAccessibility('Collapsed FAQ item');
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredGlossary = glossaryTerms.filter(term =>
    term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
    term.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
    term.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'PDF':
        return 'document-text-outline';
      case 'Link':
        return 'link-outline';
      case 'Document':
        return 'folder-outline';
      default:
        return 'document-outline';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Resources</Text>
        <Text style={styles.headerDescription}>
          Find answers, definitions, and helpful documents
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search-outline" size={20} color="#666666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search resources..."
            value={searchQuery}
            onChangeText={handleSearch}
            accessible={true}
            accessibilityLabel="Search resources"
            accessibilityHint="Type to search FAQs, glossary terms, and documents"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => handleSearch('')}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Clear search"
            >
              <Ionicons name="close-circle" size={20} color="#666666" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'faq' && styles.activeTab]}
          onPress={() => handleTabChange('faq')}
          accessible={true}
          accessibilityRole="tab"
          accessibilityLabel="Frequently Asked Questions"
          accessibilityState={{ selected: activeTab === 'faq' }}
        >
          <Ionicons 
            name="help-circle-outline" 
            size={20} 
            color={activeTab === 'faq' ? '#0066CC' : '#666666'} 
          />
          <Text style={[styles.tabText, activeTab === 'faq' && styles.activeTabText]}>
            FAQ
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'glossary' && styles.activeTab]}
          onPress={() => handleTabChange('glossary')}
          accessible={true}
          accessibilityRole="tab"
          accessibilityLabel="Glossary"
          accessibilityState={{ selected: activeTab === 'glossary' }}
        >
          <Ionicons 
            name="book-outline" 
            size={20} 
            color={activeTab === 'glossary' ? '#0066CC' : '#666666'} 
          />
          <Text style={[styles.tabText, activeTab === 'glossary' && styles.activeTabText]}>
            Glossary
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'documents' && styles.activeTab]}
          onPress={() => handleTabChange('documents')}
          accessible={true}
          accessibilityRole="tab"
          accessibilityLabel="Documents"
          accessibilityState={{ selected: activeTab === 'documents' }}
        >
          <Ionicons 
            name="folder-outline" 
            size={20} 
            color={activeTab === 'documents' ? '#0066CC' : '#666666'} 
          />
          <Text style={[styles.tabText, activeTab === 'documents' && styles.activeTabText]}>
            Documents
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {activeTab === 'faq' && (
          <View style={styles.faqSection}>
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq) => (
                <View key={faq.id} style={styles.faqItem}>
                  <TouchableOpacity
                    style={styles.faqQuestion}
                    onPress={() => handleFAQToggle(faq.id)}
                    accessible={true}
                    accessibilityRole="button"
                    accessibilityLabel={faq.question}
                    accessibilityHint={expandedFAQ === faq.id ? 'Tap to collapse answer' : 'Tap to expand answer'}
                    accessibilityState={{ expanded: expandedFAQ === faq.id }}
                  >
                    <View style={styles.faqQuestionContent}>
                      <Text style={styles.faqCategory}>{faq.category}</Text>
                      <Text style={styles.faqQuestionText}>{faq.question}</Text>
                    </View>
                    <Ionicons
                      name={expandedFAQ === faq.id ? 'chevron-up' : 'chevron-down'}
                      size={20}
                      color="#666666"
                    />
                  </TouchableOpacity>
                  
                  {expandedFAQ === faq.id && (
                    <View style={styles.faqAnswer}>
                      <Text style={styles.faqAnswerText}>{faq.answer}</Text>
                    </View>
                  )}
                </View>
              ))
            ) : (
              <View style={styles.noResults}>
                <Ionicons name="search-outline" size={48} color="#CCCCCC" />
                <Text style={styles.noResultsText}>No FAQs found</Text>
                <Text style={styles.noResultsSubtext}>Try different search terms</Text>
              </View>
            )}
          </View>
        )}

        {activeTab === 'glossary' && (
          <View style={styles.glossarySection}>
            {filteredGlossary.length > 0 ? (
              filteredGlossary.map((term) => (
                <View key={term.id} style={styles.glossaryItem}>
                  <View style={styles.glossaryHeader}>
                    <Text style={styles.glossaryTerm}>{term.term}</Text>
                    <Text style={styles.glossaryCategory}>{term.category}</Text>
                  </View>
                  <Text style={styles.glossaryDefinition}>{term.definition}</Text>
                </View>
              ))
            ) : (
              <View style={styles.noResults}>
                <Ionicons name="book-outline" size={48} color="#CCCCCC" />
                <Text style={styles.noResultsText}>No terms found</Text>
                <Text style={styles.noResultsSubtext}>Try different search terms</Text>
              </View>
            )}
          </View>
        )}

        {activeTab === 'documents' && (
          <View style={styles.documentsSection}>
            {filteredResources.length > 0 ? (
              filteredResources.map((resource) => (
                <TouchableOpacity
                  key={resource.id}
                  style={styles.resourceItem}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel={`${resource.title}. ${resource.type}.`}
                  accessibilityHint={resource.description}
                >
                  <View style={styles.resourceIcon}>
                    <Ionicons 
                      name={getResourceIcon(resource.type) as keyof typeof Ionicons.glyphMap} 
                      size={24} 
                      color="#0066CC" 
                    />
                  </View>
                  <View style={styles.resourceContent}>
                    <View style={styles.resourceHeader}>
                      <Text style={styles.resourceTitle}>{resource.title}</Text>
                      <View style={styles.resourceType}>
                        <Text style={styles.resourceTypeText}>{resource.type}</Text>
                      </View>
                    </View>
                    <Text style={styles.resourceDescription}>{resource.description}</Text>
                    <Text style={styles.resourceCategory}>{resource.category}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#666666" />
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.noResults}>
                <Ionicons name="folder-outline" size={48} color="#CCCCCC" />
                <Text style={styles.noResultsText}>No documents found</Text>
                <Text style={styles.noResultsSubtext}>Try different search terms</Text>
              </View>
            )}
          </View>
        )}

        {/* Help Section */}
        <View style={styles.helpSection}>
          <View style={styles.helpCard}>
            <Ionicons name="call-outline" size={24} color="#0066CC" />
            <View style={styles.helpContent}>
              <Text style={styles.helpTitle}>Need Personal Guidance?</Text>
              <Text style={styles.helpDescription}>
                Contact your designated ethics advisor for specific situations not covered in these resources.
              </Text>
              <TouchableOpacity
                style={styles.contactButton}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel="Contact ethics advisor"
              >
                <Text style={styles.contactButtonText}>Find My Ethics Advisor</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  searchContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    fontSize: 16,
    color: '#333333',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#0066CC',
  },
  tabText: {
    fontSize: 16,
    color: '#666666',
    marginLeft: 8,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#0066CC',
  },
  content: {
    flex: 1,
  },
  faqSection: {
    padding: 20,
  },
  faqItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    overflow: 'hidden',
  },
  faqQuestion: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  faqQuestionContent: {
    flex: 1,
  },
  faqCategory: {
    fontSize: 12,
    color: '#0066CC',
    fontWeight: '600',
    marginBottom: 4,
  },
  faqQuestionText: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
    lineHeight: 22,
  },
  faqAnswer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#F8F9FA',
  },
  faqAnswerText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  glossarySection: {
    padding: 20,
  },
  glossaryItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  glossaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  glossaryTerm: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    flex: 1,
  },
  glossaryCategory: {
    fontSize: 12,
    color: '#0066CC',
    fontWeight: '600',
    backgroundColor: '#F0F8FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  glossaryDefinition: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  documentsSection: {
    padding: 20,
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  resourceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  resourceContent: {
    flex: 1,
  },
  resourceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    flex: 1,
  },
  resourceType: {
    backgroundColor: '#E8F4FD',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  resourceTypeText: {
    fontSize: 10,
    color: '#0066CC',
    fontWeight: '600',
  },
  resourceDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
    lineHeight: 18,
  },
  resourceCategory: {
    fontSize: 12,
    color: '#999999',
  },
  noResults: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noResultsText: {
    fontSize: 16,
    color: '#666666',
    marginTop: 12,
    fontWeight: '500',
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#999999',
    marginTop: 4,
  },
  helpSection: {
    padding: 20,
  },
  helpCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F0F8FF',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D6EBFF',
  },
  helpContent: {
    flex: 1,
    marginLeft: 12,
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  helpDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 12,
  },
  contactButton: {
    backgroundColor: '#0066CC',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  contactButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});

export default ResourcesScreen;