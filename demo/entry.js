import '../src/html.js';
const $ = require('jquery');

const sections = Array.from(document.querySelectorAll('body > section'));
for (const section of sections) {
  fillInPropertyTable(section.id);
}

$(window).on('hashchange', setSelectedLink);
$(window).on('scroll', setHashFromScroll)
if (!window.location.hash) {
  setHashFromScroll();
}
setSelectedLink();

function fillInPropertyTable(elementName) {
  const section = $('section#' + elementName);
  const customEl = section.find('.example.custom ' + elementName)[0];
  const standardEl = section.find('.example.standard ' + elementName.replace(/^custom-/, ''))[0];
  const tbody = section.find('table.properties tbody');

  const properties = Object.keys(Object.getPrototypeOf(customEl));
  const rowsHtml = properties.reduce(
    (soFar, prop) => soFar + `<tr><td>${prop}</td><td>${getPropertyValue(customEl, prop)}</td></tr>`,
    ''
  );
  tbody.html(rowsHtml || '<tr><td colspan="2">(No properties)</td></tr>');

  $(tbody).on('input', 'input[type="text"]', ev => updateOtherProperties(event.target, customEl, standardEl));
  $(tbody).on('blur', 'input[type="text"]', ev => updateSingleProperty(event.target, customEl));
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

function updateOtherProperties(changedPropertyInput, customEl, standardEl) {
  const changedRow = changedPropertyInput.parentElement.parentElement;
  const changedPropertyName = changedRow.children[0].textContent;

  standardEl[changedPropertyName] = changedPropertyInput.value;
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

function setHashFromScroll() {
  const bodyScrollTop = document.body.scrollTop;
  let minDifference = +Infinity;
  let minSectionId;
  for (const section of sections) {
    const difference = Math.abs(section.offsetTop - bodyScrollTop);
    if (difference < minDifference) {
      minDifference = difference;
      minSectionId = section.id;
    }
  }

  window.location.hash = minSectionId;
}
