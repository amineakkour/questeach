import CreateFileProvider from "../../context/CreateFileProvider";
import CreateFileContainer from "./CreateFileContainer";

export default function CreateFile(){

  return (
    <CreateFileProvider>
      <CreateFileContainer />
    </CreateFileProvider>
  )
}


