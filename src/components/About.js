import { Box , HStack, Text, Image , VStack, Center} from '@chakra-ui/react'
import StoryCircle from './StoryCircle'
import { StoryContext } from "../contexts/StoriesContext";
import {useContext, useState, useEffect} from "react";

export default function About(){

    const storyList = useContext(StoryContext)
    

   
  

    return(
        <VStack gap={2}>
            <HStack justifyContent='center' pt={2}>
                {
                   storyList.length > 0 && storyList.map((story => {
                        if(story.hasOwnProperty("audioFIleName")){ 
                         return(
                            <Box key={(story.storyId)} h="90px" w="90px">
                                <StoryCircle imageSrc={`../images/marbles/marble-s-${story.storyId}.svg`} story={story}> </StoryCircle>
                            </Box>
                        )}
                    }))
                }
            </HStack>
            <HStack bg="#303038"  h="56px" alignItems='center' justifyContent='center' w='100%'> 
                <Box boxSize='24px'>
                    <Image src='images/audioIcon.svg'/>
                </Box>
                
                <Text color='#A9A9B1' fontSize='16px' fontWeight={400} fontFamily={'Roboto'} >
                    Audio available for stories with this icon
                </Text>
            </HStack>
            <VStack alignItems='flex-start' px='28px' pb={5}>
                <Text color='white' fontSize='18px' fontWeight='700' lineHeight='27px' fontFamily={'Merriweather'}> Growing up</Text>
                <Text fontSize='16px' fontWeight={500} color="#A9A9B1" fontFamily={'Roboto'}>
                    Part of growing up is realizing our parents aren’t perfect beings, they’re changing and growing people like the children they raise.
                </Text>
                <Text color='#8A8A92' fontFamily={'Roboto'} fontWeight={400}>
                    Growing Pains reexamines the relationship between parents and children through the collection of moments when people realized that their parents aren’t perfect, seeing the imperfect child behind their heroes.
                </Text>
                <HStack justifyContent={'space-between'} w="100%" h='48px' mb={3}>

                    <Center bg={'#303038'} color='white'  h='100%'  borderRadius={'16px'} px={3}>
                      <a href='https://joshuamv.github.io/Growing-Pains-FAQ/'>
                            <Text m={2} whiteSpace='nowrap' fontSize={'16px'} fontFamily={'Roboto'} color='#A9A9B1'> 
                             Go to FAQ
                            </Text>
                      </a>
                    </Center>
                    <a href='https://www.linkedin.com/in/joshmv/' style={{width:'100%', height:'100%'}}>
                    <Center bg={'#303038'} color='white'  h='100%' borderRadius={'16px'} px={3}>
                       
                            <Text display={'flex'} gap={1}  whiteSpace='nowrap' fontSize={'16px'} fontFamily={'Roboto'} color='#A9A9B1'> 
                                Designed by Josh
                            </Text>
                         
                    </Center>
                    </a>
                   
                </HStack>
            </VStack>
         
        </VStack>
    )
}