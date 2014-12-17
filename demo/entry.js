import '../src/html.js';
const $ = require('jquery');

fillInPropertyTable('custom-a');
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
  tbody.html(rowsHtml);

  $(tbody).on('input', ev => updateOtherProperties(event.target, tbody, el));
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
    return `<input type="text" data-property-name="${prop}" value="${val}">`;
  }
  return val;
}

function updateOtherProperties(changedPropertyInput, tbody, customEl) {
  const changedPropertyName = changedPropertyInput.dataset.propertyName;
  customEl[changedPropertyName] = changedPropertyInput.value;

  for (const input of Array.from(tbody.find('input[type="text"]'))) {
    if (input !== changedPropertyInput) {
      input.value = customEl[input.dataset.propertyName];
    }
  }
}

function setSelectedLink() {
  const nav = $('body > nav');
  nav.find('a.selected').removeClass('selected');
  nav.find(`a[href="${window.location.hash}"]`).addClass('selected');
}
