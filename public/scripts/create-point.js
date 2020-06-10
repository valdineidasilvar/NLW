

// formulario seleção de estado e cidade
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")   

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => { 

        for(const state of states){
          ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }


    })  
}

populateUFs()


function getCities(event){
    const citySelect = document.querySelector("select[name=city]") 
    const stateInput = document.querySelector("input[name=state]") 
    
    const ufvalue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufvalue}/municipios`
    
    citySelect.innerHTML = "<option value=>Selecione o Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then( cities => { 
       

        for(const city of cities ){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    } )
}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)
  
     
// menu itens de coleta
//pegar todos os li's

const itensToCollect = document.querySelectorAll(".items-grid li")

for (const item of itensToCollect){
    item.addEventListener("click",handleSelectedItem)
}


const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target

    //adicionar ou remover uma classe com java script
    itemLi.classList.toggle("selected")

    const itemId = event.target.dataset.id

 
    //verificar se a itens selecionados, se sim
    //pegar esses items   
    const alreadySelected = selectedItems.findIndex( item =>{
        const itemFound = item == itemId
        return itemFound
    })    

    //se ja estiver selecionado tirar da seleção
    if (alreadySelected >= 0){
        const filteredItems = selectedItems.filter( item =>{
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems
    //se não estiver selecionado, adicionar a seleção
    }else { 
        selectedItems.push(itemId)
    }

    //atualizar o campo escondido com so dados selecionados
    collectedItems.value = selectedItems    


}
