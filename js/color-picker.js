class ColorPicker {
    constructor({ element }) {
        this.element = element;
        this.previewElement = this.element.querySelector('.color-picker__preview');

        this.color = {
            red: 0,
            green: 0,
            blue: 0
        };

        this.onAdd = () => {};

        this.init();
    }

    init() {
        this.previewElement.style.backgroundColor = `rgb(${this.color.red},${this.color.green},${this.color.blue})`;

        this.element
            .querySelector('.color-picker__close-button').addEventListener('click', this.close.bind(this));

        this.element
            .querySelector('.color-picker__add-button')
            .addEventListener('click', this.handleAdd.bind(this));

        this.element
            .querySelectorAll('.color-picker__slider')
            .forEach(slider => slider.addEventListener('change', this.handleChange.bind(this)));
    }

    handleChange(event) {
        let slider = event.target;

        this.color[slider.id] = Number(slider.value);
        this.previewElement.style.backgroundColor = `rgb(${this.color.red},${this.color.green},${this.color.blue})`;
    }

    handleAdd(event) {
        this.onAdd(this.color);
        this.close();
    }

    open() {
        this.element.style.display = 'block';
    }

    close(event) {
        this.element.style.display = 'none';
    }
}
