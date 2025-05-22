import { useParams } from "react-router-dom";

export default function PhotoPage() {
  const params = useParams();

  return <>
    <div className="container">
      <h1>"{params.photoId}" Photo</h1>
    </div>
  </>
}