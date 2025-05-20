import React, { useContext, useEffect, useState, createContext } from "react";
import { Button } from "./ui/button";

const POSS = ["BD", "E9", "1C", "7A", "55", "FF"]
type Game = {
  canBeUsed: (coord: string) => boolean,
  addMove: (move: string) => void,
}

const GameContext = createContext<Game>({
  canBeUsed: () => {return false},
  addMove: () => {return}
})

const Playground = () => {
  const matrix = 6
  const [tot, setTot] = useState<string[][]>([])
  const [moves, setMoves] = useState<string[]>([])
  const [lastMove, setLastMove] = useState<string>("r0,c0");
  const [toWin, setToWin] = useState<{move: string, coord:string}[]>([])
  const [running, setRunning] = useState<boolean>(true)
  const canBeUsed = (coord: string) => {
    // when true the user can move on the same row
    //else he can move in the same column
    if(moves.find(item => item == coord)) return false;
    const [row, col] = coord.split(",")
    if(moves.length % 2 == 0){
      return lastMove.match(new RegExp(row)) ? true : false
    }else{
      return lastMove.match(new RegExp(col)) ? true : false
    }
  }
  const addMove = (move: string) => {
    setMoves([...moves, move])
    setLastMove(move);
    }
  /**
   * 
   * @param num the column number
   * @param from the referenced matrix
   * @returns the column in that position of the matrix
   */
  const getColumn = (num : number, from: string[][] = tot) => {
    if(num > matrix || num < 0) return [];
    let ans : string[] = []
    from.forEach(item => ans.push(item[num]))
    return ans;
  }

  /**
   * 
   * @param coords the cords you want to get the Value of (format "r0,c0")
   * @returns the value in that pos
   */
  const getValueFromCoords = (coords : string) => {
    let a: string[] = coords.split("")
    return tot[parseInt(a[1])][parseInt(a[4])]
  }
  
  /**
   * Create the path that has to be completed
   * @param from the matrix to select from
   * @param length the lenght of the "pass"
   */
  const challenge = (from: string[][],length : number = 5) => {
    const meRan = () => {
      return Math.floor(Math.random() * matrix)
    }
    let prevRow = 0
    let prevCol = 0
    let usable : string[] = []
    let ans : {move: string, coord:string}[] = []
    for(let i = 0; i < length; i++){
      if(i % 2 == 0){
        do{
          prevCol = meRan()
        }while(
          usable.find(item => item == "r"+prevRow+",c"+prevCol) !== undefined
        )
        let cor = "r"+prevRow+",c"+prevCol;
        usable.push(cor)
        ans.push({move: from[prevRow][prevCol], coord: cor});
      }else{
        do{
          prevRow = meRan();
        }while(
          usable.find(item => item == "r"+prevRow+",c"+prevCol) !== undefined
        )
        let cor = "r"+prevRow+",c"+prevCol;
        usable.push(cor)
        ans.push({move: getColumn(prevCol, from)[prevRow], coord: cor})
      }
    }
    console.log(ans)
    setToWin(ans);
  }
  //generate both the matrix and the challenge
  useEffect(() => {
    const las = () => Array.from({ length: matrix }, () => POSS[Math.floor(Math.random() * (POSS.length))]);
    const toti = Array.from({ length: matrix }, () => las())
    console.log(toti)
    challenge(toti)
    setTot(toti)
  }, [running])
  /**at every move check the status */
  useEffect(() => {
    moves.forEach((item, index) => 
    {
      if(index <= toWin.length){
        if(getValueFromCoords(item) != toWin[index].move){
          setRunning(false)
          setLastMove("r0,c0")
          setMoves([])
        }
      }
    })
  },[moves])
  return (
    <GameContext.Provider value={
      {
        addMove: addMove,
        canBeUsed: canBeUsed
      }
    }>

      <div className='grid gap-2 place-content-center min-h-[100vh]'>
        <div>{toWin.map(item => <span className="ms-1" key={item.coord}>{item.move}</span>)}</div>
        <div className={`h-2 w-full rounded-full bg-teal-600`}>
      </div>
        <div className={`cursor-pointer w-[30vw] h-[30vw] grid grid-cols-6 bg-black`}>
          {
            running ?
          tot.map((row, index) => row.map(
            (item, sindex) => {
              return <MySquare coord={`r${index},c${sindex}`} key={`${index}${sindex}`}>{item}</MySquare>
            })
          )
          :
          <div>
            <h2 className="text-5xl text-center w-full">error</h2>
            <Button onClick={() => {setRunning(true)}}>Riprova</Button>
          </div>  
        }

        </div>
      </div>
    </GameContext.Provider>
  )
}

function useGame() {
  return useContext(GameContext);
}

const MySquare = ({ children, coord }: { children: React.ReactNode, coord: any }) => {
  const {canBeUsed, addMove} = useGame()
  const [isAct, setIsAct] = useState<boolean>(false);

  return (
    <span className={`mx-auto grid place-content-center text-center h-[5vw] w-[5vw] ${isAct && "bg-green-800" } ${canBeUsed(coord) && "bg-slate-800 hover:bg-slate-700"}`}
      onClick={() => {
        if(canBeUsed(coord)){
          setIsAct(true);
          addMove(coord)
        }
      }}
    >
      <span>{children}</span>
    </span>
  )
}


export default Playground