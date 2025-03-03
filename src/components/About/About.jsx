import "./about.css";

// -- TO DO --
// - [ ]

export default function About(props) {
  return (
    <div className="profile">
      <div className="headDivider">§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§</div>{" "}
      <div className="entry">
        <i className="entry">"Aint nobody got time for that..."</i>
        <br /> Go to Quests to get started! Press the '?' for an explanation!
      </div>
      <div className="headDivider">§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§</div>{" "}
      <div className="entry">ABOUT US & UPDATES</div>
      <div className="entry">-03.02.25-</div>
      <div className="entry">
        This lil app started as a one page To-Do list app (which it mainly still
        is), but is slowly developing into something a little more.
      </div>
      <div className="entry">
        As of right now, functionally the only thing you can really do here is
        go to your "Quests" tab and make your own Quest List (whatever chores
        you have to do). The app will keep track of how many you complete, how
        many you abandon, and give you 1xp for each quest you turn in!
      </div>
      <div className="entry">
        You are able to buy exactly ONE scroll, at this point, but there isn't
        currently functionality to do anything with it. Down the road, I'm
        planning on implementing a talent tree that will unfold from your first
        purchased scroll (and skills you'll be able to learn from it) and, of
        course, a simple battle system that will be RPG like encounters.
      </div>
      <div className="entry">Thanks for playing along! --kitsXu</div>
      <div className="entry">Contact Us: kitsxu.apps@gmail.com</div>
      <div className="divider">_________</div>
      <div className="logo">
        <a className="logo-tag-archive" href="https://ko-fi.com/kitsxu">
          -kitsXu-
        </a>
      </div>
    </div>
  );
}
