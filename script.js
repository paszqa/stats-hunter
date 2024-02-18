


document.addEventListener('DOMContentLoaded', function () {
    // Fetch equipment data from CSV file
    fetch('equipment.csv')
        .then(response => response.text())
        .then(data => {
            equipment = parseCSV(data);
            // Now you can use the 'equipment' array to populate dropdown menus, calculate stats, etc.
                populateDropdown('amulet', equipment, 'Amulet');
                populateDropdown('helmet', equipment, 'Helmet');
                populateDropdown('armor', equipment, 'Armor');
                populateDropdown('legs', equipment, 'Legs');
                populateDropdown('weapon', equipment, 'Weapon');
                populateDropdown('ring', equipment, 'Ring');
                populateDropdown('shield', equipment, 'Shield');
                populateDropdown('boots', equipment, 'Boots');
        })
        .catch(error => console.error('Error fetching equipment data:', error));

    // Calculate stats when input changes
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('change', calculateStats);
    });
});


function parseCSV(csv) {
    const lines = csv.split('\n');
    const headers = lines[0].split(';');
    const equipment = [];

    for (let i = 1; i < lines.length; i++) {
        const currentLine = lines[i].split(';');
        if (currentLine.length === headers.length) {
            const item = {};
            for (let j = 0; j < headers.length; j++) {
                item[headers[j].trim()] = currentLine[j].trim();
            }
            equipment.push(item);
        }
    }
    return equipment;
}


function populateDropdown(id, equipment, type) {
    const dropdown = document.getElementById(id);
    dropdown.innerHTML = '';
    // Filter items based on type
    const filteredItems = equipment.filter(item => item.Slot.toLowerCase() === type.toLowerCase());
    // Populate dropdown options
    filteredItems.forEach(item => {
        const option = document.createElement('option');
        option.text = item.Name;
        dropdown.add(option);
    });
}

function calculateStats() {
    //level
    const characterLevel = parseInt(document.getElementById('characterLevel').value) || 1;
    //skills
    const magicLevel = parseInt(document.getElementById('magicLevel').value) || 0;
    const shieldingSkill = parseInt(document.getElementById('shieldingSkill').value) || 10;
    const swordSkill = parseInt(document.getElementById('swordSkill').value) || 10;
    const axeSkill = parseInt(document.getElementById('axeSkill').value) || 10;
    const clubSkill = parseInt(document.getElementById('clubSkill').value) || 10;
    //eq stats
    const weaponStats = getItemStats(document.getElementById('weapon').value);
    const shieldStats = getItemStats(document.getElementById('shield').value);
    const amuletStats = getItemStats(document.getElementById('amulet').value);
    const helmetStats = getItemStats(document.getElementById('helmet').value);
    const armorStats = getItemStats(document.getElementById('armor').value);
    const ringStats = getItemStats(document.getElementById('ring').value);
    const legsStats = getItemStats(document.getElementById('legs').value);
    const bootsStats = getItemStats(document.getElementById('boots').value);
    const classStats = getClassStats(document.getElementById('class').value);
    //calculated
    const totalArmor = calculateTotalArmor();
    const totalDefense = calculateTotalDefense();
    const baseDamage = calculateBaseDamage(characterLevel);
    const armorReductionMin = Math.floor(totalArmor/2);
    const armorReductionMax = Math.floor(totalArmor/2) * 2 - 1;
    const armorReductionAvg = (armorReductionMin+armorReductionMax)/2;
    const shieldBlockOffensive = (shieldingSkill*totalDefense*5)/100;
    const shieldBlockBalanced = (shieldingSkill*totalDefense*7)/100;
    const shieldBlockDefensive = (shieldingSkill*totalDefense*10)/100;
    const defenseValueOffensive = Math.floor(((7/10) * totalDefense * ((shieldingSkill + 10)/40)) * 10) / 10;
    const defenseValueBalanced = Math.floor(((1) * totalDefense * ((shieldingSkill + 10)/40) - 0.5) * 10 )/ 10;
    const defenseValueDefensive = Math.floor(((8/5) * totalDefense * ((shieldingSkill + 10)/40) - 1) * 10) / 10;
    const meleeDamageAverage = calculateMeleeDamage(baseDamage, swordSkill, axeSkill, clubSkill, weaponStats);
    const meleeDamageMax = (meleeDamageAverage * 2) - baseDamage;
    const whirlwindThrowMin = (parseInt((getCurrentWeaponSkillLevel(weaponStats.Type)) + parseInt(weaponStats.Attack))/3 + (parseInt(characterLevel)/5)).toFixed(1);;
    const whirlwindThrowMax = (parseInt((getCurrentWeaponSkillLevel(weaponStats.Type)) + parseInt(weaponStats.Attack)) + (parseInt(characterLevel)/5)).toFixed(1);;
    const whirlwindThrowAvg = (parseInt(whirlwindThrowMin) + parseInt(whirlwindThrowMax)) / 2;

    //const mainClassStats = getClassStats(document.getElementById('class').value);
    let stats = {
        hitpoints: calculateHitpoints(characterLevel),
        manapoints: calculateManapoints(characterLevel),
        capacity: calculateCapacity(characterLevel),
        //----EQ stats:
        weaponStats: weaponStats,
        shieldStats: shieldStats,
        amuletStats: amuletStats,
        helmetStats: helmetStats,
        armorStats: armorStats,
        legsStats: legsStats,
        bootsStats: bootsStats,
        classStats: classStats,
        totalArmor: totalArmor,
        totalDefense: totalDefense,
        baseDamage: baseDamage,
        armorReductionMin: armorReductionMin,
        armorReductionMax: armorReductionMax,
        armorReductionAvg: armorReductionAvg,
        shieldBlockOffensive: shieldBlockOffensive,
        shieldBlockBalanced: shieldBlockBalanced,
        shieldBlockDefensive: shieldBlockDefensive,
        defenseValueOffensive: defenseValueOffensive,
        defenseValueBalanced: defenseValueBalanced,
        defenseValueDefensive: defenseValueDefensive,
        meleeDamageAverage: meleeDamageAverage,
        meleeDamageMax: meleeDamageMax,
        whirlwindThrowMin: whirlwindThrowMin,
        whirlwindThrowMax: whirlwindThrowMax,
        whirlwindThrowAvg: whirlwindThrowAvg
    };
    displayStats(stats);
}

