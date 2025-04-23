import React from 'react';
import { Award } from 'lucide-react';

const CertificateThemes = ({ theme, certificateRef, certificateData, qrCodeUrl }) => {
  switch(theme) {
    case 'modern':
      return <ModernCertificate certificateRef={certificateRef} certificateData={certificateData} qrCodeUrl={qrCodeUrl} />;
    case 'elegant':
      return <ElegantCertificate certificateRef={certificateRef} certificateData={certificateData} qrCodeUrl={qrCodeUrl} />;
    case 'custom':
      return <CustomCertificate certificateRef={certificateRef} certificateData={certificateData} qrCodeUrl={qrCodeUrl} />;
    case 'classic':
    default:
      return <ClassicCertificate certificateRef={certificateRef} certificateData={certificateData} qrCodeUrl={qrCodeUrl} />;
  }
};

const CustomCertificate = ({ certificateRef, certificateData, qrCodeUrl }) => {
  if (!certificateData.customTemplate) {
    return <ClassicCertificate certificateRef={certificateRef} certificateData={certificateData} qrCodeUrl={qrCodeUrl} />;
  }

  const renderSignature = () => {
    switch (certificateData.signatureType) {
      case 'draw':
      case 'upload':
        return certificateData.signatureData ? (
          <img 
            src={certificateData.signatureData} 
            alt="Signature" 
            className="h-16 object-contain"
          />
        ) : null;
      case 'type':
        return (
          <p style={{ fontFamily: certificateData.signatureFont }} className="text-2xl">
            {certificateData.signatureText}
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      ref={certificateRef}
      className="w-[800px] h-[600px] relative"
      style={{
        backgroundImage: `url(${certificateData.customTemplate.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute" style={{ 
        top: certificateData.customTemplate.placeholders.name.y,
        left: certificateData.customTemplate.placeholders.name.x,
        width: certificateData.customTemplate.placeholders.name.width,
        textAlign: 'center'
      }}>
        <h2 className="text-4xl font-bold" style={{ color: certificateData.customColors.text }}>
          {certificateData.recipientName}
        </h2>
      </div>

      <div className="absolute" style={{ 
        top: certificateData.customTemplate.placeholders.course.y,
        left: certificateData.customTemplate.placeholders.course.x,
        width: certificateData.customTemplate.placeholders.course.width,
        textAlign: 'center'
      }}>
        <h3 className="text-3xl font-semibold" style={{ color: certificateData.customColors.text }}>
          {certificateData.courseName}
        </h3>
      </div>

      <div className="absolute" style={{ 
        top: certificateData.customTemplate.placeholders.date.y,
        left: certificateData.customTemplate.placeholders.date.x,
        width: certificateData.customTemplate.placeholders.date.width,
        textAlign: 'center'
      }}>
        <p className="text-xl" style={{ color: certificateData.customColors.text }}>
          {new Date(certificateData.completionDate).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      <div className="absolute" style={{ 
        top: certificateData.customTemplate.placeholders.signature.y,
        left: certificateData.customTemplate.placeholders.signature.x,
        width: certificateData.customTemplate.placeholders.signature.width,
        textAlign: 'center'
      }}>
        {renderSignature()}
        <p className="text-sm mt-1" style={{ color: certificateData.customColors.text }}>
          {certificateData.issuerName}
        </p>
        <p className="text-xs" style={{ color: certificateData.customColors.text }}>
          {certificateData.organization}
        </p>
      </div>

      {certificateData.templateCustomizations.showQR && qrCodeUrl && (
        <div className="absolute" style={{ 
          top: certificateData.customTemplate.placeholders.qr.y,
          left: certificateData.customTemplate.placeholders.qr.x,
          width: certificateData.customTemplate.placeholders.qr.width,
          height: certificateData.customTemplate.placeholders.qr.height
        }}>
          <img src={qrCodeUrl} alt="Certificate QR Code" className="w-full h-full" />
        </div>
      )}
    </div>
  );
};

const ClassicCertificate = ({ certificateRef, certificateData, qrCodeUrl }) => {
  const renderSignature = () => {
    switch (certificateData.signatureType) {
      case 'draw':
      case 'upload':
        return certificateData.signatureData ? (
          <img 
            src={certificateData.signatureData} 
            alt="Signature" 
            className="h-16 object-contain"
          />
        ) : null;
      case 'type':
        return (
          <p style={{ fontFamily: certificateData.signatureFont }} className="text-2xl">
            {certificateData.signatureText}
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      ref={certificateRef}
      className="w-[800px] h-[600px] bg-white p-8 relative overflow-hidden"
      style={{
        border: `${certificateData.templateCustomizations.borderWidth} ${certificateData.templateCustomizations.borderStyle} ${certificateData.customColors.primary}`
      }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 bg-repeat" style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
      }}></div>
      
      {/* Header */}
      <div className="text-center">
        {certificateData.templateCustomizations.showLogo && (
          <div className="mb-2" style={{ color: certificateData.customColors.primary }}>
            <Award size={50} />
          </div>
        )}
        <h1 className="text-3xl font-serif font-bold tracking-wider" style={{ color: certificateData.customColors.primary }}>
          CERTIFICATE OF ACHIEVEMENT
        </h1>
        <div className="h-1 w-32 mx-auto my-3" style={{ backgroundColor: certificateData.customColors.primary }}></div>
      </div>
      
      {/* Content */}
      <div className="text-center mt-8 mb-8">
        <p className="text-lg" style={{ color: certificateData.customColors.text }}>This is to certify that</p>
        <h2 className="text-4xl font-serif font-bold my-2" style={{ color: certificateData.customColors.primary }}>
          {certificateData.recipientName}
        </h2>
        <p className="text-lg mb-3" style={{ color: certificateData.customColors.text }}>has successfully completed</p>
        <h3 className="text-3xl font-serif font-bold" style={{ color: certificateData.customColors.primary }}>
          {certificateData.courseName}
        </h3>
        
        <div className="mt-6" style={{ color: certificateData.customColors.text }}>
          <p className="mb-1">with grade: <span className="font-semibold">{certificateData.grade}</span></p>
          <p className="mb-1">
            on {new Date(certificateData.completionDate).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
          <p>Certificate ID: {certificateData.certificateId}</p>
        </div>
      </div>
      
      {/* Footer with signature */}
      <div className="flex justify-between items-end mt-10">
        <div className="text-left" style={{ color: certificateData.customColors.text }}>
          <p className="text-sm">
            Issued on: {new Date(certificateData.issueDate).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
          <p className="text-sm">Valid for: {certificateData.validityPeriod}</p>
        </div>
        
        <div className="text-center">
          <div className="h-[60px] mb-1 flex items-center justify-center">
            {renderSignature()}
          </div>
          <p className="text-sm font-semibold" style={{ color: certificateData.customColors.text }}>
            {certificateData.issuerName}
          </p>
          <p className="text-xs" style={{ color: certificateData.customColors.text }}>
            {certificateData.organization}
          </p>
        </div>
        
        {/* QR Code */}
        {certificateData.templateCustomizations.showQR && qrCodeUrl && (
          <div className="flex flex-col items-center">
            <div>
              <img src={qrCodeUrl} alt="Certificate QR Code" className="h-24 w-24" />
              <p className="text-xs text-center mt-1" style={{ color: certificateData.customColors.text }}>
                Scan to verify
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Watermark */}
      {certificateData.templateCustomizations.showWatermark && (
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ color: `${certificateData.customColors.primary}10` }}
        >
          <Award className="w-96 h-96" />
        </div>
      )}
    </div>
  );
};

const ModernCertificate = ({ certificateRef, certificateData, qrCodeUrl }) => {
  const renderSignature = () => {
    switch (certificateData.signatureType) {
      case 'draw':
      case 'upload':
        return certificateData.signatureData ? (
          <img 
            src={certificateData.signatureData} 
            alt="Signature" 
            className="h-16 object-contain"
          />
        ) : null;
      case 'type':
        return (
          <p style={{ fontFamily: certificateData.signatureFont }} className="text-2xl">
            {certificateData.signatureText}
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      ref={certificateRef}
      className="w-[800px] h-[600px] p-8 relative overflow-hidden"
      style={{ 
        background: `linear-gradient(to bottom right, ${certificateData.customColors.background}, ${certificateData.customColors.secondary}10)`,
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' 
      }}
    >
      {/* Decorative elements */}
      <div 
        className="absolute top-0 left-0 w-24 h-24 rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{ backgroundColor: `${certificateData.customColors.primary}10` }}
      ></div>
      <div 
        className="absolute bottom-0 right-0 w-32 h-32 rounded-full translate-x-1/2 translate-y-1/2"
        style={{ backgroundColor: `${certificateData.customColors.primary}10` }}
      ></div>
      
      {/* Border */}
      <div 
        className="absolute inset-3 rounded-lg"
        style={{ border: `2px solid ${certificateData.customColors.primary}` }}
      ></div>
      
      {/* Content container */}
      <div className="relative h-full flex flex-col justify-between p-5">
        {/* Header */}
        <div className="text-center">
          {certificateData.templateCustomizations.showLogo && (
            <div className="flex justify-center items-center mb-2">
              <Award className="h-12 w-12" style={{ color: certificateData.customColors.primary }} />
            </div>
          )}
          <h1 
            className="text-3xl font-bold"
            style={{ color: certificateData.customColors.primary }}
          >
            CERTIFICATE OF COMPLETION
          </h1>
        </div>
        
        {/* Main content */}
        <div className="text-center my-4 flex-grow flex flex-col justify-center">
          <p className="text-xl" style={{ color: certificateData.customColors.text }}>
            This certifies that
          </p>
          <h2 
            className="text-4xl font-bold my-3"
            style={{ color: certificateData.customColors.primary }}
          >
            {certificateData.recipientName}
          </h2>
          <p className="text-xl mb-3" style={{ color: certificateData.customColors.text }}>
            has successfully completed the course
          </p>
          <h3 
            className="text-3xl font-bold mb-4 px-10"
            style={{ color: certificateData.customColors.primary }}
          >
            {certificateData.courseName}
          </h3>
          
          <div className="my-4" style={{ color: certificateData.customColors.text }}>
            <p className="mb-1">
              Completed on {new Date(certificateData.completionDate).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <p>with {certificateData.grade} grade</p>
          </div>
        </div>
        
        {/* Footer */}
        <div className="flex justify-between items-end">
          {/* QR Code */}
          {certificateData.templateCustomizations.showQR && qrCodeUrl && (
            <div>
              <div className="flex flex-col items-center">
                <img src={qrCodeUrl} alt="Certificate QR Code" className="h-24 w-24" />
                <p 
                  className="text-xs mt-1"
                  style={{ color: certificateData.customColors.text }}
                >
                  Scan to verify authenticity
                </p>
              </div>
            </div>
          )}
          
          {/* Middle info */}
          <div className="text-center" style={{ color: certificateData.customColors.text }}>
            <p className="text-sm">Certificate ID: {certificateData.certificateId}</p>
            <p className="text-sm">
              Issued: {new Date(certificateData.issueDate).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </p>
          </div>
          
          {/* Signature */}
          <div className="text-right">
            <div className="h-[60px] mb-1 flex items-center justify-center">
              {renderSignature()}
            </div>
            <p 
              className="text-sm font-semibold"
              style={{ color: certificateData.customColors.text }}
            >
              {certificateData.issuerName}
            </p>
            <p 
              className="text-xs"
              style={{ color: certificateData.customColors.text }}
            >
              {certificateData.organization}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ElegantCertificate = ({ certificateRef, certificateData, qrCodeUrl }) => {
  const renderSignature = () => {
    switch (certificateData.signatureType) {
      case 'draw':
      case 'upload':
        return certificateData.signatureData ? (
          <img 
            src={certificateData.signatureData} 
            alt="Signature" 
            className="h-16 object-contain"
          />
        ) : null;
      case 'type':
        return (
          <p style={{ fontFamily: certificateData.signatureFont }} className="text-2xl">
            {certificateData.signatureText}
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      ref={certificateRef}
      className="w-[800px] h-[600px] p-12 relative overflow-hidden"
      style={{ backgroundColor: certificateData.customColors.background }}
    >
      {/* Gold border */}
      <div 
        className="absolute inset-0 m-4"
        style={{ border: `8px solid ${certificateData.customColors.secondary}` }}
      ></div>
      <div 
        className="absolute inset-0 m-8"
        style={{ border: `2px solid ${certificateData.customColors.secondary}` }}
      ></div>
      
      {/* Corner ornaments */}
      <div 
        className="absolute top-8 left-8 h-16 w-16"
        style={{ 
          borderTop: `2px solid ${certificateData.customColors.secondary}`,
          borderLeft: `2px solid ${certificateData.customColors.secondary}`
        }}
      ></div>
      <div 
        className="absolute top-8 right-8 h-16 w-16"
        style={{ 
          borderTop: `2px solid ${certificateData.customColors.secondary}`,
          borderRight: `2px solid ${certificateData.customColors.secondary}`
        }}
      ></div>
      <div 
        className="absolute bottom-8 left-8 h-16 w-16"
        style={{ 
          borderBottom: `2px solid ${certificateData.customColors.secondary}`,
          borderLeft: `2px solid ${certificateData.customColors.secondary}`
        }}
      ></div>
      <div 
        className="absolute bottom-8 right-8 h-16 w-16"
        style={{ 
          borderBottom: `2px solid ${certificateData.customColors.secondary}`,
          borderRight: `2px solid ${certificateData.customColors.secondary}`
        }}
      ></div>
      
      {/* Content */}
      <div className="h-full flex flex-col justify-between py-6">
        {/* Header */}
        <div className="text-center">
          <h1 
            className="text-3xl font-serif font-bold tracking-wider"
            style={{ color: certificateData.customColors.primary }}
          >
            CERTIFICATE OF EXCELLENCE
          </h1>
          {certificateData.templateCustomizations.showLogo && (
            <div className="flex justify-center mt-2">
              <Award 
                className="h-10 w-10"
                style={{ color: certificateData.customColors.secondary }}
              />
            </div>
          )}
        </div>
        
        {/* Main content */}
        <div className="text-center flex-grow flex flex-col justify-center">
          <p 
            className="text-xl font-serif"
            style={{ color: certificateData.customColors.text }}
          >
            This certificate is proudly presented to
          </p>
          <h2 
            className="text-4xl font-serif font-bold my-5"
            style={{ color: certificateData.customColors.primary }}
          >
            {certificateData.recipientName}
          </h2>
          <p 
            className="text-xl font-serif mb-2"
            style={{ color: certificateData.customColors.text }}
          >
            for successfully completing
          </p>
          <h3 
            className="text-3xl font-serif font-bold mb-5"
            style={{ color: certificateData.customColors.primary }}
          >
            {certificateData.courseName}
          </h3>
          
          <div 
            className="my-2 font-serif"
            style={{ color: certificateData.customColors.text }}
          >
            <p>with distinction and excellence</p>
          </div>
        </div>
        
        {/* Footer */}
        <div className="grid grid-cols-3 items-end">
          {/* Date */}
          <div className="text-left">
            <div 
              className="h-[50px] mb-1"
              style={{ borderBottom: `1px solid ${certificateData.customColors.secondary}` }}
            ></div>
            <p 
              className="text-sm font-serif"
              style={{ color: certificateData.customColors.text }}
            >
              Date: {new Date(certificateData.issueDate).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </p>
          </div>
          
          {/* Institution */}
          <div className="text-center">
            <p 
              className="text-sm font-serif mb-1"
              style={{ color: certificateData.customColors.text }}
            >
              Presented by
            </p>
            <p 
              className="font-serif font-semibold"
              style={{ color: certificateData.customColors.primary }}
            >
              {certificateData.organization}
            </p>
            <p 
              className="text-xs font-serif mt-1"
              style={{ color: certificateData.customColors.text }}
            >
              Certificate ID: {certificateData.certificateId}
            </p>
          </div>
          
          {/* QR Code and signature */}
          <div className="flex flex-col items-end">
            {certificateData.templateCustomizations.showQR && qrCodeUrl && (
              <div className="flex flex-col items-center">
                <img 
                  src={qrCodeUrl} 
                  alt="Certificate QR Code" 
                  className="h-20 w-20 p-1"
                  style={{ border: `1px solid ${certificateData.customColors.secondary}` }}
                />
                <div 
                  className="h-[50px] w-40 mb-1 mt-2"
                  style={{ borderBottom: `1px solid ${certificateData.customColors.secondary}` }}
                >
                  {renderSignature()}
                </div>
                <p 
                  className="text-sm font-serif"
                  style={{ color: certificateData.customColors.text }}
                >
                  {certificateData.issuerName}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateThemes;