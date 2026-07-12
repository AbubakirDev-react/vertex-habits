import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

export default function PageNotFound(){
  return(
    <div className="w-full max-h-screen flex flex-col gap-3 items-center justify-center">
      <h1 className="text-2xl">Page Not Found</h1>
      <Link to={'/'}><Button variant="primary">Back to Dashboard</Button></Link>
    </div>
  )
}