import { useNavigate } from "react-router-dom";
import Button from "../UI/Button/Button";

import classes from "./ErrorComponent.module.scss";

export default function ErrorComponent({ message = "Could not fetch resource.", backendIssue = true }) {
  const navigate = useNavigate();

  function handlePageReload() {
    window.location.reload();
  }

  function handleHomePage() {
    navigate('/');
  }

  const backendIssueTemplate = <>
    <p>Looks like something went wrong on our end. Hang tight and try reloading soon.</p>
    <Button onClick={handlePageReload}>Refresh Page</Button>
  </>

  const clientIssueTemplate = <>
    <p>Hmm… something went wrong while loading this page. You can return to the homepage using the button below.</p>
    <Button onClick={handleHomePage}>Go to Homepage</Button>
  </>

  return <>
    <title>{`VPhotos \u2758 Something went wrong!`}</title>
    <div className={classes.error}>
      <div className={classes.error__details}>
        <h1>An Error Occurred!</h1>
        <p>E: {message}</p>
        {backendIssue ? backendIssueTemplate : clientIssueTemplate}
      </div>
    </div>
  </>
}