<script lang="ts">
	import CallButton from '$lib/components/CallButton.svelte';
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-5 flex flex-col items-center">
		<br />
		<h1 class="h1">Practice your selling skills!</h1>
		<h3 class="h3">
			Your objective is to schedule a meeting, during the call you will get some guidence on how to
			progress, When you finish the call or get hanged up on, you will get feedback on your
			performance.
		</h3>
		<h3 class="h3">
			You will be selling an AI powered omnichannel lead generation service. (They have no other
			challenges)
		</h3>
		<aside class="alert variant-filled-warning">
			<div class="alert-message">
				<p>⚠️ After you click on a level to call, make sure to enable your microphone.</p>
			</div>
		</aside>
		<CallButton/>
		<br>
	</div>
</div>

