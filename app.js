let health = 100;
let depth = 0;
let iron = 0;
let upgradeCost = 10;
let equipmentMod = 0;

const healthField = document.querySelector("[data-health]");
const depthField = document.querySelector("[data-depth]");
const ironField = document.querySelector("[data-iron]");

const digButton = document.querySelector("#dig-action");
digButton.addEventListener("click", dig);

const foodButton = document.querySelector("#food-action");
foodButton.addEventListener("click", food);

const digStraightButton = document.querySelector("#dig-straight-action");
digStraightButton.addEventListener("click", digStraight);

const upgradeButton = document.querySelector("#upgrade-action");
upgradeButton.addEventListener("click", upgrade);

function dice(number, sides) {
    let sum = 0;
    for(let i = 0; i < number; i++) {
        sum += Math.floor((Math.random() * sides) + 1);
    }
    return sum;
}

function digStraight(event) {
    if (health > 0) {
        let lootRoll = dice(2, 6);
        if (lootRoll > 7) {
            if (lootRoll === 12) {
                iron ++;
            }
            iron++;
        } else {
            if (lootRoll == 2) {
                health--;
            }
            health--;
        }
        updateFields();
    }
}

function dig(event) {
    if (health > 0) {
        digPower = Math.floor(health / 10);
        depth += equipmentMod + digPower;
        let lootRoll = dice(2, 6);
        if (lootRoll > 9) {
            iron += lootRoll - 9;
        } else {
            health -= dice(1, 6);
        }
        updateFields();
    }
}

function food(event) {
    if (iron >= 10) {
        iron -= 10;
        health += 15;
        updateFields();
    }
}

function upgrade() {
    if (iron >= upgradeCost) {
        iron -= upgradeCost;
        upgradeCost *= 2;
        equipmentMod += 10;
        updateFields();
    }
}

function updateFields() {
    if (health < 0) {
        health = 0;    
    }
    healthField.innerHTML = health;
    depthField.innerHTML = depth / 100 + "m";
    ironField.innerHTML = iron + " lumps";
    upgradeButton.innerHTML = "Upgrade Equipiment (" + upgradeCost + ")";
}

updateFields();