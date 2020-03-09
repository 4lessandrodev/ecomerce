
let buttonsEdit = document.querySelectorAll('.btn-editar');
let buttonsDelete = document.querySelectorAll('.btn-excluir');
let alerta = document.querySelector('#alerta');
let butonsDisabled = document.querySelectorAll('.btn-add');

//Exibir o formulario de produtos adicionais caso a cesta esteja salva 
const exibirAlerta = (el) => {
  if (document.querySelector(el).value != '') {
    Utils.exibirFormulario('#lista-produtos', 'display-none');
  } else {
    alerta.classList.toggle('display-none')
    for (let btn of butonsDisabled) {
      btn.disabled = !btn.disabled;
    }
  }
};

let mainForm = document.querySelector('main #form-edit');
const funcao = () => {
  for (let btn of buttonsEdit) {
    btn.addEventListener('click', function (e) {
      let tr = e.path.find(elemento => {
        return (elemento.tagName.toUpperCase() == 'TR');
      });

      window.scrollTo(0, 0);

      let data = JSON.parse(tr.dataset.row);

      for (let inputName in data) {
        switch (inputName) {
          case 'imagem':
            mainForm.querySelector('img').src = '/' + data[inputName];
            //mainForm.querySelector('input[type=file]').file = data[inputName];
            break;
          default:
            let input = mainForm.querySelector(`[name=${inputName}`);
            if (input) input.value = data[inputName];
        }
      }
    });
  }

  for (let btn of buttonsDelete) {
    btn.addEventListener('click', function (e) {
      let tr = e.path.find(elemento => {
        return (elemento.tagName.toUpperCase() == 'TR');
      });

      let data = JSON.parse(tr.dataset.row);

      fetch(`/admin/cestas/${data.id}`, {
        method: 'DELETE'
      }).then(response => response.json())
        .then(json => {
          window.location.reload();
        });
    });
  }
};