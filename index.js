import * as log from 'loglevel';

/**
 * Adds or removes state or modifier classes (i.e. `--modifier`)
 * to the target elements.
 *
 * Attributes:
 *
 *  `data-add-state`        {string}  The state classes to add to the target selectors
 *  `data-remove-state`     {string}  The state classes to remove from the target selectors
 *  `data-target`           {string}  The selector string for the target elements
 *  `data-focus`            {string}  The element selector that should receive focus
 *  `data-prevent-default`  {boolean} The presence of this ignores the normal action of the trigger element
 *
 * Usage:
 *
 *  <target-element class="parent-selector">
 *    <trigger-element data-add-state="parent-selector--state" data-target=".parent-selector" data-prevent-default>
 *    <trigger-element data-remove-state="parent-selector--state1,parent-selector--state2" data-target=".parent-selector,.other-selector" data-prevent-default>
 *  </target-element>
 */
export function bindStateToggles() {
  window.addEventListener('load', () => {
    document.addEventListener('click', (event) => {
      if (!event.target.dataset.hasOwnProperty('target')) {
        return;
      }

      // Create an comma separated value array of each state to add or remove from the targets then filter any empty strings from the list
      const states = {
        add: (event.target.dataset.addState || '')
          .split(',')
          .filter((state) => { return state !== ''; }),

        remove: (event.target.dataset.removeState || '')
          .split(',')
          .filter((state) => { return state !== ''; }),
      };

      const targets = document.querySelectorAll(event.target.dataset.target);

      for (let i = 0; i < targets.length; i++) {
        for (let y = 0; y < states.add.length; y++) {
          targets[i].classList.add(states.add[y]);
          log.info(`[PLUG/TOGGLE] Added '${states.add[y]}' class to`, targets[i]);
        }
        for (let x = 0; x < states.remove.length; x++) {
          targets[i].classList.remove(states.remove[x]);
          log.info(`[PLUG/TOGGLE] Removed '${states.remove[x]}' class from`, targets[i]);
        }
      }

      if (event.target.dataset.hasOwnProperty('focus')) {
        document.querySelector(event.target.dataset.focus).focus({preventScroll: true});
      }

      if (event.target.dataset.hasOwnProperty('preventDefault')) {
        event.preventDefault();
      }
    }, false);

    log.info('[PLUG/TOGGLE] State toggle listener attached to document');
  });
}
