import { useParams } from "react-router-dom"

export default function ReviewProb(){
  const { probNum } = useParams();
  return (
    <>
      <h1>Review - problem {probNum}</h1>
    </>
  )
}