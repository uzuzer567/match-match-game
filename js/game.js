const config = {
    diff : [
        {
            width: 4,
            height: 4
        },
        {
            width: 6,
            height: 6
        },
        {
            width: 8,
            height: 8
        },
    ],
    shirts : [
        "assets/cards/card1.jpg",
        "assets/cards/card2.jpg",
        "assets/cards/card3.jpg",
        "assets/cards/card4.jpg",
        "assets/cards/card5.jpg",
        "assets/cards/card6.jpg",
        "assets/cards/card7.jpg",
        "assets/cards/card8.jpg",
        "assets/cards/card9.jpg",
        "assets/cards/card10.jpg",
        "assets/cards/card11.jpg",
        "assets/cards/card12.jpg",
        "assets/cards/card13.jpg",
        "assets/cards/card14.jpg",
        "assets/cards/card15.jpg",
        "assets/cards/card16.jpg",
        "assets/cards/card17.jpg",
        "assets/cards/card18.jpg",
        "assets/cards/card19.jpg",
        "assets/cards/card20.jpg",
        "assets/cards/card21.jpg",
        "assets/cards/card22.jpg",
        "assets/cards/card23.jpg",
        "assets/cards/card24.jpg",
        "assets/cards/card25.jpg",
        "assets/cards/card26.jpg",
        "assets/cards/card27.jpg",
        "assets/cards/card28.jpg",
        "assets/cards/card29.jpg",
        "assets/cards/card30.jpg",
        "assets/cards/card31.jpg",
        "assets/cards/card32.jpg"
     ],

     backs : [
        "assets/cards/cardBack1.jpg",
        "assets/cards/cardBack2.jpg",
        "assets/cards/cardBack3.jpg"
    ]
};

let currentSettings = {
    diff:{}
};

let button = (classOfButton, nameOfButton, id, location) => {
    const button = document.createElement("button");
    for(let i = 0; i < classOfButton.length; i++){
        button.classList.add(classOfButton[i]);
    }
    button.textContent = nameOfButton;
    button.id = id;
    location.appendChild(button);
};

let container = (element, classOfContainer, id, location) => {
    const container = document.createElement(element);
    if(classOfContainer != null){
        for(let i = 0; i < classOfContainer.length; i++){
            container.classList.add(classOfContainer[i]);
        }
    }
    if( id != null) container.id = id;
    location.appendChild(container);
};

let clear = () => {
    while (document.querySelector("#menuContainer").firstChild) {
        document.querySelector("#menuContainer").removeChild(document.querySelector("#menuContainer").firstChild);
    }
};

let notification = (string) => {
    const notifiContainer = document.createElement("div");
    notifiContainer.classList.add("alert");
    notifiContainer.textContent = string;
    menuContainer.appendChild(notifiContainer);
    setTimeout(() => notifiContainer.style.display = "none", 5000);
};

class AboutGame{
    initAboutGame(){
        container("div", ["navigation"], "nav", menuContainer);
        this.initHeader();
        container("div", ["aboutGameTitle"], "aboutGameTitle", menuContainer);
        aboutGameTitle.textContent = "How to play?";
        container("div", ["aboutGame"], "aboutGame1", menuContainer);
        aboutGame1.textContent = "Enter your name, last name and email.";
        container("div", ["aboutGame"], "aboutGame2", menuContainer);
        aboutGame2.textContent = "Choose a card type and the difficulty level of the game.";
        container("div", ["aboutGame"], "aboutGame3", menuContainer);
        aboutGame3.textContent = "Start game.";
        container("div", ["aboutGame"], "aboutGame4", menuContainer);
        aboutGame4.textContent = "Select two cards to try to match the pictures.";
        container("div", ["aboutGame"], "aboutGame5", menuContainer);
        aboutGame5.textContent = "If you match the pictures you can go again.";
        container("div", ["aboutGame"], "aboutGame6", menuContainer);
        aboutGame6.textContent = "If they don't match it is the computer turn them.";
        container("div", ["aboutGame"], "aboutGame7", menuContainer);
        aboutGame7.textContent = "The player that find that finds all pairs wins!";
    }

