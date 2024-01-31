<script lang="ts">

    import { onMount } from 'svelte';
    import { data } from '../scripts/store';
    
    $:{        
    }

    onMount(async () => {
        console.log('onmount',$data);
        if ($data === null || $data === undefined || $data.length == 0) {
        $data = [
            {info:'ici',counter:0},
            {info:'maintenant',counter:0},
        ];
        }
        console.log($data);
        
        });
 
    data.useLocalStorage();
        
   function increment(info:string) {
        console.log(`decrement ${info}`);
        console.log($data);
        const newData = $data.map(x => {
            if (x.info == info) {
                console.log(`   ${x.counter} -> ${x.counter+1}`);
                x.counter = x.counter + 1
            }
            return x;
        });
        console.log(newData);
        $data = newData;
   }

   function decrement(info:string) {
        console.log(`increment ${info}`);
        console.log($data);
        const newData = $data.map(x => {
            if (x.info == info) {
                console.log(`   ${x.counter} -> ${x.counter-1}`);
                x.counter = x.counter - 1
            }
            return x;
        });
        console.log(newData);
        $data = newData;        
    }

    

</script>

<div>
    <a href="/#/home">home</a>
</div>

<div>
    {#if $data}
        {#each $data as item}
            {#if item}
                <div>                
                    <h2>{item.info}</h2>
                    <button on:click={() => decrement(item.info)}>Minus</button>
                    <span>{item.counter}</span>
                    <button on:click={() => increment(item.info)}>Plus</button>        
                </div>
            {/if}
        {/each}
    {/if}

   
    
</div>