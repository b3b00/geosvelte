<script lang="ts">
  
  import Counters from './components/Counters.svelte';
  import Position from './components/Position.svelte';
  import Tracker from './components/Tracker.svelte';
  import Home from './components/Home.svelte';
  import NotFound from './components/NotFound.svelte';
  import Router from 'svelte-spa-router'
  import { onMount } from 'svelte';

    const routes = {    
    '/': Home,
    '/home': Home,
    '/counters': Counters,    
    '/position': Position,
    '/track': Tracker,
    '*': NotFound,
}

    onMount(async () => {
        });

</script>


<Router {routes}/>




