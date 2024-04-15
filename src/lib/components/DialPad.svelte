<script lang="ts">
	import { createClient, LiveTranscriptionEvents } from '@deepgram/sdk';
	import { convoStore } from '$lib/stores/transcript';
	import { transcriptStore } from '$lib/stores/transcript'; // Current transcript data that other modules and components will use
	import { listening } from '$lib/stores/states'; // The state of the AI agent listening or speaking
	import { isOpen } from '$lib/stores/states'; // State of deepgram API WS connection
	import { characterStore } from '$lib/stores/character'; // Current character
	import {fetchFinalScore} from '$lib/util/finalScore'
	import Response from './Response.svelte';

	const deepgram = createClient(import.meta.env.VITE_DEEPGRAM_API_KEY);

	let intermResults:[] = [];
	let connection: any;
	let mediaRecorder;
	let stream;
	let scores = [];
	let averageScore;

	const scoreFunction = async () => {
		const result = await fetchFinalScore($convoStore)
		scores = result.result;
		averageScore = scores.pop()
	}

	const startCall = async () => {
		// Get mic permission and start recording
		stream = await navigator.mediaDevices.getUserMedia({ audio: true });
		mediaRecorder = new MediaRecorder(stream);
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
			// Once the connection is open, send all the collected audio data
		});

		connection.on(LiveTranscriptionEvents.Close, () => {
			$isOpen = false;
			scoreFunction();
			$convoStore = [];
		});

		connection.on(LiveTranscriptionEvents.Error, (err) => {
			console.error(err);
		});

		// When the deepGram server responds with our results
		connection.on(LiveTranscriptionEvents.Transcript, (data) => {
			$listening = true;
			// If the transcript data is not intermediate results, insert to the store array
			if (data.is_final && data.channel.alternatives[0].transcript !== '') {
				let concatenatedTranscript = data.channel.alternatives
					.map((alt) => alt.transcript)
					.join(' ');
				// Create the object with the concatenated string
				//intermResults = { input: concatenatedTranscript };
				intermResults.push(concatenatedTranscript);
			}
		});

		connection.on(LiveTranscriptionEvents.UtteranceEnd, () => {
			$listening = false;
			// Concatenate all strings in intermResults into a single string, separated by a period and a space.
			let wholeStringWellSeparated = intermResults.join('. ');
			// Set the transcript store with the concatenated string.
			$transcriptStore = { input: wholeStringWellSeparated };
			// Reset the store, sending algo will not send when empty.
			intermResults = [];
			$transcriptStore = {};

			// Using an <audio> element
			const url = "./ding.mp3"
			const audioElement = document.createElement('audio');
			audioElement.src = url;
			document.body.appendChild(audioElement);
			audioElement.play();
		});

		mediaRecorder.addEventListener('dataavailable', (event) => {
			// Add the audio data to the queue
			if ($isOpen) {
				connection.send(event.data);
				const sendTime = new Date().getTime();
			}
		});
	};

	const stopCall = async () => {

		connection.finish();
		mediaRecorder.stop();

		// Stop each track in the stream
		stream.getTracks().forEach((track) => {
			track.stop();
			track.enabled = false;
		});
	};

	// Function to execute when the store's value changes
	const callToggle = (value) => {
		if (!value) {
			startCall();
		} else {
			stopCall();
		}
	};
</script>

<div class="flex flex-col items-center justify-center h-full">
	<div>
		<Response />
	</div>

	<br />
	<div class="card variant-ghost-success shadow-md rounded p-4 w-[90%]">

		{#if scores.length === 0}
			<p class="text-xl font-semibold">{$characterStore.fullName}</p>
			<p class="text-lg">Age: {$characterStore.age}</p>
			<p class="text-lg">Role: {$characterStore.role}</p>
			<p class="text-lg">Company: {$characterStore.company}</p>
			<p class="text-lg">Location: {$characterStore.location}</p>
			<p class="text-lg">Employees: {$characterStore.employees}</p>
		{:else}
			{#each scores as score}
				<p>{score}</p>
			{/each}
			<h3 class="h3">Your average score was {averageScore} out of 5</h3>
		{/if}
	</div>
	<br />
	<div>
		{#if $isOpen}
			<!-- svelte-ignore a11y-invalid-attribute -->
			<a href="#" on:click|preventDefault={() => callToggle($isOpen)}>
				<img src="./hang.png" alt="callButton" />
			</a>
		{:else}
			<!-- svelte-ignore a11y-invalid-attribute -->
			<a href="#" on:click|preventDefault={() => callToggle($isOpen)}>
				<img src="./call.png" alt="callButton" />
			</a>
		{/if}
	</div>
</div>
