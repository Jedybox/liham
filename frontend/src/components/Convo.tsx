import { useParams } from "react-router-dom";

function Convo() {
  const id = useParams<{id: string}>();

  return (
    <div 
      className= "h-full w-full borders bg-gradient-to-b from-convo-top to-convo-bottom rounded-xl flex flex-col">
        
      <h1>Convo {id.id}</h1>
      <h1>con</h1>
    </div>
  )
}

export default Convo