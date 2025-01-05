import acidEgg from '../components/Market/images/acidEgg.png';
import healthPotion from '../components/Market/images/healthPotion.png';
import lavaEgg from '../components/Market/images/lavaEgg.png';
import manaPotion from '../components/Market/images/manaPotion.png';
import mountainEgg from '../components/Market/images/mountainEgg.png';
import riverEgg from '../components/Market/images/mountainEgg.png';
import speedPotion from '../components/Market/images/speedPotion.png';

export const healthPotionObj = {
    id: crypto.randomUUID,
    name: "Health Potion",
    value: 50,
    image: healthPotion,
}

export const ManaPotionObj = {
    id: crypto.randomUUID,
    name: "Mana Potion",
    value: 50,
    image: manaPotion,
}

export const speedPotionObj = {
    id: crypto.randomUUID,
    name: "Speed Potion",
    value: 75,
    image: speedPotion,
}

export const plainEggObj = {
    id: crypto.randomUUID,
    name: "Plain Egg",
    value: 75,
    image: mountainEgg,
}

export const lavaEggObj = {
    id: crypto.randomUUID,
    name: "Lava Egg",
    value: 90,
    image: lavaEgg,
}

export const mountainEggObj = {
    id: crypto.randomUUID,
    name: "Mountain Egg",
    value: 90,
    image: mountainEgg,
}

export const riverEggObj = {
    id: crypto.randomUUID,
    name: "River Egg",
    value: 90,
    image: riverEgg,
}

export const acidEggObj = {
    id: crypto.randomUUID,
    name: "Plain Egg",
    value: 125,
    image: acidEgg,
}