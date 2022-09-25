<template>
    <div class="container-fluid">
      <div class="row">
        <AppHeader/>
      </div>

      <div class="mt-3 row">
        
        <div class="col-md-3"></div>

        <router-view/>
      </div>
    </div>
    

</template>

<script>
  import AppHeader from '@/components/AppHeader.vue';
  
    export default {
      components: {
        AppHeader,
      },
    };
</script>


<style>
 
  .page{
    max-width: 400px;
    margin: auto;
  }
  
</style>