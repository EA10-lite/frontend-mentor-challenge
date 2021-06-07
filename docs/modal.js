const openBtn = document.querySelector(".rules");

openBtn.addEventListener("click",(e)=>{
	openNav();
})

function openNav(){
	document.querySelector(".overlay").classList.remove("is-hidden"); 
	document.querySelector(".modal").classList.remove("is-hidden");
	// document.querySelector("#score").style.display = "none";
	setTimeout(()=>{
		document.querySelector(".overlay").classList.add("open-overlay"); 
		document.querySelector(".modal").classList.add("open-modal");
	},500);
};

const closeBtn = document.querySelector(".close-nav");

closeBtn.addEventListener("click",(e)=>{
	closeNav();
});

const closeNav = () => {
	document.querySelector(".overlay").classList.remove("open-overlay");
	document.querySelector(".modal").classList.remove("open-modal");
	setTimeout(()=>{
		document.querySelector(".overlay").classList.add("is-hidden"); 
		document.querySelector(".modal").classList.add("is-hidden");
		// document.querySelector("#score").style.display = "flex";
	},500)	
};