    registrationInit = false;

    initHeader(){
        button("button", "main page", "mainPageButton", nav);
        mainPageButton.addEventListener("click" , () => {
            clear();
            menu.initAboutGameButton();
            menu.initNewGameButton();
            menu.initRecordsButton();
        });
        button("button", "registration", "registrationButtonAboutGame", nav);
        registrationButtonAboutGame.addEventListener("click" , () => {
            clear();
            let registration = new Registration();
            registration.initRegistration();
        });
        button("button", "settings", "settingsButtonRegistration", nav);
        button("button", "start game", "startGameButtonRegistration", nav);
    }
}

class Game{
    constructor(difficultyWidth, difficultyHeight, back, firstName, lastName, email){
        this.difficultyWidth = difficultyWidth;
        this.difficultyHeight = difficultyHeight;
        this.back = back;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    scoreCounter = 0;
    comparisonCounter = 0;
    uncorrectComparisonCounter = 0;

    gameStoped = false;
    stopButtonClick = 0;

    settingsInit = false;

    peopleImageSrc = "./assets/no_avatar.png";

    initGame(){
        const layOut = document.querySelector("#menuContainer");
        layOut.classList.add("layoutForGame");
        container("div", ["navigation"], "nav", menuContainer);
        this.initHeader();
        this.initScore();
        this.initStopWatch();
        this.initCards();
        this.initStopGameButton();
    }

    cardBack = "";

    initHeader(){
        let registration = new Registration();
        button("button", "main page", "mainPageButton", nav);
        mainPageButton.addEventListener("click" , () => {
            clear();
            menu.initAboutGameButton();
            menu.initNewGameButton();
            menu.initRecordsButton();
        });
        button("button", "registration", "registrationButtonSettings", nav);
        registrationButtonSettings.addEventListener("click" , () => {
            clear();
            registration.initRegistration();
        });
        button("button", "settings", "settingsButtonGame", nav);
        settingsButtonGame.addEventListener("click" , () => {
            clear();
            let gameSettings = new GameSettings();
            gameSettings.initSettings();
        });
        button("button", "start game", "startGameButtonGame", nav);
        startGameButtonGame.addEventListener("click" , () => {
            if(this.settingsInit){
                clear();
                let game = new Game(currentSettings.diff.width,currentSettings.diff.height, 
                    currentSettings.shirt, currentSettings.person.firstName, currentSettings.person.lastName,
                    currentSettings.person.email);
                game.initGame();
            }
        });
        container("img", "peopleImageInHeader", "peopleImageInHeader", nav);
        peopleImageInHeader.src = this.peopleImageSrc;
    } 

    initCards(){
        let randomIndexes = this.shuffle();
        let indexOFArray = -1;
        for(let i = 0; i < this.difficultyHeight; i++){
            const rowCards = document.createElement("div");
            rowCards.classList.add("row");
            rowCards.id = `row${i}`;
            menuContainer.appendChild(rowCards);
            for(let j = 0; j < this.difficultyWidth; j++){
                indexOFArray++;
                const cellCard = document.createElement("div");
                cellCard.classList.add("card");
                cellCard.id = `card${indexOFArray}`;
                rowCards.appendChild(cellCard);
            }
        }

        for(let i = 0; i < randomIndexes.length; i++){
            let card = document.querySelector(`#card${i}`);
            card.innerHTML = `<img src="./assets/cards/card${randomIndexes[i]}.jpg" alt="card">`;
            card.style.pointerEvents = "none";
        }

        setTimeout(this.flipCards, 30000, randomIndexes.length, this.back);

        for(let i = 0; i < randomIndexes.length; i++){
            let card = document.querySelector(`#card${i}`);
            card.addEventListener("click", () => {
                if(this.gameStoped != true){
                    if(document.getElementsByClassName("clicked").length < 2){
                        card.classList.add("clicked");
                        card.innerHTML = `<img src="./assets/cards/card${randomIndexes[i]}.jpg" alt="card">`;
                    }
                }
            });
            card.addEventListener("click", () => {
                setTimeout(() => this.unmatched(), 3000);
                card.classList.remove("unmatched");
                setTimeout(() => this.matched(), 3000);
            });
        }
    }

    flipCards(length, back){
        for(let i = 0; i < length; i++){
            let card = document.querySelector(`#card${i}`);
            card.classList.add("unmatched");
            card.innerHTML = `<img src="./${back}" alt="card">`;
            card.style.pointerEvents = null;
        }
    }

    timerTextContent = "00:00";

    initStopWatch(){
        container("div", ["containerForTimer"], "containerForTimer", menuContainer);
        let seconds = 0, minutes = 0, countOfCards = this.difficultyWidth * this.difficultyHeight, timeout;
        container("div", ["containerForTimerTitle"], "containerForTimerTitle", containerForTimer);
        containerForTimerTitle.textContent = "Time:";
        container("div", ["containerForTimerCounter"], "containerForTimerCounter", containerForTimer);
        containerForTimerCounter.textContent = this.timerTextContent;
        let add = () =>{
            if(this.gameStoped != true){
                seconds++;
                if (seconds >= 60) {
                    seconds = 0;
                    minutes++;
                }
                containerForTimerCounter.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
                this.timerTextContent = containerForTimerCounter.textContent;
                timer();
            }
            else {
                timer();
            }
        };

        let timer = () =>{
            if(!(document.getElementsByClassName("hidden").length == countOfCards)){
                timeout = setTimeout(add, 1000);
            }
        };
        
        timer();
    }

    initScore(){
        container("div", ["containerForTimer"], "containerForScore", menuContainer);
        container("div", ["containerForScoreTitle"], "containerForScoreTitle", containerForScore);
        containerForScoreTitle.textContent = "Score:";
        container("div", ["containerForScoreCounter"], "containerForScoreCounter", containerForScore);
        containerForScoreCounter.textContent = `${this.scoreCounter}`;
    }

    editScore(){
        let minutes = parseInt(document.querySelector("#containerForTimerCounter").textContent.split(":")[0]);
        let seconds = parseInt(document.querySelector("#containerForTimerCounter").textContent.split(":")[1]);
        let totalSeconds = minutes * 60 + seconds;
        if(((this.comparisonCounter - this.uncorrectComparisonCounter) * 100 - (totalSeconds - 30) * 10) * this.difficultyWidth > 0){
            this.scoreCounter += ((this.comparisonCounter - this.uncorrectComparisonCounter) * 100 - (totalSeconds - 30) * 10) * this.difficultyWidth;
        }
        else if(((this.comparisonCounter - this.uncorrectComparisonCounter) * 100 - totalSeconds * 10) * this.difficultyWidth < 0){
            this.scoreCounter += (-1) * ((this.comparisonCounter - this.uncorrectComparisonCounter) * 100 - totalSeconds * 10) * this.difficultyWidth;
        }
        this.scoreCounter += (-1) * ((this.comparisonCounter - this.uncorrectComparisonCounter) * 100 - totalSeconds * 10) * this.difficultyWidth;
        document.querySelector("#containerForScoreCounter").textContent = this.scoreCounter;
    }

    shuffle(){
        let countOfCards = this.difficultyWidth * this.difficultyHeight;
        let result = [];
        let currentNumber = 1;
        let compareRandom = () =>{
            return Math.random() -0.5;
        };
        for(let i = 0; i < countOfCards; i++){
            if(currentNumber == countOfCards / 2 + 1) currentNumber = 1;
            result.push(currentNumber);
            currentNumber++;
        }
        return result.sort(compareRandom);
    }

    unmatched(){
        if(document.getElementsByClassName("clicked").length > 1){
            let cardToHidden = document.querySelectorAll(".clicked");
            if(!(document.getElementsByClassName("clicked")[0].firstChild.src == document.getElementsByClassName("clicked")[1].firstChild.src)){
                let i = 0;
                this.comparisonCounter++;
                this.uncorrectComparisonCounter++;
                while(document.getElementsByClassName("clicked").length > 0){
                    cardToHidden[i].classList.add("unmatched");
                    cardToHidden[i].innerHTML = `<img src="./${this.back}" alt="">`;
                    cardToHidden[i].classList.remove("clicked");
                    i++;
                }
            }
        }
    }

    matched(){
        if(document.getElementsByClassName("clicked").length > 1){
            let cardMatched = document.getElementsByClassName("clicked");
            if(document.getElementsByClassName("clicked")[0].firstChild.src == document.getElementsByClassName("clicked")[1].firstChild.src){
                this.comparisonCounter++;
                while(document.getElementsByClassName("clicked").length > 0){
                    this.editScore();
                    cardMatched[0].classList.add("hidden");
                    cardMatched[0].classList.add("matched");
                    cardMatched[0].classList.remove("clicked");
                    this.endOfGame();
                }
             }
        }
    }

    endOfGame(){
        let countOfCards = this.difficultyWidth * this.difficultyHeight;
        if(document.getElementsByClassName("hidden").length == countOfCards){
            let minutes = parseInt(document.querySelector("#containerForTimerCounter").textContent.split(":")[0]);
            let seconds = parseInt(document.querySelector("#containerForTimerCounter").textContent.split(":")[1]);
            let totalSeconds = minutes * 60 + seconds;
            currentSettings.person.time = totalSeconds;
            this.addToRecords();
            clear();
            this.initCongratulations();
        }    
    }

    initStopGameButton(){
        button (["buttonInGame", "buttons" ], "stop game", "stopButton", menuContainer);
        stopButton.addEventListener("click" , () => {
            this.stopButtonClick++;
            if(this.stopButtonClick == 1){
                this.gameStoped = true;
                stopButton.innerText = "continue game";
            }
            else{
                this.gameStoped = false;
                this.stopButtonClick -= 2;
                stopButton.innerText = "stop game";
            }
        });
    }

    addToRecords(){
        let table = {};
        if(localStorage.people == undefined){
            table["1"] = currentSettings.person;
            let serialobj = JSON.stringify(table);
            window.localStorage.setItem("people", serialobj);
        }else{
            let countOFPeople = Object.keys(JSON.parse(localStorage.getItem("people"))).length;
            let ObjectOfElements = JSON.parse(localStorage.getItem("people"));
            ObjectOfElements [`${countOFPeople + 1}`] = currentSettings.person;
            let serialobj = JSON.stringify(ObjectOfElements);
            window.localStorage.setItem("people", serialobj);
        }
    }

    initCongratulations(){
        container("div", "popupCongratulation", "popupCongratulation", menuContainer);
        container("div", "popup", "popup", popupCongratulation);
        container("div", "popupText", "popupText", popup);
        popupText.textContent = "Congratulations! Well done keep it up!";
        button(["popupButtons"],"okay", "openRecordsButton", popup);
        openRecordsButton.addEventListener("click" , () => {
            clear();
            let records = new Records();
            records.initRecords();
        });
        button(["popupButtons"],"cancel", "cancelRecordsButton", popup);
        cancelRecordsButton.textContent = "cancel";
        cancelRecordsButton.addEventListener("click" , () => {
            clear();
            menu.initAboutGameButton();
            menu.initNewGameButton();
            menu.initRecordsButton();
        });
    }
}

class Menu{
    initMenu(){
        container("main", ["menuContainer"], "menuContainer", background);
        this.initAboutGameButton();
        this.initNewGameButton();
        this.initRecordsButton();
    }

