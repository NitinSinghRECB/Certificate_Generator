import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';

const CustomTemplateUpload = ({ onTemplateSelect }) => {
  const [templates, setTemplates] = useState([]);
  const [error, setError] = useState('');

  const handleTemplateUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const template = {
          id: `template-${Date.now()}`,
          name: file.name.replace(/\.[^/.]+$/, ''),
          image: e.target.result,
          placeholders: {
            name: { x: 50, y: 50, width: 400, height: 50 },
            course: { x: 50, y: 150, width: 400, height: 50 },
            date: { x: 50, y: 250, width: 200, height: 30 },
            signature: { x: 50, y: 350, width: 200, height: 100 },
            qr: { x: 600, y: 350, width: 150, height: 150 }
          }
        };
        setTemplates(prev => [...prev, template]);
        onTemplateSelect(template);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeTemplate = (templateId) => {
    setTemplates(prev => prev.filter(t => t.id !== templateId));
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
        <div className="text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-4">
            <label htmlFor="template-upload" className="cursor-pointer">
              <span className="mt-2 block text-sm font-medium text-gray-600">
                Upload a custom template
              </span>
              <input
                id="template-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleTemplateUpload}
              />
              <span className="mt-1 block text-sm text-gray-500">
                PNG, JPG up to 5MB
              </span>
            </label>
          </div>
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      {templates.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {templates.map(template => (
            <div key={template.id} className="relative group">
              <img
                src={template.image}
                alt={template.name}
                className="w-full h-40 object-cover rounded-lg"
              />
              <button
                onClick={() => removeTemplate(template.id)}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
              <p className="mt-1 text-sm text-gray-600">{template.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomTemplateUpload;