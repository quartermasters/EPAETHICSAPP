import React from 'react';
import { Button } from '../ui/Button';
import { StMichaelBranding } from '../../../shared/design/st-michael-branding';

export interface DeveloperBadgeProps {
  variant?: 'header' | 'footer' | 'sidebar' | 'about';
  showLogo?: boolean;
  showContract?: boolean;
  className?: string;
}

const DeveloperBadge: React.FC<DeveloperBadgeProps> = ({
  variant = 'footer',
  showLogo = false,
  showContract = true,
  className = '',
}) => {
  const handleContactClick = () => {
    window.open(`mailto:${StMichaelBranding.contact.supportEmail}?subject=EPA Ethics App Support`, '_blank');
  };

  const handleWebsiteClick = () => {
    window.open(`https://${StMichaelBranding.contact.website}`, '_blank');
  };

  const renderLogo = () => {
    if (!showLogo) return null;
    
    return (
      <div className="flex items-center space-x-3 mb-4">
        {/* St. Michael Logo Placeholder */}
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-900 to-red-800">
          <span className="text-white font-bold text-sm">SM</span>
        </div>
        <div>
          <div className="text-sm font-semibold text-blue-900">St. Michael</div>
          <div className="text-xs text-red-800">Enterprises</div>
        </div>
      </div>
    );
  };

  const renderHeaderBadge = () => (
    <div className={`bg-white border-l-4 border-blue-900 px-4 py-2 shadow-sm ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {renderLogo()}
          <div>
            <div className="text-sm font-medium text-blue-900">
              Developed by {StMichaelBranding.company.tradeName}
            </div>
            {showContract && (
              <div className="text-xs text-red-800">
                EPA Contract {StMichaelBranding.contract.solicitationNumber}
              </div>
            )}
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleContactClick}
          className="border-blue-900 text-blue-900 hover:bg-blue-50"
        >
          Support
        </Button>
      </div>
    </div>
  );

  const renderFooterBadge = () => (
    <footer className={`bg-gray-50 border-t border-gray-200 px-6 py-8 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            {renderLogo()}
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              {StMichaelBranding.company.tradeName}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Small Business Enterprise specializing in federal IT solutions and government software development.
            </p>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleContactClick}
                className="border-blue-900 text-blue-900 hover:bg-blue-50"
              >
                Contact Support
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleWebsiteClick}
                className="text-blue-900 hover:bg-blue-50"
              >
                Visit Website
              </Button>
            </div>
          </div>

          {/* Contract Information */}
          {showContract && (
            <div>
              <h4 className="text-md font-semibold text-blue-900 mb-3">Contract Information</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Solicitation:</span> {StMichaelBranding.contract.solicitationNumber}
                </div>
                <div>
                  <span className="font-medium">Client:</span> {StMichaelBranding.contract.client}
                </div>
                <div>
                  <span className="font-medium">Type:</span> {StMichaelBranding.contract.contractType}
                </div>
                <div>
                  <span className="font-medium">NAICS:</span> {StMichaelBranding.contract.naicsCode} - Software Publishers
                </div>
              </div>
            </div>
          )}

          {/* Capabilities */}
          <div>
            <h4 className="text-md font-semibold text-blue-900 mb-3">Core Capabilities</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              {StMichaelBranding.company.capabilities.slice(0, 4).map((capability, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  {capability}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            {StMichaelBranding.attribution.copyrightText}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {StMichaelBranding.attribution.footerText}
          </p>
        </div>
      </div>
    </footer>
  );

  const renderSidebarBadge = () => (
    <div className={`bg-blue-50 border border-blue-200 rounded-lg p-4 ${className}`}>
      {renderLogo()}
      <div className="text-sm font-medium text-blue-900 mb-2">
        Developed by {StMichaelBranding.company.tradeName}
      </div>
      {showContract && (
        <div className="text-xs text-red-800 mb-3">
          EPA Contract {StMichaelBranding.contract.solicitationNumber}
        </div>
      )}
      <div className="space-y-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleContactClick}
          fullWidth
          className="border-blue-900 text-blue-900 hover:bg-blue-100"
        >
          Contact Support
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleWebsiteClick}
          fullWidth
          className="text-blue-900 hover:bg-blue-100"
        >
          Visit Website
        </Button>
      </div>
    </div>
  );

  const renderAboutBadge = () => (
    <div className={`bg-white rounded-xl shadow-lg p-8 ${className}`}>
      <div className="text-center mb-8">
        {renderLogo()}
        <h2 className="text-2xl font-bold text-blue-900 mb-2">
          {StMichaelBranding.company.legalName}
        </h2>
        <p className="text-lg text-red-800 mb-4">
          {StMichaelBranding.company.businessType}
        </p>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {StMichaelBranding.attribution.aboutText}
        </p>
      </div>

      {/* Capabilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {StMichaelBranding.company.capabilities.map((capability, index) => (
          <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-700">{capability}</span>
          </div>
        ))}
      </div>

      {/* Contract Information */}
      {showContract && (
        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Contract Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="font-medium text-gray-700">Solicitation Number:</span>
              <div className="text-blue-900">{StMichaelBranding.contract.solicitationNumber}</div>
            </div>
            <div>
              <span className="font-medium text-gray-700">Client:</span>
              <div className="text-blue-900">{StMichaelBranding.contract.client}</div>
            </div>
            <div>
              <span className="font-medium text-gray-700">Contract Type:</span>
              <div className="text-blue-900">{StMichaelBranding.contract.contractType}</div>
            </div>
            <div>
              <span className="font-medium text-gray-700">Project:</span>
              <div className="text-blue-900">{StMichaelBranding.contract.projectTitle}</div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          variant="default"
          onClick={handleContactClick}
          leftIcon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.95a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          }
        >
          Contact Support
        </Button>
        <Button
          variant="outline"
          onClick={handleWebsiteClick}
          leftIcon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0 0V3" />
            </svg>
          }
        >
          Visit Website
        </Button>
      </div>
    </div>
  );

  switch (variant) {
    case 'header':
      return renderHeaderBadge();
    case 'sidebar':
      return renderSidebarBadge();
    case 'about':
      return renderAboutBadge();
    default:
      return renderFooterBadge();
  }
};

export default DeveloperBadge;