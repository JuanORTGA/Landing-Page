import React, { useRef, useEffect } from 'react';

interface EditableTextProps {
  tKey: string;
  initialText: string;
}

const EditableText: React.FC<EditableTextProps> = ({ tKey, initialText }) => {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (spanRef.current && spanRef.current.innerText !== initialText) {
      spanRef.current.innerText = initialText;
    }
  }, [initialText]);

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    const newText = e.currentTarget.innerText;
    window.parent.postMessage({ type: 'LIVE_UPDATE', key: tKey, value: newText }, '*');
  };

  return (
    <span
      ref={spanRef}
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      style={{
        outline: 'none',
        display: 'inline-block',
        minWidth: '1px',
        borderBottom: '1px dashed rgba(56, 189, 248, 0.5)',
        cursor: 'text',
        transition: 'all 0.2s'
      }}
      onMouseOver={(e) => {
        (e.target as HTMLElement).style.backgroundColor = 'rgba(56, 189, 248, 0.1)';
      }}
      onMouseOut={(e) => {
        (e.target as HTMLElement).style.backgroundColor = 'transparent';
      }}
    >
      {initialText}
    </span>
  );
};

export default EditableText;
