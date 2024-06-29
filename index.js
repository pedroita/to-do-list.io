// Certifique-se de que estas variáveis estão corretamente atribuídas
const overlay = document.getElementById('overlay'); // ou outra forma de selecionar o elemento
const criarTarefa = document.getElementById('criarTarefa'); // ou outra forma de selecionar o elemento
const lista = document.getElementById('lista'); // ou outra forma de selecionar o elemento

function abrirModal(){
    overlay.classList.add("active");
    criarTarefa.classList.add("active");
}

function fecharModal(){
    overlay.classList.remove("active");
    criarTarefa.classList.remove("active");
}

function buscarTarefa(){
    fetch("http://localhost:3000/tarefas")
        .then(res => res.json())
        .then(res => {
            inserirTarefa(res);
        })
        .catch(err => console.error('Erro ao buscar tarefas:', err));
}
buscarTarefa();

function inserirTarefa(listaDeTarefas){
    if (listaDeTarefas.length > 0){
        lista.innerHTML = "";

        listaDeTarefas.map(tarefa => {
            lista.innerHTML += `
                <li>
                    <h5>${tarefa.titulo}</h5>   
                    <p>${tarefa.descricao}</p>
                    <div class="action"  >
                        <box-icon name='trash'  size="sm  onclick="removerTarefa(${tarefa.id})" ></box-icon>
                    </div>
                </li>
            `;
        });
    }
}


function novaTarefa(){
    event.preventDefault();
    let tarefa ={
        titulo: titulo.value,
        descricao: descricao.value
    };
    fetch("http://localhost:3000/tarefas",{
        method:"POST",
        headers:{
            "Content-type": "application/json"
        },
        body:JSON.stringify(tarefa)
    })
    .then(res => res.json())
    .then(res => {
    fecharModal();
    buscarTarefa();
    let form = document.querySelector("#criarTarefa form");
    form.reset();
    })
    
}

function removerTarefa(id) {
    alert(id);
    fetch(`http://localhost:3000/tarefas/${id}`, {
        method:"DELETE",
        
    })
    .then(res => res.json())
    .then(res => {
        alert("Tarefa deletada com sucessos!");
        buscarTarefa();
    })
    .catch(err => console.error('Erro ao remover tarefa:', err));
    
}


function pesquisaTarefas(){
    let list = document.querySelectorAll(" ul li");
    if (busca.value.length>0){
        list.forEach(li=>{
            if(!li.children[1].innerText.includes(busca.value)){
                li.classList.add('oculto');
            }else if(!li.children[1].innerText.includes(busca.value)){
                li.classList.add('oculto');
            }
            
            else{
                li.classList.remove('oculto');
            }
        })
    }else{
        list.forEach(
            li=>{
                li.classList.remove('oculto');                
            }
        )
    }
}