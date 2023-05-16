import { Box , HStack, Text, Image , VStack} from '@chakra-ui/react'
import StoryCircle from './StoryCircle'

export default function About(storyList){
    const story1 = storyList[47]
    const story2 = storyList[48]
    const story3 = storyList[49]
    return(
        <VStack gap={2}>
            <HStack justifyContent='center'>
                <StoryCircle imageSrc={'../images/marble.svg'} story={story1}></StoryCircle>
                <StoryCircle imageSrc={'../images/marble.svg'} story={story2}></StoryCircle>
                <StoryCircle imageSrc={'../images/marble.svg'} story={story3}></StoryCircle>
            </HStack>
            <HStack bg="#303038"  h="56px" alignItems='center' justifyContent='center'> 
                <Box boxSize='24px'>
                    <Image src='images/audioIcon.svg'/>
                </Box>
                
                <Text color='#A9A9B1' fontSize='16px' fontWeight={400} fontFamily={'Roboto'}>
                    Tap on any of the spheres to listen to a story
                </Text>
            </HStack>
            <VStack alignItems='flex-start'>
                <Text color='white' fontSize='18px' fontWeight='700' lineHeight='27px' fontFamily={'Merriweather'}> Growing up</Text>
                <Text fontSize='16px' fontWeight={500} color="#A9A9B1" fontFamily={'Roboto'}>
                    Part of growing up is realizing our parents aren’t perfect beings, they’re changing and growing people like the children they raise.
                </Text>
                <Text color='#8A8A92' fontFamily={'Roboto'} fontWeight={400}>
                Growing Pains reexamines the relationship between parents and children through the collection of moments when people realized that their parents aren’t perfect.
                </Text>
            </VStack>
        </VStack>
    )
}