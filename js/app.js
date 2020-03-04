/**
 * 
 * FUNCTIONS
 *
 */

const AppName = "Guayas Contigo";

const Url = 'map/data/data.json';


async function getData(id) {
    let request = new Request(Url)
    let data = await fetch(Url).then(response => response.json()).then(data => data)
    return data.find(item => item.id == id)
}

const setInfoData = data => {
    let list = document.createElement('ul');
    
    //Asistentes
    let listAsistentesNode = document.createElement('li');
    let strongNodeAsistentes = document.createElement('strong');
    let textStrong = document.createTextNode("Asistentes: " )
    strongNodeAsistentes.appendChild(textStrong)
    let asistentesText = document.createTextNode(data.asistentes)
    listAsistentesNode.appendChild(strongNodeAsistentes)
    listAsistentesNode.appendChild(asistentesText)
    list.appendChild(listAsistentesNode)

    //Pacientes
    let listPacientesNode = document.createElement('li');
    let strongNodePacientes = document.createElement('strong');
    textStrongPacientes = document.createTextNode("Pacientes: " )
    strongNodePacientes.appendChild(textStrongPacientes)
    PacientesText = document.createTextNode(data.pacientes)
    listPacientesNode.appendChild(strongNodePacientes)
    listPacientesNode.appendChild(PacientesText)
    list.appendChild(listPacientesNode)


    //Medicinas
    let listMedicinasNode = document.createElement('li');
    let strongNodeMedicinas = document.createElement('strong');
    textStrongMedicinas = document.createTextNode("Medicinas: " )
    strongNodeMedicinas.appendChild(textStrongMedicinas)
    let medicinasText = document.createTextNode(data.medicinas)
    listMedicinasNode.appendChild(strongNodeMedicinas)
    listMedicinasNode.appendChild(medicinasText)
    list.appendChild(listMedicinasNode)
    
    //Mascotas
    let listMascotasNode = document.createElement('li');
    let strongNodeMascotas = document.createElement('strong');
    let textStrongMascotas = document.createTextNode("Mascotas: " )
    let mascotasText = document.createTextNode(data.mascotas)
    strongNodeMascotas.appendChild(textStrongMascotas)
    listMascotasNode.appendChild(strongNodeMascotas)
    listMascotasNode.appendChild(mascotasText)
    list.appendChild(listMascotasNode)


    

    return list;
}

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

async function showModalInfo(e) {
    const modal = document.getElementById('modalInfo')
    let cityTitle = e.target.getAttribute('title');
    let idCity = e.target.getAttribute('id');
    let data = await getData(idCity);

    if (cityTitle) {
        const modalTitle = document.querySelector('.modal-title')
        const modalContent = document.querySelector('.modal-body')
        modal.style.display = "block";
        modalTitle.innerHTML = AppName + ' ' + cityTitle
        modalContent.innerHTML = '';
        modalContent.appendChild(setInfoData(data));
    }
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
        var polygonsTooltips = document.querySelectorAll('polygon');

        for (let index = 0; index < polygonsTooltips.length; index++) {
            polygonsTooltips[index].addEventListener('mouseover', showTooltip);
            polygonsTooltips[index].addEventListener('mouseout', hideTooltip);

        }

        var polygonsCitiesOpenModal = document.querySelectorAll('polygon.visited, polygon.next');
        for (let index = 0; index < polygonsCitiesOpenModal.length; index++) {
            //open modal
            polygonsCitiesOpenModal[index].addEventListener('click', showModalInfo);

        }




        let spanClose = document.querySelectorAll('.close')
        for (let index = 0; index < spanClose.length; index++) {
            spanClose[index].addEventListener('click', closeDivModal)

        }
        window.addEventListener('click', closeModalWindow)


    }
}
