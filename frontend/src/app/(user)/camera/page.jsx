'use client';

import React, { useRef, useCallback, useState, useEffect } from 'react';
import { SwapHoriz } from '@mui/icons-material';
import { GrGallery } from 'react-icons/gr';
import Webcam from 'react-webcam';

const CameraPage = () => {
  const webcamRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [dimension, setDimension] = useState({ width: 400, height: 700 });
  const [cameraAccess, setCameraAccess] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const checkCameraPermission = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false
      });
      if (stream) {
        setCameraAccess(true);
        stream.getTracks().forEach((track) => track.stop());
      }
    } catch (err) {
      setCameraAccess(false);
      setError('Camera access denied. Please enable camera permissions in your browser settings.');
    }
  }, []);

  useEffect(() => {
    const checkIsMobile = () => {
      const isMobileView = window.innerWidth <= 750;
      setIsMobile(isMobileView);

      if (isMobileView) {
        const aspectRatio = 16 / 9;
        const height = window.innerHeight * 0.9;
        const width = height * aspectRatio;
        setDimension({ width: Math.min(width, window.innerWidth), height });
      }
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  useEffect(() => {
    checkCameraPermission();
  }, [checkCameraPermission]);

  const videoConstraints = {
    width: dimension.width,
    height: dimension.height,
    facingMode: 'environment'
  };

  const captureAndSend = useCallback(async () => {
    if (!cameraAccess) {
      setError('Camera is not accessible. Please check permissions.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccessMessage('');

    const imageSrc = webcamRef.current?.getScreenshot();

    if (imageSrc) {
      try {
        const formData = new FormData();
        formData.append('photo', imageSrc);

        const response = await fetch('send req to backend to process', {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          setSuccessMessage('Photo sent successfully!');
        } else {
          setError(`Failed to send photo: ${response.statusText}`);
        }
      } catch (error) {
        setError('Error sending photo. Please try again.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    } else {
      setError('No image captured. Please try again.');
      setLoading(false);
    }
  }, [cameraAccess]);

  if (!isMobile) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <p>This page is available only in mobile view.</p>
        <p>Please resize your browser or access it on a mobile device.</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '400px', position: 'relative' }}>
        {cameraAccess ? (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            style={{ width: '100%', height: 'auto', borderRadius: '8px', objectFit: 'cover' }}
          />
        ) : (
          <p style={{ color: 'red', textAlign: 'center' }}>Camera not accessible. Please allow camera access.</p>
        )}
      </div>

      <div
        style={{
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          position: 'absolute',
          bottom: '100px'
        }}
      >
        <button onClick={captureAndSend} style={buttonStyle} disabled={loading || !cameraAccess}>
          <div style={shutterButtonStyle} />
        </button>

        <input
          type="file"
          id="hiddenFileInput"
          style={{ display: 'none' }}
          accept="image/*"
          onChange={(e) => console.log('Selected file:', e.target.files[0])}
        />
        <button onClick={() => document.getElementById('hiddenFileInput').click()} style={buttonStyle}>
          <GrGallery />
        </button>
      </div>

      {/* {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>} */}
      {successMessage && <p style={{ color: 'green', marginTop: '10px' }}>{successMessage}</p>}
    </div>
  );
};

const buttonStyle = {
  padding: '10px',
  borderRadius: '50%',
  backgroundColor: '#fff',
  border: '1px solid #ccc',
  cursor: 'pointer'
};

const shutterButtonStyle = {
  width: '30px',
  height: '30px',
  backgroundColor: 'red',
  borderRadius: '50%'
};

export default CameraPage;
