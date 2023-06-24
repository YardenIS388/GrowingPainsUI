import {
    Image,
    Box
} from '@chakra-ui/react'

import { useEffect } from 'react'

import { useMotionValue, useAnimation, motion, useTransform} from "framer-motion"

function Marble() {
    const x = useMotionValue(0);
  
    useEffect(() => {
        console.log(x)
      const randomDirection = Math.random() * 360; // Generate a random angle between 0 and 360 degrees
      const speed = 1000; // Adjust the speed of the movement
  
      const radians = (randomDirection * Math.PI) / 180;
      const xDistance = Math.cos(radians) * speed;
  
      const interval = setInterval(() => {
        x.set((prevX) => prevX + xDistance);
      }, 1000 / 100); // 60 frames per second
  
      return () => clearInterval(interval);
    }, []);
  
    return (
      <motion.div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
        }}
        animate={{
          x: x.get(),
        }}
      >
        <img src="../images/conffetti/01.svg" alt="confetti" />
      </motion.div>
    );
  }

export default function ConfettiAnimation(){

    return (
        <Box  overflow='visible' >
            <Marble/>
            <Marble/>
            <Marble/>
            <Marble/>
            <Marble/>
              
        </Box>
      
    )
}