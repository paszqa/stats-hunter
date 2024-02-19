document.addEventListener('DOMContentLoaded', function () {
    // Fetch equipment data from CSV file
    /*
    fetch('equipment.csv')
        .then(response => response.text())
        .then(data => {
            equipment = parseCSV(data);
            // Now you can use the 'equipment' array to populate dropdown menus, calculate stats, etc.
                //populateDropdown('amulet', equipment, 'Amulet');
                //populateDropdown('helmet', equipment, 'Helmet');
                populateDropdownGrid('amuletDropdownGrid', equipment, 'Amulet');
                populateDropdownGrid('helmetDropdownGrid', equipment, 'Helmet');
                populateDropdownGrid('armorDropdownGrid', equipment, 'Armor');
                populateDropdownGrid('weaponDropdownGrid', equipment, 'Weapon');
                populateDropdownGrid('shieldDropdownGrid', equipment, 'Shield');
                populateDropdownGrid('ammoDropdownGrid', equipment, 'Ammo');
                populateDropdownGrid('ringDropdownGrid', equipment, 'Ring');
                populateDropdownGrid('legsDropdownGrid', equipment, 'Legs');
                populateDropdownGrid('bootsDropdownGrid', equipment, 'Boots');
                //populateDropdown('armor', equipment, 'Armor');
                //populateDropdown('legs', equipment, 'Legs');
                //populateDropdown('weapon', equipment, 'Weapon');
                //populateDropdown('ring', equipment, 'Ring');
                //populateDropdown('shield', equipment, 'Shield');
                //populateDropdown('ammo', equipment, 'Ammo');
                //populateDropdown('boots', equipment, 'Boots');
        })
        .catch(error => console.error('Error fetching equipment data:', error));
        */
    populateAllDropdownGrids("Knight", 8);
    // Calculate stats when input changes
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('change', calculateStats);
    });
});

function populateAllDropdownGrids(characterClass, characterLevel){
    // Fetch equipment data from CSV file
    fetch('equipment.csv')
        .then(response => response.text())
        .then(data => {
            equipment = parseCSV(data);
            // Now you can use the 'equipment' array to populate dropdown menus, calculate stats, etc.
                //populateDropdown('amulet', equipment, 'Amulet');
                //populateDropdown('helmet', equipment, 'Helmet');
                populateDropdownGrid('amuletDropdownGrid', equipment, 'Amulet', characterClass, characterLevel);
                populateDropdownGrid('helmetDropdownGrid', equipment, 'Helmet', characterClass, characterLevel);
                populateDropdownGrid('armorDropdownGrid', equipment, 'Armor', characterClass, characterLevel);
                populateDropdownGrid('weaponDropdownGrid', equipment, 'Weapon', characterClass, characterLevel);
                populateDropdownGrid('shieldDropdownGrid', equipment, 'Shield', characterClass, characterLevel);
                populateDropdownGrid('ammoDropdownGrid', equipment, 'Ammo', characterClass, characterLevel);
                populateDropdownGrid('ringDropdownGrid', equipment, 'Ring', characterClass, characterLevel);
                populateDropdownGrid('legsDropdownGrid', equipment, 'Legs', characterClass, characterLevel);
                populateDropdownGrid('bootsDropdownGrid', equipment, 'Boots', characterClass, characterLevel);
                //populateDropdown('armor', equipment, 'Armor');
                //populateDropdown('legs', equipment, 'Legs');
                //populateDropdown('weapon', equipment, 'Weapon');
                //populateDropdown('ring', equipment, 'Ring');
                //populateDropdown('shield', equipment, 'Shield');
                //populateDropdown('ammo', equipment, 'Ammo');
                //populateDropdown('boots', equipment, 'Boots');
        })
        .catch(error => console.error('Error fetching equipment data:', error));

}

