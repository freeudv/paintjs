class App {
    constructor({ canvas, colorPalette, colorPicker }) {
        this.canvas = canvas;
        this.colorPalette = colorPalette;
        this.colorPicker = colorPicker;

        this.context = null;
        this.isDrawing = false;

        this.init();
    }

    init() {
        this.context = this.canvas.getContext('2d');

        this.canvas.addEventListener('mousedown', this.handleCanvasMousedown.bind(this));
        this.canvas.addEventListener('mousemove', this.handleCanvasMousemove.bind(this));
        this.canvas.addEventListener('mouseup', this.handleCanvasMouseup.bind(this));
        this.canvas.addEventListener('mouseleave', this.handleCanvasMouseleave.bind(this));

        this.colorPicker.onAdd = color => this.colorPalette.addColor(color);

        document.querySelector('#new-color-button')
            .addEventListener('click', this.handleNewColorButtonClick.bind(this));
        document.querySelector('#clear-canvas-button')
            .addEventListener('click', this.handleClearCanvasButton.bind(this));
        document.querySelector('#brush-size-slider')
            .addEventListener('change', this.handleBrushSizeChange.bind(this));
    }

    handleNewColorButtonClick() {
        this.colorPicker.open();
    }

    handleClearCanvasButton() {
        this.context.fillStyle = 'white';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    handleBrushSizeChange(event) {
        this.context.lineWidth = Number(event.target.value);
    }

    handleCanvasMousedown(event) {
        this.lastEvent = event;
        this.isDrawing = true;
    }

    handleCanvasMousemove(event) {
        if (this.isDrawing) {
            this.context.beginPath();
            this.context.moveTo(this.lastEvent.offsetX, this.lastEvent.offsetY);
            this.context.lineTo(event.offsetX, event.offsetY);
            this.context.strokeStyle = this.colorPalette.currentColor;
            this.context.stroke();
            this.lastEvent = event;
        }
    }

    handleCanvasMouseup() {
        this.isDrawing = false;
    }

    handleCanvasMouseleave() {
        this.isDrawing = false;
    }
}