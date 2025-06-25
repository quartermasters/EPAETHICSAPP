import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Linking,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const resourceTabs = [
  { id: 'faq', name: 'FAQ', icon: 'help-circle' },
  { id: 'glossary', name: 'Glossary', icon: 'library' },
  { id: 'documents', name: 'Documents', icon: 'document-text' },
  { id: 'contacts', name: 'Contacts', icon: 'people' },
];

const faqData = [
  {
    id: '1',
    question: 'What should I do if I have a conflict of interest?',
    answer: 'If you believe you have a conflict of interest, you should immediately consult with your agency ethics official. They can help you determine if a conflict exists and what steps you need to take to resolve it.',
    category: 'Conflicts of Interest',
  },
  {
    id: '2',
    question: 'Can I accept gifts from friends who work for contractors?',
    answer: 'Generally, federal employees cannot accept gifts from prohibited sources, which may include contractors. The rules depend on the specific relationship and circumstances. Consult your ethics official for guidance.',
    category: 'Gifts and Gratuities',
  },
  {
    id: '3',
    question: 'Do I need to report outside employment?',
    answer: 'Yes, most federal employees must seek approval before engaging in outside employment. This includes paid and unpaid activities. Check with your ethics official about your agency\'s specific requirements.',
    category: 'Outside Activities',
  },
  {
    id: '4',
    question: 'What are post-employment restrictions?',
    answer: 'Post-employment restrictions limit what former federal employees can do after leaving government service. These restrictions vary based on your position and length of service.',
    category: 'Post-Employment',
  },
];

const glossaryData = [
  {
    id: '1',
    term: 'Conflict of Interest',
    definition: 'A situation where a federal employee has a financial interest that could affect their official duties or responsibilities.',
    relatedTerms: ['Financial Interest', 'Recusal', 'Prohibited Source'],
  },
  {
    id: '2',
    term: 'Prohibited Source',
    definition: 'A person or organization that seeks official action from your agency, does business with your agency, or would be affected by your official duties.',
    relatedTerms: ['Conflict of Interest', 'Gifts'],
  },
  {
    id: '3',
    term: 'Recusal',
    definition: 'The act of removing yourself from participation in a particular matter due to a conflict of interest.',
    relatedTerms: ['Conflict of Interest', 'Disqualification'],
  },
  {
    id: '4',
    term: 'Ethics Official',
    definition: 'A person designated by an agency to provide ethics advice and guidance to employees.',
    relatedTerms: ['Ethics Advice', 'Consultation'],
  },
];

const documentsData = [
  {
    id: '1',
    title: 'Standards of Ethical Conduct for Employees of the Executive Branch',
    description: 'The primary regulation governing federal employee ethics',
    type: 'Regulation',
    size: '2.3 MB',
    url: 'https://example.com/ethics-standards.pdf',
  },
  {
    id: '2',
    title: 'EPA Ethics Handbook',
    description: 'EPA-specific ethics guidance and procedures',
    type: 'Handbook',
    size: '1.8 MB',
    url: 'https://example.com/epa-ethics-handbook.pdf',
  },
  {
    id: '3',
    title: 'Financial Disclosure Form (OGE Form 450)',
    description: 'Confidential financial disclosure form',
    type: 'Form',
    size: '0.5 MB',
    url: 'https://example.com/oge-450.pdf',
  },
  {
    id: '4',
    title: 'Ethics Training Certificate Template',
    description: 'Template for ethics training completion certificates',
    type: 'Template',
    size: '0.3 MB',
    url: 'https://example.com/certificate-template.pdf',
  },
];

const contactsData = [
  {
    id: '1',
    name: 'EPA Ethics Office',
    role: 'Primary Ethics Contact',
    email: 'ethics@epa.gov',
    phone: '(202) 564-4994',
    address: '1200 Pennsylvania Avenue, NW\nWashington, DC 20460',
  },
  {
    id: '2',
    name: 'Office of Government Ethics (OGE)',
    role: 'Federal Ethics Oversight',
    email: 'contactoge@oge.gov',
    phone: '(202) 482-9300',
    address: '1201 New York Avenue, NW\nSuite 500\nWashington, DC 20005',
  },
  {
    id: '3',
    name: 'EPA Inspector General Hotline',
    role: 'Report Ethics Violations',
    email: 'OIG_Hotline@epa.gov',
    phone: '(888) 546-8740',
    address: 'Confidential reporting available 24/7',
  },
];

