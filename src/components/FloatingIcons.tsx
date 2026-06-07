import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Database, 
  Globe, 
  Cpu, 
  Layers, 
  Terminal,
  Zap
} from 'lucide-react';

const icons = [
  { Icon: Code2, color: '#3776ab' }, // Python blue
  { Icon: Globe, color: '#61dafb' }, // React cyan
  { Icon: Database, color: '#4479a1' }, // SQL blue
  { Icon: Cpu, color: '#38bdf8' },
  { Icon: Layers, color: '#00b4b6' }, // Django green-ish
  { Icon: Terminal, color: '#f7df1e' }, // JS yellow
  { Icon: Zap, color: '#ff9a00' }
];

const FloatingIcons: React.FC = () => {
  const [floatingIconsData] = useState(() => {
    return [...Array(15)].map((_, i) => ({
      id: i,
      IconData: icons[i % icons.length],
      size: Math.random() * 30 + 20,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 10,
      initialX: Math.random() * 100 + 'vw',
      animateX: Math.random() * 100 + 'vw'
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
      zIndex: -1,
      overflow: 'hidden',
      opacity: 0.2
    }}>
      {floatingIconsData.map((data) => (
        <motion.div
          key={data.id}
          initial={{ 
            x: data.initialX, 
            y: '110vh',
            rotate: 0 
          }}
          animate={{ 
            y: '-10vh',
            rotate: 360,
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
            color: data.IconData.color
          }}
        >
          <data.IconData.Icon size={data.size} />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingIcons;
