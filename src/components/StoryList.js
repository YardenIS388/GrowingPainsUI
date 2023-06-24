import {Circle, Box, HStack, CircularProgress} from '@chakra-ui/react'
import StoryCircle from '../components/StoryCircle'
import {useContext} from 'react'
import {StoryContext} from '../contexts/StoriesContext'

export default function StoryList({title, screenHeight}) {

    const storyList = useContext(StoryContext)
    const emptyArraySize = storyList
        ? (storyList.length - 1) + (6 - (storyList.length - 1 % 3))
        : 11
    const emptyArray = Array(emptyArraySize).fill("")
    const storiesWithAudio = storyList
        ? storyList.filter(story => {
            if (story.audioFIleName) {
                return story
            }
        })
        : []

    console.log({storiesWithAudio})

    return (
        <Box
            display='flex'
            flexWrap='wrap'
            gap={5}
            overflow='scroll'
            pt='24px'
            justifyContent={'space-around'}>
            {< HStack w = '100%' justifyContent = {
                'space-around'
            }
            alignItems = {
                'center'
            }
            h = {
                '20vh'
            } > {
                storiesWithAudio.slice(0,2).map((story, index) => {
                    if (story) {
                        return (
                            <Circle
                                key={story._id}
                                size='120px'
                                display={'flex'}
                                justifyContent={'center'}
                                alignItems={'center'}>

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
            {storyList.length > 0
                ? storyList.map((story, index) => {
                    if (story.ageGroup === title) {
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
    )
}