export default function ResourcesScreen() {
  const [activeTab, setActiveTab] = useState('faq');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const handleContactPress = (type: 'email' | 'phone', value: string) => {
    const url = type === 'email' ? `mailto:${value}` : `tel:${value}`;
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert('Error', `Cannot open ${type === 'email' ? 'email client' : 'phone app'}`);
      }
    });
  };

  const handleDocumentDownload = (document: any) => {
    Alert.alert(
      document.title,
      'This is a demonstration. In the full app, this would download the document.',
      [{ text: 'OK' }]
    );
  };

  const filteredData = () => {
    const query = searchQuery.toLowerCase();
    switch (activeTab) {
      case 'faq':
        return faqData.filter(item => 
          item.question.toLowerCase().includes(query) || 
          item.answer.toLowerCase().includes(query)
        );
      case 'glossary':
        return glossaryData.filter(item => 
          item.term.toLowerCase().includes(query) || 
          item.definition.toLowerCase().includes(query)
        );
      case 'documents':
        return documentsData.filter(item => 
          item.title.toLowerCase().includes(query) || 
          item.description.toLowerCase().includes(query)
        );
      case 'contacts':
        return contactsData.filter(item => 
          item.name.toLowerCase().includes(query) || 
          item.role.toLowerCase().includes(query)
        );
      default:
        return [];
    }
  };

  const renderFAQ = () => (
    <View style={styles.tabContent}>
      {filteredData().map((faq: any) => (
        <View key={faq.id} style={styles.faqCard}>
          <TouchableOpacity
            style={styles.faqHeader}
            onPress={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
            accessibilityLabel={`FAQ: ${faq.question}`}
            accessibilityRole="button"
          >
            <Text style={styles.faqQuestion}>{faq.question}</Text>
            <Ionicons
              name={expandedFAQ === faq.id ? 'chevron-up' : 'chevron-down'}
              size={20}
              color="#64748B"
            />
          </TouchableOpacity>
          {expandedFAQ === faq.id && (
            <View style={styles.faqAnswer}>
              <Text style={styles.faqAnswerText}>{faq.answer}</Text>
              <View style={styles.faqCategory}>
                <Text style={styles.faqCategoryText}>{faq.category}</Text>
              </View>
            </View>
          )}
        </View>
      ))}
    </View>
  );

  const renderGlossary = () => (
    <View style={styles.tabContent}>
      {filteredData().map((term: any) => (
        <View key={term.id} style={styles.glossaryCard}>
          <Text style={styles.glossaryTerm}>{term.term}</Text>
          <Text style={styles.glossaryDefinition}>{term.definition}</Text>
          {term.relatedTerms && term.relatedTerms.length > 0 && (
            <View style={styles.relatedTerms}>
              <Text style={styles.relatedTermsLabel}>Related Terms:</Text>
              <View style={styles.relatedTermsList}>
                {term.relatedTerms.map((relatedTerm: string, index: number) => (
                  <View key={index} style={styles.relatedTermTag}>
                    <Text style={styles.relatedTermText}>{relatedTerm}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      ))}
    </View>
  );

  const renderDocuments = () => (
    <View style={styles.tabContent}>
      {filteredData().map((document: any) => (
        <TouchableOpacity
          key={document.id}
          style={styles.documentCard}
          onPress={() => handleDocumentDownload(document)}
          accessibilityLabel={`Download ${document.title}`}
          accessibilityRole="button"
        >
          <View style={styles.documentIcon}>
            <Ionicons name="document-text" size={24} color="#3B82F6" />
          </View>
          <View style={styles.documentInfo}>
            <Text style={styles.documentTitle}>{document.title}</Text>
            <Text style={styles.documentDescription}>{document.description}</Text>
            <View style={styles.documentMeta}>
              <Text style={styles.documentType}>{document.type}</Text>
              <Text style={styles.documentSize}>{document.size}</Text>
            </View>
          </View>
          <Ionicons name="download" size={20} color="#64748B" />
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderContacts = () => (
    <View style={styles.tabContent}>
      {filteredData().map((contact: any) => (
        <View key={contact.id} style={styles.contactCard}>
          <View style={styles.contactHeader}>
            <Text style={styles.contactName}>{contact.name}</Text>
            <Text style={styles.contactRole}>{contact.role}</Text>
          </View>
          
          <View style={styles.contactDetails}>
            <TouchableOpacity
              style={styles.contactDetail}
              onPress={() => handleContactPress('email', contact.email)}
              accessibilityLabel={`Email ${contact.name}`}
              accessibilityRole="button"
            >
              <Ionicons name="mail" size={16} color="#3B82F6" />
              <Text style={styles.contactDetailText}>{contact.email}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.contactDetail}
              onPress={() => handleContactPress('phone', contact.phone)}
              accessibilityLabel={`Call ${contact.name}`}
              accessibilityRole="button"
            >
              <Ionicons name="call" size={16} color="#10B981" />
              <Text style={styles.contactDetailText}>{contact.phone}</Text>
            </TouchableOpacity>
            
            <View style={styles.contactDetail}>
              <Ionicons name="location" size={16} color="#64748B" />
              <Text style={styles.contactDetailText}>{contact.address}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'faq':
        return renderFAQ();
      case 'glossary':
        return renderGlossary();
      case 'documents':
        return renderDocuments();
      case 'contacts':
        return renderContacts();
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#64748B" />
          <TextInput
            style={styles.searchInput}
            placeholder={`Search ${activeTab}...`}
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

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContent}
        >
          {resourceTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                style={[styles.tab, isActive && styles.tabActive]}
                onPress={() => setActiveTab(tab.id)}
                accessibilityLabel={`${tab.name} tab`}
                accessibilityRole="tab"
              >
                <Ionicons
                  name={tab.icon as any}
                  size={18}
                  color={isActive ? 'white' : '#64748B'}
                />
                <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                  {tab.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Content */}
      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {filteredData().length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="search" size={64} color="#CBD5E1" />
            <Text style={styles.emptyStateTitle}>No Results Found</Text>
            <Text style={styles.emptyStateText}>
              Try adjusting your search terms or browse different categories
            </Text>
          </View>
        ) : (
          renderTabContent()
        )}

        {/* Help Card */}
        <View style={styles.helpCard}>
          <LinearGradient
            colors={['#1B365D', '#A51C30']}
            style={styles.helpCardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name="help-circle" size={32} color="white" />
            <Text style={styles.helpCardTitle}>Need More Help?</Text>
            <Text style={styles.helpCardText}>
              If you can't find what you're looking for, contact the EPA Ethics Office directly for personalized guidance.
            </Text>
            <TouchableOpacity style={styles.helpCardButton}>
              <Text style={styles.helpCardButtonText}>Contact Ethics Office</Text>
            </TouchableOpacity>
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
  tabsContainer: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tabsContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    gap: 8,
  },
  tabActive: {
    backgroundColor: '#1B365D',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
  },
  tabTextActive: {
    color: 'white',
  },
  contentContainer: {
    flex: 1,
  },
  tabContent: {
    padding: 20,
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
  faqCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  faqQuestion: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginRight: 12,
  },
  faqAnswer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  faqAnswerText: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
    marginBottom: 12,
  },
  faqCategory: {
    alignSelf: 'flex-start',
    backgroundColor: '#EBF4FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  faqCategoryText: {
    fontSize: 12,
    color: '#3B82F6',
    fontWeight: '600',
  },
  glossaryCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  glossaryTerm: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
  },
  glossaryDefinition: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
    marginBottom: 12,
  },
  relatedTerms: {
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 12,
  },
  relatedTermsLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  relatedTermsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  relatedTermTag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  relatedTermText: {
    fontSize: 12,
    color: '#6B7280',
  },
  documentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  documentIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EBF4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  documentInfo: {
    flex: 1,
  },
  documentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  documentDescription: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8,
  },
  documentMeta: {
    flexDirection: 'row',
    gap: 12,
  },
  documentType: {
    fontSize: 12,
    color: '#3B82F6',
    fontWeight: '600',
  },
  documentSize: {
    fontSize: 12,
    color: '#64748B',
  },
  contactCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  contactHeader: {
    marginBottom: 16,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  contactRole: {
    fontSize: 14,
    color: '#64748B',
  },
  contactDetails: {
    gap: 12,
  },
  contactDetail: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  contactDetailText: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  helpCard: {
    marginHorizontal: 20,
    marginVertical: 32,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  helpCardGradient: {
    padding: 24,
    alignItems: 'center',
  },
  helpCardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 12,
    marginBottom: 8,
    textAlign: 'center',
  },
  helpCardText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  helpCardButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  helpCardButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
});