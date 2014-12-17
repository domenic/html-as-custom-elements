import '../src/html.js';

fillInPropertyTable('custom-a');
window.addEventListener('hashchange', setSelectedLink);
setSelectedLink();

function fillInPropertyTable(elementName) {
  const section = document.querySelector('section#' + elementName);
  const el = section.querySelector('.example.custom ' + elementName);
  const table = section.querySelector('table.properties');
  const tbody = table.querySelector('tbody');

  const properties = Object.keys(Object.getPrototypeOf(el));
  const rowsHtml = properties.reduce(
    (soFar, prop) => soFar + `<tr><td>${prop}</td><td>${getPropertyValue(el, prop)}</td></tr>`,
    ''
  );
  tbody.innerHTML = rowsHtml;
}

function getPropertyValue(el, prop) {
  let val;
  try {
    val = el[prop];
  } catch (e) {
    console.error(`Error getting property ${prop} from <${el.tagName}>`, e);
    return '[Exception]';
  }

  if (typeof val === 'string') {
    return `"${val}"`;
  }
  return val;
}

function setSelectedLink() {
  const nav = document.querySelector('body > nav');
  const previouslySelected = nav.querySelector('a.selected');
  if (previouslySelected) {
    previouslySelected.classList.remove('selected');
  }

  const newlySelected = nav.querySelector(`a[href="${window.location.hash}"]`);
  if (newlySelected) {
    newlySelected.classList.add('selected');
  }
}
