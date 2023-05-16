import {
    Fade,
    ScaleFade,
    Slide,
    SlideFade,
    Collapse,
    Box,
    useDisclosure,
    Button,
    HStack,
    Text,
    
} from '@chakra-ui/react'
import StoryList from './StoryList'
import About from './About'

export default function AccordionItem({title, stories, filter, screenHeight}) {
    const {isOpen, onToggle} = useDisclosure()

    let currentFilter = ''
    let filteredStories = []

    if (title !== 'About this project') {
        currentFilter = filter
        filteredStories = stories.filter((story => story.ageGroup === currentFilter))

    }
    return (
        <Box w="100%">
            <Button
                m='-2px'
                onClick={onToggle}
                h={screenHeight * 0.05}
                w="100%"
                color="#8A8A92"
                bg='#19191F'
                fontSize='16px'
                borderRadius='16px'
                zIndex={10}
                _active={{
                bg: 'rgba(38, 38, 46, 0.6)'
            }}
                _focus={{
                bg: 'rgba(38, 38, 46, 0.6)'
            }}>
                <HStack flex={1} justifyContent='space-between'>
                    <Text>
                         {title}
                    </Text>
                    <Box h={1} w={3} bg='#8A8A92'>

                    </Box>
                </HStack>
                
            </Button>
            <Collapse
                direction='top'
                in={isOpen}
                mt='1px'
                style={{
                zIndex: 10
                
                
            }}>
                <Box
                    p={2}
                    color='#19191F'
                    rounded='md'
                    display='flex'
                    justifyContent='center'
                    flex={1}
                    flexGrow={1}
                    h={screenHeight * 0.5}
                    overflowY="scroll"
                    bg="rgba(38, 38, 46, 1)">
                    {title !== 'About this project'
                        ? < StoryList storyList = {
                            filteredStories
                        } > </StoryList>
                        : <About></About>
}
                </Box>
            </Collapse>

        </Box>
    )

}