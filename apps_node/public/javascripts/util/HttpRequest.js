async function getSelected(url) {
  let promise = await fetch(url);

  if (!promise.ok) {
    throw new Error('Erro');
  }

  let cesta = await promise.json();
  console.log(cesta);
  return cesta;

}