    initAboutGameButton(){
        button(["elementsOfMenu"],"About Game", "aboutGameButton", menuContainer);
        aboutGameButton.addEventListener("click" , () => {
            clear();
            let aboutGame = new AboutGame();
            aboutGame.initAboutGame();
        });
    }

    initNewGameButton(){
        button(["elementsOfMenu"],"Registration", "registrationButton", menuContainer);
        registrationButton.addEventListener("click" , () => {
            clear();
            let registration = new Registration();
            registration.initRegistration();
        });
    }

    initRecordsButton(){
        button(["elementsOfMenu"],"Highscore Table", "initRecordsButton", menuContainer);
        initRecordsButton.addEventListener("click" , () => {
            clear();
            let records = new Records();
            records.initRecords();
        });
    }

    initSettingsButton(){
        button(["elementsOfMenu"],"Settings", "settingsButton", menuContainer);
        settingsButton.addEventListener("click" , () => {
            clear();
            let gameSettings = new GameSettings();
            gameSettings.initSettings();
        });
    }
}

let menu = new Menu();
menu.initMenu();

class Registration{
    initRegistration(){
        container("img", "peopleImage", "peopleImage", menuContainer);
        peopleImage.src = "./assets/no_avatar.png";
        container("div", ["containerCommunications"], "containerCommunications", menuContainer);
        container("div", ["navigation"], "nav", containerCommunications);
        this.initHeader();
        this.initCommunications();
        container("div", ["communicationsButtonsContainer"], "communicationsButtonsContainer", containerCommunications);
        this.initCancelButton();
        this.initRegisterButton();
        this.initLoadPictureButton();
    }

