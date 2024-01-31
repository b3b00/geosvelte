<script lang="ts">

    import { onMount } from 'svelte';
    import {positions} from '../scripts/store';
    
    $:{        
    }

    onMount(async () => {
        $positions = [];

        });

    let recording = false;

    let gpx = "";
 
    let watcherid:number = -1;

    function start() {
        $positions = [];
        const options = {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 0,
        };
        recording = true;
        watcherid = navigator.geolocation.watchPosition(tick, (error) => {}, options);

    }

    function tick(position:GeolocationPosition) {
        const newData = $positions;
        newData.push(position);
        $positions = newData;
    }

    function stop() {
        // TODO compute gpx ?
        if (watcherid > 0) {
            navigator.geolocation.clearWatch(watcherid);
        }
        recording = false;
        const j = JSON.stringify($positions);

        var pos:string[] = $positions.map(x => {
            return `lat:${x.coords.latitude} lon:${x.coords.longitude}`;
        });
        const poslist = pos.join('\n');

        for(let i = 0; i < $positions.length; i++)  {
            const p = $positions[i];
            console.log(p);
        }
        console.log(poslist);
        gpx = poslist;
    }



    

</script>


<div>
    <a href="/#/home">home</a>

    <button on:click={start}>start</button> 
    {#if recording}
    <p>recording... {$positions.length} points</p>
    <button on:click={stop}>stop</button>
    {/if}
    <pre>{gpx}</pre>
    
</div>