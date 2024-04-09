<script lang="ts">
	import { onDestroy } from 'svelte';

	import { createClient, LiveTranscriptionEvents } from '@deepgram/sdk';
	import { transcriptStore } from '$lib/stores/transcript'; // Current transcript data that other modules and components will use
	import { listening } from '$lib/stores/states'; // The state of the AI agent listening or speaking
	import { isOpen, calling } from '$lib/stores/states'; // State of deepgram API WS connection
	import { characterStore } from '$lib/stores/character'; // Current character

	const deepgram = createClient(import.meta.env.VITE_DEEPGRAM_API_KEY);

	let circleStyle = 'width: 100px; height: 100px; border-radius: 50%; background-color: red;';

	let connection;
	let mediaRecorder;
	//let audioChunks = []; // Array to store audio data chunks to play in case of audio quality issues

	const startCall = async () => {
		// Get mic permission and start recording
		const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
		let mediaRecorder = new MediaRecorder(stream);
		mediaRecorder.start(1500); // Trigger dataavailable event every 1000 milliseconds

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

		mediaRecorder.addEventListener('dataavailable', (event) => {
			// Add the audio data to the queue
			if ($isOpen) {
				console.log('sending data');
				connection.send(event.data);
				const sendTime = new Date().getTime();
			}
			//audioChunks.push(event.data); // Collect audio data chunks
		});

		// When the deepGram server responds with our results
		connection.on(LiveTranscriptionEvents.Transcript, (data) => {
			$listening = true;
			// If the transcript data is not intermediate results, insert to the store array
			if (data.is_final && data.channel.alternatives[0].transcript !== '') {
				$transcriptStore.push(data.channel.alternatives[0].transcript);
			}
		});
	};

	const stopCall = async () => {
		console.log('stoping by change value');

		connection.finish();
		mediaRecorder.stop();

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

	// Function to execute when the store's value changes
	const callToggle = (value) => {
		if ((value = true)) {
			console.log('starting by change value');
			startCall();
		} else {
			stopCall();
		}
	};
</script>

<div class="flex flex-col items-center justify-center h-full">
	<div style={circleStyle}></div>
	<br />
	<div class="card variant-ghost-success shadow-md rounded p-4 w-full max-w-md">
		<p class="text-xl font-semibold">{$characterStore.fullName}</p>
		<p class="text-lg">Age: {$characterStore.age}</p>
		<p class="text-lg">Role: {$characterStore.role}</p>
		<p class="text-lg">Company: {$characterStore.company}</p>
		<p class="text-lg">Location: {$characterStore.location}</p>
		<p class="text-lg">Employees: {$characterStore.employees}</p>
	</div>
</div>
