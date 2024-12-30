export const purchaseEgg = (user) => {
    if (user.experience >= user.nextLevelExperience) {
      user.level++;

      user.nextLevelExperience += 10;

      user.gold += user.goldIncrease;

      user.goldIncrease += 20
    }
  };