    registrationInit = false;
    imageSrc = "./assets/no_avatar.png";

    initHeader(){
        button("button", "main page", "mainPageButton", nav);
        mainPageButton.addEventListener("click" , () => {
            clear();
            menu.initAboutGameButton();
            menu.initNewGameButton();
            menu.initRecordsButton();
        });
        button("button", "registration", "registrationButtonRegistration", nav);
        registrationButtonRegistration.addEventListener("click" , () => {
            clear();
            let registration = new Registration();
            registration.initRegistration();
        });
        button("button", "settings", "settingsButtonRegistration", nav);
        settingsButtonRegistration.addEventListener("click" , () => {
            let firstName = document.getElementsByTagName("input")[0].value;
            let lastName = document.getElementsByTagName("input")[1].value;
            let email = document.getElementsByTagName("input")[2].value;
            if(this.registrationInit){
                let person = {};
                person.firstName = firstName;
                person.lastName = lastName;
                person.email = email;
                person.time = 0;
                currentSettings.person = person;
                clear();
                let gameSettings = new GameSettings();
                gameSettings.peopleImageSrc = this.imageSrc;
                gameSettings.initSettings();
            }
        });
        button("button", "start game", "startGameButtonRegistration", nav);
    }

    initCommunications(){
        const attributes = ["First Name", "Last Name", "Email"];
        container("form", ["communications"], "communications", containerCommunications);
        for(let i = 0; i < attributes.length; i++){
            const input = document.createElement("input");
            const nameInput = document.createElement("h3");
            input.classList.add("input");
            nameInput.textContent = attributes[i];
            if(i == 2) {
                input.setAttribute("type","email");
                input.setAttribute("onblur", "registration.checkEmail(this)");
            }
            else if(i == 1){
                input.setAttribute("type","text");
                input.setAttribute("onblur", "registration.checkLastName(this)");
            }
            else{
                input.setAttribute("type","text");
                input.setAttribute("onblur", "registration.checkName(this)");
            }
            input.setAttribute("placeholder", `Enter your ${attributes[i].toLocaleLowerCase()}`);
            communications.appendChild(nameInput);
            communications.appendChild(input);
        }
    }

