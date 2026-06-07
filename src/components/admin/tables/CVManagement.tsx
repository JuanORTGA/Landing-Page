import React from 'react';
import { Globe, Check, AlertCircle, Upload } from 'lucide-react';

interface CVManagementProps {
  cvFiles: any[];
  isUploading: boolean;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>, lang: string) => void;
}

const CVManagement: React.FC<CVManagementProps> = ({ cvFiles, isUploading, onUpload }) => {
  return (
    <div className="cv-management-grid">
      {['es', 'en', 'et'].map(lang => {
        const cv = cvFiles.find((f: any) => f.lang === lang);
        return (
          <div key={lang} className="cv-card glass">
            <div className="cv-card-header">
              <Globe size={24} />
              <h3>{lang.toUpperCase()} Version</h3>
            </div>
            {cv ? (
              <div className="cv-status success">
                <Check size={16} /> File Uploaded
                <span>{new Date(cv.updated_at).toLocaleDateString()}</span>
              </div>
            ) : (
              <div className="cv-status warning">
                <AlertCircle size={16} /> No file uploaded yet
              </div>
            )}
            <label className="upload-label">
              {isUploading ? 'Uploading...' : 'Upload PDF'}
              <input type="file" accept=".pdf" onChange={e => onUpload(e, lang)} disabled={isUploading} hidden />
              <Upload size={18} />
            </label>
            {cv && (
              <a href={cv.file_url} target="_blank" rel="noreferrer" className="view-link">View Current PDF</a>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CVManagement;
