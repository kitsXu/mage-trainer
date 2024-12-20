export const chkLevelUp = (user) => {
    if (user.experience >= user.nextLevelExperience) {
      user.level++;

      user.nextLevelExperience += 10;

      user.gold += user.goldIncrease;

      user.goldIncrease += 20

      alert(`
        Ding! Congrats, you're now level ${user.level}!\n
        Now... where the fuck are my eggs?!
        `)
    }
  };
  