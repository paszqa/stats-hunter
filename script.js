let mainStats;
let mainCharacterClass;
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
        input.addEventListener('change', calculateMonster);
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
    fetch('monsters.csv')
        .then(response => response.text())
        .then(data => {
            monsters = parseMonstersCSV(data);
            populateMonsterDropdown('monstersDropdown', monsters);
        })
        .catch(error => console.error('Error fetching monsters data:', error));
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
                //console.log(itemToAdd);
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


function parseMonstersCSV(csv) {
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
                //console.log(itemToAdd);
                item[headers[j].trim()] = itemToAdd;
                
            }
            equipment.push(item);
        }
    }
    return equipment;
}


// Add event listeners to each number input for custom increment/decrement buttons
document.querySelectorAll('input[type="number"]').forEach(input => {
    // Hide default arrows
    input.style.appearance = 'textfield';

    // Create decrement button
    const decrementBtn = document.createElement('button');
    decrementBtn.innerHTML = ' - ';
    decrementBtn.className = "minus";
    decrementBtn.onclick = function() {
        input.stepDown();
        input.dispatchEvent(new Event('change')); // Manually dispatch change event
    };

    // Create increment button
    const incrementBtn = document.createElement('button');
    incrementBtn.innerHTML = ' + ';
    incrementBtn.className = "plus";
    incrementBtn.onclick = function() {
        input.stepUp();
        input.dispatchEvent(new Event('change')); // Manually dispatch change event
    };

    // Wrap input field with custom buttons
    const wrapper = document.createElement('div');
    wrapper.classList.add('number-input-wrapper');
    input.parentNode.insertBefore(wrapper, input);
    wrapper.appendChild(decrementBtn);
    wrapper.appendChild(input);
    wrapper.appendChild(incrementBtn);
});


const classIcons = document.querySelectorAll('.class-icon');

// Add click event listener to each icon
classIcons.forEach(icon => {
    icon.addEventListener('click', function() {
        // Remove active class from all icons
        classIcons.forEach(icon => {
            icon.classList.remove('active');
        });
        // Add active class to the clicked icon
        this.classList.add('active');
        // Get the selected class value
        mainCharacterClass = this.getAttribute('alt');
        console.log('Selected class:', mainCharacterClass);
    });
});

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

