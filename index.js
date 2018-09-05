// console.log('sliders')

// const buttons = document.querySelectorAll('button');
// const sliders = document.querySelectorAll('#rangeSlider');
//

// let buttonValue = 0;

// buttons.forEach(button => {
//   button.addEventListener('click', (event) => {
//     event.currentTarget.classList.add('active');
//     buttonValue = event.currentTarget.value;
//     toggleClass(buttons, event.currentTarget);
//   });
// })

// function toggleClass(collection, collectionToActivate) {
//   collection.forEach((items) => {
//     items.classList.remove('active');
//   });
//   collectionToActivate.classList.add('active');
// }

// const updateValues = () => {
//   let slideValue = 0;
//   slider.oninput = () => {
//     total.innerHTML = slider.value;
//     const sliderTotal = buttonValue * slider.value * 12;
//     // prob need to sanitize
//     value.innerHTML = `Escalator Total: ${sliderTotal} per year`;
//   };

// }

// sliders.forEach(slider => {

// });
(function() {
  const tabContainer = document.querySelector('.container');
  const tablist = tabContainer.querySelector('ul');
  const tabs = tablist.querySelectorAll('a');
  const panels = tabContainer.querySelectorAll('[id^="panel"]');
  const sliders = tabContainer.querySelectorAll('.sliderRange');

  const switchTab = (oldTab, newTab) => {
    newTab.focus();
    newTab.removeAttribute('tabindex');
    newTab.setAttribute('aria-selected', 'true');
    oldTab.removeAttribute('aria-selected');
    oldTab.setAttribute('tabindex', '-1')

    // get new indexes and show tab panels
    let index = Array.prototype.indexOf.call(tabs, newTab);
    let oldIndex = Array.prototype.indexOf.call(tabs, oldTab);
    panels[oldIndex].hidden = true;
    panels[index].hidden = false;

    adjustPanels(panels);
  }

  tablist.setAttribute('role', 'tablist');

  tabs.forEach((tab, i) => {
    tab.setAttribute('role', 'tab');
    tab.setAttribute('id', 'tab' + (i + 1));
    tab.setAttribute('tabindex', '-1');
    tab.parentNode.setAttribute('role', 'presentation');

    // Handle clicking of tabs for mouse users
    tab.addEventListener('click', event => {
      const grandTotal = document.querySelector('.grand-total');

      // const total = grandTotal.getAttribute('data-total');
      // updateGrandTotal(total);

      event.preventDefault();
      let currentTab = tablist.querySelector('[aria-selected]');
      if (event.currentTarget !== currentTab) {
        switchTab(currentTab, event.currentTarget);
      }
    });
  });

  panels.forEach((panel, i) => {
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('tabindex', '-1');
    let id = panel.getAttribute('id');
    panel.setAttribute('aria-labelledby', tabs[i].id);
    panel.hidden = true;
  });

  const updateValues = (slider, panel) => {
    slider.removeAttribute('disabled');
    slider.oninput = () => {
      const total = panel.querySelector('.total');
      const value = panel.querySelector('.value');
      const grandTotal = document.querySelector('.grand-total');
      total.innerHTML = slider.value;
      const dataValue = Number(slider.getAttribute('data-value'));
      const sliderTotal = dataValue * slider.value * 12;
      // prob need to sanitize
      // calculateGrandTotal(sliderTotal);
      value.setAttribute('data-value', sliderTotal);
      const totalVals = value.getAttribute('data-value');
      grandTotal.setAttribute('data-total', totalVals);
      grandTotal.innerHTML = `Grand Total ${totalVals} per year`;

      value.innerHTML = `Escalator Total: ${sliderTotal} per year`;
      // updateGrandTotal(sliderTotal);
    };
  }

  const updateGrandTotal = (number) => {
    const grandTotal = document.querySelector('.grand-total');
    let newTotal = grandTotal.getAttribute('data-total');
    grandTotal.setAttribute('data-total', newTotal + number);
  }

  // const calculateGrandTotal = (sliderTotal) => {
  //   const grandTotal = document.querySelector('.grand-total');
  //   let totalValue = Number(grandTotal.getAttribute('data-total'));
  //   console.log(totalValue);
  //   console.log(grandTotal);
  //   console.log(sliderTotal);
  //   grandTotal.setAttribute('data-total', totalValue + sliderTotal);
  //   const endValue = grandTotal.getAttribute('data-total');
  //   grandTotal.innerHTML = `Grand Total ${endValue}`
  //   // grandTotal.setAttribute('data-total', `${totalValue} + sliderTotal);

  //   // get grandtotal
  //   // add each slider value to grand total

  // }

  const adjustPanels = (panels) => {
    panels.forEach(panel => {
      if (!panel.hasAttribute('hidden')) {
        const slider = panel.querySelector('.sliderRange');
        slider.removeAttribute('disabled');
        slider.addEventListener('input', updateValues(slider, panel));
      }
    });
  }

  window.addEventListener('load', () => {
       // Initially activate the first tab and reveal the first tab panel
    tabs[0].removeAttribute('tabindex');
    tabs[0].setAttribute('aria-selected', 'true');
    const firstActivePanel = panels[0];
    firstActivePanel.hidden = false;
    const firstActiveSlider = firstActivePanel.querySelector('.sliderRange')
    updateValues(firstActiveSlider, firstActivePanel);
  })
}());

// Add all values together




// const valueNow = sliderControl.getAttribute('aria-valuenow');

// const sliderControl = document.querySelector('.thumb');
// const rail = document.querySelector('.rail');

// sliderControl.addEventListener('click', addFocus);

// function addFocus() {
//   sliderControl.classList.add('focus');
// }

// console.log(valueNow);
