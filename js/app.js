/**
 * 
 * FUNCTIONS
 *
 */

const AppName = "Guayas Contigo"; 

const changeFillPolygon = (element, event) => {
    const fillColor = event == 'mouseover' ? "024693" : "0095D6";
    element.addEventListener(event, e => {
        const parent = e.target.parentNode;
        const polygonsArr = parent.querySelectorAll('polygon')
        for (let index = 0; index < polygonsArr.length; index++) {
            polygonsArr[index].setAttribute('style', "fill:#" + fillColor + "!important")
        }
    })
}

const showTooltip = e => {
    const title = e.target.getAttribute('title');
    const tooltipTag = document.getElementById('tooltip')
    if (title)
        var CTM = tooltipTag.getScreenCTM();
    var mouseX = (e.clientX - CTM.e) / CTM.a;
    var mouseY = (e.clientY - CTM.f) / CTM.d;
    tooltip.setAttributeNS(null, "x", mouseX + 6 / CTM.a);
    tooltip.setAttributeNS(null, "y", mouseY + 20 / CTM.d);
    tooltipTag.innerHTML = title
    tooltipTag.removeAttribute('visibility')
}

const hideTooltip = e => {
    const tooltipTag = document.getElementById('tooltip')
    tooltipTag.setAttribute('visibility', 'hidden')
}

const showModalInfo = e => {

    const modal = document.getElementById('modalInfo')
    modal.style.display = "block";
    let cityTitle = e.target.getAttribute('title');
    const modalTitle = document.querySelector('.modal-title')
    if(cityTitle)
        modalTitle.innerHTML=  AppName+ ' ' + cityTitle
}


function closeDivModal() {
    const modal = document.getElementById('modalInfo')
    modal.style.display = "none";
}

const closeModalWindow = (e) => {
    const modal = document.getElementById('modalInfo')
    if (e.target == modal) {
        closeDivModal()
    }
}


document.onreadystatechange = e => {

    if (document.readyState == 'complete') {

        const cantonGuayaquil = document.getElementById('guayaquil')

        changeFillPolygon(cantonGuayaquil, 'mouseover');
        changeFillPolygon(cantonGuayaquil, 'mouseout');



        //tooltip
        var polygonsCities = document.querySelectorAll('polygon');
        for (let index = 0; index < polygonsCities.length; index++) {
            polygonsCities[index].addEventListener('mouseover', showTooltip);
            polygonsCities[index].addEventListener('mouseout', hideTooltip);
            //open modal
            polygonsCities[index].addEventListener('click', showModalInfo);
        }



        let spanClose = document.querySelectorAll('.close')
        for (let index = 0; index < spanClose.length; index++) {
            spanClose[index].addEventListener('click', closeDivModal)
            
        }
        window.addEventListener('click', closeModalWindow)


    }
}
