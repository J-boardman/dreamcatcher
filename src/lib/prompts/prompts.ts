export const fullStoryPrompt = (mood?: string, setting?: string) => (
    `Please create a long, ${mood}, fantastical bedtime story set in a ${setting} setting based on your previous dream interpretation. ` +
    "Do not include a title as this will be generated later."
)

export const chapterStoryPrompt = (mood?: string, setting?: string) => (
    `Please write the first chapter of a "choose your own adventure" style, ${mood}, fantastical bedtime story set in a ${setting} setting.` +
    "The story should be based on your previous dream interpretation. Do not include a title as this will be generated later. " +
    "Make the chapters short and descriptive. After writing your chapter, provide the user with three options to continue the story " +
    '(Always preface this with a line saying "Choose your path:"). Write the next chapter when they respond with an option or their own custom instruction. ' +
    'Continuing doing this until the user responds with "Wrap it up", where you will wrap up the story in the following chapter. Do not acknowledge this message, ' +
    'just start the story now.'
)

export const generateImagePrompt = (mood?: string, setting?: string) => (
    `A tall full length portrait oriented image 1792px high by 1024px wide. 4k, detailed, trending in artstation, mood: ${mood}, setting: ${setting}, studio ghibli, fantastical.`
)

export const dreamInterpretatorPrompt =
    "Hey there, I'm your personal dream interpreter. "
    + "I will give you a short interpretation of your dream based on the symbols and themes present in it. "
    + "We can then discuss more aspects of the dream further."
    + "\n Tell me about your dream to get started!"

export const finaliseInterpretationPrompt = 'Please create one final dream interpretation based on the dream with the added context of the conversation so far.'
export const imagePromptMessage = 'Create a short 50 word prompt for AI image generation based on the story, vividly describing the protagonist and plot: '

export const storyTemplate =
    `It was a summer like no other, but that was only because of the snow. In 2053, a summer snowstorm descended on the small town where Yonah and her family lived. Unbeknownst to everyone, Yonah had a sickness that was affecting her internally, draining her of energy and preventing her from doing the simple things that kids her age would do. It had left her lethargic and spread worries among her family. Knowing that, Yonah's family were especially frightened when the snowstorm rolled into town and they had to take shelter in a nearby, run-down grocery store.

Little did they know, the snowstorm was not just a natural phenomenon but a force of evil. Ethereal monsters descended upon the grocery store, snarling and snapping as they made their way inside. Yonah and her family were in danger and Yonah's brother, Max, quickly jumped to her protection.

Max bravely fought the monsters, using whatever he had handy to keep them at bay. He grabbed what seemed like an endless supply of snacks, from cans of beans to chips and crackers, and flung them at the monsters, hoping to confuse and stun them enough for the family to get away. The monsters kept on coming, but Max was determined to protect his sister no matter the cost.

Through the chaos, a figure emerged that no one had seen before. It was an old man, his face shrouded in snow and ice. He pulled a large club from his robe, and began to swing it at the monsters. His swings were swift and accurate, and with each swing, a monster would be overwhelmed by snow and vanish into the ether. The old man had remarkable strength, as though he was ageless and immortal.

The old man stopped the onslaught of monsters, and, smiling to the family, he swept away the snow from his face. There was no need to fear any longer, he said. He was the protector of the town, sent to ward off any attack, no matter how great or small. In a blink of an eye, he was gone, vanishing like the monsters he had taken away.

Frozen at the sight of their protector, Yonah's family found themselves safe, with no sign of monsters or snow. Taking a deep breath, Yonah's family emerged from the grocery store, into the light of summer, safe and sound. Yonah, whose sickness was still there but seemed to be waning, thanked the mysterious stranger for his help and vowed to repay him one day, even though he had already gone and may never be seen again.

That day, while the summer sun shone upon the town, Yonah and her family looked on into the snow piling up at the horizon, unaware of the mysterious hero that had saved them from danger.

It was a summer like no other, but that was only because of the snow. In 2053, a summer snowstorm descended on the small town where Yonah and her family lived. Unbeknownst to everyone, Yonah had a sickness that was affecting her internally, draining her of energy and preventing her from doing the simple things that kids her age would do. It had left her lethargic and spread worries among her family. Knowing that, Yonah's family were especially frightened when the snowstorm rolled into town and they had to take shelter in a nearby, run-down grocery store.

Little did they know, the snowstorm was not just a natural phenomenon but a force of evil. Ethereal monsters descended upon the grocery store, snarling and snapping as they made their way inside. Yonah and her family were in danger and Yonah's brother, Max, quickly jumped to her protection.

Max bravely fought the monsters, using whatever he had handy to keep them at bay. He grabbed what seemed like an endless supply of snacks, from cans of beans to chips and crackers, and flung them at the monsters, hoping to confuse and stun them enough for the family to get away. The monsters kept on coming, but Max was determined to protect his sister no matter the cost.

Through the chaos, a figure emerged that no one had seen before. It was an old man, his face shrouded in snow and ice. He pulled a large club from his robe, and began to swing it at the monsters. His swings were swift and accurate, and with each swing, a monster would be overwhelmed by snow and vanish into the ether. The old man had remarkable strength, as though he was ageless and immortal.

The old man stopped the onslaught of monsters, and, smiling to the family, he swept away the snow from his face. There was no need to fear any longer, he said. He was the protector of the town, sent to ward off any attack, no matter how great or small. In a blink of an eye, he was gone, vanishing like the monsters he had taken away.

Frozen at the sight of their protector, Yonah's family found themselves safe, with no sign of monsters or snow. Taking a deep breath, Yonah's family emerged from the grocery store, into the light of summer, safe and sound. Yonah, whose sickness was still there but seemed to be waning, thanked the mysterious stranger for his help and vowed to repay him one day, even though he had already gone and may never be seen again.

That day, while the summer sun shone upon the town, Yonah and her family looked on into the snow piling up at the horizon, unaware of the mysterious hero that had saved them from danger.`