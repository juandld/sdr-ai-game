let currentSize = 100; // Start at minimal size
	const lerpSpeed = 0.05; // Speed at which the circle adjusts size, smaller is slower

const getAverageAmplitude = (analyser, dataArray, bufferLength) => {
    analyser.getByteTimeDomainData(dataArray);
    let sum = 0;
    for (let i = 0; i < bufferLength; i++) {
        sum += dataArray[i];
    }
    return sum / bufferLength;
};

const lerp = (a, b, t) => a + (b - a) * t;

const updateCircle = (analyser, dataArray, bufferLength) => {
    let amplitude = getAverageAmplitude(analyser, dataArray, bufferLength);

    let targetSizePercentage = ((amplitude - 127) / (127.9 - 127)) * (100 - 20) + 20;

    let targetSize = 500 * (targetSizePercentage / 100);

    currentSize = lerp(currentSize, targetSize, lerpSpeed);

    circleStyle = `width: ${currentSize - 250}px; height: ${currentSize - 250}px; border-radius: 50%; background-color: rgba(255, 0, 0, ${amplitude / 255});`;

    console.log(circleStyle);
    setTimeout(() => updateCircle(analyser, dataArray, bufferLength), 50); // 1000 milliseconds delay
};

// Create an AudioContext
const audioContext = new AudioContext(); 
// Create an AnalyserNode
const analyser = audioContext.createAnalyser();
analyser.fftSize = 2048;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);
// Create a MediaStreamAudioSourceNode
const source = audioContext.createMediaStreamSource(stream);
source.connect(analyser);
updateCircle(analyser, dataArray, bufferLength);