function calculateBaseDamage(characterLevel) {
    //baseDamage
    let currentLimit = 500;
    let previousLimit = 0;
    let baseDamage = 0;
    for(let i = 1;;i++){
        console.log("i="+i+" currentLimit="+currentLimit+" previousLimit="+previousLimit+" baseDmg:"+baseDamage);
        if(currentLimit > characterLevel){
            
            baseDamage += Math.floor((characterLevel - previousLimit) / (4+i));
            console.log("characterLevel: "+characterLevel+" previousLimit="+previousLimit+" divided by "+(4+i)+" ==> BaseDAMAGE:" +baseDamage);
            break;
        }
        previousLimit = currentLimit;
        currentLimit = currentLimit + 500 + i*100;
        baseDamage += 100;
    }
    return baseDamage;
}

function calculateMeleeDamage(baseDamage, swordSkill, axeSkill, clubSkill, weaponStats){
   
    let weaponSkillLevel = 10;
    switch(weaponStats.Type){
        case "club":
            weaponSkillLevel = parseInt(clubSkill);
            break;
        case "sword":
            weaponSkillLevel = parseInt(swordSkill);
            break;
        case "axe":
            weaponSkillLevel = parseInt(axeSkill);
            break;
    }
    baseDamage = parseInt(baseDamage);
     // =$C$31+((6/5) * $B$18) * ((SWITCH($B$19;"sword";$B$3;"axe";$B$4;"club";$B$5) + 4) / 28)
    averageMeleeDamage = baseDamage + ((6/5) * (weaponStats.Attack * weaponSkillLevel + 4) / 28);
    averageMeleeDamage = Math.floor(averageMeleeDamage * 10) / 10;
    return averageMeleeDamage;
}

function getCurrentWeaponSkillLevel(weaponType){
    let weaponSkillLevel = 0;
    console.log("get current weapon skill level:");
    switch(weaponType){
        case "club":
            weaponSkillLevel = parseInt(document.getElementById('clubSkill').value);
            break;
        case "sword":
            weaponSkillLevel = parseInt(document.getElementById('swordSkill').value);
            break;
        case "axe":
            weaponSkillLevel = parseInt(document.getElementById('axeSkill').value);
            break;
        default:
            weaponSkillLevel = 0;
            break;
    }
    console.log("get current weapon skill level:"+weaponSkillLevel);
    return parseInt(weaponSkillLevel);
}

