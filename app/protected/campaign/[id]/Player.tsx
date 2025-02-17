export const Player = ({players, campaign} : {players: any[] | null, campaign: any}) => {
    return (
        <div className="p-12">
        <h1>Campaign's name: {campaign.name}</h1>
        <div>
            <h3>Campaign's players:</h3>
            {players!.map(player =>
                <p key={player.id}>{player.name}</p>
            )}
        </div>
    </div>
    )
}