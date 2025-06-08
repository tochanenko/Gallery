import Card from "../components/UI/Card/Card";
import classes from "./Updates.module.scss";

const UPDATES_LIST = [
  {
    number: "1.0.1",
    children: <>
      <p>This update focuses on user experience and legal stuff:</p>

      <ol>
        <li>Implemented new Privacy Policy & Terms of Use page</li>
        <li>Implemented new version history page</li>
      </ol>
    </>
  },
  {
    number: "1.0.0",
    children: <>
      <p><b>Happy 1.0.0 release!</b></p>

      <p>This is the first release of Gallery app of tochanenko.com. In this release:</p>

      <ol>
        <li>Homepage includes a random photo from each available category</li>
        <li>Category page displays a set of images</li>
        <li>Photo page displays photo itself, its' details, ratings and comments</li>
        <li>You can add rating to the photo and leave a comment, but don't forget to set yourself a Username!</li>
        <li>The website is optimised for slow internet, the progress bar and skeleton loaders will assist you in case of internet troubles</li>
        <li>All comments and ratings are stored in persistent storage in the cloud, so you can view them from any device</li>
        <li>Each device has its' own ID, so you can't transfer your account between your devices (yet)</li>
        <li>You can set yourself a random avatar by tapping a big avatar picture in "new comment" section on any Photo page</li>
        <li>You can also set the theme of the website as Day / Night / Auto</li>
      </ol>
    </>
  }
]

export default function Updates() {
  return <>
    <div className="main_container">
      <div className={`container ${classes.updates}`}>
        {UPDATES_LIST.map(update => <Update key={update.number} number={update.number}>{update.children}</Update>)}
      </div>
    </div>
  </>;
}

function Update({ number, children }) {
  return <Card title={<h1>{number}</h1>}>
    {children}
  </Card>
}