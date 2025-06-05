import Comment from "../../components/Comment/Comment";

export default function Comments({ photo }) {
  return <>
    {photo && photo.comments ? photo.comments.map(comment => <Comment
      key={comment.id}
      comment={comment}
      animateAppearance
    />) : <></>}
  </>
}