import React from 'react';
import { Award } from 'lucide-react';

const CertificateThemes = ({ theme, certificateRef, certificateData, qrCodeUrl }) => {
  switch(theme) {
    case 'modern':
      return <ModernCertificate certificateRef={certificateRef} certificateData={certificateData} qrCodeUrl={qrCodeUrl} />;
    case 'elegant':
      return <ElegantCertificate certificateRef={certificateRef} certificateData={certificateData} qrCodeUrl={qrCodeUrl} />;
    case 'classic':
    default:
      return <ClassicCertificate certificateRef={certificateRef} certificateData={certificateData} qrCodeUrl={qrCodeUrl} />;
  }
};

const ClassicCertificate = ({ certificateRef, certificateData, qrCodeUrl }) => {
  return (
    <div 
      ref={certificateRef}
      className="w-[800px] h-[600px] bg-white border-[12px] border-double border-blue-900 p-8 relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 bg-repeat" style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
      }}></div>
      
      {/* Header */}
      <div className="text-center">
        <div className="mb-2 text-blue-900 flex justify-center">
          <Award size={50} />
        </div>
        <h1 className="text-3xl font-serif font-bold text-blue-900 tracking-wider">CERTIFICATE OF ACHIEVEMENT</h1>
        <div className="h-1 w-32 bg-blue-900 mx-auto my-3"></div>
      </div>
      
      {/* Content */}
      <div className="text-center mt-8 mb-8">
        <p className="text-lg text-gray-600">This is to certify that</p>
        <h2 className="text-4xl font-serif font-bold text-blue-900 my-2">{certificateData.recipientName}</h2>
        <p className="text-lg text-gray-600 mb-3">has successfully completed</p>
        <h3 className="text-3xl font-serif font-bold text-blue-900">{certificateData.courseName}</h3>
        
        <div className="mt-6 text-gray-700">
          <p className="mb-1">with grade: <span className="font-semibold">{certificateData.grade}</span></p>
          <p className="mb-1">on {new Date(certificateData.completionDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p>Certificate ID: {certificateData.certificateId}</p>
        </div>
      </div>
      
      {/* Footer with signature */}
      <div className="flex justify-between items-end mt-10">
        <div className="text-left">
          <p className="text-sm text-gray-600">Issued on: {new Date(certificateData.issueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p className="text-sm text-gray-600">Valid for: {certificateData.validityPeriod}</p>
        </div>
        
        <div className="text-center">
          <div className="h-[60px] border-b border-gray-400 w-48 mx-auto mb-1"></div>
          <p className="text-sm font-semibold">{certificateData.issuerName}</p>
          <p className="text-xs text-gray-600">{certificateData.organization}</p>
        </div>
        
        {/* QR Code */}
        <div className="flex flex-col items-center">
          {qrCodeUrl && (
            <div>
              <img src={qrCodeUrl} alt="Certificate QR Code" className="h-24 w-24" />
              <p className="text-xs text-center text-gray-500 mt-1">Scan to verify</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ModernCertificate = ({ certificateRef, certificateData, qrCodeUrl }) => {
  return (
    <div 
      ref={certificateRef}
      className="w-[800px] h-[600px] bg-gradient-to-br from-blue-50 to-blue-100 p-8 relative overflow-hidden"
      style={{ boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-blue-700 opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-700 opacity-10 rounded-full translate-x-1/2 translate-y-1/2"></div>
      
      {/* Border */}
      <div className="absolute inset-3 border-2 border-blue-800 rounded-lg"></div>
      
      {/* Content container */}
      <div className="relative h-full flex flex-col justify-between p-5">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center items-center mb-2">
            <Award className="text-blue-800 h-12 w-12" />
          </div>
          <h1 className="text-3xl font-bold text-blue-800">CERTIFICATE OF COMPLETION</h1>
        </div>
        
        {/* Main content */}
        <div className="text-center my-4 flex-grow flex flex-col justify-center">
          <p className="text-xl text-gray-600">This certifies that</p>
          <h2 className="text-4xl font-bold text-blue-900 my-3">{certificateData.recipientName}</h2>
          <p className="text-xl text-gray-600 mb-3">has successfully completed the course</p>
          <h3 className="text-3xl font-bold text-blue-800 mb-4 px-10">{certificateData.courseName}</h3>
          
          <div className="my-4 text-gray-700">
            <p className="mb-1">Completed on {new Date(certificateData.completionDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p>with {certificateData.grade} grade</p>
          </div>
        </div>
        
        {/* Footer */}
        <div className="flex justify-between items-end">
          {/* QR Code */}
          <div>
            {qrCodeUrl && (
              <div className="flex flex-col items-center">
                <img src={qrCodeUrl} alt="Certificate QR Code" className="h-24 w-24" />
                <p className="text-xs text-gray-600 mt-1">Scan to verify authenticity</p>
              </div>
            )}
          </div>
          
          {/* Middle info */}
          <div className="text-center text-gray-700">
            <p className="text-sm">Certificate ID: {certificateData.certificateId}</p>
            <p className="text-sm">Issued: {new Date(certificateData.issueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
          </div>
          
          {/* Signature */}
          <div className="text-right">
            <div className="h-[60px] border-b border-gray-400 w-40 mb-1"></div>
            <p className="text-sm font-semibold">{certificateData.issuerName}</p>
            <p className="text-xs text-gray-600">{certificateData.organization}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ElegantCertificate = ({ certificateRef, certificateData, qrCodeUrl }) => {
  return (
    <div 
      ref={certificateRef}
      className="w-[800px] h-[600px] bg-[#f8f5e6] p-12 relative overflow-hidden"
    >
      {/* Gold border */}
      <div className="absolute inset-0 border-8 border-[#D4AF37] m-4"></div>
      <div className="absolute inset-0 border-2 border-[#D4AF37] m-8"></div>
      
      {/* Corner ornaments */}
      <div className="absolute top-8 left-8 h-16 w-16 border-t-2 border-l-2 border-[#D4AF37]"></div>
      <div className="absolute top-8 right-8 h-16 w-16 border-t-2 border-r-2 border-[#D4AF37]"></div>
      <div className="absolute bottom-8 left-8 h-16 w-16 border-b-2 border-l-2 border-[#D4AF37]"></div>
      <div className="absolute bottom-8 right-8 h-16 w-16 border-b-2 border-r-2 border-[#D4AF37]"></div>
      
      {/* Content */}
      <div className="h-full flex flex-col justify-between py-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-serif font-bold text-[#806517] tracking-wider">CERTIFICATE OF EXCELLENCE</h1>
          <div className="flex justify-center mt-2">
            <Award className="text-[#D4AF37] h-10 w-10" />
          </div>
        </div>
        
        {/* Main content */}
        <div className="text-center flex-grow flex flex-col justify-center">
          <p className="text-xl font-serif text-gray-700">This certificate is proudly presented to</p>
          <h2 className="text-4xl font-serif font-bold text-[#806517] my-5">{certificateData.recipientName}</h2>
          <p className="text-xl font-serif text-gray-700 mb-2">for successfully completing</p>
          <h3 className="text-3xl font-serif font-bold text-[#806517] mb-5">{certificateData.courseName}</h3>
          
          <div className="my-2 text-gray-700 font-serif">
            <p>with distinction and excellence</p>
          </div>
        </div>
        
        {/* Footer */}
        <div className="grid grid-cols-3 items-end">
          {/* Date */}
          <div className="text-left">
            <div className="h-[50px] border-b border-[#D4AF37] w-40 mb-1"></div>
            <p className="text-sm font-serif">Date: {new Date(certificateData.issueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>
          
          {/* Institution */}
          <div className="text-center">
            <p className="text-sm font-serif text-gray-600 mb-1">Presented by</p>
            <p className="font-serif font-semibold text-[#806517]">{certificateData.organization}</p>
            <p className="text-xs font-serif text-gray-600 mt-1">Certificate ID: {certificateData.certificateId}</p>
          </div>
          
          {/* QR Code and signature */}
          <div className="flex flex-col items-end">
            {qrCodeUrl && (
              <div className="flex flex-col items-center">
                <img src={qrCodeUrl} alt="Certificate QR Code" className="h-20 w-20 border border-[#D4AF37] p-1" />
                <div className="h-[50px] border-b border-[#D4AF37] w-40 mb-1 mt-2"></div>
                <p className="text-sm font-serif">{certificateData.issuerName}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateThemes;