
/*************************************************************************************************************************************/
/* Javascript para a galeria, Modal e copy right do Rodopá
/*************************************************************************************************************************************/


const _gallery = [
	{
		img: "assets/photo_0.png",
		description: "Momento em Foco"
	},
	{
		img: "assets/photo_1.png",
		description: "Expressões de Amor"
	},
	{
		img: "assets/photo_2.png",
		description: "Contadora de Histórias"
	},
	{
		img: "assets/photo_3.png",
		description: "Pessoas que Marcam Presença"
	},
	{
		img: "assets/photo_4.png",
		description: "Foco no Resultado"
	},
	{
		img: "assets/photo_5.png",
		description: "Retratos de Momentos Significativos" 
	},
	{
		img: "assets/photo_6.png",
		description: "Entre Sorrisos e Alegrias"
	},
	{
		img: "assets/photo_7.png",
		description: "Um Toque de Formalidade"
	}
]

const _elements = {
	date: document.querySelector(".date"),

	scrollLinks: document.querySelectorAll(".navbar-list_link, .footer-list_link"),
	navbarList: document.querySelector(".navbar-list"),
	toggle: document.querySelector(".navbar-header_toggle"),

	galleryItems: document.querySelectorAll(".galeria-item"),
	sliderThumbsImage: document.querySelectorAll(".slider-thumbs__img"),
	closeModalBtn: document.querySelector(".modal_close"),
	modal: document.querySelector(".modal"),

	slider: document.querySelector(".slider"),
	sliderImage: document.querySelector(".slider-image_img"),
	sliderImageNumber: document.querySelector(".slider-image_number"),
	sliderImageDescription: document.querySelector(".slider-image-description"),
	sliderPrevButton: document.querySelector(".slider-buttons_btn-prev"),
	sliderNextButton: document.querySelector(".slider-buttons_btn-next"),
}

let _sliderCounter = 0, _touchStart, _touchEnd;

_elements.date.innerHTML = new Date().getFullYear() + ".";

_elements.scrollLinks.forEach(link => {
	link.addEventListener("click", e => {
		_elements.navbarList.classList.remove("navbar-list--show-links");

		const id = link.getAttribute("href");
		const element = document.querySelector(id);
		
		const position = element.offsetTop - 62;

		window.scrollTo({
			top: position,
			behavior: "smooth"
		});

		e.preventDefault();
	});
});

_elements.toggle.addEventListener("click", () => {
	_elements.navbarList.classList.toggle("navbar-list--show-links");
});

_elements.galleryItems.forEach(item => {
	item.addEventListener("click", e => {
		const id = getImageId(e.target);
		updateModal(id);

		_elements.modal.style.display = "flex";
	});
});

_elements.sliderThumbsImage.forEach(img => {
	img.addEventListener("click", e => {
		const id = getImageId(e.target);
		updateModal(id);
	});
});

_elements.closeModalBtn.addEventListener("click", () => {
	_elements.modal.style.display = "none";
});

_elements.sliderNextButton.addEventListener("click", () => nextImage());

_elements.sliderPrevButton.addEventListener("click", () => prevImage());

const getImageId = (target) => {
	const arrFromChildren = Array.from(target.parentNode.children);
	const id = arrFromChildren.indexOf(target);

	_sliderCounter = id;

	return id;
}

const updateModal = (imgId) => {
	_elements.sliderImage.src = _gallery[imgId].img;
	_elements.sliderImageNumber.innerHTML = (imgId + 1) + "/" + _gallery.length;
	_elements.sliderImageDescription.innerHTML = _gallery[imgId].description;

	_elements.sliderThumbsImage.forEach(img => {
		img.classList.remove("slider-thumbs__img--active");
	});

	-_elements.sliderThumbsImage[imgId].classList.add("slider-thumbs__img--active");
}

const nextImage = () => {
	if(++_sliderCounter > 7 ){
		_sliderCounter = 0;
	}
	updateModal(_sliderCounter);

}

const prevImage = () => {
	if(--_sliderCounter < 0){
		_sliderCounter = _gallery.length - 1;
	}
	updateModal(_sliderCounter);

}

_elements.slider.addEventListener("", e => {

});

_elements.slider.addEventListener("", e => {

});