    checkName(element){
        const re = /[0-9~!@#$%*()_—+=|:;"'`<>,.?/]+/;
        if(element.value == ""){
            element.style.boxShadow = "0 0 25px red";
            notification("Fill the name field!");
            return false;
        }
        else if(element.value.length > 30){
            element.style.boxShadow = "0 0 25px red";
            notification("More than 30 symbols in the name field!");
            return false;
        }
        else if(re.test(element.value)){
            element.style.boxShadow = "0 0 25px red";
            notification("Incorrect symbols in name field!");
            return false;
        }
        else {
            element.style.boxShadow = "0 0 25px green";
            return true;
        }
    }

    checkLastName(element){
        const re = /[0-9~!@#$%*()_—+=|:;"'`<>,.?/]+/;
        if(element.value == ""){
            element.style.boxShadow = "0 0 25px red";
            notification("Fill the last name field!");
            return false;
        }
        else if(element.value.length > 30){
            element.style.boxShadow = "0 0 25px red";
            notification("More than 30 symbols in the last name field!");
            return false;
        }
        else if(re.test(element.value)){
            element.style.boxShadow = "0 0 25px red";
            notification("Incorrect symbols in the last name field!");
            return false;
        }
        else {
            element.style.boxShadow = "0 0 25px green";
            return true;
        }
    }

    checkEmail(element){
        const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if(element.value == ""){
            element.style.boxShadow = "0 0 25px red";
            notification("Fill the email field!");
            return false;
        }
        else if(element.value.length > 30){
            element.style.boxShadow = "0 0 25px red";
            notification("More than 30 symbols in the email field!");
            return false;
        }
        else if(!re.test(element.value)){
            element.style.boxShadow = "0 0 25px red";
            notification("Incorrect email!");
            return false;
        }
        else {
            element.style.boxShadow = "0 0 25px green";
            return true;
        }
    }

    initRegisterButton(){
        button(["communicationsButtons"], "register", "register", communicationsButtonsContainer);
        let firstName = document.getElementsByTagName("input")[0];
        let lastName = document.getElementsByTagName("input")[1];
        let email = document.getElementsByTagName("input")[2];
        register.addEventListener("click" , () => {
            if(this.checkName(firstName) && this.checkLastName(lastName) && this.checkEmail(email)){
                document.getElementById("settingsButtonRegistration").style.color = "rgb(174, 229, 253)";
                document.getElementById("settingsButtonRegistration").style.cursor = "pointer";
                this.registrationInit = true;
                
                document.getElementsByTagName("input")[0].style.boxShadow = "0 0 25px transparent";
                document.getElementsByTagName("input")[1].style.boxShadow = "0 0 25px transparent";
                document.getElementsByTagName("input")[2].style.boxShadow = "0 0 25px transparent";

                notification("New player has been created!");
            }
        });
    }

    initCancelButton(){
        button(["communicationsButtons"], "cancel", "cancel", communicationsButtonsContainer);
        cancel.addEventListener("click" , () => {
            document.getElementsByTagName("input")[0].value = "";
            document.getElementsByTagName("input")[1].value = "";
            document.getElementsByTagName("input")[2].value = "";
            document.getElementsByTagName("input")[0].style.boxShadow = "0 0 25px transparent";
            document.getElementsByTagName("input")[1].style.boxShadow = "0 0 25px transparent";
            document.getElementsByTagName("input")[2].style.boxShadow = "0 0 25px transparent";
        });
    }

    initLoadPictureButton(){
        container("label", "load", "load", communicationsButtonsContainer);
        load.for = "loadPicture";
        container("input", "loadPicture", "loadPicture", load);
        loadPicture.type = "file";
        loadPicture.name = "upload";
        loadPicture.addEventListener("change" , () => {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                document.getElementById("peopleImage").src = fileReader.result;
                this.imageSrc = fileReader.result;
            };
            if(loadPicture.files[0]){
                fileReader.readAsDataURL(loadPicture.files[0]);
            }
            loadPicture.value = null;
        });
    }
}

var registration = new Registration();

var dataBase;
var dataBaseRequest = window.indexedDB.open("uzuzer567", 1);

class Records extends Registration{
    initRecords(){
        const layOut = document.querySelector("#menuContainer");
        layOut.classList.add("layoutForRecords");
        if(localStorage.length == 0) {
            container("div", ["navigation"], "nav", menuContainer);
            this.initHeader();
            this.initLackOfRecords();
        }
        else{
            container("div", ["navigation"], "nav", menuContainer);
            this.initHeader();
            this.sortRecords();
            this.initDescriptionOfTheHighscoreTable();
            this.initHighscoreTable();
            this.zeroingOfRecordsButton();
            this.unpackingRecords();
        }
    }

