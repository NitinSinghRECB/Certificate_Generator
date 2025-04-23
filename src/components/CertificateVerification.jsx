import React from 'react';
import { useParams } from 'react-router-dom';

const CertificateVerification = () => {
  const { id } = useParams();
  const [certificateData, setCertificateData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const data = localStorage.getItem(id);
      if (data) {
        setCertificateData(JSON.parse(data));
      } else {
        setError('Certificate not found');
      }
    } catch (err) {
      setError('Error loading certificate data');
    } finally {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Verification Failed</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-blue-900 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Certificate Verification</h1>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 gap-6">
              <div className="border-b pb-4">
                <h2 className="text-xl font-semibold text-blue-900 mb-4">
                  Certificate Details
                </h2>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Certificate ID</dt>
                    <dd className="mt-1 text-sm text-gray-900">{certificateData.certificateId}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Issue Date</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {new Date(certificateData.issueDate).toLocaleDateString()}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="border-b pb-4">
                <h2 className="text-xl font-semibold text-blue-900 mb-4">
                  Recipient Information
                </h2>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Name</dt>
                    <dd className="mt-1 text-sm text-gray-900">{certificateData.recipientName}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="mt-1 text-sm text-gray-900">{certificateData.recipientEmail}</dd>
                  </div>
                </dl>
              </div>

              <div className="border-b pb-4">
                <h2 className="text-xl font-semibold text-blue-900 mb-4">
                  Achievement Details
                </h2>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Course/Achievement</dt>
                    <dd className="mt-1 text-sm text-gray-900">{certificateData.courseName}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Grade</dt>
                    <dd className="mt-1 text-sm text-gray-900">{certificateData.grade}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Completion Date</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {new Date(certificateData.completionDate).toLocaleDateString()}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Validity Period</dt>
                    <dd className="mt-1 text-sm text-gray-900">{certificateData.validityPeriod}</dd>
                  </div>
                </dl>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-blue-900 mb-4">
                  Issuing Organization
                </h2>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Organization</dt>
                    <dd className="mt-1 text-sm text-gray-900">{certificateData.organization}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Issuer Name</dt>
                    <dd className="mt-1 text-sm text-gray-900">{certificateData.issuerName}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateVerification;