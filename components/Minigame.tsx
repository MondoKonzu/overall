import React, { useContext, useEffect, useState, createContext } from "react";
import { Button } from "./ui/button";

const POSS = ["BD", "E9", "1C", "7A", "55", "FF"]
type Game = {
  canBeUsed: (coord: string) => boolean,
  addMove: (move: string) => void,
}

const GameContext = createContext<Game>({
  canBeUsed: () => { return false },
  addMove: () => { return }
})

const Playground = () => {
  const matrix = 6
  const [tot, setTot] = useState<string[][]>([])
  const [moves, setMoves] = useState<string[]>([])
  const [lastMove, setLastMove] = useState<string>("r0,c0");
  const [toWin, setToWin] = useState<{ move: string, coord: string }[]>([])
  const [running, setRunning] = useState<boolean>(false)
  const [width, setWidth] = useState(100);
  const [status, setStatus] = useState<"noTime" | "won" | "error" | "waiting">("waiting")
  const canBeUsed = (coord: string) => {
    // when true the user can move on the same row
    //else he can move in the same column
    if (moves.find(item => item == coord)) return false;
    const [row, col] = coord.split(",")
    if (moves.length % 2 == 0) {
      return lastMove.match(new RegExp(row)) ? true : false
    } else {
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
  const getColumn = (num: number, from: string[][] = tot) => {
    if (num > matrix || num < 0) return [];
    let ans: string[] = []
    from.forEach(item => ans.push(item[num]))
    return ans;
  }

  /**
   * 
   * @param coords the cords you want to get the Value of (format "r0,c0")
   * @returns the value in that pos
   */
  const getValueFromCoords = (coords: string) => {
    let a: string[] = coords.split("")
    return tot[parseInt(a[1])][parseInt(a[4])]
  }

  /**
   * Create the path that has to be completed
   * @param from the matrix to select from
   * @param length the lenght of the "pass"
   */
  const challenge = (from: string[][], length: number = 5) => {
    const meRan = () => {
      return Math.floor(Math.random() * matrix)
    }
    let prevRow = 0
    let prevCol = 0
    let usable: string[] = []
    let ans: { move: string, coord: string }[] = []
    for (let i = 0; i < length; i++) {
      if (i % 2 == 0) {
        do {
          prevCol = meRan()
        } while (
          usable.find(item => item == "r" + prevRow + ",c" + prevCol) !== undefined
        )
        let cor = "r" + prevRow + ",c" + prevCol;
        usable.push(cor)
        ans.push({ move: from[prevRow][prevCol], coord: cor });
      } else {
        do {
          prevRow = meRan();
        } while (
          usable.find(item => item == "r" + prevRow + ",c" + prevCol) !== undefined
        )
        let cor = "r" + prevRow + ",c" + prevCol;
        usable.push(cor)
        ans.push({ move: getColumn(prevCol, from)[prevRow], coord: cor })
      }
    }
    console.log(ans)
    setToWin(ans);
  }
  //generate both the matrix and the challenge
  useEffect(() => {
    if (status == "waiting") {
      const las = () => Array.from({ length: matrix }, () => POSS[Math.floor(Math.random() * (POSS.length))]);
      const toti = Array.from({ length: matrix }, () => las())
      console.log(toti)
      challenge(toti)
      setTot(toti)
    }else{
          setRunning(false)
          setWidth(100)
          setLastMove("r0,c0")
          setMoves([])
    }
  }, [status])

  useEffect(() => {
    if (running) {
      const duration = 30000; // 30 seconds in milliseconds
      const startTime = Date.now();

      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setWidth(100 * (1 - progress));

        if (progress >= 1) clearInterval(interval);
      }, 16); // ~60fps update rate

      return () => clearInterval(interval);
    }
  }, [running])

  /**at every move check the status */
  useEffect(() => {
    moves.forEach((item, index) => {
      if (index < toWin.length) {
        if (getValueFromCoords(item) != toWin[index].move) {
          setRunning(false)
          setStatus("error")
          setWidth(100)
          setLastMove("r0,c0")
          setMoves([])
        }else if(index == (toWin.length -1)){
          setStatus("won")
        }
      }
    })
  }, [moves])

  useEffect(() => {
    width == 0 && setStatus("noTime")
  }, [width])
  return (
    <GameContext.Provider value={
      {
        addMove: addMove,
        canBeUsed: canBeUsed
      }
    }>

      <div className='grid gap-2 place-content-center min-h-[100vh]'>
        <div>{toWin.map(item => <span className="ms-1" key={item.coord}>{item.move}</span>)}</div>
        <div style={{ width: `${width}%` }} className={`h-2 rounded-full bg-teal-600`}>
        </div>
        <div
          onClick={() => {
            if (status == "waiting" && !running) {
              setRunning(true)
            }
          }}
          className={`cursor-pointer w-[30vw] h-[30vw] grid grid-cols-6 bg-black`}>
          {
            status == "waiting" ?
              tot.map((row, index) => row.map(
                (item, sindex) => {
                  return <MySquare coord={`r${index},c${sindex}`} key={`${index}${sindex}`}>{item}</MySquare>
                })
              )
              :
              <div>
                <Result status={status} refresh={() => { setStatus("waiting") }} />
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
  const { canBeUsed, addMove } = useGame()
  const [isAct, setIsAct] = useState<boolean>(false);

  return (
    <span className={`mx-auto grid place-content-center text-center h-[5vw] w-[5vw] ${isAct && "bg-green-800"} ${canBeUsed(coord) && "bg-slate-800 hover:bg-slate-700"}`}
      onClick={() => {
        if (canBeUsed(coord)) {
          setIsAct(true);
          addMove(coord)
        }
      }}
    >
      <span>{children}</span>
    </span>
  )
}

const Result = ({ status, refresh }: { status: "noTime" | "won" | "error" | "waiting", refresh: () => void }) => {
  const TryAgain = () => {
    return <Button onClick={refresh}>Riprova</Button>
  }
  switch (status) {
    case "error":
      return (
        <>
          <h2 className="text-3xl">Hai commesso un errore</h2>
          <TryAgain />
        </>
      )
    case "noTime":
      return (
        <>
          <h2 className="text-3xl">Hai finito il tempo</h2>
          <TryAgain />
        </>
      )
    case "won":
      return(
              <>
        <h2 className="text-3xl">Hai Vinto</h2>
        <TryAgain />
      </>
      )
    default:
      <>
        <h2 className="text-3xl">Qualcosa è andato storto</h2>
        <TryAgain />
      </>
  }
}


export default Playground