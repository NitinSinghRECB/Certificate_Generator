import { useState, useRef, useCallback } from 'react';
import html2canvas from 'html2canvas';

export const useCertificate = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const certificateRef = useRef(null);
  const [certificateData, setCertificateData] = useState({
    recipientName: '',
    courseName: '',
    issueDate: formatDate(new Date()),
    issuerName: 'Certificate Authority',
    certificateId: generateCertificateId(),
    recipientEmail: '',
    completionDate: formatDate(new Date()),
    grade: 'A',
    validityPeriod: '2 years',
    organization: 'Your Organization',
    theme: 'classic',
    customTemplate: null,
    customColors: {
      primary: '#1E3A8A',
      secondary: '#D4AF37',
      background: '#FFFFFF',
      text: '#000000'
    },
    signatureType: 'draw',
    signatureData: '',
    signatureText: '',
    signatureFont: 'Playfair Display',
    templateCustomizations: {
      borderStyle: 'double',
      borderWidth: '12px',
      showLogo: true,
      showQR: true,
      showWatermark: true
    }
  });

  const handleDownload = useCallback(async () => {
    if (!certificateRef.current) return;

    try {
      setIsDownloading(true);
      
      const verificationUrl = `${window.location.origin}/verify/${certificateData.certificateId}`;
      
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        height: certificateRef.current.offsetHeight,
        width: certificateRef.current.offsetWidth,
        windowHeight: certificateRef.current.offsetHeight,
        onclone: (document) => {
          const element = document.querySelector('[data-certificate]');
          if (element) {
            element.style.height = 'auto';
            element.style.overflow = 'visible';
          }
        }
      });
      
      const image = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      
      const filename = `${certificateData.recipientName.replace(/\s+/g, '_')}_Certificate_${certificateData.certificateId}.png`;
      
      link.href = image;
      link.download = filename;
      link.click();

      localStorage.setItem(certificateData.certificateId, JSON.stringify({
        ...certificateData,
        verificationUrl,
        issueDate: new Date(certificateData.issueDate).toISOString(),
        completionDate: new Date(certificateData.completionDate).toISOString()
      }));

    } catch (error) {
      console.error('Error generating certificate:', error);
      alert('Failed to download certificate. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  }, [certificateData]);

  return {
    certificateData,
    setCertificateData,
    certificateRef,
    handleDownload,
    isDownloading
  };
};

function formatDate(date) {
  return date.toISOString().substring(0, 10);
}

function generateCertificateId() {
  return `CERT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
}