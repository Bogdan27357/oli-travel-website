import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
}

export function OptimizedImage({ 
  src, 
  alt, 
  className = '', 
  priority = false,
  width,
  height
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false);
  
  return (
    <div className={`relative ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        width={width}
        height={height}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

export default OptimizedImage;
