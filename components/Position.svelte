<script lang="ts">

    import { onMount } from 'svelte';
    
    $:{        
    }

    onMount(async () => {
      

        });
 

    function getPosition() {
        let geolocator = navigator.geolocation;
        geolocator.getCurrentPosition(
        (position:GeolocationPosition) => {
            console.log(position);
            currentPosition = position;
        }, 
        (error:GeolocationPositionError) => {
            console.error(error);
        });
    }

    let currentPosition:GeolocationPosition|undefined = undefined;

</script>


<div>
    <a href="/#/home">home</a>

    <button on:click={getPosition}>get position</button> <button on:click={() => currentPosition = undefined}>clear position</button>
    {#if currentPosition}
    <h3>current position is</h3>
    <ul>
        <li>heading:&gt;{currentPosition.coords.heading}&lt;</li>
        <li>altitude:&gt;{currentPosition.coords.altitude}&lt;</li>
        <li>latitude:&gt;{currentPosition.coords.latitude}&lt;</li>
        <li>longitude:&gt;{currentPosition.coords.longitude}&lt;</li> 
        <li>accuracy:&gt;{currentPosition.coords.accuracy}&lt;</li>
    </ul>
    {/if}
    
</div>