    registrationInit = false;

    initHeader(){
        button("button", "main page", "mainPageButton", nav);
        mainPageButton.addEventListener("click" , () => {
            clear();
            menu.initAboutGameButton();
            menu.initNewGameButton();
            menu.initRecordsButton();
        });
        button("button", "registration", "registrationButtonAboutGame", nav);
        registrationButtonAboutGame.addEventListener("click" , () => {
            clear();
            let registration = new Registration();
            registration.initRegistration();
        });
        button("button", "settings", "settingsButtonRegistration", nav);
        button("button", "start game", "startGameButtonRegistration", nav);
    }

    initDescriptionOfTheHighscoreTable(){
        container("div", ["about", "descriptionOfTheHighscoreTable"], "descriptionOfTheHighscoreTable", menuContainer);
        descriptionOfTheHighscoreTable.textContent = "The top 10 players";
    }

    initHighscoreTable(){
        container("table", null, "highscoreTable", menuContainer);
        container("tr", null, "tr", highscoreTable);
        const arrayOfAttributes = ["Number","First Name", "Last Name", "Email", "Time"];
        for(let i = 0; i < arrayOfAttributes.length; i++){
            const td = document.createElement("td");
            td.textContent = arrayOfAttributes[i];
            tr.appendChild(td);
        }
    }

