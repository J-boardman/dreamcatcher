export function load({params, url}){
    const showComments = url.searchParams.get("show") == 'comments'
    let comments;
    // Load comments
    if(showComments){
        comments = ["This story was awesome", "Thanks for reading!", "nice work with this one."]
    } else {
        comments = null;
    }
    return {
        id: params?.id,
        cover: "",
        title: "A Firey Escape in Towertown",
        story: "It was a summer like no other, but that was only because of the snow. In 2053, a summer snowstorm descended on the small town where Yonah and her family lived. Unbeknownst to everyone, Yonah had a sickness that was affecting her internally, draining her of energy and preventing her from doing the simple things that kids her age would do. It had left her lethargic and spread worries among her family. Knowing that, Yonah's family were especially frightened when the snowstorm rolled into town and they had to take shelter in a nearby, run-down grocery store.\nLittle did they know, the snowstorm was not just a natural phenomenon but a force of evil. Ethereal monsters descended upon the grocery store, snarling and snapping as they made their way inside. Yonah and her family were in danger and Yonah's brother, Max, quickly jumped to her protection.\nMax bravely fought the monsters, using whatever he had handy to keep them at bay. He grabbed what seemed like an endless supply of snacks, from cans of beans to chips and crackers, and flung them at the monsters, hoping to confuse and stun them enough for the family to get away. The monsters kept on coming, but Max was determined to protect his sister no matter the cost.\nThrough the chaos, a figure emerged that no one had seen before. It was an old man, his face shrouded in snow and ice. He pulled a large club from his robe, and began to swing it at the monsters. His swings were swift and accurate, and with each swing, a monster would be overwhelmed by snow and vanish into the ether. The old man had remarkable strength, as though he was ageless and immortal.\nThe old man stopped the onslaught of monsters, and, smiling to the family, he swept away the snow from his face. There was no need to fear any longer, he said. He was the protector of the town, sent to ward off any attack, no matter how great or small. In a blink of an eye, he was gone, vanishing like the monsters he had taken away.\nFrozen at the sight of their protector, Yonah's family found themselves safe, with no sign of monsters or snow. Taking a deep breath, Yonah's family emerged from the grocery store, into the light of summer, safe and sound. Yonah, whose sickness was still there but seemed to be waning, thanked the mysterious stranger for his help and vowed to repay him one day, even though he had already gone and may never be seen again.\nThat day, while the summer sun shone upon the town, Yonah and her family looked on into the snow piling up at the horizon, unaware of the mysterious hero that had saved them from danger.",
        comments: comments
    }
}