const sliderElement = document.querySelector('.effect-level__slider');
const effectValueElement = document.querySelector('.effect-level__value');
// const effectOrigin = document.querySelector('.level-form__special');

effectValueElement.value = 80;

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 80,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('update', () => {
  effectValueElement.value = sliderElement.noUiSlider.get();
});