    unpackingRecords(){
        let countOFPeople = Object.keys(JSON.parse(localStorage.getItem("records"))).length;
        let arrayOfKeys = Object.keys(JSON.parse(localStorage.getItem("records")));
        if(countOFPeople > 10){
            let array = JSON.parse(localStorage.getItem("records"));
            for(let i = 10; i < array.length; i++){
                array.pop();
            }
            let serialObj = JSON.stringify(array);
            localStorage.setItem("records", serialObj);    
        }
        countOFPeople = Object.keys(JSON.parse(localStorage.getItem("records"))).length;
        for(let i = 0; i < countOFPeople; i++){
            let firstName = JSON.parse(localStorage.getItem("records"))[arrayOfKeys[i]][1].firstName;
            let lastName = JSON.parse(localStorage.getItem("records"))[arrayOfKeys[i]][1].lastName;
            let email = JSON.parse(localStorage.getItem("records"))[arrayOfKeys[i]][1].email;
            let time = JSON.parse(localStorage.getItem("records"))[arrayOfKeys[i]][1].time;
            let arrayOfAttributes = [i + 1,firstName, lastName, email, time];
            const tr = document.createElement("tr");
            highscoreTable.appendChild(tr);
            for(let j = 0; j < arrayOfAttributes.length; j++){
                const td = document.createElement("td");
                td.textContent = arrayOfAttributes[j];
                tr.appendChild(td);
            }
        }
    }

    initLackOfRecords(){
        container("div", ["about", "descriptionOfTheHighscoreTable"], "lackOfRecords", menuContainer);
        lackOfRecords.textContent = "Play to see the records here!";
    }

    zeroingOfRecordsButton(){
        button(["buttonInHighscores", "buttons"], "Reset table", "resetRecordsButton", menuContainer);
        resetRecordsButton.addEventListener("click" , () => {
            clear();
            localStorage.clear();
            this.initRecords();
        });
    }

    sortRecords(){
        let entries = Object.entries(JSON.parse(localStorage.getItem("people")));
        let sorted = entries.sort((a, b) => a[1].time - b[1].time);
        for(let i = 0; i < sorted.length; i++){
            let minutes = Math.floor(sorted[i][1].time / 60);
            let seconds = sorted[i][1].time - minutes * 60;
            sorted[i][1].time = `${minutes}:${seconds}`;
        }
        let serialObj = JSON.stringify(sorted);
        localStorage.setItem("records", serialObj);
    }
}

class GameSettings{
    initSettings(){
        container("div", ["navigation"], "nav", menuContainer);
        this.initHeader();
        this.initDifficulty();
        this.initShirts();
        this.initOkayButton();
    }

