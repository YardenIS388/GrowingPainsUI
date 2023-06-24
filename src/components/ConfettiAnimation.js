import {
    Image,
    Box
} from '@chakra-ui/react'

import { useEffect } from 'react'

import { useMotionValue, useAnimation, motion, useTransform} from "framer-motion"



export default function ConfettiAnimation(){

    const confettiArray =[]
    for(let i = 1; i < 31 ; i ++){
      confettiArray.push(`../images/conffetti/${i}.svg`)
    }
    console.log(confettiArray)
    return (
        <Box position='absolute' top={0} left={0} borderWidth={1} borderColor="white" h="100%" w="100%">
          
              
        </Box>
      
    )
}