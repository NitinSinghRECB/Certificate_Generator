import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Download, Award } from 'lucide-react';
import CertificateForm from './components/CertificateForm';
import CertificatePreview from './components/CertificatePreview';
import CertificateVerification from './components/CertificateVerification';
import { useCertificate } from './hooks/useCertificate';

function App() {
  const {
    certificateData,
    setCertificateData,
    certificateRef,
    handleDownload,
    isDownloading
  } = useCertificate();

  return (
    <Router>
      <Routes>
        <Route path="/verify/:id" element={<CertificateVerification />} />
        <Route path="/" element={
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
            <header className="bg-white shadow-sm py-4">
              <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Award className="text-blue-800 h-8 w-8" />
                    <h1 className="text-2xl font-bold text-blue-900">Certificate Generator</h1>
                  </div>
                </div>
              </div>
            </header>

            <main className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Certificate Details</h2>
                  <CertificateForm 
                    certificateData={certificateData} 
                    setCertificateData={setCertificateData} 
                  />
                </div>

                <div className="flex flex-col space-y-4">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold text-gray-800">Certificate Preview</h2>
                      <button
                        onClick={handleDownload}
                        disabled={isDownloading}
                        className="flex items-center space-x-2 bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-md transition-all duration-200 disabled:opacity-70"
                      >
                        <Download className="h-4 w-4" />
                        <span>{isDownloading ? 'Downloading...' : 'Download Certificate'}</span>
                      </button>
                    </div>
                    <div className="overflow-auto">
                      <CertificatePreview 
                        certificateRef={certificateRef} 
                        certificateData={certificateData} 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;