    settingsInit = false;
    peopleImageSrc = "./assets/no_avatar.png";

    initHeader(){
        button("button", "main page", "mainPageButton", nav);
        mainPageButton.addEventListener("click" , () => {
            clear();
            menu.initAboutGameButton();
            menu.initNewGameButton();
            menu.initRecordsButton();
        });
        button("button", "registration", "registrationButtonSettings", nav);
        registrationButtonSettings.addEventListener("click" , () => {
            clear();
            let registration = new Registration();
            registration.initRegistration();
        });
        button("button", "settings", "settingsButtonSettings", nav);
        settingsButtonSettings.addEventListener("click" , () => {
            clear();
            let gameSettings = new GameSettings();
            gameSettings.initSettings();
        });
        button("button", "start game", "startGameButtonSettings", nav);
        startGameButtonSettings.addEventListener("click" , () => {
            if(this.settingsInit){
                clear();
                let game = new Game(currentSettings.diff.width,currentSettings.diff.height, 
                currentSettings.shirt, currentSettings.person.firstName, currentSettings.person.lastName,
                currentSettings.person.email);
                game.peopleImageSrc = this.peopleImageSrc;
                game.initGame();
            }
        });
        container("img", "peopleImageInHeader", "peopleImageInHeader", nav);
        peopleImageInHeader.src = this.peopleImageSrc;
    } 

    initShirts(){
        container("div", ["containerForShirts"], "containerForShirts", menuContainer);
        for(let i = 0; i < config.backs.length; i++){
            const shirt = document.createElement("div");
            shirt.classList.add("shirt");
            shirt.style.backgroundImage = `url(${config.backs[i]})`;
            shirt.id = `${config.backs.length - i}shirt`;
            containerForShirts.appendChild(shirt);
            shirt.addEventListener("click" , () => {
                let classSearch = document.getElementsByClassName("activeShirt");
                if(classSearch.length == 1){
                    for(let i = 1; i < config.backs.length + 1; i++){
                        let shirtBack = document.getElementById(`${i}shirt`);
                        shirtBack.classList.remove("activeShirt");
                    }
                }
                shirt.classList.add("activeShirt");
                currentSettings.shirt = config.backs[i];
            });
        }

    }

    initDifficulty(){
        container("div", ["containerForDiff"], "containerForDiff", menuContainer);
        for(let i = 0; i < config.diff.length; i++){
            const buttonForDiff = document.createElement("button");
            buttonForDiff.classList.add("Buttons");
            buttonForDiff.classList.add("buttonForDiff");
            buttonForDiff.id = `${i}diff`;
            buttonForDiff.textContent = `${config.diff[i].height} X ${config.diff[i].width}`;
            containerForDiff.appendChild(buttonForDiff);
            buttonForDiff.addEventListener("click" , () => {
                let classSearch = document.getElementsByClassName("activeDiff");
                if(classSearch.length == 1){
                    for(let i = 0; i < 3; i++){
                        let button = document.getElementById(`${i}diff`);
                        button.classList.remove("activeDiff");
                    }
                }
                buttonForDiff.classList.add("activeDiff");
                currentSettings.diff.width = config.diff[i].width;
                currentSettings.diff.height = config.diff[i].height;
            });
        }
    }

    initOkayButton(){
        button("button", "okay", "okayButton", menuContainer);
        okayButton.addEventListener("click" , () => {
            if(document.getElementsByClassName("activeShirt").length == 0 && document.getElementsByClassName("activeDiff").length == 0){
                notification("No complexity and shirt chosen!");
            }
            else if(document.getElementsByClassName("activeDiff").length == 0){
                notification("No complexity chosen!");
            }
            else if(document.getElementsByClassName("activeShirt").length == 0){
                notification("No shirt chosen!");
            }
            else{
                document.getElementById("startGameButtonSettings").style.color = "rgb(174, 229, 253)";
                document.getElementById("startGameButtonSettings").style.cursor = "pointer";
                this.settingsInit = true;
            }
        });
    }
}