function populateMonsterDropdown(id, monsters) {
    const dropdown = document.getElementById(id);
    //console.log("DROPDOWN MONSTERS:"+dropdown.innerHTML);
    let value;
    if(dropdown.value != ""){
        value = dropdown.value;
    }
    dropdown.innerHTML='';
    // Populate dropdown options
    monsters.forEach(item => {
        const option = document.createElement('option');
        option.text = item.Monster;
        dropdown.add(option);
    });
    
    if(value){
        dropdown.value = value;
    }
}
function populateDropdownGrid(gridId, equipment, slot, characterClass, characterLevel) {
    const grid = document.getElementById(gridId);
    grid.innerHTML = '';
    //console.log("Char class: "+characterClass);
    let filteredItems = equipment
        .filter(item => item.Slot.toLowerCase() === slot.toLowerCase())
        .filter(item => item.Ignore != 1)
        .filter(item => item.LevelReq < characterLevel)
        .filter(item => (item.Vocs === 0 || item[characterClass] === "yes"));
    if(slot.toLowerCase() == "ammo"){
        const weaponStats = getItemStats(document.getElementById('weapon').innerText);
        const weaponType = weaponStats.Type;
        filteredItems = filteredItems.filter(item => ((item.Type === weaponType) || (item.Type === "any")));
    }
    filteredItems.forEach(item => {
        //console.log(item.Name+" | vocs:"+item.Vocs+";"+characterClass+":"+item[characterClass]);
        const gridItem = document.createElement('div');
        gridItem.classList.add('dropdown-grid-item');

        const icon = document.createElement('img');
        if(item.Icon != "test.png"){
            icon.src = "images/"+item.Icon.split("/")[7];//(/cb=\d+\&/, '');; // Assuming 'Icon' is the name of the column containing image URLs in the CSV
        }
        else{
            icon.src = "test.png";
        }

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
            //console.log('Selected item:', item);
            calculateStats();
            calculateMonster();
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
    const characterClass = mainCharacterClass;//document.getElementById('class').value;
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
    //console.log("WEAPON VALUE: "+document.getElementById('weapon').innerText);
    const weaponStats = getItemStats(document.getElementById('weapon').innerText);
    const shieldStats = getItemStats(document.getElementById('shield').innerText);
    const amuletStats = getItemStats(document.getElementById('amulet').innerText);
    const helmetStats = getItemStats(document.getElementById('helmet').innerText);
    const armorStats = getItemStats(document.getElementById('armor').innerText);
    const ringStats = getItemStats(document.getElementById('ring').innerText);
    const legsStats = getItemStats(document.getElementById('legs').innerText);
    const ammoStats = getItemStats(document.getElementById('ammo').innerText);
    const bootsStats = getItemStats(document.getElementById('boots').innerText);
    const classStats = getClassStats(mainCharacterClass);
    //populate dropdown grids
    //console.log("Populate for class: "+characterClass);
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
    let berserkMin = 0;
    let berserkMax = 0;
    let berserkAvg = 0;
    if(characterClass == "Knight" && characterLevel >= 35){
        berserkMin = parseInt(0.5 * parseInt((getCurrentWeaponSkillLevel(weaponStats.Type)) + parseInt(weaponStats.Attack)) + (parseInt(characterLevel)/5)).toFixed(1);
        berserkMax = parseInt(1.5 * parseInt((getCurrentWeaponSkillLevel(weaponStats.Type)) + parseInt(weaponStats.Attack)) + (parseInt(characterLevel)/5)).toFixed(1);
        berserkAvg = (parseInt(berserkMin) + parseInt(berserkMax)) / 2;
    }
    let fierceBerserkMin = 0;
    let fierceBerserkMax = 0;
    let fierceBerserkAvg = 0;
    if(characterClass == "Knight" && characterLevel >= 90){
        fierceBerserkMin = parseInt(1.1 * parseInt((getCurrentWeaponSkillLevel(weaponStats.Type)) + parseInt(weaponStats.Attack)) + (parseInt(characterLevel)/5)).toFixed(1);
        fierceBerserkMax = parseInt(3 * parseInt((getCurrentWeaponSkillLevel(weaponStats.Type)) + parseInt(weaponStats.Attack)) + (parseInt(characterLevel)/5)).toFixed(1);
        fierceBerserkAvg = (parseInt(fierceBerserkMin) + parseInt(fierceBerserkMax)) / 2;
    }
    let distanceDamageMin = 0;
    let distanceDamageMax = 0;
    let distanceDamageAvg = 0;
    let distanceHitChance = [0, 0, 0, 0, 0, 0, 0];
    if(weaponStats.Type == "bow" || weaponStats.Type == "crossbow"){
        distanceDamageMin = characterLevel / 5;
        distanceDamageMax = 0.09 * parseInt(distanceSkill) * parseInt(parseInt(weaponStats.Atkmod) + parseInt(ammoStats.Attack)) + parseFloat(distanceDamageMin);
        distanceDamageAvg = (parseInt(distanceDamageMin) + parseInt(distanceDamageMax))/2;
        console.log("WEAPON HANDED: "+weaponStats.Handed);
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
                    //console.log("DHC1:"+distanceHitChance[i]);
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
                    //console.log("DHC2:"+distanceHitChance[i]);
                    distanceHitChance[i] = distanceHitChance[i].toFixed(0);
                }
                break;
            default:
                //console.log("DHC:"+distanceHitChance);
                break;
        }
    }
    const etherealSpearMin = (((parseInt(distanceSkill) + 25)/3) + characterLevel/5).toFixed(1);
    const etherealSpearMax = (((parseInt(distanceSkill) + 25)) + characterLevel/5).toFixed(1);
    const etherealSpearAvg = ((parseInt(etherealSpearMin) + parseInt(etherealSpearMax))/2).toFixed(1);
    const strongEtherealMin = (((parseInt(distanceSkill) + 25) * 2/3) + characterLevel/5).toFixed(1);
    const strongEtherealMax = (((parseInt(distanceSkill) + 25) * 3/2) + characterLevel/5).toFixed(1);
    const strongEtherealAvg = ((parseInt(strongEtherealMin) + parseInt(strongEtherealMax))/2).toFixed(1);
    const exoriSanMin = (characterLevel/5) + (magicLevel * 7) + 44;
    const exoriSanMax = (characterLevel/5) + (magicLevel * 13) + 79;
    const exoriSanAvg = (exoriSanMin + exoriSanMax) / 2;
    const exevoMasSanMin = (characterLevel/5) + (magicLevel * 4);
    const exevoMasSanMax = (characterLevel/5) + (magicLevel * 6);
    const exevoMasSanAvg = (exevoMasSanMin + exevoMasSanMax) / 2;
    //runes Damage
    const icicleFireballMin = (characterLevel/5) + (magicLevel * 1.8) + 10;
    const icicleFireballMax = (characterLevel/5) + (magicLevel * 3) + 18;
    const icicleFireballAvg = (icicleFireballMin + icicleFireballMax) / 2;
    const sdMin = (characterLevel/5) + (magicLevel * 4.6) + 28;
    const sdMax = (characterLevel/5) + (magicLevel * 7.3) + 46;
    const sdAvg = (sdMin + sdMax) / 2;
    const thunderstormStoneShowerMin = (characterLevel/5) + (magicLevel * 1) + 6;
    const thunderstormStoneShowerMax = (characterLevel/5) + (magicLevel * 2.6) + 16;
    const thunderstormStoneShowerAvg = (thunderstormStoneShowerMin + thunderstormStoneShowerMax) / 2;
    const avaGfbMin = (characterLevel/5) + (magicLevel * 1.2) + 7;
    const avaGfbMax = (characterLevel/5) + (magicLevel * 2.8) + 17;
    const avaGfbAvg = (avaGfbMin + avaGfbMax) / 2;
    //healing
    const exuraMin = (characterLevel/5) + (magicLevel * 1.4) + 8;
    const exuraMax = (characterLevel/5) + (magicLevel * 1.8) + 11;
    const exuraAvg = (exuraMin + exuraMax) / 2;
    const exuraGranMin = (characterLevel/5) + (magicLevel * 3.2) + 20;
    const exuraGranMax = (characterLevel/5) + (magicLevel * 5.6) + 35;
    const exuraGranAvg = (exuraGranMin + exuraGranMax) / 2;
    const exuraIcoMin = (characterLevel/5) + (magicLevel * 4) + 25;
    const exuraIcoMax = (characterLevel/5) + (magicLevel * 8) + 50;
    const exuraIcoAvg = (exuraIcoMin + exuraIcoMax) / 2;
    const exuraVitaMin = (characterLevel/5) + (magicLevel * 7) + 44;
    const exuraVitaMax = (characterLevel/5) + (magicLevel * 13) + 79;
    const exuraVitaAvg = (exuraVitaMin + exuraVitaMax) / 2;
    const exuraSanMin = (characterLevel/5) + (magicLevel * 18.5);
    const exuraSanMax = (characterLevel/5) + (magicLevel * 25);
    const exuraSanAvg = (exuraSanMin + exuraSanMax) / 2;
    //---advanced calculated stats:
    let firstTurnMin = 0;


    //---- TURNS HARD-CODED CALCULATION (temporary)
    //knight
    let meleeFirstTurnMin = 0;
    let meleeFirstTurnMax = 0;
    let meleeFirstTurnAvg = 0;
    let meleeSecondTurnMin = 0;
    let meleeSecondTurnMax = 0;
    let meleeSecondTurnAvg = 0;
    //paladin
    let distanceFirstTurnMin = 0;
    let distanceFirstTurnMax = 0;
    let distanceFirstTurnAvg = 0;
    let distanceFirstTurnHitChance = distanceHitChance[4]/100;
    let distanceSecondTurnMin = 0;
    let distanceSecondTurnMax = 0;
    let distanceSecondTurnAvg = 0;
    let distanceSecondTurnHitChance = distanceHitChance[3]/100;
    let distanceThirdTurnMin = 0;
    let distanceThirdTurnMax = 0;
    let distanceThirdTurnAvg = 0;
    let distanceThirdTurnHitChance = distanceHitChance[2]/100;
    let turns = [];
    switch(characterClass){
        case "Knight":  
            meleeFirstTurnMin = parseFloat(baseDamage) + parseFloat(berserkMin);
            meleeFirstTurnMax = parseFloat(meleeDamageMax) + parseFloat(berserkMax);
            meleeFirstTurnAvg = (meleeFirstTurnMin + meleeFirstTurnMax)/2;
            meleeSecondTurnMin = parseFloat(baseDamage);
            meleeSecondTurnMax = parseFloat(meleeDamageMax);
            meleeSecondTurnAvg = (meleeSecondTurnMin + meleeSecondTurnMax)/2;
            turns = [meleeFirstTurnAvg.toFixed(1), meleeSecondTurnAvg.toFixed(1)];
            break;
        case "Paladin":
            distanceFirstTurnMin = parseFloat(distanceDamageMin) + parseFloat(strongEtherealMin);
            distanceFirstTurnMax = parseFloat(distanceDamageMax) + parseFloat(strongEtherealMax);
            distanceFirstTurnAvg = ((distanceFirstTurnMin + distanceFirstTurnMax)/2) * distanceFirstTurnHitChance;
            distanceSecondTurnMin = parseFloat(distanceDamageMin) + parseFloat(etherealSpearMin);
            distanceSecondTurnMax = parseFloat(distanceDamageMax) + parseFloat(etherealSpearMax);
            distanceSecondTurnAvg = ((distanceSecondTurnMin + distanceSecondTurnMax)/2) * distanceSecondTurnHitChance;
            distanceThirdTurnMin = parseFloat(distanceDamageMin) + parseFloat(etherealSpearMin);
            distanceThirdTurnMax = parseFloat(distanceDamageMax) + parseFloat(etherealSpearMax);
            distanceThirdTurnAvg = ((distanceThirdTurnMin + distanceThirdTurnMax)/2) * distanceThirdTurnHitChance;
            turns = [distanceFirstTurnAvg.toFixed(1), distanceSecondTurnAvg.toFixed(1), distanceThirdTurnAvg.toFixed(1)];
            break;

    }


    
    let stats = {
        characterClass: characterClass,
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
        strongEtherealAvg: strongEtherealAvg,
        exoriSanMin: exoriSanMin,
        exoriSanMax: exoriSanMax,
        exoriSanAvg: exoriSanAvg,
        exevoMasSanMin: exevoMasSanMin,
        exevoMasSanMax: exevoMasSanMax,
        exevoMasSanAvg: exevoMasSanAvg,
        icicleFireballMin: icicleFireballMin,
        icicleFireballMax: icicleFireballMax,
        icicleFireballAvg: icicleFireballAvg,
        sdMin: sdMin,
        sdMax: sdMax,
        sdAvg: sdAvg,
        thunderstormStoneShowerMin: thunderstormStoneShowerMin,
        thunderstormStoneShowerMax: thunderstormStoneShowerMax,
        thunderstormStoneShowerAvg: thunderstormStoneShowerAvg,
        avaGfbMin: avaGfbMin,
        avaGfbMax: avaGfbMax,
        avaGfbAvg: avaGfbAvg,
        exuraMin: exuraMin,
        exuraMax: exuraMax,
        exuraAvg: exuraAvg,
        exuraGranMin: exuraGranMin,
        exuraGranMax: exuraGranMax,
        exuraGranAvg: exuraGranAvg,
        exuraIcoMin: exuraIcoMin,
        exuraIcoMax: exuraIcoMax,
        exuraIcoAvg: exuraIcoAvg,
        exuraVitaMin: exuraVitaMin,
        exuraVitaMax: exuraVitaMax,
        exuraVitaAvg: exuraVitaAvg,
        exuraSanMin: exuraSanMin,
        exuraSanMax: exuraSanMax,
        exuraSanAvg: exuraSanAvg,
        turns: turns
    };
    mainStats = stats;
    displayStats(stats);
}

