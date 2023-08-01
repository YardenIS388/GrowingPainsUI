import {Circle, Box, HStack, CircularProgress} from '@chakra-ui/react'
import StoryCircle from '../components/StoryCircle'
import {useContext} from 'react'
import {StoryContext} from '../contexts/StoriesContext'

export default function StoryList({title, screenHeight}) {
    const storyList = useContext(StoryContext)
    const emptyArray = Array(9).fill("")
    const storiesWithAudio = storyList
        ? storyList.filter(story => {
            if (story.audioFIleName) {
                return story
            }
        })
        : []
    return (
        <Box overflow='scroll'
             pt='24px'>
            {< HStack w = '100%' 
            justifyContent = { 'space-around'}
            alignItems = {'center'}
            mb={4}
             > 
            {
                storiesWithAudio.map((story, index) => {
                    if (story.ageGroup == title) {
                        return (
                            <Circle
                                key={story._id}
                                size='120px'
                                display={'flex'}
                                justifyContent={'center'}
                                alignItems={'center'}
                              >

                                <StoryCircle
                                    key={index * 1024}
                                    story={story}
                                    imageSrc={`../images/marbles/marble-M-${story.storyId}.svg`}></StoryCircle>
                            </Circle>
                        )
                    }
                })
            } 
            </HStack>}

            <Box display="flex" flexWrap={"wrap"}  gap={6}  justifyContent={'space-evenly'} alignItems="center">
            {storyList.length > 0
                ? storyList.map((story, index) => {
                    if (story.ageGroup === title && !story.hasOwnProperty("audioFIleName")) {
                        return (
                            <Circle
                                key={story._id}
                                size='60px'
                                display={'flex'}
                                justifyContent={'center'}
                                alignItems={'center'}>
                                <StoryCircle
                                    imageSrc={`../images/marbles/marble-xs-${story.storyId}.svg`}
                                    story={story}></StoryCircle>
                            </Circle>
                        )
                    }
                })
                : null
}
            {emptyArray.map((story, index,) => {
                return (
                    <Circle key={index} bg="#303038" size='60px'>
                        {story.ageGroup}
                    </Circle>
                )
            })
           
}

            </Box>
        </Box>
    )
}