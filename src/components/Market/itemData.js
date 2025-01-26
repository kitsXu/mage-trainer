import healthPotion from '../Market/images/healthPotion.png'
import manaPotion from '../Market/images/manaPotion.png';
import speedPotion from '../Market/images/speedPotion.png';

export const items = [
  {
    id: crypto.randomUUID,
    name: "Health Potion",
    cost: 50,
    image: healthPotion,
  },

  {
    id: crypto.randomUUID,
    name: "Speed Potion",
    cost: 75,
    image: speedPotion,
  },

  {
    id: crypto.randomUUID,
    name: "Mana Potion",
    cost: 50,
    image: manaPotion,
  },

];