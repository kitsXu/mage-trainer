export const chkLevelUp = (user) => {
    if (user.experience >= user.nextLevelExperience) {

      user.level++;

      user.nextLevelExperience += 10;

      user.gold += user.goldIncrease;

      user.goldIncrease += 20;

      

      alert(`
        Level UP! ${user.level}!\n
        `);
      console.log("LEVEL UP");
  }
};
