<script lang="ts">
	import { createClient, LiveTranscriptionEvents } from '@deepgram/sdk';
	import { transcriptStore } from '$lib/stores/transcript'; // Current transcript data that other modules and components will use
	import { listening } from '$lib/stores/states'; // The state of the AI agent $listening or speaking
	import { isOpen } from '$lib/stores/states'; // State of deepgram API WS connection
	import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import type { DrawerSettings, DrawerStore } from '@skeletonlabs/skeleton';


	const deepgram = createClient(import.meta.env.VITE_DEEPGRAM_API_KEY);

	let connection;
	let isRecording = false;
	let mediaRecorder;
	//let audioChunks = []; // Array to store audio data chunks to play in case of audio quality issues

	const startRecording = async () => {
		// Get mic permission and start recording
		const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
		mediaRecorder = new MediaRecorder(stream);
		mediaRecorder.start(1500); // Trigger dataavailable event every 1000 milliseconds
		// Create a queue to store audio data chunks until the connection is open

		mediaRecorder.addEventListener('dataavailable', (event) => {
			// Add the audio data to the queue
			if ($isOpen) {
				console.log('sending data');
				connection.send(event.data);
				const sendTime = new Date().getTime();
			}
			//audioChunks.push(event.data); // Collect audio data chunks
		});

		// Create a live transcription connection
		connection = deepgram.listen.live({
			model: 'nova-2',
			language: 'en-US',
			smart_format: true,
			utterance_end_ms: 1000, // Working on detecting end of speach to make a response in real time call
			interim_results: true // Interim results have to be enabled to use uterrenceEnd.
		});

		connection.on(LiveTranscriptionEvents.Open, () => {
			$isOpen = true;
			console.log('Connection opened.');
			// Once the connection is open, send all the collected audio data
		});

		connection.on(LiveTranscriptionEvents.Close, () => {
			$isOpen = false;
			console.log('Connection closed.');
		});

		connection.on(LiveTranscriptionEvents.Error, (err) => {
			console.error(err);
		});

		connection.on(LiveTranscriptionEvents.UtteranceEnd, () => {
			$listening = false;
			console.log($transcriptStore);
			$transcriptStore = [];
		});

		// When the deep server responds with our results
		connection.on(LiveTranscriptionEvents.Transcript, (data) => {
			$listening = true;
			// If the transcript data is not intermediate results, insert to the store array
			if (data.is_final && data.channel.alternatives[0].transcript !== '') {
				$transcriptStore.push(data.channel.alternatives[0].transcript);
			}
		});
	};

	const stopRecording = async () => {
		mediaRecorder.stop();
		// Close the connection
		if (connection) {
			console.log('connection closed sent');
			connection.finish();
		}

		/* Audio tester functionality
		// Create a Blob from the collected audio data chunks
		const blob = new Blob(audioChunks, { type: 'audio/webm' });
		// Create an audio element and set its source to the Blob
		const audioElement = new Audio(URL.createObjectURL(blob));
		// Play the audio
		audioElement.play();

		// Add an event listener for the 'ended' event to reset the audio chunks and Blob
		audioElement.addEventListener('ended', () => {
			// Reset the audio chunks array
			audioChunks = [];
			// Optionally, reset other variables or elements here
			console.log('Audio playback ended. Resetting audio chunks.');
		}); */
	};

	const toggleRecording = async () => {
		isRecording = !isRecording;

		if (isRecording) {
			// Start recording
			await startRecording();
		} else {
			// Stop recording
			await stopRecording();
		}
	};
</script>

<button on:click={toggleRecording}>
	{#if isRecording}
		Stop Recording
	{:else}
		Start Recording
	{/if}
</button>
