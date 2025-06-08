import Card from "../components/UI/Card/Card";
import classes from "./Policy.module.scss";

export default function Policy() {
  return <>
    <div className="main_container">
      <div className={`container ${classes.cards}`}>
        <Card title={<h1>Privacy Policy</h1>}>
          <h2>1. No Personal Data Collection</h2>
          <p>We respect your privacy. This website does not use cookies and does not track, store, or share any personal information about visitors with third parties.</p>

          <h2>2. Unique User IDs</h2>
          <p>When you visit our website, a unique ID is generated for your device. This is used only for posting comments and managing your experience on the site.</p>

          <h2>3. Nicknames and Comments</h2>
          <p>Users may post comments and choose their own nicknames. We do not review, moderate, or take responsibility for the content of user-generated comments or nicknames.</p>

          <h2>4. Prohibited Content</h2>
          <p>By using this website, you agree not to use nicknames or write comments that include:</p>
          <ul>
            <li>racism or discrimination of any kind;</li>
            <li>rude or offensive behavior;</li>
            <li>links or references to fascism;</li>
            <li>support for or incitement of Russian aggression towards Ukraine;</li>
            <li>spam or unsolicited advertisements;</li>
            <li>any illegal, abusive, or hateful content.</li>
          </ul>
          <p>Violations may result in removal of content and/or blocking of your access.</p>

          <h2>5. Avatars</h2>
          <p>User avatars are randomly generated using the <a href="https://github.com/fangpenlin/avataaars-generator" target="_blank">Avataaars Generator</a>. The only input from users is a "randomize" action when clicking the avatar. No personal data is used or stored in avatar creation.</p>
        </Card>
        <Card title={<h1>Terms of Use</h1>}>
          <h2>1. Photo Rights</h2>
          <p>All photos on this website are taken by the website owner. <b>All rights are reserved</b>.</p>
          <p>Copying, downloading, or using these photos without permission is prohibited, unless proper attribution is given.</p>
          <p>Example of required attribution:</p>
          <code>Photo by Vladyslav Tochanenko - https://gallery.tochanenko.com</code>

          <h2>2. User Content</h2>
          <p>Users are solely responsible for any nicknames and comments they post. The website owner is not liable for user content. Any prohibited content may be removed without notice.</p>

          <h2>3. Changes</h2>
          <p>This policy may be updated if needed. Please check back regularly for updates.</p>

          <p><i>If you have any questions or concerns about this policy, please contact us using the information provided on the website.</i></p>
        </Card>

      </div>
    </div>
  </>;
}
