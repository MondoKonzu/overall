//user and campaign handling

/**
 * Player is not User is the main pg for a campaign
 */
export type Player = {
    id: string,
    campaignID: string,
    eddie: string,
    name: string,
    userID: string
}

/**
 * players which are waiting to be accepted
 */
export type Pending = {
    id: string,
    campaignID: string,
    playerID: string,
}

export type RelatedPendings = {
    pending: Pending,
    player: Player,
}

/**
 * The instance of the game
 */
export type Campaign = {
    id : string,
    created_at: string,
    name: string,
    masterID: string,
}

//buildings handling

/**
 * The basic sizes, keep in mind that size also works as an ID
 */
export type Sizes = {
    size: string,
    multiplier: string,
}

/**
 * The type of which a building can exist
 */
export type BuildingType = {
    id: string,
    price: string,
    earn: string,
    typename: string,
}

export type Building = {
    id: string,
    created_at: string,
    name: string,
    typeID: string,
    sizeID: string,
    earnatplayer: string,
    priceatplayer: string,  
}