function calculateBaseDamage(characterLevel) {
    //baseDamage
    let currentLimit = 500;
    let previousLimit = 0;
    let baseDamage = 0;
    for(let i = 1;;i++){
        //console.log("i="+i+" currentLimit="+currentLimit+" previousLimit="+previousLimit+" baseDmg:"+baseDamage);
        if(currentLimit > characterLevel){
            
            baseDamage += Math.floor((characterLevel - previousLimit) / (4+i));
            //console.log("characterLevel: "+characterLevel+" previousLimit="+previousLimit+" divided by "+(4+i)+" ==> BaseDAMAGE:" +baseDamage);
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
    //console.log("get current weapon skill level:");
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
    //console.log("get current weapon skill level:"+weaponSkillLevel);
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
    const classStats = getClassStats(mainCharacterClass);
    return 185 + (characterLevel - 8) * classStats.HealthPerLevel;
}

function calculateManapoints(characterLevel) {
    const classStats = getClassStats(mainCharacterClass);
    return 90 + (characterLevel - 8) * classStats.ManaPerLevel;
}

function calculateCapacity(characterLevel) {
    const classStats = getClassStats(mainCharacterClass);
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
    for(let i = 0; i < stats.turns.length;i++){
        console.log("TURN "+i+"::::"+stats.turns[i]);
    }
    let classSpecificDiv = "";
    switch(stats.characterClass.toLowerCase()){
        case "knight":
            classSpecificDiv = `
            <p>Melee damage: ${stats.meleeDamageAverage} (${stats.baseDamage} - ${stats.meleeDamageMax})</p>
            <p>Whirlwind Throw: ${stats.whirlwindThrowAvg} (${stats.whirlwindThrowMin} - ${stats.whirlwindThrowMax})</p>
            <p>Groundshaker: ${stats.groundshakerAvg} (${stats.groundshakerMin} - ${stats.groundshakerMax})</p>
            <p>Berserk: ${stats.berserkAvg} (${stats.berserkMin} - ${stats.berserkMax})</p>
            <p>Fierce Berserk: ${stats.fierceBerserkAvg} (${stats.fierceBerserkMin} - ${stats.fierceBerserkMax})</p>`;
            break;
        case "paladin":
            classSpecificDiv = `<p>Distance damage: ${stats.distanceDamageAvg} (${stats.distanceDamageMin} - ${stats.distanceDamageMax})</p>
            <p>Distance hit chance: ${stats.distanceHitChance}</p>
            <p>Ethereal spear damage: ${stats.etherealSpearAvg} (${stats.etherealSpearMin} - ${stats.etherealSpearMax})</p>
            <p>Strong ethereal spear damage: ${stats.strongEtherealAvg} (${stats.strongEtherealMin} - ${stats.strongEtherealMax})</p>
            <p>Exevo mas san damage: ${stats.exevoMasSanAvg} (${stats.exevoMasSanMin} - ${stats.exevoMasSanMax})</p>
            <p>Exura san healing: ${stats.exuraSanAvg} (${stats.exuraSanMin} - ${stats.exuraSanMax})</p>`;
            break;
        case "sorcerer":
            break;
        case "druid":
            break;
        default:
            break;
    }
    let weaponDiv = ""
    switch(stats.weaponStats.Type){
        case "sword":
            weaponDiv = `<img class="smallWeaponType" src="images/Sword.webp">`;
            break;
        case "axe":
            weaponDiv = `<img class="smallWeaponType" src="images/Axe.webp">`;
            break;
        case "club":
            weaponDiv = `<img class="smallWeaponType" src="images/Club.webp">`;
            break;
        case "crossbow":
            weaponDiv = `<img class="smallWeaponType" src="images/Crossbow.webp">`;
            break;
        case "bow":
            weaponDiv = `<img class="smallWeaponType" src="images/Bow.webp">`;
            break;
        default:
            weaponDiv = `<img class="smallWeaponType" src="images/Cauliflower.webp">`;
            break;
    }
    statsDiv.innerHTML = `
        <h2>Stats</h2>
        <div class="calculatedStats"><img src="images/Hit_Points_Icon.webp"> ${stats.hitpoints}</div>
        <div class="calculatedStats"><img src="images/Mana_Icon.webp"> ${stats.manapoints}</div>
        <div class="calculatedStats"><img src="images/Capacity_Icon.webp"> ${stats.capacity}</div>
        <div class="calculatedStats"><img src="images/Armor_Icon.gif"> ${stats.totalArmor}</div>
        <div class="calculatedStats"><img src="images/Shielding_Icon.png"> ${stats.totalDefense}</div>
        ${stats.weaponStats ? `
            <div class="calculatedWeaponShield">
                <div class="calculatedWeapon">
                    <div class="weaponImage"><img src="${stats.weaponStats.Icon}"></div>
                    <div class="weaponSubtitle">${weaponDiv} ${stats.weaponStats.Attack}/${stats.weaponStats.Defense}</div>
                </div>
            <div class="calculatedShield">Shield: <img src="https://static.wikia.nocookie.net/tibia/images/1/17/Steel_Shield.gif/revision/latest?cb=20050614194907&path-prefix=en&format=original">${stats.shieldStats.Defense}</div>
            </div>
        ` : ''}
        <div class="calculatedStats">Armor reduction: ~${stats.armorReductionAvg} (${stats.armorReductionMin} - ${stats.armorReductionMax})</div>
        <div class="calculatedStats">Defense value:
        <img src="images/Offensive_Fighting.gif"> ${stats.defenseValueOffensive}
        <img src="images/Balanced_Fighting.gif"> ${stats.defenseValueBalanced}
        <img src="images/Defensive_Fighting.gif"> ${stats.defenseValueDefensive}</div>
        ${classSpecificDiv}
        <div class="calculatedStats">DMG turns: ${(stats.turns)}</div>
    `;
}

function getDamageTakenColor(value){
    if(value >= 1.2) return "005f09";
    if(value > 1) return "068112";
    if(value == 1) return "71c01a";
    if(value >= 0.8) return "c0be1a";
    if(value > 0.3) return "c0be1a";
    else return "b70000";
}
function calculateMonster(){
    const monsterName = document.getElementById('monstersDropdown').value;
    //object with base stats of monster:
    const monsterStats = getMonsterStats(monsterName);
    const physical = monsterStats.Physical;
    const physicalColor = getDamageTakenColor(physical);
    const death = monsterStats.Death;
    const deathColor = getDamageTakenColor(death);
    const holy = monsterStats.Holy;
    const holyColor = getDamageTakenColor(holy);
    const ice = monsterStats.Ice;
    const iceColor = getDamageTakenColor(ice);
    const fire = monsterStats.Fire;
    const fireColor = getDamageTakenColor(fire);
    const energy = monsterStats.Energy;
    const energyColor = getDamageTakenColor(energy);
    const earth = monsterStats.Earth;
    const earthColor = getDamageTakenColor(earth);
    //attacks
    //--build attacks div--
    let attacks = [];
    let attacksString = monsterStats.Attacks.split("|");
    let totalMeleeDamageAvg = { physical: 0, death: 0, holy: 0, ice: 0, fire: 0, energy: 0, earth: 0, life: 0, mana: 0 };
    let totalDistanceDamage = { physical: 0, death: 0, holy: 0, ice: 0, fire: 0, energy: 0, earth: 0, life: 0, mana: 0 };
    let totalDistanceDamageAvg = { physical: 0, death: 0, holy: 0, ice: 0, fire: 0, energy: 0, earth: 0, life: 0, mana: 0 };
    let highestDamageMeleeAttack = 0;
    let highestDamageDistanceAttack = 0;
    let totalHealingAvg = 0;
    for(let i = 0; i < attacksString.length; i++){
        let oneAttack = attacksString[i].split(",");
        if(oneAttack.length >= 4){
            let name = "";
            let damageMin = 0;
            let damageMax = 0;
            let damageAvg = 0;
            let dodgeable = false;
            let damageType = "Physical"
            
            //Attack name in 1st
            name = oneAttack[0];
            //Attack dmg range in 2nd
            damageMin = oneAttack[1].replace("?","").split(" ")[0].split("-")[0];
            if(oneAttack[1].split("-").length > 1){
                damageMax = oneAttack[1].replace("?","").split(" ")[0].split("-")[1];
            }
            else{
                damageMax = damageMin;
            }
            damageAvg = (parseInt(damageMin) + parseInt(damageMax)) / 2;
            

            let howManyDistanceAttacks = 0;
            //Attack dodgeable state in 3rd
            if(oneAttack[2] == "no"){ dodgeable = false; }
            else{ dodgeable = true; }
            //Attack dmg type in 4th
            if(oneAttack[3].toLowerCase().includes("physical")) damageType="physical";
            else if(oneAttack[3].toLowerCase().includes("death")) damageType="death";
            else if(oneAttack[3].toLowerCase().includes("holy")) damageType="holy";
            else if(oneAttack[3].toLowerCase().includes("fire")) damageType="fire";
            else if(oneAttack[3].toLowerCase().includes("ice")) damageType="ice";
            else if(oneAttack[3].toLowerCase().includes("energy")) damageType="energy";
            else if(oneAttack[3].toLowerCase().includes("earth")) damageType="earth";
            else if(oneAttack[3].toLowerCase().includes("life")) damageType="life";
            else if(oneAttack[3].toLowerCase().includes("mana")) damageType="mana";
            else if(oneAttack[3].toLowerCase().includes("summon")) damageType="summon";
            else if(oneAttack[3].toLowerCase().includes("heal")) damageType="heal";
            
            //console.log("atk name: "+name+ " toLowerCase:"+name.toLowerCase());
            if(name.toLowerCase().includes("melee") || (name.toLowerCase().includes("life drain") && !name.toLowerCase().includes("strike") && !name.toLowerCase().includes("dist"))){
                console.log("Setting melee dmg avg to "+damageAvg);
                if(damageMax > highestDamageMeleeAttack) highestDamageMeleeAttack = damageMax;
                switch(damageType){
                    case "physical":
                        totalMeleeDamageAvg.physical += parseInt(damageAvg);
                        break;
                    case "death":
                        totalMeleeDamageAvg.death += parseInt(damageAvg);
                        break;
                    case "holy":
                        totalMeleeDamageAvg.holy += parseInt(damageAvg);
                        break;
                    case "fire":
                        totalMeleeDamageAvg.fire += parseInt(damageAvg);
                        break;
                    case "ice":
                        totalMeleeDamageAvg.ice += parseInt(damageAvg);
                        break;
                    case "energy":
                        totalMeleeDamageAvg.energy += parseInt(damageAvg);
                        break;
                    case "earth":
                        totalMeleeDamageAvg.earth += parseInt(damageAvg);
                        break;
                    case "life":
                        totalMeleeDamageAvg.life += parseInt(damageAvg);
                        break;
                    case "mana":
                        totalMeleeDamageAvg.mana += parseInt(damageAvg);
                        break;
                }

            }
            else{
                howManyDistanceAttacks += 1;
                if(damageMax > highestDamageDistanceAttack) highestDamageDistanceAttack = damageMax;
                switch(damageType){
                    case "physical":
                        totalDistanceDamage.physical += parseInt(damageAvg);
                        break;
                    case "death":
                        totalDistanceDamage.death += parseInt(damageAvg);
                        break;
                    case "holy":
                        totalDistanceDamage.holy += parseInt(damageAvg);
                        break;
                    case "fire":
                        totalDistanceDamage.fire += parseInt(damageAvg);
                        break;
                    case "ice":
                        totalDistanceDamage.ice += parseInt(damageAvg);
                        break;
                    case "energy":
                        totalDistanceDamage.energy += parseInt(damageAvg);
                        break;
                    case "earth":
                        totalDistanceDamage.earth += parseInt(damageAvg);
                        break;
                    case "life":
                        totalDistanceDamage.life += parseInt(damageAvg);
                        break;
                    case "mana":
                        totalDistanceDamage.mana += parseInt(damageAvg);
                        break;
                    case "summon":
                        break;
                    case "heal":
                        howManyDistanceAttacks -= 1;
                        totalHealingAvg = parseInt(damageAvg) / 3;
                        break;
                }
            }
            const attack = {
                id: i,
                name: name,
                damageMin: damageMin,
                damageMax: damageMax,
                damageAvg: damageAvg,
                dodgeable: dodgeable,
                damageType: damageType
            }

            attacks.push(attack);
            //attacksHTML += '<div class="attack"><div>'+i+"</div><div>"+name+"</div><div>"+damageAvg+" ("+damageMin+"-"+damageMax+")</div><div>"+damageType+"</div></div>";
            
        }
    }
    
    const maxCombo = 1.7 * highestDamageMeleeAttack + 1.8 *highestDamageDistanceAttack;

    totalDistanceDamageAvg = { 
        physical: parseInt(totalDistanceDamage.physical)/2, 
        death: parseInt(totalDistanceDamage.death)/2,
        holy: parseInt(totalDistanceDamage.holy)/2,
        ice: parseInt(totalDistanceDamage.ice)/2,
        fire: parseInt(totalDistanceDamage.fire)/2,
        energy: parseInt(totalDistanceDamage.energy)/2,
        earth: parseInt(totalDistanceDamage.earth)/2,
        life: parseInt(totalDistanceDamage.life)/2,
        mana: parseInt(totalDistanceDamage.mana)/2
    };

    //console.log("ATAKI:"+JSON.stringify(attacks));
    //console.log("DMGm:"+JSON.stringify(totalMeleeDamageAvg));
    //console.log("DMGd:"+JSON.stringify(totalDistanceDamage));
    //console.log("DMGdavg:"+JSON.stringify(totalDistanceDamageAvg));
    //console.log("HEAL: "+totalHealingAvg);
    //calculated
    //console.log("ATKS:"+monsterStats.Attacks);
    
    //console.log("TURNS TO KILL: "+turnsToKill+ " with leftover"+leftoverFraction);

    let stats = {
        name: monsterName,
        image: "images/"+monsterStats.Image.split("/")[7],
        health: monsterStats.Health,
        exp: monsterStats.Exp,
        speed: monsterStats.Speed,
        armor: monsterStats.Armor,
        attacks: attacks,
        totalMeleeDamageAvg: totalMeleeDamageAvg,
        totalDistanceDamage: totalDistanceDamage,
        totalDistanceDamageAvg: totalDistanceDamageAvg,
        totalHealingAvg: totalHealingAvg,
        highestDamageMeleeAttack: highestDamageMeleeAttack,
        highestDamageDistanceAttack: highestDamageDistanceAttack,
        maxCombo: maxCombo,
        physical: physical,
        physicalColor: physicalColor,
        death: death,
        deathColor: deathColor,
        holy:holy,
        holyColor: holyColor,
        ice: ice,
        iceColor: iceColor,
        fire: fire,
        fireColor: fireColor,
        energy: energy,
        energyColor: energyColor,
        earth: earth,
        earthColor: earthColor,
        simulation: null
        //turnsToKill: turnsToKill,
        //leftoverFraction: leftoverFraction,
        //overkill: overkill

    };
    const simulation = simulateFight(mainStats, stats);
    stats.simulation = simulation;
    console.log("Calculate monster...");
    displayMonster(stats);
}


function addDamageObjects(obj1, obj2) {
    const result = {};
    for (let key in obj1) {
        result[key] = obj1[key] + (obj2[key] || 0); // Add the corresponding fields, defaulting to 0 if the field is missing in obj2
    }
    return result;
}

function simulateFight(playerStats, monsterStats){
    let i = 0;
    let currentHealth = monsterStats.health;
    let exp = monsterStats.exp;
    let leftoverFraction = 0;
    let turnsToKill = 200;
    let turnsToKillInt = 200;
    let overkill = 0;
    let turnLength = 2.2;
    let monstersBreak = 6;
    let huntLength = 60*60;
    let meleePerTurnAvg = monsterStats.totalMeleeDamageAvg; //dmg received  by player
        meleePerTurnAvg.physical -= playerStats.totalArmor;
        if(meleePerTurnAvg.physical < 0) meleePerTurnAvg.physical = 0;
    let distancePerTurnAvg = monsterStats.totalDistanceDamageAvg; //dmg received  by player
        distancePerTurnAvg.physical -= playerStats.totalArmor;
        if(distancePerTurnAvg.physical < 0) distancePerTurnAvg.physical = 0;
    let meleeDmgPerFight = { physical: 0, death: 0, holy: 0, ice: 0, fire: 0, energy: 0, earth: 0, life: 0, mana: 0 };
    let distanceDmgPerFight = { physical: 0, death: 0, holy: 0, ice: 0, fire: 0, energy: 0, earth: 0, life: 0, mana: 0 };
    console.log("---------"+JSON.stringify(monsterStats)+"/////////////");
    //Simulation of fight
    for(turnsToKill = 1;;turnsToKill++){ 
        //add melee dmg only if turn >= 2:
        //console.log("Tto kill: "+turnsToKill+" ; meleeDmgPerFight:"+meleeDmgPerFight.physical);
        console.log("TURN: "+turnsToKill+" ")
        console.log("Current monsterHP: "+parseInt(currentHealth).toFixed(0)+"; Player2monster DMG: "+ playerStats.turns[i]+"; Monster2player (melee): "+JSON.stringify(meleePerTurnAvg.physical)+"; Monster2player (dist): "+JSON.stringify(distancePerTurnAvg)+"; MonsterHEAL: "+monsterStats.totalHealingAvg);
        
        if(turnsToKill > 1) meleeDmgPerFight = addDamageObjects(meleeDmgPerFight, meleePerTurnAvg); //Monster's melee dmg skips 1st turn
        distanceDmgPerFight = addDamageObjects(distanceDmgPerFight, distancePerTurnAvg); //Monster's distance dmg
        //console.log("dist dmg per fight SO FAR: "+JSON.stringify(distanceDmgPerFight));
        //healing after the 1st turn:
        currentHealth += parseInt(monsterStats.totalHealingAvg);
        if(currentHealth > monsterStats.health) currentHealth = parseInt(monsterStats.health);
        
        if(currentHealth - parseFloat(playerStats.turns[i]) < 0){
            turnsToKillInt = turnsToKill;
            if(turnsToKill > 1){
                turnsToKill = ((turnsToKill - 1) + (currentHealth/playerStats.turns[i])).toFixed(2);
                leftoverFraction = ((currentHealth/playerStats.turns[i]) * 100).toFixed(0); //if it takes more than 1 turn to kill, it calculates the effectiveness of last hit
            }
            else{
                overkill = ((playerStats.turns[i]/currentHealth)*100).toFixed(0); //if it dies within 1 hit, it calculates overkill
            }
            break;
        }
        //CALCULATE ACTUAL DAMAGE

        currentHealth -= (playerStats.turns[i] - parseInt(monsterStats.armor));
        i++;
        if(i > (playerStats.turns.length - 1)){
            i = 0;
        }
        if(turnsToKill>200){
            break;
        }
    }
    console.log("meleeDmgPerFight: "+meleeDmgPerFight.physical);
    //Simulation of 1 hour hunt
    let timeToKillOne = (turnsToKill * turnLength).toFixed(1);
    let timeToKillOneWithBreak = parseFloat(timeToKillOne) + parseFloat(monstersBreak);
    let perfectKillsPerHour = (huntLength / timeToKillOne).toFixed(0);
    let perfectHourExp = ((huntLength / timeToKillOne) * exp).toFixed(0);
    let killsPerHour = (huntLength / parseFloat(timeToKillOneWithBreak)).toFixed(0);
    //console.log("ttk+break:"+timeToKillOneWithBreak);
    let expPerHour = (huntLength / timeToKillOneWithBreak) * exp;
    //let expPerHour = ((huntLength / (timeToKillOne + parseFloat(monstersBreak))) * exp).toFixed(0);
    console.log("ttk1: "+timeToKillOne+" pK/H:"+perfectKillsPerHour+" pXP/H:"+perfectHourExp+" K/H:"+killsPerHour+" XP/H:"+expPerHour+" monsterbreak:"+monstersBreak);
    //Build an object with the results
    const fightResults = {
        turnsToKill: turnsToKill,
        leftoverFraction: leftoverFraction,
        overkill: overkill,
        timeToKillOne: timeToKillOne,
        perfectKillsPerHour: perfectKillsPerHour,
        perfectHourExp: perfectHourExp,
        killsPerHour: killsPerHour,
        expPerHour: expPerHour,
        meleeDmgPerFight: meleeDmgPerFight,
        distanceDmgPerFight: distanceDmgPerFight
    }
    return fightResults;
}

function getMonsterStats(monsterName) {
    const item = monsters.find(item => item.Monster === monsterName);
    console.log("Getting monster stats:"+monsterName);
    return item ? item : { Attack: 0, Type: "", Defense: 0 }; // Return default object if item is not found
}

function imageForDamageType(damageTypeInput){
    let damageType = damageTypeInput.toLowerCase();
    switch(damageType){
        case "physical":
            return "<img src=\"images/Bestiary_Physical_Icon_Big.gif\">";
        case "death":
            return "<img src=\"images/Cursed_Icon_Big.gif\">";
        case "holy":
            return "<img src=\"images/Dazzled_Icon_Big.gif\">";
        case "ice":
            return "<img src=\"images/Freezing_Icon_Big.gif\">";
        case "fire":
            return "<img src=\"images/Burning_Icon_Big.gif\">";
        case "energy":
            return "<img src=\"images/Electrified_Icon_Big.gif\">";
        case "earth":
            return "<img src=\"images/Poisoned_Icon_Big.gif\">";
        case "lifedrain":
        case "life":
            return "<img src=\"images/Life_Drain_Icon.gif\">";
        case "manadrain":
        case "mana":
            return "<img src=\"images/Mana_Drain_Icon.gif\">";
        case "summon":
            return "<img src=\"images/Player_Summon.gif\">";
        case "heal":
            return "<img src=\"images/Healing_Icon.gif\">";
        case "paralysis":
            return "<img src=\"images/Slowed_Icon.gif\">";
        case "haste":
            return "<img src=\"images/Haste_Icon.gif\">";
        default:
            return " ["+damageType+"] ";
    }
    
}
function displayMonster(monsterStats){
    const monsterDiv = document.getElementById('monsterStats');
    const monsterName = document.getElementById('monstersDropdown').value;
    console.log("Display monster: "+monsterName);
    //const monster = getMonsterStats(monsterName);
    //--damage images defs--
    //--build attacks div--
    let attacksHTML = "";
    console.log("LEN: "+monsterStats.attacks.length);
    for(let i = 0; i < monsterStats.attacks.length; i++){
        let id = monsterStats.attacks[i].id;
        let name = monsterStats.attacks[i].name;
        let damageMin = monsterStats.attacks[i].damageMin;
        let damageMax = monsterStats.attacks[i].damageMax;
        let damageAvg = monsterStats.attacks[i].damageAvg;
        let dodgeable = monsterStats.attacks[i].dodgeable;
        let damageType = monsterStats.attacks[i].damageType;
        if(name.toLowerCase().includes("paraly")){
            damageType = "paralysis";
            damageMin = 0; damageMax = 0; damageAvg = 0;
            attacksHTML += '<div class="attack">'+(parseInt(id)+1)+". "+name+" "+imageForDamageType(damageType)+" "+"</div>";
        }
        else if(name.toLowerCase().includes("haste")){
            damageType = "haste";
            damageMin = 0; damageMax = 0; damageAvg = 0;
            attacksHTML += '<div class="attack">'+(parseInt(id)+1)+". "+name+" "+imageForDamageType(damageType)+" "+"</div>";
        }
        else if(damageType.toLowerCase().includes("heal")){
            attacksHTML += '<div class="attack">'+(parseInt(id)+1)+". "+name+" "+imageForDamageType(damageType)+" <span class='heal'>"+damageAvg+" ("+damageMin+"-"+damageMax+")</span>"+"</div>";
            damageMin = 0; damageMax = 0; damageAvg = 0;
        }
        else{
            attacksHTML += '<div class="attack">'+(parseInt(id)+1)+". "+name+" "+imageForDamageType(damageType)+" <span class='damage'>"+damageAvg+" ("+damageMin+"-"+damageMax+")</span>"+"</div>";
        }
         
    }
    //--end of attacks div constructor--
    //--build HP lost divs--
    let meleeLostDiv = ""
    if(monsterStats.simulation.meleeDmgPerFight.physical > 0) meleeLostDiv += "<div><img src=\"images/Bestiary_Physical_Icon_Big.gif\"> "+monsterStats.simulation.meleeDmgPerFight.physical+"</div>";
    if(monsterStats.simulation.meleeDmgPerFight.death > 0) meleeLostDiv += "<div><img src=\"images/Cursed_Icon_Big.gif\"> "+monsterStats.simulation.meleeDmgPerFight.death+"</div>";
    if(monsterStats.simulation.meleeDmgPerFight.holy > 0) meleeLostDiv += "<div><img src=\"images/Dazzled_Icon_Big.gif\"> "+monsterStats.simulation.meleeDmgPerFight.holy+"</div>";
    if(monsterStats.simulation.meleeDmgPerFight.ice > 0) meleeLostDiv += "<div><img src=\"images/Freezing_Icon_Big.gif\"> "+monsterStats.simulation.meleeDmgPerFight.ice+"</div>";
    if(monsterStats.simulation.meleeDmgPerFight.fire > 0) meleeLostDiv += "<div><img src=\"images/Burning_Icon_Big.gif\"> "+monsterStats.simulation.meleeDmgPerFight.fire+"</div>";
    if(monsterStats.simulation.meleeDmgPerFight.energy > 0) meleeLostDiv += "<div><img src=\"images/Electrified_Icon_Big.gif\"> "+monsterStats.simulation.meleeDmgPerFight.energy+"</div>";
    if(monsterStats.simulation.meleeDmgPerFight.earth > 0) meleeLostDiv += "<div><img src=\"images/Poisoned_Icon_Big.gif\"> "+monsterStats.simulation.meleeDmgPerFight.earth+"</div>";
    if(monsterStats.simulation.meleeDmgPerFight.life > 0) meleeLostDiv += "<div><img src=\"images/Life_Drain_Icon.gif\"> "+monsterStats.simulation.meleeDmgPerFight.life+"</div>";
    if(monsterStats.simulation.meleeDmgPerFight.mana > 0) meleeLostDiv += "<div><img src=\"images/Mana_Drain_Icon.gif\"> "+monsterStats.simulation.meleeDmgPerFight.mana+"</div>";
    meleeLostDiv += "</div>";
    let distanceLostDiv = ""
    console.log("Distance dmg per fight: "+JSON.stringify(monsterStats.simulation.distanceDmgPerFight));
    if(monsterStats.simulation.distanceDmgPerFight.physical > 0) distanceLostDiv += "<div><img src=\"images/Bestiary_Physical_Icon_Big.gif\"> "+monsterStats.simulation.distanceDmgPerFight.physical+"</div>";
    if(monsterStats.simulation.distanceDmgPerFight.death > 0) distanceLostDiv += "<div><img src=\"images/Cursed_Icon_Big.gif\"> "+monsterStats.simulation.distanceDmgPerFight.death+"</div>";
    if(monsterStats.simulation.distanceDmgPerFight.holy > 0) distanceLostDiv += "<div><img src=\"images/Dazzled_Icon_Big.gif\"> "+monsterStats.simulation.distanceDmgPerFight.holy+"</div>";
    if(monsterStats.simulation.distanceDmgPerFight.ice > 0) distanceLostDiv += "<div><img src=\"images/Freezing_Icon_Big.gif\"> "+monsterStats.simulation.distanceDmgPerFight.ice+"</div>";
    if(monsterStats.simulation.distanceDmgPerFight.fire > 0) distanceLostDiv += "<div><img src=\"images/Burning_Icon_Big.gif\"> "+monsterStats.simulation.distanceDmgPerFight.fire+"</div>";
    if(monsterStats.simulation.distanceDmgPerFight.energy > 0) distanceLostDiv += "<div><img src=\"images/Electrified_Icon_Big.gif\"> "+monsterStats.simulation.distanceDmgPerFight.energy+"</div>";
    if(monsterStats.simulation.distanceDmgPerFight.earth > 0) distanceLostDiv += "<div><img src=\"images/Poisoned_Icon_Big.gif\"> "+monsterStats.simulation.distanceDmgPerFight.earth+"</div>";
    if(monsterStats.simulation.distanceDmgPerFight.life > 0) distanceLostDiv += "<div><img src=\"images/Life_Drain_Icon.gif\"> "+monsterStats.simulation.distanceDmgPerFight.life+"</div>";
    if(monsterStats.simulation.distanceDmgPerFight.mana > 0) distanceLostDiv += "<div><img src=\"images/Mana_Drain_Icon.gif\"> "+monsterStats.simulation.distanceDmgPerFight.mana+"</div>";
    distanceLostDiv += "</div>";
    //--end of HP lost divs--
    console.log("TEST CHECK OF PHYSICAL RES: "+monsterStats.physical);
    monsterDiv.innerHTML = `
    <div id="monsterContainer">
    <div id="monsterBlockLeft">
      <p id="monsterName">${monsterStats.name}</p>
      <p id="monsterImage"><img src="${monsterStats.image}"></p>
    </div>
    <div id="monsterBlockRight">
      <p id="monsterHealth"><img src="images/Health_Icon.gif"> ${monsterStats.health}</p>
      <p id="monsterExp"><img src="images/Experience_Icon.gif"> ${monsterStats.exp}</p>
      <p id="monsterSpeed"><img src="images/Haste_Icon.gif"> ${monsterStats.speed}</p>
      <p id="monsterArmor"><img src="images/Armor_Icon.gif"> ${monsterStats.armor}</p>
    
    <div id="damageTaken">
        <div class="row">
            <div class="box" id="physical"><img src="images/Bestiary_Physical_Icon_Big.gif"></div>
            <div class="box" id="death"><img src="images/Cursed_Icon_Big.gif"></div>
            <div class="box" id="holy"><img src="images/Dazzled_Icon_Big.gif"></div>
            <div class="box" id="ice"><img src="images/Freezing_Icon_Big.gif"></div>
            <div class="box" id="fire"><img src="images/Burning_Icon_Big.gif"></div>
            <div class="box" id="energy"><img src="images/Electrified_Icon_Big.gif"></div>
            <div class="box" id="earth"><img src="images/Poisoned_Icon_Big.gif"></div>
        </div>
        <div class="row bottom-row">
            <div class="box" style="background: #${monsterStats.physicalColor}" id="physicalValue">${(monsterStats.physical * 100).toFixed(0)}%</div>
            <div class="box" style="background: #${monsterStats.deathColor}" id="deathValue">${(monsterStats.death * 100).toFixed(0)}%</div>
            <div class="box" style="background: #${monsterStats.holyColor}" id="holyValue">${(monsterStats.holy * 100).toFixed(0)}%</div>
            <div class="box" style="background: #${monsterStats.iceColor}" id="iceValue">${(monsterStats.ice * 100).toFixed(0)}%</div>
            <div class="box" style="background: #${monsterStats.fireColor}" id="fireValue">${(monsterStats.fire * 100).toFixed(0)}%</div>
            <div class="box" style="background: #${monsterStats.energyColor}" id="energyValue">${(monsterStats.energy * 100).toFixed(0)}%</div>
            <div class="box" style="background: #${monsterStats.earthColor}" id="earthValue">${(monsterStats.earth * 100).toFixed(0)}%</div>
        </div>
    </div>
  </div>
  </div>
  
    <div id="attacks">
    ${attacksHTML}
    </div>
    <p>Highest damage - melee: ${monsterStats.highestDamageMeleeAttack} distance: ${monsterStats.highestDamageDistanceAttack}</p>
    <p>Estimated max combo: ${parseInt(monsterStats.maxCombo).toFixed(0)}</p>
    <p>Killed in ${monsterStats.simulation.turnsToKill} turns (overkill: ${monsterStats.simulation.overkill}%) - average time: ${monsterStats.simulation.timeToKillOne}</p>
    <p>Perfect XP/h: ${parseInt(monsterStats.simulation.perfectHourExp).toFixed(0)} (${monsterStats.simulation.perfectKillsPerHour} killed)</p>
    <p>Realistic XP/h: ${parseInt(monsterStats.simulation.expPerHour).toFixed(0)} (${monsterStats.simulation.killsPerHour} killed)</p>
    <p>Creature melee attacks vs. player: ${meleeLostDiv}</p>
    <p>Creature distance attacks vs player: ${distanceLostDiv}</p>
    `;
}