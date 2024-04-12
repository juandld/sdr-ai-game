<script>
	let text;
   
	async function fetchPosts() {
	   const response = await fetch('/api/response');
	   text = await response.text(); // Use .text() to extract the text from the response
	}
   
	fetchPosts();
</script>

<p>{text}</p>