export class AudioAnimationTools {
    audioContext: AudioContext;
    analyser: AnalyserNode;
    bufferLength: number;
    dataArray: Uint8Array;
    source: MediaStreamAudioSourceNode;
    isAnimating: boolean = false; // Extra boolean property to control animating state
    circleStyle: string; // To make the circleStyle accessible outside the class
    animationId: number; // To keep track of the animationId for cancellation

    constructor(stream: MediaStream) {
        this.audioContext = new AudioContext();

        // Create an AnalyserNode
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 2048;
        this.bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);

        // Create a MediaStreamAudioSourceNode
        this.source = this.audioContext.createMediaStreamSource(stream);
        this.source.connect(this.analyser);

        this.isAnimating = true; // Change the isAnimating state to true when animation starts
        this.updateCircle();
    }

    updateCircle() {
        if (!this.isAnimating) return; // Stop the loop if isAnimating is false
        const amplitude = this.getAverageAmplitude(); 
        const targetSize = 5 * (20 + 80 * (amplitude / 128));

        const lerpSpeed = 0.05;
        const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
        let currentSize = 100;
        currentSize = lerp(currentSize, targetSize, lerpSpeed);

        this.circleStyle = `width: ${(currentSize - 250) * 2}px; height: ${(currentSize - 250) * 2}px;`;
        this.animationId = requestAnimationFrame(() => this.updateCircle());
    }

    getCircleStyle() {
        return this.circleStyle;
    }

    stop() {
        this.isAnimating = false; // Change the isAnimating state to false
    }

    getAverageAmplitude(): number {
        this.analyser.getByteTimeDomainData(this.dataArray);
        const sum = this.dataArray.reduce((accumulator, current) => accumulator + (current - 128), 0);
        return sum / this.bufferLength;
    }
}
