/*************************************************************************************************************************************/
/* Javascript for tab navigation horizotal scroll buttons. / Javascript para navegação por abas com botões de rolagem horizontal.
/*************************************************************************************************************************************/

const btnLeft = document.querySelector(".left-btn");
const btnRight = document.querySelector(".right-btn");
const tabMenu = document.querySelector(".tab-menu");

const IconVisibility = () => {
  let scrollLeftValue = Math.ceil(tabMenu.scrollLeft);
  //console.log("1.", scrollLeftValue);
  let scrollableWidth = tabMenu.scrollWidth - tabMenu.clientWidth;
  //console.log("2.", scrollableWidth);

  btnLeft.style.display = scrollLeftValue > 0 ? "block" : "none";
  btnRight.style.display = scrollableWidth > scrollLeftValue ? "block" : "none";
}

btnRight.addEventListener("click", () => {
  tabMenu.scrollLeft += 150;
  //IconVisibility();
  setTimeout(() => IconVisibility(), 50);
});

btnLeft.addEventListener("click", () => {
  tabMenu.scrollLeft -= 150;
  //IconVisibility();
  setTimeout(() => IconVisibility(), 50);
});

window.onload = function(){
  btnRight.style.display = tabMenu.scrollWidth > tabMenu.clientWidth || tabMenu.scrollWidth >= window.innerWidth ? "block" : "none";
  btnLeft.style.display = tabMenu.scrollWidth >= window.innerWidth ? "" : "none";
}

window.onresize = function(){
  btnRight.style.display = tabMenu.scrollWidth > tabMenu.clientWidth || tabMenu.scrollWidth >= window.innerWidth ? "block" : "none";
  btnLeft.style.display = tabMenu.scrollWidth >= window.innerWidth ? "" : "none";

  let scrollLeftValue = Math.round(tabMenu.scrollLeft);

  btnLeft.style.display = scrollLeftValue > 0 ? "block" : "none";
}

//Javascripit to make the tab navigation draggable / Javascript para tornar a navegação por abas arrastável.
let activeDrag = false;

tabMenu.addEventListener("mousemove", (drag) => {
  if(!activeDrag) return;
  tabMenu.scrollLeft -= drag.movementX;
  IconVisibility();
  tabMenu.classList.add("dragging");
});

document.addEventListener("mouseup", () => {
  activeDrag = false;
  tabMenu.classList.remove("dragging");
});

tabMenu.addEventListener("mousedown", () => {
  activeDrag = true;
});

//Javascript to view tab contents on click tab buttons / Javascript para visualizar conteúdos de abas ao clicar nos botões das abas.
const tabs = document.querySelectorAll(".tab");
const tabBtns = document.querySelectorAll(".tab-btn");

const tab_Nav = function(tabBtnClick){
  tabBtns.forEach((tabBtn) => {
    tabBtn.classList.remove("active");
  });

  tabs.forEach((tab) => {
    tab.classList.remove("active");
  });


  tabBtns[tabBtnClick].classList.add("active");
  tabs[tabBtnClick].classList.add("active");
}

tabBtns.forEach((tabBtn, i) => {
  tabBtn.addEventListener("click", () => {
    tab_Nav(i);
  });
});


/*************************************************************************************************************************************/
/* Javascript para a galeria, Modal e copy right do Rodopá
/*************************************************************************************************************************************/


const _gallery = [
	{
		img: "assets/photo_0.png",
		description: "Compartilhando Experiências"
	},
	{
		img: "assets/photo_1.png",
		description: "Amizade, Família e Sabor"
	},
	{
		img: "assets/photo_2.png",
		description: "Doce Refrescância"
	},
	{
		img: "assets/photo_3.png",
		description: "Facilidade nas Compras"
	},
	{
		img: "assets/photo_4.png",
		description: "Conversas e Cocktails"
	},
	{
		img: "assets/photo_5.png",
		description: "Churrasco Perfeito"
	},
	{
		img: "assets/photo_6.png",
		description: "Café e Conversa"
	},
	{
		img: "assets/photo_7.png",
		description: "Celebrando Juntos"
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
