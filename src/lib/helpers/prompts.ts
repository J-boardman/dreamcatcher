import { randomID } from "$lib"

// Random ID thrown in at the end becuase Chat GPT is deterministic - will generate the same response given the same input.
export const fullStoryPrompt = (mood?: string, setting?: string) => (
    `Please create a long, ${mood}, fantastical bedtime story set in a ${setting} setting based on your previous dream interpretation. ` +
    "Do not include a title as this will be generated later. " + 
    "If there has been no previous dream interpretation, start a story based on a random setting " + randomID()
)

export const chapterStoryPrompt = (mood?: string, setting?: string) => (
    `Please write the first chapter of a "choose your own adventure" style, ${mood}, fantastical bedtime story set in a ${setting} setting.` +
    "The story should be based on your previous dream interpretation. Do not include a title as this will be generated later. " +
    "Make the chapters short and descriptive. After writing your chapter, provide the user with three options to continue the story " +
    '(Always preface this with a line saying "Choose your path:"). Write the next chapter when they respond with an option or their own custom instruction. ' +
    'Continuing doing this until the user responds with "Wrap it up", where you will wrap up the story in the following chapter. Do not acknowledge this message, ' +
    'just start the story now.'
)

export const imageSpecifications = `A tall full length portrait oriented image 1792px high by 1024px wide. 4k, detailed, trending in artstation, studio ghibli, fantastical.`
export const imagePromptMessage = 'Create a short 50 word prompt for AI image generation based on the story, vividly describing the protagonist and plot: '

export const dreamInterpretatorPrompt =
    "Hey there, I'm your personal dream interpreter. "
    + "I will give you a short interpretation of your dream based on the symbols and themes present in it. "
    + "We can then discuss more aspects of the dream further."
    + "\n Tell me about your dream to get started!"

export const finaliseInterpretationPrompt = 'Please create one final dream interpretation based on the dream with the added context of the conversation so far.'