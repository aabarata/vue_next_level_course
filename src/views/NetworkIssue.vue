<template>
    <div>
        <hi>Uh-Oh!</hi>
        <h3>It seems you're experiencing a network issue.</h3>
        <h4>Please click in the back button and try again.</h4>
        <router-link :to="{ name: 'event-list' }">Return to the home page</router-link>
    </div>    
</template>

<script>

export default {

}

</script>