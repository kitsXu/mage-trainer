import "./spells.css";

export default function BroodRecord() {
  return (
    <div className="profile">
      <h1 className="itemsHeader">Spells- ({0})</h1>
      <div className="divider">_____________</div>
      <div className="scrollInventory">
        {/* <p className="scrollInventory">Bags look empty!</p> */}
        <p className="spellbook-update">
          Spells will be learned from purchased scrolls and fixed into the pages
          of your spellbook. The school is currently still working on binding
          the magical books from resources found in the Eldergrove. This process
          can be timeconsuming, but we will send out notice when the books are ready for use!
        </p>
        <div className="profile-maps">Please be patient while we work!</div>
      </div>
      <div className="divider">_________</div>
      <div className="logo">
        <a className="logo-tag-inv" href="https://ko-fi.com/kitsxu">
          -kitsXu-
        </a>
      </div>
    </div>
  );
}
