<script lang="ts">
	import Contacts from '$lib/components/Contacts.svelte';
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-5 flex flex-col items-center">
		<br />
		<img src="https://1559785.fs1.hubspotusercontent-na1.net/hub/1559785/hubfs/Cience/Logo-Horizontal1.png?width=201&height=48&name=Logo-Horizontal1.png" alt="cience-logo">
		<h3 class="h3">
			Welcome to the SDR dojo, powered by CIENCE.
		</h3>
		<h3 class="h3">
			You will be selling CIENCE an AI powered omnichannel lead generation service. (They have no other
			challenges)
		</h3>
		<aside class="alert variant-filled-warning">
			<div class="alert-message">
				<p>⚠️ After you click on a level to call, make sure to enable your microphone.</p>
			</div>
		</aside>
		<Contacts/>
		<br>
	</div>
</div>

