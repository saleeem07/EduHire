import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';
import { motion } from 'framer-motion';

// 3D Graduation Hat Component
const GraduationHat = () => {
  return (
    <group>
      {/* Base of the hat */}
      <Box args={[2, 0.2, 2]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#2C5F34" />
      </Box>
      
      {/* Top of the hat */}
      <Box args={[1.5, 0.8, 1.5]} position={[0, 0.5, 0]}>
        <meshStandardMaterial color="#2C5F34" />
      </Box>
      
      {/* Tassel */}
      <Box args={[0.1, 1, 0.1]} position={[0.8, 0.4, 0]}>
        <meshStandardMaterial color="#FFD700" />
      </Box>
      
      {/* Tassel ball */}
      <Box args={[0.2, 0.2, 0.2]} position={[0.8, -0.1, 0]}>
        <meshStandardMaterial color="#FFD700" />
      </Box>
    </group>
  );
};

const Hero = ({ onGetStarted }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-[#F3F4F6]">
      <div className="max-w-7xl mx-auto text-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#2C5F34] leading-tight"
            >
              EduHire
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-[#1E293B] max-w-2xl mx-auto leading-relaxed"
            >
              Where Students Meet Opportunities. Build. Upload. Get Hired.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <button 
                onClick={onGetStarted}
                className="bg-[#2C5F34] hover:bg-[#FFD700] hover:text-[#1E293B] text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Get Started
              </button>
            </motion.div>
          </motion.div>

          {/* Right side - 3D Model */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-96 lg:h-[500px] w-full"
          >
            <Canvas
              camera={{ position: [0, 0, 5], fov: 50 }}
              style={{ background: 'transparent' }}
            >
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <pointLight position={[-10, -10, -5]} intensity={0.5} />
              
              <Suspense fallback={null}>
                <GraduationHat />
              </Suspense>
              
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={2}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 2}
              />
            </Canvas>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 