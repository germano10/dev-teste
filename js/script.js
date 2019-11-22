jQuery(document).ready(function($) {

	const inputCard = document.getElementById("titleCard");

	const objDrag = new Drag(true);

	Newdraggables();

	/* Modal */
	$(".close").click((event) => {
		modal(true);
	});

	$(".btnNewWork").click(function(event) {
		modal(false);
	});

	$("#buttonSaveClose").click(function(event) {
		if($.trim(inputCard.value.length) > 0){
			let number = Math.floor(Math.random() * (999 - 11)) + 11;
			let card = objDrag.montaCard(`card${number}`,`card${number}`,inputCard.value);
			$("#blocoCard").append(card);
			modal(true);
			let task = document.getElementById(`card${number}`);
			objDrag.salvaLocalTask(`card${number}`,task.outerHTML);
			Removedraggables();
			Newdraggables();
		}else{
			modal(true);
		}
	});

});

class Drag{

	constructor($reload = false) {
	 	window.$this = this;
	 	if($reload){
	 		$this.getLocalTask();
	 	}
	}

	montaCard($id, $name, $titleCard){
		var card = `
		<div class="cardDrag" id="${$id}" name="${$name}" draggable="true" data-bloco="blocoCard">
			<span class="titleCard">${$titleCard}</span>
			<div class="infoUserDrag">
				<img src="assets/images/user.png" alt="user" width="20">
				<span>Felipe Rocha Germano</span>
			</div>
			<div class="stateCard">
				<span>State</span>
				<span class="Titlestate">New</span>
			</div>
		</div>`;

		return card;
	}

	salvaLocalTask($name, $elemento){
		localStorage.setItem($name, $elemento);
	}

	getLocalTask(){
		var keys = Object.entries(localStorage);
		keys.forEach( function(element, index) {
			element.forEach( function(el, index) {
				if(index == 1){
					let task = $(el);
					let idBloco = task.attr('data-bloco');
					$(`#${idBloco}`).append(task);
				}
			});
		});
	}
}


function Newdraggables(){
	const objDrag = new Drag();

	var dropTarget = document.querySelector(".containerDrag");
	var draggables = document.querySelectorAll(".cardDrag");

	draggables.forEach( function(element, index) {
		draggables[index].addEventListener("dragstart", (ev) => {
			ev.dataTransfer.setData("id", ev.target.id);
		});
	});

	dropTarget.addEventListener("dragover", (ev) => {
		ev.preventDefault();
	});

	dropTarget.addEventListener("drop", (ev) => {
		ev.preventDefault();

		let target = ev.target;
		let elId = ev.dataTransfer.getData("id");
		let droppable = target.classList.contains('bloco');

		if(droppable){
			let task = document.getElementById(elId);
			task.setAttribute("data-bloco", target.id);
			let taskName = task.getAttribute("name");
			target.appendChild(task);
			objDrag.salvaLocalTask(taskName,task.outerHTML);
		}
	});
}

function Removedraggables(){
	const objDrag = new Drag();

	var dropTarget = document.querySelector(".containerDrag");
	var draggables = document.querySelectorAll(".cardDrag");

	draggables.forEach( function(element, index) {
		draggables[index].removeEventListener("dragstart", (ev) => {
			ev.preventDefault();
		});
	});

	dropTarget.removeEventListener("dragover", (ev) => {
		ev.preventDefault();
	});

	dropTarget.removeEventListener("drop", (ev) => {
		ev.preventDefault();
	});
}

function modal(hidden = false){
	const inputCard = document.getElementById("titleCard");
	const blurModal = document.getElementById("openModal");
	const modal = document.getElementById("modal");
	if(hidden){
		blurModal.classList.add("hidden");
		modal.classList.add("hidden");
		inputCard.value = "";
		return;
	}

	blurModal.classList.remove("hidden");
	modal.classList.remove("hidden");
	return;
}