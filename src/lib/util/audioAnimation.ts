import { writable } from 'svelte/store';

export class AudioAnimationTools {
    audioContext: AudioContext;
    analyser: AnalyserNode;
    bufferLength: number;
    dataArray: Uint8Array;
    source: MediaStreamAudioSourceNode;
    isAnimating: boolean = false; // Extra boolean property to control animating state
    circleStyle: string; // To make the circleStyle accessible outside the class
    animationId: number; // To keep track of the animationId for cancellation

    circleStyleChanger = writable(''); // create a new Svelte store specific to this instance


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

        const lerpSpeed = 0.01; // Slower lerp speed for smoother transition
        const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
        let currentSize = 100;
        currentSize = lerp(currentSize, targetSize, lerpSpeed);

        // scale currentSize to be in range 0 - 1
        const currentSizeNorm = (currentSize - 99.2) / 0.2;

        // scale normalized currentSize to be in range 20% - 100% 
        const scaledSize = currentSizeNorm * 90 + 20;

        this.circleStyle = `width: ${scaledSize}px; height: ${scaledSize}px;`;
        this.circleStyleChanger.set(this.circleStyle); // update the instance's Svelte store
        this.animationId = requestAnimationFrame(() => this.updateCircle());
    }

    

    getCircleStyle() {
        return this.circleStyleChanger;        
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
