import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import CertificateThemes from './CertificateThemes';

const CertificatePreview = ({ certificateRef, certificateData }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  
  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const verificationUrl = `${window.location.origin}/verify/${certificateData.certificateId}`;
        const certificateInfo = JSON.stringify({
          id: certificateData.certificateId,
          verificationUrl,
          name: certificateData.recipientName,
          email: certificateData.recipientEmail,
          course: certificateData.courseName,
          issueDate: certificateData.issueDate,
          completionDate: certificateData.completionDate,
          grade: certificateData.grade,
          organization: certificateData.organization,
          validity: certificateData.validityPeriod
        });
        
        const qrCode = await QRCode.toDataURL(certificateInfo, {
          errorCorrectionLevel: 'H',
          margin: 1,
          width: 150
        });
        
        setQrCodeUrl(qrCode);
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };
    
    if (certificateData.recipientName && certificateData.courseName) {
      generateQRCode();
    }
  }, [certificateData]);

  if (!certificateData.recipientName || !certificateData.courseName) {
    return (
      <div className="bg-gray-50 p-8 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
        <p className="text-gray-500 text-center">
          Please fill in at least the recipient name and course/achievement to preview the certificate
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div data-certificate className="w-full">
        <CertificateThemes
          theme={certificateData.theme}
          certificateRef={certificateRef}
          certificateData={certificateData}
          qrCodeUrl={qrCodeUrl}
        />
      </div>
    </div>
  );
};

export default CertificatePreview;