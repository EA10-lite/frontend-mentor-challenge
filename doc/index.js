const gameProp = {
	game:document.querySelector("#game"),
	result:document.querySelector(".result"),
	playerScore:document.querySelector(".player .scoreValue"),
	comScore:document.querySelector(".computer .scoreValue"),
	makeGameTemplates(){
		setTimeout(()=>{
			this.game.innerHTML = `
				<div class="template">
					<div class="col-half btn"><button class="scissors"><img src="${img[0]}"></button></div>
					<div class="col-half btn"><button class="paper"><img src="${img[1]}"></button></div>
					<div class="col-full btn"><button class="rock"><img src="${img[2]}"></button></div>
					<div class="col-half btn"><button class="lizard"><img src="${img[3]}"></button></div>
					<div class="col-half btn"><button class="spock"><img src="${img[4]}"></button></div>
				</div>
			`
		},1000)
	}
};

const runGame = ()=>{
	setTimeout(()=>{
		const btns = document.querySelectorAll("#game button img");
		btns.forEach((btn,idx)=>{
			btn.addEventListener("click",(e)=>{
				gameProp["playerIdx"] = idx;
				gameProp["playerStr"] = players[idx];
				events();
			});
		});
	},1500)
};

const virtualChoice = ()=>{
	const {playerIdx} = gameProp;

	let rand = Math.floor(Math.random() * players.length)
	while(rand === playerIdx){
		if(rand === playerIdx){
			rand = Math.floor(Math.random() * players.length);
		}
		else {
			break;
		}
	}
	gameProp["compIdx"] = rand;
	gameProp["compStr"] = players[rand];
};

const updatePlayTemplate = ()=>{
	const {result,game,playerIdx,playerStr} = gameProp;
	result.style.display = "block"
	document.querySelector(".winBox").style.display = "block";
	game.style.display = "none";
	result.querySelector("#human").innerHTML = `<button class="shadow"></button>`
	setTimeout(()=>{
		result.querySelector("#human").innerHTML =  `
			<p>YOU CHOOSE ${playerStr.toUpperCase()}</p>
			<button class="${players[playerIdx]}"><img src="${img[playerIdx]}"></button>
		`
	},1500)

}
const upDateComTemplate = ()=>{
	const {result,compIdx,compStr} = gameProp;
	result.querySelector("#com").innerHTML = `<button class="shadow"></button`
	setTimeout(()=>{
		result.querySelector("#com").innerHTML = `
			<p>THE HOUSE CHO0SE ${compStr.toUpperCase()}</p>
			<button class="${players[compIdx]}"><img src="${img[compIdx]}"></button>
		`
	},1500)
}

const gameLogic = () => {
	// Paper beats rock, paper beats spock
	// scissors beats paper, scissors beats lizard
	// rock beats scissors, rock beats lizard
	// lizard beats paper, lizard beats spock
	// spock beats scissors, spook beats rock
	// ["scissors","paper","rock","lizard","spock"]

	const {playerIdx,compIdx} = gameProp;
	if(
		((playerIdx === 0 && compIdx === 1) || (playerIdx === 0 && compIdx ===3)) ||
		((playerIdx === 1 && compIdx === 2) || (playerIdx === 1 && compIdx === 4)) || 
		((playerIdx === 2 && compIdx === 0) || (playerIdx === 2 && compIdx === 3)) ||
		((playerIdx === 3 && compIdx === 1) || (playerIdx === 3 && compIdx === 4)) ||
		((playerIdx === 4 && compIdx === 0) || (playerIdx === 4 && compIdx === 2))
	){
		gameProp["winner"] = "PLAYER WINS";
	}
	else {
		gameProp["winner"] = "THE HOUSE WINS"
	}
	if(gameProp.winner) {
		updateScore();
		upDateWinner();
	}
};

const updateScore = () => {
	const {playerScore, comScore, winner} = gameProp;
	if (winner === "THE HOUSE WINS"){
		comScore.innerText = parseInt(comScore.innerText) + 1;
	}
	else {
		playerScore.innerText = parseInt(playerScore.innerText) +1 ;
	}

}
const upDateWinner = () => {
	setTimeout(()=>{
		const {winner} = gameProp;
		document.querySelector(".winBox").innerHTML = `
			<p>${winner}!!!</p>
			<button id="playAgain">Play Again</button>
		`
		setTimeout(()=>{
			playAgain();
		},1000)
	},1000)
}

function events(){
	setTimeout(()=>{

		virtualChoice();

		setTimeout(()=>{

			updatePlayTemplate()

			setTimeout(()=>{

				upDateComTemplate();

				setTimeout(()=>{
					gameLogic();

				},3000)
			},2500)
		},1000)
	},1000)
};

const refresh = () => {
	setTimeout(()=>{
		document.querySelector(".result").style.display = "none";
		document.querySelector(".result #human").innerHTML = "";
		document.querySelector(".result #com").innerHTML = "";
		document.querySelector(".winBox").innerHTML = "";
		document.querySelector(".winBox").display = "none";
		document.querySelector("#game").style.display = "block";
	},1500);
}

function playAgain() {
	setTimeout(()=>{
		const btn = document.querySelector("#playAgain");
		btn.addEventListener("click",(e)=>{
			refresh();
		})
	},500)
};

function startGame() {
	gameProp.makeGameTemplates();
	if(gameProp.makeGameTemplates){
		runGame();
	}
}

startGame();