function calculateTotalArmor() {
    const amulet = document.getElementById('amulet').value;
    const helmet = document.getElementById('helmet').value;
    const armor = document.getElementById('armor').value;
    const legs = document.getElementById('legs').value;
    const ring = document.getElementById('ring').value;
    const boots = document.getElementById('boots').value;
    
    const amuletStats = getItemStats(amulet);
    const helmetStats = getItemStats(helmet);
    const armorStats = getItemStats(armor);
    const legsStats = getItemStats(legs);
    const ringStats = getItemStats(ring);
    const bootsStats = getItemStats(boots);
    
    const totalArmor = parseInt(amuletStats.Armor) + parseInt(helmetStats.Armor) + parseInt(armorStats.Armor) + parseInt(ringStats.Armor) + parseInt(legsStats.Armor) + parseInt(bootsStats.Armor);
    return totalArmor;
}

function getItemStats(itemName) {
    const item = equipment.find(item => item.Name === itemName);
    return item ? item : { Attack: 0, Type: "", Defense: 0 }; // Return default object if item is not found
}

function getClassStats(className) {
    switch (className) {
        case 'Knight':
            return { HealthPerLevel: 15, ManaPerLevel: 5, CapPerLevel: 25 };
        case 'Paladin':
            return { HealthPerLevel: 10, ManaPerLevel: 15, CapPerLevel: 20 };
        case 'Druid':
        case 'Sorcerer':
            return { HealthPerLevel: 5, ManaPerLevel: 30, CapPerLevel: 10 };
        default:
            return { HealthPerLevel: 0, ManaPerLevel: 0, CapPerLevel: 0 };
    }
}

function calculateHitpoints(characterLevel,) {
    const classStats = getClassStats(document.getElementById('class').value);
    return 185 + (characterLevel - 8) * classStats.HealthPerLevel;
}

function calculateManapoints(characterLevel) {
    const classStats = getClassStats(document.getElementById('class').value);
    return 90 + (characterLevel - 8) * classStats.ManaPerLevel;
}

function calculateCapacity(characterLevel) {
    const classStats = getClassStats(document.getElementById('class').value);
    return 470 + (characterLevel - 8) * classStats.CapPerLevel;
}

function calculateTotalDefense(){
    const weapon = document.getElementById('weapon').value;
    const shield = document.getElementById('shield').value;
    
    const weaponStats = getItemStats(weapon);
    const shieldStats = getItemStats(shield);
    
    const totalDefense = parseInt(shieldStats.Defense) + parseInt(weaponStats.Defense);
    return totalDefense;
}
function displayStats(stats) {
    const statsDiv = document.getElementById('stats');
    statsDiv.innerHTML = `
        <h2>Stats</h2>
        <p>Hitpoints: ${stats.hitpoints}</p>
        <p>Manapoints: ${stats.manapoints}</p>
        <p>Capacity: ${stats.capacity}</p>
        <p>Total Armor: ${stats.totalArmor}</p>
        ${stats.weaponStats ? `
            <p>Current Weapon Attack Value: ${stats.weaponStats.Attack}</p>
            <p>Current Weapon Type: ${stats.weaponStats.Type}</p>
            <p>Current Shield Defense: ${stats.shieldStats.Defense}</p>
            <p>Current Total Defense: ${stats.totalDefense}</p>
        ` : ''}
        <p>Base damage: ${stats.baseDamage}</p>
        <p>Armor reduction: MIN:${stats.armorReductionMin} MAX:${stats.armorReductionMax} AVG:${stats.armorReductionAvg}</p>
        <p>Defense value: OFFE:${stats.defenseValueOffensive} BAL:${stats.defenseValueBalanced} DEF:${stats.defenseValueDefensive}</p>
        <p>Melee damage: ${stats.meleeDamageAverage} (${stats.baseDamage} - ${stats.meleeDamageMax})</p>
        <p> Whirlwind Throw: MIN:${stats.whirlwindThrowMin} MAX:${stats.whirlwindThrowMax} AVG:${stats.whirlwindThrowAvg}</p>
    `;
}