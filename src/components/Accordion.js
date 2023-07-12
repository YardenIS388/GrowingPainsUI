import * as React from "react";
import {useState, useContext} from "react";
import { StoryContext } from "../contexts/StoriesContext";
import {motion, AnimatePresence} from "framer-motion";
import {Box, Text, HStack, Image, VStack} from '@chakra-ui/react'
import StoryList from '../components/StoryList'
import About from '../components/About'


const Accordion = ({i, expanded, setExpanded, screenHeight, title}) => {
    
    const isOpen = i === expanded;
    const storyList = useContext(StoryContext)

    // By using `AnimatePresence` to mount and unmount the contents, we can animate
    // them in and out while also only rendering the contents of open accordions
    return (<> 
    < Box  
        my='1px !important'
        as={motion.div}
        initial={false}
        animate={{ backgroundColor: isOpen ? "#26262E": "#19191F" }}
        borderRadius='16px' 
        w='100%'  
        overflow='hidden'
       
        >
            <HStack boxShadow={isOpen && '0px 4px 60px rgba(0, 0, 0, 0.2)'} w="100%" justifyContent='space-between' px={5} h={isOpen ? screenHeight * 0.06 :screenHeight * 0.05} onClick={() => setExpanded(isOpen ? false: i)}>
                <Text color={isOpen ? 'white' : '#8A8A92'} fontFamily={'Roboto'} fontSize='16px' fontWeight={isOpen ? 500 : 400}>{(title !== 'About this project' ) && "Ages"} {title}</Text>
               { !isOpen && <Image src='../images/chevron-down.svg'></Image>}
            </HStack>
         
            < AnimatePresence initial = { false} > 
    {
        isOpen && (
            <Box as={motion.section}
                key="content"
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                open: {
                    opacity: 1,
                    height: "auto"
                },
                collapsed: {
                    opacity: 0,
                    height: 0
                }
            }}
                transition={{
                duration: 0.8,
                ease: [0.04, 0.62, 0.23, 0.98]
            }}>
            <Box height={screenHeight * 0.52} borderRadius=' 0px 0px 16px 16px' overflowY='scroll' px={title === 'About this project' ? '0px':'32px'}>
               { title === 'About this project' ? 
                        <About></About>
                        :       
                        <StoryList title={title}> </StoryList>
                }
            </Box>
            </Box>
        )
    } </AnimatePresence>
        </Box> 
   
    </ >);
};

export const Example = ({screenHeight}) => {
    // This approach is if you only want max one section open at a time. If you want
    // multiple sections to potentially be open simultaneously, they can all be
    // given their own `useState`.
    const [expanded, setExpanded] = useState(0);
    const accordionIds = [0, 1, 2, 3, 4];
    const tabTitles = ['About this project', '0-12', '13-19','20-29','30+']

    return (

        <VStack h={screenHeight*0.8} w="100%" >
            {accordionIds.map((i) => {

                return (
                <Accordion key={i} i={i} expanded={expanded} setExpanded={setExpanded} screenHeight={screenHeight} title={tabTitles[i]}/>
                )

            })
}
        </VStack>

    )

}
