import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const WelcomeAnimation = () => {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    // After 3 seconds, hide the animation
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  // If animation is done, don't render anything
  if (!showAnimation) return null;

  return (
    <motion.div 
      // className="fixed inset-0 flex items-center justify-center bg-black z-50"
      className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-black z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: showAnimation ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex items-center justify-center"
        >
          <img src="/welcome.png" alt="Logo" className="w-32 h-32 object-contain"/>
        </motion.div>
        
        
        
        <motion.div  
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="h-1 w-48 bg-yellow-500 mx-auto mb-6"
        />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="flex justify-center gap-4"
        >
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ 
                repeat: Infinity,
                duration: 0.8,
                delay: i * 0.2,
              }}
              className="w-3 h-3 bg-yellow-500 rounded-full"
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WelcomeAnimation;