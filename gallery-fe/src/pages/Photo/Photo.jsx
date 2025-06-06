import { useEffect, useState } from "react";
import { useRouteLoaderData } from "react-router-dom";

import NewComment from "../../components/NewComment/NewComment";

import PhotoPreview from "../../components/PhotoPreview/PhotoPreview";
import { getPhotoById } from "../../lib/http";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import PhotoBlock from "./PhotoBlock";
import Comments from "./Comments";
import Details from "./Details";

export default function PhotoPage() {
  const [photo, setPhoto] = useState(null);
  const { photo: photoPromise } = useRouteLoaderData('photo');
  const [photoPreview, setPhotoPreview] = useState(false);

  function onSetPhotoPreview(state) {
    setPhotoPreview(state);
  }

  useEffect(() => {
    photoPromise.then(setPhoto);
  }, [photoPromise]);

  function updateComments(updatedComments) {
    setPhoto(prevState => ({ ...prevState, comments: updatedComments }));
  }

  function getPhotoPageTitle(photo) {
    if (photo) {
      if (photo.title !== "") {
        return photo.title;
      } else {
        return "Single photo worth 1000 words";
      }
    } else {
      return "Loading...";
    }
  }

  return <>
    <title>{`VPhotos \u2758 ${getPhotoPageTitle(photo)}`}</title>
    <div className="main_container">
      <div className="container">
        {photo === undefined ? <ErrorComponent /> : (<>
          <PhotoBlock photo={photo} onSetPhotoPreview={onSetPhotoPreview} />

          {photoPreview && (
            <PhotoPreview
              photo={photo}
              onClose={() => setPhotoPreview(false)}
            />
          )}

          <Details photo={photo} onSetPhoto={setPhoto} />

          <Comments photo={photo} />

          <NewComment photo={photo} updateComments={updateComments} />
        </>)}
      </div>
    </div>
  </>
}

export async function loader({ request, params }) {
  const photoId = params.photoId;

  return {
    photo: getPhotoById(photoId)
  }
}
