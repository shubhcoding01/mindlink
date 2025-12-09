import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 24,
          background: 'transparent',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%', // Optional: circular background if desired
        }}
      >
        {/* MindLink Logo Icon (Simple SVG suitable for small sizes) */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Ring */}
          <circle cx="16" cy="16" r="14" stroke="#6366f1" strokeWidth="2" fill="#4f46e5" fillOpacity="0.2" />
          
          {/* Inner Nodes (Brain-like structure) */}
          <circle cx="16" cy="10" r="2" fill="#818cf8" />
          <circle cx="10" cy="20" r="2" fill="#818cf8" />
          <circle cx="22" cy="20" r="2" fill="#818cf8" />
          
          {/* Connections */}
          <path
            d="M16 10L10 20M16 10L22 20M10 20H22"
            stroke="#a5b4fc"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}
