import src from "../../../../lib/assets/nice.png"

export function load({params}){
    return {
        id: params.id,
        src
    }
}