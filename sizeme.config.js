const sizeMeConfig = {
  // If true, then any changes to your Components rendered width will cause an
  // recalculation of the "size" prop which will then be be passed into
  // your Component.
  monitorWidth: true,

  // If true, then any changes to your Components rendered height will cause an
  // recalculation of the "size" prop which will then be be passed into
  // your Component.
  monitorHeight: false,

  // If true, then any changes to your Components position will cause an
  // recalculation of the "size" prop which will then be be passed into
  // your Component.
  monitorPosition: false,

  // The maximum frequency, in milliseconds, at which size changes should be
  // recalculated when changes in your Component's rendered size are being
  // detected. This should not be set to lower than 16.
  refreshRate: 16,

  // The mode in which refreshing should occur.  Valid values are "debounce"
  // and "throttle".  "throttle" will eagerly measure your component and then
  // wait for the refreshRate to pass before doing a new measurement on size
  // changes. "debounce" will wait for a minimum of the refreshRate before
  // it does a measurement check on your component.  "debounce" can be useful
  // in cases where your component is animated into the DOM.
  // NOTE: When using "debounce" mode you may want to consider disabling the
  // placeholder as this adds an extra delay in the rendering time of your
  // component.
  refreshMode: 'throttle',

  // By default we render a "placeholder" component initially so we can try
  // and "prefetch" the expected size for your component.  This is to avoid
  // any unnecessary deep tree renders.  If you feel this is not an issue
  // for your component case and you would like to get an eager render of
  // your component then disable the placeholder using this config option.
  // NOTE: You can set this globally. See the docs on first render.
  noPlaceholder: false
}