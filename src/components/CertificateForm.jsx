import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { SketchPicker } from 'react-color';
import CustomTemplateUpload from './CustomTemplateUpload';

const CertificateForm = ({ certificateData, setCertificateData }) => {
  const signaturePadRef = useRef(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [activeColor, setActiveColor] = useState('primary');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCertificateData(prev => ({ ...prev, [name]: value }));
  };

  const handleColorChange = (color) => {
    setCertificateData(prev => ({
      ...prev,
      customColors: {
        ...prev.customColors,
        [activeColor]: color.hex
      }
    }));
  };

  const handleSignatureEnd = () => {
    if (signaturePadRef.current) {
      const signatureData = signaturePadRef.current.toDataURL();
      setCertificateData(prev => ({ ...prev, signatureData }));
    }
  };

  const clearSignature = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
      setCertificateData(prev => ({ ...prev, signatureData: '' }));
    }
  };

  const handleTemplateCustomization = (name, value) => {
    setCertificateData(prev => ({
      ...prev,
      templateCustomizations: {
        ...prev.templateCustomizations,
        [name]: value
      }
    }));
  };

  const handleTemplateSelect = (template) => {
    setCertificateData(prev => ({
      ...prev,
      customTemplate: template,
      theme: 'custom'
    }));
  };

  return (
    <form className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="recipientName" className="block text-sm font-medium text-gray-700">
            Recipient Name*
          </label>
          <input
            type="text"
            id="recipientName"
            name="recipientName"
            value={certificateData.recipientName}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label htmlFor="recipientEmail" className="block text-sm font-medium text-gray-700">
            Recipient Email
          </label>
          <input
            type="email"
            id="recipientEmail"
            name="recipientEmail"
            value={certificateData.recipientEmail}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="johndoe@example.com"
          />
        </div>

        <div>
          <label htmlFor="courseName" className="block text-sm font-medium text-gray-700">
            Course/Achievement*
          </label>
          <input
            type="text"
            id="courseName"
            name="courseName"
            value={certificateData.courseName}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Web Development"
          />
        </div>

        <div>
          <label htmlFor="organization" className="block text-sm font-medium text-gray-700">
            Organization
          </label>
          <input
            type="text"
            id="organization"
            name="organization"
            value={certificateData.organization}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Your Organization"
          />
        </div>

        <div>
          <label htmlFor="issueDate" className="block text-sm font-medium text-gray-700">
            Issue Date
          </label>
          <input
            type="date"
            id="issueDate"
            name="issueDate"
            value={certificateData.issueDate}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="completionDate" className="block text-sm font-medium text-gray-700">
            Completion Date
          </label>
          <input
            type="date"
            id="completionDate"
            name="completionDate"
            value={certificateData.completionDate}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="grade" className="block text-sm font-medium text-gray-700">
            Grade/Score
          </label>
          <input
            type="text"
            id="grade"
            name="grade"
            value={certificateData.grade}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="A"
          />
        </div>

        <div>
          <label htmlFor="validityPeriod" className="block text-sm font-medium text-gray-700">
            Validity Period
          </label>
          <input
            type="text"
            id="validityPeriod"
            name="validityPeriod"
            value={certificateData.validityPeriod}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="2 years"
          />
        </div>
      </div>

      <div>
        <label htmlFor="theme" className="block text-sm font-medium text-gray-700">
          Certificate Theme
        </label>
        <select
          id="theme"
          name="theme"
          value={certificateData.theme}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="classic">Classic</option>
          <option value="modern">Modern</option>
          <option value="elegant">Elegant</option>
          <option value="custom">Custom Template</option>
        </select>
      </div>

      {certificateData.theme === 'custom' && (
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Custom Template</h3>
          <CustomTemplateUpload onTemplateSelect={handleTemplateSelect} />
        </div>
      )}

      <div>
        <label htmlFor="certificateId" className="block text-sm font-medium text-gray-700">
          Certificate ID
        </label>
        <input
          type="text"
          id="certificateId"
          name="certificateId"
          value={certificateData.certificateId}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-100"
          readOnly
        />
        <p className="mt-1 text-xs text-gray-500">Auto-generated unique ID</p>
      </div>

      {/* Template Customization */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Template Customization</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Border Style</label>
            <select
              name="borderStyle"
              value={certificateData.templateCustomizations.borderStyle}
              onChange={(e) => handleTemplateCustomization('borderStyle', e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
            >
              <option value="double">Double</option>
              <option value="solid">Solid</option>
              <option value="dashed">Dashed</option>
              <option value="none">None</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Border Width</label>
            <select
              name="borderWidth"
              value={certificateData.templateCustomizations.borderWidth}
              onChange={(e) => handleTemplateCustomization('borderWidth', e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
            >
              <option value="8px">Thin</option>
              <option value="12px">Medium</option>
              <option value="16px">Thick</option>
            </select>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="showLogo"
              checked={certificateData.templateCustomizations.showLogo}
              onChange={(e) => handleTemplateCustomization('showLogo', e.target.checked)}
              className="h-4 w-4 text-blue-600"
            />
            <label htmlFor="showLogo" className="ml-2 text-sm text-gray-700">
              Show Logo
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="showQR"
              checked={certificateData.templateCustomizations.showQR}
              onChange={(e) => handleTemplateCustomization('showQR', e.target.checked)}
              className="h-4 w-4 text-blue-600"
            />
            <label htmlFor="showQR" className="ml-2 text-sm text-gray-700">
              Show QR Code
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="showWatermark"
              checked={certificateData.templateCustomizations.showWatermark}
              onChange={(e) => handleTemplateCustomization('showWatermark', e.target.checked)}
              className="h-4 w-4 text-blue-600"
            />
            <label htmlFor="showWatermark" className="ml-2 text-sm text-gray-700">
              Show Watermark
            </label>
          </div>
        </div>
      </div>

      {/* Color Customization */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Color Scheme</h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(certificateData.customColors).map(([key, value]) => (
            <div key={key} className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => {
                  setActiveColor(key);
                  setShowColorPicker(true);
                }}
                className="w-8 h-8 rounded-full border border-gray-300"
                style={{ backgroundColor: value }}
              />
              <span className="text-sm capitalize">{key}</span>
            </div>
          ))}
        </div>
        
        {showColorPicker && (
          <div className="absolute z-10 mt-2">
            <div className="fixed inset-0" onClick={() => setShowColorPicker(false)} />
            <SketchPicker
              color={certificateData.customColors[activeColor]}
              onChange={handleColorChange}
            />
          </div>
        )}
      </div>

      {/* Signature Options */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Signature</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Signature Type</label>
            <select
              name="signatureType"
              value={certificateData.signatureType}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
            >
              <option value="draw">Draw Signature</option>
              <option value="upload">Upload Image</option>
              <option value="type">Type Signature</option>
            </select>
          </div>

          {certificateData.signatureType === 'draw' && (
            <div className="border rounded-lg p-4">
              <SignatureCanvas
                ref={signaturePadRef}
                canvasProps={{
                  className: 'signature-canvas border rounded',
                  width: 500,
                  height: 200
                }}
                onEnd={handleSignatureEnd}
              />
              <button
                type="button"
                onClick={clearSignature}
                className="mt-2 text-sm text-blue-600 hover:text-blue-800"
              >
                Clear Signature
              </button>
            </div>
          )}

          {certificateData.signatureType === 'upload' && (
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      setCertificateData(prev => ({
                        ...prev,
                        signatureData: e.target.result
                      }));
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
          )}

          {certificateData.signatureType === 'type' && (
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  name="signatureText"
                  value={certificateData.signatureText}
                  onChange={handleChange}
                  placeholder="Type your signature"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Font Style</label>
                <select
                  name="signatureFont"
                  value={certificateData.signatureFont}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
                >
                  <option value="Playfair Display">Playfair Display</option>
                  <option value="Dancing Script">Dancing Script</option>
                  <option value="Great Vibes">Great Vibes</option>
                  <option value="Pacifico">Pacifico</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default CertificateForm;