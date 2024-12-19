export const goldIncrease = (user) => {
    if (user.level >= 1) {
  

      switch (user.level) {
        case 2:
          user.goldIncrease = 100;
          break;

        case 3:
          user.goldIncrease = 125;
          break;

        case 4:
          user.goldIncrease = 150;
          break;

        default:
          return;
      }
console.log ("Gold Increase--")
    }
  };