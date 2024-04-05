const DEFAULT_SLIDER_OPTIONS = {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
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
};

const SLIDER_OPTIONS = {
  none: {},
  chrome: { range: { min: 0, max: 1 }, step: 0.1, start: 1 },
  sepia:  { range: { min: 0, max: 1 }, step: 0.1, start: 1 },
  marvin: { range: { min: 0, max: 100 }, step: 1, start: 100 },
  phobos: { range: { min: 0, max: 3 }, step: 0.1, start: 3 },
  heat:   { range: { min: 1, max: 3 }, step: 0.1, start: 3 },
};

const sliderContainer = document.querySelector('.img-upload__effect-level');
const slider = sliderContainer.querySelector('.effect-level__slider');
const effectLevelValue = sliderContainer.querySelector('.effect-level__value');
const editableImage = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects__list');
const noneEffectRadioInput = effectsList.querySelector('#effect-none');

let currentEffectName = 'none';

const applyEffectFunctions = {
  none: () => {
    editableImage.style.filter = 'none';
  },

  chrome: (value) => {
    editableImage.style.filter = `grayscale(${value})`;
  },

  sepia: (value) => {
    editableImage.style.filter = `sepia(${value})`;
  },

  marvin: (value) => {
    editableImage.style.filter = `invert(${value}%)`;
  },

  phobos: (value) => {
    editableImage.style.filter = `blur(${value}px)`;
  },

  heat: (value) => {
    editableImage.style.filter = `brightness(${value})`;
  },
};

sliderContainer.classList.add('hidden');
effectLevelValue.value = DEFAULT_SLIDER_OPTIONS.start;
noUiSlider.create(slider, DEFAULT_SLIDER_OPTIONS);

slider.noUiSlider.on('update', () => {
  const sliderValue = slider.noUiSlider.get();
  effectLevelValue.value = sliderValue;
  const effectFunction = applyEffectFunctions[currentEffectName];
  effectFunction(sliderValue);
});

const onEffectItemChange = (evt) => {
  if (!evt.target.matches('input.effects__radio')) {
    return;
  }

  currentEffectName = evt.target.value;
  const currentSliderOptions = { ...DEFAULT_SLIDER_OPTIONS, ...SLIDER_OPTIONS[currentEffectName] };
  slider.noUiSlider.updateOptions(currentSliderOptions);

  if (currentEffectName === 'none') {
    sliderContainer.classList.add('hidden');
  } else {
    sliderContainer.classList.remove('hidden');
  }
};

const resetImageEffect = () => {
  sliderContainer.classList.add('hidden');
  applyEffectFunctions.none();
  noneEffectRadioInput.checked = true;
};

effectsList.addEventListener('change', onEffectItemChange);

export { resetImageEffect };
