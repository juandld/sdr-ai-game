<script lang="ts">
	import { onDestroy } from 'svelte';
	import { characterStore } from '$lib/stores/character';
	import { convoStore, transcriptStore } from '$lib/stores/transcript';
	import { voiceGeneration } from 'elevenlabs/api';

	let stream;
	let text;

	async function fetchAudioStream(text: string) {
		const voice = $characterStore.voice 
		const response = await fetch('/api/audio', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({text, voice})
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		stream = await response.body; // Assuming the endpoint returns a URL to the audio
		return stream;
	}

	async function playAudio(text: string) {
		try {
			const stream = await fetchAudioStream(text);
			if (!stream) {
				throw new Error('Stream is undefined');
			}

			const reader = stream.getReader();
			let chunks = [];
			let result;

			// Read the stream in a loop until it's fully consumed
			while (!(result = await reader.read()).done) {
				chunks.push(result.value);
			}

			// Combine all chunks into a single Uint8Array
			const combinedChunks = new Uint8Array(chunks.reduce((acc, val) => acc + val.length, 0));
			let position = 0;
			for (let chunk of chunks) {
				combinedChunks.set(chunk, position);
				position += chunk.length;
			}

			// Create a Blob from the combined chunks
			const blob = new Blob([combinedChunks], { type: 'audio/mpeg' });
			const url = window.URL.createObjectURL(blob);

			// Using an <audio> element
			const audioElement = document.createElement('audio');
			audioElement.src = url;
			document.body.appendChild(audioElement);
			audioElement.play();

			// Release the reader
			reader.releaseLock();
		} catch (error) {
			console.error('Error fetching or playing audio:', error);
		}
	}

	const updateConversation = (newValue) => {
		if (newValue.response) {
			const content = newValue.response;
			$convoStore.push({ tag: 'AI', content });

		}
		if (newValue.input) {
			const content = newValue.input;
			$convoStore.push({ tag: 'Human', content });
			fetchResponse($characterStore, $convoStore);
		}		
		console.log($convoStore);
		
	};

	const fetchResponse = async (character, convo) => {
		// Prepare the request options
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				character: character,
				chat: convo
			})
		};

		// Send the POST request
		const response = await fetch('/api/response', requestOptions);
		text = await response.json(); // Extract the text from the response
		updateConversation(text.result);

		await playAudio(text.result.response);
		console.log(text.result.response);
		
	};

	let isFirstCall = true;

	const unsubscribe1 = transcriptStore.subscribe((value) => {
		if (isFirstCall) {
			isFirstCall = false;
			return;
		}
		updateConversation(value);
	});

	onDestroy(() => {
		unsubscribe1();
	});
</script>
