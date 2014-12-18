import '../src/html.js';
const $ = require('jquery');

for (const section of Array.from(document.querySelectorAll('body > section'))) {
  fillInPropertyTable(section.id);
}

$(window).on('hashchange', setSelectedLink);
setSelectedLink();

function fillInPropertyTable(elementName) {
  const section = $('section#' + elementName);
  const el = section.find('.example.custom ' + elementName)[0];
  const tbody = section.find('table.properties tbody');

  const properties = Object.keys(Object.getPrototypeOf(el));
  const rowsHtml = properties.reduce(
    (soFar, prop) => soFar + `<tr><td>${prop}</td><td>${getPropertyValue(el, prop)}</td></tr>`,
    ''
  );
  tbody.html(rowsHtml || '<tr><td colspan="2">(No properties)</td></tr>');

  $(tbody).on('input', 'input[type="text"]', ev => updateOtherProperties(event.target, el));
  $(tbody).on('blur', 'input[type="text"]', ev => updateSingleProperty(event.target, el));
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
    if (typeof Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el), prop).set === 'function') {
      return `<input type="text" value="${val}">`;
    } else {
      return val;
    }
  }
  return val;
}

function updateOtherProperties(changedPropertyInput, customEl) {
  const changedRow = changedPropertyInput.parentElement.parentElement;
  const changedPropertyName = changedRow.children[0].textContent;

  customEl[changedPropertyName] = changedPropertyInput.value;

  for (const row of Array.from($(changedRow).siblings())) {
    const propName = row.children[0].textContent;
    const valueCell = row.children[1];
    valueCell.innerHTML = getPropertyValue(customEl, propName);
  }
}

function updateSingleProperty(changedPropertyInput, customEl) {
  const changedRow = changedPropertyInput.parentElement.parentElement;
  const changedPropertyName = changedRow.children[0].textContent;

  changedRow.children[1].innerHTML = getPropertyValue(customEl, changedPropertyName);
}

function setSelectedLink() {
  const nav = $('body > nav');
  nav.find('a.selected').removeClass('selected');
  nav.find(`a[href="${window.location.hash}"]`).addClass('selected');
}