function parseCSV(csv) {
    const lines = csv.split('\n');
    const headers = lines[0].split(';');
    const equipment = [];

    for (let i = 1; i < lines.length; i++) {
        const currentLine = lines[i].split(';');
        if (currentLine.length === headers.length) {
            const item = {};
            for (let j = 0; j < headers.length; j++) {
                let itemToAdd = currentLine[j].trim();
                if(currentLine[j].trim() == ""){
                    itemToAdd = 0;
                }
                console.log(itemToAdd);
                if(headers[j].trim() == "Attributes"){//READ Attributes and make them work
                    let splitByComma = (itemToAdd+"").split(",");
                    splitByComma.forEach(element => {
                        if(element.includes("magic level")){
                            item["MagicLevel"] = element.split("+")[1].split(" ")[0];
                        }
                        else if(element.includes("distance fighting")){
                            item["Distance"] = element.split("+")[1].split(" ")[0];
                        }
                        else if(element.includes("club fighting")){
                            item["Club"] = element.split("+")[1].split(" ")[0];
                        }
                        else if(element.includes("axe fighting")){
                            item["Axe"] = element.split("+")[1].split(" ")[0];
                        }
                        else if(element.includes("sword fighting")){
                            item["Sword"] = element.split("+")[1].split(" ")[0];
                        }
                        else if(element.includes("shielding")){
                            item["Shielding"] = element.split("+")[1].split(" ")[0];
                        } 
                        else if(element.includes("speed")){
                            item["Speed"] = element.split("+")[1].split(" ")[0];
                        } 
                        else if(element.toLowerCase().includes("regeneration")){
                            item["FastRegen"] = "yes";
                        }
                    });


                }
                else{
                    item[headers[j].trim()] = itemToAdd;
                }
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
    const filteredItems = equipment.filter(item => item.Slot.toLowerCase() === type.toLowerCase()).filter(item => parseInt(item.LevelReq) === 80);
    // Populate dropdown options
    filteredItems.forEach(item => {
        const option = document.createElement('option');
        option.text = item.Name;
        dropdown.add(option);
    });
}

function populateDropdownGrid(gridId, equipment, slot, characterClass, characterLevel) {
    const grid = document.getElementById(gridId);
    grid.innerHTML = '';
    console.log("Char class: "+characterClass);
    const filteredItems = equipment
        .filter(item => item.Slot.toLowerCase() === slot.toLowerCase())
        .filter(item => item.Ignore != 1)
        .filter(item => item.LevelReq < characterLevel)
        .filter(item => (item.Vocs === 0 || item[characterClass] === "yes"));
    filteredItems.forEach(item => {
        console.log(item.Name+" | vocs:"+item.Vocs+";"+characterClass+":"+item[characterClass]);
        const gridItem = document.createElement('div');
        gridItem.classList.add('dropdown-grid-item');

        const icon = document.createElement('img');
        icon.src = item.Icon; // Assuming 'Icon' is the name of the column containing image URLs in the CSV

        const name = document.createElement('p');
        name.textContent = item.Name;

        gridItem.addEventListener('click', function() {
            // Update button text with selected item's name and icon
            const button = document.getElementById(slot.toLowerCase()+'Button');
            button.innerHTML = ''; // Clear existing content
            const selectedIcon = document.createElement('img');
            selectedIcon.src = item.Icon;
            const selectedName = document.createElement('p');
            selectedName.setAttribute('id', slot.toLowerCase());
            selectedName.innerText = item.Name;
            button.appendChild(selectedIcon);
            button.appendChild(selectedName);
            //button.appendChild(document.createTextNode(item.Name));
            
            // You can also handle other actions here if needed
            console.log('Selected item:', item);
            calculateStats();
            grid.classList.remove('show'); // Close the dropdown grid
        });

        gridItem.appendChild(icon);
        gridItem.appendChild(name);
        grid.appendChild(gridItem);
    });
}

function toggleDropdown(gridId) {
    const grid = document.getElementById(gridId);
    grid.classList.toggle('show');
}

// Close the dropdown if the user clicks outside of it
window.addEventListener('click', function(event) {
    const dropdowns = document.querySelectorAll('.dropdown-grid');
    dropdowns.forEach(dropdown => {
        if (!event.target.matches('.dropdown-button') && !dropdown.contains(event.target)) {
            dropdown.classList.remove('show');
        }
    });
});

function calculateStats() {
    //class
    const characterClass = document.getElementById('class').value;
    //level
    const characterLevel = parseInt(document.getElementById('characterLevel').value) || 1;
    //skills
    const magicLevel = parseInt(document.getElementById('magicLevel').value) || 0;
    const shieldingSkill = parseInt(document.getElementById('shieldingSkill').value) || 10;
    const swordSkill = parseInt(document.getElementById('swordSkill').value) || 10;
    const axeSkill = parseInt(document.getElementById('axeSkill').value) || 10;
    const clubSkill = parseInt(document.getElementById('clubSkill').value) || 10;
    const distanceSkill = parseInt(document.getElementById('distanceSkill').value) || 10;
    //eq stats
    console.log("WEAPON VALUE: "+document.getElementById('weapon').innerText);
    const weaponStats = getItemStats(document.getElementById('weapon').innerText);
    const shieldStats = getItemStats(document.getElementById('shield').innerText);
    const amuletStats = getItemStats(document.getElementById('amulet').innerText);
    const helmetStats = getItemStats(document.getElementById('helmet').innerText);
    const armorStats = getItemStats(document.getElementById('armor').innerText);
    const ringStats = getItemStats(document.getElementById('ring').innerText);
    const legsStats = getItemStats(document.getElementById('legs').innerText);
    const ammoStats = getItemStats(document.getElementById('ammo').innerText);
    const bootsStats = getItemStats(document.getElementById('boots').innerText);
    const classStats = getClassStats(document.getElementById('class').value);
    //populate dropdown grids
    console.log("Populate for class: "+characterClass);
    populateAllDropdownGrids(characterClass, characterLevel);
    //calculated
    const totalArmor = calculateTotalArmor();
    const totalDefense = calculateTotalDefense();
    const baseDamage = calculateBaseDamage(characterLevel);
    const armorReductionMin = Math.max(0,Math.floor(totalArmor/2));
    const armorReductionMax = Math.max(0,Math.floor(totalArmor/2) * 2 - 1);
    const armorReductionAvg = Math.max(0,(armorReductionMin+armorReductionMax)/2);
    const shieldBlockOffensive = (shieldingSkill*totalDefense*5)/100;
    const shieldBlockBalanced = (shieldingSkill*totalDefense*7)/100;
    const shieldBlockDefensive = (shieldingSkill*totalDefense*10)/100;
    const defenseValueOffensive = Math.max(0,Math.floor(((7/10) * totalDefense * ((shieldingSkill + 10)/40)) * 10) / 10);
    const defenseValueBalanced = Math.max(0,Math.floor(((1) * totalDefense * ((shieldingSkill + 10)/40) - 0.5) * 10 )/ 10);
    const defenseValueDefensive = Math.max(0,Math.floor(((8/5) * totalDefense * ((shieldingSkill + 10)/40) - 1) * 10) / 10);
    const meleeDamageAverage = (calculateMeleeDamage(baseDamage, swordSkill, axeSkill, clubSkill, weaponStats)).toFixed(1);
    const meleeDamageMax = ((parseInt(meleeDamageAverage) * 2) - baseDamage).toFixed(1);
    const whirlwindThrowMin = (parseInt((getCurrentWeaponSkillLevel(weaponStats.Type)) + parseInt(weaponStats.Attack))/3 + (parseInt(characterLevel)/5)).toFixed(1);;
    const whirlwindThrowMax = (parseInt((getCurrentWeaponSkillLevel(weaponStats.Type)) + parseInt(weaponStats.Attack)) + (parseInt(characterLevel)/5)).toFixed(1);;
    const whirlwindThrowAvg = (parseInt(whirlwindThrowMin) + parseInt(whirlwindThrowMax)) / 2;
    const groundshakerMin = parseInt(0.5 * parseInt((getCurrentWeaponSkillLevel(weaponStats.Type)) + parseInt(weaponStats.Attack)) + (parseInt(characterLevel)/5)).toFixed(1);
    const groundshakerMax = parseInt(1.1 * parseInt((getCurrentWeaponSkillLevel(weaponStats.Type)) + parseInt(weaponStats.Attack)) + (parseInt(characterLevel)/5)).toFixed(1);
    const groundshakerAvg =  (parseInt(groundshakerMin) + parseInt(groundshakerMax)) / 2;
    const berserkMin = parseInt(0.5 * parseInt((getCurrentWeaponSkillLevel(weaponStats.Type)) + parseInt(weaponStats.Attack)) + (parseInt(characterLevel)/5)).toFixed(1);
    const berserkMax = parseInt(1.5 * parseInt((getCurrentWeaponSkillLevel(weaponStats.Type)) + parseInt(weaponStats.Attack)) + (parseInt(characterLevel)/5)).toFixed(1);
    const berserkAvg = (parseInt(berserkMin) + parseInt(berserkMax)) / 2;
    const fierceBerserkMin = parseInt(1.1 * parseInt((getCurrentWeaponSkillLevel(weaponStats.Type)) + parseInt(weaponStats.Attack)) + (parseInt(characterLevel)/5)).toFixed(1);
    const fierceBerserkMax = parseInt(3 * parseInt((getCurrentWeaponSkillLevel(weaponStats.Type)) + parseInt(weaponStats.Attack)) + (parseInt(characterLevel)/5)).toFixed(1);
    const fierceBerserkAvg = (parseInt(fierceBerserkMin) + parseInt(fierceBerserkMax)) / 2;
    let distanceDamageMin = 0;
    let distanceDamageMax = 0;
    let distanceDamageAvg = 0;
    let distanceHitChance = [0, 0, 0, 0, 0, 0, 0];
    if(weaponStats.Type == "distance"){
        distanceDamageMin = characterLevel / 5;
        distanceDamageMax = 0.09 * parseInt(distanceSkill) * parseInt(parseInt(weaponStats.Atkmod) + parseInt(ammoStats.Attack)) + parseFloat(distanceDamageMin);
        distanceDamageAvg = (parseInt(distanceDamageMin) + parseInt(distanceDamageMax))/2;
        switch(parseInt(weaponStats.Handed)){
            case 1:
                for(let i = 0; i < parseInt(weaponStats.Range); i++){
                    switch(i){
                        case 0:
                            distanceHitChance[i] = Math.min(75, (parseInt(distanceSkill) + 1));
                            break;
                        case 1:
                            distanceHitChance[i] = Math.min(75, 2.4 * (parseInt(distanceSkill) + 8));
                            break;
                        case 2:
                            distanceHitChance[i] = Math.min(75, 1.55 * (parseInt(distanceSkill) + 6));
                            break;
                        case 3:
                            distanceHitChance[i] = Math.min(75, 1.25 * (parseInt(distanceSkill) + 3));
                            break;
                        case 4:
                            distanceHitChance[i] = Math.min(75, (parseInt(distanceSkill) + 1));
                            break;
                        case 5:
                            distanceHitChance[i] = Math.min(75, 0.8 * (parseInt(distanceSkill) + 3));
                            break;
                        case 6:
                            distanceHitChance[i] = Math.min(75, 0.7 * (parseInt(distanceSkill) + 2));
                            break;
                        default:
                            break;
                    }
                    console.log("DHC1:"+distanceHitChance[i]);
                }
                break;
            case 2:
                for(let i = 0; i < parseInt(weaponStats.Range); i++){
                    switch(i){
                        case 0:
                            distanceHitChance[i] = Math.min(90, 1.2 * (parseInt(distanceSkill) + 1));
                            break;
                        case 1:
                            distanceHitChance[i] = Math.min(90, 3.2 * (parseInt(distanceSkill) + 0));
                            break;
                        case 2:
                            distanceHitChance[i] = Math.min(90, 2 * (parseInt(distanceSkill) + 0));
                            break;
                        case 3:
                            distanceHitChance[i] = Math.min(90, 1.55 * (parseInt(distanceSkill) + 0));
                            break;
                        case 4:
                            distanceHitChance[i] = Math.min(90, 1.2 * (parseInt(distanceSkill) + 1));
                            break;
                        case 5:
                            distanceHitChance[i] = Math.min(90, 1 * (parseInt(distanceSkill) + 0));
                            break;
                        case 6:
                            distanceHitChance[i] = Math.min(90, 1 * (parseInt(distanceSkill) + 0));
                            break;
                        default:
                            break;
                    }
                    console.log("DHC2:"+distanceHitChance[i]);
                    distanceHitChance[i] = distanceHitChance[i].toFixed(0);
                }
                break;
            default:
                console.log("DHC:"+distanceHitChance);
                break;
        }
    }
    const etherealSpearMin = (((parseInt(distanceSkill) + 25)/3) + characterLevel/5).toFixed(1);
    const etherealSpearMax = (((parseInt(distanceSkill) + 25)) + characterLevel/5).toFixed(1);
    const etherealSpearAvg = ((parseInt(etherealSpearMin) + parseInt(etherealSpearMax))/2).toFixed(1);
    const strongEtherealMin = (((parseInt(distanceSkill) + 25) * 2/3) + characterLevel/5).toFixed(1);
    const strongEtherealMax = (((parseInt(distanceSkill) + 25) * 3/2) + characterLevel/5).toFixed(1);
    const strongEtherealAvg = ((parseInt(strongEtherealMin) + parseInt(strongEtherealMax))/2).toFixed(1);
    
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
        ringStats: ringStats,
        ammoStats: ammoStats,
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
        whirlwindThrowAvg: whirlwindThrowAvg,
        groundshakerMin: groundshakerMin,
        groundshakerMax: groundshakerMax,
        groundshakerAvg: groundshakerAvg,
        berserkMin: berserkMin,
        berserkMax: berserkMax,
        berserkAvg: berserkAvg,
        fierceBerserkMin: fierceBerserkMin,
        fierceBerserkMax: fierceBerserkMax,
        fierceBerserkAvg: fierceBerserkAvg,
        distanceDamageMin: distanceDamageMin,
        distanceDamageMax: distanceDamageMax,
        distanceDamageAvg: distanceDamageAvg,
        distanceHitChance: distanceHitChance,
        etherealSpearMin: etherealSpearMin,
        etherealSpearMax: etherealSpearMax,
        etherealSpearAvg: etherealSpearAvg,
        strongEtherealMin: strongEtherealMin,
        strongEtherealMax: strongEtherealMax,
        strongEtherealAvg: strongEtherealAvg
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
    const amulet = document.getElementById('amulet').innerText;
    const helmet = document.getElementById('helmet').innerText;
    const armor = document.getElementById('armor').innerText;
    const legs = document.getElementById('legs').innerText;
    const ring = document.getElementById('ring').innerText;
    const boots = document.getElementById('boots').innerText;
    
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
    const weapon = document.getElementById('weapon').innerText;
    const shield = document.getElementById('shield').innerText;
    
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
        <p>Armor reduction: ${stats.armorReductionAvg} (${stats.armorReductionMin} - ${stats.armorReductionMax})</p>
        <p>Defense value: OFFE:${stats.defenseValueOffensive} BAL:${stats.defenseValueBalanced} DEF:${stats.defenseValueDefensive}</p>
        <p>Melee damage: ${stats.meleeDamageAverage} (${stats.baseDamage} - ${stats.meleeDamageMax})</p>
        <p>Whirlwind Throw: ${stats.whirlwindThrowAvg} (${stats.whirlwindThrowMin} - ${stats.whirlwindThrowMax})</p>
        <p>Groundshaker: ${stats.groundshakerAvg} (${stats.groundshakerMin} - ${stats.groundshakerMax})</p>
        <p>Berserk: ${stats.berserkAvg} (${stats.berserkMin} - ${stats.berserkMax})</p>
        <p>Fierce Berserk: ${stats.fierceBerserkAvg} (${stats.fierceBerserkMin} - ${stats.fierceBerserkMax})</p>
        <p>Distance damage: ${stats.distanceDamageAvg} (${stats.distanceDamageMin} - ${stats.distanceDamageMax})</p>
        <p>Distance hit chance: ${stats.distanceHitChance}</p>
        <p>Ethereal spear damage: ${stats.etherealSpearAvg} (${stats.etherealSpearMin} - ${stats.etherealSpearMax})</p>
        <p>Strong ethereal spear damage: ${stats.strongEtherealAvg} (${stats.strongEtherealMin} - ${stats.strongEtherealMax})</p>
        
    `;
}