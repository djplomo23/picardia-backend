import React from 'react';

export default function LoadingBox() {
  return (
    <div className="loading">
      <div className="spinner-border text-danger" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}