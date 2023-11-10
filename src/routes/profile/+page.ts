type Filters = "stories" | "dreams" | "likes"

export function load({params, url}){
    const filterBy= url.searchParams.get("filter")
    let data;

    return {
        filterBy
    }
}

async function fetchStories(){}

async function fetchLikedStories(){}

async function fetchDreams(){}