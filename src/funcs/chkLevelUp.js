export const chkLevelUp = (user) => {
    if (user.experience >= user.nextLevelExperience) {
      user.level++;

      //-- 1.25 is the percentage, .25 being 25%.
      //-- user.nextLevelExperience = user.nextLevelExperience * 1.25

      // switch (user.level) {
      //   case 2:
      //     user.nextLevelExperience = 20;
      //     break;

      //   case 3:
      //     user.nextLevelExperience = 47;
      //     break;

      //   case 4:
      //     user.nextLevelExperience = 100;
      //     break;

      //   default:
      //     return;
      // }

      //-- increment by a static value, e.g., +10 every level.
      user.nextLevelExperience += 10;

      alert(`
        Ding! Congrats, you're now level ${user.level}!\n
        Now... where the fuck are my eggs?!
        `)
    }
  };
  