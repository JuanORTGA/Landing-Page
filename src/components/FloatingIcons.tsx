import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Database, 
  Globe, 
  Cpu, 
  Layers, 
  Terminal
} from 'lucide-react';

const icons = [
  { Icon: Code2 },
  { Icon: Globe },
  { Icon: Database },
  { Icon: Cpu },
  { Icon: Layers },
  { Icon: Terminal },
];

const FloatingIcons: React.FC = () => {
  const [floatingIconsData] = useState(() => {
    return [...Array(8)].map((_, i) => ({
      id: i,
      IconData: icons[i % icons.length],
      size: Math.random() * 24 + 18,
      duration: Math.random() * 25 + 20,
      delay: Math.random() * 8,
      initialX: (i * 12 + 5) + 'vw',
      animateX: (i * 12 + 10) + 'vw'
    }));
  });

  return (
    <div className="floating-icons-container" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 0,
      overflow: 'hidden',
      opacity: 0.05
    }}>
      {floatingIconsData.map((data) => (
        <motion.div
          key={data.id}
          initial={{ 
            x: data.initialX, 
            y: '105vh',
            rotate: 0 
          }}
          animate={{ 
            y: '-5vh',
            rotate: 180,
            x: data.animateX
          }}
          transition={{ 
            duration: data.duration, 
            repeat: Infinity, 
            delay: data.delay,
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            color: 'var(--text-h)'
          }}
        >
          <data.IconData.Icon size={data.size} strokeWidth={1.5} />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingIcons;
