<template>
  <div class='about'>
    <div class='container'>
      <div class='alert alert-warning' role='alert'>
        <h4 class='alert-heading'>{{ msg }}</h4>
        <p>Aww yeah, you successfully read this important alert message. This example text is going to run a
          bit longer so that you can see how spacing within an alert works with this kind of content.</p>
        <hr>
        <p class='mb-0'>Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
      </div>
       <router-link to='/' class='btn btn-primary'>GO TO HOME</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'about',
  data () {
    return {
      msg: 'ABOUT!'
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style>

</style>
