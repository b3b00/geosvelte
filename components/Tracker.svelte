<script lang="ts">

    import { onMount } from 'svelte';
    import {positions} from '../scripts/store';
    import { format } from "date-fns";
    
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


    function trackPoint(position:GeolocationPosition ) : string{
        const dt = format(new Date(position.timestamp), "yyyy-MM-dd'T'HH:mm:ss'Z'");
        const trkpt=`<trkpt lat="${position.coords.latitude}" lon="${position.coords.longitude}">
    <ele>71.7</ele>
    <time>${dt}</time>    
   </trkpt>`;
   return trkpt
    }

    let header = (d) => {
        return `<?xml version="1.0" encoding="UTF-8"?>
<gpx creator="StravaGPX" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd http://www.garmin.com/xmlschemas/GpxExtensions/v3 http://www.garmin.com/xmlschemas/GpxExtensionsv3.xsd http://www.garmin.com/xmlschemas/TrackPointExtension/v1 http://www.garmin.com/xmlschemas/TrackPointExtensionv1.xsd" version="1.1" xmlns="http://www.topografix.com/GPX/1/1" xmlns:gpxtpx="http://www.garmin.com/xmlschemas/TrackPointExtension/v1" xmlns:gpxx="http://www.garmin.com/xmlschemas/GpxExtensions/v3">
 <metadata>
  <time>${format(new Date(d), "yyyy-MM-dd'T'HH:mm:ss'Z'")}</time>
 </metadata>
 <trk>
  <name>Lunch Run</name>
  <type>running</type>
  <trkseg>`;
  }

  let footer = `</trkseg>
 </trk>
</gpx>`;

    function stop() {
        // TODO compute gpx ?
        if (watcherid > 0) {
            navigator.geolocation.clearWatch(watcherid);
        }
        recording = false;
        const j = JSON.stringify($positions);

        

        var pos:string[] = $positions.map(trackPoint);
        const poslist = pos.join('\n');

        for(let i = 0; i < $positions.length; i++)  {
            const p = $positions[i];
            console.log(p);
        }
        console.log(poslist);
        gpx = header($positions[0].timestamp)+'\n'+poslist+'\n'+footer;
    }

    function downloadGPS() {
        const blob = new Blob([gpx], {  type: "text/plain"});
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement("a");

  // Set link's href to point to the Blob URL
  link.href = url;
  link.download = "track.gpx";

  // Append link to the body
  document.body.appendChild(link);

  // Dispatch click event on the link
  // This is necessary as link.click() does not work on the latest firefox
  link.dispatchEvent(
    new MouseEvent('click', { 
      bubbles: true, 
      cancelable: true, 
      view: window 
    })
  );

  // Remove link from body
  document.body.removeChild(link);

    }

    

</script>


<div>
    <a href="/#/home">home</a>

    <button on:click={start}>start</button> 
    {#if recording}
    <p>recording... {$positions.length} points</p>
    <button on:click={stop}>stop</button>
    {/if}
    {#if gpx && gpx.length > 0} 
        <button on:click={downloadGPS}>download</button>
        <pre>{gpx}</pre>
    {/if}
    
</div>