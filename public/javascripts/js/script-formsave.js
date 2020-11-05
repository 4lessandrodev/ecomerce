HTMLFormElement.prototype.save = function () {

  let form = this;

  return new Promise((resolve, reject) => {

    form.addEventListener('submit', e => {

      e.preventDefault();
      let formData = new FormData(form);

      fetch(form.action, {
        method: form.method,
        body: formData
      }).then(response => response.json())
        .then(json => {
          resolve(json);
        }).catch(err => {
          reject(err);
        });
    });
  });

};

/*
formCreate.addEventListener('submit', e => {

  e.preventDefault();
  let formCreateData = new FormData(formCreate);

  fetch('/admin/menus', {
    method: 'POST',
    body: formCreateData
  }).then(response => response.json())
    .then(json => {
      console.log('JSON', json);
      window.location.reload();
    })

});
*/